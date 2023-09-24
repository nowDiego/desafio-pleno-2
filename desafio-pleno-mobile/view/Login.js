import { useState } from 'react';
import { StyleSheet, Text, View , TextInput,TouchableOpacity,Pressable,ToastAndroid } from 'react-native';
import { login } from '../services/loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');


  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }


  async function onPress() {
  
    try {

      const data = new FormData();
      data.append('username', userName);
      data.append('password', userPassword);

      const response = await login(data);            

        if (response.data.status) {
      
           AsyncStorage.setItem('_token', response.data.access_token);   
           navigation.navigate('Dashboard')
        }
        else {
          
       showToast(response.data.message)
          
        }
          

    } catch (error) {


    }
    
  }



  return (
    <View style={styles.container}>
     
     <View style={styles.formContent}>
     
     <Text style={styles.formTitle}>Entrar</Text> 
      <TextInput
          style={styles.textInputStyle}
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
          placeholder={'Usuário'}
        />

      <TextInput
          style={styles.textInputStyle}
          value={userPassword}
          onChangeText={(userPassword) => setUserPassword(userPassword)}
          placeholder={'Senha'}
          secureTextEntry={true}
        />


<TouchableOpacity style={[styles.btn,styles.btnOpen]} onPress={onPress}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

<View style={styles.contentSignup}>
<Text style={styles.signupText} >Não tem conta?</Text>
<Pressable
       onPress={() => navigation.navigate('Signup')}
       >
       <Text style={styles.btnSignupText}>Inscreva-se</Text>
     </Pressable>
</View>
     

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

  contentSignup:{
    display:'flex',   
    justifyContent:'center',
    alignItems:'center'
  },

  textInputStyle:{
    backgroundColor:'white',
    color:'black',
    margin:10,
    width:180,
    height:30,
    padding:2,
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
  btnSignupText:{
    color:'#f8716b',
    fontWeight: 'bold',
    fontSize:16
  },
  signupText:{
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:16

  }


});
