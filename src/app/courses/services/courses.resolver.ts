import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { allCoursesLoaded, loadAllCourses } from '../course.actions';
import { areCoursesLoaded } from '../courses.selector';
import { Course } from '../model/course';

// Resolve is an interface with a generic type (but actually is a service) that runs when the router has not completed yet
// its transitions. So it is used to make a backed call to prefetch data
@Injectable()
export class CoursesResolver implements Resolve<any> {

    loading: Boolean = false;
    constructor(private store: Store<AppState>) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // ths
        return this.store.pipe(
            select(areCoursesLoaded),
            tap((coursesLoaded) => {
                if (!this.loading && !coursesLoaded) {
                    this.loading = true;
                    this.store.dispatch(loadAllCourses()); // send the command to make the call to backend
                }
            }),
            filter(coursesLoaded => coursesLoaded), // l'observable viene concluso sul first(), solo quando coursesLoaded è true
            first(), // needed in order to ensure that observable complete and emits a value
            finalize(() => this.loading = false)
            );
    }

}
