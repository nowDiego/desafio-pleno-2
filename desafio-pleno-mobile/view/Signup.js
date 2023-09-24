import { useState } from 'react';
import { StyleSheet, Text, View , TextInput,TouchableOpacity,ToastAndroid } from 'react-native';
import { create } from '../services/signupService';
import { validate } from '../validation/FormSignupValidation';


export default function Signup() {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formErrors, setFormErrors] = useState({});

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

 
  async function onPress() {
  
    try {
      
      let values = {
        "name": name,
        "email": email,
        "password": password ,      
      }
     
      let validation = validate(values);
      setFormErrors(validation);


      if (Object.keys(validation).length === 0) {

       
        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('password', password);

        const response = await create(data)

        if (response.data.status) {
          showToast(response.data.message) 
          clearField();
        }
        else {

          showToast(response.data.message)  
          
        }

      }
          
    } catch (error) {


    }
    
  }


  function clearField() {

    setName('');
    setEmail('');
    setPassword('');

  }



 
  return (
    <View style={styles.container}>
     
     <View style={styles.formContent}>
    
     <Text style={styles.formTitle}>Cadastrar</Text> 
   
     <TextInput
         style={styles.textInputStyle}
          value={name}
          onChangeText={(name) => setName(name)}
          placeholder={'Usuário'}
        />
 {formErrors.name ?
        <Text>{formErrors.name}</Text>
        :
        null
      }

      <TextInput
         style={styles.textInputStyle}
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder={'Email'}
        />

{formErrors.email ?
        <Text>{formErrors.email}</Text>
        :
        null
      }

      <TextInput
         style={styles.textInputStyle}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={'Senha'}
          secureTextEntry={true}
        />

{formErrors.password ?
        <Text>{formErrors.password}</Text>
        :
        null
      }

<TouchableOpacity style={[styles.btn,styles.btnOpen]} onPress={onPress}>
        <Text style={styles.btnText}>Cadastrar</Text>
     </TouchableOpacity>


     </View>

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%'
  },

  formContent:{
    display:'flex',
    flexDirection:'column',
    backgroundColor: '#57534e',
    alignItems: 'center',
    justifyContent: 'center',
    width:250,
    height:300,
  },
  formTitle:{
    color:'#fff',
    fontSize:16,
    fontWeight: 'bold',
  },

  btn: {
    padding: 10,
    elevation: 2,
    margin:2,
    width:180,
  },
  btnOpen: {
    backgroundColor: '#dc2626',
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  
  textInputStyle:{
    backgroundColor:'white',
    color:'black',
    margin:10,
    width:180,
    height:30,
    padding:2,
  },

});
