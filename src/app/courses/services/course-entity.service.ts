import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityDefinitionService } from '@ngrx/data';
import { Course } from '../model/course';

// This is a facade service in order to manipulate the entities handy

@Injectable()
export class CoursesEntityService extends EntityCollectionServiceBase<Course> {

    constructor(serviceElmentsFactory: EntityCollectionServiceElementsFactory) {
        super('Course', serviceElmentsFactory);
    }
}

// const service = new CourseEntityService();
// service.addAllToCache -> add all entities to cache
