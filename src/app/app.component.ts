import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<Boolean>;
    isLoggedOut$: Observable<Boolean>;

    constructor(private router: Router, private store: Store<AppState>) {

    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      // this.store.subscribe(state => console.log('store value:', state));

      // map converts the global state into a the specific type, -> boolean
      // if there is a user profile, !!state['auth'].user is true
      /*this.isLoggedIn$ = this.store.pipe(
        map(state => !!state['auth'].user)
      );*/
      // if there is a user profile, !!state['auth'].user is false
      /*this.isLoggedOut$ = this.store.pipe(
        map(state => !state['auth'].user)
      );*/

      this.isLoggedIn$ = this.store.pipe(
        select(isLoggedIn)
      );

      this.isLoggedOut$ = this.store.pipe(
        select(isLoggedOut)
      );
    }

    logout() {

    }

}
