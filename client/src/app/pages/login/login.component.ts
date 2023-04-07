import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { ICustomer } from 'src/app/models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cusService: CustomerService,
    private router: Router
  ){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      console.log('Please fill complete');
      return;
    }
    const data = this.loginForm.value;

    this.cusService.login(data)
    .subscribe({
      next: (data) => {
        
        this.cusService.setCustomer(data.data);
        
        this.router.navigateByUrl('/profile');

        console.log(this.cusService.getCustomer());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  

}



