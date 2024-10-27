// app/index.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { getCurrentUser, logoutUser, getUsers } from '../services/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    // AsyncStorage.clear();
    const checkUser = async () => {
      const user = await getCurrentUser();
      setIsLoggedIn(!!user);
    };
    checkUser();
  }, []);

  const fetchUserDetails = async () => {
    const username = await getCurrentUser();
    const users = await getUsers();
    if (username) {
      setUserDetails(users[username]);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUserDetails(null);
    router.replace('/(auth)/login'); // Navigate back to login on logout
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/sample_logo.jpg')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to our application!</Text>

      {isLoggedIn ? (
        <>
          <Pressable style={styles.button} onPress={fetchUserDetails}>
            <Text style={styles.buttonText}>Fetch User Details</Text>
          </Pressable>
          {userDetails && (
            <View style={styles.detailsContainer}>
              <Text>Username: {userDetails.username}</Text>
              <Text>Email: {userDetails.email}</Text>
              <Text>Mobile: {userDetails.mobile}</Text>
            </View>
          )}
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </>
      ) : (
        <Pressable style={styles.button}>
          <Link href="/(auth)/login" style={styles.buttonText}>Continue</Link>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#50C878',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
