import { Producto } from "../models/Producto";

export interface Cart {
    id: number; 
    products: { product: Producto; cantidad: number }[];
  }
  