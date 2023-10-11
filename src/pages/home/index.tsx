import { Helmet } from 'react-helmet' 
import { ListOfCatBlock } from 'src/components/blocks/ListOfCatBlock'
import { Hero } from 'src/components/blocks/hero'
import { Footer } from 'src/components/footer'
//import { Hero:Hero1 } from 'src/components/hero'
import { t } from 'src/lib/utils'

export default function Home() { 
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Hero />
      <ListOfCatBlock catId={46} title='Çok Satanlar' />
      <ListOfCatBlock catId={44} title='Yeni Ürünler' /> 
    </>
  )
}
