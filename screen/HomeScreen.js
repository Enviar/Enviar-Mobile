import { StyleSheet, Text, View, Dimensions, ScrollView, Animated, TouchableOpacity, ActivityIndicator, TextInput, Button, Image, Alert, FlatList, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useRef, useState } from 'react'
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
    const [isOpen, setIsOpen] = useState(false)
    const scaleView = useRef(new Animated.Value(1)).current
    const offsetView = useRef(new Animated.Value(0)).current
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('access_token')
            const dataLoc = await AsyncStorage.getItem('city')
            setLocation(dataLoc)
            if (value !== null) {
                try {
                    const dataResi = await axios.get(`https://enviar-be.herokuapp.com/status`, {
                        headers: {
                            access_token: value
                        }
                    })
                    let count = 0
                    dataResi.data.forEach(x => {
                        if (x[0].notes == `sedang dikirim`) {
                         
                            setSended(true)
                        } else {
                            count++
                        }
                    })
                    if (count == dataResi.data.length) {
                        setSended(false)
                    }

                    setProduct(dataResi.data)
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
                    const response = await axios.post(`https://enviar-be.herokuapp.com/status`,
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
            <View>

                <Animated.View style={[
                    styles.pages,
                    {
                        transform: [{ scale: scaleView }, { translateX: offsetView }],
                        borderRadius: isOpen ? 22 : 0
                    }]}>
                    <ImageBackground

                        style={{
                            height: Dimensions.get('window').height / 8,
                            width: Dimensions.get('window').width,
                            backgroundColor: '#8C993B'
                        }}

                    >
                        <SafeAreaView style={{ marginTop: 5, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                Animated.timing(scaleView, {
                                    toValue: isOpen ? 1 : 0.76,
                                    duration: 300,
                                    useNativeDriver: true
                                }).start();
                                Animated.timing(offsetView, {
                                    toValue: isOpen ? 0 : 250,
                                    duration: 300,
                                    useNativeDriver: true
                                }).start();
                                setIsOpen(!isOpen)
                            }} style={{ flex: 1 / 3, justifyContent: 'center' }}>
                                <Ionicons name='menu-outline' size={27} color="#FFFFFF" style={{ marginLeft: 10 }} />
                            </TouchableOpacity>

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
                </Animated.View>
                <View>
                    <View style={{ marginTop: -200, marginLeft: 10 }}>

                        {isOpen ?

                            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
                                <Ionicons name="log-out-outline" size={20} color="#000000" style={{
                                    paddingTop: 4, paddingRight: 3
                                }} />
                                <Text style={{ color: 'black', fontSize: 20 }}>Logout</Text>

                            </View>


                            : null}
                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        // position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})