import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Employee} from '../../interfaces';
import {Neo4jService} from '../../services';

@Component({
  selector: 'ts-neo4j-neo4j',
  templateUrl: 'neo4.component.html',
  styleUrls: ['./neo4j.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class Neo4jComponent implements OnInit {

  employees: Employee[];

  constructor(private neo4jService: Neo4jService) {
    this.employees = [];
  }

  ngOnInit() {
    this.neo4jService.findAllEmployees().subscribe(employees => {
      this.employees = employees;
    }, (error) => {
      console.log('error', error);
    });
  }

}
