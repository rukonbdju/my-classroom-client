import useCookie from "../hooks/cookie/useCookie";

export const handleGetMethod = async (url) => {
    try {
        const { getCookie } = useCookie()
        const response = await fetch(url, {
            headers: {
                authorization: `Bearer ${getCookie("_classroom_jwt_token")}`
            }
        });
        const result = await response.json();
        return result;
    } catch {
        error => {
            return error;
        }
    }
}