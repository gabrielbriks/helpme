import { Heading, Icon, useTheme, VStack } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { useState } from 'react';
import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SingIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { colors } = useTheme();


  function handleSignIn() {

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
        w="full" />
    </VStack>
  );
}
