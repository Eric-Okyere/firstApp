import { View, FlatList, Dimensions, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Container, Left, VStack, Body, Center, Content, Text, Thumbnail, Image, } from "native-base"
import { useNavigation } from '@react-navigation/native'



const SearchProducts = (props) => {
  const { productFiltered } = props
  const navigation = useNavigation()
  return (
    <

      >

      {productFiltered.length > 0 ? (

        <FlatList
          data={productFiltered}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => navigation.navigate("Detail", item)}
                style={{ flex: 1 }}
              >
                <View style={{ margin: 20, }}>
                  <Center style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "red.100" }} >
                    <Image source={{ uri: item.picture }} w={20} h={24} resizeMode='contain' alt="" />
                    <View>
                      <Text>{item.name}</Text>
                    </View>
                  </Center>
                </View>
              </Pressable>
            )
          }}
          keyExtractor={(item) => item.id}
        />

        // productFiltered.map((item)=>(
        //     <View key={item.id} avatar style={{margin:20}}>
        //        <Center style={{flexDirection:"row", justifyContent:"space-between"}} >
        //           <Image source={{uri: item.image}} w={20} h={24} resizeMode='contain'   alt="" /> 
        //        <View>
        //          <Text>{item.name}</Text>
        //        </View>
        //        </Center>
        //       </View>
        // ))


      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }} >
          <Text style={{ alignSelf: "center" }} >
            you made a wrong input
          </Text>
        </View>
      )}
    </>
  )
}

export default SearchProducts