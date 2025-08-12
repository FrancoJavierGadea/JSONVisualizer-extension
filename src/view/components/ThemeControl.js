import "@components-1812/json-visualizer/assets/themes/monokai.css";
import "@components-1812/json-visualizer/assets/themes/nord.css";
import "@components-1812/json-visualizer/assets/themes/dracula.css";
import "@components-1812/json-visualizer/assets/themes/solarized-dark.css";
import "@components-1812/json-visualizer/assets/themes/solarized-light.css";
import "@components-1812/json-visualizer/assets/themes/wizard.css";
import "@components-1812/json-visualizer/assets/themes/tokio-night.css";
import "@components-1812/json-visualizer/assets/themes/iceberg.css";
import "@components-1812/json-visualizer/assets/themes/dark-default.css";
import "@components-1812/json-visualizer/assets/themes/light-default.css";
import rawCss from "./ThemeControl.css?raw";

import CONFIG from "../utils/ConfigStorage.js";

const THEMES = [
    'default', 
    'monokai', 
    'nord', 
    'dracula', 
    'solarized-dark', 
    'solarized-light', 
    'wizard', 'tokio-night', 
    'iceberg', 
    'dark-default', 
    'light-default'
];

const css = new CSSStyleSheet();
css.replaceSync(rawCss);


export class ThemeControl extends HTMLElement {

    constructor(){
        super();

        const currentTheme = CONFIG.get('theme') ?? 'default';
        document.querySelector(this.target)?.setAttribute('theme', currentTheme);

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <label>Theme:</label>
            <select>
                ${THEMES.map(theme => {

                    return `<option ${currentTheme === theme ? 'selected' : ''} value="${theme}">${theme}</option>`
                })
                .join('')}
            </select>
        `;

        this.shadowRoot.adoptedStyleSheets = [css];
    }

    connectedCallback(){

        this.shadowRoot.querySelector('select').addEventListener('change', this.#handleChange);
    }
    disconnectedCallback(){

        this.shadowRoot.querySelector('select')?.removeEventListener('change', this.#handleChange);
    }
    

    #handleChange = (e) => {

        const theme = e.target.value;

        if(document.startViewTransition){

            document.querySelector(this.target).style.viewTransitionName = this.viewTransitionName;

            const transition = document.startViewTransition(() => {

                this.changeTheme(theme);
            });

            transition.finished.then(() => {
                console.log('Transition finished');

                document.querySelector(this.target).style.viewTransitionName = '';
            });
        }
        else {

            this.changeTheme(theme);
        }
        
    }
    changeTheme(theme){

        //Change Theme
        console.log(theme);

        const currentTheme = CONFIG.get('theme') ?? 'default';

        document.querySelector(this.target)?.setAttribute('theme', theme);
        document.querySelector('main custom-json-visualizer')?.classList.remove(currentTheme);
        document.querySelector('main custom-json-visualizer')?.classList.add(theme);

        CONFIG.set('theme', theme);
    }

    get target(){
        return this.getAttribute('target') ?? 'html';
    }

    get viewTransitionName(){
        return this.getAttribute('view-transition-name') ?? 'root';
    }

}

customElements.define('custom-theme-control', ThemeControl);