// screens/CardPreview.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import globalStyles from '../../Styles/styles';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../(tabs)/index';

// Define the expected params
interface CardPreviewProps {
  route: RouteProp<RootStackParamList, 'CardPreview'>; 
}

const CardPreview: React.FC<CardPreviewProps> = ({ route }) => {
  const { name, message, image } = route.params; 

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Card Preview</Text>
      <Text style={styles.previewText}>Recipient's Name: {name}</Text>
      <Text style={styles.previewText}>Message: {message}</Text>
      {image && <Image source={{ uri: image }} style={globalStyles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  previewText: {
    fontSize: 18,
    fontWeight: 'normal',
    marginVertical: 10,
  },
});

export default CardPreview;
