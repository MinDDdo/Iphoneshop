export interface IOrder {
    _id: string,
    customer_id: string,
    order_date: Date,
    items: [
        {
            product_id: string;
            quantity: number;
        }
    ];
    total_price: number;
}