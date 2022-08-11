import { Text, View, Image } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
export default function SplashScreen() {
    const navigation = useNavigation()
    setTimeout(() => navigation.dispatch(StackActions.replace('Register')), 1500)
    return (

        <View style={{ alignItems: 'center', flex: 1, backgroundColor: '#ffff', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 / 7.5, }}>

                    <Image source={require('../assets/splash_envi.png')} />
                </View>
                <View style={{ flex: 1 / 2.5, paddingTop: 50 }}>
                    <Text style={{ fontWeight: '600', fontSize: 40 }}>ENVIAR</Text>
                    <Text style={{ fontSize: 18, paddingLeft: 15, }}>Delivery Man</Text>
                </View>

            </View>
        </View>

    )
}