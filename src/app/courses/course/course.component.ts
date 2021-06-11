import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { CoursesEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson/lesson-entity.service';
import { of } from 'rxjs';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  loading$: Observable<boolean>;


  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    // private coursesService: CoursesHttpService,
    private route: ActivatedRoute,
    private courseEntityService: CoursesEntityService,
    private lessonEntityService: LessonEntityService) {

  }

  ngOnInit() {

    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');

    this.course$ = this.courseEntityService.entities$ // so we find the enty course observable
      .pipe(map(
        courses => courses.find(course => course.url === courseUrl)
      ));

    this.loading$ = this.lessonEntityService.loading$.pipe(delay(0)); // emits true when is fetching
    // to avoid ExpressionChangedAfterHasBeenCheckedError, add delay(0). It means the loading observable is evaluated in the 
    // next change detection run

    /*this.course$ = this.coursesService.findCourseByUrl(courseUrl);*/

    // this.lessons$ = of([]); // an observable array empty

    this.lessons$ = this.lessonEntityService.entities$ // contains lesson entities in the store
      .pipe(
        withLatestFrom(this.course$), // we emit 2 obseervables: 1 is the list of lessons, 2 the corse obsrevable
        tap(([lessons, course]) => {
          if (this.nextPage === 0) {
              this.loadLessonsPage(course);
            }
          }
      ),
        map(([lessons, course]) =>
          lessons.filter(lesson => lesson.courseId === course.id) // return all the lesson in the store for a course id
        )
      );

    /*this.lessons$ = this.course$.pipe(
      concatMap(course => this.coursesService.findLessons(course.id)),
      tap(console.log)
    );*/

  }


  loadLessonsPage(course: Course) {
    // fetch a list with a query param
    this.lessonEntityService.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3'
    });
    this.nextPage += 1;

  }

}
