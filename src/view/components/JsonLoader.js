import QUERY_PARAMS from "../utils/queryParams.js";
import rawCss from "./JsonLoader.css?raw";

const css = new CSSStyleSheet();
css.replaceSync(rawCss);


export class JsonLoader extends HTMLElement {

    constructor(){
        super();

        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
            <div class="drop-zone">
                <form>
                    <!-- Load from URL -->
                    <label for="url">Load from URL:</label>
                    <input type="text" id="url" name="url" placeholder="https://example.com/data.json">

                    <!-- Or upload a file -->
                    <label for="file">Or upload a JSON file:</label>
                    <input type="file" id="file" name="file" accept=".json,.txt">

                    <!-- Or paste JSON content -->
                    <label for="raw">Or paste JSON content:</label>
                    <textarea id="raw" name="raw" placeholder='Paste your JSON here...'></textarea>

                    <!-- Button -->
                    <button type="submit">Load JSON</button>
                </form>   
            </div>
        `;

        this.shadowRoot.adoptedStyleSheets = [css];
    }

    connectedCallback(){


        this.shadowRoot.querySelector('form').addEventListener('submit', this.#handleFormSubmit);
        this.shadowRoot.querySelector('textarea').addEventListener('keydown', this.#handleKeydown);
        this.addEventListener('dragover', this.#handleDragOver);
        this.addEventListener('dragenter', this.#handleDragEnter);
        this.addEventListener('dragleave', this.#handleDragLeave);
        this.addEventListener('drop', this.#handleDrop);
    }

    disconnectedCallback(){

        this.shadowRoot.querySelector('form')?.removeEventListener('submit', this.#handleFormSubmit);
        this.shadowRoot.querySelector('textarea')?.removeEventListener('keydown', this.#handleKeydown);
        this.removeEventListener('dragover', this.#handleDragOver);
        this.removeEventListener('dragenter', this.#handleDragEnter);
        this.removeEventListener('dragleave', this.#handleDragLeave);
        this.removeEventListener('drop', this.#handleDrop);
    }


    #handleFormSubmit = (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const url = formData.get('url');
        const file = formData.get('file');
        const raw = formData.get('raw');

        if(url){
            QUERY_PARAMS.set('src', url);
            window.initJSONVisualizer({src: url});
            return;
        }
        if(file.name && file.size > 0){

            const fileReader = new FileReader();

            fileReader.onload = (e) => {

                const raw = e.target.result;

                QUERY_PARAMS.set('json', raw);

                window.initJSONVisualizer({json: raw});
            };
            fileReader.readAsText(file);

            return;
        }
        if(raw && ['{', '['].some(char => raw.startsWith(char)) ){

            QUERY_PARAMS.set('json', raw);
            window.initJSONVisualizer({json: raw});
            return;
        }
    }

    #handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.shadowRoot.querySelector('.drop-zone').classList.add('drag-over');
    }
    #handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    #handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.shadowRoot.querySelector('.drop-zone').classList.remove('drag-over');
    }
    #handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.shadowRoot.querySelector('.drop-zone').classList.remove('drag-over');

        const file = e.dataTransfer.files[0];

        if(file && ['application/json', 'text/plain'].includes(file.type)){

            const dt = new DataTransfer();
            dt.items.add(file);

            this.shadowRoot.querySelector('input[type="file"]').files = dt.files;
        }
    }

    tabsize = 4;

    #handleKeydown = (e) => {

        if(e.key === 'Tab'){
            e.preventDefault();

            const textarea = e.currentTarget;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            textarea.value = textarea.value.substring(0, start) + ' '.repeat(this.tabsize) + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + this.tabsize;
        }
    }
}

customElements.define('custom-json-loader', JsonLoader);