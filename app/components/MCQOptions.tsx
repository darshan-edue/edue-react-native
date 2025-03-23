import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Option {
  id: string;
  text: string;
}

interface MCQOptionsProps {
  options: Option[];
  allowMultiple?: boolean;
  selectedOptions: string[];
  onOptionSelect: (optionId: string) => void;
}

export default function MCQOptions({
  options,
  allowMultiple = false,
  selectedOptions,
  onOptionSelect,
}: MCQOptionsProps) {
  return (
    <View className="px-14 mt-4">
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option.id);
        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => onOptionSelect(option.id)}
            className={`flex-row items-center p-3 mb-2 rounded-lg border ${
              isSelected ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200'
            }`}
          >
            {allowMultiple ? (
              <Ionicons
                name={isSelected ? 'checkbox' : 'square-outline'}
                size={24}
                color={isSelected ? '#3b82f6' : '#6b7280'}
              />
            ) : (
              <Ionicons
                name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                size={24}
                color={isSelected ? '#3b82f6' : '#6b7280'}
              />
            )}
            <Text className="ml-3 text-base text-gray-800">{option.text}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
} 