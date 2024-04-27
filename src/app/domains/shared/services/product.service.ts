import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient)

  constructor () { }

  getProducts(categoryId: string) {
    const url = new URL('https://api.escuelajs.co/api/v1/products')
    if (categoryId) {
      url.searchParams.set('categoryId', categoryId)
    }
    return this.http.get<Product[]>(url.toString())
  }

  getProduct(id: string) {
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
  }

  getProductsByCategory(categoryId: string) {
    return this.http.get<Product[]>(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`)
  }
}
