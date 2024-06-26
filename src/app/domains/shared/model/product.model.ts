import { Category } from "./category.model"

export interface Product {
  id: string
  images: string[]
  price: number
  title: string
  creationAt: string
  description: string
  category: Category
}
