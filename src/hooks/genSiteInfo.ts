import { create } from "zustand";

type GenSiteInfoType={
    siteInfo:{name:string},
    hero:{title:string, desc:string}
}


export const GenSiteInfo =create<GenSiteInfoType>((set, get)=>({
    siteInfo:{
        name:"Alışveriş merkezi",
    },
    hero:{
        title:"Trendleri Yakalayın",
        desc:"Modanın Zirvesine Uygun Fiyatlarla Ulaşın! En Şık Ürünler İçin Bir Tık Uzağınızdayız, Siparişinizi Verin ve Ertesi Gün Kapınızda Olsun!"
    },
}))