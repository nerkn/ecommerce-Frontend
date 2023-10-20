import { useEffect, useState } from 'react'
import { LoginPlace } from 'src/components/blocks/loginPlace'
import { Images, PaymentType, Product, UserAddress } from 'src/types/db'
import { Addresses } from './Addresses'
import { Payment } from './Payment'
import { noAddress, noOrderProducts, noOrders } from 'src/types/resources'
import { Button } from 'src/components/ui/button'
import { fetchX } from 'src/lib/fetchx'
import { OrderProducts, Orders } from 'src/types/db'
import { address2str } from 'src/lib/convert/address2str'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'src/hooks/useCart'

export default function CartPage({}) {
  const navigate = useNavigate()
  const [products, productsSet] = useState<Product[]>([])
  const [images, imagesSet] = useState<Images[]>([])
  const [payment, paymentSet] = useState<PaymentType>({ paid: false, method: '' })
  const [address, addressSet] = useState<UserAddress>({ ...noAddress })
  //const { cart, cartQuantityChange, cartRemove } = useShoppingCart()
  const { cart, quantityChange, remove } = useCart()
  let lineTotal = 0 // [...document.querySelectorAll('.lineTotal')].reduce((t, l) => t + (parseFloat(l.innerHTML) || 0), 0)
  function SaveOrder() {
    let orderData: Orders = {
      ...noOrders,
      address: address2str(address),
      paymentMethod: payment.method,
      total: lineTotal,
    }
    fetchX('orders', { method: 'post', data: orderData }).then((r) => {
      let orderLines: Array<OrderProducts> = cart
        .filter((c) => c.quantity)
        .map((c) => ({
          ...noOrderProducts,
          order: r.insertId,
          quantity: c.quantity,
          product: c.id,
          price: c.price,
        }))
      fetch('/api/v1/multi/orderProducts', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(orderLines),
      }).then((r) => {
        cart.forEach((c) => {
          if (c.quantity) {
            remove(c.id)
            console.log(c.id)
          }
        })
        console.log(cart)
        navigate('/user')
      })
    })
  }
  useEffect(() => {
    if (!cart.length) return
    let pids = cart.map((p) => p.id)
    fetch('/api/v1/product?where=id,in,' + pids)
      .then((r) => r.json())
      .then((r) => (r.error ? console.log('products yuklenmedi', r.data) : productsSet(r.data)))
    fetch('/api/v1/images?where=app,eq,product|orderby,eq,0|bin,eq,img|item,in,' + pids)
      .then((r) => r.json())
      .then((r) => (r.error ? console.log('images yuklenmedi', r.data) : imagesSet(r.data)))
  }, [cart])
  function CartSubmissionReady() {
    let errors = []
    if (!payment.paid) errors.push('Ödeme yapmalısınız')
    if (!address.id) errors.push('Adres kaydetmelisiniz')
    if (lineTotal == 0) errors.push('Birşey aldınız mı?')
    if (errors.length)
      return (
        <div className="SavePlace">
          {errors.map((e) => (
            <p>{e}</p>
          ))}
        </div>
      )

    return (
      <div className="SavePlace">
        <Button onClick={SaveOrder} className="button" variant="secondary">
          Siparisi ver
        </Button>
      </div>
    )
  }
  return (
    <div className="CartPage grid grid-cols-2">
      <div className="products">
        <h2 className="ml-4 mt-2 pl-4 text-center">Ürünler</h2>
        {cart.map((cartItem, i) =>
          products
            .filter((p) => cartItem.id == p.id)
            .map((p) => (
              <div className="oneCartItem">
                <div className="image">
                  {images
                    .filter((i) => i.item == cartItem.id)
                    .map((i) => (
                      <img src={i.url} />
                    ))}
                </div>
                <div className="name">{p.name}</div>
                <div className="price">
                  {cartItem.price !== p.price ? (
                    <>
                      <b>{p.price}</b>
                      <u>{cartItem.price}</u>
                    </>
                  ) : (
                    <b>{p.price}</b>
                  )}
                </div>
                <div className="quantity">
                  <input
                    type="number"
                    value={cartItem.quantity}
                    onChange={(e) => quantityChange(p, parseInt(e.target.value))}
                  />
                  <div className="lineTotal">
                    {(lineTotal += cartItem.quantity * p.price)
                      ? cartItem.quantity * p.price
                      : cartItem.quantity * p.price}
                  </div>
                </div>
              </div>
            )),
        )}
        <div className="grandTotal">
          <div>Toplam ödenecek</div>
          <div>{lineTotal}</div>
        </div>
      </div>
      <div>
        <LoginPlace />
        <Addresses externalSelectedAddressSet={addressSet} />
        <Payment paymentSet={paymentSet} />
        <CartSubmissionReady />
      </div>
    </div>
  )
}
