import { Action } from '@ngrx/store';

import { Car } from '../car.model';

const initialState = {
    cars: [
        new Car('Ford', '12.12.2019', 'Focus', false, 1),
        new Car('Audi', '08.08.2016', 'A4', false, 2)
    ]
}

export function carsReducer(state = initialState, action: Action) {
    switch (action.type) {
        default:
            return state;
    }
}


