import { View, Text, ScrollView, Pressable } from 'react-native';
import Colors from '@/constants/Colors';
interface ListingProps {
  id: string;
  address: string;
  status: string;
  positiveBalance: number;
  negativeBalance: number;
}

export default function listing(dataProps: ListingProps[], btcValue: number) {
  return (
    <ScrollView style={{}}>
      {dataProps.map((item, index) => (
        <View key={index} style={{ backgroundColor: '#363537', margin: 5, borderRadius: 10, padding: 5 }}>
          <View style={{ justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: Colors.dark.text }}>Carteira: {item.id}</Text>
              <Text style={{ color: item.status === 'Solved' ? '#ef2d56' : '#2fbf71' }}>
                {item.status === 'Solved' ? 'Já resolvido' : 'Ainda não resolvido'}
              </Text>
            </View>
            <Text style={{ color: Colors.dark.text }}>Endereço: {item.address}</Text>
          </View>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{}}>
              <Text style={{ color: Colors.dark.text }}>Saldo atual: {item.positiveBalance} BTC </Text>
              <Text style={{ color: Colors.dark.text }}>
                Valor estimado: U$
                {(item.positiveBalance * btcValue)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                  .replace(/(\d+)\.(\d{2})$/, '$1,$2')}
              </Text>
            </View>
          </View>
          <View>
            <Pressable
              style={{
                backgroundColor: Colors.dark.tint,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                marginTop: 10,
              }}
            >
              <Text style={{ color: Colors.light.text }}>Detalhes</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
