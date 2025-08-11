

const css = new CSSStyleSheet();
css.replaceSync(`
    :host {
        button {

            min-width: 150px;
            min-height: 70px;
            background-color: var(--toggle-mode-button-bg);
            color: var(--toggle-mode-button-color);

            border: none;
            cursor: pointer;
            font-size: 2.3em;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 5px; 
            transition: background-color 0.2s ease-in-out;

            border-top-left-radius: 10px;
        
            &:hover {
                background-color: var(--toggle-mode-button-hover-bg);
            }
        }
    }
    :host([data-json-mode="raw"]) span[json] {

        display: none;
    }
    :host([data-json-mode="json"]) span[raw] {

        display: none;
    }
`);

export class ToggleModeButton extends HTMLElement {

    static MODES = {
        RAW: 'raw',
        JSON: 'json'
    }

    /**@type {HTMLElement|null} */
    #node = null;

    constructor(){
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <button>
                <span json>
                    <slot name="mode-json">JSON</slot>
                </span>
                <span raw>
                    <slot name="mode-raw">RAW</slot>
                </span>
            </button>
        `;

        this.shadowRoot.adoptedStyleSheets = [css];
    }

    connectedCallback(){

        if(!this.jsonMode){

            this.jsonMode = document.querySelector(this.target)?.getAttribute('data-json-mode') ?? ToggleModeButton.MODES.JSON;
        }

        this.shadowRoot.querySelector('button').addEventListener('click', this.#handleToggle);
    }
    disconnectedCallback(){

        this.shadowRoot.querySelector('button')?.addEventListener('click', this.#handleToggle);
    }

    #handleToggle = (e) => {

        if(this.jsonMode === ToggleModeButton.MODES.RAW){

            this.jsonMode = ToggleModeButton.MODES.JSON;
        }
        else if(this.jsonMode === ToggleModeButton.MODES.JSON){

            this.jsonMode = ToggleModeButton.MODES.RAW;
        }
        else {

            this.jsonMode = ToggleModeButton.MODES.JSON;
        }

        document.querySelector(this.target)?.setAttribute('data-json-mode', this.jsonMode);
    }


    set jsonMode(mode){

        mode ? this.setAttribute('data-json-mode', mode) : this.removeAttribute('data-json-mode');
    }
    get jsonMode(){

        return this.getAttribute('data-json-mode');
    }

    get target(){
        return this.getAttribute('target') ?? 'html';
    }
}