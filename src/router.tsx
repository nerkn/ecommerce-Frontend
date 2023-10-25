import { Route } from 'wouter'
import { LayoutGetDefault } from './components/layout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/user/Cart'
import UserPage from './pages/UserPage'
import { BlogPage } from './pages/BlogPage'

export const routerObjects: { path: string; Component: () => JSX.Element }[] = [
  { path: '/', Component: HomePage },
  { path: '/c/:slug', Component: CategoryPage },
  { path: '/b/:slug', Component: BlogPage },
  { path: '/b/:ignore/:slug', Component: BlogPage },
  { path: '/c/:ignore/:slug', Component: CategoryPage },
  { path: '/p/:pageid', Component: ProductPage },
  { path: '/p/:slugCategory/:pageid', Component: ProductPage },
  { path: '/user', Component: UserPage },
  { path: '/user/Cart', Component: CartPage },
]

export function CreateRouter() {
  const routeWrappers = routerObjects.map((router) => <Route path={router.path} component={router.Component} />)
  return <LayoutGetDefault>{routeWrappers}</LayoutGetDefault>
}
