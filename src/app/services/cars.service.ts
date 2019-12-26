import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppState } from '../redux/app.state';
import { Store } from '@ngrx/store';
import { Car } from '../car.model';
import { LoadCars } from '../redux/cars.action';

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

  loadCars(): any {
    return this.http.get(CarsService.BASE_URL + 'cars').pipe(
      map((event) => { console.log(event); return event;
      })
    ).subscribe((cars: Car[]) => {
      this.store.dispatch(new LoadCars(cars));
    });
  }

}
