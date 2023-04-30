import { Text, View, Image } from "react-native";
// import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import SingleProduct from "../Products/SingleProduct";

import { AntDesign, Entypo } from "@expo/vector-icons";
import ProductsScreen from "../Products/ProductsScreen";
import Register from "../User/Register";
import LoginScreen from "../User/Login";

// initialRouteName='PaymentSuccessful'

const Stack = createStackNavigator();
export default function App() {
  return (
    <Stack.Navigator initialRouteName="signup">
      <Stack.Screen
        options={{
          header: () => null,

          headerRight: () => (
            <Image
              style={{ width: 45, left: -10, height: 42 }}
              rounded={10}
              //  resizeMode='contain'
              source={require("../assets/Gye.jpg")}
              alt=""
            />
          ),
          headerLeft: () => (
            <Entypo
              name="aircraft"
              style={{ marginLeft: 10 }}
              size={24}
              color="black"
            />
          ),
          headerStyle: {
            backgroundColor: "#0ce846",
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
        name="main"
        component={ProductsScreen}
      />
      <Stack.Screen
        options={{
          title: "Buy your product",
          headerStyle: {
            backgroundColor: "#34eb64",
            height: 100,
          },
        }}
        name="Detail"
        component={SingleProduct}
      />

      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="signup"
        component={Register}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="login"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
}

// const styles = StyleSheet.create({
//   container: {
//    top:60,
//    marginHorizontal:10
//   },
// });
