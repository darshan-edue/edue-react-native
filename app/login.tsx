import { View, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { styled } from 'nativewind';
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation } from '@apollo/client';
import { LOGIN } from './graphql/mutations/login';

const client = new ApolloClient({
  uri: 'https://adjusted-excited-satyr.ngrok-free.app/graphql/',
  cache: new InMemoryCache(),
});

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: {
          input: {
            email,
            password
          }
        }
      });
      console.log('Login successful! Token:', data.tokenAuth.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
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

export default function LoginScreen() {
  return (
    <ApolloProvider client={client}>
      <LoginForm />
    </ApolloProvider>
  );
} 