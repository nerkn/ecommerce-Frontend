import { useQueries, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import { Hero } from 'src/components/hero'
import { MainCategories } from 'src/types/site';

export default function CategoryPage() {
  let { categorySlug } = useParams();
  let  { isLoading, error, data : mainCategories } = useQueries<[Category, string]>(
    [
        {
            queryKey:['category'+categorySlug], 
            queryFn:()=>fetch('/api/category?where=slug,eq,'+categorySlug).then(r=>r.json())
        },
]

)
  const { t } = useTranslation('translation')
  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>
      <Hero />
    </>
  )
}
