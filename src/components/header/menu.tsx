
import { useQuery } from "@tanstack/react-query"; 
 
import { MainCategories } from "src/types/site";
 

export function NavigationMenuDemo() {
    let  { isLoading, error, data : mainCategories } = useQuery<MainCategories[]>({
        queryKey:['mainCategories'], 
        queryFn:()=>fetch('/pc/mainCategories.tr.json').then(r=>r.json())
    })
  return ( 
    <nav className="MainMenu"><ul>
        {mainCategories?.map(mc=>
            <li key={mc.slug}>
            <a href={'/c/'+mc.slug}>{mc.name}</a>
            {mc.subcategories?<div className="subMenu">
                <div className="imgPlace"> <img src={'/i/c/'+mc.slug+'.webp'} /></div>
                <div className="subCats">
                {mc.subcategories?.map(mcc=><a href={'/c/'+mc.slug+'/'+mcc.slug}>{mcc.name}</a>)}
                </div>
            </div>:''}
            </li>)}
        </ul>
    </nav>  
  )
}
 
