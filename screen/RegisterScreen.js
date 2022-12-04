import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, TextInput, Button, Modal, Alert, Platform, ImageBackground, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Icon } from 'native-base'

export default function RegisterScreen() {
    const [dataLogin, setDataLogin] = useState({
        email: `dickykurniawan69@gmail.com`,
        password: '123456'
    })
    const navigation = useNavigation()
    const handleInputChange = (key, val) => {

        const newInput = {
            ...dataLogin
        }
        newInput[key] = val
        setDataLogin(newInput)
    }

    const handleLogin = async () => {
 
        try {
      
            const response = await axios.post(`https://enviar-be.herokuapp.com/login`, {
                email: dataLogin.email,
                password: dataLogin.password
            })

            await AsyncStorage.setItem('access_token', response.data.access_token)
            await AsyncStorage.setItem('city', response.data.Courier_loc)

            navigation.navigate('Home')
        }
        catch (err) {
           
            Alert.alert(err.response.data.error.message)
   
        }
        finally {
            setDataLogin({
                email: '',
                password: ''
            })

        }
    }


    return (
     
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            enabled
            style={styles.container}
        >
         


            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' }}
                style={{
                    height: Dimensions.get('window').height / 2.5,
                    width: Dimensions.get('window').width,

                }}

            >
                {/* <View>
                    <Icon name='home' style={{ color: 'black', fontSize: 100 }} />
                    <Text style={styles.logo}>ENVIAR</Text>
                </View> */}
            </ImageBackground>

            <View style={styles.bottomView}>
                <View style={{ padding: 40 }}>
                    <Text style={{ color: '#A1B043', fontSize: 34, paddingLeft: 8 }}>Welcome Courier</Text>
                    <View style={{ marginTop: 50 }}>

                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            value={dataLogin.email}
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            name='email'
                            onChangeText={(val) => handleInputChange('email', val)}
                        />

                        <TextInput
                            style={styles.input}
                            value={dataLogin.password}
                            secureTextEntry={true}
                            placeholder='Password'
                            autoCapitalize="none"
                            name='password'
                            placeholderTextColor='white'
                            onChangeText={(val) => handleInputChange('password', val)}
                        />
                        <TouchableOpacity style={{ alignItems: 'center', marginTop: 30, borderWidth: 0.2, marginLeft: 4, marginLeft: 10, borderRadius: 14, backgroundColor: '#A1B043', width: 350, height: 53, }} onPress={handleLogin}>
                            <Text style={{ fontSize: 20, padding: 7, color: 'black', paddingTop: 14 }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* <Button
                title='Log In'
                onPress={handleLogin}
            /> */}

            {/* </View> */}
        </KeyboardAvoidingView>
        // </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#e6e6e6',
        margin: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
     
    },
    logo: {
        fontSize: 49,
        fontWeight: '600',
        marginBottom: 120,
        marginTop: 100,
        textAlign: 'center'
    },

    bottomView: {
        flex: 1.5,
        backgroundColor: `#ffffff`,
        bottom: 50,
        borderTopStartRadius: 100,
        borderTopEndRadius: 100
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
});

