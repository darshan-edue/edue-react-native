import { View, TouchableOpacity, Text, Dimensions, PanResponder } from 'react-native';
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
    <View className="flex-1 bg-gray-100">
      <View className="p-4 bg-white border-b border-gray-200 flex-row justify-around">
        <View className="items-center">
          <Text className="text-sm mb-2 text-gray-600">Colors</Text>
          <View className="flex-row gap-2">
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                className={`w-[30px] h-[30px] rounded-full border ${
                  color === currentColor ? 'border-blue-500 border-2' : 'border-gray-200'
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
                  width === currentStrokeWidth ? 'border-blue-500 border-2' : 'border-gray-200'
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