const handleDeleteMethod=async(url,data)=>{
    try{
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        });
        return(response.json())
    }catch (error){
        console.log(error)
    }
}

export default handleDeleteMethod;