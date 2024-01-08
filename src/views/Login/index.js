import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { styles } from "./style";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { serverConfig } from '../../config/config';
import { useUser } from '../../context/UserContext';

export function Login({ navigation }) {
    const { theme } = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user, login } = useUser();

    const fetchUser = async () => {
        try {
            const url = `${serverConfig.apiUrl}:${serverConfig.port}/users?username=${username}`
            const response = await fetch(url);
            const data = await response.json();
    
            return data[0];
        } catch (error) {
            console.error('Error fetching routes', error);
        }
    };

    const handleLogin = async () => {
        const userData = await fetchUser();
        
        const userDataContext = {
            name: userData.name,
            surname: userData.surname,
            email: userData.email
          };
        
        if (!userData) {
            Alert.alert('Incorrect username', 'Incorrect username, please try again.');
            return;
        }

        if (password === userData.password) {
            login(userDataContext);
            navigation.navigate('DrawerNavigation');
        }
        else {
            Alert.alert('Incorrect password', 'Incorrect password, please try again.');
            return;
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={theme.background}>
            <View style={theme.container}>
                <View style={{ flex: 1, top: 60 }}>
                    <Text style={styles.title}>Login</Text>
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
                    <TouchableOpacity style={style.loginButton} onPress={handleLogin}>
                        <Text style={theme.text}>Login</Text>
                    </TouchableOpacity>
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
        marginTop: 30
    },
    input: {
        fontSize: 16,
        color: '#333',
    },
    loginButton: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 80
    },
    registerButton: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20
    }
};
