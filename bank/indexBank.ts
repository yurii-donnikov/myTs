// interface Clients {
//   name: string;
//   isActive: boolean;
//   registration: string;
//   id ? : number;
//   checks: account[];
// }
// type account = Credit | Debet;

// interface Debet {
//   name: 'Debet';
//   balance: number;
//   isActive: boolean;
//   activeData: string;
//   currency: string;
// }


// interface Credit {
//   name: 'Credit';
//   balance: number;
//   limit: number;
//   isActive: boolean;
//   activeData: string;
//   currency: string;
// }


// class Client {
//   name: string;
//   isActive: boolean;
//   registration: string;
//   id ? : number;
//   checks: account[];
//   constructor(dataClient: Clients) {
//     this.name = dataClient.name;
//     this.isActive = dataClient.isActive;
//     this.registration = dataClient.registration;
//     this.id = dataClient.id;
//     this.checks = dataClient.checks;
//   }
// }
// interface IBank {
//   haveMoney(callback: Function): Promise < null | number >
//     debtMoney(callback: Function): Promise < null | number >
//     sumClientsDebt(callback: Function, isActive: Function): Promise < null | {
//       [key: string]: number
//     } >
// }

// class Bank implements IBank {
//   clients: Client[]

//   constructor() {
//     this.clients = [];
//   }
//   addClient(dataClient: Client) {
//     this.clients.push(dataClient)
//   }

//   async haveMoney(callback: Function) {
//     let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
//     let currencies = (await response.json()).data;
//     let result: number = 0;
//     if (this.clients.length) {
//       this.clients.forEach((client) => {
//         if (client.checks.length) {
//           client.checks.forEach((check) => {
//             if (check.currency === callback(check)) {
//               result += check.balance;
//             } else {
//               result += (check.balance / currencies[check.currency]) * currencies[callback(check)];
//             }
//           })
//         }
//       })
//       return result;
//     }
//     return null;
//   }

//   async debtMoney(callback: Function) {
//     let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
//     let {
//       data
//     } = await response.json();
//     let result: number = 0;
//     if (this.clients.length) {
//       this.clients.forEach((client) => {
//         if (client.checks.length) {
//           client.checks.forEach((check) => {
//             if (check.name === 'Credit' && check.balance < check.limit) {
//               if (check.currency === callback(check)) {
//                 result += check.limit - check.balance;
//               } else {
//                 result += ((check.limit / data[check.currency]) * data[callback(check)]) - ((check.balance / data[check.currency]) * data[callback(check)]);
//               }
//             }
//           })
//         }
//       })
//       return result;
//     }
//     return null;
//   }

//   async sumClientsDebt(callback: Function, isActive: Function) {
//     let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
//     let currencies = (await response.json()).data;
//     let result: {
//       [key: string]: number
//     } = {};
//     result.clients = 0;
//     result.debt = 0;
//     if (this.clients.length) {
//       this.clients.forEach((client) => {
//         if (isActive(client)) {
//           client.checks.forEach((check) => {
//             if (check.name === 'Credit' && check.balance < check.limit) {
//               if (check.currency === callback(check)) {
//                 result.clients++;
//                 result.debt += check.limit - check.balance;
//               } else {
//                 result.clients++;
//                 result.debt += ((check.limit / currencies[check.currency]) * currencies[callback(check)]) - ((check.balance / currencies[check.currency]) * currencies[callback(check)]);
//               }
//             }
//           })
//         }
//       })
//       return result;
//     }
//     return null;
//   }
// }
// let bank = new Bank()




// bank.addClient(new Client({
//   name: 'qwe',
//   isActive: true,
//   registration: 'qwe',
//   checks: [{
//       name: 'Debet',
//       balance: 1000,
//       isActive: true,
//       activeData: 'qwe',
//       currency: 'UAH',
//     },
//     {
//       name: 'Credit',
//       balance: 1000,
//       limit: 1000,
//       isActive: true,
//       activeData: 'asd',
//       currency: 'UAH',
//     },
//   ],
// }))

// bank.addClient(new Client({
//   name: 'asd',
//   isActive: true,
//   registration: 'zxc',
//   checks: [{
//       name: 'Debet',
//       balance: 1000,
//       isActive: true,
//       activeData: 'qwe',
//       currency: 'UAH',
//     },
//     {
//       name: 'Credit',
//       balance: 1000,
//       limit: 1000,
//       isActive: true,
//       activeData: 'asd',
//       currency: 'UAH',
//     },
//   ],
// }))
// let as: any

// class Render {
//   mainBlock: HTMLElement;
//   clientCard ? : HTMLElement;
//   cardBlock ? : HTMLElement;
//   buttonChange ? : HTMLElement;
//   buttonDelete ? : HTMLElement;
//   indexActiveCard ? : number;

//   // clientCard = document.querySelector('.cardBlock') as HTMLElement;
//   blockProperty ? : HTMLElement
//   // bankCalculation: Bank;
//   // modal: HTMLElement;
//   // counter: number;
//   constructor(container: string) {
//     this.mainBlock = document.querySelector(container) as HTMLElement;
//     this.createStartInterface(this.mainBlock)
//     this.createCard()
//     //this.clientCard = 
//     // this.mainRender(this.root);
//     // this.modal = this.createModal();
//     // this.root.append(this.modal);
//     // this.counter = 0;
//   }
//   createStartInterface(container: HTMLElement) {
//     container.innerHTML =
//       `<div class="cardBlock"></div>
//    <div class="addCard">add card</div>
//    <div class="popupWindow">
//      <div class="backgroundWindow"></div>
//      <div class="modalWindow">
//       <input type="text" placeholder="name" data-id="name" class="name">
//       <label for="isActive">Active?</label>
//       <input type="radio" id="isActive" data-id="isActive" class="isActive">
//       <div class="Debet">
//         <p>Debet</p>
//         <input type="number" placeholder="balance" class="balance" data-id="balanceDebet">
//         <label for="isActiveDebet">Active card?</label>
//         <input type="radio" id="isActiveDebet" class="isActive" data-id="isActiveDebet">
//         <select class="currency" data-id="currencyDebet">
//           <option>UAH</option>
//           <option>EUR</option>
//           <option>RUB</option>
//           <option>PLN</option>
//         </select>
//       </div>
//       <div class="Credit">
//         <p>Credit</p>
//         <input type="number" placeholder="balance" class="balance" data-id="balanceCredit">
//         <input type="number" placeholder="limit" class="limit" data-id="limitCredit">
//         <label for="isActiveCredit">Active card?</label>
//         <input type="radio" id="isActiveCredit" class="isActive" data-id="isActiveCredit">
//         <select class="currency" data-id="currencyCredit">
//           <option>UAH</option>
//           <option>EUR</option>
//           <option>RUB</option>
//           <option>PLN</option>
//         </select>
//       </div>
//       <div class="buttonSave">save</div>
//   </div>`;
//     ((document.querySelector('.addCard')) as HTMLElement).addEventListener('click', () => {
//       ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: block');
//     });
//     ((document.querySelector('.backgroundWindow')) as HTMLElement).addEventListener('click', () => {
//       ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
//     });
//     ((document.querySelector('.buttonSave')) as HTMLElement).addEventListener('click', () => {
//       ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
//     })
//   }
//   createCard() {
//     for (let i = 0; i < bank.clients.length; i++) {
//       bank.clients[i]['id'] = i;
//       this.cardBlock = document.querySelector('.cardBlock') as HTMLElement
//       // console.log(this.clientCard.children)
//       // console.log(this.clientCard)
//       // qw = this.clientCard.children
//       // console.log(!this.clientCard.children[i])
//       // if (!this.clientCard.children[i]) {
//       //   console.log(123456)
//       // }

//       if (!this.cardBlock.children[i]) {
//         //console.log(this.clientCard.children[i])
//         // // as = this.clientCard.children[i]
//         //this.clientCard = document.querySelector('.cardBlock').children[i];
//         let objectClient: Client = bank.clients[i];
//         this.clientCard = this.cardBlock.appendChild(document.createElement('div'));
//         this.clientCard.classList.add("clientCard")
//         // this.clientCard.setAttribute('data-id', String(bank.clients[i]['id']));
//         this.clientCard.setAttribute('data-id', String(i));

//         console.log(objectClient)
//         for (let property in objectClient) {
//           let prop = property as keyof Client
//           if (property === 'checks') {
//             //console.log('asdf')

//             for (let i = 0; i < objectClient[property].length; i++) {

//               let blockCheck = this.clientCard.appendChild(document.createElement('div'));
//               blockCheck.className = "blockCheck";
//               let clientCheck = objectClient[property][i]
//               for (let item in clientCheck) {
//                 let items = item as keyof account
//                 this.blockProperty = blockCheck.appendChild(document.createElement('div'));
//                 this.blockProperty.innerHTML =
//                   `<span class="checkProperty">${item}</span>
//                            <span class="${item}${objectClient[property][i]['name']}">${objectClient[property][i][items]}</span>`;
//               }
//             }



//           } else {
//             this.blockProperty = this.clientCard.appendChild(document.createElement('div'));
//             this.blockProperty.className = 'blockProperty';
//             this.blockProperty.innerHTML =
//               `<span class="property">${property}</span>
//                 <span class="${property}">${objectClient[prop]}</span>`;
//           }
//         }
//         this.buttonChange = this.clientCard.appendChild(document.createElement('div'));
//         this.buttonChange.innerText = 'Change';
//         this.buttonChange.className = 'buttonChange';
//         this.buttonChange.setAttribute('data-update', String(bank.clients[i]['id']));
//         this.buttonChange.setAttribute('data-function', 'changeUser');
//         this.buttonDelete = this.clientCard.appendChild(document.createElement('div'));
//         this.buttonDelete.innerText = 'Delete';
//         this.buttonDelete.className = 'buttonDelete';
//         this.buttonDelete.setAttribute('data-function', 'deleteUser');
//         this.buttonDelete.setAttribute('data-update', String(bank.clients[i]['id']));

//         // this.clientCard.addEventListener('click', (event) => {
//         //   let action = ((event.target) as Element).getAttribute('data-function');
//         //   let self: {[key: string]: any} = window;
//         //   if (typeof window[String(action)] === 'function') {
//         //     window[String(action)](event.target);
//         //   }
//         // })
//         this.clientCard.addEventListener('click', (event) => {
//           console.log(123)
//           let action = ((event.target) as Element).getAttribute('data-function');
//           //let nnn: HTMLElement = this[String(action)]
//           let self: {
//             [key: string]: any
//           } = window;

//           if (typeof self[String(action)] === 'function') {
//             self[String(action)](event.target);
//           }
//         })
//       }
//     }
//   }
//   changeUser(item: HTMLElement) {
//     for (let i = 0; i < bank.clients.length; i++) {
//       if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
//         this.indexActiveCard = bank.clients.indexOf(bank.clients[i]);
//         ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: block');

//       }
//     }
//   }

//   deleteUser(item: HTMLElement) {
//     for (let i = 0; i < bank.clients.length; i++) {
//       if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
//         let indexElement = bank.clients.indexOf(bank.clients[i]);
//         ((item.parentNode) as Element).remove();
//         bank.clients.splice(indexElement, 1);
//       }
//     }
//   }

//   //func() {}
// }
// let qw: any
// let render = new Render('.mainBlock')

interface Clients {
  name: string;
  isActive: boolean;
  registration: string;
  id ? : number;
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
  id ? : number;
  checks: account[];
  constructor(dataClient: Clients) {
    this.name = dataClient.name;
    this.isActive = dataClient.isActive;
    this.registration = dataClient.registration;
    this.id = dataClient.id;
    this.checks = dataClient.checks;
  }
}
interface IBank {
  haveMoney(callback: Function): Promise < null | number >
    debtMoney(callback: Function): Promise < null | number >
    sumClientsDebt(callback: Function, isActive: Function): Promise < null | {
      [key: string]: number
    } >
}

class Bank implements IBank {
  clients: Client[]

  constructor() {
    this.clients = [];
  }
  addClient(dataClient: Client) {
    this.clients.push(dataClient)
  }

  async haveMoney(callback: Function) {
    let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    let currencies = (await response.json()).data;
    let result: number = 0;
    if (this.clients.length) {
      this.clients.forEach((client) => {
        if (client.checks.length) {
          client.checks.forEach((check) => {
            if (check.currency === callback(check)) {
              result += check.balance;
            } else {
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
    let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    let {
      data
    } = await response.json();
    let result: number = 0;
    if (this.clients.length) {
      this.clients.forEach((client) => {
        if (client.checks.length) {
          client.checks.forEach((check) => {
            if (check.name === 'Credit' && check.balance < check.limit) {
              if (check.currency === callback(check)) {
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

  async sumClientsDebt(callback: Function, isActive: Function) {
    let response = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9');
    let currencies = (await response.json()).data;
    let result: {
      [key: string]: number
    } = {};
    result.clients = 0;
    result.debt = 0;
    if (this.clients.length) {
      this.clients.forEach((client) => {
        if (isActive(client)) {
          client.checks.forEach((check) => {
            if (check.name === 'Credit' && check.balance < check.limit) {
              if (check.currency === callback(check)) {
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




bank.addClient(new Client({
  name: 'qwe',
  isActive: true,
  registration: 'qwe',
  checks: [{
      name: 'Debet',
      balance: 1000,
      isActive: true,
      activeData: 'qwe',
      currency: 'UAH',
    },
    {
      name: 'Credit',
      balance: 1000,
      limit: 1000,
      isActive: true,
      activeData: 'asd',
      currency: 'UAH',
    },
  ],
}))

bank.addClient(new Client({
  name: 'asd',
  isActive: true,
  registration: 'zxc',
  checks: [{
      name: 'Debet',
      balance: 1000,
      isActive: true,
      activeData: 'qwe',
      currency: 'UAH',
    },
    {
      name: 'Credit',
      balance: 1000,
      limit: 1000,
      isActive: true,
      activeData: 'asd',
      currency: 'UAH',
    },
  ],
}))
let as: any

class Render {
  mainBlock: HTMLElement;
  clientCard?: HTMLElement;
  cardBlock?: HTMLElement;
  buttonChange?: HTMLElement;
  buttonDelete?: HTMLElement;
  indexActiveCard?: number;
  isFlag?: boolean;

  // clientCard = document.querySelector('.cardBlock') as HTMLElement;
  blockProperty?: HTMLElement
  // bankCalculation: Bank;
  // modal: HTMLElement;
  // counter: number;
  constructor(container: string) {
    this.mainBlock = document.querySelector(container) as HTMLElement;
    this.createStartInterface(this.mainBlock)
    this.createCard()
    //this.clientCard = 
    // this.mainRender(this.root);
    // this.modal = this.createModal();
    // this.root.append(this.modal);
    // this.counter = 0;
  }
  createStartInterface(container: HTMLElement) {
    container.innerHTML =
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
    ((document.querySelector('.addCard')) as HTMLElement).addEventListener('click', () => {
      this.isFlag = true;
      ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: block');
    });
    ((document.querySelector('.backgroundWindow')) as HTMLElement).addEventListener('click', () => {
      ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
    });
    ((document.querySelector('.buttonSave')) as HTMLElement).addEventListener('click', () => {
      ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: none');
    })
  }
  createCard() {
    for (let i = 0; i < bank.clients.length; i++) {
      bank.clients[i]['id'] = i;
      this.cardBlock = document.querySelector('.cardBlock') as HTMLElement
      // console.log(this.clientCard.children)
      // console.log(this.clientCard)
      // qw = this.clientCard.children
      // console.log(!this.clientCard.children[i])
      // if (!this.clientCard.children[i]) {
      //   console.log(123456)
      // }

      if (!this.cardBlock.children[i]) {
        //console.log(this.clientCard.children[i])
        // // as = this.clientCard.children[i]
        //this.clientCard = document.querySelector('.cardBlock').children[i];
        let objectClient: Client = bank.clients[i];
        this.clientCard = this.cardBlock.appendChild(document.createElement('div'));
        this.clientCard.classList.add("clientCard")
        // this.clientCard.setAttribute('data-id', String(bank.clients[i]['id']));
        this.clientCard.setAttribute('data-id', String(i));

        //console.log(objectClient)
        for (let property in objectClient) {
          let prop = property as keyof Client
          if (property === 'checks') {
            //console.log('asdf')

            for (let i = 0; i < objectClient[property].length; i++) {

              let blockCheck = this.clientCard.appendChild(document.createElement('div'));
              blockCheck.className = "blockCheck";
              let clientCheck = objectClient[property][i]
              for (let item in clientCheck) {
                let items = item as keyof account
                this.blockProperty = blockCheck.appendChild(document.createElement('div'));
                this.blockProperty.innerHTML =
                  `<span class="checkProperty">${item}</span>
                           <span class="${item}${objectClient[property][i]['name']}">${objectClient[property][i][items]}</span>`;
              }
            }



          } else {
            this.blockProperty = this.clientCard.appendChild(document.createElement('div'));
            this.blockProperty.className = 'blockProperty';
            this.blockProperty.innerHTML =
              `<span class="property">${property}</span>
                <span class="${property}">${objectClient[prop]}</span>`;
          }
        }
        this.buttonChange = this.clientCard.appendChild(document.createElement('div'));
        this.buttonChange.innerText = 'Change';
        this.buttonChange.className = 'buttonChange';
        this.buttonChange.setAttribute('data-update', String(bank.clients[i]['id']));
        this.buttonChange.setAttribute('data-function', 'changeUser');
        this.buttonDelete = this.clientCard.appendChild(document.createElement('div'));
        this.buttonDelete.innerText = 'Delete';
        this.buttonDelete.className = 'buttonDelete';
        this.buttonDelete.setAttribute('data-function', 'deleteUser');
        this.buttonDelete.setAttribute('data-update', String(bank.clients[i]['id']));

        // this.clientCard.addEventListener('click', (event) => {
        //   let action = ((event.target) as Element).getAttribute('data-function');
        //   if (typeof this[action] === 'function') {
        //     this[action](event.target);
        //   }
        // })
         
        this.clientCard.addEventListener('click', (event) => {
          // console.log(this)
       
          let action = ((event.target) as Element).getAttribute('data-function');
          let self: { [key: string]: any } = this;
          qw = self
          if (typeof self[String(action)] === 'function') {
            self[String(action)](event.target);
          }
        })
      }
    }
  }
  changeUser(item: HTMLElement) {
    for (let i = 0; i < bank.clients.length; i++) {
      if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
        this.indexActiveCard = bank.clients.indexOf(bank.clients[i]);
        ((document.querySelector('.popupWindow')) as HTMLElement).setAttribute('style', 'display: block');

      }
    }
  }

  deleteUser(item: HTMLElement) {
    for (let i = 0; i < bank.clients.length; i++) {
      if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
        let indexElement = bank.clients.indexOf(bank.clients[i]);
        ((item.parentNode) as Element).remove();
        bank.clients.splice(indexElement, 1);
      }
    }
  }

  //func() {}
}
let qw: any
let render = new Render('.mainBlock')