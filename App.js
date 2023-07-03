import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 import {NavigationContainer} from "@react-navigation/native"
import ButtonNav from "./Navigations/ButtonNav"
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
// import store from './Redux/store/Store';
import store from "./src/Redux/store"
import Toast  from 'react-native-toast-message';
// import Auth from './context/store/Auth';

export default function App() {
  return (
   
 <Provider store={store} >
     <NativeBaseProvider  >
     <NavigationContainer>
      <View style={{flex:1, backgroundColor:'black'}} >
      <ButtonNav />
      {/* <Toast  ref={(ref)=> Toast.setRef(ref)} /> */}
      </View>
      </NavigationContainer>
       </NativeBaseProvider>
       </Provider>
    
   
    
   
  );
}
