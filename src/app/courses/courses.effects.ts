import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, mergeMap } from 'rxjs/operators';
import { CourseActions } from './action.types';
import { allCoursesLoaded } from './course.actions';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action =>
                this.courseHttpService.findAllCourses()
            ),
            map(courses =>
                allCoursesLoaded({ courses })
            )
        )

    );

    saveCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CourseActions.courseUpdate),
            // for save operation use concatMap, since it is a high order operator that makes the operation sequentially
            concatMap(action =>
                this.courseHttpService.saveCourse(action.update.id, action.update.changes)
            )
         ),
         {dispatch: false}
    );
    constructor(private actions$: Actions, private courseHttpService: CoursesHttpService) { }
}
