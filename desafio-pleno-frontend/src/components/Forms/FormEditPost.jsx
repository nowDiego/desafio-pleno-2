import React, { useState, useEffect,useRef} from 'react';
import { findAllCategory } from '../../services/categoryService';
import { update } from '../../services/postService';
import { validate } from '../../validation/FormPostEditValidation';



export default function FormEditPost ({post,updatePost,notify}){
    
    const [values, setValues] = useState({
        title: '',
        content: '',     
        photo: '', 
        category:''    
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
            }else{
                
            }

            }
            catch (error) {

               
            }
        })()

    }, [])


    async function onSubmitEdit(e){

        e.preventDefault();
        try {
    
          let validation = validate(values);
          setFormErrors(validation);
    
      
          if (Object.keys(validation).length === 0) {
    
            const data = new FormData();

            data.append('_method', 'patch');
            data.append('title', values.title);
            data.append('content', values.content);          
            data.append('photo', values.photo);  
            data.append('category', values.category);                  
              
    
            const response = await update(post.id,data)
    
            if (response.data.status) {

                console.log(response.data.message)

                updatePost(response.data.data)
                notify(response.data.message)
              
            }
            else {
             notify(response.data.message)

            }
          }
    
        } catch (error) {
    
     
        }

    }

    async function clearField() {

        setValues({
          title: '',
          content: '',
          photo: '',
          category: ''
        });
    
        fileRef.current.value = "";
    
      }

    return (
        <form onSubmit={onSubmitEdit} className='flex flex-col m-3' >
         <h2>Atualizar Post</h2>


<input  className='mt-3 p-2'  type="text" id="title" name="title" defaultValue={post.title} onChange={onChange} placeholder='Título' />


<textarea  className='mt-3 p-2'  name="content" id="content"  defaultValue={post.content}  onChange={onChange} placeholder='Conteúdo' cols="30" rows="10"></textarea>



<div >
             <label>Foto</label>
            <input  className='mt-3 p-2'  type="file" name="photo" id="photo" onChange={onChangeFile} accept="image/png,image/jpeg" ref={fileRef} />
            
            {formErrors.photo ?
                <span className="content-error">{formErrors.photo}</span>
                :
                null
            }
            </div>

            <div>
            <label>Categoria</label>
            <select  className='mt-3 p-2'  id="category" name="category" defaultValue={post.category} onChange={onChange}>
            <option >Selecionar</option>
                {categories ?
                    categories.map((item, index) =>
                        <option key={index} value={item.id}>{item.name}</option>
                    )
                    :
                    null
                }

            </select>

         
            </div>



<button type="submit" className='mt-3 outline outline-offset-2 outline-1 outline-white text-white font-semibold  bg-red-400 hover:bg-red-500	'>Atualizar</button>


        </form>
    )

    }