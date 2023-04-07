import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ICustomer } from 'src/app/models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  customer: ICustomer;

  constructor(
    private router: Router,
    private cusService: CustomerService
  ){
    this.customer = this.cusService.getCustomer();
  }

}
