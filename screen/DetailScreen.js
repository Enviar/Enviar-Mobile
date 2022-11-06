import { StyleSheet, Text, View,TouchableOpacity, Image, ActivityIndicator, TextInput,  Alert, Linking } from 'react-native'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../firebase/config'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function DetailScreen({ route }) {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false) 
    const [name, setName] = useState("")
    const id = route.params.id
    const navigation = useNavigation()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };



    const getDataId = async () => {
        try {
            const value = await AsyncStorage.getItem('access_token')
            if (value !== null) {
                try {
                    const dataResi = await axios.get(`https://enviar-be.herokuapp.com/status/${id}`,
                        {
                            headers: {
                                access_token: value
                            }
                        })
                    setProduct(dataResi.data.data)
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

    const handleFinish = async (photo) => {
        if(!photo || !name){
            return Alert.alert("masukkan semua field")
        } else {
            try {
                const value = await AsyncStorage.getItem('access_token')
                if (value != null) {
                    try {
                        const response = await axios.post(`https://enviar-be.herokuapp.com/status`,
                            {
                                ProductId: product.ProductId,
                                CityId: product.Product.recipientCity,
                                name: name,
                                notes: `selesai`,
                                photo: photo
                            }, {
                            headers: {
                                access_token: value
                            }
                        })
                     
                        navigation.navigate('Home')
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
       
    }

    const uploadImage = async () => {
        if(!name){
            return Alert.alert("Masukkan nama penerima")
        } else if(!image){
            return Alert.alert("Masukkan Bukti foto")
        } 
        else {
            setUploading(true)

      
            const response = await fetch(image)
            const blob = await response.blob()
            const filename = image.substring(image.lastIndexOf('/') + 1)
            var ref = firebase.storage().ref().child(filename).put(blob)
    
            try {
                await ref
                handleFinish(filename)
                Alert.alert(`Sukses Update data..!`)
            } catch (err) {
               Alert.alert(err)
            } finally {
                setUploading(false)
                setImage(null)
            }
        }

        
    }



    const renderStatus = (status) =>{
        if(status === "siap_dikirim"){
            return "Siap Dikrim"
        } else if (status === "sedang dikirim"){
            return "Dalam Perjalanan"
        }
    }

    useEffect(() => {
        getDataId()
    }, [])

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

                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500' }}>Receipt Number:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', letterSpacing:1 }}>{product.Product.receiptNumber}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Recipient Name:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>{product.Product.recipientName}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Recipient Phone:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400', marginRight:3 }}>{product.Product.recipientPhone} <Ionicons onPress={()=> Linking.openURL(`whatsapp://send?text=hello ${product.Product.recipientName}, im your Enviar's courier. Is your address ${product.Product.recipientAddress} are correct? &phone=${product.Product.recipientPhone}`)} name='logo-whatsapp' color="#A1B043" size={22} /></Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Recipient Address:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>{product.Product.recipientAddress} </Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Service Type:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>{product.Product.typeService}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Package Type:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>{product.Product.typeProduct}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Payment Type:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Cash</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 25, flexDirection: 'row', marginTop:5 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>Status:</Text>
                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 17, fontWeight: '400' }}>{ renderStatus(product.notes) }</Text>

                    </View>
                </View>

                {
                    product.notes === `sedang dikirim` ?

                        <View style={{ marginTop: 25, borderColor: 'black' }}>
                            <View style={{ marginLeft: 20 }}>
                                <Text style={{ fontSize: 17, fontWeight: '400' }}>Receiver Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='receiver name'
                                    value={name}
                                    autoCapitalize="none"
                                    onChangeText={(val) => setName(val)}
                                />
                                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <View style={{ flex: 2 / 3 }}>
                                        {image ? <Image source={{ uri: image }} style={{ width: 230, height: 230 }} /> :
                                            <View style={{ width: 230, height: 230, backgroundColor: 'black' }}>
                                            </View>
                                        }

                                    </View>
                                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', borderRadius: 14, backgroundColor: 'black', width: 83, height: 100, justifyContent: 'center' }}>
                                            <Ionicons name='camera-outline' size={30} color='white' />
                                            <Text style={{ color: 'white', textAlign: 'center' }}>Upload Proof Photo</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                            {/* <Button title='Submit upload' onPress={uploadImage}></Button> */}
                            {/* {product.notes == `sedang dikirim` ? <Button title='Selesai' onPress={uploadImage}></Button> : null} */}
                            <View style={{ justifyContent: 'flex-end', marginTop: 40, alignItems: 'center' }} >
                                <TouchableOpacity disabled={uploading? true: false}  onPress={uploadImage} style={{ alignItems: 'center', marginTop: 30, borderWidth: 0.2, borderRadius: 14, backgroundColor: '#A1B043', width: 350, height: 53, }}>
                                    <Text style={{ fontSize: 20, padding: 7, color: 'black', paddingTop: 14 }}>{uploading? "Please Wait ..." : "Finish Delivery"}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        : null
                }

            </>
        )

    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#e6e6e6',
        marginTop: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    }
})

