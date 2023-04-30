import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsScreen from '../Products/ProductsScreen'


const Stack = createStackNavigator()

const MyStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={ProductsScreen} 
        options={{
            headerShown: false
        }}
        />

       
    </Stack.Navigator>
  )
}

export default function HomeNavigator(){
    return <MyStack />
}