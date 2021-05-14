import React, { useState } from 'react';
import { StyleSheet, Alert, Text, Platform, View, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Card, Title } from 'react-native-paper'
import { MaterialIcons, Feather } from '@expo/vector-icons'

const Profile = (props) => {

    const { _id, name, email, salary, phone, picture, position } = props.route.params.item;

    const openDial = () => {
        if (Platform.OS === 'android') {
            Linking.openURL(`tel:${phone}`)
        } else {
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    const deleteEmployee = () => {
        fetch("http://10.0.2.2:3000/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
            .then(res => res.json())
            .then(deletedEmp => {
                Alert.alert(`${deletedEmp.name} deleted`)
                props.navigation.navigate('Home')
            })
            .catch(err => console.log(err))
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
                    source={{ uri: picture }}
                />
            </View>
            <View style={{ alignItems: 'center', margin: 15 }}>
                <Title>{name}</Title>
                <Text style={{ fontSize: 20 }}>{position}</Text>
            </View>

            <Card style={styles.myCard} onPress={() => Linking.openURL(`mailto:${email}`)}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name='email'
                        size={32}
                        color='#006aff'
                    />
                    <Text style={styles.myText}>{email}</Text>
                </View>
            </Card>

            <Card style={styles.myCard} onPress={() => openDial()}>
                <View style={styles.cardContent}>
                    <Feather
                        name='phone'
                        size={32}
                        color='#006aff'
                    />
                    <Text style={styles.myText}>{phone}</Text>
                </View>
            </Card>

            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons
                        name='attach-money'
                        size={32}
                        color='#006aff'
                    />
                    <Text style={styles.myText}>{salary}</Text>
                </View>
            </Card>

            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
                <Button
                    theme={theme}
                    icon='account-edit'
                    mode='contained'
                    // onPress={() => console.log('clicked')}
                    onPress={() => {
                        props.navigation.navigate('Create',
                            { _id, name, email, salary, phone, picture, position }
                        )
                    }}
                >
                    Edit
                </Button>
                <Button
                    theme={theme}
                    icon='delete'
                    onPress={() => deleteEmployee()}
                    mode='contained'
                >
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