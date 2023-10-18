import { fileToObject } from "../utils/fileToObject";
import { jsonToHtmlChunks } from "../utils/jsoToHtml";
import { BrowserMessage, HtmlChunk } from "../utils/types";

let htmlGenerator: Generator<HtmlChunk>;

function handleBrowserMessage(event: MessageEvent<BrowserMessage>) {
  const {message,file} = event.data;

  if(message === 'parse_file' && file){
    fileToObject(file)
      .then((json) => {
        htmlGenerator = jsonToHtmlChunks(json);
        postMessage({message: 'parse_finished', fileName: file.name});
      })
      .catch(() => {
        postMessage({message: 'error'})
      });
      return;
  };

  if(message === 'next_chunk'){
    const nextChunk = htmlGenerator.next().value;
      if(nextChunk){
        postMessage({message: 'chunk_to_render', htmlChunk: nextChunk});
      }else {
        postMessage({message:'html_finished'});
      }
      return;
  }
}

onmessage = handleBrowserMessage;