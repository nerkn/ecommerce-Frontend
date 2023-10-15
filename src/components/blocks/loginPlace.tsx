import { userStore } from "src/lib/userLogin";
import { FormEventds } from "src/types/site";


export function LoginPlace(){
    const {user, login, logout, error} =  userStore(s=>({
            user:s.user, 
            login:s.login, 
            logout:s.logout, 
            error:s.error}))
    const onSubmit = (e:FormEventds)=>{
        console.log('onsubmit icin', e)
        e.preventDefault()
        login(e.target.elements.email.value, 
             e.target.elements.password.value)
    }
    if(!user?.id)
    return <form className="bg-slate-300 " onSubmit={onSubmit}>
                <input type="email" name="email" />
                <input type="password" name="password" />
                <input type="submit" value="Login" />
                {error.map(e=><div>{e}</div>)}
            </form>

    return <div className="LoginPlace">
        <h2 className="pl-4 ml-4 mt-2 text-center">
           Hoş Geldiniz  {user?.name}
        </h2>

    </div>
}