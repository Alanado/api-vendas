import OrdersProducts from '@modules/orders/typeorm/entities/OrdersProducts';
import {
   Column,
   CreateDateColumn,
   Entity,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export default class Product {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @OneToMany(() => OrdersProducts, orders_products => orders_products.product)
   order_products: OrdersProducts[];

   @Column()
   name: string;

   @Column('decimal')
   price: number;

   @Column('int')
   quantity: number;

   @CreateDateColumn()
   created_at: Date;

   @CreateDateColumn()
   updated_at: Date;
}
