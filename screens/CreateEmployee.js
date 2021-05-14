import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Modal, Platform, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';

const CreateEmployee = ({ navigation, route }) => {


    const getDetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }

    const [name, setName] = useState(getDetails('name'))
    const [phone, setPhone] = useState(getDetails('phone'))
    const [email, setEmail] = useState(getDetails('email'))
    const [salary, setSalary] = useState(getDetails('salary'))
    const [picture, setPicture] = useState(getDetails('picture'))
    const [position, setPosition] = useState(getDetails('position'))
    const [modal, setModal] = useState(false)
    const [enableShift, setEnableShift] = useState(false)


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

    const submitData = () => {
        fetch("http://10.0.2.2:3000/send-data", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} saved Successfully`)
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("Something went wrong")
                console.log(err)
            })
    }

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!result.cancelled) {
            let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test.${result.uri.split(".")[1]}`
            }
            handleUpload(newFile)
        }
    }

    const pickFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            let newFile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test.${result.uri.split(".")[1]}`
            }
            handleUpload(newFile)
        }
    }

    const handleUpload = image => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', "employee")
        data.append('cloud_name', "dmynpph6w")

        fetch("https://api.cloudinary.com/v1_1/dmynpph6w/image/upload", {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setPicture(data.url)
                setModal(false)
            })
    }

    const updateDetails = () => {
        fetch("http://10.0.2.2:3000/update", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`${data.name} updated Successfully`)
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("Something went wrong")
                console.log(err)
            })
    }

    return (
        <KeyboardAvoidingView style={styles.root} behavior='position'>
            <View>
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
                    label='Position'
                    value={position}
                    style={styles.inputStyles}
                    mode='outlined'
                    theme={theme}
                    onChangeText={text => setPosition(text)}
                />
                <Button
                    style={styles.inputStyles}
                    icon={picture === "" ? 'upload' : 'check'}
                    theme={theme}
                    mode='contained'
                    onPress={() => setModal(true)}
                >
                    Upload Image
                    </Button>

                {route.params
                    ?

                    <Button
                        style={styles.inputStyles}
                        icon='content-save'
                        theme={theme}
                        mode='contained'
                        onPress={() => updateDetails()}
                    >
                        Update
                    </Button>
                    :
                    <Button
                        style={styles.inputStyles}
                        icon='content-save'
                        theme={theme}
                        mode='contained'
                        onPress={() => submitData()}
                    >
                        Save
                    </Button>
                }

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
        </KeyboardAvoidingView>
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