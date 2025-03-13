import { StyleSheet, View, PanResponder, Dimensions, TouchableOpacity, Text } from 'react-native';
import Canvas, { CanvasRenderingContext2D } from 'react-native-canvas';
import { useRef, useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500'];
const STROKE_WIDTHS = [2, 4, 6, 8, 10];

const DrawingCanvas = () => {
  const canvasRef = useRef<Canvas | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(STROKE_WIDTHS[1]);

  useEffect(() => {
    if (canvasRef.current) {
      // Set canvas dimensions explicitly
      canvasRef.current.width = SCREEN_WIDTH;
      canvasRef.current.height = SCREEN_HEIGHT;
      
      const ctx = canvasRef.current.getContext('2d');
      // Fill background
      ctx.fillStyle = '#F5F5F5';
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      
      // Set drawing styles
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentStrokeWidth;
      ctx.lineCap = 'round';
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = currentColor;
      context.lineWidth = currentStrokeWidth;
    }
  }, [currentColor, currentStrokeWidth]);

  const drawPath = (points: Point[]) => {
    if (context && points.length > 1) {
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
      }
      context.stroke();
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath([{ x: locationX, y: locationY }]);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const newPath = [...currentPath, { x: locationX, y: locationY }];
      setCurrentPath(newPath);
      drawPath(newPath);
    },
    onPanResponderRelease: () => {
      setCurrentPath([]);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.controlPanel}>
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>Colors</Text>
          <View style={styles.colorOptions}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  color === currentColor && styles.selectedOption,
                ]}
                onPress={() => setCurrentColor(color)}
              />
            ))}
          </View>
        </View>
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>Stroke Width</Text>
          <View style={styles.strokeOptions}>
            {STROKE_WIDTHS.map((width) => (
              <TouchableOpacity
                key={width}
                style={[
                  styles.strokeButton,
                  width === currentStrokeWidth && styles.selectedOption,
                ]}
                onPress={() => setCurrentStrokeWidth(width)}
              >
                <View style={[styles.strokeSample, { height: width }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.canvasContainer} {...panResponder.panHandlers}>
        <Canvas ref={canvasRef} style={styles.canvas} />
      </View>
    </View>
  );
};

export default function HomeScreen() {
  return <DrawingCanvas />;
}

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
  canvasContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: '#F5F5F5',
  },
  canvas: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
