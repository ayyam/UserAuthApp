// src/components/Input.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import colors from '../theme/colors';

interface InputProps extends TextInputProps {
    placeholder?: string;
}

export default function Input({ placeholder, ...rest }: InputProps) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderColor: colors.textSecondary,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
});
