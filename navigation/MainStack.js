import RegisterScreen from "../screen/RegisterScreen";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from "../screen/HomeScreen";
import DetailScreen from "../screen/DetailScreen";
export default function MainStack() {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}