import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { loadAllCourses } from '../course.actions';
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
            tap(() => {
                if (!this.loading) {
                    this.loading = true;
                    this.store.dispatch(loadAllCourses()); // send the command to make the call to backend
                }
            }),
            first(), // needed in order to ensure that observable complete and emits a value
            finalize(() => this.loading = false)
            );
    }

}
