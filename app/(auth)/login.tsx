// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Input from '../../components/Input';
import styles from '../../theme/styles';
import { loginUser } from '../../services/storage';

import { MaterialIcons } from '@expo/vector-icons';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const handleLogin = async () => {
        if (!username || !password) {
            setError('Both username and password are required.');
            return;
        }


        const result = await loginUser(username, password);

        if (result.success) {
            setError('');

            setTimeout(() => router.replace('/'), 500);
        } else {
            setError(result.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/sample_logo.jpg')} style={localStyles.logo} />
            <Text style={localStyles.title}>Login</Text>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={localStyles.passwordContainer}>
                        <TextInput
                            style={localStyles.passwordInput}
                            placeholder="Password"
                            secureTextEntry={!isPasswordVisible}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <MaterialIcons
                                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                                size={24}
                                color="#888"
                            />
                        </Pressable>
                    </View>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Pressable style={localStyles.button} onPress={handleLogin}>
                    <Text style={localStyles.buttonText}>Login</Text>
                </Pressable>

                {/* Register Link */}
                <Text style={localStyles.registerText}>
                    Not registered yet? <Link href="/(auth)/register" style={localStyles.registerLink}>Register Now</Link>
                </Text>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#50C878',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
    },
    registerLink: {
        color: '#4a90e2',
        fontWeight: 'bold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    passwordInput: {
        flex: 1,
        height: 48,
    },
});
