import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct[]=[];
  id: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router  
  ){
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

    ngOnInit(): void {
      this.loadDATA();
    }

    loadDATA(){
      this.productService.getProductByID(this.id)
      .subscribe({
        next: ({ data }) => {
          this.product = [data];
        },
        error: (err) => {
          console.log(err);
        }
      })
      
    }
}
