import { useEffect, useState } from 'react'
import { fetchX } from 'src/lib/fetchx'
import { OrderProducts, Orders, Product, User } from 'src/types/db'

type selectedOrderAndLines = {
  id: number
  lines: OrderProducts[]
}

export function MyOrders({ user }: { user: User }) {
  const [orders, ordersSet] = useState<Orders[]>([])
  const [selected, selectedSet] = useState<selectedOrderAndLines>({ id: 0, lines: [] })
  const [products, productsSet] = useState<Product[]>([])
  function OrderDetailsLoad(id: number) {
    return () => {
      selectedSet({ id, lines: [] })
      fetchX('orderProducts?where=order,eq,' + id).then((r) => {
        selectedSet({ id, lines: r })
        let productIds = r.map((r) => r.product).join(',')
        if (productIds) fetchX('product?where=id,in,' + productIds).then((r) => productsSet(r))
      })
    }
  }
  useEffect(() => {
    if (!user?.id) return
    fetchX('orders?where=user,eq,' + user?.id + '&orderby=id desc').then((r) => ordersSet(r))
  }, [])
  console.log('selected', selected, products)
  return (
    <div className="flex flex-col ">
      <h3>Siparislerim</h3>
      {orders.map((order) => (
        <div className="mb-4 w-full  rounded border p-4" key={order.id}>
          <div>
            <b>Girdiginiz Adres </b>
            <div>{order.address}</div>
          </div>
          <div>
            <b>Kargo Bilgisi </b>
            <div>{order.cargo}</div>
          </div>
          <div className="flex justify-between">
            <div>
              <b>Siparis Durumu </b>
              {order.status}
            </div>
            <div>
              <a onClick={OrderDetailsLoad(order.id)} className="button">
                {' '}
                Detaylar{' '}
              </a>
            </div>
            <div>
              <b>Toplam </b> {order.total}
            </div>
          </div>
          {order.id != selected.id ? (
            <></>
          ) : (
            <div>
              {selected.lines.map((line) => (
                <div className="flex justify-between">
                  <div className="w-32 overflow-ellipsis">
                    {products.find((product) => line.product == product.id)?.name}
                  </div>
                  <div>{line.quantity}</div>
                  <div>{line.price}</div>
                  <div>{line.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
