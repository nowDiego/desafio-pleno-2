import React, { useState, useEffect } from 'react';
import {  View , FlatList,StyleSheet , Pressable , Text} from 'react-native';
import { findAllPosts } from '../services/postService';
import {Picker} from '@react-native-picker/picker';
import ItemFeed from '../components/Item/ItemFeed';
import PostDetail from '../components/PostDetail';
import ModalComponent from '../components/ModalComponent';


export default function Feed(){
  
    const [posts, setPosts] = useState({
      data: [],
      page: 1,
      loading: false
    }
    );
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [activePost, setActivePost] = useState(
      {
        status: false,
        post: {}
      }
    );

   const [filter,setFilter] = useState(null) 
          
  

    useEffect(() => {

        (async () => {
          try {
            const response = await findAllPosts('feed');
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

                         
          const response = await findAllPosts('feed',pageNumber,orderby);
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
    

  

      const closeModalDetail = () => {
        setOpenModalDetail(false);
      }


      async function hiddenModals() {
        setOpenModalDetail(false)     
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

       <FlatList
        styles={styles.contentFL}
        extraData={posts.data}
        data={posts.data}
        renderItem={({item}) =>
         <ItemFeed post={item} handleDetailPost={handleDetailPost}/>
        }
        keyExtractor={item => item.id}
        onEndReached={()=>loadPostsData()}
        onEndReachedThreshold={0.1}
       

      />

<ModalComponent open={openModalDetail} close={closeModalDetail} >
     <PostDetail post={activePost.post}></PostDetail>
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


