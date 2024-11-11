import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { CardContext } from '../(tabs)/index';

const CardDetailScreen = ({ route, navigation }) => {
  const { cards, deleteCard } = useContext(CardContext);
  const card = cards.find((c) => c.id === route.params.id);

  const handleDelete = () => {
    deleteCard(card.id);
    navigation.navigate('CardList');
  };

  return (
    <View>
      <Text>{card?.name}</Text>
      <Text>{card?.message}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('CardEditor', { id: card.id })} /> 
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

export default CardDetailScreen;
