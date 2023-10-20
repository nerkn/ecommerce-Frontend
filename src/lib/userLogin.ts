import { FormEventds, User, UserAddress } from "src/types/db";
import { create } from "zustand";
import { persist } from 'zustand/middleware'

type userStoreType = {
    user : User|null,
    addresses: UserAddress[],
    login:(email:string, password:string)=>void,
    LoginFormSubmit:(e:FormEventds)=>void,
    logout:()=>void,
    error: string[]
}

const NoUser:User = {
    id:0,
    email:"-",
    name: "-",
    phone: ""
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
        LoginFormSubmit:(e)=>{
            e.preventDefault();
            get().login(
                e.target.elements.email.value, 
                e.target.elements.password.value)
        },
        logout:()=>{
            set({user:{...NoUser}})
        },
        error:[]
    }),{
        name:'user', 
        
    }
    )
)