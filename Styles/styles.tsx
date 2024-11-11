// styles/styles.tsx
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f61',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff6f61',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#ff6f61',
    fontSize: 18,
    paddingVertical: 8,
    marginVertical: 10,
    color: '#333',
  },
});

export default globalStyles;
