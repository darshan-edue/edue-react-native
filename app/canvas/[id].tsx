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
import { GET_TASK_BY_ID } from '../graphql/queries/getTaskById';
import Toast from 'react-native-toast-message';
import { connectToSession } from '../utils/websocket';

interface Task {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'wrong' | 'upcoming';
}

export default function CanvasScreen() {
  const { id, sessionId } = useLocalSearchParams<{ id: string; sessionId: string }>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null);
  const [strokesData, setStrokesData] = useState<any[]>([]);
  const sidebarAnimation = useRef(new Animated.Value(-350)).current;
  const allowMultiple = true;

  console.log('=============================',wsConnection,'=============================')

  // Function to send WebSocket messages
  const sendWebSocketMessage = (command: string, data: any, socket: WebSocket) => {
    // Use the passed socket instead of wsConnection state
    if (!socket) {
      console.error('No WebSocket connection available');
      return;
    }

    // Check connection state
    console.log('========================== WebSocket state when sending:', socket.readyState);
    
    if (socket.readyState === WebSocket.OPEN) {
      const message = {
        command,
        data,
      };
      console.log('========================== Sending message:', message);
      socket.send(JSON.stringify(message));
    } else {
      console.error(`WebSocket is not ready. Current state: ${socket.readyState}`);
    }
  };

  // Example function to get stroke data
  const getStrokeData = (taskId: string, socket: WebSocket) => {
    sendWebSocketMessage('get_stroke', {
      task_id: taskId,
    }, socket);
  };

  const createStrokeHandler = (taskId: string, socket: WebSocket, stroke:string) => {
    console.log('*************************',socket,'*************************');
    sendWebSocketMessage('create_stroke', {
      task_id: taskId,
      stroke: stroke,
    }, socket);
  };

  // WebSocket connection setup
  useEffect(() => {
    let ws: WebSocket | null = null;

    const setupWebSocket = async () => {
      try {
        if (!sessionId) {
          console.error('No session ID provided');
          return;
        }

        console.log('========================== Attempting to connect WebSocket');
        ws = await connectToSession(sessionId);
        console.log('========================== WebSocket connection returned');
        
        // Set up all event handlers before setting the state
        ws.onopen = () => {
          console.log('========================== WebSocket onopen event fired');
          if (id && ws) {
            console.log('========================== Sending get_stroke request for task:', id);
            getStrokeData(id, ws);
          }
        };

        // Set up message handler
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('========================== Received WebSocket message:', data);
            if (data.message && Array.isArray(data.message)) {
              const parsedStrokes = data.message.map((item: any) => {
                const strokeData = JSON.parse(item.stroke);
                return {
                  ...strokeData,
                  id: item.id
                };
              });
              setStrokesData(parsedStrokes);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onerror = (error) => {
          console.error('========================== WebSocket error:', error);
        };

        ws.onclose = (event) => {
          console.log('========================== WebSocket connection closed', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean
          });
          setWsConnection(null);
        };

        // Now set the connection in state
        setWsConnection(ws);

        // If the socket is already open, send the message immediately
        if (ws.readyState === WebSocket.OPEN && id) {
          console.log('========================== WebSocket is already open, sending message');
          getStrokeData(id, ws);
        }

        // Cleanup on unmount
        return () => {
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
        };
      } catch (error) {
        console.error('========================== WebSocket setup error:', error);
        Toast.show({
          type: 'error',
          text1: 'Connection Error',
          text2: 'Failed to connect to the drawing session. Please try again.',
        });
      }
    };

    setupWebSocket();

    // Cleanup function
    return () => {
      if (ws) {
        console.log('========================== Cleaning up WebSocket connection');
        ws.close();
      }
    };
  }, [sessionId, id]);

  console.log('=============================',strokesData,'=============================')

  // Fetch current task data
  const { loading: currentTaskLoading, data: currentTaskData } = useQuery(GET_CURRENT_TASK, {
    variables: { id: id ? String(id) : null },
    onCompleted: (data) => {
      console.log('Current Task ID:', data?.currentTask?.task?.id);
    },
    onError: (error) => {
      console.error('Error fetching current task:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load task content. Please try again later.',
      });
    }
  });

  // Fetch selected task data
  const { loading: selectedTaskLoading, data: selectedTaskData } = useQuery(GET_TASK_BY_ID, {
    variables: { id: selectedTask ? String(selectedTask) : null },
    skip: !selectedTask,
    onError: (error) => {
      console.error('Error fetching selected task:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load selected task content. Please try again later.',
      });
    }
  });

  // Fetch tasks data using GraphQL query
  const { loading, error, data } = useQuery(GET_ALL_TASKS_FOR_A_WORKSHEET, {
    variables: { parent: id ? String(id) : null },
    onCompleted: (data) => {
      if (data?.assignmentLogs?.edges) {
        // Transform the data to match our Task interface
        const fetchedTasks = data.assignmentLogs.edges.map((edge: any, index: number) => ({
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

  if (currentTaskLoading || selectedTaskLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Use selected task data if available, otherwise use current task data
  const taskContent = selectedTaskData?.assignmentLog?.task?.content || currentTaskData?.assignmentLog?.task?.content || '';
  const isMcq = selectedTaskData?.assignmentLog?.task?.isMcq || currentTaskData?.assignmentLog?.task?.isMcq || false;

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
          <DrawingCanvas 
            courseId={id} 
            createStrokeHandler={createStrokeHandler} 
            ws={wsConnection} 
            initialStrokes={strokesData}
          />
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