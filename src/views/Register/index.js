import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { styles } from "./style";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { serverConfig } from '../../config/config';


export function Register({ navigation }) {
    const { theme } = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        if (username.length < 4) {
            Alert.alert('Username', 'Username must be at least 4 characters long.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
            return;
        }

        if (name.length < 1) {
            Alert.alert('Name', 'Please enter a name.');
            return;
        }

        if (surname.length < 1) {
            Alert.alert('Surname', 'Please enter a surname.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        const newUser = {
            username: username,
            password: password,
            name: name,
            surname: surname,
            email: email,
        };

        try {
            const response = await fetch(`${serverConfig.apiUrl}:${serverConfig.port}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                navigation.goBack();
            } else {
                console.error('Adding user error', response.statusText);
            }
        } catch (error) {
            console.error('POST error', error);
        }
    };

    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Register</Text>
                    <View style={style.inputContainer}>
                        <TextInput
                            style={style.input}
                            placeholder="Username"
                            placeholderTextColor={theme.textInputPlaceholder}
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <TextInput
                            style={style.input}
                            placeholder="Password"
                            placeholderTextColor={theme.textInputPlaceholder}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <TextInput
                            style={style.input}
                            placeholder="Name"
                            placeholderTextColor={theme.textInputPlaceholder}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <TextInput
                            style={style.input}
                            placeholder="Surname"
                            placeholderTextColor={theme.textInputPlaceholder}
                            value={surname}
                            onChangeText={setSurname}
                        />
                    </View>
                    <View style={style.inputContainer}>
                        <TextInput
                            style={style.input}
                            placeholder="E-mail"
                            placeholderTextColor={theme.textInputPlaceholder}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <TouchableOpacity style={style.registerButton} onPress={handleRegister}>
                        <Text style={theme.text}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const style = {
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 100,
        paddingVertical: 10,
        elevation: 3,
        marginTop: 10
    },
    input: {
        fontSize: 16,
        color: '#333',
    },
    registerButton: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 80
    }
};
