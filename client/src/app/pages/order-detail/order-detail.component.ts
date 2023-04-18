import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/models/order';
import { IProduct } from 'src/app/models/product';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orders : IProduct[] = [];

  selectProduct: boolean[]=[];
  costProduct:number[]=[];
  amountProduct: number[]=[];
  totalprice: number=0; 
  selectAll: boolean = true;
  showSuccess: boolean = false;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private custService: CustomerService
  ){}
  ngOnInit(): void {

    this.loadData();
    this.sumTotal();
    
  }
  loadData() {
    this.orders = this.orderService.getOrders();

    this.selectProduct = this.orders.map(() => true);
    
    this.amountProduct = this.orders.map(() =>1);

    this.costProduct = this.orders.map( p => p.price);

    this.totalprice = this.orders.reduce(( acc: any, curr) => acc + curr.price , 0 )


  }

  onClickMinus( id: string ,i:any){
    const product = this.orders.filter(p => p._id === id);
    const minus = this.amountProduct[i] - 1;

    if (minus > 0){
      this.amountProduct[i] -= 1;
      this.costProduct[i] -= product[0].price;
    }
    this.sumTotal();
  }

  onClickAdd(id: string , i : any){
    const product = this.orders.filter(p => p._id === id);
    const add = this.amountProduct[i] + 1;

    if (add <= product[0].quantity) {
      this.amountProduct[i] += 1;
      this.costProduct[i] += product[0].price;

    }
    this.sumTotal();
  }

  onSelectP(i:any){
    this.selectProduct[i] = !this.selectProduct[i];
    this.selectAll = false;

    let all = true;
    this.selectProduct.filter( s => {
      if (s === false) all = false;

    });

    if (all) {
        this.selectAll = true;
    }

    this.sumTotal();
  }

  sumTotal() {
    this.totalprice = this.costProduct.reduce(( acc, curr , i) => {
      if ( this.selectProduct[i] === true) return acc + curr;
      return acc;
    },0);

  }

  onSelectAll() {
    this.selectAll = !this.selectAll;
    this.selectProduct = this.selectProduct.map(() => this.selectAll);

    this.sumTotal();
  }

  onCheckOut() {
    if (this.selectProduct.includes(true)) {
      // cust_id
      const{_id} = this.custService.getCustomer();
      console.log(_id);

      //items
      const items = this.selectProduct.map((s, i) => {
        if (s === true ) {
          const data = {
            product_id: this.orders[i]._id,
            quantity: this.amountProduct[i]
          }
          return data;
        }
        return {};
      })
      
      this.orderService.createOrder(_id, items)
      .subscribe({
        next: () => {
          this.showSuccess = true;

        },
        error: (err) => {
            console.log(err);

        }
      })
    }
  }
  onClickLogout() {
    this.custService.removeCustomer();
    this.router.navigateByUrl('/login');
  }
}
