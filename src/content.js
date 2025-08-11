


async function initJSONVisualizer(){

	const {JSONVisualizer} = await import('@components-1812/json-visualizer/JSONVisualizer.js');
	const JSONVisualizerCSS = await import('@components-1812/json-visualizer/JSONVisualizer.css?raw');

	JSONVisualizer.stylesSheets.raw.push(JSONVisualizerCSS.default);

	console.log(JSONVisualizer, JSONVisualizerCSS);

	console.log(window.customElements);
	window.customElements.define('custom-json-visualizer', JSONVisualizer);

}


function toggleJsonModeButtons(){

	const div = document.createElement('div');
	div.classList.add('JSONVisualizer-toggle-buttons');

	const rawButton = document.createElement('button');
	rawButton.classList.add('JSONVisualizer-raw-button');
	rawButton.textContent = 'raw';

	rawButton.addEventListener('click', () => {
		
		console.log(window.customElements);

		document.documentElement.setAttribute('data-json', 'raw');
	});

	const jsonButton = document.createElement('button');
	jsonButton.classList.add('JSONVisualizer-json-button');
	jsonButton.textContent = 'json';

	jsonButton.addEventListener('click', () => {

		document.documentElement.setAttribute('data-json', 'json');
	});
	
	div.append(rawButton, jsonButton);

	return div;
}



async function init(){

	let isJSON = 
		document.querySelector('pre')?.textContent.startsWith('{') || 
		document.querySelector('pre')?.textContent.startsWith('[');

	if(!isJSON) return;

	document.documentElement.setAttribute('data-json', 'json');

    const jsonSource = window.location.href;
	
	const viewURL = new URL(chrome.runtime.getURL("src/view/index.html"));
	viewURL.searchParams.set('src', jsonSource);

    console.log('[JSONVisualizer]: Esta pagina es un JSON');
	console.log('[JSONVisualizer]: JSON Source:', jsonSource);
	console.log('[JSONVisualizer]: View URL:', viewURL.href);

	window.location.href = viewURL.href;

	// document.body.append( toggleJsonModeButtons() );

	// await initJSONVisualizer();

	// const jsonVisualizer = document.createElement("custom-json-visualizer");

	// jsonVisualizer.renderDeep = 4;
	// jsonVisualizer.src = jsonSource;

	// document.body.append(jsonVisualizer);
}


if(document.readyState === 'loading'){

	window.addEventListener('DOMContentLoaded', () => {
	
		init();
		
	}, {once: true});
}
else if(document.readyState === 'complete' || document.readyState === 'interactive'){

	init();
}




