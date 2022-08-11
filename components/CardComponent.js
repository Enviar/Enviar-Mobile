import { View, Text, Image, ScrollView, TouchableOpacity, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function CardComponent({ list, isSend, funcSend }) {
    const navigation = useNavigation()
    if (list.notes == `sedang dikirim`) {

        return (

            <View style={{ backgroundColor: '#8C993B', marginTop: 10, borderRadius: 20, paddingBottom: 10, marginBottom: 15 }}>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Detail', { id: list.id })
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        borderColor: '#e6e8e6',
                        borderWidth: 0.2,
                        justifyContent: 'center',
                        // alignItems: 'center',
                        // margin: 1,
                        borderRadius: 20,
                        flexDirection: 'row',


                    }}>
                    <View >
                        <View>

                        </View>
                        <View>

                            <View style={{ paddingBottom: 10, paddingTop: 10 }}>

                                <Text>{list.Product.receiptNumber}</Text>
                                <Text>Penerima: {list.Product.recipientName}</Text>
                                <Text>Address: {list.Product.recipientAddress}</Text>
                                <Text>Phone: {list.Product.recipientPhone}</Text>
                                {isSend != true ? <Button title='kirim' onPress={() => funcSend(list.ProductId, list.Product.recipientCity)}></Button> : null}

                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 17, marginTop: 5 }}>Package is on the way to recipient</Text>
            </View>
        )
    } else {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Detail', { id: list.id })
                }}
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderColor: '#e6e8e6',
                    borderWidth: 0.2,
                    justifyContent: 'center',
                    // alignItems: 'center',
                    // margin: 1,
                    borderRadius: 20,
                    flexDirection: 'row',


                }}>
                <View >
                    <View>

                    </View>
                    <View>

                        <View style={{ paddingBottom: 10 }}>
                            {list.notes == `sedang dikirim` ? <Text style={{ color: 'red' }}>{list.notes}</Text> : <Text>{list.notes}</Text>}

                            <Text>Penerima: {list.Product.recipientName}</Text>
                            <Text>Address: {list.Product.recipientAddress}</Text>
                            <Text>Phone: {list.Product.recipientPhone}</Text>
                            {isSend == true ? <Button title='Sedang ada pengiriman'></Button> : <Button title='kirim' onPress={() => funcSend(list.ProductId, list.Product.recipientCity)}></Button>}

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}