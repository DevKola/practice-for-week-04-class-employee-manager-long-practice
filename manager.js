"use strict";
const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, salary, title, manager = null, employees = []) {
    super(name, salary, title, manager);
    this.employees = employees;
  }

  addEmployee(employee) {
    if (employee instanceof Employee) {
      this.employees.push(employee);
    } else {
      throw new Error("WARNING: Invalid instance provided");
    }
  }

  _totalSubSalary() {
    let sum = 0;

    this.employees.forEach((employee) => {
      if (employee instanceof Manager) {
        sum += employee.salary + employee._totalSubSalary();
      } else {
        sum += employee.salary;
      }
    });

    return sum;
  }

  calculateBonus(multiplier) {
    let bonus = (this.salary + this._totalSubSalary()) * multiplier;
    return bonus;
  }
}

module.exports = Manager;
