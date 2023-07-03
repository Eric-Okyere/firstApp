import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { Center } from 'native-base';

const CamButt = ({ onPress, title, icon, setImage }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <Center >
                <View>
                    <Entypo title={title} name={icon} size={35} color="white" />
                    <Text>{title}</Text>
                </View>
            </Center>
        </TouchableOpacity>
    )
}

export default CamButt

const styles = StyleSheet.create({})