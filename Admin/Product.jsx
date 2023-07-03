import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useCallback, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native'
import Icon from "react-native-vector-icons/FontAwesome"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import AsyncStorage from "@react-native-community/async-storage"
// import {Header, Input, Item} from "native-base"
import axios from "axios"
import SearchProducts from "../Products/SearchProducts"
import { FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
import {
  Flex, Pressable, Image, Box,Heading,Input,HStack,Center,VStack,Spacer,
} from "native-base";
import ListProducts from './ListProducts'

var {height, width} = Dimensions.get("window")

const Product = (props) => {
  const [productList, setProductList] = useState()
  const [productFilter, setProductFilter] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()
  const [input, setInput] = useState();
  const [focus, setFocus] = useState();


   
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
                  .then((res)=>{
                      setToken(res)
                  })
                  .catch((error)=> console.log(error))
  
                  axios.get("http://192.168.43.94:3000/send")
                  .then((res)=>{
                      setProductList(res.data);
                      setProductFilter(res.data);
                      setLoading(false);
                  })

               
  
                  return ()=>{
                      setProductList();
                      setProductFilter();
                      setLoading(true)
                  }
    }, [])
  );

  const searchProducts = (text) => {
    setProductFilter(
      productList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );

  };

  const openList = () => {
    setFocus(true);

  };

  const onBlur = () => {

    setFocus(false);
  };


    const Listheader =()=>{
      return(
        <View  style={styles.listheader} >
          <View style={styles.headerItem} >
            <Text style={{fontWeight:"600"}} >Image</Text>
          </View>
        <View style={styles.headerItem} >
        <Text style={{fontWeight:"600"}} >Name</Text>
        </View>
        <View style={styles.headerItem} >
        <Text style={{fontWeight:"600"}} >Price</Text>
        </View>
        <View style={styles.headerItem} >
        <Text style={{fontWeight:"600", right:5}} >Location</Text>
        </View>
        <View style={styles.headerItem} >
        <Text style={{fontWeight:"400"}} >Category</Text>
        </View>
        </View>
      )
    }


  return (
    <View style={{flex:1, backgroundColor:"green"}} >
     <View
      // style={{top:70, backgroundColor: "black"}}
       >
     <HStack
            style={{ backgroundColor: "black", height: 110 }}

            alignItems="center"
            w="full"
            px={6}
            safeAreaTop
          >

          <Image
              style={{ width: 45, left: -10, height: 48, bottom:10 }}
              rounded={40}
              //  resizeMode='contain'
              source={require("../assets/Gye.png")}
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
              {/* {focus == true ? (
                <AntDesign
                  name="closecircleo"
                  size={24}
                  onPress={onBlur}
                  color="black"
                  style={{ marginTop: 12, left: -10 }}
                />
              ) : null} */}
            </View>
          </HStack>
    
     </View>

    {
      loading ? (
        <View>
          <ActivityIndicator top={150} size="large"  color="red" />
        </View>
      ) :
        <FlatList 
        data={productFilter}
        ListHeaderComponent={Listheader}
        renderItem={({item, index}) =>(
          <ListProducts {...item} navigation={props.navigation}  index={index}   />
        )}
        keyExtractor={(item)=> item.id}
        />
    }


    </View>
  )
}

export default Product

const styles = StyleSheet.create({
  listheader:{
    flexDirection:"row",
    padding:3,
    backgroundColor:"gainsboro"
  },
  headerItem:{
    // margin:3,
    width: width / 6
  }
})