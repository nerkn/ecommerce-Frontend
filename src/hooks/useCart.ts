import { MouseEventHandler } from "react";
import { FormEventds, Product, User, UserAddress } from "src/types/site";
import { create } from "zustand";
import { persist } from 'zustand/middleware'



type CartProduct = Product & {quantity:number} & {image:string}


type useCartType = {
    cart : CartProduct[], 
    add:(product:Product, image:string,  quantity:number)=>void,
    quantityChange:(product:Product, qty:number)=>void,
    remove:(id:number)=>void,
    removeFromLink: (cartItem:CartProduct)=>(e:MouseEventHandler<HTMLAnchorElement>)=>void,
    includes:(id:number)=>boolean,
}


export const  useCart= create<useCartType>()(
    persist(
      (set, get)=>({
          cart:[],
          add: (product:Product, image:string, quantity=1)=>{
            set(cart=>{
                let cartItems = cart.cart;
                let item = cartItems.findIndex(cartItem=>cartItem.id==product.id)
                if(item != -1){ //found
                    cartItems[item] = {...cartItems[item], quantity:cartItems[item].quantity+quantity }
                }else{
                    cartItems.push({...product, quantity, image})
                }
                return {cart: [...cartItems]}
            } )},
          quantityChange:(product, qty)=>{
            set(cart=>{
                let cartItems = cart.cart;
                return {cart: cartItems.map(cartItem=>(cartItem.id==product.id)?
                    ({...cartItem, quantity:qty}):cartItem)}
            })
          },
          remove:(id:number)=>{
                set(cart=>{
                    return {cart: cart.cart.filter(cartItem=>cartItem.id!=id)}
                })
          },
          removeFromLink: (cartItem:CartProduct)=>{
            return (e:MouseEventHandler<HTMLAnchorElement>)=>{
                (e as unknown as Event).stopPropagation();
                get().remove(cartItem.id)
            }
          },
          includes:(id:number)=>get().cart.findIndex(cartItem=>cartItem.id==id)>-1,
    }),{
          name:'cart', 
          
      }
      )
  )