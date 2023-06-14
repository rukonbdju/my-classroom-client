export const handleGetMethod=async(url)=>{
    console.log(url)
    try{
        const response=await fetch(url);
        const result=await response.json();
        return result;
    }catch{
        error=>{
            return error;
        }
    }
}