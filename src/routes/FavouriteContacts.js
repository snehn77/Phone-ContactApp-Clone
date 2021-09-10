import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavouriteContacts from '../screens/FavouriteContacts';
import Header from '../../shared/header';


export default function FavouriteNavigator(){

    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator initialRouteName="Favourites">
            <HomeStack.Screen name={'Favourites'} component={FavouriteContacts} options={({navigation})=> {
                return(
                    {headerTitle:() => <Header navigation={navigation} title='Favourite Contacts'/> , headerStyle:{backgroundColor:'coral'}}
                )
            }}>                
            </HomeStack.Screen>
        </HomeStack.Navigator>
      );
}
