import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'wouter'
import CategoriesSiblings from 'src/components/blocks/CategoriesSiblings'
import Products from 'src/components/blocks/Products'
import SubCategories from 'src/components/blocks/SubCategories'
import { ApiReturn, Category, Product, ProductCategories } from 'src/types/db'

export default function CategoryPage() {
  let { slug } = useParams()
  let [category, categorySet] = useState<Category>()
  let [productCategories, productCategoriesSet] = useState<ApiReturn<ProductCategories[]>>({
    error: false,
    data: [],
    msg: '',
  })
  useEffect(() => {
    fetch('/api/v1/category?where=slug,eq,' + slug)
      .then((r) => r.json())
      .then((categoryBE) => {
        if (!categoryBE || categoryBE.error || !categoryBE.data.length) return
        let category = categoryBE.data[0]
        categorySet(category)
        fetch('/api/v1/n2n?where=app,eq,product|bin,eq,category|t2,eq,' + category?.id)
          .then((r) => r.json())
          .then((r) => {
            productCategoriesSet(r)
          })
      })
  }, [slug])

  console.log('category', slug, category, productCategories)
  return (
    <>
      <Helmet>
        <title>{category?.name}</title>
      </Helmet>
      <div className="flex justify-between pb-2">
        <SubCategories parentSlug={category?.slug} parent={category?.id || 0} />
        <CategoriesSiblings parent={category?.id || 0} parentExclude={[0, 43]} />
      </div>
      <Products productIds={productCategories?.data.map((pc) => pc.t1) || []} parentSlug={category?.slug || ''} />
    </>
  )
}
