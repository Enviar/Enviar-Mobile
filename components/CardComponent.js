import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function CardComponent({ list, isSend, funcSend, number }) {
    const navigation = useNavigation()
    const color = ['#C82A2A', '#A1B043', '#C82A2A']
    // console.log(number, `--`);
    if (list.notes == `sedang dikirim`) {

        return (

            <View style={{ backgroundColor: '#8C993B', marginTop: 10, borderRadius: 8, paddingBottom: 10, marginBottom: 15 }}>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Detail', { id: list.id })
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderColor: '#e6e8e6',
                        borderWidth: 0.2,

                        // alignItems: 'center',
                        // margin: 1,
                        borderRadius: 8,
                        flexDirection: 'row',


                    }}>

                    <View style={{ flex: 1 / 4, backgroundColor: color[number], alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                        <Ionicons name='cube-outline' size={55} color='#ffff' />
                    </View>
                    <View style={{ flex: 1 / 2, marginLeft: 15 }}>
                        {/* <View style={{ flex: 1 }}> */}


                        <View style={{ paddingBottom: 10, paddingTop: 10, flex: 1 / 6 }}>

                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{list.Product.receiptNumber}</Text>
                            <Text style={styles.textPackage}>{list.Product.recipientName}</Text>
                            <Text style={styles.textPackage}>{list.Product.recipientPhone}</Text>
                            <Text style={styles.textPackage}>{list.Product.recipientAddress}</Text>
                            {isSend != true ? <Button title='kirim' onPress={() => funcSend(list.ProductId, list.Product.recipientCity)}></Button> : null}
                        </View>
                        {/* </View> */}

                    </View>
                    <View style={{
                        height: '80%',
                        width: 1 / 3,
                        backgroundColor: '#DCDCDC',
                        flex: 1 / 290,
                        marginTop: 10,
                        marginBottom: 10
                    }}></View>
                    <View style={{ flex: 1 - 1 / 2 - 1 / 4, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Type:</Text>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{list.Product.typeProduct}</Text>

                    </View>

                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, marginTop: 5 }}>Package is on the way to recipient</Text>
            </View>
        )
    } else {
        return (

            <View style={{ marginTop: 10, backgroundColor: '#edf2ef', borderRadius: 8 }}>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Detail', { id: list.id })
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderColor: '#e6e8e6',
                        borderWidth: 0.2,

                        // alignItems: 'center',
                        // margin: 1,
                        borderRadius: 8,
                        flexDirection: 'row',


                    }}>

                    <View style={{ flex: 1 / 4, backgroundColor: color[number], alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                        <Ionicons name='cube-outline' size={55} color='#ffff' />
                    </View>
                    <View style={{ flex: 1 / 2, marginLeft: 15 }}>
                        {/* <View style={{ flex: 1 }}> */}


                        <View style={{ paddingBottom: 10, paddingTop: 10, flex: 1 / 6 }}>

                            <Text style={{ fontSize: 17, fontWeight: '600' }}>{list.Product.receiptNumber}</Text>
                            <Text style={styles.textPackage}>{list.Product.recipientName}</Text>
                            <Text style={styles.textPackage}>{list.Product.recipientPhone}</Text>
                            <Text style={styles.textPackage}>{list.Product.recipientAddress}</Text>
                            {/* {isSend != true ? <Button title='kirim' onPress={() => funcSend(list.ProductId, list.Product.recipientCity)}></Button> : null} */}
                        </View>
                        {/* </View> */}

                    </View>
                    <View style={{
                        height: '80%',
                        width: 1 / 3,
                        backgroundColor: '#DCDCDC',
                        flex: 1 / 290,
                        marginTop: 10,
                        marginBottom: 10
                    }}></View>
                    <View style={{ flex: 1 - 1 / 2 - 1 / 4, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Type:</Text>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{list.Product.typeProduct}</Text>

                    </View>

                </TouchableOpacity>
                <View style={{ alignItems: 'flex-end' }}>

                    {isSend != true ? <Button title='kirim' onPress={() => funcSend(list.ProductId, list.Product.recipientCity)}></Button> : null}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    textPackage: {
        paddingTop: 2,
        fontWeight: '500'
    },
});