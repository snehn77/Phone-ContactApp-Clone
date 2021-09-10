import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from '../screens/Contacts';
import AddContact from '../screens/AddContact';
import UpdateContact from '../screens/UpdateContact';
import Header from '../../shared/header';
export default function HomeNavigator(){

    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator initialRouteName="ContactsList">
            <HomeStack.Screen name={'ContactsList'} component={Contacts} options={({navigation})=> {
                return(
                    {headerTitle:() => <Header navigation={navigation} title='Contacts'/> , headerStyle:{backgroundColor:'coral' }}
                )
            }}>                
            </HomeStack.Screen>
            <HomeStack.Screen name={'AddContact'} component={AddContact} options={{headerTitle:'Add New Contact' , headerTitleStyle:{paddingLeft:45} , headerStyle:{backgroundColor:'coral' }}}></HomeStack.Screen>
            <HomeStack.Screen name= {'UpdateContact'} component={UpdateContact} options={{headerTitle:'Edit Contact' , headerTitleStyle:{paddingLeft:70} , headerStyle:{backgroundColor:'coral' }}}></HomeStack.Screen>
        </HomeStack.Navigator>
      );
}


  
