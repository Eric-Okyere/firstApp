import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
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

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      // setCategories(productCategory)
      setActive(-1);

      axios.get(`http://localhost:3000/api/v1/products`).then((res) => {
        setProducts(res.data);
        setProductsFiltered(res.data);
        setproductCtg(res.data);
        setInitialState(res.data);
        setLoading(false);
      });

      axios
        .get('http://localhost:3000/api/v1/products')
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
        setproductCtg();
      };
    }, [])
  );

  // useEffect(()=>{

  //   setFocus(false)
  //   // setCategories(productCategory)
  //   setActive(-1)

  //     axios.get(`${baseURL}products`)
  //     .then((res)=>{
  //       setProducts(res.data);
  //       setProductsFiltered(res.data);
  //       setproductCtg(res.data);
  //       setInitialState(res.data)
  //     })

  //     axios.get(`${baseURL}products`)
  //     .then((res)=>{
  //       setCategories(res.data)
  //     }).catch((error)=>{
  //       console.log('Api call error')
  //     })

  //   return ()=>{
  //     setProducts([])
  //     setProductsFiltered([])
  //     setFocus()
  //     setCategories([])
  //     setActive()
  //     setInitialState()
  //     setproductCtg()
  //   }
  // }, [])

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
                        source={{ uri: item.image }}
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
