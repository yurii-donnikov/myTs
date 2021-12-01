interface Clients {
  name: string;
  isActive: boolean;
  registration: string;
  id?: number;
  checks: account[];
}
type account = Credit | Debet;

interface Debet {
  name: 'Debet';
  balance: number;
  isActive: boolean;
  activeData: string;
  currency: string;
}


interface Credit {
  name: 'Credit';
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
  id?: number;
  checks: account[];
  constructor(dataClient: Clients){
      this.name = dataClient.name;
      this.isActive = dataClient.isActive;
      this.registration = dataClient.registration;
      this.id = dataClient.id;
      this.checks = dataClient.checks;
  }
}
interface IBank {
  haveMoney(callback: Function): Promise<null | number>
  debtMoney(callback: Function): Promise<null | number>
  sumClientsDebt(callback: Function, isActive: Function): Promise<null | {[key: string]: number}>
}
interface IFilters {
    id: keyof Client; // <-- "id" | "filter1" | "filter2"
    title: string;
}





















class Bank implements IBank {
  clients: Client[]
  
    constructor(){
        this.clients = [];
    }
  addClient(dataClient: Client){
      this.clients.push(dataClient)
  }
  
    async haveMoney(callback: Function) {
        let response = await fetch ('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
        let currencies = (await response.json()).data;
        let result: number = 0;
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
  
    async debtMoney(callback: Function) {
        let response = await fetch ('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
        let {data} = await response.json();
        let result: number = 0;
        if(this.clients.length) {
            this.clients.forEach((client) => {
                if(client.checks.length){
                    client.checks.forEach((check) => {
                        if(check.name === 'Credit' && check.balance < check.limit){
                            if(check.currency === callback(check)){
                                result += check.limit - check.balance;
                            } else {
                                result += ((check.limit / data[check.currency]) * data[callback(check)]) - ((check.balance / data[check.currency]) * data[callback(check)]);
                            }
                        }
                    })
                }
            })
           return result;
        }
        return null;
    }
  
    async sumClientsDebt(callback: Function, isActive: Function){
        let response = await fetch ('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
        let currencies = (await response.json()).data;
        let result: {[key: string]: number} = {};
        result.clients = 0;
        result.debt = 0;
        if(this.clients.length) {
            this.clients.forEach((client) => {
                if(isActive(client)){
                    client.checks.forEach((check) => {
                        if(check.name === 'Credit' && check.balance < check.limit){
                            if(check.currency === callback(check)){
                                result.clients++;
                                result.debt += check.limit - check.balance;
                            } else {
                                result.clients++;
                                result.debt += ((check.limit / currencies[check.currency]) * currencies[callback(check)]) - ((check.balance / currencies[check.currency]) * currencies[callback(check)]);
                            }
                        }
                    })
                }
            })
           return result;
        }
        return null;
    }
  }
  let bank = new Bank()
  bank.addClient(new Client ({
  name: 'qwe',
  isActive: true,
  registration: 'qwe',
  checks: [
                    {
                        name: 'Debet',
                        balance: 1000,
                        isActive: true,
                        activeData: 'qwe',
                        currency: 'UAH',
                    },
                    {
                        name:'Credit',
                        balance: 1000,
                        limit: 1000,
                        isActive: true,
                        activeData: 'asd',
                        currency: 'UAH',
                    },
                ],
}))
  
  let mainBlock = document.querySelector('.mainBlock') as HTMLElement;
  mainBlock.innerHTML =
  `<div class="cardBlock"></div>
   <div class="addCard">add card</div>
   <div class="popupWindow">
     <div class="backgroundWindow"></div>
     <div class="modalWindow">
      <input type="text" placeholder="name" data-id="name" class="name">
      <label for="isActive">Active?</label>
      <input type="radio" id="isActive" data-id="isActive" class="isActive">
      <div class="Debet">
        <p>Debet</p>
        <input type="number" placeholder="balance" class="balance" data-id="balanceDebet">
        <label for="isActiveDebet">Active card?</label>
        <input type="radio" id="isActiveDebet" class="isActive" data-id="isActiveDebet">
        <select class="currency" data-id="currencyDebet">
          <option>UAH</option>
          <option>EUR</option>
          <option>RUB</option>
          <option>PLN</option>
        </select>
      </div>
      <div class="Credit">
        <p>Credit</p>
        <input type="number" placeholder="balance" class="balance" data-id="balanceCredit">
        <input type="number" placeholder="limit" class="limit" data-id="limitCredit">
        <label for="isActiveCredit">Active card?</label>
        <input type="radio" id="isActiveCredit" class="isActive" data-id="isActiveCredit">
        <select class="currency" data-id="currencyCredit">
          <option>UAH</option>
          <option>EUR</option>
          <option>RUB</option>
          <option>PLN</option>
        </select>
      </div>
      <div class="buttonSave">save</div>
  </div>`;
  let backgroundWindow = document.querySelector('.backgroundWindow') as HTMLElement;
  let popupWindow = document.querySelector('.popupWindow') as HTMLElement;
  let addCard = document.querySelector('.addCard') as HTMLElement;
  backgroundWindow.addEventListener('click', () => {
    popupWindow.setAttribute('style', 'display: none');
  })
  popupWindow.addEventListener('click', () => {
      changeCard();
  })
  addCard.addEventListener('click', () => {
      isFlag = true;
      popupWindow.setAttribute('style', 'display: block');
  })
  let clientCard = document.querySelector('.cardBlock') as HTMLElement;
  let blockProperty;
  let isFlag: boolean = false;
  let indexActiveCard: number;




    function createCard(){
      for(let i = 0; i < bank.clients.length; i++){
          if(!clientCard.children[i]){
            let objectClient: Client = bank.clients[i]
            //let objectClient: {[key: string]: number | string | boolean | account} = bank.clients[i]
            //let objectClient: {[key: string]: number | string | boolean | {[key: string]: number | boolean | string}[]} = bank.clients[i]
            //bank.clients[i]['id'] = i;
            
              clientCard.appendChild(document.createElement('div'));
              clientCard.className = 'clientCard';
              clientCard.setAttribute('data-id', String(bank.clients[i]['id']));
              
                  for(let property in objectClient){
                    let prop = property as keyof Client
                      if(property === 'checks'){
                        let nnn: account[] = objectClient[property]
                         createCheck(nnn);
                      } 
                      else {
                          if(property === 'checks'){}
                          blockProperty = clientCard.appendChild(document.createElement('div'));
                          blockProperty.className = 'blockProperty';
                          blockProperty.innerHTML =
                          `<span class="property">${property}</span>
                          <span class="${property}">${objectClient[prop]}</span>`;
                      }
                  }
              function createCheck(clientChecks: account[]){
                  for(let i = 0; i < clientChecks.length; i++){
                      let blockCheck = clientCard.appendChild(document.createElement('div'));
                      blockCheck.className = "blockCheck";
                      let clientCheck: {[key: string]: any} = clientChecks[i]
                      for(let item in clientCheck){
                        let items = item as keyof account
                          blockProperty = blockCheck.appendChild(document.createElement('div'));
                          blockProperty.innerHTML =
                          `<span class="checkProperty">${item}</span>
                           <span class="${item}${clientChecks[i]['name']}">${clientChecks[i][items]}</span>`;
                      }
                  }
              }

              let buttonChange = clientCard.appendChild(document.createElement('div'));
              buttonChange.innerText = 'Change';
              buttonChange.className = 'buttonChange';
              buttonChange.setAttribute('data-update', String(objectClient['id']));
              buttonChange.setAttribute('data-function', 'changeUser');
              let buttonDelete = clientCard.appendChild(document.createElement('div'));
              buttonDelete.innerText = 'Delete';
              buttonDelete.className = 'buttonDelete';
              buttonDelete.setAttribute('data-function', 'deleteUser');
              buttonDelete.setAttribute('data-update', String(objectClient['id']));

              clientCard.addEventListener('click', (event) => {
                let action = ((event.target) as Element).getAttribute('data-function');
                //let nnn: HTMLElement = this[String(action)]
                let self = this as HTMLElement;
                if(typeof self[String(action)] === 'function'){
                    self[String(action)](event.target);
                }
              })
          }
      }
  }
createCard()


function changeUser (item: HTMLElement){
    for(let i = 0; i < bank.clients.length; i++){
        if(bank.clients[i]['id'] === Number(item.getAttribute('data-update'))){
            indexActiveCard = bank.clients.indexOf(bank.clients[i]);
            popupWindow.setAttribute('style', 'display: none');
            ((document.querySelector('.popupWindow'))as HTMLElement).setAttribute('style', 'display: block');
        }
    }
}

function deleteUser (item: HTMLElement){
    for(let i = 0; i < bank.clients.length; i++){
        if(bank.clients[i]['id'] === Number(item.getAttribute('data-update'))){
        let indexElement = bank.clients.indexOf(bank.clients[i]);
        ((item.parentNode)as HTMLElement).remove();
        bank.clients.splice(indexElement, 1);
        }
    }
}

let newClient: {[key: string]: number | string | boolean | any[]} = {};
let indexObject = 0;















function changeCard() {
     
     let childrenPopup = ((document.querySelector('.modalWindow'))as HTMLElement).children;
      
          for(let i = 0; i < childrenPopup.length; i++) {
           
              if(childrenPopup[i].className === 'Debet' || childrenPopup[i].className === 'Credit'){
                  if(isFlag){
                      newClient.checks = []
                      newClient.checks[indexObject] = {};
                      newClient.checks[indexObject]['name'] = childrenPopup[i].className;
                      newClient.checks[indexObject]['registration'] = new Date();
                      updateCheck(childrenPopup[i]);
                      indexObject++;
                  } else {
                      updateCheck(childrenPopup[i]);
                  }
              } else {
                  if(((childrenPopup[i])as HTMLInputElement).type === 'radio'){
                      let name = childrenPopup[i].className;
                      if(isFlag){
                          newClient[name] = ((childrenPopup[i])as HTMLInputElement).checked;
                      } 
                      else {
                          bank.clients[indexActiveCard][name] = ((childrenPopup[i]) as HTMLInputElement).checked;
                          document.getElementsByClassName(childrenPopup[i].getAttribute('data-id'))[indexActiveCard].innerText = ((childrenPopup[i])as HTMLInputElement).checked;
                      }
                      ((childrenPopup[i])as HTMLInputElement).checked = false;
                  } else {
                      if(((childrenPopup[i])as HTMLInputElement).value) {
                          let name = childrenPopup[i].className;
                          if(isFlag){
                              newClient[name] = ((childrenPopup[i])as HTMLInputElement).value;
                              newClient['registration'] = new Date();
                          } else{
                              bank.clients[indexActiveCard]['name'] = ((childrenPopup[i])as HTMLInputElement).value;
                              document.getElementsByClassName(childrenPopup[i].getAttribute('data-id'))[indexActiveCard].innerText = childrenPopup[i].value;
                          }
                          ((childrenPopup[i])as HTMLInputElement).value = '';
                      }
                  }
              }
          }
      
      function updateCheck(itemСheck: HTMLInputElement){
      //     if(isFlag){
      //         for(let i = 0; i < itemСheck.children.length; i++){
      //             if(itemСheck.children[i].type === 'radio'){
      //                 let name = itemСheck.children[i].className;
      //                 newClient.checks[indexObject][name] = itemСheck.children[i].checked;
      //                 itemСheck.children[i].checked = false;
      //             } 
      //             else {
      //                 if(itemСheck.children[i].value) {
      //                     if(itemСheck.children[i].valueAsNumber) {
      //                         let name = itemСheck.children[i].className;
      //                         newClient.checks[indexObject][name] = itemСheck.children[i].valueAsNumber;
      //                         itemСheck.children[i].valueAsNumber = undefined;
      //                     } else {
      //                         let name = itemСheck.children[i].className;
      //                         newClient.checks[indexObject][name] = itemСheck.children[i].value;
      //                     }
      //                 }
      //             }
      //         } 
      //     } else {
      //         for(let i = 0; i < bank.clients[indexActiveCard].checks.length; i++){
      //             if(bank.clients[indexActiveCard].checks[i].name === itemСheck.className){
      //                 for(let j = 0; j < itemСheck.children.length; j++) {
      //                     if(itemСheck.children[j].type === 'radio'){
      //                         let nameClass = itemСheck.children[j].className;
      //                         bank.clients[indexActiveCard].checks[i][nameClass] = itemСheck.children[j].checked;
      //                         document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[indexActiveCard].innerText = 
      //                         itemСheck.children[j].checked;
      //                         itemСheck.children[j].checked = false;
      //                     } else {
      //                         if(itemСheck.children[j].value) {
      //                             if(itemСheck.children[j].valueAsNumber) {
      //                                 let nameClass = itemСheck.children[j].className;
      //                                 bank.clients[indexActiveCard].checks[i][nameClass] = itemСheck.children[j].valueAsNumber;
      //                                 document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[indexActiveCard].innerText = 
      //                                 itemСheck.children[j].valueAsNumber;
      //                                 itemСheck.children[j].valueAsNumber = undefined;
      //                             } else {
      //                                 let nameClass = itemСheck.children[j].className;
      //                                 bank.clients[indexActiveCard].checks[i][nameClass] = itemСheck.children[j].value;
      //                                 document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[indexActiveCard].innerText = 
      //                                 itemСheck.children[j].value;
      //                             }
      //                         }
      //                     }
      //                 }
      //             }
      //         }
      //     }
      }
      if(isFlag) {
          bank.clients.push(newClient);
          isFlag = false;
          newClient = {checks: [],};
          indexObject = 0;
          createCard();
      }
       //popupWindow.setAttribute('style', 'display: none');
      ((document.querySelector('.popupWindow'))as HTMLElement).setAttribute('style', 'display: none');
}