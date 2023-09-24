import React, { useState } from 'react';
import {  View , Pressable,Text,Image , StyleSheet } from 'react-native';
import ModalComponent from '../ModalComponent';

export default function ItemFeed({post,handleDetailPost}){


    async function detailPost(){
      handleDetailPost(post)
    }

    return(
        <View  style={styles.card} >
      
      <View style={styles.cardContent}>

      <Text style={styles.cardTextStyle}>{post.title}</Text>
      <Text style={styles.cardTextStyle}>{post.content}</Text>    
      </View>

      <View style={styles.cardBtn}>
      <Pressable
        style={[styles.btn, styles.greyBG]}
        onPress={detailPost}>
        <Text style={styles.textStyle}>Detalhes</Text>
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

    btn: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin:2,
    },
    greyBG: {
      backgroundColor: '#64748b',
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
  