import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { registerUser } from '../services/strapi';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const user = await registerUser(username, email, password);
      setMessage(`Usuario registrado: ${user.user.username}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de usuario</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 8 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8 },
  message: { marginTop: 16, fontSize: 16, fontWeight: 'bold' },
});

export default RegisterScreen;
