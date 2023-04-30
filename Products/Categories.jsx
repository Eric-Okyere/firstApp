import { View, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import { ScrollView, Text } from 'native-base'

const Categories = ({ categories, categoryFilter, changeCtg }) => {
    return (

        <ScrollView horizontal={true} style={{ height: 110, marginRight: -30, }} >

            <View style={{ flexDirection: "row", marginRight: 50 }} >
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        categoryFilter('all')
                    }}
                >
                    <Text style={{
                        left: 10, top: 10, backgroundColor: "#07ed6b", width: 50,
                        height: 45
                        , textAlign: "center",
                        padding: 10,
                        fontSize: 20
                    }} >

                        <Text style={{ color: "white" }}>All</Text>
                    </Text>
                </TouchableOpacity>

                <FlatList
                    horizontal={true}
                    data={categories}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        categoryFilter(item._id);
                                        // setActive(categories.indexOf(item));
                                    }}
                                    style={{ height: 200, left: 30, top: -5 }}
                                >
                                    <View style={{ flexDirection: "row", marginRight: 30, top: 10 }} >
                                        <Image
                                            source={{ uri: item.icon }}
                                            style={{ width: 50, top: 5, borderRadius: 30, height: 50 }}
                                            h={100}
                                            alt=""
                                        />
                                        <Text style={{
                                            color: "white", top: 20, fontSize: 18,
                                            marginLeft: 5,
                                            fontWeight: "bold"
                                        }} >
                                            {item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </ScrollView>

    )
}

export default Categories