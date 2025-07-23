import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  selector: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  item: {
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  bold: { fontWeight: 'bold' },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});