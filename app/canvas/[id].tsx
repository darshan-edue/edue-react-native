import { View, TouchableOpacity, ScrollView, Text, Animated, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DrawingCanvas from '../components/DrawingCanvas';
import MarkdownRenderer from '../components/MarkdownRenderer';
import MCQOptions from '../components/MCQOptions';
import Sidebar from '../components/Sidebar';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_TASKS_FOR_A_WORKSHEET } from '../graphql/queries/getAllTasksForAWorksheet';
import { GET_CURRENT_TASK } from '../graphql/queries/getCurrentTask';
import Toast from 'react-native-toast-message';

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const sidebarAnimation = useRef(new Animated.Value(-350)).current;
  const allowMultiple = true;

  // Fetch current task data
  const { loading: currentTaskLoading, data: currentTaskData } = useQuery(GET_CURRENT_TASK, {
    variables: { id: id ? String(id) : null },
    onError: (error) => {
      console.error('Error fetching current task:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load task content. Please try again later.',
      });
    }
  });

  // Fetch tasks data using GraphQL query
  const { loading, error, data } = useQuery(GET_ALL_TASKS_FOR_A_WORKSHEET, {
    variables: { parent: id ? String(id) : null },
    onCompleted: (data) => {
      if (data?.myAssignments?.edges) {
        // Transform the data to match our Task interface
        const fetchedTasks = data.myAssignments.edges.map((edge: any, index: number) => ({
          id: edge.node.id,
          title: edge.node.task?.name || `Task ${index + 1}`, // Use task name if available, otherwise use index
          status: edge.node.endTime ? 'completed' : 
                 edge.node.startTime ? 'current' : 
                 'upcoming',
        }));
        setTasks(fetchedTasks);
      }
    },
    onError: (error) => {
      console.error('Error fetching tasks:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load tasks. Please try again later.',
      });
    }
  });

  // Example MCQ options
  const mcqOptions = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
    { id: '4', text: 'Option 4' },
  ];

  useEffect(() => {
    Animated.timing(sidebarAnimation, {
      toValue: isSidebarOpen ? 0 : -350,
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

  if (currentTaskLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const taskContent = currentTaskData?.currentTask?.task?.content || '';
  const isMcq = currentTaskData?.currentTask?.task?.isMcq || false;

  return (
    <View className="flex-1 bg-gray-100">
      {/* Main Content */}
      <View className="flex-1 flex-row">
        <ScrollView className="flex-1 bg-white px-2 py-1">
          <View>
            <MarkdownRenderer content={taskContent} />
            {isMcq && (
              <MCQOptions
                options={mcqOptions}
                allowMultiple={allowMultiple}
                selectedOptions={selectedOptions}
                onOptionSelect={handleOptionSelect}
              />
            )}
          </View>
        </ScrollView>
        <View className="flex-1 bg-gray-100">
          <DrawingCanvas courseId={id} />
        </View>
      </View>

      {/* Overlay for closing sidebar when clicking outside */}
      {isSidebarOpen && (
        <TouchableWithoutFeedback onPress={() => setIsSidebarOpen(false)}>
          <View 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 45,
            }}
          />
        </TouchableWithoutFeedback>
      )}

      {/* Menu Button */}
      <TouchableOpacity 
        className="absolute top-5 left-4 z-40 p-2 bg-black rounded-full"
        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Ionicons name="menu" size={18} color="white" />
      </TouchableOpacity>

      {/* Sidebar Component */}
      <Animated.View 
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: 300,
            backgroundColor: 'white',
            transform: [{ translateX: sidebarAnimation }],
            zIndex: 50,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
        ]}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          tasks={tasks}
          selectedTask={selectedTask}
          onTaskSelect={handleTaskSelect}
          sidebarAnimation={sidebarAnimation}
          isLoading={loading}
        />
      </Animated.View>
    </View>
  );
} 