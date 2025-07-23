import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Inicio'); 
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📖 Biblioteca AppDSanti</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.cargando} />
      <Text style={styles.textoCargando}>Cargando libros...</Text>
    </View>
  );
};

export default SplashScreen;
