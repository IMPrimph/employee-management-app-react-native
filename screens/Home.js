import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Alert, FlatList, Text, View, Image } from 'react-native';
import { Card, FAB } from 'react-native-paper'

function Home({ navigation }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        fetch("http://10.0.2.2:3000/")
            .then(res => res.json())
            .then(results => {
                setData(results)
                setLoading(false)
            }).catch(err => {
                Alert.alert("Something went wrong")
            })
    }

    // const data = [
    //     { _id: "1", name: 'Jay', email: 'abc@abc.com', salary: '10 lpa', phone: '123', picture: 'https://bit.ly/3uJkAb1', position: 'Web dev' },
    //     { _id: "2", name: 'Noob', email: 'noob@abc.com', salary: '20 lpa', phone: '456', picture: 'https://bit.ly/3uJkAb1', position: 'Android' },
    //     { _id: "3", name: 'Bob', email: 'bob@abc.com', salary: '30 lpa', phone: '789', picture: 'https://bit.ly/3uJkAb1', position: 'ML' },
    // ]

    const renderList = ((item) => {
        return (
            <Card
                key={item._id}
                style={styles.myCard}
                onPress={() => navigation.navigate('Profile', { item })}
            >
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })

    return (
        <View style={{ flex: 1 }}>

            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                onRefresh={() => fetchData()}
                refreshing={loading}
                keyExtractor={item => item._id}
            />
            <FAB
                onPress={() => navigation.navigate('Create')}
                style={styles.fab}
                icon='plus'
                theme={{ colors: { accent: '#006aff' } }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
    },
    cardView: {
        flexDirection: 'row',
        padding: 6
    },
    text: {
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})

export default Home;
