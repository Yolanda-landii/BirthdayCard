// components/EditableText.tsx
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import globalStyles from '../Styles/styles'; 

interface EditableTextProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ label, value, onChangeText }) => {
  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={globalStyles.label}>{label}</Text>
      <TextInput
        style={globalStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </View>
  );
};

export default EditableText;
