import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { ApiReturn, Category } from "src/types/site"

export default function SubCategories({
    parent, 
    parentSlug
  }:{
    parent:number, 
    parentSlug?:string
  }) {
    let  {data : subcategories  } = useQuery<ApiReturn<Category[]>>( {
        queryKey:['subcategories'+parent], 
        queryFn:()=>fetch('/api/v1/category?where=parent,eq,'+parent).then(r=>r.json()),      
        enabled: !!(parent) ,
    })
    
    return (
      <div className="flex ">
        {subcategories?.data.map(sc=><div className="category" key={sc.id}>
            <div><Link className="button" to={"/c/"+(parentSlug?`${parentSlug}/`:'')+sc.slug}>{sc.name}</Link></div>
        </div>)}
      </div>
    )
  }
  