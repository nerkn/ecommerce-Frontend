import { useEffect, useState } from "react"
import { GenSiteInfo } from "src/hooks/genSiteInfo"


export function Hero(){
    const [randomPhoto, randomPhotoSet] = useState("https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png")
    const {hero} = GenSiteInfo(s=>({hero:s.hero}))
    useEffect(()=>{
        fetch('/api2/unsplash').
            then(r=>r.json()).then(r=>   randomPhotoSet( r ))
    },[])
console.log(randomPhoto)
return <section className="bg-white dark:bg-gray-900">
    <div className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center h-[400px]"
    style={{backgroundImage:`url(${randomPhoto})`, fontSize:'12px'}}
    >
        <div className="mr-auto place-self-center lg:col-span-7" style={{backgroundColor:`rgba(250,250,250,.6)`}} >
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">{hero.title}</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">{hero.desc}</p>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get started
            </a>
            <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Speak to Sales
            </a> 
        </div>                
    </div>
    </section>
}