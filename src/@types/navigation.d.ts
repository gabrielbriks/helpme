
/** Criado para especificar todas as rotas da aplicação
 * Fazemos uma declaração global e sobrecreve o namespace do react
 * Dessa forma, vou conseguir ver essas rotas ao utilizar o navigate()
 */

export declare global {
  namespace ReactNavigation {
      interface RootParamList {
        home: undefined; //Não tem parametro
        new: undefined; //Não tem parametro
        details: {orderId: string}; //Possui paramentro: Para buscar a 'order' do banco

      }
  }
}