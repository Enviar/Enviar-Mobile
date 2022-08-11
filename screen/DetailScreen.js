import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, ActivityIndicator, TextInput, Button, Modal, Alert, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../firebase/config'

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

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };



    const getDataId = async () => {
        try {
            const value = await AsyncStorage.getItem('access_token')
            if (value !== null) {
                try {
                    const dataResi = await axios.get(`https://e6fc-139-194-96-49.ap.ngrok.io/status/${id}`,
                        {
                            headers: {
                                access_token: value
                            }
                        })
                    // console.log(dataResi.data);
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

    const handleFinish = async (photo) => {
        try {
            console.log(photo, `-`);
            const value = await AsyncStorage.getItem('access_token')
            if (value != null) {
                try {
                    const response = await axios.post(`https://e6fc-139-194-96-49.ap.ngrok.io/status`,
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
                    console.log(`sukses semua`);
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

    const uploadImage = async () => {
        // console.log(name);
        setUploading(true)

        const response = await fetch(image)
        // console.log(response);
        const blob = await response.blob()
        const filename = image.substring(image.lastIndexOf('/') + 1)
        var ref = firebase.storage().ref().child(filename).put(blob)

        try {
            await ref
            console.log(filename, `filename`);
            handleFinish(filename)
            Alert.alert(`Photo uploaded..!`)
        } catch (err) {
            console.log(err);
        } finally {

            // console.log(`sukses lokal`);
            setUploading(false)
            // console.log(`sukses 2`);
            // console.log(`sukses 3`);
            setImage(null)
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
                <Text>ini detail screen</Text>
                <Text>{product.notes}</Text>
                <Text>Penerima: {product.Product.recipientName}</Text>
                <Button title='upload' onPress={pickImage}></Button>
                <Text>Receiver Name</Text>
                <TextInput
                    placeholder='recipient name'
                    value={name}
                    autoCapitalize="none"
                    onChangeText={(val) => setName(val)}
                />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                {/* <Button title='Submit upload' onPress={uploadImage}></Button> */}
                {product.notes == `sedang dikirim` ? <Button title='Selesai' onPress={uploadImage}></Button> : null}
            </>
        )

    }
}