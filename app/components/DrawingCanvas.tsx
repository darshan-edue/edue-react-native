import { StyleSheet, View, TouchableOpacity, Text, Dimensions, PanResponder } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  useCanvasRef,
} from '@shopify/react-native-skia';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

interface StrokeData {
  points: Point[];
  color: string;
  strokeWidth: number;
  timestamp: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500'];
const STROKE_WIDTHS = [2, 4, 6, 8, 10];

interface DrawingCanvasProps {
  courseId: string;
}

const DrawingCanvas = ({ courseId }: DrawingCanvasProps) => {
  const [completedStrokes, setCompletedStrokes] = useState<StrokeData[]>([]);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(STROKE_WIDTHS[1]);
  const currentPath = useRef<ReturnType<typeof Skia.Path.Make> | null>(null);
  const currentPoints = useRef<Point[]>([]);
  const isDrawing = useRef(false);
  const currentStrokeColor = useRef(currentColor);
  const currentStrokeWidthRef = useRef(currentStrokeWidth);
  const [, setForceUpdate] = useState(0);

  // Update refs when state changes
  useEffect(() => {
    currentStrokeColor.current = currentColor;
    currentStrokeWidthRef.current = currentStrokeWidth;
  }, [currentColor, currentStrokeWidth]);

  const printStrokesData = useCallback(() => {
    console.log('\n=== Canvas Strokes Data ===');
    console.log(`Course ID: ${courseId}`);
    console.log(`Total number of strokes: ${completedStrokes.length}`);
    console.log('Strokes Data:', JSON.stringify(completedStrokes, null, 2));
    console.log('========================\n');
  }, [courseId, completedStrokes]);

  const createStrokeData = useCallback((points: Point[]) => {
    return {
      points: [...points],
      color: currentStrokeColor.current,
      strokeWidth: currentStrokeWidthRef.current,
      timestamp: Date.now(),
    };
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        isDrawing.current = true;
        currentPoints.current = [{ x: locationX, y: locationY }];
        currentPath.current = Skia.Path.Make();
        currentPath.current.moveTo(locationX, locationY);
        setForceUpdate(prev => prev + 1);
      },
      onPanResponderMove: (evt) => {
        if (!isDrawing.current || !currentPath.current) return;
        const { locationX, locationY } = evt.nativeEvent;
        currentPoints.current.push({ x: locationX, y: locationY });
        currentPath.current.lineTo(locationX, locationY);
        setForceUpdate(prev => prev + 1);
      },
      onPanResponderRelease: () => {
        if (currentPoints.current.length > 0) {
          const strokeData = createStrokeData(currentPoints.current);
          setCompletedStrokes(prev => [...prev, strokeData]);
          printStrokesData();
        }
        currentPoints.current = [];
        currentPath.current = null;
        isDrawing.current = false;
        setForceUpdate(prev => prev + 1);
      },
      onPanResponderTerminate: () => {
        if (currentPoints.current.length > 0) {
          const strokeData = createStrokeData(currentPoints.current);
          setCompletedStrokes(prev => [...prev, strokeData]);
          printStrokesData();
        }
        currentPoints.current = [];
        currentPath.current = null;
        isDrawing.current = false;
        setForceUpdate(prev => prev + 1);
      },
    })
  ).current;

  const paths = useMemo(() => {
    return completedStrokes.map((stroke, index) => {
      const path = Skia.Path.Make();
      stroke.points.forEach((point, i) => {
        if (i === 0) {
          path.moveTo(point.x, point.y);
        } else {
          path.lineTo(point.x, point.y);
        }
      });
      return (
        <Path
          key={index}
          path={path}
          strokeWidth={stroke.strokeWidth}
          color={stroke.color}
          style="stroke"
          antiAlias
        />
      );
    });
  }, [completedStrokes]);

  return (
    <View style={styles.container}>
      <View style={styles.controlPanel}>
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>Colors</Text>
          <View style={styles.colorOptions}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorButton, { backgroundColor: color }, color === currentColor && styles.selectedOption]}
                onPress={() => setCurrentColor(color)}
              />
            ))}
          </View>
        </View>
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>Course</Text>
          <Text style={styles.versionText}>{courseId}</Text>
        </View>
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>Stroke Width</Text>
          <View style={styles.strokeOptions}>
            {STROKE_WIDTHS.map((width) => (
              <TouchableOpacity
                key={width}
                style={[styles.strokeButton, width === currentStrokeWidth && styles.selectedOption]}
                onPress={() => setCurrentStrokeWidth(width)}
              >
                <View style={[styles.strokeSample, { height: width }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.canvasContainer} {...panResponder.panHandlers}>
        <Canvas style={styles.canvas}>
          {paths}
          {currentPath.current && (
            <Path
              path={currentPath.current}
              strokeWidth={currentStrokeWidthRef.current}
              color={currentStrokeColor.current}
              style="stroke"
              antiAlias
            />
          )}
        </Canvas>
      </View>
    </View>
  );
};

export default DrawingCanvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  controlPanel: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlSection: {
    alignItems: 'center',
  },
  controlTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  strokeOptions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  strokeButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  strokeSample: {
    width: 24,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  versionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  canvasContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 100, // Adjust for control panel height
  },
  canvas: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 100, // Adjust for control panel height
  },
}); 