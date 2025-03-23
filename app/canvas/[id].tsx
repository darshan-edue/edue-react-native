import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DrawingCanvas from '../components/DrawingCanvas';
import MarkdownRenderer from '../components/MarkdownRenderer';
import MCQOptions from '../components/MCQOptions';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function CanvasScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const allowMultiple = true; // Move this to state if you need to change it dynamically

  // Example markdown content - you can replace this with your actual content
  const markdownContent = `# Welcome to the Canvas

This is a markdown preview panel that supports various markdown features:

## Features
- Headers
- Lists
- Code blocks
- And more!

\`\`\`javascript
const example = "This is a code block";
console.log(example);
\`\`\`

Feel free to edit this content with your own markdown!`;

  // Example MCQ options
  const mcqOptions = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
    { id: '4', text: 'Option 4' },
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions((prev) => {
      if (allowMultiple) {
        // For multiple selection, toggle the option
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        }
        return [...prev, optionId];
      } else {
        // For single selection, just set the selected option
        return [optionId];
      }
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      <TouchableOpacity className="absolute top-5 left-4 z-10 p-2 bg-black rounded-full">
        <Ionicons name="menu" size={18} color="white" />
      </TouchableOpacity>
      <View className="flex-1 flex-row">
        <ScrollView className="flex-1 bg-white px-2 py-1">
          <View>
            <MarkdownRenderer content={markdownContent} />
            <MCQOptions
              options={mcqOptions}
              allowMultiple={allowMultiple}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
            />
          </View>
        </ScrollView>
        <View className="flex-1 bg-gray-100">
          <DrawingCanvas courseId={id} />
        </View>
      </View>
    </View>
  );
} 