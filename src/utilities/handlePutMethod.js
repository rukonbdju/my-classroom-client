import useCookie from "../hooks/cookie/useCookie";

export const handlePutMethod = async (url, data) => {
    try {
        const { getCookie } = useCookie()
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${getCookie("_classroom_jwt_token")}`
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        return result;

    } catch (error) {
        console.log(error)
    }
}