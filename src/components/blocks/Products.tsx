import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { ApiReturn, Images, Product, ProductWithProperties } from 'src/types/db'

export default function Products({ productIds, parentSlug }: { productIds: number[]; parentSlug: string }) {
  const [products, productsSet] = useState<ProductWithProperties[]>([])

  useEffect(() => {
    console.log(' (!productIds || !productIds.length', !productIds, !productIds.length)
    if (!productIds || !productIds.length) return
    Promise.allSettled<ApiReturn<Product[]> | ApiReturn<Images[]>>([
      fetch('/api/v1/product?where=id,in,' + productIds.join()).then((r) => r.json()),
      fetch(`/api/v1/images?where=item,in,${productIds.join()}|orderby,eq,0`).then((r) => r.json()),
    ]).then((results) => {
      let products = (results[0].status == 'fulfilled' ? results[0].value.data : []) as Product[]
      let images = (results[1].status == 'fulfilled' ? results[1].value.data : []) as Images[]
      productsSet(
        products.map((p) => {
          let newp: ProductWithProperties = { ...p, images: [] }
          newp.images = images.filter((i) => p.id == i.item)
          return newp
        }),
      )
    })
  }, [productIds])

  console.log(products, productIds)
  return (
    <div className="BlocksProducts">
      {products?.map((sc) => (
        <Link className="product  h-96" to={'/p/' + (parentSlug ? `${parentSlug}/` : '') + sc.id}>
          {sc.images.length ? <img src={sc.images[0].url} /> : <div>Empty</div>}

          <div className="priceTag     text-white ">₺ {sc.price}</div>
          <div className="h-2">
            <div className="bg truncate rounded-sm hover:absolute hover:-ml-4 hover:-mt-8 hover:w-64 hover:text-clip hover:whitespace-normal hover:border hover:bg-white hover:p-4">
              {sc.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
