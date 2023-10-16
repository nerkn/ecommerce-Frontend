import { userStore } from "src/lib/userLogin"
import { FormEventds, Orders, UserAddress } from "src/types/site"
import { Addresses } from "./user/Addresses"
import { useEffect, useState } from "react"
import { noAddress } from "src/types/resources";
import { fetchX } from "src/lib/fetchx";
import { formSubmit } from "src/lib/utils";


export default function UserPage(){

    const {user,  login, error} =  userStore(s=>({
        user: s.user, 
        login:s.login,
        error: s.error
    }))
    const [address, addressesSet] = useState<UserAddress>(noAddress)
    const [orders, ordersSet] = useState<Orders[]>([])
    useEffect(() => {
        if (!user?.id)
            return;
        fetchX('orders?where=user,eq,' + user?.id + '&orderby=id desc').
            then(r=>ordersSet(r))
    },[])
    const onSubmit = (e:FormEventds)=>{ 
        e.preventDefault()
        login(e.target.elements.email.value, 
             e.target.elements.password.value)
    }
    console.log('orders', orders)
    if(!user?.id)
        return <div className="flex">
            <form className="bg-slate-300  " onSubmit={onSubmit}>
                <h3>Giriş</h3>
                <input type="email" name="email" />
                <input type="password" name="password" />
                <input type="submit" value="Login" />
                {error.map(e=><div>{e}</div>)}
            </form>

            <form className="bg-slate-300 " onSubmit={onSubmit}>
                <h3>Kayıt</h3>
                <input type="email" name="email" placeholder="emaıl" />
                <input type="phone" name="phone" placeholder="Telefon" />
                <input type="password" name="password" />
                <input type="submit" value="Kayıt" />
                {error.map(e => <div>{e}</div>)}
                <p>Eğer kaydınız varsa giriş yaparsınız.</p>
            </form>
            </div>

    return <div className="flex gap-2">
        <div className="flex-grow">
        <form  className="form flex flex-col" action="/api2/users" onSubmit={formSubmit()} >
            <input name="id" value={user.id} type="hidden" />
            <input name="phone" value={user.phone} type="tel" placeholder="Telefon" />
            <input type="submit" value="Güncelle" />
        </form>
            <div className="flex flex-col">
                <h3>Siparislerim</h3>
                {orders.map(order => <div className="border rounded  w-full p-4" key={order.id}>
                    <div><b>Girdiginiz Adres</b><div>{order.address}</div></div>
                    <div><b>Kargo Bilgisi</b><div>{order.cargo}</div></div>
                    <div className="flex justify-between">
                        <div><b>Siparis Durumu</b>{order.status}</div>
                        <div><b>Toplam</b> {order.total}</div>
                    </div>
                </div>)}
        </div>
        </div>
        <Addresses externalSelectedAddressSet={addressesSet} />
        
    </div>
}