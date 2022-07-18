import { Button as ButtonNativeBase, Heading, IButtonProps } from 'native-base';

/*Estou unindo os dois tipo, "Seria meio que um extend"
  Nesse caso estou dizendo que o props é um "IButtonProps"
  & o que eu colocar la dentro das chaves
*/
type Props = IButtonProps & {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: "green.500" }}

      {...rest}
    >
      <Heading
        color="white"
        fontSize="sm"
      >
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}