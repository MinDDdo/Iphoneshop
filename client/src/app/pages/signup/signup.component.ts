import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { ICustomer } from 'src/app/models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  customer: ICustomer[] = [];
  signupForm: FormGroup;
  
   

  constructor(
    private cusService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ){
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if(!this.signupForm.valid) {
      console.log('Please fill complete');
      return;
    }

    const data = this.signupForm.value;

    this.cusService.signup(data)
    .subscribe({
      next: (data) => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
