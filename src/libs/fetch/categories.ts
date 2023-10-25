import { Category, ProductCategories } from 'src/types/db'
import { fetchX } from '../fetchx'

export async function fetchCatIdsByProduct(productId: number): Promise<number[]> {
  return fetchX('n2n?where=app,eq,product|bin,eq,category|t1,eq,' + productId).then((r) =>
    r.map((t: ProductCategories) => t.t2),
  )
}
export async function fetchCategoriesById(ids: number[]): Promise<Category[]> {
  return fetchX('category?where=id,in,' + ids.join(','))
}
export async function fetchCatsByProduct(productId: number): Promise<Category[]> {
  return fetchCatIdsByProduct(productId).then((r) => fetchCategoriesById(r))
}
