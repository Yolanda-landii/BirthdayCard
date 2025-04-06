import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
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

type CardListNavigationProp = StackNavigationProp<RootStackParamList, 'CardList'>;

interface CardListScreenProps {
  navigation: CardListNavigationProp;
}

interface Card {
  id: number;
  name: string;
  message: string;
  image: string | null;
}

const CardListScreen: React.FC<CardListScreenProps> = ({ navigation }) => {
  const { cards } = useContext(CardContext);

  const renderCard = ({ item }: { item: Card }) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => navigation.navigate('CardDetail', { id: item.id })}
    >
      <View style={styles.card}>
        {item.image && (
          <Image 
            source={{ uri: item.image }} 
            style={styles.cardImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPreview} numberOfLines={2}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={[globalStyles.title, styles.title]}>My Birthday Cards</Text>
      {cards.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No cards yet!</Text>
          <Text style={styles.emptyStateSubtext}>Create your first birthday card to get started.</Text>
        </View>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 15,
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ffd6d6',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginBottom: 6,
    fontFamily: 'System',
  },
  cardPreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'System',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f61',
    marginBottom: 10,
    fontFamily: 'System',
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default CardListScreen;
