import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet' 
import { useParams } from 'react-router-dom'; 
import Products from 'src/components/blocks/Products';
import SubCategories from 'src/components/blocks/SubCategories';
import { ApiReturn, Category, Product, ProductCategories } from 'src/types/site';

export default function CategoryPage() {
  let { slug } = useParams();
  let [category,categorySet] = useState<Category>();
  let { isLoading, error, data : categoryBE  } = useQuery<ApiReturn<Category[]>>( {
            queryKey:['category'+slug], 
            queryFn:()=>fetch('/api/v1/category?where=slug,eq,'+slug).then(r=>r.json())
        })
  useEffect(()=>{
    if(!categoryBE)             return
    if(categoryBE.error)        return
    if(!categoryBE.data.length) return
    categorySet( categoryBE.data[0])
  },[categoryBE])
  let  {data : productCategories  } = useQuery<ApiReturn<ProductCategories[]>>( {
      queryKey:['ProductCategories'+category?.id], 
      queryFn:()=>fetch('/api/v1/n2n?where=app,eq,product|bin,eq,category|t2,eq,'+category?.id).then(r=>r.json()),    
      enabled: !!(category) ,
  })
         
  console.log('category', category, productCategories)
  return (
    <>
      <Helmet>
        <title>{category?.name}</title>
      </Helmet>
      <div>{slug}</div>
      
      <SubCategories parentSlug={category?.slug} parent={category?.id||0} />
      <Products productIds={productCategories?.data.map(pc=>pc.t1)||[]} parentSlug={category?.slug||''} />
      <div>{category?.name}</div>
    </>
  )
}
