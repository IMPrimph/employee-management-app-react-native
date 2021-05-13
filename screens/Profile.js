import React, { useState } from 'react';
import { StyleSheet, Text, Platform, View, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Card, Title } from 'react-native-paper'
import { MaterialIcons, Feather } from '@expo/vector-icons'

const Profile = () => {

    const openDial = () => {
        if (Platform.OS === 'android') {
            Linking.openURL("tel:12345")
        } else {
            Linking.openURL("telprompt:12345")
        }
    }

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={['#0033ff', '#6bc1ff']}
                style={{ height: '20%' }}
            />
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{ width: 120, height: 120, marginTop: -50, borderRadius: 60 }}
                    source={{ uri: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHBlcnNvbnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' }}
                />
            </View>
            <View style={{ alignItems: 'center', margin: 15 }}>
                <Title>Jay</Title>
                <Text style={{ fontSize: 20 }}>Web developer</Text>
            </View>

            <Card style={styles.myCard} onPress={() => Linking.openURL("mailto:abc@gmail.com")}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name='email'
                        size={32}
                        color='#006aff'
                    />
                    <Text style={styles.myText}>abc@gmail.com</Text>
                </View>
            </Card>

            <Card style={styles.myCard} onPress={openDial}>
                <View style={styles.cardContent}>
                    <Feather
                        name='phone'
                        size={32}
                        color='#006aff'
                    />
                    <Text style={styles.myText}>8500651791</Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name='attach-money'
                        size={32}
                        color='#006aff'
                    />
                    <Text style={styles.myText}>4,00,000</Text>
                </View>
            </Card>

            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
                <Button theme={theme} icon='account-edit' mode='contained'>
                    Edit
                </Button>
                <Button theme={theme} icon='delete' mode='contained'>
                    Fire Employee
                </Button>
            </View>

        </View>
    )
}

const theme = {
    colors: {
        primary: '#006aff'
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    myCard: {
        margin: 10
    },
    cardContent: {
        flexDirection: 'row',
        padding: 10
    },
    myText: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5
    }
})

export default Profile;