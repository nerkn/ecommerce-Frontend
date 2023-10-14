import { Helmet } from 'react-helmet' 
import { ListOfCatBlock } from 'src/components/blocks/ListOfCatBlock'
import { Hero } from 'src/components/blocks/hero'
import { Footer } from 'src/components/footer'
//import { Hero:Hero1 } from 'src/components/hero'
import { t } from 'src/lib/utils'
import { Categories } from './home/Categories'

export default function Home() { 
  return (
    <div className='HomePage'>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Hero />
      <Categories />
      <ListOfCatBlock catId={46} title='Çok Satanlar' /> 
      <ListOfCatBlock catId={11} title='Yeni Ürünler' /> 
    </div>
  )
}
