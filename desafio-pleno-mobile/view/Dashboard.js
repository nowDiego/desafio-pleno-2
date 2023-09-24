import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './Feed'
import PostScreen from './Post'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen}         
        options={{
    headerShown: false,
    showIcon:true,
    tabBarIcon: ({ tintColor }) => (
      <Entypo name="home" size={24} color="black" />
    ),
    
  }} />
        <Tab.Screen name="Post" component={PostScreen} options={{
    headerShown: false,
    showIcon:true,
    tabBarIcon: ({ tintColor }) => (
<Ionicons name="add-circle-outline" size={24} color="black" />
    ),
   
  }}/>

<Tab.Screen name="Sair" component={Logout} options={{
    headerShown: false,
    showIcon:true,
    tabBarIcon: ({ tintColor }) => (
<AntDesign name="logout" size={24} color="black" /> 
   ),
  }}/>

      </Tab.Navigator>
    );
  }


  function Logout({navigation}){

    useEffect(()=>{
      AsyncStorage.removeItem('_token');    
      navigation.navigate('Login')
    },[])
    
      return(
        <>
        </>
      )
  }



export default function Dashboard(){

return(  
    <MyTabs /> 
)
    
}

