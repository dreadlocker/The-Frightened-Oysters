import { IProduct } from './IProduct';

export interface IOrder {
    id: number;
    price: number;
    address: string;
    email: string;
    name: string;
    payment: string;
    phone: string;
    dateCreated: string;
    products: IProduct[];
}
