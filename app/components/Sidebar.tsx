import React from 'react';
import { View, TouchableOpacity, ScrollView, Text, Animated, Dimensions, ActivityIndicator } from 'react-native';

interface Task {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'wrong' | 'upcoming';
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  selectedTask: string | null;
  onTaskSelect: (taskId: string) => void;
  sidebarAnimation: Animated.Value;
  isLoading?: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  tasks,
  selectedTask,
  onTaskSelect,
  sidebarAnimation,
  isLoading = false,
}: SidebarProps) {
  const { width: screenWidth } = Dimensions.get('window');
  const sidebarWidth = screenWidth * 0.3;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
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
          onPress={onClose}
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
          {isLoading ? (
            <View className="flex-1 justify-center items-center p-8">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="mt-4 text-gray-500">Loading tasks...</Text>
            </View>
          ) : tasks.length === 0 ? (
            <View className="flex-1 justify-center items-center p-8">
              <Text className="text-gray-500">No tasks available</Text>
            </View>
          ) : (
            tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                className={`p-4 border-b border-gray-100 ${
                  selectedTask === task.id ? 'bg-blue-50' : ''
                }`}
                onPress={() => onTaskSelect(task.id)}
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
            ))
          )}
        </ScrollView>
      </Animated.View>
    </>
  );
} 