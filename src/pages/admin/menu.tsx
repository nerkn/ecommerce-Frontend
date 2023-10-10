import { Link, useLocation } from "react-router-dom"


export function Menu(){
    const location = useLocation()
    console.log('location', location)
    let links = [
        {name:'Ürünler', link: '/admin/product'},
        {name:'AliExpress Import', link: '/admin/aliExpress'},
        {name:'Kategoriler', link: '/admin/categories'},
    ]


return <nav>
    {links.map(l=><Link to={l.link}>{l.name}</Link>)}
</nav>
}