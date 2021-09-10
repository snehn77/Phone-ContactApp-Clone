import React from 'react';
import { createDrawerNavigator, getIsDrawerOpenFromState } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import FavouriteNavigator from './FavouriteContacts';

export default function DrawerNavigator(){


    const Drawer = createDrawerNavigator();

    const getDrawer = navigation => {
        navigation.openDrawer();
    }
    return (
        <Drawer.Navigator drawerType='slide' >
            <Drawer.Screen name={'Contacts'} component={HomeNavigator}></Drawer.Screen>
            <Drawer.Screen name={'Favourites'} component={FavouriteNavigator}></Drawer.Screen>
        </Drawer.Navigator>
      );
}


