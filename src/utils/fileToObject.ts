export async function fileToObject(file: Blob){
    return new Promise<Record<string,any>>((resolve, reject) => {
        const reader = new FileReader();
          
            reader.readAsText(file);
            reader.onload = (event: ProgressEvent<FileReader>) => {
                try{
                    const json: Record<string,any> = 
                        JSON.parse(String(event.target?.result));
                    resolve(json);
                  }
                catch{
                    reject({error: 'invalid Json'})
                }
            };
            return;

    });

}