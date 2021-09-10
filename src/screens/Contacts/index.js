import React, {useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, AsyncStorage , Image  } from 'react-native';
import { List , FAB } from 'react-native-paper';

export default function Contacts({navigation}){
    const [contactList,setContactList]=useState([]);

    async function getAllContacts(){
        try{
            await AsyncStorage.getItem("contactList").then(value=>{
                if (value!==null){
                    const contacts=JSON.parse(value);
                    setContactList(contacts)                    
                }
            })                        
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllContacts()
    })
    return (
        <View style={styles.container}>
            <View style={styles.list}>
               <FlatList data={contactList}
                     renderItem={({item})=>(  
                       <List.Item title={item.name}
                                  titleStyle={{fontSize:18,color:'white'}}
                                  onPress={()=> navigation.navigate('UpdateContact',{contactDetails:{ContactID:item.ContactID}})}
                                  style={styles.Box}
                       />
                     )}
                        keyExtractor = {item =>item.ContactID}
                     />
            </View> 
             <View style={styles.buttonContainer}>
                 <FAB style={styles.button}
                      icon = "plus"
                      onPress={()=> navigation.navigate('AddContact')}>    
                 </FAB>
             </View>
        </View>
        )
}


const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        bottom:15,
        alignSelf: 'flex-end',
        paddingRight:20,
        borderColor:'red',
        borderRadius:10
    },
    container:{
      flexDirection:'column',
      flex: 1,
      backgroundColor:'#1f2833'
    },
    text:{
        margin:10,
        padding:10,
        fontSize:20
    },
    Box:{
      borderBottomColor:'#e6ecf0',
      borderBottomWidth:1,
    },
    list:{
      flex:10
    },
    buttonContainer:{
      paddingTop:20,
      flex:0.3
    },
    button:{
        position:"absolute",
        right:15,
        bottom:10,
        backgroundColor:'coral'

    }
  });
  