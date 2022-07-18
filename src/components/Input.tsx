import { IInputProps, Input as NativeBaseInput } from 'native-base';

type PropsType = {
  placeholder: string
}

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      size="md"
      borderWidth={0}
      fontSize="md"
      fontFamily="body"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        borderColor: "green.500",
        bg: "green.700"
      }}
      {...rest}
    />

  );
}