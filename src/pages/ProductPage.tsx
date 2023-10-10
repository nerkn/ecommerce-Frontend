import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet' 
import { useParams } from 'react-router-dom';  
import { Stars } from 'src/components/stars';
import { useShoppingCart } from 'src/hooks/shoppingCart';
import { ApiReturn, Category, Images, Product, ProductCategories, ProductWithProperties } from 'src/types/site';




export default function ProductPage() { 
  let { pageid:pageidOr } = useParams();
  let { cartAdd, cartIncludes, cartRemove } = useShoppingCart()
  const imageMain = useRef<HTMLImageElement>(null)
  let pageid = parseInt(pageidOr||'')||0
  let [category,categorySet] = useState<Category>();
  let [imageBG, imageBGSet]                = useState('#000')
  let { isLoading, error, data : product  } = useQuery<ProductWithProperties>( {
            queryKey:['product', pageid], 
            queryFn:()=>Promise.allSettled([
                fetch('/api/v1/product?where=id,eq,'+pageid)
                    .then(r=>r.json()) as Promise<Product[]>,
                fetch('/api/v1/images?where=item,eq,'+pageid+'|app,eq,product|bin,eq,img')
                    .then(r=>r.json()),
                fetch('/api/v1/images?where=item,eq,'+pageid+'|app,eq,product|bin,eq,img')
                    .then(r=>r.json())
                        ]).then((r)=>{
                          let product =  r[0].status=='fulfilled'?r[0].value?.data[0]:[]
                          product.images = r[1].status=='fulfilled'?r[1].value.data:[]
                          return product
                        })
        })
  let  {data : productCategories  } = useQuery<ApiReturn<ProductCategories[]>>( {
      queryKey:['ProductCategories'+category?.id], 
      queryFn:()=>fetch('/api/v1/n2n?where=app,eq,product|bin,eq,category|t1,eq,'+category?.id).then(r=>r.json()),    
      enabled: !!(category) ,
  })
  function ImageOnload(e:React.SyntheticEvent<HTMLImageElement>){
    return 
    /*
      let canvas = document.createElement('canvas' )
      canvas.width=1; canvas.height=1;
      let ctx = canvas.getContext('2d')
      if(!ctx)
        return console.log('context failed')
      ctx.drawImage(e.target, 0, 0)
      let color = ctx.getImageData(0,0,1,1)
      console.log('image color', color)
      imageBGSet(`rgb(${color.data[0]}, ${color.data[1]}, ${color.data[2]})`)
      somewhere /*style={{backgroundColor:imageBG}} * / 
      */
  }
  console.log('product', pageid, product)
  return (
    <>
      <Helmet>
        <title>{product?.name}</title>
      </Helmet> 
    <section className="ProductPage w-full py-12 md:py-24 lg:py-32">
      <div className="container flex items-start gap-8 px-4 md:px-6" 
           >
        <div className='w-[500px]' >
        <img
          alt={product?.name + 'Resmi'}
          className="aspect-[1/1] object-cover object-center max-w-lg h-[800px]"
          height="800px"
          src={product?.images[0].url}
          width="500px"
          ref={imageMain}
          onLoad={e=>ImageOnload(e)}
        />
        <div className='grid grid-cols-5 py-4 '>
            {product?.images.map(i=><img src={i.url} className='w-20' onMouseOver={()=>imageMain?.current?imageMain.current.src=i.url:''} /> )}
        </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter">{product?.name}</h1>
            <Stars rating={3} />
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{product?.price}</p>
          <p className="text-base text-zinc-500 dark:text-zinc-400 whitespace-pre-line">
            {product?.description}
          </p>
          <div className="Rating">
            <a >              7            </a>
            <a >              8            </a>
            <a >              9            </a>
            <a >              10            </a>
          </div>
          {product?(
            cartIncludes(product.id)?
              <a className='w-full p-6 ' onClick={()=>cartRemove(product?.id||0)}> On the list, Remove?</a>: 
              <a className="w-full  p-6 rounded-md button " onClick={()=>cartAdd(product, 1)}>
                Add to Cart
              </a>
          ):''}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 ">
            Fabric: 100% Cotton. Care: Machine wash cold, tumble dry low.
          </p>
        </div>
      </div>
    </section>
    </>
  )
}
