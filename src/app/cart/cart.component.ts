import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../..shared-service/http.service';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  cars = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh(); 
    // this.createCar('car' , {make: })
    // this.updateCar('car/id/1', {make: 'Ford', model: 'Fiesta'} );

  }
  async refresh () {
    this.cars = await this.getCars('car');
  }

  async getCars(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getCars()' , resp);
    return resp;
  }
  async createCar() {
    const car = {
      make: null,
      model: null,
      year: null
    };
    const resp = await this.http.post('car', car);
    console.log('from createCar resp:', resp);
    if (resp) {
      // this.refresh();
      this.cars.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Car did not create!');
    }
    return resp;
  }
  async updateCar(car: any) {
    console.log('from updateCar car: ', car);
    const resp = await this.http.put(`car/id/${car.id}`, car);
    if (resp) {
      this.toastService.showToast('Success', 3000, 'Car updated successfully!');
    }
    return resp;
  }

  async removeCar(car: any, index: number) {
    console.log('from removeCar...', index);
    this.cars.splice(index, 1);

  }


}
