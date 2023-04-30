import React, { useState } from 'react'
import { Flex, Pressable, Image, Box, View, Text, Spacer, Heading, HStack, Button } from 'native-base'
import NumericInput from 'react-native-numeric-input'
import { MaterialCommunityIcons, Entypo, Feather, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { ScrollView, Platform, Linking, StyleSheet } from 'react-native';


import { useNavigation } from '@react-navigation/native'



function LoginScreen({ route }) {
  const [value, setValue] = useState(0);
  const navigation = useNavigation()
  const item = route.params


  const openDial = () => {
    if (Platform.OS === "ios") {
      Linking.openURL(`tel:${item.phone}`)
    }
    else if (Platform.OS === "android") {
      Linking.openURL(`tel:${item.phone}`)
    }
  }

  return (


    <Box
      w="full"
      h="full"
      position="absolute"
      //   style={{top:60}}
      px="3"
      justifyContent="center"
    >

      <ScrollView style={{ marginBottom: 70 }} showsVerticalScrollIndicator={false} >
        <Image mt={10} source={{ uri: item.picture }}
          w="full"
          h={300}

          alt="Image" />
        <View style={{ flexDirection: "row" }}>
          <FontAwesome name="product-hunt" style={{ top: 43, marginRight: 10 }} size={24} color="#07ed6b" />
          <Heading mb={2} mt={10}  >{item.name} </Heading>
          <Spacer />
          <Heading mt={10} color="#07ed6b" fontSize={25} >
            <MaterialCommunityIcons name="cash-multiple" size={24} color="black" />
            Gh¢{item.price}</Heading>
        </View>
        {/* <Rating value={item.rating} 
      text={`${item.numReviews}, reviews`}
      /> */}
        <HStack my={5} style={{ flexDirection: "column" }}>
          <Text fontSize={20} my={5} >
            {item.description}
          </Text>

          <View style={{ backgroundColor: "white", padding: 5, borderRadius: 20 }}>
            <Text fontSize={20} style={myStyle.place}>
              <Entypo name="location" size={24} color="#07ed6b" />
              <Text >Region: {item.region} </Text>
            </Text>
            <Text fontSize={20} style={myStyle.place}>
              <Entypo name="location-pin" size={24} color="#07ed6b" />
              <Text>Town: {item.town} </Text>
            </Text>
            <Text fontSize={20} style={myStyle.place}>
              <EvilIcons name="location" size={24} color="#07ed6b" />
              <Text>Location: {item.location} </Text>
            </Text>
          </View>

        </HStack>


        <Button bg="black" my={30}
          style={{ top: 5, borderRadius: 30, }}
          onPress={() => openDial()}
        >
          <View style={{ flexDirection: "row", }}>
            <View>
              <Feather name="phone-call" style={{ top: 7, left: -20 }} size={24} color="#07ed6b" />
            </View>
            <View>
              <Heading style={{ fontSize: 25, marginTop: 3, height: 30 }} color="white"  > {item.phone}</Heading>
            </View>
          </View>
        </Button>


      </ScrollView>

    </Box>
  )
}

export default LoginScreen


const myStyle = StyleSheet.create({
  place: {
    margin: 10
  }
})
