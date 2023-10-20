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
export type User ={
    id:number,
    name:string,
    email:string,
    password?: string,
    phone?:string
}
export type UserAddress = {
    id:number,
    user?:number,
    title:string,
    city:string,
    address:string,
    detail:string,
    orderby:number
}

export type ProductCategories = {
    id:number,
    t1:ProductId,
    t2:CategoryId
    extra:string
}
export type N2n = ProductCategories | { app: 'product', bin: 'category' }

export type Orders = {
    id	:number
    user	:number
    paymentMethod	:string
    total	:number
    discount	:number
    paymentStatus	:string
    address	:string
    commentUser	:string
    comment: string
    cargo : string
    status	:"provided"| "process" | "cargo" | "cancelled"	
    createdAt	: Date
    modifiedAt	: Date
}

export type OrderProducts = {
    id	:number
    order	:number
    user	:number
    title	:string
    quantity	:number
    options	:string
    status	:"provided"| "cargo" | "delayed"| "sent" | "cancelled"

}

export type BlogType = {
    id:number,
    title	:string
    slug	:string	
    short	:string	
    long	:string	
    createdAt	:string
    updatedAd	:string
    status :'active'| 'draft'| 'passive'
}

type BlogTypeId = number
export type BlogCategoryType = {
    id:number,
    t1:BlogTypeId,
    t2:CategoryId
    extra: string,
    app: 'blog',
    bin: string
}
export type PaymentType = {
    paid: boolean
    method: string
  }
