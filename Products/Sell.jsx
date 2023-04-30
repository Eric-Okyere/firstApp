import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
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




function Register({ navigation }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [pickerValue, setPickerValue] = useState();
  const [error, setError] = useState();
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [categories, setCategories] = useState([]);






  useEffect(() => {

    // fetch categories
    fetch("http://192.168.43.189:3000/categories")
      .then(res => res.json())
      .then(results => {
        setCategories(results)
        // setproductCtg(results)
        console.log(results)
      })



  }, [])







  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    })

    if (!result.canceled) {
      let newfile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`
      }
      handleUpload(newfile)
    } else {
      alert('You did not select any image.');
    }

  }


  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    })

    if (!result.canceled) {
      let newfile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test/${result.uri.split(".")[1]}`
      }
      handleUpload(newfile)
    }

  }

  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'PalmfarmApp')
    data.append('cloud_name', 'dfm5lszdo')

    fetch('https://api.cloudinary.com/v1_1/dfm5lszdo/image/upload', {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setPicture(result.url)
      })
  }





  const handleSubmit = async () => {

    fetch("http://192.168.43.189:3000/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picture,
        name,
        phone,
        price,
        description,
        location,
        region,
        town,
        category
      }),
    }).then(res => res.json())
      .then(result => {
        // console.log(result)
      })
    setPicture("")
    setName("")
    setPrice("")
    setDescription("")
    setLocation("")
    setPhone("")
    setRegion("")
    setTown("")
    setPickerValue("")
    navigation.navigate("main")
  };




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
          <Heading style={{ marginTop: 30 }}>Sell agriculture only</Heading>
        </Center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 40 }}
        >

          <VStack space={5} pt="6" mt={10}>
            <KeyboardAvoidingView behavior="position">
              <Stack space={3}>
                <View style={styles.imagecont}>
                  <Image
                    style={styles.image}
                    source={{ uri: picture }}
                    alt=""
                  />



                  <TouchableOpacity style={styles.imagePicker} onPress={pickImage} >
                    <Entypo name="image" size={24} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.camera}
                    onPress={openCamera}
                  >
                    <SimpleLineIcons name="camera" size={24} color="black" />
                  </TouchableOpacity>


                </View>



                <Input
                  size="lg"
                  variant="rounded"
                  id="name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholder="Enter name of the product"
                  style={{ color: "black" }}
                />
                <Input
                  keyboardType='numeric'
                  size="lg"
                  variant="rounded"
                  id="phone"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  placeholder="EnterPhone number"
                  type="text"
                  style={{ color: "black" }}
                />

                <Input
                  // pl="full"
                  keyboardType='numeric'
                  size="lg"
                  variant="rounded"
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                  placeholder="Enter Price"
                  type="number"
                  id="price"
                  style={{ color: "black" }}
                />

                <Input
                  // pl="full"
                  size="lg"
                  variant="rounded"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  placeholder="Description"
                  type="text"
                  id="description"
                  style={{ color: "black" }}
                />

                <Input
                  // pl="full"
                  size="lg"
                  variant="rounded"
                  value={region}
                  onChangeText={(text) => setRegion(text)}
                  placeholder="Add your region"
                  type="text"
                  id="description"
                  style={{ color: "black" }}
                />

                <Input
                  // pl="full"
                  size="lg"
                  variant="rounded"
                  value={town}
                  onChangeText={(text) => setTown(text)}
                  placeholder="Add your town"
                  type="text"
                  id="description"
                  style={{ color: "black" }}
                />

                <Input
                  // pl="full"
                  size="lg"
                  variant="rounded"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  placeholder="Add where you live"
                  type="text"
                  id="description"
                  style={{ color: "black" }}
                />


                <Center>
                  <Box maxW="300">
                    <Select selectedValue={pickerValue} minWidth="200" accessibilityLabel="Choose Category" placeholder="Choose Category" _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={(e) => [setPickerValue(e), setCategory(e)]}>

                      {categories.map((item) => {
                        return <Select.Item key={item._id} label={item.name} value={item._id} />
                      })}

                    </Select>
                  </Box>
                </Center>


                <TouchableOpacity

                  style={{
                    top: 5, borderRadius: 30, backgroundColor: "black",
                    alignItems: "center", justifyContent: "center",
                    width: "40%", height: 40
                  }}

                  onPress={handleSubmit}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>
                    <AntDesign name="pluscircle" color="#09e034" size={26} />
                  </Text>
                </TouchableOpacity>
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
