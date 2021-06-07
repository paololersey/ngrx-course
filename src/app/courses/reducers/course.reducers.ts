import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { allCoursesLoaded } from '../course.actions';
import { compareCourses, Course } from '../model/course';

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean;
   // entities: {[key: number]: Course}; -> key is the id the course
   // ids: number[]; -> define the order of the entities
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses,
    selectId: course => course.id
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const coursesReducer = createReducer(
    initialCoursesState,
    on(allCoursesLoaded,
       // (state, action) => adapter.addAll(action.courses, state))
       (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true}))
       // shallow copy of state and set a property allCoursesLoaded to the EntityState
);

export const {selectAll} = adapter.getSelectors();



