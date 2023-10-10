import { Helmet } from 'react-helmet' 
import { Hero } from 'src/components/hero'
import { t } from 'src/lib/utils'

export default function Home() { 
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Hero />
    </>
  )
}
