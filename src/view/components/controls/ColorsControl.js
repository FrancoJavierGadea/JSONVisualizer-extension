import CONFIG from "../../utils/ConfigStorage.js";
import rawCss from "./ColorsControl.css?raw";

const css = new CSSStyleSheet();
css.replaceSync(rawCss);

const saveConfig = CONFIG.get('colors');

const VALUES = [
    {
        value: 'hex',
        label: 'Hexadecimal',
        active: saveConfig?.includes('hex') ?? true
    },
    {
        value: 'rgb',
        label: 'RGB',
        active: saveConfig?.includes('rgb') ?? true
    },
    {
        value: 'rgba',
        label: 'RGBA',
        active: saveConfig?.includes('rgba') ?? true
    },
    {
        value: 'hsl',
        label: 'HSL',
        active: saveConfig?.includes('hsl') ?? true
    },
    {
        value: 'hsla',
        label: 'HSLA',
        active: saveConfig?.includes('hsla') ?? true
    },
    {
        value: 'named',
        label: 'CSS Named',
        active: saveConfig?.includes('named') ?? true
    }
]

export class ColorsControl extends HTMLElement {

    constructor(){
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <label>Color Preview</label>
            <form>
                ${VALUES.map(value => {

                    return `<label>
                        <input type="checkbox" name="checkbox" value="${value.value}" ${value.active ? 'checked' : ''} />
                        <span>${value.label}</span>
                    </label>`;
                })
                .join('')}
            </form>
        `;

        this.shadowRoot.adoptedStyleSheets = [css];
    }

    connectedCallback(){

        this.shadowRoot.querySelector('form').addEventListener('change', this.#handleChange);
    }
    disconnectedCallback(){

        this.shadowRoot.querySelector('form')?.removeEventListener('change', this.#handleChange);
    }


    #handleChange = (e) => {

        const formData = new FormData(e.currentTarget);

        const colors = formData.getAll('checkbox');

       console.log(colors);

        //CONFIG.set('colors', colors);
        
    }

    
}

customElements.define('custom-colors-control', ColorsControl);