import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { Loading } from '../components/Loading';
import { OrderProps, Orders } from '../components/Orders';
import { dateFormat } from '../utils/firestoreDateFormat';

export function Home() {

  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [quantityOrders, setQuantityOrders] = useState(0);
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId: orderId });
  }

  function handleLogout() {
    auth().signOut()
      .catch(error => {
        console.log(error);
        return Alert.alert('Sair', 'Não foi possivel sair.');
      })
  }

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore().collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)

          }
        });

        setOrders(data);
        setQuantityOrders(data.length);
        setIsLoading(false);
      });

    return subscriber;

  }, [statusSelected])


  return (

    <VStack
      flex={1}
      pb={6}
      bg="gray.700"
    >

      <HStack
        w="full"
        justifyContent="space-between"
        alignContent="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Solicitações
          </Heading>
          <Text color="gray.200">
            {quantityOrders} {/*Numero de solicitações em aberto*/}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter type='open' title='em andamento'
            onPress={() => { setStatusSelected('open') }}
            isActive={statusSelected === 'open'}
          />
          <Filter type='closed' title='finalizados'
            onPress={() => { setStatusSelected('closed') }}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        {
          isLoading ? <Loading />
            :
            <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Orders onPress={() => handleOpenDetails(item.id)} data={item} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Center>
                  <ChatTeardropText size={40} color={colors.gray[300]} />
                  <Text color={colors.gray[300]} fontSize="xl" mt={6} textAlign="center">
                    Você ainda não possuí {'\n'}
                    solicitações {statusSelected === 'open' ? 'em aberto' : 'finalizadas'}
                  </Text>
                </Center>
              )}//Aqui você pode renderizar alguma coisa quando a lista estiver vaszia
            />
        }


        <Button title='Nova solicitação' onPress={handleNewOrder} />
      </VStack>


    </VStack>
  );
}