import { Product } from "src/types/site";
import useLocalStorageState from "./use-localstorage-state";

type CartProduct = Product & {quantity:number}

export function useShoppingCart(){
    const [cart, cartSet] =  useLocalStorageState<CartProduct[]>('shoppingCart', [])
    function cartAdd(product:Product, quantity=1){
        cartSet(cartItems=>{
            let item = cartItems.findIndex(cartItem=>cartItem.id==product.id)
            if(item != -1){ //found
                cartItems[item] = {...cartItems[item], quantity:cartItems[item].quantity+quantity }
            }else{
                cartItems.push({...product, quantity})
            }
            return [...cartItems]
        } )
    }
    function cartRemove(id:number){
        cartSet(cartItems=>{
            return cartItems.filter(cartItem=>cartItem.id!=id)
        })
    }
    function cartIncludes(id:number){
        return cart.findIndex(cartItem=>cartItem.id==id)>-1
    }
    console.log('carts', cart)
    return {cart, cartAdd, cartRemove, cartIncludes}
}