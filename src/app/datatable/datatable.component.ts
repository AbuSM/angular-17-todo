import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { CardComponent } from '../card/card.component';
import { IData } from '../../types';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CardComponent,
    CommonModule,
  ],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css',
})
export class DatatableComponent implements OnChanges {
  @Input() title: string = 'Data Table';
  @Input() data: IData[] | [] | null = [];
  @Input() isToday: boolean = false;
  @Input() loading: boolean = false;
  @Output() onFavorite = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

  displayedColumns: string[] = [
    'title',
    'created_at',
    'expiration_date',
    'actions',
  ];
  dataSource: any = new MatTableDataSource<IData>([]);
  selection = new SelectionModel<IData>(true, []);

  constructor(
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource = new MatTableDataSource<IData>(this.data || []);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  onFavoriteClick(id: string) {
    if (!this.data?.length) return;
    this.onFavorite.emit(id);
  }

  onRemoveClick(id: string) {
    if (!this.data?.length) return;
    this.onRemove.emit(id);
  }

  formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  formatTime(date: string | Date, startInterval: boolean = true): SafeHtml {
    if (!this.isToday) {
      return this.formatDate(date);
    }
    const eventTime = new Date(date).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = eventTime - currentTime;

    let hours = Math.floor(timeDifference / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (startInterval && timeDifference > 0) {
      this.ngZone.runOutsideAngular(() => {
        setInterval(() => {
          this.update();
        }, 1000);
      });
    }

    let str = '';
    if (hours > 0) {
      str += `${hours}h `;
    }
    if (minutes > 0) {
      str += `${minutes}m `;
    }
    if (seconds >= 0) {
      str += `${seconds}s`;
    }

    if (hours < 1) {
      return this.sanitizer.bypassSecurityTrustHtml(
        `<span style="color: red;">${str}</span>`
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }

  update() {
    this.cdRef.detectChanges();
  }

  checkboxLabel(row?: IData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row?.id + 1
    }`;
  }
}
