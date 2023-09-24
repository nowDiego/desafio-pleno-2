import axios from '../axios/index';


export const create = async (data) =>{
  return new Promise(async (resolve, reject) => {
    try {  
  const response = await axios({
    method: "post",
    url: "/posts",
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




    export const destroy = async (payload) =>{
      return new Promise(async (resolve, reject) => {
        try {  
      const response = await axios({
        method: "delete",
        url: `/posts/${payload}`,      
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



        export const update = async (payload,data) =>{
          return new Promise(async (resolve, reject) => {
            try {  
          const response = await axios({
            method: "post",
            url: `/posts/${payload}`,      
            data:data,
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





export const findOnePost = async (payload) =>{
  return new Promise(async (resolve, reject) => {
    try {  
  const response = await axios.get(`/posts/${payload}`)
  .then(async res => {
    resolve(await res);   
  })
    }  
  catch (e) {
    reject(e);
  }
  
  })
  
  }



export const findAllPosts = async (type,pageNumber = 1,order=null) =>{
  return new Promise(async (resolve, reject) => {
    try {  
  const response = await axios.get(`/posts?page=${pageNumber}&type=${type}${order!==null?'&order='+order :'' }`)
  .then(async res => {
    resolve(await res);   
  })
    }  
  catch (e) {
    reject(e);
  }
  
  })
  
  }

    

      
    


         

          