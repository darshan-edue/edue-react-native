import { StyleSheet, View, TouchableOpacity, Text, FlatList, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

interface Worksheet {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
}

const WORKSHEETS: Worksheet[] = [
  { 
    id: '1', 
    title: 'Algebra Basics', 
    description: 'Master fundamental algebraic concepts including variables, equations, and basic operations. Perfect for beginners starting their mathematical journey. Learn about linear equations, inequalities, and polynomial expressions. Practice solving real-world problems using algebraic methods.',
    level: 'Beginner',
    duration: '45 mins'
  },
  { 
    id: '2', 
    title: 'Geometry Fundamentals', 
    description: 'Explore the world of shapes, angles, and spatial relationships. Learn about triangles, circles, and basic geometric principles. Understand the properties of different shapes and their applications in real-world scenarios. Master the concepts of area, perimeter, and volume calculations.',
    level: 'Intermediate',
    duration: '60 mins'
  },
  { 
    id: '3', 
    title: 'Statistics Introduction', 
    description: 'Get started with data analysis, probability, and statistical concepts. Learn how to interpret and present data effectively. Understand mean, median, mode, and standard deviation. Practice creating and analyzing different types of graphs and charts.',
    level: 'Beginner',
    duration: '50 mins'
  },
  { 
    id: '4', 
    title: 'Calculus Basics', 
    description: 'Introduction to limits, derivatives, and integrals. Understand the fundamental concepts of calculus with practical examples. Learn about rate of change, optimization problems, and area under curves. Master the techniques of differentiation and integration.',
    level: 'Advanced',
    duration: '75 mins'
  },
];

export default function WorksheetsScreen() {
  const router = useRouter();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  
  // Calculate number of columns based on screen width
  const getNumColumns = () => {
    if (SCREEN_WIDTH < 600) return 1;
    if (SCREEN_WIDTH < 900) return 2;
    return 3;
  };

  const NUM_COLUMNS = getNumColumns();

  const handleWorksheetPress = (worksheetId: string) => {
    router.push('/canvas/id' as any);
  };

  const renderWorksheetItem = ({ item }: { item: Worksheet }) => (
    <View style={[styles.cardContainer, { flex: 1/NUM_COLUMNS }]}>
      <TouchableOpacity 
        style={styles.worksheetCard}
        onPress={() => handleWorksheetPress(item.id)}
      >
        <View style={styles.worksheetInfo}>
          <View style={styles.worksheetContent}>
            <Text style={styles.worksheetTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.worksheetDescription} numberOfLines={4}>{item.description}</Text>
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>{item.level} · {item.duration}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>Start Worksheet</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (NUM_COLUMNS === 1) {
      return (
        <FlatList
          data={WORKSHEETS}
          renderItem={renderWorksheetItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      );
    }

    return (
      <FlatList
        data={WORKSHEETS}
        renderItem={renderWorksheetItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.row}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Worksheets</Text>
      {renderContent()}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/home.png')} 
              style={[styles.navIcon, styles.navIconActive]} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/bookmark.png')} 
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/calendar.png')} 
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Image 
              source={require('../assets/images/profile.png')} 
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 100,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: -8, // Compensate for card container padding
  },
  cardContainer: {
    padding: 8,
  },
  worksheetCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  worksheetInfo: {
    padding: 16,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 320,
  },
  worksheetContent: {
    flex: 1,
  },
  worksheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    lineHeight: 24,
  },
  worksheetDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#2962FF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 8,
    width: '100%',
    maxWidth: 400,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  navIconActive: {
    tintColor: '#2962FF',
  },
}); 