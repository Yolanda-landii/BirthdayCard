import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { CardContext } from '../(tabs)/index';

const CardListScreen = ({ navigation }) => {
  const { cards } = useContext(CardContext);

  return (
    <View>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('CardDetail', { id: item.id })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CardListScreen;
