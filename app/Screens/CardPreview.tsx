// screens/CardPreview.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import globalStyles from '../../Styles/styles';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  CardEditor: { id?: number } | undefined;
  CardPreview: { name: string; message: string; image: string | null };
  CardList: undefined;
  CardDetail: { id: number };
};

// Define the expected params
interface CardPreviewProps {
  route: RouteProp<RootStackParamList, 'CardPreview'>; 
}

const CardPreview: React.FC<CardPreviewProps> = ({ route }) => {
  const { name, message, image } = route.params; 

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.contentContainer}>
        <Text style={[globalStyles.title, styles.title]}>Your Birthday Card</Text>
        
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            {image && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.cardImage} />
              </View>
            )}
            
            <View style={styles.cardContent}>
              <Text style={styles.recipientName}>Dear {name},</Text>
              <Text style={styles.message}>{message}</Text>
              <Text style={styles.signature}>Happy Birthday! 🎉</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 30,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#ffd6d6',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ff6f61',
  },
  cardContent: {
    padding: 10,
  },
  recipientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginBottom: 15,
    fontFamily: 'System',
  },
  message: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
    marginBottom: 20,
    fontFamily: 'System',
  },
  signature: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6f61',
    textAlign: 'right',
    fontFamily: 'System',
  },
});

export default CardPreview;
