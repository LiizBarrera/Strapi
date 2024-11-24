import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchFlwer } from '../services/strapi';

const HomeScreen = ({ route }) => {
  const { jwt } = route.params;
  const [Flwer, setFlwer] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFlwer = async () => {
      try {
        const response = await fetchFlwer(jwt);
        setFlwer(response.data);
      } catch (err) {
        setError('Error al cargar las flores');
      }
    };
    loadFlwer();
  }, [jwt]);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={Flwer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.attributes.name}</Text>
            <Text style={styles.type}>{item.attributes.type}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  error: { color: 'red', textAlign: 'center', marginVertical: 16 },
  card: { padding: 16, borderWidth: 1, marginBottom: 8 },
  name: { fontWeight: 'bold', fontSize: 16 },
  type: { color: 'gray' },
});

export default HomeScreen;
