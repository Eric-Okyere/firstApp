import { Text, View, Image } from "react-native";
// import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import SingleProduct from "../Products/SingleProduct";

import { AntDesign, Entypo } from "@expo/vector-icons";
import ProductsScreen from "../Products/ProductsScreen";
import AddCam from "../Products/AddCam";
import SignupScreen from "../src/MyUsers/Signup";
import Sell from "../Products/Sell";
import Signin from "../src/MyUsers/Signin";
import ForgotPassword from "../src/MyUsers/ForgotPaasword";
import PickerAndroid from "../Products/PickerAndriod";

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
              style={{ width: 44, left: -10, height: 35 }}
              rounded={10}
              //  resizeMode='contain'
              source={require("../assets/Gye.png")}
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
        name="login"
        component={Signin}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Camera"
        component={AddCam}
      />

      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="libios"
        component={Sell}
      />

      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="library"
        component={PickerAndroid}
      />

      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="signup"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="reset"
        component={ForgotPassword}
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
