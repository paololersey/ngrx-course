import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator, Logger} from '@ngrx/data';
import {Course} from '../model/course';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';


@Injectable()
export class CourseDataService extends DefaultDataService<Course> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('Hero', http, httpUrlGenerator);
    logger.log('Created custom Hero EntityDataService');
  }

  getAll(): Observable<Course[]> {
    return this.http.get('/api/courses')
      .pipe(
        map(res => res['payload']),
        tap(console.log)
      );
  }

}
