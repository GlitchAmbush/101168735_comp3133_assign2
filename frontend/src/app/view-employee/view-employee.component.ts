import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;
  
  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = Number(params.get("emp_id"));

      this.getById(id);
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
}
