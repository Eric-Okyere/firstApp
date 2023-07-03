import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign, Entypo, SimpleLineIcons, } from "@expo/vector-icons";
import CamButt from './CamButt';
import {
    Text,TextInput,SafeAreaView,StyleSheet,FlatList,TouchableOpacity,KeyboardAvoidingView,Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"
import {
    Pressable,CheckIcon,Select,Box,View,Heading,Image,VStack,Item,Input,Button,Center, Stack,
} from "native-base";

import * as ImagePicker from "expo-image-picker"
// import * as Permissions from "expo-permissions"
import { ScrollView } from "react-native";

function Register({ navigation }) {
    const [hasCamPerm, setHasCamPerm] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null)


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
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        (async () => {
            MediaLibrary.requestPermissionsAsync()
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCamPerm(cameraStatus.status === "granted");
        })();

 // categories reuest
 fetch("http://192.168.43.94:3000/categories")
 .then(res => res.json())
 .then(results => {
   setCategories(results)
   // setproductCtg(results)
   console.log(results)
 })


    },[])







const takePic = async () => {
    if (cameraRef) {
        try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data)
            setImage(data.uri)
            let newfile = {
                uri: data.uri,
                type: `test/${data.uri.split(".")[1]}`,
                name: `test.${data.uri.split(".")[1]}`
            }
            handleUpload(newfile)
        } catch (error) {
            console.log(error)
        }
    }
}

if (hasCamPerm === false) {
    return <Text>You denied the permission</Text>
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

  fetch("http://192.168.43.94:3000/send", {
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
      {/* <Box
        w="full"
        h="full"
        position="absolute"

        px="6"
        // justifyContent="center"
      > */}
        {/* <Center>
          <Heading style={{ marginTop: 30 }}>Sell agriculture only</Heading>
        </Center> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 40 }}
        >

          <VStack space={5} 
        //   pt="6"
        //    mt={10}
           >
            <KeyboardAvoidingView behavior="position">
            {!image?
        
        <Camera style={{ height:720,  }}
                        type={type}
                        flashMode={flash}
                        ref={cameraRef}
                    >
                <View style={{ left: 140, top: 55 }}>
                {/* flash light */}
                            <CamButt icon='flash'   
                             onPress={() => {
                                setFlash(
                                    flash === Camera.Constants.FlashMode.off
                                        ? Camera.Constants.FlashMode.on
                                        : Camera.Constants.FlashMode.off
                                )
                            }} 
                            />
                        </View>

                       {/* <Text>take</Text> */}
                    </Camera>
                    :

        <Image style={{ width: 200, height: 200, alignSelf: "center", top: 90, borderRadius: 180 }}
                    source={{ uri: image }}
                    alt=''
                />
                    }
       
       <View>
                    {image ?
                        <View
                            style={{
                                padding: 50,
                                bottom: 110,
                                right: 70
                            }}
                        >
                            <View style={{ left:190, top:30 }}>
                                <CamButt title={"Retake"} icon="retweet" onPress={() => setImage(null)} />
                            </View>
                            {/* <CamButt title={"Save"} icon="check" onPress={saveImage} /> */}
                            <View style={{ left: 68 }} >
  
               
                <Stack space={3} style={{top:110}}>
          
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

      {/* Fetch categories */}
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

            <Pressable
                                bg="black" h={12}
                                style={{
                                     borderRadius: 30, 
                                    alignItems: "center",
                                    top:-5,
                                marginBottom:50,
                                // marginBottom:150
                                }}
                                onPress={handleSubmit}
                            >
                                <Text style={{
                                    color: "white", fontWeight: "bold", fontSize: 20,
                                    top: 12, 
                                }} >SELL</Text>
                            </Pressable>
                          
                              
            </Stack>
                 
      
                {/* <Center>
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
                </Center> */}


                {/* <TouchableOpacity

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
                </TouchableOpacity> */}
                
                            </View>
                

{/* 
                            <Center style={{ left: 70 }} >
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
                            </Center> */}

                           
                        </View>
                   
                        :
                        <View style={{ bottom: 100 }} >
                            <CamButt
                                // title={"Take"}
                                icon="camera" onPress={takePic} />
                        </View>
                    }

                </View>
            </KeyboardAvoidingView>
          </VStack>
        </ScrollView>
      {/* </Box> */}
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
