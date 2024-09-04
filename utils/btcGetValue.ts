import axios from 'axios';

export async function btcGetValue() {
  try {
    const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin');
    return [response.data.data.priceUsd, response.data.timestamp];
  } catch (error) {
    console.error('Erro ao obter o valor do Bitcoin:', error);
    throw error;
  }
}
