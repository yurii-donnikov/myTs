// interface Clients {
//   name: string;
//   isActive: boolean;
//   registration: string;
//   id ? : number;
//   checks: account[];
// }
// type account = Credit | Debet;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Client = /** @class */ (function () {
    function Client(dataClient) {
        this.name = dataClient.name;
        this.isActive = dataClient.isActive;
        this.registration = dataClient.registration;
        this.id = dataClient.id;
        this.checks = dataClient.checks;
    }
    return Client;
}());
var Bank = /** @class */ (function () {
    function Bank() {
        this.clients = [];
    }
    Bank.prototype.addClient = function (dataClient) {
        this.clients.push(dataClient);
    };
    Bank.prototype.haveMoney = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        currencies = (_a.sent()).data;
                        result = 0;
                        if (this.clients.length) {
                            this.clients.forEach(function (client) {
                                if (client.checks.length) {
                                    client.checks.forEach(function (check) {
                                        if (check.currency === callback(check)) {
                                            result += check.balance;
                                        }
                                        else {
                                            result += (check.balance / currencies[check.currency]) * currencies[callback(check)];
                                        }
                                    });
                                }
                            });
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Bank.prototype.debtMoney = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = (_a.sent()).data;
                        result = 0;
                        if (this.clients.length) {
                            this.clients.forEach(function (client) {
                                if (client.checks.length) {
                                    client.checks.forEach(function (check) {
                                        if (check.name === 'Credit' && check.balance < check.limit) {
                                            if (check.currency === callback(check)) {
                                                result += check.limit - check.balance;
                                            }
                                            else {
                                                result += ((check.limit / data[check.currency]) * data[callback(check)]) - ((check.balance / data[check.currency]) * data[callback(check)]);
                                            }
                                        }
                                    });
                                }
                            });
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Bank.prototype.sumClientsDebt = function (callback, isActive) {
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://freecurrencyapi.net/api/v2/latest?apikey=dae13160-3b0e-11ec-8361-e108ba6473f9')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        currencies = (_a.sent()).data;
                        result = {};
                        result.clients = 0;
                        result.debt = 0;
                        if (this.clients.length) {
                            this.clients.forEach(function (client) {
                                if (isActive(client)) {
                                    client.checks.forEach(function (check) {
                                        if (check.name === 'Credit' && check.balance < check.limit) {
                                            if (check.currency === callback(check)) {
                                                result.clients++;
                                                result.debt += check.limit - check.balance;
                                            }
                                            else {
                                                result.clients++;
                                                result.debt += ((check.limit / currencies[check.currency]) * currencies[callback(check)]) - ((check.balance / currencies[check.currency]) * currencies[callback(check)]);
                                            }
                                        }
                                    });
                                }
                            });
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return Bank;
}());
var bank = new Bank();
bank.addClient(new Client({
    name: 'qwe',
    isActive: true,
    registration: new Date(),
    checks: [{
            name: 'Debet',
            balance: 1000,
            isActive: true,
            activeData: 'qwe',
            currency: 'UAH'
        },
        {
            name: 'Credit',
            balance: 1000,
            limit: 1000,
            isActive: true,
            activeData: 'asd',
            currency: 'UAH'
        },
    ]
}));
bank.addClient(new Client({
    name: 'asd',
    isActive: true,
    registration: new Date(),
    checks: [{
            name: 'Debet',
            balance: 1000,
            isActive: true,
            activeData: 'qwe',
            currency: 'UAH'
        },
        {
            name: 'Credit',
            balance: 1000,
            limit: 1000,
            isActive: true,
            activeData: 'asd',
            currency: 'UAH'
        },
    ]
}));
var as;
var Render = /** @class */ (function () {
    // bankCalculation: Bank;
    // modal: HTMLElement;
    // counter: number;
    function Render(container) {
        this.indexObject = 0;
        this.newClient = {};
        this.mainBlock = document.querySelector(container);
        this.createStartInterface(this.mainBlock);
        this.createCard();
        //this.clientCard = 
        // this.mainRender(this.root);
        // this.modal = this.createModal();
        // this.root.append(this.modal);
        // this.counter = 0;
    }
    Render.prototype.createStartInterface = function (container) {
        var _this = this;
        container.innerHTML =
            "<div class=\"cardBlock\"></div>\n   <div class=\"addCard\">add card</div>\n   <div class=\"popupWindow\">\n     <div class=\"backgroundWindow\"></div>\n     <div class=\"modalWindow\">\n      <input type=\"text\" placeholder=\"name\" data-id=\"name\" class=\"name\">\n      <label for=\"isActive\">Active?</label>\n      <input type=\"radio\" id=\"isActive\" data-id=\"isActive\" class=\"isActive\">\n      <div class=\"Debet\">\n        <p>Debet</p>\n        <input type=\"number\" placeholder=\"balance\" class=\"balance\" data-id=\"balanceDebet\">\n        <label for=\"isActiveDebet\">Active card?</label>\n        <input type=\"radio\" id=\"isActiveDebet\" class=\"isActive\" data-id=\"isActiveDebet\">\n        <select class=\"currency\" data-id=\"currencyDebet\">\n          <option>UAH</option>\n          <option>EUR</option>\n          <option>RUB</option>\n          <option>PLN</option>\n        </select>\n      </div>\n      <div class=\"Credit\">\n        <p>Credit</p>\n        <input type=\"number\" placeholder=\"balance\" class=\"balance\" data-id=\"balanceCredit\">\n        <input type=\"number\" placeholder=\"limit\" class=\"limit\" data-id=\"limitCredit\">\n        <label for=\"isActiveCredit\">Active card?</label>\n        <input type=\"radio\" id=\"isActiveCredit\" class=\"isActive\" data-id=\"isActiveCredit\">\n        <select class=\"currency\" data-id=\"currencyCredit\">\n          <option>UAH</option>\n          <option>EUR</option>\n          <option>RUB</option>\n          <option>PLN</option>\n        </select>\n      </div>\n      <div class=\"buttonSave\">save</div>\n  </div>";
        (document.querySelector('.addCard')).addEventListener('click', function () {
            _this.isFlag = true;
            (document.querySelector('.popupWindow')).setAttribute('style', 'display: block');
        });
        (document.querySelector('.backgroundWindow')).addEventListener('click', function () {
            (document.querySelector('.popupWindow')).setAttribute('style', 'display: none');
        });
        (document.querySelector('.buttonSave')).addEventListener('click', function () {
            (document.querySelector('.popupWindow')).setAttribute('style', 'display: none');
        });
    };
    Render.prototype.createCard = function () {
        var _this = this;
        for (var i = 0; i < bank.clients.length; i++) {
            bank.clients[i]['id'] = i;
            this.cardBlock = document.querySelector('.cardBlock');
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
                var objectClient = bank.clients[i];
                this.clientCard = this.cardBlock.appendChild(document.createElement('div'));
                this.clientCard.classList.add("clientCard");
                // this.clientCard.setAttribute('data-id', String(bank.clients[i]['id']));
                this.clientCard.setAttribute('data-id', String(i));
                //console.log(objectClient)
                for (var property in objectClient) {
                    var prop = property;
                    if (property === 'checks') {
                        //console.log('asdf')
                        for (var i_1 = 0; i_1 < objectClient[property].length; i_1++) {
                            var blockCheck = this.clientCard.appendChild(document.createElement('div'));
                            blockCheck.className = "blockCheck";
                            var clientCheck = objectClient[property][i_1];
                            for (var item in clientCheck) {
                                var items = item;
                                this.blockProperty = blockCheck.appendChild(document.createElement('div'));
                                this.blockProperty.innerHTML =
                                    "<span class=\"checkProperty\">".concat(item, "</span>\n                           <span class=\"").concat(item).concat(objectClient[property][i_1]['name'], "\">").concat(objectClient[property][i_1][items], "</span>");
                            }
                        }
                    }
                    else {
                        this.blockProperty = this.clientCard.appendChild(document.createElement('div'));
                        this.blockProperty.className = 'blockProperty';
                        this.blockProperty.innerHTML =
                            "<span class=\"property\">".concat(property, "</span>\n                <span class=\"").concat(property, "\">").concat(objectClient[prop], "</span>");
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
                this.clientCard.addEventListener('click', function (event) {
                    // console.log(this)
                    var action = (event.target).getAttribute('data-function');
                    var self = _this;
                    qw = self;
                    if (typeof self[String(action)] === 'function') {
                        self[String(action)](event.target);
                    }
                });
            }
        }
    };
    Render.prototype.changeUser = function (item) {
        for (var i = 0; i < bank.clients.length; i++) {
            if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
                this.indexActiveCard = bank.clients.indexOf(bank.clients[i]);
                (document.querySelector('.popupWindow')).setAttribute('style', 'display: block');
            }
        }
    };
    Render.prototype.deleteUser = function (item) {
        for (var i = 0; i < bank.clients.length; i++) {
            if (bank.clients[i]['id'] === Number(item.getAttribute('data-update'))) {
                var indexElement = bank.clients.indexOf(bank.clients[i]);
                (item.parentNode).remove();
                bank.clients.splice(indexElement, 1);
            }
        }
    };
    Render.prototype.changeCard = function () {
        // let childrenPopup = document.querySelector('.modalWindow').children;
        //     for(let i = 0; i < childrenPopup.length; i++) {
        //         if(childrenPopup[i].className === 'Debet' || childrenPopup[i].className === 'Credit'){
        //             if(this.isFlag){
        //                 // newClient.checks[indexObject] = {};
        //                 this.newClient.checks[this.indexObject]['name'] = childrenPopup[i].className;
        //                 newClient.checks[indexObject]['registration'] = new Date();
        //                 updateCheck(childrenPopup[i]);
        //                 indexObject++;
        //             } else {
        //                 updateCheck(childrenPopup[i]);
        //             }
        //         } else {
        //             if(childrenPopup[i].type === 'radio'){
        //                 let name = childrenPopup[i].className;
        //                 if(isFlag){
        //                     newClient[name] = childrenPopup[i].checked;
        //                 } 
        //                 else {
        //                     bank.clients[indexActiveCard][name] = childrenPopup[i].checked;
        //                     document.getElementsByClassName(childrenPopup[i].getAttribute('data-id'))[indexActiveCard].innerText = childrenPopup[i].checked;
        //                 }
        //                 childrenPopup[i].checked = false;
        //             } else {
        //                 if(childrenPopup[i].value) {
        //                     let name = childrenPopup[i].className;
        //                     if(isFlag){
        //                         newClient[name] = childrenPopup[i].value;
        //                         newClient['registration'] = new Date();
        //                     } else{
        //                         bank.clients[indexActiveCard]['name'] = childrenPopup[i].value;
        //                         document.getElementsByClassName(childrenPopup[i].getAttribute('data-id'))[indexActiveCard].innerText = childrenPopup[i].value;
        //                     }
        //                     childrenPopup[i].value = '';
        //                 }
        //             }
        //         }
        //     }
        //       function updateCheck(itemСheck){
        //           if(isFlag){
        //               for(let i = 0; i < itemСheck.children.length; i++){
        //                   if(itemСheck.children[i].type === 'radio'){
        //                       let name = itemСheck.children[i].className;
        //                       newClient.checks[indexObject][name] = itemСheck.children[i].checked;
        //                       itemСheck.children[i].checked = false;
        //                   } 
        //                   else {
        //                       if(itemСheck.children[i].value) {
        //                           if(itemСheck.children[i].valueAsNumber) {
        //                               let name = itemСheck.children[i].className;
        //                               newClient.checks[indexObject][name] = itemСheck.children[i].valueAsNumber;
        //                               itemСheck.children[i].valueAsNumber = undefined;
        //                           } else {
        //                               let name = itemСheck.children[i].className;
        //                               newClient.checks[indexObject][name] = itemСheck.children[i].value;
        //                           }
        //                       }
        //                   }
        //               } 
        //           } else {
        //               for(let i = 0; i < bank.clients[indexActiveCard].checks.length; i++){
        //                   if(bank.clients[indexActiveCard].checks[i].name === itemСheck.className){
        //                       for(let j = 0; j < itemСheck.children.length; j++) {
        //                           if(itemСheck.children[j].type === 'radio'){
        //                               let nameClass = itemСheck.children[j].className;
        //                               bank.clients[indexActiveCard].checks[i][nameClass] = itemСheck.children[j].checked;
        //                               document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[indexActiveCard].innerText = 
        //                               itemСheck.children[j].checked;
        //                               itemСheck.children[j].checked = false;
        //                           } else {
        //                               if(itemСheck.children[j].value) {
        //                                   if(itemСheck.children[j].valueAsNumber) {
        //                                       let nameClass = itemСheck.children[j].className;
        //                                       bank.clients[indexActiveCard].checks[i][nameClass] = itemСheck.children[j].valueAsNumber;
        //                                       document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[indexActiveCard].innerText = 
        //                                       itemСheck.children[j].valueAsNumber;
        //                                       itemСheck.children[j].valueAsNumber = undefined;
        //                                   } else {
        //                                       let nameClass = itemСheck.children[j].className;
        //                                       bank.clients[indexActiveCard].checks[i][nameClass] = itemСheck.children[j].value;
        //                                       document.getElementsByClassName(itemСheck.children[j].getAttribute('data-id'))[indexActiveCard].innerText = 
        //                                       itemСheck.children[j].value;
        //                                   }
        //                               }
        //                           }
        //                       }
        //                   }
        //               }
        //           }
        //       }
        //       if(isFlag) {
        //           bank.clients.push(newClient);
        //           isFlag = false;
        //           newClient = {checks: [],};
        //           indexObject = 0;
        //           createCard();
        //       }
        //       document.querySelector('.popupWindow').style = 'display: none';
    };
    return Render;
}());
var qw;
var render = new Render('.mainBlock');
