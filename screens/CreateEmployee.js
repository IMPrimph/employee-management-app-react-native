import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';

const CreateEmployee = ({ navigation }) => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [picture, setPicture] = useState("")
    const [modal, setModal] = useState(false)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!')
                }
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera permissions to make this work!')
                }
            }
        })();
    }, [])

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result)
    }

    const pickFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result)
    }

    return (
        <View style={styles.root}>
            <TextInput
                label='Name'
                value={name}
                style={styles.inputStyles}
                mode='outlined'
                theme={theme}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label='Phone'
                keyboardType='number-pad'
                value={phone}
                style={styles.inputStyles}
                mode='outlined'
                theme={theme}
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label='Email'
                value={email}
                keyboardType='email-address'
                style={styles.inputStyles}
                mode='outlined'
                theme={theme}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label='Salary'
                value={salary}
                keyboardType='number-pad'
                style={styles.inputStyles}
                mode='outlined'
                theme={theme}
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                label='Picture'
                value={picture}
                style={styles.inputStyles}
                mode='outlined'
                theme={theme}
                onChangeText={text => setPicture(text)}
            />
            <Button
                style={styles.inputStyles}
                icon='upload'
                theme={theme}
                mode='contained'
                onPress={() => setModal(true)}
            >
                Upload Image
            </Button>

            <Button
                style={styles.inputStyles}
                icon='content-save'
                theme={theme}
                mode='contained'
                onPress={() => setModal(true)}
            >
                Save
            </Button>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(false)}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <Button
                            icon='camera'
                            theme={theme}
                            mode='contained'
                            onPress={() => pickFromCamera()}
                        >
                            Camera
                        </Button>
                        <Button
                            icon='image-area'
                            theme={theme}
                            mode='contained'
                            onPress={() => pickFromGallery()}
                        >
                            Gallery
                        </Button>
                    </View>
                    <Button
                        theme={theme}
                        onPress={() => setModal(false)}
                    >
                        Cancel
                    </Button>
                </View>
            </Modal>
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
    inputStyles: {
        margin: 10
    },
    modalButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    modalView: {
        position: 'absolute',
        bottom: 2,
        width: '100%',
        backgroundColor: 'white'
    }
})

export default CreateEmployee;