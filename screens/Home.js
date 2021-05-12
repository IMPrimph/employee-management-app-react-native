import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper'

function Home() {
    const data = [
        { id: 1, name: 'Jay', position: 'Web dev' },
        { id: 2, name: 'Noob', position: 'Android' },
        { id: 3, name: 'Bob', position: 'ML' },
        { id: 4, name: 'Potato', position: 'VM' }
    ]

    const renderList = data.map((item) => {
        return (
            <Card key={item.id} style={styles.myCard}>
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: "https://bit.ly/3uJkAb1" }}
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
        <View>
            {renderList}
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
    }
})

export default Home;
