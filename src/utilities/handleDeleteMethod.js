import useCookie from "../hooks/cookie/useCookie";

const handleDeleteMethod = async (url, data) => {
    try {
        const { getCookie } = useCookie()
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${getCookie("_classroom_jwt_token")}`
            },
            body: JSON.stringify(data)
        });
        return (response.json())
    } catch (error) {
        console.log(error)
    }
}

export default handleDeleteMethod;