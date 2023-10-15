import { error } from "console";
import { User, UserAddress } from "src/types/site";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

type userStoreType = {
    user : User|null,
    addresses: UserAddress[],
    login:(email:string, password:string)=>void,
    logout:()=>void,
    error: string[]
}

const NoUser:User = {
    id:0,
    email:"-",
    name:"-"
}


export const  userStore= create<userStoreType>()(
  persist(
    (set, get)=>({
        user:NoUser,
        addresses:[],
        login:(email, password)=>{
            fetch('/api/signin', {method:"Post",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email, password})} ).
                then(r=>r.json()).then(r=>{
                    if(r.error){
                        let error = get().error;
                        error.push(r.msg)
                        set({error:[...error]})
                        setInterval( ()=>{
                                let error = get().error;
                                error.shift(); 
                                set({error:{...error}})
                        }, 2000)
                    }else{
                        set({user:r.data})
                    }
                })
        },
        logout:()=>{
            set({user:NoUser})
        },
        error:[]
    }),{
        name:'user', 
        
    }
    )
)