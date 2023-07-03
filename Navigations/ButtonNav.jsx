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
import SellScreen from "../Products/SellScreen";
import ProductsScreen from "../Products/ProductsScreen";
import NewStack from "./NewStack"
import Product from "../Admin/Product";



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
    

      <Tab.Screen
        name="sell"
        component={SellScreen}
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
        component={Product}
        // component={Profile}
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
