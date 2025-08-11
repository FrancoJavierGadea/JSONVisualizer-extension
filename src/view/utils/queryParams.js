
export function queryParams(name){

    const params = new URLSearchParams(window.location.search);
    
    return params.get(name);
}