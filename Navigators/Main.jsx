import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import { AntDesign, Entypo  } from '@expo/vector-icons';
import ProductsScreen from '../Products/ProductsScreen';

const Stack = createStackNavigator()
export default function App() {
  return (
  
    <NavigationContainer>
      
      <Stack.Navigator >
      <Stack.Screen 
      options={{
        title:"My Shop",
        headerRight:()=>(<AntDesign name="earth" style={{marginRight:10}} size={24} color="black" />),
        headerLeft:()=>(  <Entypo name="aircraft" style={{marginLeft:10}} size={24} color="black" />),
        headerStyle:{
          backgroundColor:"#0ce846"
        },
        headerTintColor:"white",
        headerTitleAlign:"center"
      }} 
       name='Home' component={ProductsScreen} />
        {/* <Stack.Screen name='AddToCart' component={AddToCartScreen} />
       
        <Stack.Screen name='PaymentSuccessful' component={PaymentSuccessfulScreen} /> */}

       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//    top:60,
//    marginHorizontal:10
//   },
// });
