// components/EditableText.tsx
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import globalStyles from '../Styles/styles';

interface EditableTextProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
}

const EditableText: React.FC<EditableTextProps> = ({ 
  label, 
  value, 
  onChangeText,
  multiline = false,
  numberOfLines = 1
}) => {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.label, styles.label]}>{label}</Text>
      <TextInput
        style={[
          globalStyles.input,
          multiline && styles.multilineInput,
          styles.input
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor="#999"
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  input: {
    minHeight: 50,
  },
  multilineInput: {
    height: 120,
    paddingTop: 15,
  },
});

export default EditableText;
