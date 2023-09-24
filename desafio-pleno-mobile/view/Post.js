import React, { useState, useEffect } from 'react';
import {  View , FlatList,Text,StyleSheet,Pressable } from 'react-native';
import { findAllPosts,destroy } from '../services/postService';
import ItemPost from '../components/Item/ItemPost';
import ModalComponent from '../components/ModalComponent';
import PostForm from '../components/Form/PostForm'
import PostEditForm from '../components/Form/PostEditForm';
import PostDetail from '../components/PostDetail';
import {Picker} from '@react-native-picker/picker';

export default function Post(){
  
  const [posts, setPosts] = useState({
    data: [],
    page: 1,
    loading: false
  }
  );
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);

    const [activePost, setActivePost] = useState(
        {
          status: false,
          post: {}
        }
      );

      const [filter,setFilter] = useState('') 


    useEffect(() => {

        (async () => {
          try {
            const response = await findAllPosts('post');
            if (response.data.status) {
              setPosts({
                data: response.data.data.data ,
                page: posts.page + 1,
                loading: false,
              }
              )
            } else {
            
            }
    
          }
          catch (error) {
           
          }
        })()
    
      }, [])
    
    
      useEffect(()=>{
        setPosts({          
          data: [],
          page: 1,
          loading: false       
          });   

      },[filter])


      async function loadPostsData(page = null) {
        try {      

          let pageNumber = page?page:posts.page
          let orderby = filter?filter:null   

                         
          const response = await findAllPosts('post',pageNumber,orderby);
          if (response.data.status) {
         
            setPosts({
              data:[ ...posts.data, ...response.data.data.data ],
              page: posts.page + 1,
              loading: false,
            })

          } else {
    
          }
    
        }
        catch (error) {
    
        }
      }
    
 
  

      function openRegister() {
        setOpenModalRegister(true);
      }

      const closeModalRegister = () => {
        setOpenModalRegister(false);
      }

      const closeModalEdit = () => {
        setOpenModalEdit(false);
      }

      const closeModalDetail = () => {
        setOpenModalDetail(false);
      }
      

      async function handleRemovePost(value) {

        try {
    
          const response = await destroy(value);
    
          if (response.data.status) {
            destroyPost(value);

              }
          else {
          }
    
        } catch (error) {
    
        }
      }
    
      async function hiddenModals() {
        setOpenModalDetail(false)
        setOpenModalEdit(false)
        setOpenModalRegister(false)
      }

    
      async function handleEditPost(value) {
        hiddenModals();    
         setActivePost({
          status: true,
          post: value
        })
    
        setOpenModalEdit(true);
    
      }

      async function handleDetailPost(value) {
        hiddenModals();    
         setActivePost({
          status: true,
          post: value
        })
    
        setOpenModalDetail(true);    
      }


      function handleFilter(){                  
        loadPostsData();                   
       }

       

      async function insertPost(value) {
       
        setPosts({
          data: [...posts.data,value],
          page: posts.page,
          loading: false
         })

      }

      function updatePost(value) {                  
    
        const newPost = posts.data.filter(item => (item.id !== value.id));
  
      setPosts({
        data: [...newPost,value],
        page: posts.page,
        loading: false
       })
  
    
        }


      function destroyPost(value) {
      
        const newPost = posts.data.filter(item => (item.id !== value));
        
        setPosts({
          data: [...newPost],
          page: posts.page,
          loading: false
         })
        
      }


    return(
        <View style={styles.container}>

<View style={styles.contentFilter}>
    
    <Picker
    style={styles.pickerStyle}
    selectedValue={filter}
    onValueChange={(itemValue, itemIndex) =>
    setFilter(itemValue)
   }>
   <Picker.Item label="asc" value="asc" />
   <Picker.Item label="desc" value="desc" />
  </Picker>


  <Pressable
        style={[styles.btn, styles.redBG]}
        onPress={()=>handleFilter()}>
        <Text style={styles.textStyle}>OK</Text>
      </Pressable>

    </View>


     <View style={styles.contentRegister}>
    
<Pressable
        style={[styles.button, styles.redBG]}
        onPress={openRegister}>
        <Text style={styles.textStyle}>+</Text>
      </Pressable>

    </View>

       <FlatList
        styles={styles.contentFL}
        data={posts.data}
        extraData={posts.data}
        renderItem={({item}) =>
         <ItemPost post={item} handleRemovePost={handleRemovePost} handleEditPost={handleEditPost} handleDetailPost={handleDetailPost}  />
        }
        keyExtractor={item => item.id}
        onEndReached={()=>loadPostsData()}
        onEndReachedThreshold={0.1}
      />

 <ModalComponent open={openModalRegister} close={closeModalRegister} >
     <PostForm  insertPost={insertPost}  key={new Date().getTime()}></PostForm>
      </ModalComponent> 

    <ModalComponent open={openModalEdit} close={closeModalEdit} >
     <PostEditForm post={activePost.post} updatePost={updatePost}  key={activePost.post.id}></PostEditForm>
    </ModalComponent> 

    <ModalComponent open={openModalDetail} close={closeModalDetail} >
     <PostDetail post={activePost.post} key={activePost.post.id}></PostDetail>
    </ModalComponent> 


    </View>
    )
}


const styles = StyleSheet.create({

  container: {
    display:'flex',
    flexDirection:'column',
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%',
    paddingTop:50
  },

  contentFL:{
    height:'100%',
    backgroundColor: 'red',

  },
  contentRegister:{
    marginTop:10,
    marginBottom:5
  },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    redBG:{
      backgroundColor: '#dc2626',

    },

    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },

    contentFilter:{
      width:'100%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      margin:10
    },
    pickerStyle:{
      backgroundColor:'#1f2937d1',   
      color:'white',
      width:'50%'
    },
    btn: {
      padding: 10,
      elevation: 2,
      width:'20%',
      height:53
  
    },
  
    redBG:{
      backgroundColor: '#dc2626',
  
    },
  
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
  });
  