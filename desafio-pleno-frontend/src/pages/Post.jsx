import React, { useState, useEffect } from 'react';
import { findAllPosts, destroy } from '../services/postService';
import ModalComponent from '../components/ModalComponent';
import FormEditPost from '../components/Forms/FormEditPost';
import PostDetail from '../components/PostDetails';
import FormRegisterPost from '../components/Forms/FormRegisterPost';
import Pagination from "react-js-pagination";
import LayoutComponent from '../components/LayoutComponent';
import { ToastContainer, toast } from 'react-toastify';
import { HiPlus } from "react-icons/hi";


export default function Post() {

  const [posts, setPosts] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [filter,setFilter] = useState({
    order:''
   })

  const [activePost, setActivePost] = useState(
    {
      status: false,
      post: {}
    }
  );

  const notify = (message) => toast(message);


  const closeModalEdit = () => {
    setOpenModalEdit(false);
  }

  const closeModalDetail = () => {
    setOpenModalDetail(false);
  }

  const closeModalRegister = () => {
    setOpenModalRegister(false);
  }


  useEffect(() => {

    (async () => {
      try {
        const response = await findAllPosts('post');
        if (response.data.status) {
          setPosts(response.data.data)
        } else {
      
        }

      }
      catch (error) {
        
      }
    })()

  }, [])


  const onChangeFilter = e => setFilter({ ...filter, [e.target.name]: e.target.value });


  async function getPostsData(pageNumber = 1,order = null) {
    try {

      let orderby = filter?filter.order:order  

      const response = await findAllPosts('post',pageNumber,orderby);
      if (response.data.status) {
        setPosts(response.data.data)
      } else {

      }

    }
    catch (error) {

    }
  }


  async function insertPost(value) {
    getPostsData();
  }

  async function updatePost(value) {
    getPostsData();

  }



  async function handleRemovePost(value) {

    try {

      const response = await destroy(value);

      if (response.data.status) {
        getPostsData();
        notify(response.data.message)

      }
      else {
        notify(response.data.message)  
      }

    } catch (error) {

    }
  }



  function handleRegisterPost() {
    hiddenModals();
    setOpenModalRegister(true);
  }


  function handleDetailPost(value) {
    clearActivePost();
    hiddenModals();

    setActivePost({
      status: true,
      post: value
    })
    setOpenModalDetail(true);

  }

  function handleEditPost(value) {
    clearActivePost();
    hiddenModals();
    setActivePost({
      status: true,
      post: value
    })

    setOpenModalEdit(true);

  }

   function hiddenModals() {
    setOpenModalDetail(false)
    setOpenModalEdit(false)
    setOpenModalRegister(false)
  }


  async function handleFilter(){
    getPostsData(1)
  }

  function clearActivePost(){
    setActivePost(
      {
        status: false,
        post: {}
      }
    )
  }

  return (
    <LayoutComponent>
 <main className='w-full min-h-screen flex flex-col items-center bg-gray-900 '>
 

<div className="w-96 h-20 font-semibold bg-slate-700 mt-3 p-3 rounded-md">
           
            <label className='mr-1  text-white'>Ordem</label>          
            <select  className='mr-1' id="order" name="order" value={filter.order} onChange={onChangeFilter}>
            <option >Selecionar</option>               
            <option  value='asc'>ASC</option>
            <option  value='desc'>DESC</option>
            </select>

            <button onClick={()=>handleFilter()}  className='mt-3 bg-red-600 p-1 hover:bg-red-500 font-semibold  rounded-md text-white'>OK</button>
    </div>

<div className='w-3/4 mb-3 flex justify-end'>
<button onClick={() => handleRegisterPost()} className='mt-3 p-3 bg-red-600 hover:bg-red-500 font-semibold rounded-md text-white'><HiPlus/></button>
</div>
    


      <div className='w-4/6 font-semibold '>
      {posts.data ?
        posts.data.map((item, index) =>
          <div key={index} className='m-4 p-3 bg-gray-800 text-white rounded-lg	flex  break-words' >
           <div className='w-3/4'>
           <p className='font-extrabold'>{item.title}</p>
            <p>{item.content}</p>
            <p>{item.category.name}</p>
           </div>          
            <div className='flex flex-col w-1/4'>
           <button onClick={() => handleDetailPost(item)} className='mt-3 text-white bg-slate-500 p-1 hover:bg-slate-600 font-semibold'>Detalhe</button>
           <button onClick={() => handleEditPost(item)} className='mt-3 text-white bg-orange-600 p-1 hover:bg-orange-500 font-semibold'>Editar</button>
           <button onClick={() => handleRemovePost(item.id)} className='mt-3  bg-red-600 p-1 hover:bg-red-500 font-semibold' >Deletar</button>
            </div>
           
          </div>
        )
        :
        null
      }
</div>

      {posts.data ?
        <Pagination
          activePage={posts.current_page}
          itemsCountPerPage={posts.per_page}
          totalItemsCount={posts.total}
          onChange={(pageNumber) => getPostsData(pageNumber)}
        />

        : null
      }


      <ModalComponent open={openModalEdit} close={closeModalEdit}>
        <FormEditPost post={activePost.post} updatePost={updatePost} notify={notify}  key={activePost.post.id} />
      </ModalComponent>


      <ModalComponent open={openModalDetail} close={closeModalDetail}>
        <PostDetail post={activePost.post}  key={activePost.post.id}  />
      </ModalComponent>

      <ModalComponent open={openModalRegister} close={closeModalRegister}>
        <FormRegisterPost insertPost={insertPost} notify={notify} key={new Date().getTime()} />
      </ModalComponent>


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
theme="dark"
/>


      </main>  
    </LayoutComponent>
 

)


}