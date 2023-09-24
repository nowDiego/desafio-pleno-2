import React, { useState, useEffect } from 'react';
import { findAllPosts } from '../services/postService';
import ModalComponent from '../components/ModalComponent';
import PostDetail from '../components/PostDetails';
import Pagination from "react-js-pagination";
import LayoutComponent from '../components/LayoutComponent';


export default function Feed(){

const [posts, setPosts] = useState([]);
const [filter,setFilter] = useState({
    order:''
})
const [openModalDetail, setOpenModalDetail] = useState(false);

const [activePost, setActivePost] = useState(
    {
      status: false,
      post: {}
    }
  );

  
  const closeModalDetail = () => {
    setOpenModalDetail(false);
  }

  useEffect(() => {

    (async () => {
      try {
        const response = await findAllPosts('feed');
        if (response.data.status) {
          setPosts(response.data.data)
          console.log(response.data.data);
        } else {
    
        }

      }
      catch (error) {
        
      }
    })()

  }, [])


  const onChangeFilter = e => setFilter({ ...filter, [e.target.name]: e.target.value });


  async function getPostsData(pageNumber = 1) {
    try {

      let orderby = filter?filter.order:null   

      const response = await findAllPosts('feed',pageNumber,orderby);
      if (response.data.status) {
        setPosts(response.data.data)
        console.log(response.data.data);
      } else {

      }

    }
    catch (error) {

    }
  }

   function handleDetailPost(value) {
    
    clearActivePost();

    setActivePost({
      status: true,
      post: value
    })
    setOpenModalDetail(true);
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


return(
    <LayoutComponent>
      <main className='w-full	min-h-screen flex flex-col items-center bg-gray-900'>


      <div className="w-96 h-20 font-semibold bg-slate-700 mt-3 p-3 rounded-md">
           
           <label className='mr-1  text-white'>Ordem</label>          
           <select  className='mr-1' id="order" name="order" value={filter.order} onChange={onChangeFilter}>
           <option >Selecionar</option>               
           <option  value='asc'>ASC</option>
           <option  value='desc'>DESC</option>
           </select>

           <button onClick={()=>handleFilter()}  className='mt-3 bg-red-600 p-1 hover:bg-red-500 font-semibold  rounded-md text-white'>OK</button>
   </div>

<div className='w-4/6  font-semibold '>

{posts.data ?
        posts.data.map((item, index) =>
          <div key={index} className='m-4 p-3 bg-gray-800 text-white rounded-lg	flex break-words' >
            <div className='w-3/4'>
            <p>{item.title}</p>
            <p>{item.content}</p>
            </div>

            <div className='flex flex-col w-1/4'>
              <button onClick={() => handleDetailPost(item)} className='mt-3 text-white bg-slate-500 p-1 hover:bg-slate-600 font-semibold'>Detalhe</button>
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
          className='flex'
        />

        : null
      }

      <ModalComponent open={openModalDetail} close={closeModalDetail} >
        <PostDetail post={activePost.post} />
      </ModalComponent>

      </main>
    </LayoutComponent>
)

}