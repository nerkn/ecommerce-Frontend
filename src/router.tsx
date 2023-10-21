import { createBrowserRouter, createHashRouter, RouteObject } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import AdminProduct from './pages/admin/product'
import AdminAliExpress from './pages/admin/aliExpress'
import AdminCategory from './pages/admin/Category'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/user/Cart'
import UserPage from './pages/UserPage'
import { BlogPage } from './pages/BlogPage'

export const routerObjects: RouteObject[] = [
  { path: '/', Component: HomePage },
  { path: '/c/:slug', Component: CategoryPage },
  { path: '/b/:slug', Component: BlogPage },
  { path: '/b/:ignore/:slug', Component: BlogPage },
  { path: '/c/:ignore/:slug', Component: CategoryPage },
  { path: '/p/:pageid', Component: ProductPage },
  { path: '/p/:slugCategory/:pageid', Component: ProductPage },
  { path: '/user', Component: UserPage },
  { path: '/user/Cart', Component: CartPage },
  { path: '/admin/product', Component: AdminProduct },
  {
    path: '/admin/product',
    Component: AdminProduct,
  },
  {
    path: '/admin/aliExpress',
    Component: AdminAliExpress,
  },
  {
    path: '/admin/category',
    Component: AdminCategory,
  },
]

export function createRouter(): ReturnType<typeof createHashRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createBrowserRouter(routeWrappers)
  //return createHashRouter(routeWrappers)
}
