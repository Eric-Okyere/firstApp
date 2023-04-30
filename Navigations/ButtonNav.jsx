import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Center, Text, View } from "native-base";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Pressable } from "native-base";
// import StackNav from './StackNav';
import Profile from "../User/Profile";
import Cart from "../Cart/Cart";
// import NewStack from "./NewStack";
import Sell from "../Products/Sell";
import ProductsScreen from "../Products/ProductsScreen";
import NewStack from "./NewStack"



const Tab = createBottomTabNavigator();
const CustomTab = ({ children, onPress }) => (
  <Pressable
    onPress={onPress}
    h={60}
    w={60}
    rounded="full"
    style={{ backgroundColor: "black", margin: 5 }}
    top={-18}
  // shadow={2}
  >
    {children}
  </Pressable>
);
function MyTabs() {
  return (
    <Tab.Navigator
      // initialRouteName="Login"

      // backBehavior='Home'
      screenOptions={{
        tabBarShowLabel: false,

        // headersShown:false,
        // tabBarHideOnKeyboard:true,
        header: () => null,
      }}
    >
      <Tab.Screen
        name="Home"
        component={NewStack}
        // component={ProductsScreen}
        options={{
          headersShown: false,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome name="home" color="#09e034" size={26} />
              ) : (
                <AntDesign name="home" color="#09e034" size={26} />
              )}
            </Center>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarButton: (props) => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome5 name="shopping-cart" color="#09e034" size={26} />
              ) : (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  color="#09e034"
                  size={26}
                />
              )}
            </Center>
          ),
        }}
      /> */}

      <Tab.Screen
        name="sell"
        component={Sell}
        options={{
          tabBarButton: (props) => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <AntDesign name="minuscircleo" size={24} color="#09e034" />
              ) : (
                <AntDesign name="pluscircle" color="#09e034" size={26} />
              )}
            </Center>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <AntDesign name="user" color="#09e034" size={26} />
              ) : (
                <Entypo name="user" color="#09e034" size={26} />
              )}
            </Center>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
