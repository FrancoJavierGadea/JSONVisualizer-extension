import "./view.css";
import "@components-1812/json-visualizer";

const params = new URLSearchParams(window.location.search);
const json = params.get('json');
const src = params.get('src');

if(json || src){
    
    const jsonVisualizer = document.createElement('custom-json-visualizer');

    jsonVisualizer.renderDeep = 4;

    if(src){
        jsonVisualizer.src = src;
    }
    else if(json){
        jsonVisualizer.json = json;
    }
    
    document.body.replaceChildren(jsonVisualizer);
}