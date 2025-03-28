import { View, TouchableOpacity, Text, TextInput, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { styled } from 'nativewind';
import { useMutation } from '@apollo/client';
import { LOGIN } from './graphql/mutations/login';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startTokenRefresh } from './utils/tokenRefresh';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useMutation(LOGIN);

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateEmail(email) || !password) {
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await login({
        variables: {
          input: {
            email,
            password
          }
        }
      });
      
      if (data?.tokenAuth?.token) {
        // Store the token
        await AsyncStorage.setItem('userToken', data.tokenAuth.token);
        
        // Start token refresh mechanism
        await startTokenRefresh();
        
        // Redirect to courses page
        router.replace('/courses');
      } else {
        throw new Error('No token received from server');
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message || 'An error occurred during login',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password && !emailError;

  return (
    <StyledView className="flex-1 bg-white justify-center items-center">
      <StyledView className="w-[85%] max-w-[600px] items-center">
        <Image
          source={require('../assets/images/edue-logo.png')}
          className="w-4/5 h-[100px] mb-12"
          resizeMode="contain"
        />
        <StyledView className="bg-[#F5F8FF] rounded-2xl p-10 w-full shadow-lg">
          <StyledText className="text-3xl font-semibold text-black mb-9">
            Login
          </StyledText>
          
          <StyledView className="mb-8">
            <StyledText className="text-lg font-medium text-black mb-3">
              Email
            </StyledText>
            <StyledTextInput
              className={`flex items-center h-16 bg-white rounded-xl px-4 text-black border ${
                emailError ? 'border-red-500' : 'border-[#E5E5E5]'
              }`}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholderTextColor="#A0A0A0"
              style={{
                fontFamily: 'System',
                fontSize: 16,
                letterSpacing: 0.15,
              }}
            />
            {emailError ? (
              <StyledText className="text-red-500 mt-1 text-sm">
                {emailError}
              </StyledText>
            ) : null}
          </StyledView>

          <StyledView className="mb-8">
            <StyledText className="text-lg font-medium text-black mb-3">
              Password
            </StyledText>
            <StyledTextInput
              className="bg-white rounded-xl px-4 h-16 text-black border border-[#E5E5E5]"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#A0A0A0"
              style={{
                fontFamily: 'System',
                fontSize: 16,
                letterSpacing: 0.15,
                textAlignVertical: 'center',
              }}
            />
          </StyledView>

          <StyledTouchableOpacity 
            className={`rounded-xl p-5 items-center mt-6 self-end min-w-[160px] ${
              isFormValid ? 'bg-[#0055FF]' : 'bg-gray-400'
            }`}
            onPress={handleLogin}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <StyledText className="text-white text-lg font-semibold">
                Login
              </StyledText>
            )}
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
} 