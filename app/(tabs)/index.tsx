import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import CardEditorScreen from '../Screens/CardEditorScreen';
import CardPreview from '../Screens/CardPreview';
import CardListScreen from '../Screens/CardListScreen';
import CardDetailScreen from '../Screens/CardDetailScreen';
import globalStyles from '../../Styles/styles';

// Type for navigation params
type RootStackParamList = {
  Home: undefined;
  CardEditor: { id?: number } | undefined;
  CardPreview: { name: string; message: string; image: string | null };
  CardList: undefined;
  CardDetail: { id: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export const CardContext = createContext<any>(null);

export default function App() {
  const [cards, setCards] = useState<{ id: number; name: string; message: string; image: string | null }[]>([]);

  // Load cards from AsyncStorage on initial render
  useEffect(() => {
    const loadCards = async () => {
      try {
        const savedCards = await AsyncStorage.getItem('cards');
        if (savedCards) setCards(JSON.parse(savedCards));
      } catch (error) {
        console.error('Failed to load cards:', error);
      }
    };
    loadCards();
  }, []);

  // Save cards to AsyncStorage whenever `cards` changes
  useEffect(() => {
    const saveCards = async () => {
      try {
        await AsyncStorage.setItem('cards', JSON.stringify(cards));
      } catch (error) {
        console.error('Failed to save cards:', error);
      }
    };
    saveCards();
  }, [cards]);

  // Add a new card and save to AsyncStorage
  const addCard = (card: { id: number; name: string; message: string; image: string | null }) => {
    const newCards = [...cards, card];
    setCards(newCards);
  };

  // Update a card and save to AsyncStorage
  const updateCard = (id: number, updatedCard: { name: string; message: string; image: string | null }) => {
    const newCards = cards.map((card) => (card.id === id ? { ...card, ...updatedCard } : card));
    setCards(newCards);
  };

  // Delete a card and update AsyncStorage
  const deleteCard = (id: number) => {
    const newCards = cards.filter((card) => card.id !== id);
    setCards(newCards);
  };

  return (
    <CardContext.Provider value={{ cards, addCard, updateCard, deleteCard }}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Birthday Card App',
            headerStyle: globalStyles.container,
            headerTitleStyle: globalStyles.title,
            headerTintColor: '#ff6f61',
          }}
        />
        <Stack.Screen
          name="CardEditor"
          component={CardEditorScreen}
          options={{
            title: 'Edit Your Card',
            headerStyle: globalStyles.container,
            headerTitleStyle: globalStyles.title,
            headerTintColor: '#ff6f61',
          }}
        />
        <Stack.Screen
          name="CardPreview"
          component={CardPreview}
          options={{
            title: 'Preview Your Card',
            headerStyle: globalStyles.container,
            headerTitleStyle: globalStyles.title,
            headerTintColor: '#ff6f61',
          }}
        />
        <Stack.Screen
          name="CardList"
          component={CardListScreen}
          options={{ title: 'My Cards' }}
        />
        <Stack.Screen
          name="CardDetail"
          component={CardDetailScreen}
          options={{ title: 'Card Details' }}
        />
      </Stack.Navigator>
    </CardContext.Provider>
  );
}
