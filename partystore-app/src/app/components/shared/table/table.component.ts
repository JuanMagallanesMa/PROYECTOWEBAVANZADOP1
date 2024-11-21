import { AfterViewInit, Component, Input, ViewChild } from '@angular/core'; 
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSortModule,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  @Input() dataSource!: MatTableDataSource<any>; 
  @Input() displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
}
