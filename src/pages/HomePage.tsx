import { Helmet } from 'react-helmet'
import { ListOfCatBlock } from 'src/components/blocks/ListOfCatBlock'
import { Hero } from 'src/components/blocks/hero'
import { t } from 'src/libs/utils'
import { Categories } from './home/Categories'
import { useEffect, useState } from 'react'
import { homePageProductType } from 'src/types/db'

export default function Home() {
  const [homePageProducts, homePageProductsSet] = useState<homePageProductType[]>([])
  useEffect(() => {
    fetch('/api/homepage')
      .then((r) => r.json())
      .then((r) => homePageProductsSet(r.data))
  }, [])
  return (
    <div className="HomePage">
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Hero />
      <Categories />

      <ListOfCatBlock title="Çok Satanlar" products={homePageProducts?.filter((fpp) => fpp.n == 46)} />
      <ListOfCatBlock title="Yeni Ürünler" products={homePageProducts?.filter((fpp) => fpp.n == 11)} />
    </div>
  )
}
