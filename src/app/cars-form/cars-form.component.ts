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

  carName: '';
  carModel: '';

  constructor(
    private service: CarsService,
  ) { }

  onAdd() {
    if (this.carName === '' || this.carModel === '') {
      return;
    }

    const date = moment().format('DD.MM.YY');
    const car = new Car(this.carName, date, this.carModel);

    this.service.addCar(car);

    this.carModel = '';
    this.carName = '';

  }

  onLoad() {
    this.service.loadCars();
  }

}
