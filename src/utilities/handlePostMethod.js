
export const handlePostMethod = async (url, data) => {
   try{
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result;
   }catch{
    error=>console.log(error);
   }
}