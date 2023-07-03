import { View, Text } from 'native-base'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { Center } from 'native-base'

const Profile = () => {
  return (
    <View bg="#34eb40" style={{ justifyContent: "center", alignItems: "center", flex: 1 }} >
      <Center>
        <EvilIcons name="user" size={94} color="black" />
        <Text italic>Username:Eric Okyere</Text>
        <Text italic>Email:ericokyere018@gmail.com</Text>
      </Center>
    </View>
  )
}

export default Profile
