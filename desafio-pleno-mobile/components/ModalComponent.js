import React, { useState } from 'react';
import {  View , Pressable,Text,Modal , StyleSheet } from 'react-native';


export default function ModalComponent({children,open,close}){

return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={open}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(close);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}> 
     <View style={styles.modalClose}>
     <Pressable
          style={[styles.button,styles.buttonOpen]}
          onPress={close}>
          <Text style={styles.textStyle}>X</Text>
        </Pressable>   
     </View>
     <View style={styles.modalContent}>         
            {children}
   
    </View>
     
       
      </View>
    </View>
  </Modal>
    
)

}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      width:'70%',
      Height:'50%',
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalClose:{
     display:'flex',
     justifyContent:'flex-end',
     alignItems:'flex-end',
     width:'100%'
    },
    modalContent:{      
      width:'100%',
      height:'70%'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: 'red',               
    },
    buttonClose: {
      backgroundColor: '#2196F3',
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
  