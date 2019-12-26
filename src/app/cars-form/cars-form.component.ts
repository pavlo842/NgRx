import { Component } from '@angular/core';

import { Car } from '../car.model';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/app.state';
import { AddCar } from '../redux/cars.action';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent {

  // tslint:disable-next-line: no-inferrable-types
  private id: number = 2;

  carName: '';
  carModel: '';

  constructor(
    private store: Store<AppState>,
    private service: CarsService,
  ) { }

  onAdd() {
    if (this.carName === '' || this.carModel === '') {
      return;
    }

    this.id = ++this.id;

    const car = new Car(
      this.carName,
      moment().format('DD.MM.YY'),
      this.carModel,
      false,
      this.id
    );

    this.store.dispatch(new AddCar(car));

    this.carModel = '';
    this.carName = '';

  }

  onLoad() {
    this.service.loadCars();
  }

}
