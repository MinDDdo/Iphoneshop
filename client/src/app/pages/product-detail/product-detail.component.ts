import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: IProduct[]=[];
  id: any;
  category: string = 'ipad';

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService
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
          this.product.filter(p => {
            this.category = p.category
          })
        },
        error: (err) => {
          console.log(err);
        }
      })
      
    }

  onClickBuy(){
    this.orderService.addOrders(this.product[0]);

    this.router.navigateByUrl('/order-detail')
  }
} 
