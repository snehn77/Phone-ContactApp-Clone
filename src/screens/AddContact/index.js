import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput,AsyncStorage,TouchableOpacity , Image , Switch } from 'react-native';
import { color } from 'react-native-reanimated';

export default function AddContact({navigation}){

  const [name,setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [landline,setLandline] = useState('');
  const [favoriteContact,setFavoriteContact]=useState(false);

  const favouriteTracker=()=>{
    setFavoriteContact(!favoriteContact); 
  }

const generateID = () => {
    return Math.random().toString().substr(2, 9);
  }

const addNewContact= async()=>{
    const contactList=[];

    const contactDetails ={
        name:name,
        mobile: mobile,
        landline:landline,
        favoriteContact:favoriteContact,
        ContactID:generateID()
        
    }
    contactList.push(contactDetails);
    try{
        await AsyncStorage.getItem("contactList").then(value=>{
            if (value!==null){
                const contact = JSON.parse(value);
                contact.push(contactDetails);
                AsyncStorage.setItem("contactList",JSON.stringify(contact)).then(()=>
                {
                  navigation.navigate("ContactsList")
                });
            } else{
                 AsyncStorage.setItem("contactList",JSON.stringify(contactList)).then(()=>
                {
                    navigation.navigate("ContactsList")
                })

            }
        })
        
    }
    catch(error){
        console.log(error)
    }
} 

return (
    <View style={styles.container}>   
            <Image width={150}
                   height={150}
                   source={require('../../../assets/default.png')}
                   style={styles.imageView}
           />      

           <View style={styles.form}>             
           <TextInput placeholder="Name" value={name} mode="outlined" 
                    onChangeText={setName}
                    style={styles.input} 
                />
              
            <TextInput style={styles.input}
                placeholder='Mobile'
                keyboardType='numeric'
                value={mobile}
                onChangeText={setMobile}
               
            />
            <TextInput style={styles.input}
                placeholder='Landline'
                keyboardType='numeric'
                value={landline}
                onChangeText={setLandline}  
            /> 
            <View style={styles.fav}>
            <Text style={{color:'white'}}>Favourite</Text>   
                 <Switch onValueChange={favouriteTracker} value={favoriteContact}
                         trackColor = {{true:'grey' , false:'white'}}
                         thumbColor ='coral'></Switch>               
            </View>
            <Button color='coral' title='Save' onPress={()=>addNewContact()} />
           </View>
    </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor:'#1f2833'
  }, 
  input:{
    fontSize: 20,
    marginBottom: 12,
    backgroundColor:'#e6ecf0',
    paddingLeft:10,
    paddingTop:20,
  },
  fav:{
    flexDirection:'row',
    marginTop:15,
    marginBottom:20
  },
  form:{
    marginTop:50
  },
  imageView:{
    width: 150,
    height: 150,
    borderRadius: 200,
    borderColor:'red',
    alignSelf: 'center',
    top:10,
  },
  chooseText:{
    color: 'blue',
    alignSelf: 'center',
    top:10

  }
});


