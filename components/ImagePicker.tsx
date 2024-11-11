// components/ImagePicker.tsx
import React from 'react';
import { View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import globalStyles from '../Styles/styles'; 

interface ImagePickerProps {
  onImagePicked: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImagePicked }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <View style={{ marginVertical: 10, alignItems: 'center' }}>
      <Button title="Pick an Image" onPress={pickImage} color="#ff6f61" />
    </View>
  );
};

export default ImagePickerComponent;
