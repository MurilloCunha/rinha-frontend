import { HtmlChunk } from "./types";

export function renderHtmlChunk(htmlChunk: HtmlChunk, worker:Worker){
    const element = document.createElement('li');
    htmlChunk?.isArray && element.classList.add('closeKey');

    const key = document.createElement('span');
    isNaN(Number(htmlChunk?.key)) ? key.classList.add("key") : key.classList.add("number");
    htmlChunk?.isArray && key.classList.add("arrayKey");
    key.textContent = `${htmlChunk.key}: `;
    element.appendChild(key);

    const value = document.createElement('value');
    value.classList.add("value");
    value.textContent=htmlChunk.value;
    element.appendChild(value);

    if (htmlChunk.isNestedList) {
        const subElement = document.createElement('ul');
        subElement.id = htmlChunk?.id ?? '';
        subElement.classList.add("list");
        element.appendChild(subElement);
    }
        const parentElement = document.getElementById(htmlChunk?.parentId) ?? document.getElementById('rootList');
        parentElement?.appendChild(element);

   worker.postMessage({message: 'next_chunk'});
  }