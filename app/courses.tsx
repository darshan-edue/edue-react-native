import { View, TouchableOpacity, Text, FlatList, Image, useWindowDimensions, Modal, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { handleLogout } from './utils/tokenRefresh';
import { useQuery } from '@apollo/client';
import { GET_WORKSHEETS } from './graphql/queries/getWorksheets';
import Toast from 'react-native-toast-message';

interface Worksheet {
  id: string;
  name: string;
  description: string;
}

export default function WorksheetsScreen() {
  const router = useRouter();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(1);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const { loading, error, data } = useQuery(GET_WORKSHEETS);

  useEffect(() => {
    if (error) {
      console.log('GraphQL Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch worksheets. Please try again.',
        position: 'bottom',
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log('Raw API Response:', JSON.stringify(data, null, 2));
      const worksheets = data?.worksheets?.edges?.map((edge: any) => edge.node) || [];
      console.log('Transformed Worksheets:', JSON.stringify(worksheets, null, 2));
    }
  }, [data]);
  
  const getNumColumns = () => {
    const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
    
    if (isLandscape) {
      if (SCREEN_WIDTH < 800) return 2;
      if (SCREEN_WIDTH < 1200) return 3;
      return 4;
    }
    
    // Portrait mode
    if (SCREEN_WIDTH < 600) return 1;
    if (SCREEN_WIDTH < 900) return 2;
    return 3;
  };

  useEffect(() => {
    setNumColumns(getNumColumns());
  }, [SCREEN_WIDTH, SCREEN_HEIGHT]);

  const handleWorksheetPress = (worksheetId: string) => {
    router.push(`/canvas/${worksheetId}`);
  };

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setShowLogoutModal(false);
    await handleLogout();
  };

  const renderWorksheetItem = ({ item }: { item: Worksheet }) => {
    console.log('Rendering worksheet item:', item); // Debug log for each item
    return (
      <View style={{ width: `${100 / numColumns}%`, padding: 8 }}>
        <TouchableOpacity 
          className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden h-full"
          onPress={() => handleWorksheetPress(item.id)}
        >
          <View className="p-4 flex-1 flex flex-col justify-between min-h-[180px]">
            <View className="flex-1">
              <Text className="text-base font-semibold mb-2 text-gray-800 leading-5" numberOfLines={1}>
                {item.name || 'Untitled Worksheet'}
              </Text>
              <Text className="text-sm text-gray-600 mb-3 leading-5" numberOfLines={4}>
                {item.description || 'No description available'}
              </Text>
            </View>
            <TouchableOpacity 
              className="bg-blue-600 rounded-lg py-2.5 items-center"
              onPress={(e) => {
                e.stopPropagation();
                handleWorksheetPress(item.id);
              }}
            >
              <Text className="text-white text-xs font-semibold">Start Worksheet</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="mt-4 text-gray-600">Loading worksheets...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-600">Failed to load worksheets</Text>
        </View>
      );
    }

    const worksheets = data?.worksheets?.edges?.map((edge: any) => edge.node) || [];
    console.log('Worksheets to render:', worksheets); // Debug log for the worksheets array

    if (worksheets.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-600">No worksheets available</Text>
        </View>
      );
    }

    return (
      <FlatList
        key={`list-${numColumns}`}
        data={worksheets}
        renderItem={renderWorksheetItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { 
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -8,
          width: '100%'
        } : undefined}
      />
    );
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold mb-6 text-gray-800">Worksheets</Text>
      {renderContent()}
      <View className="absolute bottom-0 left-0 right-0 h-20 bg-transparent items-center px-6 pb-4">
        <View className="flex-row bg-white rounded-full p-2 w-full max-w-[400px] justify-around items-center shadow-lg">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-full">
            <Image 
              source={require('../assets/images/home.png')} 
              className="w-6 h-6 tint-blue-600"
            />
          </TouchableOpacity>
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-full">
            <Image 
              source={require('../assets/images/bookmark.png')} 
              className="w-6 h-6 tint-gray-600"
            />
          </TouchableOpacity>
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-full">
            <Image 
              source={require('../assets/images/calendar.png')} 
              className="w-6 h-6 tint-gray-600"
            />
          </TouchableOpacity>
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-full">
            <Image 
              source={require('../assets/images/profile.png')} 
              className="w-6 h-6 tint-gray-600"
            />
          </TouchableOpacity>
          <TouchableOpacity 
            className="items-center justify-center w-12 h-12 rounded-full"
            onPress={handleLogoutPress}
          >
            <Image 
              source={require('../assets/images/logout.png')} 
              className="w-6 h-6 tint-red-600"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white rounded-[28px] w-full max-w-[327px]">
            <View className="px-6 pt-8 pb-6 items-center">
              <Text className="text-[22px] font-semibold text-black mb-2">
                Logout
              </Text>
              <Text className="text-[17px] text-gray-600 text-center">
                Are you sure you want to logout?
              </Text>
            </View>
            
            <View className="px-4 pb-4 space-y-2 flex w-full">
              <TouchableOpacity 
                className="w-full py-3 bg-red-600 rounded-lg items-center"
                onPress={confirmLogout}
              >
                <Text className="text-[17px] font-medium text-white">
                  Logout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="w-full py-3 bg-gray-100 rounded-lg items-center"
                onPress={() => setShowLogoutModal(false)}
              >
                <Text className="text-[17px] font-normal text-black">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
} 