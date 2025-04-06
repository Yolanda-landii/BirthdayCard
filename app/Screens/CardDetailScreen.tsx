import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { CardContext } from '../(tabs)/index';
import globalStyles from '../../Styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  CardEditor: { id?: number } | undefined;
  CardPreview: { name: string; message: string; image: string | null };
  CardList: undefined;
  CardDetail: { id: number };
};

type CardDetailNavigationProp = StackNavigationProp<RootStackParamList, 'CardDetail'>;

interface CardDetailScreenProps {
  route: { params: { id: number } };
  navigation: CardDetailNavigationProp;
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({ route, navigation }) => {
  const { cards, deleteCard } = useContext(CardContext);
  const card = cards.find((c: { id: number }) => c.id === route.params.id);

  const handleDelete = () => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteCard(card.id);
            navigation.navigate('CardList');
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!card) {
    return (
      <View style={[globalStyles.container, styles.container]}>
        <Text style={styles.errorText}>Card not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={styles.container}>
        <View style={styles.card}>
          {card.image && (
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: card.image }} 
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>
          )}
          
          <View style={styles.cardContent}>
            <Text style={styles.recipientName}>Dear {card.name},</Text>
            <Text style={styles.message}>{card.message}</Text>
            <Text style={styles.signature}> 🎉</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[globalStyles.button, styles.button]}
            onPress={() => navigation.navigate('CardEditor', { id: card.id })}
          >
            <Text style={globalStyles.buttonText}>Edit Card</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[globalStyles.button, styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={globalStyles.buttonText}>Delete Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
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
    width: '100%',
    maxWidth: 400,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#ff6f61',
  },
  cardContent: {
    padding: 8,
  },
  recipientName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginBottom: 12,
    fontFamily: 'System',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
    fontFamily: 'System',
  },
  signature: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6f61',
    textAlign: 'right',
    fontFamily: 'System',
  },
  buttonContainer: {
    marginTop: 25,
    gap: 12,
    width: '100%',
    maxWidth: 400,
  },
  button: {
    width: '100%',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  errorText: {
    fontSize: 18,
    color: '#ff4444',
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default CardDetailScreen;
