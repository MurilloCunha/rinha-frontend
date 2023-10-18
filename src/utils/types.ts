export interface BrowserMessage {
    message: 'parse_file'|'next_chunk';
    file?: File;
}

export interface WorkerMessage {
    message: 'error'|'parse_finished'| 'chunk_to_render'|'html_finished';
    htmlChunk: HtmlChunk;
    fileName?: string;
}

export interface HtmlChunk {
    id?:string;
    key: string;
    value: string|null;
    parentId: string;
    isNestedList?: boolean;
    isArray?: boolean;
}