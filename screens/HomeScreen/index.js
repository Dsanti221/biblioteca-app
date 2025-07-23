import React, { useEffect, useState } from 'react';
import {  View, Text,  TextInput,  FlatList,  Button,  TouchableOpacity,} from 'react-native';
import styles from './styles';
import { getPosts } from '../../utils/api';
import PostModal from '../../components/PostModal';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    obtenerPosts();
  }, []);

  const obtenerPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    }
  };

  const filtrados = posts.filter(post =>
    post.title.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const desde = (paginaActual - 1) * porPagina;
  const hasta = desde + porPagina;
  const datosPaginados = filtrados.slice(desde, hasta);

  const cambiarPagina = (direccion) => {
    if (direccion === 'anterior' && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    } else if (direccion === 'siguiente' && paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detalle', { id: item.id })}
    >
      <Text style={styles.bold}>ID:</Text>
      <Text>{item.id}</Text>
      <Text style={styles.bold}>Título:</Text>
      <Text>{item.title}</Text>
      <Text style={styles.bold}>Contenido:</Text>
      <Text>{item.body.substring(0, 10)}...</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Biblioteca Pública DSanti</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtrar por título"
        value={filtro}
        onChangeText={text => {
          setFiltro(text);
          setPaginaActual(1);
        }}
      />

      <View style={styles.selector}>
        <Text>Mostrar por página:</Text>
        <Picker
          selectedValue={porPagina}
          style={{ width: 100 }}
          onValueChange={(value) => {
            setPorPagina(value);
            setPaginaActual(1);
          }}
        >
          <Picker.Item label="10" value={10} />
          <Picker.Item label="20" value={20} />
          <Picker.Item label="50" value={50} />
        </Picker>
      </View>

      <FlatList
        data={datosPaginados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <View style={styles.pagination}>
        <Button title="◀ Anterior" onPress={() => cambiarPagina('anterior')} />
        <Text style={{ marginHorizontal: 10 }}>Página {paginaActual}</Text>
        <Button title="Siguiente ▶" onPress={() => cambiarPagina('siguiente')} />
      </View>

      <Button title="➕ Crear nuevo libro" onPress={() => setMostrarModal(true)} />

      <PostModal visible={mostrarModal} onClose={() => setMostrarModal(false)} />
    </View>
  );
};

export default HomeScreen;