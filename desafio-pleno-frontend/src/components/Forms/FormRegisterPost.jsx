import React, { useState, useEffect, useRef } from 'react';
import { create } from '../../services/postService';
import { findAllCategory } from '../../services/categoryService';
import { validate } from '../../validation/FormPostRegisterValidation';

export default function FormRegisterPost({ insertPost , notify }) {


  const [values, setValues] = useState({
    title: '',
    content: '',
    photo: '',
    category: ''
  });
  const [categories, setCategories] = useState([]);
  const fileRef = useRef();

  const [formErrors, setFormErrors] = useState({});


  const onChange = e => setValues({ ...values, [e.target.name]: e.target.value });

  const onChangeFile = (e) => setValues({ ...values, [e.target.name]: e.target.files[0] })


  useEffect(() => {

    (async () => {
      try {
        const response = await findAllCategory();
        if (response.data.status) {
          setCategories(response.data.data)
          
        } else {
         
        }

      }
      catch (error) {

      }
    })()

  }, [])


  async function onSubmitEvent(e) {
    e.preventDefault();
    try {

      let validation = validate(values);
      setFormErrors(validation);


      if (Object.keys(validation).length === 0) {

        const data = new FormData();

        data.append('title', values.title);
        data.append('content', values.content);
        data.append('photo', values.photo);
        data.append('category', values.category);



        const response = await create(data)

        if (response.data.status) {

          insertPost(response.data.data)
          notify(response.data.message)
          clearField();


        }
        else {
          notify(response.data.message)
        }
      }

    } catch (error) {

    }
  }

  async function clearField() {

    await setValues({
      title: '',
      content: '',
      photo: '',
      category: ''
    });

    fileRef.current.value = "";

  }


  return (<>


    <form onSubmit={onSubmitEvent} className='flex flex-col m-3'>

      <h2>Cadastrar Post</h2>


      <input className='mt-3 p-2' type="text" id="title" name="title" value={values.title} onChange={onChange} placeholder='Título' />

      {formErrors.title ?
        <span className="text-white">{formErrors.title}</span>
        :
        null
      }
      <label>Conteúdo</label>
      <textarea className='mt-3 p-2' name="content" id="content" value={values.content} onChange={onChange} placeholder='Conteúdo' cols="30" rows="10"></textarea>

      {formErrors.content ?
        <span className="text-white">{formErrors.content}</span>
        :
        null
      }

      <label>Foto</label>
      <input  className='mt-3 p-2'  type="file" name="photo" id="photo" onChange={onChangeFile} accept="image/png,image/jpeg" ref={fileRef} />

      {formErrors.photo ?
        <span className="text-white">{formErrors.photo}</span>
        :
        null
      }



      <label>Categoria</label>
      <select   className='mt-3 p-2'  id="category" name="category" value={values.category} onChange={onChange}>
        <option >Selecionar</option>
        {categories ?
          categories.map((item, index) =>
            <option key={index} value={item.id}>{item.name}</option>
          )
          :
          null
        }

      </select>

      {formErrors.category ?
        <span className="text-white">{formErrors.category}</span>
        :
        null
      }




      <button type="submit"className='mt-3 outline outline-offset-2 outline-1 outline-white text-white font-semibold  bg-red-400 hover:bg-red-500	' >Cadastrar</button>

    </form>

  </>)
}