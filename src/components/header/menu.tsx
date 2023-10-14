
import { useQuery } from "@tanstack/react-query"; 
import { ShoppingCart, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "src/hooks/shoppingCart"; 
import { Category } from "src/types/site";

export function NavigationMenuDemo() {
    let  { isLoading, error, data : mainCategories } = useQuery<Category[]>({
        queryKey:['mainCategories'], 
        queryFn:()=>fetch('/pc/mainCategories.tr.json').then(r=>r.json())
    })
    const {cart, cartRemoveFromLink} = useShoppingCart()
    console.log('cart Menu', cart, mainCategories)

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
                    <div className="subMenu cartMenu">
                        {cart.map(cartItem=><Link key={cartItem.id} to={'/p/'+cartItem.id} className="cartItem">
                            <div className="name" > {cartItem.name}</div>
                            <div className="price" > {cartItem.price}</div>
                            <a  className="remove" onClick={cartRemoveFromLink(cartItem)} ><XCircle /> </a>
                            </Link>)}
                        {cart.length?<Link to="/user/Cart" className="button cartLink">Satın Al </Link>:<ShoppingCart />  }
                    </div>
                </li>
            </ul>
        </nav>  
    )
}
 
