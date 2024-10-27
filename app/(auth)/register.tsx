// app/(auth)/register.tsx
import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Input from '../../components/Input';
import styles from '../../theme/styles';
import { registerUser } from '../../services/storage';

import { MaterialIcons } from '@expo/vector-icons';

export default function Register() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const isValidEmail = (email: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleRegister = async () => {
        setError(''); // Clear error before validation

        if (!username || !email || !mobile || !password) {
            setError('All fields are required.');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email.');
            return;
        }

        if (password.length < 6) {
            setError('Password should be at least 6 characters.');
            return;
        }

        try {
            const result = await registerUser(username, email, mobile, password);
            console.log('Registration Result:', result);

            if (result.success) {
                setError(''); // Clear any previous errors
                alert('User Registered successfully. Please login')
                setTimeout(() => router.replace('/(auth)/login'), 500); // Navigate on success
            } else {
                setError(result.message); // Display the error message from registration
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Registration Error:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/sample_logo.jpg')} style={localStyles.logo} />
            <Text style={localStyles.title}>Register</Text>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        value={mobile}
                        onChangeText={(text) => setMobile(text)}
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

                <Pressable style={localStyles.button} onPress={handleRegister}>
                    <Text style={localStyles.buttonText}>Register</Text>
                </Pressable>

                {/* Login Link */}
                <Text style={localStyles.loginText}>
                    Already Registered? <Link href="/(auth)/login" style={localStyles.loginLink}>Login</Link>
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
    loginText: {
        marginTop: 20,
        fontSize: 14,
        textAlign: 'center',
    },
    loginLink: {
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
