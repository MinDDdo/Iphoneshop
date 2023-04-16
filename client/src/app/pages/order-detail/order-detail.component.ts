import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/order';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orders : IProduct[] = [];
  amount: number = 1 ;
  subtotal: number= 0 ;

  constructor(
    private router: Router,
    private orderService: OrderService
  ){}
  ngOnInit(): void {
    this.loadData();

    this.subtotal = this.orders[0].price;
    
  }
  loadData() {
    this.orders = this.orderService.getOrders();
    console.log(this.orders);

  }

  onClickMinus(id:string){
    const product = this.orders.filter(p => p._id === id);
    const minus = this.amount - 1;

    if (minus > 0){
      this.amount -= 1;
      this.subtotal -= product[0].price;
    }
  }

  onClickAdd(id: string ){
    const product = this.orders.filter(p => p._id === id);
    const add = this.amount +1;

    if (add <= product[0].quantity) {
        this.amount +=1;
        this.subtotal += product[0].price;
    }
  }
  

}
