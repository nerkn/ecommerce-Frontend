
import { useQuery } from "@tanstack/react-query"; 
import { Link } from "react-router-dom";
import { Category } from "src/types/site";

export function MainCategoriesMenu() {
    let  { isLoading, error, data : mainCategories } = useQuery<Category[]>({
        queryKey:['mainCategories'], 
        queryFn:()=>fetch('/pc/mainCategories.tr.json').then(r=>r.json())
    })
    return ( 
        <nav className="MainMenu hidden lg:flex"><ul>
            {mainCategories?.map(mc=>
                <li key={mc.slug} >
                <Link to={'/c/'+mc.slug}>{mc.name}</Link>
                {mc.subcategories?<div className="subMenu">
                    <div className="imgPlace"> <img src={'/i/c/'+mc.slug+'.webp'} /></div>
                    <div className="subCats">
                    {mc.subcategories?.map(mcc=><Link key={mcc.slug} to={'/c/'+mc.slug+'/'+mcc.slug}>{mcc.name}</Link>)}
                    </div>
                </div>:''}            
                </li>)}
            </ul>
        </nav>  
    )
}
 
