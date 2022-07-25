import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import { Header } from '../components/Header';

import firestore from '@react-native-firebase/firestore';

import { useNavigation, useRoute } from '@react-navigation/native';
import { CircleWavyCheck, Clipboard, DesktopTower, Hourglass } from 'phosphor-react-native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { OrderProps } from '../components/Orders';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';

type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  description: string;
  solution?: string;
  closed: string;
};



export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;
  const { colors } = useTheme();

  function handleOrderClose() {
    //Valida se existe algum texto
    if (!solution) {
      return Alert.alert('Solicitação', 'Informe solução para encerrar a solicitação');
    }

    firestore().collection('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()

      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada com sucesso');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
        return Alert.alert('Solicitação', 'Não foi possivel encerrar a solicitação');
      });
  }

  useEffect(() => {

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data();
        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        });

        setIsLoading(false);

      }).catch(error => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert('Solicitação', 'Não foi possivel registrada o pedido.');
      });
  }, []);

  if (isLoading) {
    return <Loading />

  }

  return (
    <VStack flex={1} bg="gray.700">
      {/* O box ajusta o espaçamentos laterais, para o botao de goBack, não fique colado */}
      <Box px={5} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === 'closed' ?
            <CircleWavyCheck size={22} color={colors.green[300]} />
            :
            <Hourglass size={22} color={colors.secondary[300]} />
        }

        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status === 'closed' ? 'finalizado' : 'em andamento'}

        </Text>

      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={true}>
        <CardDetails
          title="Equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="Descrição do problema"
          description={`${order.description}`}
          icon={Clipboard}
          footer={`Registrado em ${order.when}`}

        />

        <CardDetails
          title="Descrição da solução"
          icon={Clipboard}
          footer={order.closed && `Encerrado em um ${order.closed}`}
          description={order.status == 'closed' && `${order.description}`}
        >
          {/* Enviando filho - children */}
          {
            order.status === 'open' &&
            <Input placeholder="Descrição da solução..."
              h={24}
              onChangeText={setSolution}
              textAlignVertical="top"
              multiline
            />

          }


        </CardDetails>
      </ScrollView>
      {
        order.status === 'open' &&
        <Button
          title="Encerrar solicitação"
          m={5}
          onPress={handleOrderClose}
        />
      }
    </VStack>
  );
}