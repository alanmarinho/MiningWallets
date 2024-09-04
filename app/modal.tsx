import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useRoute, RouteProp } from '@react-navigation/native';
import { btcGetValue } from '@/utils/btcGetValue';
import { useEffect, useState } from 'react';

interface ItemProps {
  item: any;
  id: string;
  address: string;
  status: string;
  positiveBalance: number;
  negativeBalance: number;
}

type RouteParams = {
  item: ItemProps;
};

export default function ModalScreen() {
  const route = useRoute<RouteProp<RouteParams, 'item'>>();
  const item: ItemProps | undefined = route.params;
  const [btcValue, setBtcValue] = useState(0);
  useEffect(() => {
    const btc = async () => {
      const btc = await btcGetValue();
      setBtcValue(Number(btc[0]));
    };
    btc();
  }, []);
  const toSuperscript = (num: number) => {
    const superscriptMap = {
      '0': '\u2070',
      '1': '\u00B9',
      '2': '\u00B2',
      '3': '\u00B3',
      '4': '\u2074',
      '5': '\u2075',
      '6': '\u2076',
      '7': '\u2077',
      '8': '\u2078',
      '9': '\u2079',
      '-': '\u207B',
    };

    return num
      .toString()
      .split('')
      .map((digit) => superscriptMap[digit] || digit)
      .join('');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {!!item ? (
        <View style={{ backgroundColor: '#D9D9D9', marginTop: 20, alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ color: '#fff', fontSize: 20 }}>Carteira: {item.item.id}</Text>
          <View style={{ backgroundColor: '#ADADAD', padding: 5 }}>
            <Text style={{ color: '#fff' }}>
              Status: {item.item.status === 'Solved' ? 'Resolvido' : 'Não resolvido'}
            </Text>
            <Text style={{ color: '#fff' }}>Endereço: {item.item.address}</Text>
            <Text style={{ color: '#fff' }}>Saldo: {item.item.positiveBalance} BTC</Text>
            <Text style={{ color: '#fff' }}>
              Valor estimado: U$
              {(item.item.positiveBalance * btcValue)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                .replace(/(\d+)\.(\d{2})$/, '$1,$2')}
            </Text>
            <Text style={{ color: '#fff' }}>
              Intervalo da chave: (2{toSuperscript(item.item.id - 1)}) ... (2{toSuperscript(item.item.id)}) - 1
            </Text>
            <Text style={{ color: '#fff' }}>Quant. Possibilidades: {}</Text>
          </View>
        </View>
      ) : (
        <Text style={{ color: '#fff' }}>Erro ao carregar dados</Text>
      )}
    </View>
  );
}
