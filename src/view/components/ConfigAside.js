import rawCss from "./ConfigAside.css?raw";

const css = new CSSStyleSheet();
css.replaceSync(rawCss);

export class ConfigAside extends HTMLElement {

    constructor(){
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <button class="open-aside-button">
                <div class="icon open-icon">
                    <slot name="open-icon">config</slot>
                </div>
            </button>
            <aside class="config-aside">
                <div class="config-aside-header">
                    <slot name="config-title">
                        <h2>Configuration</h2>
                    </slot>
                    <button class="close-aside-button">
                        <div class="icon close-icon">
                            <slot name="close-icon">close</slot>
                        </div>
                    </button>
                </div>
                <div class="config-aside-body">
                    <slot>Config body</slot>
                </div>
            </aside>
        `;
        this.shadowRoot.adoptedStyleSheets = [css];
    }

    connectedCallback(){

        this.shadowRoot.querySelector('.open-aside-button').addEventListener('click', this.#handleToggle);
        this.shadowRoot.querySelector('.close-aside-button').addEventListener('click', this.#handleToggle);
    }
    disconnectedCallback(){

        this.shadowRoot.querySelector('.open-aside-button')?.addEventListener('click', this.#handleToggle);
        this.shadowRoot.querySelector('.close-aside-button')?.addEventListener('click', this.#handleToggle);
    }

    #handleToggle = (e) => {

        this.open = !this.open;
    }

    set open(value){
        value ? this.setAttribute('open', '') : this.removeAttribute('open');
    }
    get open(){
        return this.hasAttribute('open');
    }
}

customElements.define('custom-config-aside', ConfigAside);