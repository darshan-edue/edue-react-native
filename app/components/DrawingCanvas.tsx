import { View, TouchableOpacity, Text, Dimensions, PanResponder, ScrollView } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  Line,
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

const INITIAL_CANVAS_HEIGHT = SCREEN_HEIGHT * 2;
const HEIGHT_INCREMENT = SCREEN_HEIGHT;
const MAX_CANVAS_HEIGHT = SCREEN_HEIGHT * 3; // Maximum height to prevent memory issues
const LOAD_MORE_THRESHOLD = 300; // pixels from bottom to trigger height increase
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
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [canvasHeight, setCanvasHeight] = useState(INITIAL_CANVAS_HEIGHT);
  const isEraserModeRef = useRef(isEraserMode);
  const currentPath = useRef<ReturnType<typeof Skia.Path.Make> | null>(null);
  const currentPoints = useRef<Point[]>([]);
  const isDrawing = useRef(false);
  const currentStrokeColor = useRef(currentColor);
  const currentStrokeWidthRef = useRef(currentStrokeWidth);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
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
      onStartShouldSetPanResponder: (evt) => {
        // Enable drawing only for single touch
        if (evt.nativeEvent.touches.length === 1) {
          setScrollEnabled(false);
          return true;
        }
        return false;
      },
      onMoveShouldSetPanResponder: (evt) => {
        // Enable drawing only for single touch
        return evt.nativeEvent.touches.length === 1;
      },
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const adjustedY = locationY + scrollOffset; // Adjust for scroll position
        
        if (isEraserModeRef.current) {
          setCompletedStrokes(prevStrokes => {
            return prevStrokes.filter(stroke => {
              return !isPointNearStroke({ x: locationX, y: adjustedY }, stroke);
            });
          });
        } else {
          isDrawing.current = true;
          currentPoints.current = [{ x: locationX, y: adjustedY }];
          currentPath.current = Skia.Path.Make();
          currentPath.current.moveTo(locationX, adjustedY);
          setForceUpdate(prev => prev + 1);
        }
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const adjustedY = locationY + scrollOffset; // Adjust for scroll position

        if (isEraserModeRef.current) {
          setCompletedStrokes(prevStrokes => {
            return prevStrokes.filter(stroke => {
              return !isPointNearStroke({ x: locationX, y: adjustedY }, stroke);
            });
          });
        } else if (isDrawing.current && currentPath.current) {
          currentPoints.current.push({ x: locationX, y: adjustedY });
          currentPath.current.lineTo(locationX, adjustedY);
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
        setScrollEnabled(true);
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
        setScrollEnabled(true);
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

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    setScrollOffset(contentOffset.y);

    // Check if we're near the bottom and haven't reached max height
    const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;
    if (distanceFromBottom < LOAD_MORE_THRESHOLD && canvasHeight < MAX_CANVAS_HEIGHT) {
      const newHeight = Math.min(canvasHeight + HEIGHT_INCREMENT, MAX_CANVAS_HEIGHT);
      setCanvasHeight(newHeight);
    }
  };

  const backgroundLines = useMemo(() => {
    const lineSpacing = 30;
    const lines = [];
    const numLines = Math.floor(canvasHeight / lineSpacing);
    const visibleStartLine = Math.max(0, Math.floor(scrollOffset / lineSpacing) - 5);
    const visibleEndLine = Math.min(numLines, Math.ceil((scrollOffset + SCREEN_HEIGHT) / lineSpacing) + 5);
    
    // Only render lines that are visible or close to being visible
    for (let i = visibleStartLine; i < visibleEndLine; i++) {
      const y = i * lineSpacing;
      lines.push(
        <Line
          key={`line-${i}`}
          p1={{ x: 0, y }}
          p2={{ x: SCREEN_WIDTH, y }}
          color="#E5E7EB"
          strokeWidth={1}
        />
      );
    }
    return lines;
  }, [canvasHeight, scrollOffset]);

  const paths = useMemo(() => {
    // Calculate visible area with some padding
    const visibleStart = scrollOffset - SCREEN_HEIGHT;
    const visibleEnd = scrollOffset + SCREEN_HEIGHT * 2;

    return completedStrokes
      // Only render strokes that intersect with the visible area
      .filter(stroke => {
        const strokeMinY = Math.min(...stroke.points.map(p => p.y));
        const strokeMaxY = Math.max(...stroke.points.map(p => p.y));
        return strokeMaxY >= visibleStart && strokeMinY <= visibleEnd;
      })
      .map((stroke, index) => {
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
  }, [completedStrokes, scrollOffset]);

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
                onPress={() => {
                  setIsEraserMode(false);
                  setCurrentColor(color);
                }}
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
                onPress={() => {
                  setIsEraserMode(false);
                  setCurrentStrokeWidth(width);
                }}
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
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={scrollEnabled}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ height: canvasHeight }}
      >
        <View 
          style={{ width: SCREEN_WIDTH, height: canvasHeight }}
          {...panResponder.panHandlers}
        >
          <Canvas style={{ flex: 1 }}>
            {backgroundLines}
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
      </ScrollView>
    </View>
  );
};

export default DrawingCanvas; 