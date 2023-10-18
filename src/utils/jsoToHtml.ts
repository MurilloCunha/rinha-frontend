import { HtmlChunk } from "./types";

const listIDs: number[] = [];
let currentUlId = 0;

export function* jsonToHtmlChunks(json: Record<string, any>, currentIndentLevel = 0): Generator<HtmlChunk> {
    const tuples = Object.entries(json);
  
    for (const [key, value] of tuples) {
      if (typeof value === 'object' && value !== null) {
        const {id, parentId} = getListId(currentIndentLevel);
        yield {
          id, 
          key,
          value:'',
          parentId, 
          isNestedList: true,
          isArray: !!value?.length,
        };
        yield* jsonToHtmlChunks(value, currentIndentLevel + 1);
      } else {
        yield {
          key,
          value:  typeof value === 'string' ? `"${value}"` : value || 'null', 
          parentId: getParentId(currentIndentLevel)
        };
      }
    }
  }


function getListId(indentLevel: number){
    const id = ++currentUlId;
    if (listIDs.length > indentLevel) {
      listIDs.splice(indentLevel, listIDs.length - indentLevel);
    }
    listIDs.push(id);
  
    return {
      id: String(id), 
      parentId: getParentId(indentLevel)
    }
  }
  
  function getParentId(indentLevel: number){
    return String(listIDs[indentLevel - 1])
  }