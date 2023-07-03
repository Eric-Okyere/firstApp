import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Product from '../Admin/Product'
import Categories from '../Admin/Categories'
import { createStackNavigator } from '@react-navigation/stack'
import ProdForm from '../Admin/ProdForm'



const Stack = createStackNavigator();


const AdminNavigator = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='adminProducts' component={Product} />
    <Stack.Screen name='adminCategories' component={Categories} />
    <Stack.Screen name='adminForm' component={ProdForm} />
   </Stack.Navigator>
  )
}

export default AdminNavigator

const styles = StyleSheet.create({})