import React from 'react'
import { View, Text, FlatList ,Heading, Dimensions } from 'react-native'
import { ScrollView, Flex, Pressable, Image, Box } from 'native-base'
import products from '../Data/Data'


const {width} = Dimensions.get('window')
const HomeProduct = () => {
//   const navigation = useNavigation()
  return (
  <ScrollView flex={1} show={false} >
   
    
       {products.map((item)=>(
            <TouchableOpacity 
            // onPress={()=>navigation.navigate("single", item)}
          
  
          key={item.id}
           >
          
            {/* <Image source={{uri: item.image}} w="full" h={24}   alt="" /> */}
           
            <Text style={{fontWeight:300}} >
            {item.name}
            </Text>
            <Text style={{fontSize:20}} >
               Gh₵{item.price}
            </Text>
           
        
           
       
           </TouchableOpacity>
        ))
        }
    

    


  </ScrollView>
  )
}

export default HomeProduct


const styles  = StyleSheet.create({
    container:{
        width:width / 2 - 20
    }
})