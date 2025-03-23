import { View, TouchableOpacity, ScrollView, Text, Animated, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DrawingCanvas from '../components/DrawingCanvas';
import MarkdownRenderer from '../components/MarkdownRenderer';
import MCQOptions from '../components/MCQOptions';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';

export default function CanvasScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const sidebarAnimation = useRef(new Animated.Value(-300)).current;
  const { width: screenWidth } = Dimensions.get('window');
  const sidebarWidth = screenWidth * 0.3;
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
  const tasks = [
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
      toValue: isSidebarOpen ? 0 : -sidebarWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSidebarOpen]);

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

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId);
    setIsSidebarOpen(false); // Close sidebar when task is selected
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

      {/* Overlay */}
      {isSidebarOpen && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 35,
          }}
          onPress={() => setIsSidebarOpen(false)}
          activeOpacity={1}
        />
      )}

      {/* Sidebar */}
      <Animated.View 
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: sidebarWidth,
          backgroundColor: 'white',
          transform: [{ translateX: sidebarAnimation }],
          zIndex: 45,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className="p-4 border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-800">Tasks</Text>
        </View>
        <ScrollView className="flex-1">
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              className={`p-4 border-b border-gray-100 ${
                selectedTask === task.id ? 'bg-blue-50' : ''
              }`}
              onPress={() => handleTaskSelect(task.id)}
            >
              <View className="flex-row items-center">
                <View className={`w-3 h-3 rounded-full mr-3 ${
                  task.status === 'completed' ? 'bg-green-500' :
                  task.status === 'current' ? 'bg-blue-500' :
                  task.status === 'wrong' ? 'bg-red-500' :
                  'bg-gray-300'
                }`} />
                <Text 
                  className={`text-gray-800 ${
                    task.status === 'completed' ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {task.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
} 