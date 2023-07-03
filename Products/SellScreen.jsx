import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign, Entypo, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker"
import {
  Text,
  // select,
  TextInput,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  CheckIcon,
  Select,
  Box,
  View,

  Heading,
  Image,
  VStack,
  Item,
  Input,
  Button,
  Center,
  Stack,
} from "native-base";
import { Toast } from "react-native-toast-message";
import Error from "../User/Error";
import * as ImagePicker from "expo-image-picker"
// import * as Permissions from "expo-permissions"
import { ScrollView } from "react-native";
import axios from "axios";
import baseURL from "../assets/common/BaseUrl";
import mime from "mime"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/authFirebase";
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"
import Add from './Add';

function Register({ navigation }) {
 


 const LibraryOptions=()=> {

    if (Platform.OS === "ios") {
      navigation.navigate("libios")
    } else{
   
    navigation.navigate("library")
    }
 }






  return (
    <Box bg="#09e034" flex={1}>
      <Box
        w="full"
        h="full"
        position="absolute"

        px="6"
        justifyContent="center"
      >
        <Center>
          <Heading style={{ marginTop: 100 }}>Sell agriculture only</Heading>
        </Center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 40 }}
        >

          <VStack space={5} pt="96" mt={10}>
            <KeyboardAvoidingView behavior="position">
              <Stack space={3} style={{flexDirection:"row", justifyContent:"space-between"}} >
              

            <Add />
            <Center >
                <TouchableOpacity onPress={LibraryOptions}>
                    <MaterialIcons name="photo-library"
                        // style={{ top: -30, left: 145, }}
                        size={54} color="black" />
                </TouchableOpacity>
            </Center>
              </Stack>
            </KeyboardAvoidingView>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  imagecont: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "black",
    elevation: 10,
    left: 50,
    bottom: 10,
    marginBottom: 10
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    top: 0
  },
  imagePicker: {
    position: "absolute",
    right: 1,
    bottom: 5,
    borderColor: "grey",
    padding: 8,
    borderRadius: 100,
    backgroundColor: "yellow",
    elevation: 20,
  },
  camera: {
    position: "absolute",
    right: 130,
    bottom: 5,
    borderColor: "grey",
    padding: 8,
    borderRadius: 100,
    backgroundColor: "yellow",
    elevation: 20,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Register;
