import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import EditableText from '../../components/EditableText';
import ImagePickerComponent from '../../components/ImagePicker';
import globalStyles from '../../Styles/styles';
// import { CardContext } from '../App';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList , CardContext} from '../(tabs)/index';

type CardEditorRouteProp = RouteProp<RootStackParamList, 'CardEditor'>;

const CardEditorScreen: React.FC = () => {
  const { addCard, updateCard, cards } = useContext(CardContext);
  const navigation = useNavigation();
  const route = useRoute<CardEditorRouteProp>();

  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const isEditing = route.params?.id !== undefined;
  const cardId = route.params?.id;

  useEffect(() => {
    if (isEditing) {
      const card = cards.find((c: any) => c.id === cardId);
      if (card) {
        setName(card.name);
        setMessage(card.message);
        setImage(card.image);
      }
    }
  }, [cardId]);

  const handleSave = () => {
    if (!name || !message || !image) {
      Alert.alert('Please complete all fields before saving the card.');
    } else {
      if (isEditing) {
        updateCard(cardId!, { name, message, image });
      } else {
        addCard({ id: Date.now(), name, message, image });
      }
      navigation.navigate('CardList');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Create Your Birthday Card</Text>
      <EditableText label="Recipient's Name:" value={name} onChangeText={setName} />
      <EditableText label="Message:" value={message} onChangeText={setMessage} />
      <ImagePickerComponent onImagePicked={setImage} />
      {image && <Image source={{ uri: image }} style={globalStyles.image} />}
      <TouchableOpacity style={globalStyles.button} onPress={handleSave}>
        <Text style={globalStyles.buttonText}>{isEditing ? 'Update' : 'Save'} Card</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardEditorScreen;
