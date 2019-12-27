import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Car, Cars } from '../car.model';
import { AppState } from '../redux/app.state';
import { LoadCars, AddCar, DeleteCar, UpdateCar } from '../redux/cars.action';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  // tslint:disable-next-line: no-inferrable-types
  static BASE_URL: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  preloadCars(): Observable<any> {
    return this.http.get(CarsService.BASE_URL + 'cars').pipe(
      map((event) => { console.log(event); return event;
      })
    );
  }

  loadCars(): any {
    this.preloadCars()
    .subscribe((cars: Car[]) => {
      this.store.dispatch(new LoadCars(cars));
    });
  }

  addCar(car: Car) {
    return this.http.post(CarsService.BASE_URL + 'cars', car).pipe(
      map((event) => {return event;
      })
    // tslint:disable-next-line: no-shadowed-variable
    ).subscribe((car: Car) => {
      this.store.dispatch(new AddCar(car));
    });
  }

  deleteCar(car: Car) {
    return this.http.delete(CarsService.BASE_URL + 'cars/' + car.id).pipe(
      map((event) => {return event;
      })
    ).subscribe(() => {
      this.store.dispatch(new DeleteCar(car));
    });
  }

  updateCar(car: Car) {
    return this.http.put(CarsService.BASE_URL + 'cars/' + car.id, car).pipe(
      map((event) => {return event;
      })
    // tslint:disable-next-line: no-shadowed-variable
    ).subscribe((car: Car) => {
      this.store.dispatch(new UpdateCar(car));
    });
  }

}
