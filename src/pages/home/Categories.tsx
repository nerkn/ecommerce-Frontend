
import { ReactElement } from "react"
import Shoe from "../../assets/icons/shoe.svg" //from "/assets/icons/shoe.svg"
import Dress from "../../assets/icons/dress.svg" 
import Wine from "../../assets/icons/wineglass.svg" 
import Cosmetics from "../../assets/icons/cosmetics.svg" 
import Laptop from "../../assets/icons/laptop.svg" 



export function Categories(){

    function MakeOne({svg, title, desc, href}:{svg:ReactElement, title:string, desc:string, href:string}){
        return <a href={href} className="grid grid-cols-2 border rounded-md  m-2 p-2">
            <div className="w-24 svgPlace " style={{fill:"#666"}}> {svg}</div>
            <div>
                <h4>{title}</h4>
                <div style={{color:"hsl(var(--muted-foreground))"}}>{desc}</div>
            </div>
        </a>
    }

    return <div className="Categories">
        <MakeOne svg={<Shoe />} title="Ayakkabılar" desc=" Moda Ayakkabılar" href="/c/kadin-ayakkabi" />
        <MakeOne svg={<Dress />} title="Elbiseler" desc=" En şık elbiseler" href="/c/elbiseler"/>
        <MakeOne svg={<Wine />} title="Mutfak" desc=" Mutfak yardımcı ürünler" href="/c/mutfak" />
        <MakeOne svg={<Cosmetics />} title="Makyaj" desc=" Doğal Makyaj ürünleri" href="/c/makyaj" />
        <MakeOne svg={<Laptop />} title="Elektronik" desc=" Telefonlar, telefon aksesuarları" href="/c/elektronik" />
    </div>
}