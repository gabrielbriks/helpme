import { Box, Circle, HStack, IPressableProps, Pressable, Text, useTheme, VStack } from 'native-base';
import { CircleWavyCheck, ClockAfternoon, Hourglass } from 'phosphor-react-native';
//Utilizando o HStack, pois os elementos vão estar um do lado do outro

/**Para utilizarmos em outros lugares */
export type OrderProps = {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
}

/**De uso apenas interno(aqui dentro) */
type Props = IPressableProps & {
  data: OrderProps;
}

export function Orders({ data, ...rest }: Props) {

  const { colors } = useTheme();
  const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300]


  return (
    <Pressable {...rest}>

      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"//Utilizado para limitar o comportamento do Box
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}  >
          <Text color="white" fontSize="md">
            Patrimônio {data.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5} >
          {
            data.status === 'closed' ?
              <CircleWavyCheck size={24} color={statusColor} />
              :
              <Hourglass size={24} color={statusColor} />

          }
        </Circle>

      </HStack >
    </Pressable>

  );
} 