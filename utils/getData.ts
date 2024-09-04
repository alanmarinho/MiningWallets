import axios from 'axios';
import cheerio from 'react-native-cheerio';

interface dataProps {
  id: string;
  address: string;
  status: string;
  positiveBalance: number;
  negativeBalance: number;
}

async function getData() {
  try {
    const { data } = await axios.get('https://btcpuzzle.info/puzzlelist');
    const dados: dataProps[] = [];
    const $ = cheerio.load(data);
    const puzzletable = $('.PuzzleList_table');
    const puzzleRows = $('tr').filter((i, element) => {
      const classList = $(element).attr('class');
      // Verifica se a classe está presente e se começa com os prefixos desejados
      return classList && (classList.includes('PuzzleList_foundArea') || classList.includes('PuzzleList_notFoundArea'));
    });
    puzzleRows.each((i, element) => {
      const puzzleID = $(element).find('td').eq(0).text();
      const puzzleStatus = $(element).find('td').eq(2).text();
      const puzzleBalance = $(element).find('td').eq(3).text();

      const puzze = puzzleID.match(/\d+/)[0];

      const matchStatus = puzzleStatus.match(/([a-zA-Z0-9]+)(Solved|Unsolved)/);
      const Address = matchStatus ? matchStatus[1] : 'Unknown';
      const status = matchStatus ? matchStatus[2] : 'Unknown';

      const btcMatch = puzzleBalance.match(/🟢([\d.,]+)BTC🔴([\d.,]+)BTC/);
      const positiveBalance = btcMatch ? btcMatch[1] : 'Unknown';
      const negativeBalance = btcMatch ? btcMatch[2] : 'Unknown';

      dados.push({
        id: puzze,
        address: Address,
        status: status,
        positiveBalance: positiveBalance,
        negativeBalance: negativeBalance,
      });
    });
    return dados;
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    return false;
  }
}

export default getData;
