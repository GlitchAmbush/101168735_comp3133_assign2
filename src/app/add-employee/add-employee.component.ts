import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      emp_id
      first_name
      last_name
      email
    }
  }
`;

const GET_ONE_EMPLOYEE = gql`
  query GetEmployeeByID($empId: Int!) {
    getEmployeeByID(emp_id: $empId) {
      first_name
      last_name
      gender
      email
      salary
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($employeeInput: EmployeeInput) {
    createEmployee(employeeInput: $employeeInput) {
      emp_id
      first_name
      last_name
      gender
      email
      salary
    }
  }
`;


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: any;
  clickEvent: any;
  title: string = "Add";

  // new data
  first_name!: String;
  last_name!: String;
  email!: String;
  gender!: String;
  salary!: Number;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apollo: Apollo) { }
  
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('emp_id'))
      
      if (params.get('emp_id') != null) {
        // change title
        this.title = "Edit"

        // get employee information
        var id = Number(params.get("emp_id"));
        this.getById(id);
      }
    });
  }

  getById(id: number) {
    this.apollo
        .watchQuery<any>({
          query: GET_ONE_EMPLOYEE,
          variables: { empId: id }
        })
        .valueChanges.subscribe(result => {
          this.employee = result.data.getEmployeeByID
        })
  }

  create() {
    this.first_name = (<HTMLInputElement>document.getElementById("first_name")).value;
    this.last_name = (<HTMLInputElement>document.getElementById("last_name")).value;
    this.email = (<HTMLInputElement>document.getElementById("email")).value;
    this.salary = Number((<HTMLInputElement>document.getElementById("salary")).value);
    this.gender = (<HTMLInputElement><unknown>document.getElementsByName("gender")).value;
    
    this.apollo.mutate<any>({
      mutation: CREATE_EMPLOYEE,
      variables: {
        emp_id: Math.floor(Math.random() * 1000000),
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        gender: this.gender,
        salary: this.salary
      },
      update: (store, { data }) => {
        if (data?.createEmployee) {
          var allData = store.readQuery<any>({ query: GET_EMPLOYEES });

          if (allData && allData?.getAllEmployees.length > 0) {
            var newData: any[] = [...allData.getAllEmployees];
            newData.unshift(data.createEmployee);
          }
        }
      }
    }).subscribe(result => {
      this.router.navigate(['/']);
    })
  }
}
