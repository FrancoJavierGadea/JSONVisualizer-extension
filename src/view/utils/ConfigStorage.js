
export class ConfigStorage {

    static DEFAULT_CONFIG = {
        'colors': ['hex', 'rgb', 'rgba', 'hsl', 'hsla', 'named'],
        'urls': ['https', 'http', 'ftp', 'mailto', 'tel', 'www', 'domain', 'relative'],
        'theme': 'default',
        'renderDeep': 4,
        'lineNumbers': true,
        'toggleLines': true,
        'indentationGuidesLines': true,
        'copyButton': true
    }

    constructor(params = {}){

        const {prefix = 'config'} = params;

        this.prefix = prefix;
    }

    set(key, value){

        if(!(key in ConfigStorage.DEFAULT_CONFIG)) return;

        const defaultValue = ConfigStorage.DEFAULT_CONFIG[key];

        if(typeof defaultValue === 'string' && typeof value === 'string'){

            localStorage.setItem(`${this.prefix}:${key}`, value);
            return;
        }
        if(typeof defaultValue === 'boolean' && typeof value === 'boolean'){

            localStorage.setItem(`${this.prefix}:${key}`, String(value));
            return;
        }
        if(typeof defaultValue === 'number' && typeof value === 'number'){

            localStorage.setItem(`${this.prefix}:${key}`, String(value));
            return;
        }
        if(Array.isArray(defaultValue) && Array.isArray(value)){

            localStorage.setItem(`${this.prefix}:${key}`, JSON.stringify(value));
            return;  
        }

        throw new Error(`Invalid value type for key "${key}": should be a "${typeof ConfigStorage.DEFAULT_CONFIG[key]}" but got "${typeof value}"`);
    }
    get(key){

        if(!(key in ConfigStorage.DEFAULT_CONFIG)) return;

        const defaultValue = ConfigStorage.DEFAULT_CONFIG[key];

        const storedValue = localStorage.getItem(`${this.prefix}:${key}`);

        if(!storedValue) return defaultValue;

        if(typeof defaultValue === 'string'){

            return storedValue;
        }
        if(typeof defaultValue === 'boolean'){

            return storedValue === 'true';
        }
        if(typeof defaultValue === 'number'){

            const number = Number(storedValue);

            return Number.isNaN(number) ? defaultValue : number;
        }
        if(Array.isArray(defaultValue)){

            return JSON.parse(storedValue);
        }
    }
}


const CONFIG = new ConfigStorage();

export default CONFIG;