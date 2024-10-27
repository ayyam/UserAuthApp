// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../theme/colors';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export default function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...rest}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
