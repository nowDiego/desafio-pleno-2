import React, { useState, useEffect } from 'react';
import { create } from '../services/signupService';
import { useNavigate } from "react-router-dom";
import { validate } from '../validation/FormSignupValidation';
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const notify = (message) => toast(message);

  const onChange = e => setValues({ ...values, [e.target.name]: e.target.value });


  async function onSubmitSignup(e) {
    e.preventDefault();
    try {

      let validation = validate(values);
      setFormErrors(validation);


      if (Object.keys(validation).length === 0) {

        const data = new FormData();

        data.append('name', values.name);
        data.append('email', values.email);
        data.append('password', values.password);



        const response = await create(data)

        if (response.data.status) {

          notify(response.data.message)
          clearField();
       
        }
        else {
        }
      }

    } catch (error) {

    }
  }

  async function clearField() {

    await setValues({
      name: '',
      email: '',
      password: '',

    });

  }


  return (

    <main className="w-screen	h-screen flex justify-center items-center bg-black" >

    <form onSubmit={onSubmitSignup} className='w-80 h-72 flex flex-col bg-stone-600 p-7' >

      <h2 className='text-white'>Criar conta</h2>


      <input className='mt-3 p-2' type="text" id="name" name="name" value={values.name} onChange={onChange} placeholder='Nome' />
      {formErrors.name ?
        <span className="content-error">{formErrors.name}</span>
        :
        null
      }


      <input className='mt-3 p-2' type="email" id="email" name="email" value={values.email} onChange={onChange} placeholder='E-mail' />
      {formErrors.email ?
        <span className="content-error">{formErrors.email}</span>
        :
        null
      }



      <input className='mt-3 p-2' type="password" id="password" name="password" value={values.password} onChange={onChange} placeholder='Senha' />
      {formErrors.password ?
        <span className="content-error">{formErrors.password}</span>
        :
        null
      }

      <button className='mt-3 bg-red-600 p-1 hover:bg-red-500 font-semibold	text-white' type="submit" >Cadastrar</button>

    </form>

    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

  </main>)
}