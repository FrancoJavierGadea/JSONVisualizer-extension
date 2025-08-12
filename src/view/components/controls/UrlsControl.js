import CONFIG from "../../utils/ConfigStorage.js";
import rawCss from "./UrlsControl.css?raw";

const css = new CSSStyleSheet();
css.replaceSync(rawCss);

const saveConfig = CONFIG.get('urls');

const VALUES = [
    {
        value: 'https',
        label: 'HTTPS',
        active: saveConfig?.includes('https') ?? true
    },
    {
        value: 'http',
        label: 'HTTP',
        active: saveConfig?.includes('http') ?? true
    },
    {
        value: 'ftp',
        label: 'FTP',
        active: saveConfig?.includes('ftp') ?? true
    },
    {
        value: 'mail',
        label: 'Mail',
        active: saveConfig?.includes('mailto') ?? true
    },
    {
        value: 'phone',
        label: 'Phone',
        active: saveConfig?.includes('tel') ?? true
    },
    {
        value: 'www',
        label: 'www',
        active: saveConfig?.includes('www') ?? true
    },
    {
        value: 'domain',
        label: 'Domain',
        active: saveConfig?.includes('domain') ?? true
    },
    {
        value: 'relative',
        label: 'Relative',
        active: saveConfig?.includes('relative') ?? true
    },
];

export class UrlsControl extends HTMLElement {

    constructor(){
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <label>Clickable URLs:</label>
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

        const urls = formData.getAll('checkbox');

       console.log(urls);

        //CONFIG.set('colors', colors);
        
    }

    
}

customElements.define('custom-urls-control', UrlsControl);