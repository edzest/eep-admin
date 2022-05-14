import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export interface TestInfo {
  name: string,
  status: string,
  modified: string,
}

const SAMPLE_TESTS: TestInfo[] = [
  { name: "PMP Mock Test June 2022", status: "Draft", modified: "A minute ago" },
  { name: "ACP Weekly Test", status: "Draft", modified: "10 minutes ago" },
  { name: "PMP Trivia Quiz", status: "Published", modified: "Yesterday" },
  { name: "My First Test", status: "Published", modified: "A week ago" },
];

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  testInfoColumns: string[] = ['name', 'status', 'modified'];
  testInfoTableDataSource = SAMPLE_TESTS;

  ngOnInit(): void {
  }

  onClickNewTest() {
    this.router.navigate(['/admin/create-test']);
  }
}
