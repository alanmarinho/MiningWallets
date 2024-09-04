#Projeto Mining Wallets

O projeto Mining Wallets consiste em um app simples desenvolvimento em React Native que tem como objetivo participar do desafio Puzzle Wallets de BTC

O desafio Puzzle Wallets de BTC consiste em uma série de 160 carteiras de BTC onde a sua chave de acesso está ente um intervalo conhecido, e caso a pessoal que conseguir descobrir a chave correta de acesso à carteira, poderá fazer oque quiser com o valor de BTC que estiver nela.

Ex: Carteira número 10 a chave está em 2<sup>9</sup> e 2<sup>10</sup>- 1, carteira número 66 a chave está entre 2<sup>65</sup> e 2<sup>66</sup>- 1 e assim por diante até a carteira 160.


## Tecnologias usadas:
- React Native
- axios
- react-native-cheerio
- ...

## Abordagem
### Coleta de dados das carteiras na web
- Web Scraping: https://btcpuzzle.info/puzzlelist
- API de preços do Bitcoin: https://api.coincap.io/v2/assets/bitcoin
- ...

### Nota aos envolvido - btcpuzzle.info
Realizei Web Scraping da sua página https://btcpuzzle.info/puzzlelist para obter os dados das carteiras de forma mais atualizada que manter um arquivo fixo e mais barata que assinar uma API de consultas a carteiras de BTC, não encontrei em seu site um comunicado que proibia o Web Scraping, mas caso quera que o eu remova o seu site como base de dados, basta entrar em contato comigo que farei sem exitar. Caso tenha conhecimento do que estou fazendo e queira permitir que eu continue, saiba que este app não tem fins comerciais, é apenas um projeto para agregar em meu portifólio de programador.

Atenciosamente, Alan Marinho.

alanmarinho020@gmail.com
