import { useQuery } from "@tanstack/react-query"
import { FormEvent, useState } from "react"
import { ApiReturn, Category, Product, ProductAli } from "src/types/site"
import { json } from "stream/consumers"
import ProductForm from "./productForm"
import { Link } from "react-router-dom"

export default function AdminProduct() {
    const [ found, foundSet]              = useState<Product[]>([])
    const [ foundAli, foundAliSet]        = useState<ProductAli[]>([])
    const [ productEdit, productEditSet]  = useState<Product>()
    let  {data : categories  } = useQuery<ApiReturn<Category[]>>( {
        queryKey:['Categories'], 
        queryFn:()=>fetch('/api/v1/category').then(r=>r.json()),  
    })


    let searchFunction =  (event:FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      let searchElems = new FormData(event.target as HTMLFormElement)
      fetch('/api/v1/product?where=name,like,'+searchElems.get('name')).
        then(r=>r.json()).then(r=>r.error?foundSet([]):foundSet(r.data))
      fetch('/api/v1/aliproducts?where=product_title,like,'+searchElems.get('name')).
        then(r=>r.json()).then(r=>r.error?foundAliSet([]):foundAliSet(r.data))
    }
    const productSelect =(ali:ProductAli)=>{
        productEditSet({
            id:0, 
            description:ali.product_description,
            name:ali.product_title,
            price:ali.product_price
        })
    }

    return (
      <div className="flex  flex-col ">
        <form onSubmit={searchFunction} className="bg-[hsl(var(--accent))] flex gap-2 items-center">
            <label>Search Form</label>
            <select name="category">
                <option>Kategori</option>
                {categories?.data.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <input name="name" />
            <input name="name" type="submit" className="button" value="Ara"/>
        </form>
        <div className="flex gap-2 flex-wrap justify-between ">
        {found?.map(sc=><div className="product w-36" key={sc.id}  >
            <div><Link className="button" to={"/p/"+sc.id}>{sc.name}</Link></div>
        </div>)}
        {foundAli?.map(sc=><div className="product w-36" key={sc.id}>
            <div><Link className="button"  to="#"  onClick={()=>productSelect(sc)}>{sc.product_title}</Link></div>
        </div>)}
        </div>
        {productEdit?(
            <ProductForm 
                product={productEdit} 
                key={productEdit.id?productEdit.id:new Date().getTime()} />
            
            ):''}
      </div>
    )
  }
  