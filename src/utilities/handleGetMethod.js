import useCookie from "../hooks/cookie/useCookie";

export const handleGetMethod = async (url, data) => {
    try {
        const { getCookie } = useCookie()
        const response = await fetch(url, {
            method: "GET",
            headers: {
                authorization: `Bearer ${getCookie("_classroom_jwt_token")}`,
                query:JSON.stringify(data)
            },
        });
        const result = await response.json();
        return result;
    } catch {
        error => {
            return error;
        }
    }
}