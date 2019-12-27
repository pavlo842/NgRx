import { Injectable } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';

import { CAR_ACTION, AddCar } from './cars.action';
import { Car } from '../car.model';
import { CarsService } from '../services/cars.service';

@Injectable()
export class CarEffect {

    // First variant!!!

    // @Effect() loadCars = this.actions$.pipe(
    //     ofType(CAR_ACTION.ADD_CAR),
    //     switchMap((action: AddCar) => {
    //         return this.service.preloadCars();
    //     }),
    //     mergeMap((cars: Car[]) => {
    //         return [
    //             {
    //                 type: CAR_ACTION.LOAD_CARS,
    //                 payload: cars
    //             }
    //         ];
    //     })
    // );


    // Second variant

    loadCars$ = createEffect(() => this.actions$
        .pipe(
            ofType(CAR_ACTION.ADD_CAR),
            switchMap((action: AddCar) => {
                return this.service.preloadCars();
            }),
            mergeMap((cars: Car[]) => {
                return [
                    {
                        type: CAR_ACTION.LOAD_CARS,
                        payload: cars
                    }
                ];
            })
        )
    );

    constructor(
        private actions$: Actions,
        private service: CarsService,
    ) {}


}
