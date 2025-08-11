import './view.css';
import '@components-1812/json-visualizer';
import { ToggleModeButton } from './components/ToggleModeButton.js';
import { ConfigAside } from './components/ConfigAside.js';
import { ThemeControl } from "./components/ThemeControl.js";
import CONFIG from "./utils/ConfigStorage.js";
import { queryParams } from "./utils/queryParams.js";



async function initComponents() {
    
    customElements.define('custom-toggle-mode-button', ToggleModeButton);
    customElements.define('custom-config-aside', ConfigAside);
    customElements.define('custom-theme-control', ThemeControl);
}


async function initJSONVisualizer(){

    const json = queryParams('json');
    const src = queryParams('src');
    
    if(json || src){
        
        const rawContainer = document.createElement('div');
        rawContainer.classList.add('raw-container');
        const iframe = document.createElement('iframe');
        iframe.classList.add('raw-iframe');

        iframe.onload = () => {

            iframe.style.height = `${iframe.contentWindow.document.body.scrollHeight + 100}px`;
        };

        rawContainer.append(iframe);

        const jsonVisualizer = document.createElement('custom-json-visualizer');
        jsonVisualizer.classList.add(CONFIG.get('theme') ?? 'default');
        jsonVisualizer.renderDeep = 4;
    
        if(src){

            const rawJson = await (await fetch(src)).text();

            iframe.src = URL.createObjectURL(new Blob([rawJson], {type: 'application/json'}))

            jsonVisualizer.json = rawJson;
        }
        else if(json){

            iframe.src = URL.createObjectURL(new Blob([json], {type: 'application/json'}));

            jsonVisualizer.json = json;
        }
        
        
        document.querySelector('main').replaceChildren(rawContainer, jsonVisualizer);
    }
}


initJSONVisualizer();
initComponents();