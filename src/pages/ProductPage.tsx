import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'wouter'
import CategoriesSiblings from 'src/components/blocks/CategoriesSiblings'
import SubCategories from 'src/components/blocks/SubCategories'
import { Stars } from 'src/components/stars'
import { useCart } from 'src/hooks/useCart'
import { useCategory } from 'src/hooks/useCategory'
import { fetchCatIdsByProduct, fetchCatsByProduct } from 'src/libs/fetch/categories'
import { ApiReturn, Category, Product, ProductWithProperties, ProductWithPropertiesEmpty } from 'src/types/db'

export default function ProductPage() {
  const imageMain = useRef<HTMLImageElement>(null)
  let categoryStore = useCategory()
  let [imageBG, imageBGSet] = useState('#000')
  let [product, productSet] = useState<ProductWithProperties>()
  let [productCategories, productCategoriesSet] = useState<number[]>([])
  let { pageid: pageidOr } = useParams()
  let { add: cartAdd, includes: cartIncludes, remove: cartRemove } = useCart()
  let pageid = parseInt(pageidOr || '') || 0
  useEffect(() => {
    Promise.allSettled([
      fetch('/api/v1/product?where=id,eq,' + pageid).then((r) => r.json()) as Promise<
        ApiReturn<ProductWithProperties[]>
      >,
      fetch('/api/v1/images?where=item,eq,' + pageid + '|app,eq,product|bin,eq,img').then((r) => r.json()),
      fetch('/api/v1/images?where=item,eq,' + pageid + '|app,eq,product|bin,eq,img').then((r) => r.json()),
      fetchCatsByProduct(pageid),
    ]).then((r) => {
      let product = r[0].status == 'fulfilled' ? r[0].value?.data[0] : { ...ProductWithPropertiesEmpty }

      product.images = r[1].status == 'fulfilled' ? r[1].value.data : []

      productSet(product)
      fetchCatIdsByProduct(product?.id || 0).then((r) => productCategoriesSet(r))
    })
  }, [pageid])

  function ImageOnload(e: React.SyntheticEvent<HTMLImageElement>) {
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
  console.log('product', pageid, product, productCategories)
  useEffect(() => {
    categoryStore.loadCategories()
  }, [])
  return (
    <>
      <Helmet>
        <title>{product?.name}</title>
      </Helmet>
      <section className="ProductPage w-full  md:py-4 lg:py-4">
        <div className="flex justify-between pb-2">
          {productCategories
            ?.filter((pc) => pc)
            .map((pc) => (
              <>
                <SubCategories parent={pc} />
                <CategoriesSiblings parent={pc} parentExclude={[0, 43]} />
              </>
            ))}
        </div>
        <div className="container grid grid-cols-[500px_1fr] flex-col items-start gap-8  p-0 lg:flex-row">
          <div className="lg:w-[500px]">
            <img
              alt={product?.name + 'Resmi'}
              className="w-full max-w-lg object-cover object-center lg:aspect-[1/1] lg:w-[800px] "
              src={product?.images[0].url}
              ref={imageMain}
              onLoad={(e) => ImageOnload(e)}
            />
            <div className="smallImages  items-center ">
              {product?.images.map((i) => (
                <div className="flex items-center overflow-hidden rounded-sm bg-slate-200 align-middle">
                  <img
                    src={i.url}
                    className="w-20"
                    onMouseOver={() => (imageMain?.current ? (imageMain.current.src = i.url) : '')}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter">{product?.name}</h1>
            <Stars rating={3} />
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{product?.price}</p>
            <p className="whitespace-pre-line text-base text-zinc-500 dark:text-zinc-400">{product?.description}</p>
            <div className="Rating">
              <a> 7 </a>
              <a> 8 </a>
              <a> 9 </a>
              <a> 10 </a>
            </div>
            {product ? (
              cartIncludes(product.id) ? (
                <a className="button w-full rounded-md p-6" onClick={() => cartRemove(product?.id || 0)}>
                  {' '}
                  Sepette, çıkart?
                </a>
              ) : (
                <a
                  className="button  w-full rounded-md p-6 "
                  onClick={() =>
                    cartAdd(
                      product || { ...ProductWithPropertiesEmpty },
                      product?.images.length ? product?.images[0].url : '',
                      1,
                    )
                  }
                >
                  Sepete ekle{' '}
                </a>
              )
            ) : (
              ''
            )}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 ">
              Fabric: 100% Cotton. Care: Machine wash cold, tumble dry low.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
