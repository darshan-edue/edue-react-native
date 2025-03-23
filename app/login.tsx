import { View, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you would typically validate the credentials
    router.push('/courses');
  };

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
              className="bg-white rounded-xl p-5 text-lg text-black border border-[#E5E5E5] h-16"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              placeholderTextColor="#A0A0A0"
            />
          </StyledView>

          <StyledView className="mb-8">
            <StyledText className="text-lg font-medium text-black mb-3">
              Password
            </StyledText>
            <StyledTextInput
              className="bg-white rounded-xl p-5 text-lg text-black border border-[#E5E5E5] h-16"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#A0A0A0"
            />
          </StyledView>

          <StyledTouchableOpacity 
            className="bg-[#0055FF] rounded-xl p-5 items-center mt-6 self-end min-w-[160px]"
            onPress={handleLogin}
          >
            <StyledText className="text-white text-lg font-semibold">
              Login
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
} 