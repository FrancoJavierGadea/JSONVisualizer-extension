
// Escucha las respuestas de la red
chrome.webRequest.onHeadersReceived.addListener((details) => {

	// Busca el encabezado Content-Type
	const contentType = details.responseHeaders.find(
		(header) => header.name.toLowerCase() === "content-type"
	);

	// Si es JSON, inyecta el script
	if(["application/json", "text/json", "text/plain"].some((type) => contentType?.value.toLowerCase().includes(type))) {


		//MARK: content.css
		chrome.scripting.insertCSS({
			target: { tabId: details.tabId },
			files: ['content.css'],
		})
		.then(() => {

			console.log(`CSS injected [${details.tabId}]`);

			chrome.scripting.executeScript({
				target: { tabId: details.tabId },
				func: function(){
					console.log('[JSONVisualizer]: CSS injected');
				}
			});
		})
		.catch((error) => {

			console.error(`Error injecting CSS [${details.tabId}]`);

			chrome.scripting.executeScript({
				target: { tabId: details.tabId },
				func: function(){
					console.log('[JSONVisualizer]: Error injected CSS');
				}
			});
		});

		//MARK: content.js
		chrome.scripting.executeScript({
			target: { tabId: details.tabId },
			files: ["content.js"],
			world: "MAIN",
		})
		.then(() => {

			console.log(`JS injected [${details.tabId}]`);

			chrome.scripting.executeScript({
				target: { tabId: details.tabId },
				func: function(){
					console.log('[JSONVisualizer]: JS injected');
				}
			});
		})
		.catch((error) => {

			console.error(`Error injecting JS [${details.tabId}]`);

			chrome.scripting.executeScript({
				target: { tabId: details.tabId },
				func: function(){
					console.log('[JSONVisualizer]: Error injected JS');
				}
			});
		});
	} 
	else {
		console.log("no es json");
	}
},
{
	urls: ["<all_urls>"],
	types: ["main_frame"],
},
["responseHeaders"]);
