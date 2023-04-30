import React from 'react'
import { View, Text, FlatList ,Heading } from 'react-native'
import { ScrollView, Flex, Pressable, Image, Box } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import products from '../Data/Data'


const HomeProduct = () => {
  const navigation = useNavigation()
  // const {products}=props
  return (
  <ScrollView flex={1} show={false} >
    <Flex 
    flexWrap="wrap"
    direction='row'
    px={6}
    justifyContent="space-between"
    >
    
       {/* {Product.map((item)=>(
            <Pressable
            onPress={()=>navigation.navigate("single", item)}
            w="47%" bg="white" rounded="md" 
           shadow={2} my={3}  pb={0.4}  
          key={item._id}
           >
            <Image source={{uri: item.image}} w="full" h={24}   alt="" />
            <Box px={2} pt={1} >
            <Text style={{fontSize:20}} >
               Gh₵{item.price}
            </Text>
            <Text style={{fontWeight:300}} >
            {item.name}
            </Text>
      
            </Box>
         
           </Pressable>
        ))
        } */}
   {props.products.map((item)=>(
            <Pressable
             onPress={()=>navigation.navigate("Detail", item)}
            w="47%" bg="white" rounded="md" 
           shadow={2} 
           my={3} 
            pb={0.4}  
          key={item._id}
           >
            <Image source={{uri: item.image}} w="full" h={24}   alt="" />
            <Box px={2} pt={1} >
            <Text style={{fontSize:20, color:"#ed6307"}} >
               Gh₵{item.price}
            </Text>
            <Text style={{fontWeight:300}} >
            {item.name}
            </Text>
           
          {item.countInStock>0? (
            <View>
              <Button style={{color:"black", 
              backgroundColor:"gray",
              width:40, alignSelf:"center", marginBottom:10, height:25

              }} title={'Buy later'} 
              // onPress={()=>{addItemToCart(props)}}  
              />
            </View>
          ):
          <Text style={{marginTop:10}} > It has been bought </Text>
          }

            </Box>
         
           </Pressable>
        ))
        }
   


    </Flex>
  </ScrollView>
  )
}

export default HomeProduct