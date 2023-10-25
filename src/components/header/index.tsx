import React, { ReactNode } from 'react'
import { LucideShoppingCart, LucideUserCircle2 } from 'lucide-react'
import { MainCategoriesMenu } from './menu'
import { Link } from 'wouter'
import { userStore } from 'src/libs/userLogin'
import { CartMenu } from './CartMenu'

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) {
  const { user, logout, LoginFormSubmit } = userStore((s) => ({
    user: s.user,
    logout: s.logout,
    LoginFormSubmit: s.LoginFormSubmit,
  }))

  return (
    <>
      <div className="fixed top-0 z-30 flex w-full items-center justify-between border bg-slate-50 bg-opacity-70 px-4 py-4 md:px-12 2xl:w-[1400px] ">
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
              <div className="subMenu -ml-20 p-4">
                {user?.id ? (
                  <div className="subCats">
                    <Link to="/user">{user.name}</Link>
                    <Link to="/user/Cart">Siparislerim</Link>
                    <a onClick={logout}>Çıkış</a>
                  </div>
                ) : (
                  <div>
                    <form className="form" onSubmit={LoginFormSubmit}>
                      <input name="email" placeholder="Email" required={true} />
                      <input name="password" placeholder="Şifreniz" required={true} />
                      <input type="submit" value="Giriş" />
                    </form>
                  </div>
                )}
              </div>
            </li>

            <CartMenu />
          </ul>
        </nav>
      </div>
    </>
  )
}
