import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação correta
import getData from '@/utils/getData';
import listing from '@/components/desafios/list';
import Colors from '@/constants/Colors';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { btcGetValue } from '@/utils/btcGetValue';
export default function TabTwoScreen() {
  const [data, setData] = useState();
  const [btcValue, setBtcValue] = useState(0);
  const [BTCTime, setBTCTime] = useState(new Date());
  useEffect(() => {
    try {
      const btc = async () => {
        const btc = await btcGetValue();
        setBtcValue(Number(btc[0]));
        setBTCTime(new Date(btc[1]));
      };
      btc();
    } catch (error) {
      console.error('Erro ao acessar valor do btc:', error);
    }
    const storageData = async () => {
      try {
        // Tenta buscar os dados no AsyncStorage
        const storedData = await AsyncStorage.getItem('puzzlesData');

        if (storedData) {
          console.log('Data from storage:', storedData);
          setData(JSON.parse(storedData)); // Converte a string para JSON
        } else {
          // Se os dados não existirem, executa a getData e armazena o resultado
          const fetchedData = await getData();
          setData(fetchedData);
          await AsyncStorage.setItem('puddlesData', JSON.stringify(fetchedData)); // Converte para string antes de armazenar
        }
      } catch (error) {
        console.error('Erro ao acessar o AsyncStorage:', error);
      }
    };

    storageData();
  }, []);
  const attBTCValue = async () => {
    try {
      const btc = await btcGetValue();
      setBtcValue(Number(btc[0]));
      setBTCTime(new Date(btc[1]));
    } catch (error) {
      console.error('Erro ao acessar valor do btc:', error);
    }
  };
  const formatDateTime = (date: Date) => {
    // Obtém os componentes da data e hora
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Formata a data e a hora
    return `${day}/${month}-${hours}:${minutes}:${seconds}`;
  };
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
        <Text style={{ color: Colors.dark.text, fontSize: 30 }}>Desafios</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesome name="btc" color={'#f1d302'} size={28}></FontAwesome>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: Colors.dark.text, margin: 3 }}>
              U$
              {btcValue
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
                .replace(/(\d+)\.(\d{2})$/, '$1,$2')}
            </Text>
            <Text style={{ color: '#bfada3', fontSize: 10 }}>{formatDateTime(BTCTime)}</Text>
          </View>
          <Pressable style={{}} onPress={() => attBTCValue()}>
            <FontAwesome name="refresh" color={'#fff'} size={28}></FontAwesome>
          </Pressable>
        </View>
      </View>
      <View>{data ? listing(data, btcValue) : <Text style={{ color: Colors.dark.text }}>Carregando...</Text>}</View>
    </View>
  );
}
