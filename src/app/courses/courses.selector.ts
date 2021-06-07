import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './reducers/course.reducers';

export const selectorCoursesState = createFeatureSelector<CoursesState>('courses');

import * as reducerCourses from './reducers/course.reducers';

export const selectAllCourses = createSelector(
    selectorCoursesState, // access to full entity
    reducerCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo === true).length
);

export const areCoursesLoaded = createSelector(
    selectorCoursesState,
    state => state.allCoursesLoaded
);




