import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import EditableText from '../../components/EditableText';
import ImagePickerComponent from '../../components/ImagePicker';
import globalStyles from '../../Styles/styles';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CardContext } from '../(tabs)/index';

type RootStackParamList = {
  Home: undefined;
  CardEditor: { id?: number } | undefined;
  CardPreview: { name: string; message: string; image: string | null };
  CardList: undefined;
  CardDetail: { id: number };
};

type CardEditorRouteProp = RouteProp<RootStackParamList, 'CardEditor'>;
type CardEditorNavigationProp = StackNavigationProp<RootStackParamList, 'CardEditor'>;

const CardEditorScreen: React.FC = () => {
  const { addCard, updateCard, cards } = useContext(CardContext);
  const navigation = useNavigation<CardEditorNavigationProp>();
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
    if (!name || !message) {
      Alert.alert('Oops!', 'Please fill in all the required fields before saving.');
    } else if (!image) {
      Alert.alert('Almost there!', 'Don\'t forget to add a birthday image!');
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
    <ScrollView style={globalStyles.container}>
      <View style={styles.contentContainer}>
        <Text style={[globalStyles.title, styles.title]}>
          {isEditing ? 'Edit Your Card' : 'Create Your Birthday Card'}
        </Text>
        
        <View style={styles.formContainer}>
          <EditableText 
            label="Recipient's Name" 
            value={name} 
            onChangeText={setName}
          />
          
          <EditableText 
            label="Your Birthday Message" 
            value={message} 
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={4}
          />
          
          <View style={styles.imageSection}>
            <Text style={[globalStyles.label, styles.imageLabel]}>Add a Birthday Image</Text>
            <ImagePickerComponent onImagePicked={setImage} />
            {image && (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: image }} style={[globalStyles.image, styles.imagePreview]} />
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={[globalStyles.button, styles.saveButton]} 
            onPress={handleSave}
          >
            <Text style={globalStyles.buttonText}>
              {isEditing ? 'Update Card' : 'Create Card'}
            </Text>
          </TouchableOpacity>
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
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  imageLabel: {
    marginBottom: 15,
  },
  imagePreviewContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  imagePreview: {
    width: 150,
    height: 150,
  },
  saveButton: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default CardEditorScreen;
