import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../(tabs)/index';
import globalStyles from '../../Styles/styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => (
  <View style={[globalStyles.container, styles.container]}>
    <Image
      source={require('../../assets/birthday-cake.png')}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={[globalStyles.title, styles.title]}>🎉 Birthday Card Maker 🎉</Text>
    <Text style={styles.subtitle}>Create beautiful birthday cards for your loved ones!</Text>
    
    <TouchableOpacity
      style={[globalStyles.button, styles.button]}
      onPress={() => navigation.navigate('CardEditor')}
    >
      <Text style={globalStyles.buttonText}>Create a New Card</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
      style={[globalStyles.button, styles.button, { backgroundColor: '#ff9e80' }]}
      onPress={() => navigation.navigate('CardList')}
    >
      <Text style={globalStyles.buttonText}>View My Cards</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'System',
  },
  button: {
    width: '100%',
    marginVertical: 10,
  },
});

export default HomeScreen;
