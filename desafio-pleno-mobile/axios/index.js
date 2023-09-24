import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ax = axios.create({          
         baseURL: 'http://192.168.1.104:8000/api/'      
      
});

ax.interceptors.request.use(async function (config) {
        
        const token = await AsyncStorage.getItem('_token')
        if (token) {
                config.headers['Authorization']  = 'Bearer ' + token; 
        }
        return config;
}, function (error) {
        return Promise.reject(error);
});

ax.interceptors.response.use(null, error => {
       
        return Promise.reject(error);
      });


export default ax;