import axios from 'axios';

const ax = axios.create({    
         baseURL: 'http://localhost:8000/api'   
        });

ax.interceptors.request.use(function (config) {
        const token = localStorage.getItem('_token')       

        if (token) {
                config.headers['Authorization']  = 'Bearer ' + token; 
            }

        return config;
}, function (error) {       
        return Promise.reject(error);
});

ax.interceptors.response.use(null, error => {

        if (error.response.status == 401 ||error.response.status == 403 ) {
                localStorage.removeItem('_token');
                window.location.href = '/login';
        }

       
        return Promise.reject(error);
      });

export default ax;

