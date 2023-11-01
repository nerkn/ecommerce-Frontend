import { homePageProductType } from 'src/types/db'
import { Link , useLocation} from 'wouter'
import {onClickViewTX} from '../../libs/utils'

export function ListOfCatBlock({ title, products }: { title: string; products: homePageProductType[] }) {
  const [location, navigate] = useLocation()
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="flex flex-wrap  gap-4">
        {products?.map((sc) => (
          <div className="product w-64" key={sc.id}>
            <div className="relative  ">
              <Link className="button" onClick={onClickViewTX('img','productImg', navigate)} to={'/p/' + sc.id}>
                <img src={sc.image} alt={'image of ' + sc.name} width="222px" height="333px" />
                <div className="absolute right-4 mt-[-2rem] rotate-6 rounded-sm border border-red-100 bg-red-300 p-2 text-white shadow-md">
                  ₺ {sc.price}
                </div>
                <div className="h-2">
                  <div className="bg truncate hover:absolute hover:w-64 hover:text-clip hover:whitespace-normal">
                    {sc.name}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
