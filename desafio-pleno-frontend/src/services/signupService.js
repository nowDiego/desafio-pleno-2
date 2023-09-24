import axios from '../axios/index';


export const create = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: "post",
                url: "/signup",
                data: data,
            })
                .then(async res => {
                    resolve(await res);
                })
        }
        catch (e) {
            reject(e);
        }

    })

}
