import './view.css';
import './css/view-transitions.css';

//Components
import '@components-1812/json-visualizer';
import './components/JsonLoader.js';
import './components/ToggleModeButton.js';
import './components/ConfigAside.js';
import './components/ThemeControl.js';

import CONFIG from './utils/ConfigStorage.js';
import QUERY_PARAMS from './utils/queryParams.js';

//MARK: initJSONVisualizer
async function initJSONVisualizer({json, src} = {}){

    json ??= QUERY_PARAMS.get('json');
    src ??= QUERY_PARAMS.get('src');
    
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

        if(document.querySelector('custom-toggle-mode-button')){

            document.querySelector('custom-toggle-mode-button').disabled = false
        }

        document.documentElement.setAttribute('data-json-loaded', '');
    }
}

window.initJSONVisualizer = initJSONVisualizer;

initJSONVisualizer();