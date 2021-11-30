interface Clients {
  name: string;
  isActive: boolean;
  registration: string;
  checks: account[];
}
type account = Credit | Debet;

interface Debet {
  name: string;
  balance: number;
  isActive: boolean;
  activeData: string;
  currency: string;
}

interface Credit {
  name: string;
  balance: number;
  limit: number;
  isActive: boolean;
  activeData: string;
  currency: string;
}

class Client {
  name: string;
  isActive: boolean;
  registration: string;
  checks: account[];
  constructor(dataClient: Clients){
      this.name = dataClient.name;
      this.isActive = dataClient.isActive;
      this.registration = dataClient.registration;
      this.checks = dataClient.checks;
  }
}
interface IBank<T> {

}



class Bank {
  clients: Client[]
    constructor(){
        this.clients = [];
    }
  
    async haveMoney(callback: Function) {
        let response = await fetch ('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
        let currencies = (await response.json()).data;
        let result = 0;
        if(this.clients.length) {
            this.clients.forEach((client) => {
                if(client.checks.length) {
                    client.checks.forEach((check) => {
                        if(check.currency === callback(check)){
                            result += check.balance;
                        }
                        else {
                            result += (check.balance / currencies[check.currency]) * currencies[callback(check)];
                        }
                    })
                }
            })
            return result;
        }
        return null;
    }
  
    // async debtMoney(callback){
    //     let response = await fetch ('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    //     let {data} = await response.json();
    //     let result = 0;
    //     if(this.clients.length) {
    //         this.clients.forEach((client) => {
    //             if(client.checks.length){
    //                 client.checks.forEach((check) => {
    //                     if(check.name === 'Credit' && check.balance < check.limit){
    //                         if(check.currency === callback(check)){
    //                             result += check.limit - check.balance;
    //                         } else {
    //                             result += ((check.limit / data[check.currency]) * data[callback(check)]) - ((check.balance / data[check.currency]) * data[callback(check)]);
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //        return result;
    //     }
    //     return null;
    // }
  
    // async sumClientsDebt(callback, isActive){
    //     let response = await fetch ('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    //     let currencies = (await response.json()).data;
    //     let result = {};
    //     result.clients = 0;
    //     result.debt = 0;
    //     if(this.clients.length) {
    //         this.clients.forEach((client) => {
    //             if(isActive(client)){
    //                 client.checks.forEach((check) => {
    //                     if(check.name === 'Credit' && check.balance < check.limit){
    //                         if(check.currency === callback(check)){
    //                             result.clients++;
    //                             result.debt += check.limit - check.balance;
    //                         } else {
    //                             result.clients++;
    //                             result.debt += ((check.limit / currencies[check.currency]) * currencies[callback(check)]) - ((check.balance / currencies[check.currency]) * currencies[callback(check)]);
    //                         }
    //                     }
    //                 })
    //             }
    //         })
    //        return result;
    //     }
    //     return null;
    // }
  }
  let bank = new Bank()
  
