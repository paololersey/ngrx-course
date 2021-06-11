import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { CoursesEntityService } from './course-entity.service';

@Injectable()
export class CourseResolver implements Resolve<boolean> {

    constructor(private courseEntityService: CoursesEntityService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // this.courseEntityService.getAll(); // emits an Observable<Course>
        /*return this.courseEntityService.getAll().pipe(
            map(courses => !!courses) // map a list of courses to a boolean with double negate
        );*/
        return this.courseEntityService.loaded$.pipe(
            tap(loaded => {
            if (!loaded) {
                this.courseEntityService.getAll();
                }
            }),
            filter(loaded => !!loaded), // wait for the true, i.e. data are loaded
            first() // firstd marks the completion of the observable
        );

    }

}
