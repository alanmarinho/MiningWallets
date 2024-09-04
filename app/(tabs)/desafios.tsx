import { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getData from '@/utils/getData';
import listing from '@/components/desafios/list';
import Colors from '@/constants/Colors';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { btcGetValue } from '@/utils/btcGetValue';
import { StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

interface dataProps {
  id: string;
  address: string;
  status: string;
  positiveBalance: number;
  negativeBalance: number;
}

export default function TabTwoScreen() {
  const [data, setData] = useState<dataProps[]>();
  const [sortData, setSortData] = useState<dataProps[]>();
  const [btcValue, setBtcValue] = useState(0);
  const [BTCTime, setBTCTime] = useState(new Date());

  const [value, setValue] = useState<number>(0);
  const [isFocus, setIsFocus] = useState(false);

  const [attList, setAttList] = useState(false);
  const [attBTC, setAttBTC] = useState(false);

  const options = [
    { title: 'Todos', value: '0' },
    { title: 'Resolvidos', value: '1' },
    { title: 'Não resolvidos', value: '2' },
  ];

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
        const storedData = await AsyncStorage.getItem('puzzlesData');

        if (storedData) {
          setData(JSON.parse(storedData));
          console.log('Dados recuperados do AsyncStorage');
        } else {
          console.log('Dados requisitados da API');
          const fetchedData: dataProps[] | boolean = await getData();
          if (fetchedData == false) {
            return;
          } else {
            setData(fetchedData);
            await AsyncStorage.setItem('puzzlesData', JSON.stringify(fetchedData));
          }
        }
      } catch (error) {
        console.error('Erro ao acessar o AsyncStorage:', error);
      }
    };

    storageData();
  }, []);
  const attBTCValue = async () => {
    try {
      setAttBTC(true);
      const btc = await btcGetValue();
      setBtcValue(Number(btc[0]));
      setBTCTime(new Date(btc[1]));
      setAttBTC(false);
    } catch (error) {
      console.error('Erro ao acessar valor do btc:', error);
    }
  };
  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}-${hours}:${minutes}:${seconds}`;
  };
  const attWalletsList = async () => {
    try {
      setAttList(true);
      const fetchedData: dataProps[] | boolean = await getData();
      if (fetchedData == false) {
        return;
      } else {
        setData(fetchedData);
        await AsyncStorage.setItem('puzzlesData', JSON.stringify(fetchedData));
      }
      setAttList(false);
    } catch (error) {
      console.error('Erro ao acessar o AsyncStorage:', error);
    }
  };
  const sortDataList = (value: number) => {
    if (data && value === 0) {
      setSortData(data);
    } else if (value === 1) {
      setSortData(data && data.filter((item) => item.status === 'Solved'));
    } else {
      setSortData(data && data.filter((item) => item.status === 'Unsolved'));
    }
  };
  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
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
                {!!attBTC ? (
                  <ActivityIndicator size="small" color={Colors.dark.tint} />
                ) : (
                  <FontAwesome name="refresh" color={'#fff'} size={28}></FontAwesome>
                )}
              </Pressable>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
              <Pressable
                style={{ backgroundColor: '#FF900E', padding: 10, borderRadius: 10, flexDirection: 'row' }}
                onPress={() => attWalletsList()}
              >
                <Text style={{ color: Colors.dark.text }}>Atualizar Lista</Text>
                {!!attList ? (
                  <ActivityIndicator size="small" color={Colors.dark.tint} />
                ) : (
                  <FontAwesome style={{ marginLeft: 10 }} name="refresh" color={'#fff'} size={24}></FontAwesome>
                )}
              </Pressable>
              <SelectDropdown
                data={options}
                onSelect={(selectedItem, index) => {
                  sortDataList(Number(selectedItem.value));
                }}
                defaultValue={options[0]}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      {selectedItem && <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />}
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) || 'Selecione uma opção'}
                      </Text>
                      <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                      <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                      <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <Text style={{ color: Colors.dark.text, fontSize: 20, textAlign: 'center', marginTop: 10 }}>
              {sortData ? sortData.length : data ? data.length : 0}/160
            </Text>
          </View>
        </View>
      </View>
      <View>
        {data ? (
          listing(sortData ? sortData : data, btcValue)
        ) : (
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" color={Colors.dark.tint} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#FF900E',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
    color: '#fff',
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
