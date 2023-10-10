import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import {  ApiReturn, Images, Product, ProductWithProperties } from "src/types/site"

export default function Products({
    productIds,
    parentSlug
  }:{
    productIds:number[],
    parentSlug:string
  }) {
    
  let  {data : products  } = useQuery<ProductWithProperties[]>( {
    queryKey:['Products'+productIds], 
    queryFn:()=>Promise.allSettled<ApiReturn<Product[]>| ApiReturn<Images[]>>([
      fetch('/api/v1/product?where=id,in,'+productIds.join()).then(r=>r.json()),    
      fetch(`/api/v1/images?where=item,in,${productIds.join()}|orderby,eq,0`).then(r=>r.json()),    
    ]).then(results=>{
      let products = ((results[0].status=='fulfilled')?results[0].value.data:[]) as Product[]
      let images   = ((results[1].status=='fulfilled')?results[1].value.data:[]) as Images[]
      return  products.map((p)=>{
        let newp:ProductWithProperties = {...p, images:[]}
        newp.images = images.filter((i)=>p.id==i.item)
        return newp
        })

    }),

    enabled: !!(productIds && productIds.length) ,
})
    console.log(products, productIds)
    return (
      <div className="flex flex-wrap  gap-4">
        {products?.map(sc=><div className="product w-64" key={sc.id}>
            <div className="relative  "><Link className="button" to={"/p/"+(parentSlug?`${parentSlug}/`:'')+sc.id}>
              {sc.images.length?<img src={sc.images[0].url}  />:<div>Empty</div>}
              
              <div className="mt-[-2rem] bg-red-300 absolute right-4 p-2 rounded-sm rotate-6 text-white border border-red-100 shadow-md">
              ₺ {sc.price}</div>
              <div className="h-2">
                <div className="bg truncate hover:text-clip hover:absolute hover:w-64 hover:whitespace-normal">
                  {sc.name}
                </div>
              </div>
              </Link></div>
        </div>)}
      </div>
    )
  }
  