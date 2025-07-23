import React, { useEffect, useState } from 'react';
import { View, Text, Button,} from 'react-native';
import styles from './styles';
import { getPostById } from '../../utils/api';

const DetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
  getPostById(id)
    .then(res => setPost(res.data))
    .catch(error => console.error('Error al obtener el post:', error));
  }, []);

  return (
    <View style={styles.container}>
      {post ? (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
          <Button title="Volver" onPress={() => navigation.goBack()} />
        </>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default DetailScreen;