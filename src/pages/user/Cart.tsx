import { useEffect, useState } from "react"; 
import { LoginPlace } from "src/components/blocks/loginPlace";
import { useShoppingCart } from "src/hooks/shoppingCart"
import { Images, Product, UserAddress } from "src/types/site";
import { Addresses } from "./Addresses";
import { Payment } from "./Payment";
import { noAddress } from "src/types/resources";


export default function CartPage({}){
    const [products, productsSet]   = useState<Product[]>([])
    const [images, imagesSet]       = useState<Images[]>([])
    const [address, addressSet]     = useState<UserAddress>({...noAddress})
    const {cart, cartQuantityChange} = useShoppingCart();
    useEffect(()=>{
        if(!cart.length)
            return
        let pids = cart.map(p=>p.id)
        fetch('/api/v1/product?where=id,in,'+ pids).
            then(r=>r.json()).
            then(r=>r.error?console.log('products yuklenmedi', r.data):productsSet(r.data))
        fetch('/api/v1/images?where=app,eq,product|orderby,eq,0|bin,eq,img|item,in,'+ pids).
            then(r=>r.json()).
            then(r=>r.error?console.log('images yuklenmedi', r.data):imagesSet(r.data))
    }, [cart])
    

    return <div className="CartPage grid grid-cols-2">
        <div className="products" >
            {cart.map((cartItem, i)=>products.filter(p=>cartItem.id==p.id).
                map(p=><div className="oneCartItem">
                <div className="image">{images.filter(i=>i.item==cartItem.id).map(i=><img src={i.url} />)}</div>
                    <div className="name">{p.name}</div> 
                <div className="price">
                        {cartItem.price!==p.price?<><b>{p.price}</b><u>{cartItem.price}</u></>:<b>{p.price}</b>}
                </div>
                <div className="quantity"><input type="number" value={cartItem.quantity} onChange={e=>cartQuantityChange(p, parseInt(e.target.value))} />
                <div className="lineTotal">{cartItem.quantity*p.price}</div>
                </div>
                
            </div>)
            )} 
            <div className="grandTotal"> 
                <div>Toplam ödenecek</div>
                <div>{[...document.querySelectorAll('.lineTotal')].reduce((t,l)=>t+(parseFloat(l.innerHTML)||0),0)}</div>
            </div>
        </div>
        <div>
            <LoginPlace />
            <Addresses externalSelectedAddressSet={addressSet} />
            <Payment />
            <a >Siparisi ver</a>
        </div>
    </div>

}