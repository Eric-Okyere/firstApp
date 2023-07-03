import { View, Text,StyleSheet, Button } from 'react-native'
import React from 'react'

const Todo = (props) => {
  return (
    <View style={styles.item} >
      <Text>{props.item}</Text>
      <Button title={'Delete'}  color={'red'} 
      onPress={()=>props.delete(props.item)}
      />
    </View>
  )
}

export default Todo

const styles = StyleSheet.create({
    item:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderColor:"gray",
        borderWidth:1,
        borderRadius:5,
        margin: 8,
        padding:8,
        backgroundColor:"whitesmoke"
    }
})