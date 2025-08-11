

const css = new CSSStyleSheet();
css.replaceSync(`
    :host .config-aside {
        padding: 5px;
        height: 100%;
        width: 300px;
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 2000;
        background-color: var(--config-aside-bg, #333);
        color: var(--config-aside-color, #fff);

        translate: 100% 0;
        transition: translate 0.2s ease-in-out;

        .config-aside-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 1em;
        }
    }
    :host([open]) .config-aside {
        translate: 0 0;
    }
    :host button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 10px;
        color: var(--config-aside-icons-color, #fff);
        transition: color 0.2s ease-in-out;

        width: var(--config-aside-icons-size, 40px);
        height: var(--config-aside-icons-size, 40px);

        &:hover {
            color: var(--config-aside-icons-hover-color, #999);
        }
        .icon {
            width: 100%;
            height: 100%;
        }
        .icon ::slotted(svg) {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    :host .close-aside-button {
        
    }
    :host .open-aside-button {
        --config-aside-icons-size: 50px;
        
        & .icon {
            transition: rotate 0.2s ease-in-out;
        }
        &:hover .icon {
            rotate: 45deg;
        }
    }
           
`);

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