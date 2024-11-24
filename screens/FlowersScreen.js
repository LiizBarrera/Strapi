import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import API from './api';

const FlwerScreen = () => {
  const [Flwer, setFlwer] = useState([]);

  useEffect(() => {
    fetchFlwer();
  }, []);

  const fetchFlwer = async () => {
    try {
      const response = await API.get('/Flwer');
      setFlwer(response.data.data); // Ajusta según la respuesta del backend.
    } catch (error) {
      console.error('Error fetching Flwer:', error);
    }
  };

  const renderFlower = ({ item }) => (
    <View style={styles.flowerContainer}>
      <Text style={styles.flowerText}>Nombre: {item.attributes.nombre}</Text>
      <Text style={styles.flowerText}>Tipo: {item.attributes.tipo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Flwer}
        renderItem={renderFlower}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  flowerContainer: { padding: 10, marginVertical: 5, backgroundColor: '#eee' },
  flowerText: { fontSize: 16 },
});

export default FlwerScreen;
