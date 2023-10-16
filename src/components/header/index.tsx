import React, { ReactNode } from 'react' 
import {  LucideShoppingCart, LucideUserCircle2 } from 'lucide-react'
import { MainCategoriesMenu } from './menu'
import { Link } from 'react-router-dom' 
import { userStore } from 'src/lib/userLogin'
import { useCart } from 'src/hooks/useCart'

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) { 

  const {user, logout, LoginFormSubmit} = userStore(s=>({
    user:   s.user, 
    logout: s.logout, 
    LoginFormSubmit:  s.LoginFormSubmit
  }))

  const cart = useCart()  
  return (
    <>
      <div className="fixed top-0 flex w-full 2xl:w-[1400px] items-center justify-between border bg-slate-50 bg-opacity-70 px-4 py-4 md:px-12 z-30 ">
      <Link to="/" className="text-xs md:text-base">
        Dükkanım
      </Link>
      <MainCategoriesMenu />
      <nav className="MainMenu">
        <ul>
          <li>
          <Link to="/user">
            <LucideUserCircle2 />
          </Link>
          <div className='subMenu -ml-20 p-4'>
              {user?.id?<div className='subCats'>
                  <Link to='/user' >{user.name}</Link>
                  <Link to='/user/Orders' >Siparislerim</Link>
                  <a onClick={logout} >Çıkış</a>
                  </div>
              :<div >
                <form className='form' onSubmit={LoginFormSubmit}>
                  <input name='email' placeholder='Email' required={true} />
                  <input name='password' placeholder='Şifreniz' required={true} />
                  <input type='submit' value="Giriş"/>

                </form>
                </div>}
          </div>

          </li>

          <li key={cart.cart.length}>
              <a><LucideShoppingCart /> </a>
              <div className="subMenu">
                  {cart.cart.map(cartItem=><Link key={cartItem.id} to={'/p/'+cartItem.id}>{cartItem.name}</Link>)}
                  <a onClick={()=>console.log(cart.cart)}>Cart Count</a>
              </div>
          </li>
        </ul>
      </nav>
    </div>
    
    </>
  )
}
