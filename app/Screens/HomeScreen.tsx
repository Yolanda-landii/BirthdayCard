import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../(tabs)/index';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to the Birthday Card App!</Text>
    <Button title="Create a Card" onPress={() => navigation.navigate('CardEditor')} />
    <Button title="My Cards" onPress={() => navigation.navigate('CardList')} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default HomeScreen;
