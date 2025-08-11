
async function init(){

	let isJSON = 
		document.querySelector('pre')?.textContent.startsWith('{') || 
		document.querySelector('pre')?.textContent.startsWith('[');

	if(!isJSON) return;

    const jsonSource = window.location.href;
	
	const viewURL = new URL(chrome.runtime.getURL('src/view/index.html'));
	viewURL.searchParams.set('src', jsonSource);

    console.log('[JSONVisualizer]: Esta pagina es un JSON');
	console.log('[JSONVisualizer]: JSON Source:', jsonSource);
	console.log('[JSONVisualizer]: View URL:', viewURL.href);

	//Redirect
	window.location.href = viewURL.href;
}


if(document.readyState === 'loading'){

	window.addEventListener('DOMContentLoaded', () => {
	
		init();
		
	}, {once: true});
}
else if(document.readyState === 'complete' || document.readyState === 'interactive'){

	init();
}




