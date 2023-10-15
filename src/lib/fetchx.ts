

type Methods = 'get'|'post'|'delete' |'put'

export function fetchX(table:string, { query, data, method='get', returnValueOnly=true}:{    
    data?:any, 
    method?:Methods,
    query?:string,
    returnValueOnly?:true|false
}={}){
    console.log('fetchX', table, query)
    return fetch(`/api/v1/${table}`,{
        method:method,
        body:((method !='get' ) && data)?(
            typeof data =='string'?data:JSON.stringify(data)
        ):null,


    }).then(r=>r.json())
    .then(r=>returnValueOnly?(r.error?[]:r.data):r)
    .catch(r=>returnValueOnly?[]:({msg:r, error:1, data:[]}) )

}
export function dbDelete(table:string, id:number, identifier='id'){
    let data:{[n: string]:string|number }= {}
    data[identifier] = id;
    fetchX(table, {
        method:'delete',
        data
    } )
}