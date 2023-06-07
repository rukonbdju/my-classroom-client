export const handlePutMethod=async(url,data)=>{
    console.log({url,data})
    try{
        const response=await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const result=await response.json();
        return result;
        
    }catch{
        err=>console.log(err)
    }
}