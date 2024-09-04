import Colors from '@/constants/Colors';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ControlCard() {
  return (
    <View style={{ backgroundColor: '#f08700', padding: 10, alignItems: 'center', borderRadius: 10 }}>
      <View>
        <Text style={{ color: Colors.dark.text, fontSize: 25 }}>Mining Wallets</Text>
      </View>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TouchableOpacity style={{ backgroundColor: '#00a6a6', padding: 10, borderRadius: 5, margin: 3 }}>
          <Text style={{ color: Colors.dark.text }}>Definir novo alvo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#ea526f', padding: 10, borderRadius: 5, margin: 3 }}>
          <Text style={{ color: Colors.dark.text }}>Parar Execuções</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
