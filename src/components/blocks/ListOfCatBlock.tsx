import { useEffect, useState } from "react"
import { ApiReturn, Images, Product, ProductCategories } from "src/types/site"
import Products from "./Products"


export function ListOfCatBlock({catId, title}:{catId:number, title:string}){
    const [homePageProducts, homePageProductsSet]   = useState<number[]>([])
    const [products, productsSet]                   = useState<Product[]>([])
    const [images,   imagesSet]                     = useState<Images[]>([])

    useEffect(()=>{
        fetch(`/api/v1/n2n?where=app,eq,product|bin,eq,category|t2,eq,${catId}&orderby desc`).
            then(r=>r.json()).
            then((r:ApiReturn<ProductCategories[]>)=>homePageProductsSet(r.error?[]:r.data.map(r=>r.t1)) )

    },[]) 
    return <div className="card">
        <h2>{title}</h2>
        {
            homePageProducts.length?
                <Products productIds={homePageProducts} parentSlug="cok-satanlar" />:
                <></>
        }
            </div>

}