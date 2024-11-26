import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'; 
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSort, MatSortModule } from '@angular/material/sort'
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSortModule,CommonModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<T>; 
  @Input() displayedColumns!: string[]; 
  @Input() columnAliases: { [key: string]: string } = {}; 
  @Output() onEdit = new EventEmitter<T>(); 
  @Output() onDelete = new EventEmitter<number>(); 
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort; // Añadí el ViewChild para MatSort 
  ngAfterViewInit(): void { 
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort; // Añadí la asignación del sort 
    
  } 
    
  edit(item: T): void { 
    this.onEdit.emit(item); 
  } 
  delete(id: number): void { 
    this.onDelete.emit(id); 
  }
}
