import { LucideShoppingCart } from 'lucide-react'
import { Link } from 'wouter'
import { useCart } from 'src/hooks/useCart'

export function CartMenu() {
  const cart = useCart()
  return (
    <li key={cart.cart.length}>
      <a>
        <LucideShoppingCart />{' '}
      </a>
      <div className="subMenu -ml-64 w-96 flex-col text-sm font-light">
        <h3>Sepetim</h3>
        {cart.cart.map((cartItem) => (
          <div className="round my-1 border p-2">
            <Link key={cartItem.id} to={'/p/' + cartItem.id} className="grid grid-cols-[100px_1fr]">
              <img src={cartItem.image} className="p-2" />
              {cartItem.name}
            </Link>
          </div>
        ))}
        <Link to="/user/Cart" className="w-full border p-2 text-center font-normal ">
          Satın Al
        </Link>
      </div>
    </li>
  )
}
