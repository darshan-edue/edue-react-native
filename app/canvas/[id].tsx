import { View, TouchableOpacity, ScrollView, Text, Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DrawingCanvas from '../components/DrawingCanvas';
import MarkdownRenderer from '../components/MarkdownRenderer';
import MCQOptions from '../components/MCQOptions';
import Sidebar from '../components/Sidebar';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'wrong' | 'upcoming';
}

export default function CanvasScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const sidebarAnimation = useRef(new Animated.Value(-300)).current;
  const allowMultiple = true;

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

  // Example tasks - replace with your actual tasks
  const tasks: Task[] = [
    { id: '1', title: 'Introduction to Drawing Basics', status: 'completed' },
    { id: '2', title: 'Understanding Lines and Strokes', status: 'completed' },
    { id: '3', title: 'Basic Shape Drawing', status: 'completed' },
    { id: '4', title: 'Perspective Drawing Fundamentals', status: 'completed' },
    { id: '5', title: 'Shading Techniques', status: 'completed' },
    { id: '6', title: 'Color Theory Basics', status: 'completed' },
    { id: '7', title: 'Drawing from Observation', status: 'current' },
    { id: '8', title: 'Advanced Shading Methods', status: 'upcoming' },
    { id: '9', title: 'Figure Drawing Basics', status: 'upcoming' },
    { id: '10', title: 'Portrait Drawing Techniques', status: 'upcoming' },
    { id: '11', title: 'Landscape Drawing', status: 'upcoming' },
    { id: '12', title: 'Still Life Composition', status: 'upcoming' },
    { id: '13', title: 'Gesture Drawing Practice', status: 'upcoming' },
    { id: '14', title: 'Anatomy for Artists', status: 'upcoming' },
    { id: '15', title: 'Digital Drawing Tools', status: 'upcoming' },
    { id: '16', title: 'Mixed Media Techniques', status: 'upcoming' },
    { id: '17', title: 'Composition Principles', status: 'upcoming' },
    { id: '18', title: 'Light and Shadow Study', status: 'upcoming' },
    { id: '19', title: 'Texture Drawing Methods', status: 'upcoming' },
    { id: '20', title: 'Character Design Basics', status: 'upcoming' },
    { id: '21', title: 'Environmental Sketching', status: 'upcoming' },
    { id: '22', title: 'Advanced Perspective', status: 'upcoming' },
    { id: '23', title: 'Color Harmony Practice', status: 'upcoming' },
    { id: '24', title: 'Drawing from Imagination', status: 'upcoming' },
    { id: '25', title: 'Final Project Planning', status: 'upcoming' },
    { id: '26', title: 'Portfolio Development', status: 'upcoming' },
    { id: '27', title: 'Art Style Exploration', status: 'upcoming' },
    { id: '28', title: 'Creative Drawing Exercises', status: 'upcoming' },
    { id: '29', title: 'Final Project Submission', status: 'upcoming' },
    { id: '30', title: 'Course Review and Feedback', status: 'upcoming' },
  ];

  useEffect(() => {
    Animated.timing(sidebarAnimation, {
      toValue: isSidebarOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSidebarOpen]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions((prev) => {
      if (allowMultiple) {
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        }
        return [...prev, optionId];
      } else {
        return [optionId];
      }
    });
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
    setIsSidebarOpen(false);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Main Content */}
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

      {/* Menu Button */}
      <TouchableOpacity 
        className="absolute top-5 left-4 z-40 p-2 bg-black rounded-full"
        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Ionicons name="menu" size={18} color="white" />
      </TouchableOpacity>

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        tasks={tasks}
        selectedTask={selectedTask}
        onTaskSelect={handleTaskSelect}
        sidebarAnimation={sidebarAnimation}
      />
    </View>
  );
} 