import auth from '@react-native-firebase/auth';
import { Heading, Icon, useTheme, VStack } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { useState } from 'react';
import { Alert } from 'react-native';
import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SingIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);



  async function handleSignIn() {

    if (!email || !password) {//Se o email ou password é null 
      return Alert.alert('Entrar', 'Informe email e senha.');
    }
    setIsLoading(true);

    try {
      const response = await auth().signInWithEmailAndPassword(email, password)
        .then(res => res)
        .then(result => result)




    } catch (error) {
      setIsLoading(false);

      console.log(error)
      Alert.alert('Entrar error: ' + error.message);

      if (error.message === 'auth/invalid-email') {
        return Alert.alert('Entrar', 'Email ou senha invalida.');
      }

      if (error.code === 'auth/user-not-found') {
        return Alert.alert('Entrar', 'Usuario não cadastrado.');
      }

      if (error.code === 'auth/wrong-password') {
        return Alert.alert('Entrar', 'Email ou senha inválida.');
      }

      return Alert.alert('Entrar', 'Não foi possivel acessar');

    }





  }

  return (
    <VStack
      flex={1}
      alignItems="center"
      bg="gray.600"
      px={8}
      pt={24}
    >
      <Logo />
      <Heading
        color="gray.100"
        fontSize="xl"
        mb={8}
        mt={20}
      >
        Acesse sua conta
      </Heading>

      <Input placeholder="E-mail"
        mb={4}
        onChangeText={text => { setEmail(text) }}
        InputLeftElement={
          <Icon
            ml={4}
            as={<Envelope color={colors.gray[300]} />}

          />
        }
      />
      <Input placeholder="Senha"
        mb={8}
        onChangeText={text => { setPassword(text) }}
        InputLeftElement={
          <Icon
            ml={4}
            as={<Key color={colors.gray[300]} />}
          />
        }
        secureTextEntry//Adiciona "hide text" na senha
      />

      <Button
        onPress={handleSignIn}
        title="Entrar"
        w="full"
        isLoading={isLoading}
      />
    </VStack>
  );
}
