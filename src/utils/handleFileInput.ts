import { handleWorkerMessage } from "./handleWorkerMessage";

const invalidMessage = 
    '<p class="invalid">Invalid file. Please load a valid JSON file.</p>';

export function handleFileInput(event: Event, outputElement: HTMLElement){
    const input  = event.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    outputElement.innerHTML = '';
    if (file?.type !== 'application/json') {
        outputElement.innerHTML = invalidMessage;
    } else {
        outputElement.innerHTML = '';

        const jsonToHtmlWorker = new Worker(
            new URL(
                '../workers/fileReader.worker.ts',
                import.meta.url
            ),
             {type: 'module'}
        );
        jsonToHtmlWorker.postMessage({message: 'parse_file',file});
        jsonToHtmlWorker.addEventListener('message', (event) => 
            handleWorkerMessage(event,jsonToHtmlWorker, outputElement, invalidMessage)
        );
    }
}