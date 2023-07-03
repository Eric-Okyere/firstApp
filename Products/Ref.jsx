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



const AddCam = ({navigation}) => {
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


    useEffect(()=>{
        (async () => {
            MediaLibrary.requestPermissionsAsync()
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCamPerm(cameraStatus.status === "granted");
        })();
    },[])



const PickFromGallery = async()=>{
    const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)    

if(granted){
    let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect:[1,1],
        quality: 0.5
    })
    console.log(data)
} else{
    Alert.alert("You need to give up permission")
}
}



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


  return (
    <View style={Mystyle.cont} >
      
        {!image?
        
        <Camera style={{ height:770 }}
                        type={type}
                        flashMode={flash}
                        ref={cameraRef}
                    >
                <View style={{ left: 150, top: 95 }}>
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
                            <View style={{ right: 17, top:90 }}>
                                <CamButt title={"Retake"} icon="retweet" onPress={() => setImage(null)} />
                            </View>
                            {/* <CamButt title={"Save"} icon="check" onPress={saveImage} /> */}
                            <View style={{ left: 68 }} >
  
               
                <Stack space={3} style={{top:110}}>
                <KeyboardAvoidingView behavior="position"> 
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
</KeyboardAvoidingView> 

            <Pressable
                                bg="#09e034" h={12}
                                style={{
                                     borderRadius: 30, 
                                    alignItems: "center",
                                    top:-5,
                                marginBottom:50,
                                // marginBottom:150
                                }}
                                // onPress={handleSubmit}
                            >
                                <Text style={{
                                    color: "white", fontWeight: "bold", fontSize: 20,
                                    top: 8, 
                                }} >Register</Text>
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
                        <View style={{ bottom: 70 }} >
                            <CamButt
                                // title={"Take"}
                                icon="camera" onPress={takePic} />
                        </View>
                    }

                </View>
              
             
    </View>
  )
}

export default AddCam

const Mystyle = StyleSheet.create({
    cont:{
        flex:1,
        justifyContent:"center",
        // padding:8
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: "#07ed6b",
        height: 50,
        fontSize: 17,
    }
})


































const handleSubmit = () => {
    if (name === "" || description === "" || brand === "" || price === "") {
        setError("Please fill in your credentials");
    }
    let formData = new formData()
    const newImageUri = "file:///" + image.split("file:/").join("")
    formData.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop()
    })
    formData.append("name", name)
    formData.append("price", price)
    formData.append("rating", rating)
    formData.append("richDescription", richDescription)
    formData.append("brand", brand)
    formData.append("description", description)
    formData.append("numReviews", numReviews)
    formData.append("isFeatured", isFeatured)
    formData.append("countInStock", countInStock)

    axios.post(`${baseURL}products`, formData)
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Thanks for registering with us",
                    text2: "Please fell free to login",
                });

                setTimeout(() => {
                    navigation.navigate("main");
                }, 500);
            }
        })
        .catch((error) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something is wrong",
                text2: "Please try again",
            });
        });
};








import {
    ScrollView,
    StyleSheet,
    View,
    ActivityIndicator,
    Button,
    FlatList,
    TouchableOpacity,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import data from "../Data/Data";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import {
    Flex,
    Pressable,
    Image,
    Box,
    Text,
    Heading,
    Input,
    Icon,
    HStack,
    Center,
    VStack,
} from "native-base";
import SearchProducts from "./SearchProducts";
import productCategory from "../Data/Category";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as actions from "../Redux/actions/cartActions";
import baseURL from "../assets/common/BaseUrl";
import axios from "axios";

const ProductsScreen = (props) => {
    const [products, setProducts] = useState([]);
    const [productFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [input, setInput] = useState();
    const [categories, setCategories] = useState([]);
    const [productCtg, setproductCtg] = useState([]);
    const [active, setActive] = useState();
    const [InitialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    // useFocusEffect(
    //   useCallback(() => {
    //     setFocus(false);
    //     // setCategories(productCategory)
    //     setActive(-1);

    //     axios.get(`http://localhost:3000/api/v1/products`).then((res) => {
    //       setProducts(res.data);
    //       setProductsFiltered(res.data);
    //       setproductCtg(res.data);
    //       setInitialState(res.data);
    //       setLoading(false);
    //     });

    //     axios
    //       .get('http://localhost:3000/api/v1/products')
    //       .then((res) => {
    //         setCategories(res.data);
    //       })
    //       .catch((error) => {
    //         console.log("Api call error");
    //       });

    //     return () => {
    //       setProducts([]);
    //       setProductsFiltered([]);
    //       setFocus();
    //       setCategories([]);
    //       setActive();
    //       setInitialState();
    //       setproductCtg();
    //     };
    //   }, [])
    // );

    useEffect(() => {

        setFocus(false)
        // setCategories(productCategory)
        setActive(-1)

        axios.get(`${baseURL}`)
            .then((res) => {
                setProducts(res.data);
                setProductsFiltered(res.data);
                setproductCtg(res.data);
                setInitialState(res.data)
            })

        axios.get(`${baseURL}`)
            .then((res) => {
                setCategories(res.data)
            }).catch((error) => {
                console.log('Api call error')
            })

        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
            setCategories([])
            setActive()
            setInitialState()
            setproductCtg()
        }
    }, [])

    const searchProducts = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        // setInput("")
        setFocus(false);
    };

    const changeCtg = (ctg) => {
        {
            ctg === "all"
                ? [setproductCtg(InitialState), setActive(true)]
                : [
                    setproductCtg(
                        products.filter((i) => i.category_id === ctg),
                        setActive(true)
                    ),
                ];
        }
    };

    return (
        <>
            {loading == false ? (
                <VStack style={{ backgroundColor: "gray" }}>
                    <HStack
                        style={{ backgroundColor: "black", height: 100 }}
                        marginTop={8}
                        alignItems="center"
                        w="full"
                        px={6}
                        safeAreaTop
                    >
                        <Image
                            style={{ width: 55, left: -10, height: 62, marginTop: -25 }}
                            rounded={10}
                            //  resizeMode='contain'
                            source={require("../assets/Gye.jpg")}
                            alt=""
                        />

                        {/* Search */}
                        <View
                            style={{
                                borderRadius: 40,
                                backgroundColor: "white",
                                flexDirection: "row",
                                width: "85%",
                                justifyContent: "space-between",
                                marginTop: -20,
                            }}
                        >
                            <Input
                                onFocus={openList}
                                onChangeText={(text) => searchProducts(text)}
                                value={input}
                                placeholder="Cassava, Pepper, Onion"
                                w="75%"
                                type="search"
                                h={12}
                                borderWidth={0}
                                InputLeftElement={
                                    <AntDesign
                                        style={{ left: 8 }}
                                        name="search1"
                                        size={24}
                                        color="black"
                                    />
                                }
                                size="lg"
                                variant="rounded"
                                _focus={{
                                    bg: "white",
                                }}
                            />
                            {focus == true ? (
                                <AntDesign
                                    name="closecircleo"
                                    size={24}
                                    onPress={onBlur}
                                    color="black"
                                    style={{ marginTop: 12, left: -10 }}
                                />
                            ) : null}
                        </View>
                    </HStack>

                    {focus == true ? (
                        <SearchProducts productFiltered={productFiltered} />
                    ) : (
                        <>
                            <>
                                {/* Categories */}
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    bounces={true}
                                //
                                >
                                    <TouchableOpacity
                                        key={1}
                                        onPress={() => {
                                            changeCtg("all"), setActive(-1);
                                        }}
                                    >
                                        <View
                                            style={{
                                                height: 30,
                                                margin: 5,
                                                borderRadius: 20,
                                                backgroundColor: "#07ed6b",
                                                width: 80,
                                                padding: 3,
                                            }}
                                        >
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    fontSize: 20,
                                                }}
                                            >
                                                All
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    {productCtg.length > 0 ? (
                                        <FlatList
                                            horizontal={true}
                                            data={productCategory}
                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            changeCtg(item.id);
                                                            setActive(categories.indexOf(item));
                                                        }}
                                                        style={{ height: 50 }}
                                                    >
                                                        <View
                                                            style={{
                                                                height: 30,
                                                                margin: 5,
                                                                borderRadius: 20,
                                                                backgroundColor: "#07ed6b",
                                                                width: 80,
                                                                padding: 3,
                                                            }}
                                                        >
                                                            <Text
                                                                numberOfLines={1}
                                                                style={{
                                                                    color: "white",
                                                                    fontWeight: "bold",
                                                                    fontSize: 20,
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                            keyExtractor={(item) => item._id}
                                        />
                                    ) : (
                                        <View style={{ marginTop: 40 }}>
                                            <Text style={{ color: "white" }}>No products here</Text>
                                        </View>
                                    )}
                                </ScrollView>
                                {/* End of categories */}
                            </>

                            {/* Products */}

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                // flex={1}
                                style={{ marginBottom: 200 }}
                            // show={false}
                            >
                                <Flex
                                    marginTop={10}
                                    flexWrap="wrap"
                                    direction="row"
                                    px={6}
                                    justifyContent="space-between"
                                >
                                    {products.map((item) => (
                                        <Pressable
                                            onPress={() => navigation.navigate("Detail", item)}
                                            w="47%"
                                            bg="white"
                                            rounded="md"
                                            shadow={2}
                                            my={3}
                                            pb={0.4}
                                            key={item._id}
                                        >
                                            <Image
                                                source={{ uri: item.picture }}
                                                w="full"
                                                h={24}
                                                alt=""
                                            />
                                            <Box px={2} pt={1}>
                                                <Text style={{ fontSize: 20, color: "#ed6307" }}>
                                                    Gh₵{item.price}
                                                </Text>
                                                <Text style={{ fontWeight: 300 }}>{item.name}</Text>

                                                {item.countInStock > 0 ? (
                                                    <View>
                                                        <Button
                                                            style={{
                                                                color: "black",
                                                                backgroundColor: "gray",
                                                                width: 40,
                                                                alignSelf: "center",
                                                                marginBottom: 10,
                                                                height: 25,
                                                            }}
                                                            title={"Buy later"}
                                                            onPress={() => {
                                                                addItemToCart(props);
                                                            }}
                                                        />
                                                    </View>
                                                ) : (
                                                    <Text style={{ marginTop: 10 }}>
                                                        {" "}
                                                        It has been bought{" "}
                                                    </Text>
                                                )}
                                            </Box>
                                        </Pressable>
                                    ))}
                                </Flex>
                            </ScrollView>
                        </>
                    )}
                </VStack>
            ) : (
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {/* <Text style={{marginTop:"100%"}} >
            Please wait.... It will take sometime to load
          </Text> */}
                    <ActivityIndicator
                        style={{ marginTop: "100%" }}
                        size="large"
                        color="red"
                    />
                </View>
            )}
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return (addItemToCart = (product) =>
        dispatch(actions.addToCart({ quantity: 1, product })));
};

export default connect(null, mapDispatchToProps)(ProductsScreen);


















import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/authFirebase";

export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log("Login success"))
                .catch((err) => Alert.alert("Login error", err.message));
        }
        navigation.navigate("login")
    };

    return (
        <View style={styles.container}>

            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Register with us</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={confirm}
                    onChangeText={(text) => setConfirm(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Sign up</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 18 }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("login")}>
                        <Text style={{ color: '#f57c00', fontWeight: 600, fontSize: 18 }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});







<Text
    // numberOfLines={3}
    style={{
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center"
    }}
>
    <Image
        source={{ uri: item.icon }}
        style={{ width: 40 }}
        h={50}
        alt=""
        borderRadius={100}
        // resizeMode="cover"
        size="sm"
    />
    {item.name}
</Text>








//   categories
import { AntDesign, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import {
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    Pressable,
    CheckIcon,
    Select,
    Box,
    View,
    Picker,
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
    const [icon, setIcon] = useState("");
    // const [mainImage, setMainImage] = useState("");
    const [error, setError] = useState();
    const [location, setLocation] = useState("");







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
            aspect: [1, 2],
            quality: 0.5
        })

        if (!result.canceled) {
            let newfile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test.${result.uri.split(".")[1]}`
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
                setIcon(result.url)
            })
    }





    const handleSubmit = async () => {

        fetch("http://192.168.43.189:3000/categories", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({
            //   picture,
            //   name,
            //   phone,
            //   price,
            //   description,
            //   location
            // }),
            body: JSON.stringify({
                icon,
                name,

            }),
        }).then(res => res.json())
            .then(result => {
                console.log(result)
            })

        // setName("")
        // setPrice("")
        // setDescription("")
        // setLocation("")
        navigation.navigate("main")
    };

    return (
        <Box bg="#09e034" flex={1}>
            <Box
                w="full"
                h="full"
                position="absolute"
                top="5%"
                px="6"
                justifyContent="center"
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 40 }}
                >
                    <Center>
                        <Heading style={{ marginTop: 80 }}>Sell agriculture only</Heading>
                    </Center>
                    <VStack space={5} pt="6">
                        <KeyboardAvoidingView behavior="position">
                            <Stack space={3}>
                                <View style={styles.imagecont}>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: icon }}
                                        alt="Logo"
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
                                    placeholder="Enter name"
                                    style={{ color: "black" }}
                                />
                                {/* <Input
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
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                  placeholder="Location"
                  type="text"
                  id="description"
                  style={{ color: "black" }}
                /> */}

                                {/* <Box maxW="300">
                <Select
                  variant="rounded"
                  selectedValue={pickervalue}
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Select category"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(e) => [setPickervalue(e), setCategories(e)]}
                >
                  {categories.map((e) => {
                    return <Select.Item key={e._id} label={e.name} value={e._id} />;
                  })} */}

                                {/* <FlatList
                    data={categories}
                    renderItem={(e) => {
                      return <Text key={e._id} label={e.name}></Text>;
                    }}
                    keyExtractor={(e) => e._id}
                  /> */}

                                {/* <Select.Item label="Pet" value="pet" />
                  <Select.Item label="Vegetable" value="vege" />
                  <Select.Item label="Cearal" value="Cearal" />
                  <Select.Item label="Poultry" value="poultry" />
                  <Select.Item label="Feeds" value="Feeds" />
                  <Select.Item label="Animal" value="animal" />
                  <Select.Item label="Equipment" value="Equi" /> */}
                                {/* </Select>
              </Box> */}

                                {error ? <Error message={error} /> : null}

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
        bottom: 10
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
    }
});

export default Register;




// categories


<ScrollView
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    bounces={true}
//
>
    <TouchableOpacity
        key={1}
        onPress={() => {
            changeCtg("all"), setActive(-1);
        }}
    >
        <View
            style={{
                height: 80,
                margin: 5,
                borderRadius: 20,
                // backgroundColor: "#07ed6b",
                width: 80,
                padding: 3,
            }}
        >
            <Text
                // numberOfLines={1}

                style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 20,
                    backgroundColor: "#07ed6b",
                    height: 45,
                    width: 50,
                    alignContent: "center",

                }}
            >
                All
            </Text>
        </View>
    </TouchableOpacity>

    {productCtg.length > 0 ? (
        <FlatList
            horizontal={true}
            data={categories}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            changeCtg(item._id);
                            // setActive(categories.indexOf(item));
                        }}
                        style={{ height: 50 }}
                    >
                        <View style={{ flexDirection: "row", marginHorizontal: 10 }} >
                            <Image
                                source={{ uri: item.icon }}
                                style={{ width: 50, top: 5, borderRadius: 30 }}
                                h={50}
                                alt=""
                            />
                            <Text style={{
                                color: "white", top: 20, fontSize: 18,
                                marginLeft: 5,
                                fontWeight: "bold"
                            }} >
                                {item.name}</Text>
                        </View>
                    </TouchableOpacity>
                );
            }}
            keyExtractor={(item) => item._id}
        />
    ) : (
        <View style={{ marginTop: 40 }}>
            <Text style={{ color: "white" }}>No products here</Text>
        </View>
    )}
</ScrollView>



if (!response.ok) {
    throw new Error("Login failed");
}

const result = await response.json();

// Check if the email and password exist in the database
if (result.email === email && result.password === password) {
    navigation.navigate("main");
} else {
    throw new Error("Invalid email or password");
}
} catch (error) {
    alert(error.message);
}





try {
    fetch("http://192.168.43.189:3000/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json())
        .then(result => {
            console.log(result)
        })

    navigation.navigate("main")
} catch (error) {
    alert('Login Failed')
}