import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Todo from './Todo'

export default function Todo_List() {
    const [title, setTitle] = useState('TodoList')
    const [text, setText] = useState()
    const [list, setList] = useState(['hello world'])


    const addItem=() =>{
        const updatedList = list
        updatedList.push(text)
        setList(updatedList)
        setText('')
    }


    const deleteItem = (index)=>{
        const updatedList = list.filter((todo)=>todo !==index)
        setList(updatedList)
    }





  return (
    <View style={{width:"80%", marginBottom:60}} >
      <Text style={{alignSelf:"center", fontSize:20, fontWeight:"bold", fontStyle:"italic"}} >{title}</Text>
      <ScrollView>
   {list.map((x, index)=><Todo key={index} item={x} index={index} delete={deleteItem} />)}
      </ScrollView>
      
      <View>
        <TextInput style={{borderRadius:5, borderWidth:1, padding:8, marginVertical:20}}
        value={text}
        onChangeText={(text)=>setText(text)}
        />
      <Button title='Add item' onPress={addItem} />
      </View>
    </View>
  )
}

