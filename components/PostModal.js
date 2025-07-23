import React, { useState } from 'react';
import { Modal, View, TextInput, Button, Text, Alert } from 'react-native';
import styles from './PostModal.styles';
import { Picker } from '@react-native-picker/picker';
import { createPost } from '../utils/api';

const PostModal = ({ visible, onClose }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(1);

  const crearPost = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Campos obligatorios', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await createPost({ title, body, userId });
      Alert.alert('✅ Libro creado', 'El libro ha sido creado exitosamente.');

      //Limpiar los campos
      setTitle('');
      setBody('');
      setUserId(1);

      //Cerrar el modal despues de 1 segundo
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el libro. Intenta nuevamente.');
      console.error("Error al crear el libro:", error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <Text style={styles.header}>Crear nuevo libro</Text>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Contenido"
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={4}
          style={[styles.input, { height: 100 }]}
        />
        <Text>ID del Usuario</Text>
        <Picker
          selectedValue={userId}
          onValueChange={(value) => setUserId(value)}
          style={styles.input}
        >
          {[1, 2, 3, 4, 5].map(id => (
            <Picker.Item key={id} label={`${id}`} value={id} />
          ))}
        </Picker>
        <View style={styles.buttonRow}>
          <Button title="Cancelar" onPress={onClose} />
          <Button title="Crear" onPress={crearPost} />
        </View>
      </View>
    </Modal>
  );
};

export default PostModal;