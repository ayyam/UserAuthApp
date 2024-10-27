// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';


const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// Get all registered users
export async function getUsers() {
  const usersData = await AsyncStorage.getItem(USERS_KEY);
  return usersData ? JSON.parse(usersData) : {};
}

// Register a new user with streamlined error handling
export async function registerUser(username: string, email: string, mobile: string, password: string) {
  const users = await getUsers();

  console.log('Current Users in Storage:', users);

  // Username Check
  if (users[username]) {
    console.log('Username already exists:', username);
    return { success: false, message: 'Username already exists. Please choose a different username.' };
  }

  // Email Check
  const emailConflict = Object.values(users).some((user: any) => user.email === email);
  if (emailConflict) {
    console.log('Email already exists:', email);
    return { success: false, message: 'Email is already in use. Please use a different email.' };
  }

  // Save the new user
  users[username] = { email, mobile, password };
  try {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(CURRENT_USER_KEY, username); // Set current user
    return { success: true };
  } catch (error) {
    console.error('Error saving user:', error);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
}

// Login a user
export async function loginUser(username: string, password: string) {
  const users = await getUsers();
  if (users[username] && users[username].password === password) {
    await AsyncStorage.setItem(CURRENT_USER_KEY, username); // Set current user
    return { success: true };
  }
  return { success: false, message: 'Invalid username or password' };
}

// Get current logged-in user
export async function getCurrentUser() {
  return await AsyncStorage.getItem(CURRENT_USER_KEY);
}

// Logout the user
export async function logoutUser() {
  await AsyncStorage.removeItem(CURRENT_USER_KEY); // Remove current user
}
