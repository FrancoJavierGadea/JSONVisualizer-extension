

export const QUERY_PARAMS = {

    set(name, value){
        
        const params = new URLSearchParams(window.location.search);
        params.set(name, value);

        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    },
    get(name){

        const params = new URLSearchParams(window.location.search);
        
        return params.get(name);
    }
}

export default QUERY_PARAMS;
