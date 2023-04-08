import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  employees!: Observable<any>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.employees = this.apollo
      .watchQuery<any>({ query: GET_EMPLOYEES, })
      .valueChanges.pipe(map(result => {
        console.log(result.data.getAllEmployees)
        return result.data.getAllEmployees
      }));
  }

}
