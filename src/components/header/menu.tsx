
import { useQuery } from "@tanstack/react-query"; 
import { Link } from "react-router-dom";
import { useShoppingCart } from "src/hooks/shoppingCart"; 
import { Category } from "src/types/site";

export function MainCategoriesMenu() {
    let  { isLoading, error, data : mainCategories } = useQuery<Category[]>({
        queryKey:['mainCategories'], 
        queryFn:()=>fetch('/pc/mainCategories.tr.json').then(r=>r.json())
    })
    const {cart} = useShoppingCart() 
    return ( 
        <nav className="MainMenu"><ul>
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
                <li key={cart.length}>
                    <a>Shopping Cart </a>
                    <div className="subMenu">
                        {cart.map(cartItem=><Link key={cartItem.id} to={'/p/'+cartItem.id}>{cartItem.name}</Link>)}
                    </div>
                </li>
            </ul>
        </nav>  
    )
}
 
