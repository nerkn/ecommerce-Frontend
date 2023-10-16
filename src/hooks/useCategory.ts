import { fetchX } from "src/lib/fetchx" 
import { Category } from "src/types/site"
import { create } from "zustand"
import { persist } from "zustand/middleware"



type useCategoryType = {
    categories: Category[],
    loadCategories:     ()                =>void,
    getCategories:      (cIds:number[])   =>Category[],
    getSubCategories:   (cId:number)      =>Category[],
    getParents:         (cId:number)      =>Category[],
    getSiblings:        (cId:number)      =>Category[]
}

function getParents( cats:Category[], id:number):Category[]{
    console.log('getParents', id, cats.filter(c=>c.id==id))
    if(id==0)
        return []
    let parents = cats.filter(c=>c.id==id).map(c=>[c, ...getParents(cats, c.parent)]).flat()

    console.log('getParents parents', id,  parents)
    return parents;
}

export const  useCategory= create<useCategoryType>()(
    persist(
      (set, get)=>({
        categories:[],
        loadCategories:()=>{
            if(!get().categories?.length)
                fetchX('category').then(r=>set({categories:r}))
        },
        getCategories:      (cIds)   =>get().
            categories.filter( c=>cIds.includes(c.id)),
        getSubCategories:   (cId) =>get().categories.filter(c=>c.parent==cId),
        getParents:         (cId)=>getParents(get().categories, cId),
        getSiblings:        (cId)=>{
            let parents = get().getCategories([cId]).map(c=>c.parent)
            let subCats = parents.map(p=>get().getSubCategories(p))
            return subCats.flat()
        }
      }),{
        name:'categories', 
        
    }
    )
)