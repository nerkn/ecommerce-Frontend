import { Dispatch, useEffect, useState } from "react";
import { fetchX } from "src/lib/fetchx";
import { userStore } from "src/lib/userLogin";
import { formSubmit } from "src/lib/utils";
import { noAddress } from "src/types/resources";
import { UserAddress } from "src/types/site";


export function Addresses(
    {externalSelectedAddressSet}:
    {externalSelectedAddressSet: Dispatch<React.SetStateAction<UserAddress>>}){
    const {user} = userStore(s=>({user:s.user}))
    const [addresses, addressesSet] = useState<UserAddress[]>([])
    const [selected, selectedSet]   = useState<UserAddress>({...noAddress})
    function getAddresses(userid:number){
        fetchX('useraddress?where=user,eq,'+userid).then(r=>addressesSet(r))
    }
    function onChange4Selected(item:keyof UserAddress, value:string){
        /*@ts-ignore  */
        console.log(item, value, selected, noAddress)
        selected[item] = value
        selectedSet({...selected})
    }
    useEffect(()=>{
        if(user?.id)
            getAddresses(user.id)
    },[user])
    useEffect(()=>{
        externalSelectedAddressSet(selected)
    },[selected])
    if(!user?.id)
        return <div>
            <h2>Adres</h2>
            <p>Giriş yaptığınızda, teslimat adresi seçebileceksiniz.</p>
        </div> 
    console.log(selected)
    return <div className="Addresses">
        <div className="formPlace">
        <h3 className=" text-center mb-4">{selected.id?'Düzenle':'Yeni Adres'}</h3>
        <form action="/api/v1/useraddress" className="form " key={selected.id}
            onSubmit={formSubmit( ()=>getAddresses(user?.id||0) )}>
                <input type="hidden" name="id" value={selected.id} />
            <b>Başlık</b><input name="title" value={selected.title} 
                            onChange={e=>onChange4Selected('title',e.target.value)} />
            <b>Şehir</b><input name="city" value={selected.city} 
                            onChange={e=>onChange4Selected('city',e.target.value)} />
            <b>Adres</b><input name="address" value={selected.address} 
                            onChange={e=>onChange4Selected('address',e.target.value)} />
            <b>Detay</b><input name="detail" value={selected.detail} 
                            onChange={e=>onChange4Selected('detail',e.target.value)} />
            <b></b><input type="submit" value="Kaydet" />
        </form>
        </div>
        {addresses.map(a=><div className={"oneAddress "+(selected.id==a.id?'selected':'')}  key={a.id} >
            <div className="title">{a.title}</div>
            <div className="flex "> 
                <div className="city pr-4">{a.city}
                <div>
                    {(selected.id!=a.id)?<a className="button" onClick={()=>selectedSet(a)} >Seç</a>:''}
                </div></div>
                <div>
                    <div className="address">{a.address}</div>
                    <div className="detail">{a.detail}</div>
                </div>
            </div>
        </div>)}
        <div className={selected.id?"oneAddress ":'hidden'}   >
            <div className="title"></div>
            <div className="flex ">  
                 <a className="button" onClick={()=>selectedSet({...noAddress})} >Yeni</a>  
            </div>
        </div>
    </div>


}