import axios from '../axios/index';


export const login = async (data) =>{
  return new Promise(async (resolve, reject) => {
    try {  
  const response = await axios({
    method: "post",
    url: "/login",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
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


  