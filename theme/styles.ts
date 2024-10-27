// src/theme/styles.ts
import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 8,
  },
});
