

export class ConfigStorage {

    constructor(params = {}){

        const {prefix = 'config-'} = params;

        this.prefix = prefix;
    }

    set(key, value){

        localStorage.setItem(`${this.prefix}${key}`, value);
    }
    get(key){

        return localStorage.getItem(`${this.prefix}${key}`);
    }
}


const CONFIG = new ConfigStorage();

export default CONFIG;