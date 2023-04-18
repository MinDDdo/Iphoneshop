import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-productshow',
  templateUrl: './productshow.component.html',
  styleUrls: ['./productshow.component.css']
})
export class ProductshowComponent implements OnInit {
  
  ipad:IProduct[] = [];
  iphone:IProduct[] = [];
  watch:IProduct[] = [];
  airpods:IProduct[] = [];

  products:IProduct[] = [];


  constructor(
    private router: Router,
    private productService: ProductService,
    private custService: CustomerService

  ) { }

  ngOnInit(): void {
    this.loadProducts();
   
  }

  loadProducts() {
    this.productService.getProducts()
      .subscribe({
        next: ({ data }) => {
          this.ipad = data.filter((d: any) => d.category === 'ipad');
          this.iphone = data.filter((d: any) => d.category === 'iphone');
          this.watch = data.filter((d: any) => d.category === 'watch');
          this.airpods = data.filter((d: any) => d.category === 'airpods');

          this.products = this.ipad;
        },
        error: (err) => {
          console.log(err);
        }
      })
     
  }
  

  ProductShow(show: string){
    if(show === 'ipad') this.products = this.ipad;
    if(show === 'iphone') this.products =  this.iphone;
    if(show === 'watch') this.products = this.watch;
    if(show === 'airpods') this.products =  this.airpods;
   
  }
  onClickLogout() {
    this.custService.removeCustomer();
    this.router.navigateByUrl('/login');
  }


}
