import { Component } from '@angular/core';

import { Car } from './car.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public cars: Car[] = [
    new Car('Ford', '12.12.2019', 'Focus', false, 1),
    new Car('Audi', '08.08.2016', 'A4', false, 2)
  ];

  onAdd(car: Car) {
    this.cars.push(car);
  }

  onDelete(car: Car) {
    this.cars = this.cars.filter(c => c.id !== car.id);
  }

}
