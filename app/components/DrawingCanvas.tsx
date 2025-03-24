import { View, TouchableOpacity, Text, Dimensions, PanResponder } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

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
  const [isEraserMode, setIsEraserMode] = useState(false);
  const isEraserModeRef = useRef(isEraserMode);
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
    isEraserModeRef.current = isEraserMode;
  }, [currentColor, currentStrokeWidth, isEraserMode]);

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
        const touchPoint = { x: locationX, y: locationY };
        
        if (isEraserModeRef.current) {
          console.log('Eraser touch started at:', touchPoint);
          // Find and remove strokes that are touched
          setCompletedStrokes(prevStrokes => {
            const newStrokes = prevStrokes.filter(stroke => {
              const shouldRemove = isPointNearStroke(touchPoint, stroke);
              if (shouldRemove) {
                console.log('Removing stroke:', stroke);
              }
              return !shouldRemove;
            });
            return newStrokes;
          });
        } else {
          isDrawing.current = true;
          currentPoints.current = [{ x: locationX, y: locationY }];
          currentPath.current = Skia.Path.Make();
          currentPath.current.moveTo(locationX, locationY);
          setForceUpdate(prev => prev + 1);
        }
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const touchPoint = { x: locationX, y: locationY };

        if (isEraserModeRef.current) {
          console.log('Eraser moving to:', touchPoint);
          // Find and remove strokes that are touched
          setCompletedStrokes(prevStrokes => {
            const newStrokes = prevStrokes.filter(stroke => {
              const shouldRemove = isPointNearStroke(touchPoint, stroke);
              if (shouldRemove) {
                console.log('Removing stroke:', stroke);
              }
              return !shouldRemove;
            });
            return newStrokes;
          });
        } else if (isDrawing.current && currentPath.current) {
          currentPoints.current.push({ x: locationX, y: locationY });
          currentPath.current.lineTo(locationX, locationY);
          setForceUpdate(prev => prev + 1);
        }
      },
      onPanResponderRelease: () => {
        if (!isEraserModeRef.current && currentPoints.current.length > 0) {
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
        if (!isEraserModeRef.current && currentPoints.current.length > 0) {
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

  const isPointNearStroke = useCallback((point: Point, stroke: StrokeData) => {
    const threshold = 20; // Adjust this value to change how close you need to be to erase
    const isNear = stroke.points.some(strokePoint => {
      const distance = Math.sqrt(
        Math.pow(point.x - strokePoint.x, 2) + 
        Math.pow(point.y - strokePoint.y, 2)
      );
      return distance < threshold;
    });
    if (isNear) {
      console.log('Point is near stroke:', { point, stroke });
    }
    return isNear;
  }, []);

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
    <View className="flex-1 bg-gray-100">
      <View className="p-4 bg-white border-b border-gray-200 flex-row justify-around">
        <View className="items-center">
          <Text className="text-sm mb-2 text-gray-600">Colors</Text>
          <View className="flex-row gap-2">
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                className={`w-[30px] h-[30px] rounded-full border ${
                  color === currentColor && !isEraserMode ? 'border-blue-500 border-2' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color }}
                onPress={() => setCurrentColor(color)}
              />
            ))}
          </View>
        </View>
        <View className="items-center">
          <Text className="text-sm mb-2 text-gray-600">Stroke Width</Text>
          <View className="flex-row gap-2 items-center">
            {STROKE_WIDTHS.map((width) => (
              <TouchableOpacity
                key={width}
                className={`w-10 h-10 rounded bg-white border ${
                  width === currentStrokeWidth && !isEraserMode ? 'border-blue-500 border-2' : 'border-gray-200'
                } justify-center items-center`}
                onPress={() => setCurrentStrokeWidth(width)}
              >
                <View 
                  className="w-6 bg-black rounded-sm"
                  style={{ height: width }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="items-center">
          <Text className="text-sm mb-2 text-gray-600">Eraser</Text>
          <TouchableOpacity
            className={`w-10 h-10 rounded bg-white border ${
              isEraserMode ? 'border-blue-500 border-2' : 'border-gray-200'
            } justify-center items-center`}
            onPress={() => {
              setIsEraserMode(prev => {
                if (!prev) {
                  // When turning eraser on, reset color and stroke width
                  setCurrentColor(COLORS[0]);
                  setCurrentStrokeWidth(STROKE_WIDTHS[0]);
                } else {
                  // When turning eraser off, reset to first color and stroke width
                  setCurrentColor(COLORS[0]);
                  setCurrentStrokeWidth(STROKE_WIDTHS[0]);
                }
                return !prev;
              });
            }}
          >
            <Ionicons 
              name="backspace-outline" 
              size={24} 
              color={isEraserMode ? '#3b82f6' : '#6b7280'} 
            />
          </TouchableOpacity>
        </View>
      </View>
      <View 
        className="flex-1"
        style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 100 }}
        {...panResponder.panHandlers}
      >
        <Canvas 
          className="flex-1"
          style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 100 }}
        >
          {paths}
          {currentPath.current && !isEraserModeRef.current && (
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