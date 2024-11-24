import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { loginUser } from '../services/strapi';

const LoginScreen = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(identifier, password);
      setMessage(`Bienvenido ${response.user.username}`);
      // Redirigir a la pantalla principal
      navigation.navigate('Home', { jwt: response.jwt });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Correo o Usuario</Text>
      <TextInput
        style={styles.input}
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        ¿No tienes una cuenta? Regístrate
      </Text>
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center' },
  label: { fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, padding: 8, marginBottom: 16 },
  link: { color: 'blue', marginTop: 16, textAlign: 'center' },
  message: { marginTop: 16, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});

export default LoginScreen;
