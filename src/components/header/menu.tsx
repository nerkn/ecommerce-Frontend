import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import { Category } from 'src/types/db'

export function MainCategoriesMenu() {
  let [mainCategories, mainCategoriesSet] = useState<Category[]>([])
  useEffect(() => {
    fetch('/pc/mainCategories.tr.json')
      .then((r) => r.json())
      .then((r) => mainCategoriesSet(r))
  }, [])
  return (
    <nav className="MainMenu hidden lg:flex">
      <ul>
        {mainCategories?.map((mc) => (
          <li key={mc.slug}>
            <Link to={'/c/' + mc.slug}>{mc.name}</Link>
            {mc.subcategories ? (
              <div className="subMenu">
                <div className="imgPlace">
                  {' '}
                  <img src={'/i/c/' + mc.slug + '.webp'} />
                </div>
                <div className="subCats">
                  {mc.subcategories?.map((mcc) => (
                    <Link key={mcc.slug} to={'/c/' + mc.slug + '/' + mcc.slug}>
                      {mcc.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
