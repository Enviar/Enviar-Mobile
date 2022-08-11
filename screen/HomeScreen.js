import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, Button, Image, Alert, FlatList, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native';
import CardComponent from '../components/CardComponent'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function HomeScreen({ route }) {
    const [product, setProduct] = useState([])
    const [sended, setSended] = useState(false)
    const [loading, setLoading] = useState(true)
    const [location, setLocation] = useState("")
    const [finishSend, setFinishSend] = useState(false)
    // console.log(route.params, `route`);

    const getData = async () => {
        try {
            // console.log(`lalalayeyeyeee`);
            const value = await AsyncStorage.getItem('access_token')
            const dataLoc = await AsyncStorage.getItem('city')
            setLocation(dataLoc)
            if (value !== null) {
                try {
                    const dataResi = await axios.get(`https://e6fc-139-194-96-49.ap.ngrok.io/status`, {
                        headers: {
                            access_token: value
                        }
                    })
                    let count = 0
                    dataResi.data.forEach(x => {
                        // console.log(x[0].notes);
                        if (x[0].notes == `sedang dikirim`) {
                            // console.log(`oi`);
                            setSended(true)
                        } else {
                            count++
                        }
                    })
                    if (count == dataResi.data.length) {
                        setSended(false)
                    }

                    setProduct(dataResi.data)
                    // console.log(dataResi.data);
                    setLoading(false)
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSend = async (productid, cityid) => {
        try {
            const value = await AsyncStorage.getItem("access_token")
            if (value != null) {
                try {
                    const response = await axios.post(`https://e6fc-139-194-96-49.ap.ngrok.io/status`,
                        {
                            ProductId: productid,
                            CityId: cityid,
                            notes: `sedang dikirim`

                        }, {
                        headers: {
                            access_token: value
                        }
                    })
                    setSended(true)
                    // console.log(response);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const isFocused = useIsFocused()

    useEffect(() => {

        getData()



    }, [sended, finishSend, isFocused])

    if (loading) {
        return (
            <View style={{
                alignItems: "center",
                marginTop: '60%'
            }}>
                <ActivityIndicator
                    animating={loading}
                    color="#4f3609"
                    size="large"
                />
                <Text>Please Wait</Text>

            </View>
        )
    }

    if (!loading) {

        return (
            <>
                <ImageBackground

                    style={{
                        height: Dimensions.get('window').height / 8,
                        width: Dimensions.get('window').width,
                        backgroundColor: '#8C993B'
                    }}

                >
                    <SafeAreaView style={{ marginTop: 5, flexDirection: 'row' }}>
                        <View style={{ flex: 1 / 3 }}>

                        </View>

                        <View style={{ flex: 1 / 2.7, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 12, paddingLeft: 3, }}>Current Location</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                                <Ionicons name="ios-locate" size={15} color="#68351A" style={{
                                    paddingTop: 4, paddingRight: 3
                                }} />
                                <Text style={{ color: 'white', fontSize: 17 }}>{location}</Text>

                            </View>
                        </View>
                        <View style={{ flex: 1 / 3.6, alignItems: 'flex-end' }}>
                            <Image source={require('../assets/avatar_pakde.png')} />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
                {
                    product.length > 0 ? (
                        <>
                            <Text style={{ fontSize: 26, marginTop: 12, marginBottom: 12, marginLeft: 7 }}>Package List</Text>
                            <FlatList
                                data={product}
                                renderItem={({ item, no }) => <CardComponent number={product.indexOf(item)} list={item[0]} isSend={sended} funcSend={handleSend} />}
                                numColumns={1}
                                keyExtractor={(item, num) => num}
                                style={{ marginLeft: 10, marginRight: 10 }}
                            />
                        </>
                    )
                        :
                        <Text style={{ fontSize: 26, marginTop: 12, marginBottom: 12, marginLeft: 7 }}>No Package, You can Rest</Text>
                }
            </>
        )
    }
}