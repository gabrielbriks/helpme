import { StyleSheet, Text, View } from 'react-native';

export function SingIn() {
  return (
    <View style={styles.container}>
      <Text>Olá, Gabriel!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '500'

  }
});