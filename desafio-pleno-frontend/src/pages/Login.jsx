import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../services/loginService';
import { Link } from "react-router-dom";


export default function Login(){

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: '',
        password: '',
      });

      const [response, setResponse] = useState({
        status: false,
        title: '',
        message: ''
      })

      const onChange = e => setValues({ ...values, [e.target.name]: e.target.value });


      async function onSubmitLogin(e) {
        e.preventDefault();
    
        try {
            
    
            const data = new FormData();
            data.append('username', values.username);
            data.append('password', values.password);
    
            const response = await login(data);
    
            if (response.data.status) {
    
              localStorage.setItem('_token', response.data.access_token);   
              navigate("/feed");
    
             
    
            }
            else {
    
              setResponse({
                'status': response.data.status,
                'message': response.data.message
              });    
              
            }
              
    
        } catch (error) {
    
 
        }
        
      }

    return(
    <main className="w-screen	h-screen flex justify-center items-center bg-black" >
             

      <form onSubmit={onSubmitLogin} className='w-80 h-72 flex flex-col bg-stone-600 p-7' >


<h2  className='text-white'>Entrar</h2>

<input className='mt-3 p-2' type="text" id="username" name="username" value={values.username} onChange={onChange} placeholder='Usuário ou E-mail' />

<input className='mt-3 p-2' type="password" id="password" name="password" value={values.password} onChange={onChange} placeholder='Senha' />


<button className='mt-3 bg-red-600 p-1 hover:bg-red-500 font-semibold	text-white' type="submit" >Entrar</button>

{response ? <p className="text-white	">{response.message}</p> : null}

<div className="mt-2 flex items-center text-lg font-bold ">
  <span className='text-white'>Não tem conta?</span><Link to='/signup' className='text-red-400 ml-1'>       
      Inscreva-se
</Link>
</div>


</form>
    
    </main>)
}