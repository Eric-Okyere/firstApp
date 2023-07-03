import { View, Text, FlatList } from "react-native";
import React from "react";
import * as actions from "../Redux/actions/cartActions";
import { connect } from "react-redux";
import { Image } from "native-base";

const Cart = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              backgroundColor: "yellow",
              marginTop: 10,
              color: "black",
              fontSize: 30,
            }}
          >
            My Carts
          </Text>
          {props.cartItems.map((data) => {
            return (
              <View key={Math.random()}>
                <Image
                  source={{ uri: data.product.image }}
                  w={30}
                  h={30}
                  alt="Image"
                />
                <Text style={{ backgroundColor: "red" }}>{data.name}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={{
            alignSelf: "center",
            top: 100,
            backgroundColor: "green",
            padding: 10,
          }}
        >
          <Text>Empthy Cart</Text>
          <Text>Try to add one</Text>
        </View>
      )}
    </>

    // <View>
    //   <Text>Cart</Text>
    // </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps, null)(Cart);
