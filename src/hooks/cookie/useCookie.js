import { handlePostMethod } from "../../utilities/handlePostMethod";

const useCookie = () => {
    const setCookie = async (data, name,) => {
        try {
            const res = await handlePostMethod('http://localhost:3000/jwt', data)
            console.log(res)
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);
            document.cookie = `${name}=${res.token};expires=${expirationDate.toUTCString()};path=/`;
        } catch (error) {
            console.log(error)
        }
    };

    const getCookie = (name) => {
        let cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].split('=');
            if (name === cookie[0]) {
                return cookie[1]
            }
        }
    };
    return { setCookie, getCookie }
}

export default useCookie;