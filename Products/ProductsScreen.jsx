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
import { FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
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
  Spacer,
} from "native-base";
import SearchProducts from "./SearchProducts";
import productCategory from "../Data/Category";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as actions from "../Redux/actions/cartActions";
import baseURL from "../assets/common/BaseUrl";
import axios from "axios";
import Categories from "./Categories";

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




  // fetch main products
  useEffect(() => {
    fetch("http://192.168.43.94:3000/send")
      .then(res => res.json())
      .then(results => {
        setProducts(results)
        setProductsFiltered(results)
        setproductCtg(results)
        setInitialState(results)
        setLoading(false)
      })

    // fetch categories
    fetch("http://192.168.43.94:3000/categories")
      .then(res => res.json())
      .then(results => {
        setCategories(results)
        // setproductCtg(results)

        console.log(results)
      })



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

    setFocus(false);
  };

  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setproductCtg(InitialState), setActive(true)]
        : [
          setproductCtg(
            products.filter((item) => item.category && item.category._id === ctg),
            // products.filter((item) => item.id === ctg)

          ),
        ];
    }
  };

  return (
    <>
      {loading == false ? (
        <VStack style={{ backgroundColor: "#07ed6b" }}>
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

              {/* Categories */}
              <Categories
                categories={categories}
                categoryFilter={changeCtg}
                productCtg={productCtg}
              />
              {/* End of categories */}


              {/* Products */}
              {productCtg.length > 0 ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  // flex={1}
                  style={{ marginBottom: 250 }}
                // show={false}
                >
                  <Flex
                    marginTop={-3}
                    flexWrap="wrap"
                    direction="row"
                    px={6}
                    justifyContent="space-between"
                  >
                    {productCtg.map((item) => (
                      <Pressable
                        onPress={() => navigation.navigate("Detail", item)}
                        w="47%"
                        bg="black"
                        rounded="md"
                        shadow={2}
                        my={3}
                        pb={0.4}
                        key={item._id}
                      >
                        <Image
                          source={{ uri: item.picture }}
                          w={135}
                          h={24}
                           top={2.5}
                          alignSelf="center"
                          alt=""
                        />
                        <Box px={2} pt={1}>
                          
                          <Text
                          numberOfLines={2}
                          // ellipsizeMode="tail"
                          style={{
                            color: "white", fontSize: 20,
                            fontWeight: "bold", top:10 
                          }}>{item.name}</Text>
                          {""}
                          <Text
                          numberOfLines={1}
                           style={{  fontSize: 20, color: "white", marginBottom: 5, fontWeight: "bold" }}>
                            Gh₵{item.price}
                          </Text>
                          <Text  numberOfLines={2} style={{  fontSize: 20,fontWeight: "bold", color: "white", marginBottom: 5 }}>
                            {item.region}
                          </Text>


                        </Box>
                      </Pressable>
                    ))}
                  </Flex>
                </ScrollView>
              ) : (
                <View style={{ marginTop: 40 }}>
                  <Text style={{ color: "white" }}>No products here</Text>
                </View>
              )}

            </>
          )}
        </VStack>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>

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

// const mapDispatchToProps = (dispatch) => {
//   return (addItemToCart = (product) =>
//     dispatch(actions.addToCart({ quantity: 1, product })));
// };

export default ProductsScreen;
// export default connect(null, mapDispatchToProps)(ProductsScreen);