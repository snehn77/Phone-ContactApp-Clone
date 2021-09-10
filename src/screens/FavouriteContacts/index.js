import React, {useState, useEffect,useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { List} from 'react-native-paper';


export default function FavouriteContact(){

  const [Contacts,setContacts]=useState([]);

  async function getFavContacts(){
        try{
            await AsyncStorage.getItem("contactList").then(value=>{
                if (value!==null){
                    const contacts=JSON.parse(value);
                    const person=[];
                    contacts.filter(contact=>contact.favoriteContact).map(contact=>person.push(contact)) 
                    setContacts(person)          
                }
            })
                        
        }
        catch(error){
            console.log(error);
        }
    }

    const isFocused= useIsFocused();

    useEffect(()=>{
      getFavContacts()
    },[isFocused])

  return (
    <View style={styles.container}>
       <View style={styles.list}>
               <FlatList data={Contacts}
                     renderItem={({item})=>(
                       <List.Item title={item.name}
                                  titleStyle={{fontSize:18,color:'white'}}
                                  style={styles.Box}
                       />
                     )}
                        keyExtractor = {item =>item.ContactID}
                     />
            </View>  
    </View>
    )
}

const styles=StyleSheet.create({
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
  list:{
    flex:10
  },
  Box:{
    borderBottomColor:'#e6ecf0',
    borderBottomWidth:2
  }

})