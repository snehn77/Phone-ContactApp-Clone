import React,{ useState,useEffect} from 'react'
import { View, Text, StyleSheet,TextInput,Button,AsyncStorage, TouchableOpacity , Image ,Switch} from 'react-native';


export default function UpdateContact({navigation,route}){
  const [name,setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [landline,setLandline] = useState('');
  const [favoriteContact,setFavoriteContact]=useState(false);
  const favouriteTracker=()=>{
    setFavoriteContact(!favoriteContact); 
  }

  const updateContact=async()=>{
        try{
            await AsyncStorage.getItem("contactList").then(value=>{                
                    const contact = JSON.parse(value);
                    contact.forEach(person => {
                        if (person.ContactID === route.params.contactDetails.ContactID){
                          person.name=name;person.mobile=mobile,person.landline=landline,person.favoriteContact=favoriteContact
                        }
                      });
                      AsyncStorage.setItem("contactList",JSON.stringify(contact)).then(()=>
                    {
                      navigation.navigate("ContactsList")
                    });
            })
        }
        catch(error){
            console.log(error)
        }
    }

    const deleteContact=async()=>{
        try{
            await AsyncStorage.getItem("contactList").then(value=>{
                    let contact = JSON.parse(value);
                    contact=contact.filter((item)=> item.ContactID!=route.params.contactDetails.ContactID).map(({ContactID,favoriteContact,landline,mobile,name})=>({ContactID,favoriteContact,landline,mobile,name}))
                      AsyncStorage.setItem("contactList",JSON.stringify(contact)).then(()=>
                    {
                      navigation.navigate("ContactsList")
                    });
            })
        }catch(error){
            console.log(error)
        }
    }

    async function GetContactDetails(ContactID){
        try{
            await AsyncStorage.getItem("contactList").then(value=>{
                if (value!==null){
                    const contacts = JSON.parse(value);
                    let user;
                    contacts.filter(contact=>contact.ContactID === ContactID).map(contact=>user=contact)  
                    setName(user.name)
                    setMobile(user.mobile)
                    setLandline(user.landline)
                    setFavoriteContact(user.favoriteContact)                  
                }
            })                        
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        GetContactDetails(route.params.contactDetails.ContactID)        
    },[])
  
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
                 <Switch onValueChange={favouriteTracker} 
                         value={favoriteContact}
                         trackColor = {{true:'grey' , false:'white'}}
                         thumbColor ='coral'></Switch>               
            </View>
          </View>
        <View style={styles.options}>
          <Button title='Update' onPress={()=>updateContact()} />
          <Button color="tomato" title="Delete" onPress={()=>deleteContact()}  />
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
      margin:10,
      padding:10,
      backgroundColor:'#e6ecf0',
  } ,
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

  },
  input:{
    fontSize: 20,
    marginBottom: 12,
    backgroundColor:'white',
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
  options:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:30,
    height:40,
  }
});

