import { type } from "os"

export type ApiReturn<T> = {
    msg:string,
    error:boolean,
    data:T
}

export type FormEventds=FormEvent<HTMLFormElement> & {
    target:HTMLElement&{
      action:string,
      elements:HTMLInputElement[]
    }
  }

export type Category = {
    name:string,
    slug:string,
    subcategories?:MainCategories[],
    id:number,
    parent:number
}
type ProductId=number
type CategoryId=number
export type ProductCategories = {
    id:number,
    t1:ProductId,
    t2:CategoryId
    extra:string
}
export type Product = {
    id:number,
    name:string,
    description:string,
    price:number
}

export type ProductWithProperties = 
    Product & {
        images:Images[]
    }
export type Images = {
    id:number,
    app?:'product',
    bin?:string,
    item:number,
    url:string,
    orderBy:number
}

export type ProductAli = {
    id	: number,
product_id	:string
product_title	:string
product_description	:string	
product_keywords	:string
product_category	:number	
product_images_image_url	:string	
product_price	:number
alldump	:string
dateModified : Date
}