import { StyleSheet, View, PanResponder, Dimensions, TouchableOpacity, Text, GestureResponderEvent, PanResponderGestureState, NativeTouchEvent } from 'react-native';
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
  const [paths, setPaths] = useState<Point[][]>([]);
  const [currentColor, setCurrentColor] = useState(COLORS[0]);
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(STROKE_WIDTHS[1]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = SCREEN_WIDTH;
      canvasRef.current.height = SCREEN_HEIGHT;
      
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        ctx.lineCap = 'round';
        setContext(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = currentColor;
      context.lineWidth = currentStrokeWidth;
    }
  }, [context, currentColor, currentStrokeWidth]);

  const drawPath = (path: Point[]) => {
    if (context && path.length > 1) {
      context.beginPath();
      context.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        context.lineTo(path[i].x, path[i].y);
      }
      context.stroke();
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setPaths((prevPaths) => [...prevPaths, [{ x: locationX, y: locationY }]]);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setPaths((prevPaths) => {
        const updatedPaths = [...prevPaths];
        const lastPath = updatedPaths[updatedPaths.length - 1] || [];
        lastPath.push({ x: locationX, y: locationY });
        updatedPaths[updatedPaths.length - 1] = lastPath;
        drawPath(lastPath);
        return updatedPaths;
      });
    },
    onPanResponderRelease: () => {},
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
                style={[styles.colorButton, { backgroundColor: color }, color === currentColor && styles.selectedOption]}
                onPress={() => setCurrentColor(color)}
              />
            ))}
          </View>
        </View>
        <View style={styles.controlSection}>
          <Text style={styles.controlTitle}>Version</Text>
          <Text style={styles.versionText}>v2</Text>
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
        <Canvas ref={canvasRef} style={styles.canvas} />
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
    height: SCREEN_HEIGHT,
    backgroundColor: '#F5F5F5',
  },
  canvas: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
