import {  View ,Text,Image , StyleSheet } from 'react-native';

export default function PostDetail({post}){

    const $base_url = "http://192.168.1.104:8000/storage/" 

    return (
        <View >
        <Text >{post.title}</Text>
        <Text >{post.content}</Text>   
        <Image
        style={styles.image}
        source={{
          uri: `${$base_url}${post.photo}`,
  
        }}
      />
        </View> 
    )

}


const styles = StyleSheet.create({
 
    image: {
        width: 150,
        height: 150,
      },
    
  });
  