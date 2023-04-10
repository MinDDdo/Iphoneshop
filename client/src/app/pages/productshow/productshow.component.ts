import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-productshow',
  templateUrl: './productshow.component.html',
  styleUrls: ['./productshow.component.css']
})
export class ProductshowComponent implements OnInit {
  products: IProduct[] = [];

  constructor(
    private router: Router,
    private productService: ProductService

  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts()
      .subscribe({
        next: ({ data }) => {
          this.products = data;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }



}
