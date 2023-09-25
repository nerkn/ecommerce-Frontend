export type MainCategories = {
    name:string,
    slug:string,
    subcategories?:MainCategories[]
}