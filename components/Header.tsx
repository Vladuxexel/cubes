import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>Header</Text>
      </View>  
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
      color: 'red'
  }
});