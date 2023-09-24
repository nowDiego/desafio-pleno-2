import React, { useState, useEffect } from 'react';
import { Button, Image, View, Pressable ,TextInput,StyleSheet,Text,ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';
import { findAllCategory } from '../../services/categoryService';
import { create } from '../../services/postService';
import { validate } from '../../validation/FormPostRegisterValidation';


export default function PostForm({insertPost}){

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState({});
    const [category, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [formErrors, setFormErrors] = useState({});




      useEffect(() => {

        (async () => {
          try {
            const response = await findAllCategory();
            if (response.data.status) {
                setCategoriesList(response.data.data)
              
            } else {
            
            }
    
          }
          catch (error) {
    
          }
        })()
    
      }, [])
    

      function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }


      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
       
        if (result.cancelled) {
          return;
        }
      
       // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.assets[0].uri;
        let filename = localUri.split('/').pop();
      
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;      
     
        setPhoto({ uri: localUri, name: filename, type });

      };




async function onPress() {
  try {

    let values = {
      "title": title,
      "content": content,
      "photo": photo ,  
      "category":category    
    }

    let validation = validate(values);
    setFormErrors(validation);


    if (Object.keys(validation).length === 0) {

      const data = new FormData();

      data.append('title', title);
      data.append('content', content);
      data.append('photo', photo);
      data.append('category', category);

      const response = await create(data)
    

      if (response.data.status) {

        insertPost(response.data.data) 
        showToast(response.data.message) 
        clearField()

           }
      else {
       
      }
    }

  } catch (error) {

  }
}


function clearField() {

  setTitle('');
  setContent('');
  setPhoto({});
  setCategory('');

}


    return(
    <View>


  <TextInput
          value={title}
          onChangeText={(title) => setTitle(title)}
          placeholder={'Título'}
        />
 {formErrors.title ?
        <Text>{formErrors.title}</Text>
        :
        null
      }

      <TextInput
          value={content}
          onChangeText={(content) => setContent(content)}
          placeholder={'Conteúdo'}
        />

{formErrors.content ?
        <Text>{formErrors.content}</Text>
        :
        null
      }

       <View>
    <Button title="Selecione uma image" onPress={pickImage} />
    {photo.uri && <Image source={{ uri: photo.uri }} style={styles.image}
 />}
  {formErrors.photo ?
        <Text>{formErrors.photo}</Text>
        :
        null
      }
  </View>
  


 <Picker
    selectedValue={category}
    onValueChange={(itemValue, itemIndex) =>
    setCategory(itemValue)
   }>
    {categoriesList?
    categoriesList.map((item)=>
    <Picker.Item label={item.name} value={item.id} key={item.id} />
    )
    :
    null

    }

  </Picker>
  {formErrors.category ?
        <Text>{formErrors.category}</Text>
        :
        null
      }

  <Pressable
        style={[styles.button, styles.orangeBG]}
        onPress={onPress}>
        <Text style={styles.textStyle}>Cadastrar</Text>
      </Pressable>

  </View>

  )
}

const styles = StyleSheet.create({
   
  image: {
    width: '100%',
    height: 150,
    objectFit:'fill'
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  orangeBG: {
    backgroundColor: '#ea580c',
  },
  greyBG: {
    backgroundColor: '#64748b',
  },

});
