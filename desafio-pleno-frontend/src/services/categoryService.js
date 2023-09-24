import axios from '../axios/index';

export const findAllCategory = async () =>{
return new Promise(async (resolve, reject) => {
  try {  
const response = await axios.get("/category")
.then(async res => {
  resolve(await res);   
})
  }  
catch (e) {
  reject(e);
}

})

}
