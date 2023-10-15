import { Product } from "src/types/site";
import useLocalStorageState from "./use-localstorage-state";
import { MouseEventHandler, SyntheticEvent } from "react";

type CartProduct = Product & {quantity:number}
let  DanglingItems:CartProduct[] = [] 
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
            DanglingItems = cartItems
            return [...cartItems]
        } )
    }
    function cartQuantityChange(product:Product, qty:number){
        cartSet(cartItems=>{
            return cartItems.map(cartItem=>(cartItem.id==product.id)?
                ({...cartItem, quantity:qty}):cartItem)
        })
    }
    function cartRemove(id:number){
        cartSet(cartItems=>{
            return cartItems.filter(cartItem=>cartItem.id!=id)
        })
    }
    function cartRemoveFromLink(cartItem:CartProduct){
        return (e:MouseEventHandler<HTMLAnchorElement>)=>{
            //e.stopPropagation();
            cartRemove(cartItem.id)
        }
    }
    function cartCount(){
        return cart.length
    }
    function cartIncludes(id:number){
        return cart.findIndex(cartItem=>cartItem.id==id)>-1
    }
    console.log('useShoppingCart, carts', cart)
    return {cart, cartAdd, cartRemove, cartIncludes, cartQuantityChange,  cartRemoveFromLink, cartCount}
}