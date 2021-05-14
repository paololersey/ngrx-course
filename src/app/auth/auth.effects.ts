import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action.types';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private router: Router) {
    }

    // we get notified when action login is triggered


    // added  error handling and avoid manual subscription
    // if something goes wrong the observable is recreated
    // dispatch false is necessary in order to avoid loops. Otherwise happens:
    // login action, listen to that, save to local storage, dispatch the same action,
    // so it would create a loop
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            tap(action => {
                localStorage.setItem('user', JSON.stringify(action.user));
            }
            )
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(action => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/login');
            }
            )
        ),
        { dispatch: false }
    );



    // trivial syntaxs
    /* actions$.subscribe(action => {
         if (action.type === '[Login page] User Login') {
             // access local storage
             localStorage.setItem('user', JSON.stringify(action['user']));
         }
     });*/

}
