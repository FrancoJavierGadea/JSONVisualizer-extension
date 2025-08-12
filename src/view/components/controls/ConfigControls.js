import rawCss from './ConfigControls.css?raw';
import CONFIG, { ConfigStorage } from '../../utils/ConfigStorage.js';

const css = new CSSStyleSheet();
css.replaceSync(rawCss);

export class ConfigControls extends HTMLElement {

    constructor(){
        super();

        console.log('heelo')

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <form>
                <div>
                    <label>Render Deep:</label>
                    <input type="number" name="render-deep" value="${CONFIG.get('renderDeep')}" />
                </div>
                <div>
                    <label>Line Numbers:</label>
                    <input type="checkbox" name="line-numbers" ${CONFIG.get('lineNumbers') ? 'checked' : ''} />
                </div>
                <div>
                    <label>Toggle Lines:</label>
                    <input type="checkbox" name="toggle-lines" ${CONFIG.get('toggleLines') ? 'checked' : ''} />
                </div>
                <div>
                    <label>Indentation Guides Lines:</label>
                    <input type="checkbox" name="indentation-guides-lines" ${CONFIG.get('indentationGuidesLines') ? 'checked' : ''} />
                </div>
                <div>
                    <label>Copy Button:</label>
                    <input type="checkbox" name="copy-button" ${CONFIG.get('copyButton') ? 'checked' : ''} />
                </div>
                <div>
                    <label>Colors</label>
                    <div>
                        ${
                            ConfigStorage.DEFAULT_CONFIG.colors.map(color => {
                                return `<label>
                                    <input type="checkbox" name="colors" value="${color}" ${CONFIG.get('colors').includes(color) ? 'checked' : ''} />
                                    <span>${color}</span>
                                </label>`;
                            })
                            .join('')
                        }
                    </div>
                </div>
                <div>
                    <label>Urls</label>
                    <div>
                        ${
                            ConfigStorage.DEFAULT_CONFIG.urls.map(url => {
                                return `<label>
                                    <input type="checkbox" name="urls" value="${url}" ${CONFIG.get('urls').includes(url) ? 'checked' : ''} />
                                    <span>${url}</span>
                                </label>`;
                            })
                            .join('')
                        }
                    </div>
                </div>
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

        const config = {
            renderDeep: Number(formData.get('render-deep')),
            lineNumbers: formData.get('line-numbers') === 'on',
            toggleLines: formData.get('toggle-lines') === 'on',
            indentationGuidesLines: formData.get('indentation-guides-lines') === 'on',
            copyButton: formData.get('copy-button') === 'on',
            colors: formData.getAll('colors'),
            urls: formData.getAll('urls'),
        }

        console.log(e.target.name, e.target.value);

    } 
}


customElements.define('custom-config-controls', ConfigControls);