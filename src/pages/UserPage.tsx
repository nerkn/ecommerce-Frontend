import { userStore } from 'src/libs/userLogin'
import { Orders, UserAddress } from 'src/types/db'
import { Addresses } from './user/Addresses'
import { useEffect, useState } from 'react'
import { noAddress } from 'src/types/resources'
import { fetchX } from 'src/libs/fetchx'
import { formSubmit } from 'src/libs/utils'
import { MyOrders } from './user/MyOrders'

export default function UserPage() {
  const { user, error, LoginFormSubmit } = userStore((s) => ({
    user: s.user,
    LoginFormSubmit: s.LoginFormSubmit,
    error: s.error,
  }))
  const [address, addressesSet] = useState<UserAddress>(noAddress)
  if (!user?.id)
    return (
      <div className="flex">
        <form className="bg-slate-300  " onSubmit={LoginFormSubmit}>
          <h3>Giriş</h3>
          <input type="email" name="email" />
          <input type="password" name="password" />
          <input type="submit" value="Login" />
          {error.map((e) => (
            <div>{e}</div>
          ))}
        </form>

        <form className="bg-slate-300 " onSubmit={LoginFormSubmit}>
          <h3>Kayıt</h3>
          <input type="email" name="email" placeholder="emaıl" />
          <input type="phone" name="phone" placeholder="Telefon" />
          <input type="password" name="password" />
          <input type="submit" value="Kayıt" />
          {error.map((e) => (
            <div>{e}</div>
          ))}
          <p>Eğer kaydınız varsa giriş yaparsınız.</p>
        </form>
      </div>
    )

  return (
    <div className="flex gap-2">
      <div className="flex-grow">
        <form className="form flex flex-col" action="/api2/users" onSubmit={formSubmit()}>
          <input name="id" value={user.id} type="hidden" />
          <input name="phone" value={user.phone} type="tel" placeholder="Telefon" />
          <input type="submit" value="Güncelle" />
        </form>
        <MyOrders user={user} />
      </div>
      <Addresses externalSelectedAddressSet={addressesSet} />
    </div>
  )
}
