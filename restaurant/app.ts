interface Employee {
    name: string;
    surname: string;
    patronomic: string;
    salary: number;
    status: boolean;
    position: number;
    id: number;
  }
  interface Dep {
    id: number;
    title: string;
  }
  interface Position {
    id: number;
    title: string;
  }
  class Position implements Position {
    id: number;
    title: string;
    constructor(dataPosition: Position) {
      this.id = dataPosition.id;
      this.title = dataPosition.title;
    }
  }
  








  class Employee {
    name: string;
    surname: string;
    patronomic: string;
    position: number;
    salary: number;
    status: boolean;
    constructor(dataEmployee: Employee) {
      this.id = dataEmployee.id;
      this.name = dataEmployee.name;
      this.surname = dataEmployee.surname;
      this.patronomic = dataEmployee.patronomic;
      this.salary = dataEmployee.salary;
      this.status = dataEmployee.status;
      this.position = dataEmployee.position;
    }
  }











  class Department {
    id: number;
    title: string;
    employeers: Employee[];
    constructor(dataDepartment: Dep) {
      this.id = dataDepartment.id;
      this.title = dataDepartment.title;
      this.employeers = [];
    }
    addEmployee(dataEmployee: Employee): void {
      this.employeers.push(dataEmployee);
    }
    deleteEmployee(id: number): void {
      this.employeers.splice(this.findIndexEmployee(id), 1);
    }
    etitEmployee(id: number, dataEmployee: Employee): void {
      this.employeers.splice(this.findIndexEmployee(id), 1, dataEmployee);
    }
    findIndexEmployee(id: number): number {
      let index: number = -1;
      for (let i = 0; i < this.employeers.length; i++) {
        if (this.employeers[i].id !== id) {
          continue;
        }
        index = i;
      }
      return index;
      // return this.employeers.findIndex((employee) => {
      //   return employee.id === id;
      // });
    }
    getSalarys(status: boolean): number {
      let salarys: number = 0;
      for (let employeer of this.employeers) {
        if (employeer.status === status) {
          salarys += employeer.salary;
        }
      }
      return salarys;
    }
    getMeanSalary(status: boolean): number {
      let salary: number = 0;
      let counter: number = 0;
      for (let employee of this.employeers) {
        if (employee.status === status) {
          salary += employee.salary;
          ++counter;
        }
      }
      return counter > 0 ? salary / counter : 0;
    }
    getAmountDismissedEmployee(): number {
      let counter: number = 0;
      for (let employee of this.employeers) {
        !employee.status && ++counter;
      }
      return counter;
    }
    getExtremumSalary(extremum: string): number {
      if (extremum !== "min" && extremum !== "max") {
        throw new Error("Not correct data");
      }
      return this.employeers
        .map((employee) => {
          return employee.salary;
        })
        .sort(extremum === "min" ? this.sortMin : this.sortMax)[0];
    }
    sortMin(elementFirst: number, elementSecond: number): number {
      return elementFirst - elementSecond;
    }
    sortMax(elementFirst: number, elementSecond: number): number {
      return elementSecond - elementFirst;
    }
    getExtremumSalaryByPosition(extremum: string, position: number): number {
      if (extremum !== "min" && extremum !== "max") {
        throw new Error("Not correct data");
      }
      const salarys: number[] = [];
      for (let employee of this.employeers) {
        employee.position === position && salarys.push(employee.salary);
        console.log(salarys, "look");
      }
      const sortSalarys: number[] = salarys.sort(
        extremum === "min" ? this.sortMin : this.sortMax
      );
      return sortSalarys.length > 0 ? sortSalarys[0] : 0;
    }
    isPosition(position: number): boolean {
      for (let employee of this.employeers) {
        if (employee.position === position) {
          return true;
        }
      }
      return false;
    }
  }













  class Restourant {
    departments: Department[];
    positions: Position[];
    idCounter: number;
    constructor() {
      this.idCounter = 13;
      this.departments = [];
      this.positions = [];
    }
    addDepartment(dataDepartment: Department) {
      this.departments.push(dataDepartment);
    }
    addPsition(position: Position): void {
      this.positions.push(position);
    }
  }







  class RestorantCalculation {
    departments;
    positions;
    constructor(dataRestourant: Restourant) {
      this.departments = dataRestourant.departments;
      this.positions = dataRestourant.positions;
    }
    getSalarysDepartments(status: boolean): Record<number, number> {
      const statisticSalary: Record<number, number> = {};
      for (let department of this.departments) {
        const sum = department.getSalarys(status);
        statisticSalary[department.id] = sum;
      }
      return statisticSalary;
    }
    getMeanSalarysDepartments(status: boolean): Record<number, string> {
      const statisticSalary: Record<number, string> = {};
      for (let department of this.departments) {
        const sum = department.getMeanSalary(status);
        statisticSalary[department.id] = sum.toFixed(2);
      }
      return statisticSalary;
    }
    getAmountDismissedEmployees(): number {
      let counter: number = 0;
      for (let department of this.departments) {
        counter += department.getAmountDismissedEmployee();
      }
      return counter;
    }
    getExtremumSalarysDepartments(extremum: string): Record<number, number> {
      if (extremum !== "min" && extremum !== "max") {
        throw new Error("Not correct data");
      }
      const result: Record<number, number> = {};
      for (let department of this.departments) {
        result[department.id] = department.getExtremumSalary(extremum);
      }
      return result;
    }
    getExtremumSalarysDepartmentsByPosition(
      extremum: string
    ): Record<string, number> {
      if (extremum !== "min" && extremum !== "max") {
        throw new Error("Not correct data");
      }
      const result: Record<string, number> = {};
      for (let position of this.positions) {
        const salarys: number[] = [];
        for (let department of this.departments) {
          salarys.push(
            department.getExtremumSalaryByPosition(extremum, position.id)
          );
        }
        result[position.title] = salarys.sort(
          extremum === "min" ? this.sortMin : this.sortMax
        )[0];
      }
      return result;
    }
    getDepartmentsWithoutPosition(position: number): string[] {
      const departments: string[] = [];
      for (let department of this.departments) {
        !department.isPosition(position) && departments.push(department.title);
      }
      return departments;
    }
    sortMin(elementFirst: number, elementSecond: number): number {
      return elementFirst - elementSecond;
    }
    sortMax(elementFirst: number, elementSecond: number): number {
      return elementSecond - elementFirst;
    }
    findPosition(id: number): number {
      return this.positions.findIndex((position) => {
        return position.id === id;
      });
    }
    findIndexDepartment(id: number): number {
      return this.departments.findIndex((department) => {
        return department.id === id;
      });
    }
    findIndexPosition(id: number): number {
      return this.positions.findIndex((position) => {
        return position.id === id;
      });
    }
  }









  class RestoranRender {
    departments;
    positions;
    calculation;
    employeeList;
    modal;
    countId;
    constructor(
      dataRestourant: Restourant,
      restorantCalculation: RestorantCalculation,
      container: HTMLElement
    ) {
      this.countId = dataRestourant.idCounter;
      this.departments = dataRestourant.departments;
      this.positions = dataRestourant.positions;
      this.calculation = restorantCalculation;
      this.modal = this.createModal();
      document.body.append(this.modal);
      this.employeeList = this.createElement("div", {
        className: "employeeList",
      });
      this.renderEmployeesList();
      this.mainRender(container);
    }
    mainRender(container: HTMLElement) {
      const wrapperInforBlock = this.createElement("div", {
        className: "info-Block",
      });
      const addEmployeeBtn = this.createButton({
        type: "button",
        className: "add-btn",
        innerText: "Добавить нового сотрудника",
      });
      addEmployeeBtn.onclick = this.addEmployeeOnclick.bind(this);
      document.body.append(addEmployeeBtn);
      const allSalaryBlock = this.renderAllSalaryBlock();
      const meanSalaryBlock = this.renderMeanSalaryBlock();
      const extremumSalaryBlock = this.renderExtremumSalaryBlock();
      const extremumSalaryPositionBlock = this.renderExtremumSalaryPositionBlock();
      const dismissedBlock = this.renderDismissedBlock();
      const findDepartmentWithoutPositionBlock = this.renderFindDepartmentWithoutPositionBlock();
      const wrapperEmployeeCard = this.createElement("div", {
        className: "wrapper",
      });
      wrapperInforBlock.append(
        allSalaryBlock,
        meanSalaryBlock,
        extremumSalaryBlock,
        extremumSalaryPositionBlock,
        dismissedBlock,
        findDepartmentWithoutPositionBlock
      );
      container.append(wrapperInforBlock, wrapperEmployeeCard);
      wrapperEmployeeCard.append(this.employeeList);
    }
    createModal(): HTMLElement {
      const modal = this.createElement("div", {
        className: "modal",
      });
      return modal;
    }
    renderAllSalaryBlock(): HTMLElement {
      const block = this.createElement("div", {
        className: "info-content",
      });
      const title = this.createElement("h2", {
        className: "info-title",
        innerText: "Посчитать зарплаты:",
      });
      const getResult = this.createButton({
        type: "button",
        className: "result-btn",
        innerText: "получить",
      });
      const selectStatus = this.createSelect(
        {
          "1": "работающие",
          "0": "уволенные",
        },
        {
          className: "info-select",
        }
      );
      const outputBlock = this.createElement("p", {
        className: "output",
      });
      block.append(title, getResult, selectStatus, outputBlock);
      getResult.onclick = this.getAllSalaryOnclik.bind(
        this,
        selectStatus,
        outputBlock
      );
      return block;
    }
    renderMeanSalaryBlock(): HTMLElement {
      const block = this.createElement("div", {
        className: "info-content",
      });
      const getResult = this.createButton({
        type: "button",
        className: "result-btn",
        innerText: "получить",
      });
      const selectStatus = this.createSelect(
        {
          "1": "работающие",
          "0": "уволенные",
        },
        {
          className: "info-select",
        }
      );
      const title = this.createElement("h2", {
        className: "info-title",
        innerText: "средняя зарплата по отделам:",
      });
      const outputBlock = this.createElement("p", {
        className: "output",
      });
      getResult.onclick = this.getMeanSalarysOnclik.bind(
        this,
        selectStatus,
        outputBlock
      );
      block.append(title, getResult, selectStatus, outputBlock);
      return block;
    }
    renderExtremumSalaryBlock(): HTMLElement {
      const block = this.createElement("div", {
        className: "info-content",
      });
      const getResult = this.createButton({
        type: "button",
        className: "result-btn",
        innerText: "получить",
      });
      const title = this.createElement("h2", {
        className: "info-title",
        innerText: "Максимальная/минимальная по отделам:",
      });
      const selectExtremum = this.createSelect(
        {
          max: "максимальная",
          min: "минимальная",
        },
        {
          className: "info-select",
        }
      );
      const outputBlock = this.createElement("p", {
        className: "output",
      });
      block.append(title, getResult, selectExtremum, outputBlock);
      getResult.onclick = this.getExtremumSalarysOnclik.bind(
        this,
        selectExtremum,
        outputBlock
      );
      return block;
    }
    renderExtremumSalaryPositionBlock(): HTMLElement {
      const block = this.createElement("div", {
        className: "info-content",
      });
      const title = this.createElement("h2", {
        className: "info-title",
        innerText: "Максимальная/минимальная по позициям:",
      });
      const getResult = this.createButton({
        type: "button",
        className: "result-btn",
        innerText: "получить",
      });
      const selectExtremum = this.createSelect(
        {
          max: "максимальная",
          min: "минимальная",
        },
        {
          className: "info-select",
        }
      );
      const outputBlock = this.createElement("p", {
        className: "output",
      });
      block.append(title, getResult, selectExtremum, outputBlock);
      getResult.onclick = this.getExtremumSalarysByPositionOnclik.bind(
        this,
        selectExtremum,
        outputBlock
      );
      return block;
    }
    renderDismissedBlock(): HTMLElement {
      const block = this.createElement("div", {
        className: "info-content",
      });
      const title = this.createElement("h2", {
        className: "info-title",
        innerText: "количество уволенных:",
      });
      const getResult = this.createButton({
        type: "button",
        className: "result-btn",
        innerText: "получить",
      });
      const outputBlock = this.createElement("p", {
        className: "output",
      });
      block.append(title, getResult, outputBlock);
      getResult.onclick = this.getAmountDismissedEmployeeOnclik.bind(
        this,
        outputBlock
      );
      return block;
    }
  
    renderFindDepartmentWithoutPositionBlock(): HTMLElement {
      const block = this.createElement("div", {
        className: "info-content",
      });
      const getResult = this.createButton({
        type: "button",
        className: "result-btn",
        innerText: "получить",
      });
      const selectPosition = this.createSelect(this.createPositionList(), {
        className: "info-block",
      });
      const outputBlock = this.createElement("p", {
        className: "output",
      });
      const title = this.createElement("h2", {
        className: "info-title",
        innerText: "Отделы без позиции:",
      });
      block.append(title, getResult, selectPosition, outputBlock);
      getResult.onclick = this.getDepartmentWithoutPositionOnclick.bind(
        this,
        selectPosition,
        outputBlock
      );
      return block;
    }
    getDepartmentWithoutPositionOnclick(
      selectPosition: HTMLSelectElement,
      outputBlock: HTMLElement,
      event: MouseEvent
    ): void {
      event.preventDefault();
      outputBlock.innerHTML = "";
      const position: number = Number(this.getSelectValue(selectPosition));
      outputBlock.innerHTML = String(
        this.calculation.getDepartmentsWithoutPosition(position)
      );
    }
    getAmountDismissedEmployeeOnclik(
      outputBlock: HTMLElement,
      event: MouseEvent
    ): void {
      event.preventDefault();
      outputBlock.innerHTML = "";
      outputBlock.innerHTML = String(
        this.calculation.getAmountDismissedEmployees()
      );
    }
    getExtremumSalarysByPositionOnclik(
      selectExtremum: HTMLSelectElement,
      outputBlock: HTMLElement,
      event: MouseEvent
    ): void {
      outputBlock.innerHTML = "";
      event.preventDefault();
      const extremum: string = this.getSelectValue(selectExtremum);
      const resultSalarys: Record<
        string,
        number
      > = this.calculation.getExtremumSalarysDepartmentsByPosition(extremum);
      for (let department in resultSalarys) {
        outputBlock.innerHTML += `${department}: ${resultSalarys[
          department
        ].toFixed(2)}   `;
      }
    }
    getExtremumSalarysOnclik(
      selectExtremum: HTMLSelectElement,
      outputBlock: HTMLElement,
      event: MouseEvent
    ): void {
      outputBlock.innerHTML = "";
      event.preventDefault();
      const extremum: string = this.getSelectValue(selectExtremum);
      const resultSalarys: Record<
        number,
        number
      > = this.calculation.getExtremumSalarysDepartments(extremum);
      for (let department in resultSalarys) {
        outputBlock.innerHTML += `${department}: ${resultSalarys[
          department
        ].toFixed(2)}   `;
      }
    }
    getMeanSalarysOnclik(
      select: HTMLSelectElement,
      outputBlock: HTMLElement,
      event: MouseEvent
    ): void {
      outputBlock.innerHTML = "";
      event.preventDefault();
      const status: boolean = Boolean(Number(this.getSelectValue(select)));
      const resultSalarys: Record<
        number,
        string
      > = this.calculation.getMeanSalarysDepartments(status);
      for (let department in resultSalarys) {
        outputBlock.innerHTML += `${department}: ${resultSalarys[department]}`;
      }
    }
    getAllSalaryOnclik(
      select: HTMLSelectElement,
      outputBlock: HTMLElement,
      event: MouseEvent
    ): void {
      outputBlock.innerHTML = "";
      event.preventDefault();
      const status: boolean = Boolean(Number(this.getSelectValue(select)));
      const resultSalarys: Record<
        number,
        number
      > = this.calculation.getSalarysDepartments(status);
      for (let department in resultSalarys) {
        outputBlock.innerHTML += `${department}: ${resultSalarys[
          department
        ].toFixed(2)}   `;
      }
    }
    renderEmployeesList(): void {
      this.employeeList.innerHTML = "";
      for (let department of this.departments) {
        for (let employee of department.employeers) {
          this.employeeList.innerHTML += this.createEmployeeCard(
            employee,
            department.id
          );
        }
      }
      this.employeeList.onclick = this.handleClick.bind(this);
    }
    addEmployeeOnclick(event: MouseEvent): void {
      event.preventDefault();
      console.log("fsdfds");
      this.modal.append(this.createForm());
      this.modal.classList.add("active");
    }
    handleClick(event: any) {
      const dataAtribbute: string = event.target.getAttribute("data-action");
      if (dataAtribbute) {
        event.preventDefault();
        const temp: HTMLDivElement = event.target.closest("div.card");
        const idEmployee: number = Number(temp.getAttribute("data-id"));
        const idDepartment: number = Number(temp.getAttribute("data-idDep"));
        const indexDepartment = this.calculation.findIndexDepartment(
          idDepartment
        );
        dataAtribbute === "delete"
          ? this.deleteEmployee(idEmployee, indexDepartment)
          : this.editEmployee(idEmployee, indexDepartment);
      }
    }
    deleteEmployee(idEmployee: number, indexDepartment: number) {
      this.departments[indexDepartment].deleteEmployee(idEmployee);
      this.renderEmployeesList();
    }
    editEmployee(idEmployee: number, indexDepartment: number) {
      const indexEmployee: number = this.departments[
        indexDepartment
      ].findIndexEmployee(idEmployee);
      this.modal.append(
        this.createForm(
          this.departments[indexDepartment].employeers[indexEmployee],
          indexDepartment
        )
      );
      this.modal.classList.add("active");
    }
    createEmployeeCard(dataEmployee: Employee, idDepartment: number): string {
      const indexDepartment: number = this.calculation.findIndexDepartment(
        idDepartment
      );
      const position: number = this.calculation.findIndexPosition(
        dataEmployee.position
      );
      return `<div class="card" data-id="${
        dataEmployee.id
      }" data-idDep="${idDepartment}">
        <p class="cardInfo">Имя: ${dataEmployee.name}</p>
        <p class="cardInfo">Фамилия: ${dataEmployee.surname}</p>
        <p class="cardInfo">Отчество: ${dataEmployee.patronomic}</p>
        <p class="cardInfo info-content">
          <span>Зарплата: ${dataEmployee.salary}</span>
          <span>Статус: ${dataEmployee.status ? "работает" : "уволен"}</span>
          <span>Позиция: ${this.positions[position].title}</span>
          <span>Департамент: ${this.departments[indexDepartment].title}</span>
        </p>
        <div class="wrapperBtnCard">
          <button class="cardBtn" data-action="delete">удалить</button>
          <button class="cardBtn" data-action="edit">редактировать</button>
        </div>
      </div>    `;
    }
    createElement(type: string, props: Record<string, string>): HTMLElement {
      const element = document.createElement(type);
      Object.assign(element, props);
      return element;
    }
    createForm(dataEmployee?: Employee, indexDepartment?: number): HTMLElement {
      const form = this.createElement("form", {
        method: "POST",
        action: "#",
        className: "employeeForm",
      });
      form.innerHTML = `
      <input type="text" name="name" placeholder="имя" value="${
        dataEmployee ? dataEmployee.name : ""
      }" />
      <input
        type="text"
        placeholder="фамилия"
        name="surname"
        value="${dataEmployee ? dataEmployee.surname : ""}"
      />
      <input
        type="text"
        placeholder="отчество"
        name="patronomic"
        value="${dataEmployee ? dataEmployee.patronomic : ""}"
      />
      <input type="number" placeholder="0" name="salary" value="${
        dataEmployee ? dataEmployee.salary : ""
      }"/>
      `;
      const selectDepartment = this.createSelect(this.createDapertmentList(), {
        name: "departmentId",
      });
      const selectPosition = this.createSelect(this.createPositionList(), {
        name: "position",
        className: "select",
      });
      const status = `
        <p>${dataEmployee?.status}</p>
      `;
      form.append(selectDepartment, selectPosition);
      dataEmployee && form.append(`${status}`);
      const submitForm = this.createButton({
        type: "submit",
        className: "submit",
        innerText: "send",
      });
      form.append(submitForm);
      const id = dataEmployee?.id || 0;
      if (typeof indexDepartment === "number") {
        this.departments[indexDepartment].deleteEmployee(id);
      }
      submitForm.onclick = this.sendData.bind(this, id);
      return form;
    }
    createPositionList(): Record<string, string> {
      const result: Record<string, string> = {};
      for (let position of this.positions) {
        result[position.id] = position.title;
      }
      return result;
    }
    sendData(id: number, event: any) {
      event.preventDefault();
      const form = this.modal.querySelector("form") as HTMLFormElement;
      const formData = new FormData(form);
  
      const dataEmployee = new Employee({
        name: String(formData.get("name")),
        surname: String(formData.get("surname")),
        patronomic: String(formData.get("patronomic")),
        salary: Number(formData.get("salary")),
        status: true,
        id: Number(id > 0 ? id : ++this.countId),
        position: Number(formData.get("position")),
      });
      const idDepartment = Number(formData.get("departmentId"));
      const indexDepartment = this.calculation.findIndexDepartment(idDepartment);
      this.departments[indexDepartment].addEmployee(dataEmployee);
      form.remove();
      this.modal.classList.toggle("active");
      this.renderEmployeesList();
    }
    createDapertmentList(): Record<string, string> {
      const departmentList: Record<string, string> = {};
      this.departments.forEach((department) => {
        departmentList[department.id] = department.title;
      });
      return departmentList;
    }
    createButton(props: Record<string, string>): HTMLButtonElement {
      const button = document.createElement("button");
      Object.assign(button, props);
      return button;
    }
    createSelect(
      parameters: Record<string, string>,
      props: Record<string, string>
    ): HTMLSelectElement {
      const select = document.createElement("select");
      for (let parameter in parameters) {
        select.append(new Option(parameters[parameter], parameter));
      }
      for (let prop in props) {
        select.setAttribute(prop, props[prop]);
      }
      // Object.assign(select, props);
      return select;
    }
    getSelectValue(select: HTMLSelectElement): string {
      let indexSelect = select.options.selectedIndex;
      let valueSelect = select.options[indexSelect].value;
      return valueSelect;
    }
  }













  const restourant = new Restourant();
  restourant.addPsition({
    id: 1,
    title: "руководитель",
  });
  restourant.addPsition({
    id: 2,
    title: "повар",
  });
  restourant.addPsition({
    id: 3,
    title: "менеджер",
  });
  restourant.addPsition({
    id: 4,
    title: "оффициант",
  });
  restourant.addPsition({
    id: 4,
    title: "уборщик",
  });
  const first = new Department({
    id: 1,
    title: "северо-западный",
  });
  const second = new Department({
    id: 2,
    title: "юго-восточный",
  });
  restourant.addDepartment(first);
  restourant.addDepartment(second);
  restourant.departments[0].addEmployee(
    new Employee({
      id: 1,
      name: "Вася",
      surname: "fdsfds",
      patronomic: "secondName1",
      position: 2,
      salary: 3000,
      status: true,
    })
  );
  restourant.departments[0].addEmployee(
    new Employee({
      id: 2,
      name: "Гена",
      surname: "fdsfds",
      patronomic: "secondName1",
      position: 2,
      salary: 2000,
      status: false,
    })
  );
  restourant.departments[0].addEmployee(
    new Employee({
      id: 3,
      name: "Андрей",
      surname: "fdsfds",
      patronomic: "secondName1",
      position: 2,
      salary: 1000,
      status: true,
    })
  );
  restourant.departments[1].addEmployee(
    new Employee({
      id: 4,
      name: "John",
      surname: "fdsfds",
      patronomic: "secondName1",
      position: 2,
      salary: 3000,
      status: true,
    })
  );
  restourant.departments[1].addEmployee(
    new Employee({
      id: 5,
      name: "Вика",
      surname: "fdsfds",
      patronomic: "secondName1",
      position: 2,
      salary: 2000,
      status: true,
    })
  );
  restourant.departments[1].addEmployee(
    new Employee({
      id: 6,
      name: "Антон",
      surname: "fdsfds",
      patronomic: "secondName1",
      position: 2,
      salary: 1000,
      status: false,
    })
  );
  const result = new RestorantCalculation(restourant);
  const render = new RestoranRender(
    restourant,
    result,
    document.querySelector("#root") as HTMLElement
    );




    // ============================================


    interface Employee {
        name: string,
        position: string,
        isLeader: boolean,
        salary: number,
        isWorks: boolean,
        department: number,
    }
    
    
    // let arrayEmployee: Employee[] = [
    //         {
    //           name:'maks',
    //           position: 'barman',
    //           isLeader: false,
    //           salary: 100,
    //           isWorks: true,
    //           department: 1,
    //         },
    //         {
    //           name:'oleg',
    //           position: 'ofitsiant',
    //           isLeader: false,
    //           salary: 100,
    //           isWorks: false,
    //           department: 1,
    //         },
    //         {
    //           name:'mari',
    //           position: 'assistant-cook',
    //           isLeader: false,
    //           salary: 100,
    //           isWorks: true,
    //           department: 2,
    //         },
    //         {
    //           name:'dima',
    //           position: 'cleaner',
    //           isLeader: false,
    //           salary: 100,
    //           isWorks: true,
    //           department: 2,
    //         },
    //         {
    //           name:'igor',
    //           position: 'dessert cook',
    //           isLeader: false,
    //           salary: 150,
    //           isWorks: false,
    //           department: 3,
    //         },
    //         {
    //           name:'Lexa',
    //           position: 'dessert cook',
    //           isLeader: false,
    //           salary: 120,
    //           isWorks: true,
    //           department: 3,
    //         }
    // ]
    let arrayDepartments: {[key: string]: number | string }[] =    [
            {
              number: 1,
              name: 'hall'
            },
            {
              number: 2,
              name: 'cook'
            },
            {
              number: 3,
              name: 'dessert cook'
            },
    ];
    interface IRestauratn<T>{
        sumSalary(callback: Function): null | {[key: string]: number};
    }
    
    class Restaurant<P> implements IRestauratn<P> {
    
        employees: Employee[];
        departments: {[key: string]: number | string }[];
        constructor() {
          this.employees = Employee[];
          this.departments = arrayDepartments;
        }
        
        sumSalary(callback: Function){
          let result: {[key: string]: number} = {};
          if(this.departments.length && this.employees.length) {
            this.employees.forEach((employee) => {
              if(callback(employee)){
                  let elemn = employee.department
                if(result[employee.department] !== null) {
    
                //if(`${employee.department}` in result) {
                  result[employee.department] += employee.salary;
                } else {
                  result[employee.department] = employee.salary;
                }
              }
            })
            return result;
          }
          return null;
        }
        
        // averageSalary(callback){
        //   let result = 0;
        //   let count = 0;
        //   if(this.departments.length && this.employees.length) {
        //     this.employees.forEach((employee) => {
        //       if(callback(employee)){
        //         count++;
        //         result += employee.salary;
        //       }
        //     })
        //     return result/count;
        //   }
        //   return null;
        // }
        
        // salaryMinToMax(callback){
        //   let result = {};
        //   if(this.departments.length && this.employees.length) {
        //     this.departments.forEach((department) => {
        //       result[department.number] = {};
        //       this.employees.forEach((employee) => {
        //         if(callback(employee) && department.number === employee.department){
        //           if(result[department.number][employee.position]){
        //             if(result[department.number][employee.position].min > employee.salary){
        //               result[department.number][employee.position].min = employee.salary;
        //             }
        //             if(result[department.number][employee.position].max < employee.salary){
        //               result[department.number][employee.position].max = employee.salary;
        //             }
        //           } else {
        //             result[department.number][employee.position] = {};
        //             result[department.number][employee.position].min = employee.salary;
        //             result[department.number][employee.position].max = employee.salary;
        //           }
        //         }
        //       })
        //       if(Object.keys(result[department.number]).length === 0){
        //         delete result[department.number];
        //       }
        //     })
        //     return result;
        //   }
        //   return null;
        // }
        
        // amountEmployee (callback) {
        //   let result = 0;
        //   if(this.departments.length && this.employees.length) {
        //     this.employees.forEach((employee) => {
        //       if(callback(employee)) {
        //         result++;
        //       }
        //     })
        //     return result;
        //   }
        //   return null;
        // }
        
        // departmentLeader(callback){
        //   let leader = [];
        //   let notLeader = [];
        //   if(this.departments.length && this.employees.length) {
        //     this.employees.forEach((employee) => {
        //       if(employee.isLeader) {
        //         leader.push(employee.department);
        //       }
        //       if(callback(employee)){
        //         notLeader.push(employee.department);
        //       }
        //     })
        //     if(leader.toString() === notLeader.toString()) {
        //       return leader;
        //     }
        //     leader.forEach((item) => {
        //       for(let i = 0; i < notLeader.length; i++){
        //         if(item === notLeader[i]){
        //           notLeader.splice(i, 1);
        //           i--;
        //         }
        //       }
        //     })
        //     for(let i = 1; i < notLeader.length; i++){
        //       if(notLeader[i] === notLeader[i - 1]){
        //         notLeader.splice(i, 1);
        //         i--;
        //       }
        //     }
        //     return notLeader;
        //   }
        //   return null;
        // }
      }
      //let restaurant = new Restaurant()
      
    //   let mainBlock = document.querySelector('.mainBlock');
    //   let cardBlock = document.createElement('div');
    //   let buttonAddCard = document.createElement('div');
    //   buttonAddCard.className = 'buttonAddCard';
    //   buttonAddCard.innerText = 'add card';
    //   cardBlock.className = 'cardBlock';
    //   mainBlock.appendChild(cardBlock);
    //   mainBlock.appendChild(buttonAddCard);
    //   let changeEmployee;
    //   let employeeCard;
    //   let itemBlockInfo;
    //   let employeeInfo;
    //   let employeeProperty;
    //   let eventTarget;
    //   let buttonDelete;
    //   let isFlag = false;
    //   let popupWindow = mainBlock.appendChild(document.createElement('div'));
    //   popupWindow.className = 'popupWindow';
    //   let backgroundWindow = popupWindow.appendChild(document.createElement('div'));
    //   backgroundWindow.className = 'backgroundWindow';
    //   backgroundWindow.addEventListener('click', () => {
    //     for(let i = 0; i < document.getElementsByClassName('inputInfo').length; i++){
    //       document.getElementsByClassName('inputInfo')[i].value = '';
    //     }
    //     isFlag = false;
    //     popupWindow.style = `display: none`;
    //   })
    //   let modalWindow = popupWindow.appendChild(document.createElement('div'));
    //   modalWindow.className = 'modalWindow';
    //   for(let props in restaurant.employees[0]) {
    //     if(props === 'isWorks') {
    //       let inputRadioBlock = document.createElement('div');
    //       inputRadioBlock.innerHTML = `<p>${props}</p>
    //       <input type="radio" id="contactChoice1" name="isWorks" value="true">
    //       <label for="contactChoice1">yes</label>
    //       <input type="radio" id="contactChoice2" name="isWorks" value="false">
    //       <label for="contactChoice2">no</label>`;
    //       inputRadioBlock.className = 'inputInfo';
    //       modalWindow.appendChild(inputRadioBlock);
    //     } else {
    //       if(props === 'isLeader') {
    //         let inputRadioBlock = document.createElement('div');
    //         inputRadioBlock.innerHTML = `<p>${props}</p>
    //         <input type="radio" id="contactChoice3" name="isLeader" value="true" >
    //         <label for="contactChoice3">yes</label>
    //         <input type="radio" id="contactChoice4" name="isLeader" value="false">
    //         <label for="contactChoice4">no</label>`;
    //         inputRadioBlock.className = 'inputInfo';
    //         modalWindow.appendChild(inputRadioBlock);
    //       }
    //       else{
    //         let input = document.createElement('input');
    //         input.type = 'text';
    //         input.placeholder = props;
    //         input.className = 'inputInfo';
    //         modalWindow.appendChild(input);
    //       }
    //     }
    //   }
    //   let buttonSave = modalWindow.appendChild(document.createElement('div'));
    //   buttonSave.innerText = 'SAVE';
    //   buttonSave.className = 'buttonSave';
    //   let indexBlockEmployee;
      
    //   function createCard () {
    //     for(let i = 0; i < restaurant.employees.length; i++){
    //       if(!cardBlock.children[i]) {
    //         employeeCard = cardBlock.appendChild(document.createElement('div'));
    //         employeeCard.className = 'employeeCard';
    //         for(let item in restaurant.employees[i]) {
    //           itemBlockInfo = employeeCard.appendChild(document.createElement('div'));
    //           itemBlockInfo.className = 'itemBlockInfo';
    //           employeeProperty = itemBlockInfo.appendChild(document.createElement('div'));
    //           employeeInfo = itemBlockInfo.appendChild(document.createElement('div'));
    //           employeeProperty.innerText = item;
    //           employeeInfo.innerText = restaurant.employees[i][item];
    //           employeeInfo.className = item;
    //         }
    //         let buttonChange = document.createElement('div');
    //         buttonChange.innerText = 'change';
    //         changeEmployee = employeeCard.appendChild(buttonChange);
    //         changeEmployee.className = 'changeEmployee';
    //         changeEmployee.addEventListener('click', () => {
    //           popupWindow.style = `display: block`;
    //           eventTarget = event.target;
    //           isFlag = true;
    //           for(let i = 0; i < cardBlock.children.length; i++){
    //             if(eventTarget.parentNode === cardBlock.children[i]){
    //               indexBlockEmployee = i;
    //             }
    //           }
    //         })
    //         let deleteCard = document.createElement('div');
    //         deleteCard.innerText = 'delete';
    //         deleteCard.className = 'buttonDelete';
    //         buttonDelete = employeeCard.appendChild(deleteCard);
    //         buttonDelete.addEventListener('click', () => {
    //           let indexDeleteEmployee;
    //           for(let i = 0; i < cardBlock.children.length; i++){
    //             if(event.target.parentNode === cardBlock.children[i]){
    //               indexDeleteEmployee = i;
    //             }
    //           }
    //           restaurant.employees.splice(indexDeleteEmployee, 1);
    //           event.target.parentNode.remove();
    //         })
    //       }
    //     }
    //   }
    //   createCard ()
      
    //   buttonAddCard.addEventListener('click', () => {
    //     popupWindow.style = `display: block`;
    //   })
      
    //   buttonSave.addEventListener('click', () => {
    //     changeCard();
    //   })
      
    //   function changeCard () {
    //     let elementInput = document.getElementsByClassName('inputInfo');
    //     if(isFlag){
    //       for(let i = 0; i < elementInput.length; i++) {
    //         if(elementInput[i].children.length){
    //           for(let j = 0; j < elementInput[i].children.length; j++) {
    //             if(elementInput[i].children[j].checked) {
    //               let elementInputRadio = elementInput[i].children[j].name;
    //               restaurant.employees[indexBlockEmployee][elementInputRadio] = Boolean(elementInput[i].children[j].value === 'true');
    //               eventTarget.parentElement.children[i].children[1].innerText = '' + elementInput[i].children[j].value;
    //             }
    //           }
    //         } else {
    //           if(elementInput[i].value !== '') {
    //             let elementInputName = elementInput[i].placeholder;
    //             if (elementInput[i].placeholder === 'salary' || elementInput[i].placeholder === 'department') {
    //               restaurant.employees[indexBlockEmployee][elementInputName] = Number(elementInput[i].value);
    //             } else {
    //               restaurant.employees[indexBlockEmployee][elementInputName] = elementInput[i].value;
    //             }
    //             eventTarget.parentElement.children[i].children[1].innerText = elementInput[i].value;
    //             elementInput[i].value = '';
    //           }
    //         }
    //       }
    //       isFlag = false;
    //     } else {
    //       let resultObject = {};
    //       for(let i = 0; i < elementInput.length; i++) {
    //         let definitelyInput = document.getElementsByClassName('inputInfo')[i];
    //         if(definitelyInput.children.length){
    //           for(let j = 0; j < definitelyInput.children.length; j++) {
    //             if(definitelyInput.children[j].checked) {
    //               resultObject[definitelyInput.children[j].name] = definitelyInput.children[j].value === 'true';
    //             }
    //           }
    //         } else {
    //           if(elementInput[i].value !== '') {
    //             if (elementInput[i].placeholder === 'salary' || elementInput[i].placeholder === 'department') {
    //               resultObject[elementInput[i].placeholder] = Number(elementInput[i].value);
    //             } else {
    //               resultObject[elementInput[i].placeholder] = elementInput[i].value;
    //             }
    //             elementInput[i].value = '';
    //           }
    //         }
    //       }
    //       restaurant.employees.push(resultObject);
    //       createCard();
    //     }
    //     popupWindow.style = `display: none`;
    //   }
      
    //   let blockCalculateSalary = document.createElement('div');
    //   mainBlock.appendChild(blockCalculateSalary);
    //   blockCalculateSalary.className = 'sumSalary';
    //   blockCalculateSalary.innerHTML = `
    //   <div class="buttonSumSalary">calculate salary</div>
    //   <div class="buttonAverageSalary">average salary</div>
    //   <div class="buttonMinToMaxSalary">salary min and max</div>
    //   <div class="buttonAmountEmployee">amount employee</div>
    //   <p>is works</p>
    //   <select class="selectIsWorks">
    //   <option>true</option>
    //   <option>false</option>
    //   </select>
    //   <p>Department</p>
    //   <select class="selectDepartment">
    //   <option>1</option>
    //   <option>2</option>
    //   <option>3</option>
    //   </select>
    //   <div class="resultElement"></div>`;
    //   document.querySelector('.buttonSumSalary').addEventListener('click', () => {
    //     for(let i = 0; i < document.querySelector('.resultElement').children.length; i++){
    //       document.querySelector('.resultElement').children[i].remove();
    //       i--;
    //     }
    //     let isWorksValue = Boolean (document.querySelector('.selectIsWorks').value === 'true');
    //     let dapartmentValue = Number (document.querySelector('.selectDepartment').value);
    //     let resultText = document.createElement('p');
    //     let result = restaurant.sumSalary((item) => item.department === dapartmentValue && item.isWorks === isWorksValue);
    //     for(let i in result) {
    //       document.querySelector('.resultElement').appendChild(resultText);
    //       resultText.innerText = `department ${i} - salary ${result[i]}`;
    //     }
    //   })
    //   document.querySelector('.buttonAverageSalary').addEventListener('click', () => {
    //     for(let i = 0; i < document.querySelector('.resultElement').children.length; i++){
    //       document.querySelector('.resultElement').children[i].remove();
    //       i--;
    //     }
    //     let isWorksValue = Boolean (document.querySelector('.selectIsWorks').value === 'true');
    //     let dapartmentValue = Number (document.querySelector('.selectDepartment').value);
    //     let resultText = document.createElement('p');
    //     document.querySelector('.resultElement').appendChild(resultText);
    //     result = restaurant.averageSalary((item) => item.department === dapartmentValue && item.isWorks === isWorksValue);
    //     resultText.innerText = `department ${dapartmentValue} - average salary ${result}`;
    //   })
    //   document.querySelector('.buttonMinToMaxSalary').addEventListener('click', () => {
    //     for(let i = 0; i < document.querySelector('.resultElement').children.length; i++){
    //       document.querySelector('.resultElement').children[i].remove();
    //       i--;
    //     }
    //     let isWorksValue = Boolean (document.querySelector('.selectIsWorks').value === 'true');
    //     let dapartmentValue = Number (document.querySelector('.selectDepartment').value);
    //     let result = restaurant.salaryMinToMax((item) => item.department === dapartmentValue && item.isWorks === isWorksValue);
    //     for(let i in result){
    //       for(let j in result[i]){
    //         let resultText = document.createElement('p');
    //         document.querySelector('.resultElement').appendChild(resultText);
    //         resultText.innerText = (` ${j}  min - ${result[i][j]['min']}, max - ${result[i][j]['max']}`);
    //       }
    //     }
    //   })
    //   document.querySelector('.buttonAmountEmployee').addEventListener('click', () => {
    //     for(let i = 0; i < document.querySelector('.resultElement').children.length; i++){
    //       document.querySelector('.resultElement').children[i].remove();
    //       i--;
    //     }
    //     let isWorksValue = Boolean (document.querySelector('.selectIsWorks').value === 'true');
    //     let dapartmentValue = Number (document.querySelector('.selectDepartment').value);
    //     let resultText = document.createElement('p');
    //     let result = restaurant.amountEmployee((item) => item.department === dapartmentValue && item.isWorks === isWorksValue);
    //     resultText.innerText = `department ${dapartmentValue};
    //     amount employee - ${result}`;
    //     document.querySelector('.resultElement').appendChild(resultText);
    //   })
    
    