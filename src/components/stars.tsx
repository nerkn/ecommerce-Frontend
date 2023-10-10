import { Star } from "lucide-react"

export function Stars({rating, howMany=5}:{howMany?:number, rating:number}){
    let stars = [] 
    for(let i=1; i<=rating; i++)
        stars.push( <Star fill='yellow' color='#aa6' />)
    for(let i=1; i<=howMany-rating; i++)
        stars.push( <Star />)
    return <div className="flex space-x-1">{stars}</div>
}