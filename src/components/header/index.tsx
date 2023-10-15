import React, { ReactNode } from 'react'
import { LanguageSelector } from '../language-selector'
import { Button } from '../ui/button' 
import {  LucideShoppingCart, LucideUserCircle2 } from 'lucide-react'
import { MainCategoriesMenu } from './menu'
import { Link } from 'react-router-dom'
import { useShoppingCart } from "src/hooks/shoppingCart"; 

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) { 

  const {cart} = useShoppingCart() 
  return (
    <>
    <div className="fixed top-0 flex w-[1400px] items-center justify-between border bg-slate-50 bg-opacity-70 px-4 py-4 md:px-12 z-30 ">
      <Link to="/" className="text-xs md:text-base">
        Dükkanım
      </Link>
      <MainCategoriesMenu />
      <div className="MainMenu">
        <ul>
          <li>
          <Link to="/user">
            <LucideUserCircle2 />
          </Link>
          <div className='subMenu'>

          </div>

          </li>
        {/*<LanguageSelector />*/}
          <li key={cart.length}>
              <a><LucideShoppingCart /> </a>
              <div className="subMenu">
                  {cart.map(cartItem=><Link key={cartItem.id} to={'/p/'+cartItem.id}>{cartItem.name}</Link>)}
              </div>
          </li>
        </ul>
      </div>
    </div>
    
    </>
  )
}
