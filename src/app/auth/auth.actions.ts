import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';

// Use an action only in a point of an application
export const login = createAction (
    // [Login page] is where the action is used
    // [User Login] is the event triggered - type
    // props indicates the type of the payload
    '[Login page] User Login',
    props<{ user: User} >()
);

export const logout = createAction (
    // [Top menu] is where the action is used
    // [Logout] is the event triggered - type
    // props indicates the type of the payload: in this case there is no payload
    '[Logout page] User Logout'
);


