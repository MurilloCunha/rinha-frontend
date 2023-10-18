import { handleFileInput } from "./utils/handleFileInput";

const fileInput = document.getElementById('fileInput');
const jsonOutput = document.getElementById('jsonOutput')!;

fileInput?.addEventListener('change', (event) => 
    handleFileInput(event, jsonOutput)
);