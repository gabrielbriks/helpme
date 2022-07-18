import { NativeBaseProvider } from 'native-base';
import { SingIn } from './src/screens/SignIn';

export default function App() {
  return (

    <NativeBaseProvider>
      <SingIn />
    </NativeBaseProvider>
  );
}

