import { Component, Input, OnInit } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../card/card.component';
import { IData } from '../../types';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CdkTableModule, MatIconModule, CardComponent],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css',
})
export class DatatableComponent implements OnInit {
  @Input() title: string = 'Data Table';
  @Input() data: IData[] | [] | null = [];

  displayedColumns: string[] = ['id', 'name', 'created_at', 'time_left'];
  dataSource: IData[] = [];

  constructor() {
    console.log('datatable: ', this.data);
  }

  ngOnInit() {
    this.dataSource = this.data || [];
    console.log('this.dataSource: ', this.dataSource);
  }
}
