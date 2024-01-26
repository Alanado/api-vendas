import {
   CreateDateColumn,
   Entity,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';
import OrdersProducts from './OrdersProducts';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

@Entity('orders')
export default class Order {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => Customer)
   @JoinColumn({ name: 'customer_id' })
   customer: Customer;

   @OneToMany(() => OrdersProducts, orders_product => orders_product.order, {
      cascade: true,
   })
   order_products: OrdersProducts[];

   @CreateDateColumn()
   created_at: Date;

   @CreateDateColumn()
   updated_at: Date;
}
