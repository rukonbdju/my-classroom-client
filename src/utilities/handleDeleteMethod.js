const handleDeleteMethod=async(url)=>{
    try{
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return(response.json())
    }catch (error){
        console.log(error)
    }
}

export default handleDeleteMethod;