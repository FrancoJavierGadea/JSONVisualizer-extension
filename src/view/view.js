import "./view.css";
import "@components-1812/json-visualizer";

const params = new URLSearchParams(window.location.search);
let jsonUrl = params.get('url') ?? document.referrer;

console.log(jsonUrl, document.referrer);

if(jsonUrl){
    console.log('URL del JSON:', jsonUrl);

    const jsonVisualizer = document.createElement('custom-json-visualizer');

    jsonVisualizer.renderDeep = 4;
    jsonVisualizer.src = jsonUrl;

    document.body.replaceChildren(jsonVisualizer);
}