import { WorkerMessage } from "./types";
import { renderHtmlChunk } from "./renderHtmlChunk";

export function handleWorkerMessage(event: MessageEvent<WorkerMessage>,worker: Worker, outputElement: HTMLElement, invalidMessage: string, ) {
    const {data:{message, htmlChunk, fileName}} = event;
    switch (message) {
        case 'parse_finished':
            worker.postMessage({message: 'next_chunk'});
            outputElement.innerHTML += 
                `<h2>${fileName}</h2><ul id="rootList"></ul>`;
            return;
    
        case 'html_finished':
            worker.terminate();
            return;

        case 'chunk_to_render': 
            renderHtmlChunk(htmlChunk, worker);
            return;
        
        case 'error': 
            outputElement.innerHTML = invalidMessage;
            return;

        default:
            return;
    }
  };

