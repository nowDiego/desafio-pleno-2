import React, { useState } from 'react';
import {  View , Pressable,Text,Image , StyleSheet,Button } from 'react-native';

export default function ItemPost({post,handleRemovePost,handleEditPost,handleDetailPost}){
   

      function removePost() {
        handleRemovePost(post.id)
      }
      
      async function editPost(){
        handleEditPost(post)
      }

      async function detailPost(){
        handleDetailPost(post)
      }

    return(
        <View style={styles.card}>
     
      <View style={styles.cardContent}>
      <Text style={styles.cardTextStyle}>{post.title}</Text>
      <Text style={styles.cardTextStyle}>{post.content}</Text>   
      
      </View>

      <View style={styles.cardBtn}>

    
      <Pressable
        style={[styles.button, styles.greyBG]}
        onPress={detailPost}>
        <Text style={styles.textStyle}>Detalhes</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.orangeBG]}
        onPress={()=>editPost()}>
        <Text style={styles.textStyle}>Editar</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.redBG]}
        onPress={()=>removePost()}>
        <Text style={styles.textStyle}>Excluir</Text>
      </Pressable>
     

    </View>

      
    </View>
    )
}

const styles = StyleSheet.create({
   
  card:{
    display:'flex',
    flexDirection:'row',
    width:'95%',
    minHeight:90,
    backgroundColor:'#1f2937d1',   
     margin:5,
    borderRadius: 20,
      },
  cardContent:{
    width:'75%',  
    color:'#fff',
    marginLeft:5,
    marginTop:5,    
  
  },
  cardBtn:{
    width:'25%',
  },

  cardTextStyle:{    
    color: 'white',
    fontWeight: 'bold',  
    marginLeft:5, 
},


    image: {
        width: 150,
        height: 150,
      },

    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin:2,
    },
    orangeBG: {
      backgroundColor: '#ea580c',
    },
    greyBG: {
      backgroundColor: '#64748b',
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
  });
  