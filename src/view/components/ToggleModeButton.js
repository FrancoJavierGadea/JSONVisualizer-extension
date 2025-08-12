import rawCss from "./ToggleModeButton.css?raw";

const css = new CSSStyleSheet();
css.replaceSync(rawCss);

export class ToggleModeButton extends HTMLElement {

    static MODES = {
        RAW: 'raw',
        JSON: 'json'
    }

    constructor(){
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <button>
                <span class="mode mode-json">
                    <slot name="mode-json">JSON</slot>
                </span>
                <span class="mode mode-raw">
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

    set disabled(value){
        value ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
    }
    get disabled(){
        return this.hasAttribute('disabled');
    }

    get target(){
        return this.getAttribute('target') ?? 'html';
    }
}

customElements.define('custom-toggle-mode-button', ToggleModeButton);