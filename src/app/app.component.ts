import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from './student.model';
import { OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // prove
  title = 'frontendtest';
  /** 
  title2 = 'frontendtest2';
  value = '';
  name = '';

  toggleTitle(event: Event) {
    if(this.title == 'frontendtest')
      this.title = 'NewFrontEndTest';
    else if(this.title == 'NewFrontEndTest')
      this.title = 'frontendtest';
  }

  onKey(event: KeyboardEvent){
    this.value += (event.target as HTMLInputElement).value + ' | ';
  }
  */
  //

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild(MatInput) matInput!: MatInput;
  @ViewChild('matpaginator', {static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort!: MatSort;

  allStudentVector: Student[] = [ 
    {id: 's216984', name: 'Mario', firstName: 'Rossi'},
    {id: 's216985', name: 'Giovanni', firstName: 'Verdi'},
    {id: 's216986', name: 'Marco', firstName: 'Giallo'},
    {id: 's216987', name: 'Francesco', firstName: 'Grigio'},
    {id: 's216988', name: 'Luigi', firstName: 'Fucsia'},
    {id: 's216989', name: 'Paolo', firstName: 'Lilla'},
    {id: 's216990', name: 'Piero', firstName: 'Nero'},
    {id: 's216991', name: 'Franco', firstName: 'Marrone'},
    {id: 's216992', name: 'Federico', firstName: 'Arancione'}
  ];
  
  studentSelected: Student[] = [ 
    {id: 's216984', name: 'Mario', firstName: 'Rossi'},
    {id: 's216985', name: 'Giovanni', firstName: 'Verdi'},
    {id: 's216986', name: 'Marco', firstName: 'Giallo'},
    {id: 's216987', name: 'Francesco', firstName: 'Grigio'},
    {id: 's216988', name: 'Luigi', firstName: 'Fucsia'},
    {id: 's216989', name: 'Paolo', firstName: 'Lilla'},
    {id: 's216990', name: 'Piero', firstName: 'Nero'},
  ];
  
  studentControl = new FormControl();
  displayedColumns: string[] = ['select', 'id', 'name', 'firstName'];
  dataSource = new MatTableDataSource<Student>(this.studentSelected);
  selection = new SelectionModel<Student>(true, []);
  
  filteredStudent: Student[] = [];
  studentNotSelected: Student[] = [];
  studentToAdd!: Student;

  numberOfStudentSelected!: number;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.numberOfStudentSelected = this.studentSelected.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.studentNotSelected = this.allStudentVector.filter(x => {
      //!this.studentSelected.includes(x));
      if(this.studentSelected.map( function(y) {
          return y.id;
        }).includes(x.id))
      return false;
        else 
      return true;   
    })
    this.filteredStudent = this.studentNotSelected;
    //console.log(this.studentNotSelected); 
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  toggleForMenuClick() {
    this.sidenav.toggle();
  }

  deleteSelectedStudent() {
    for(var i=0; i<this.selection.selected.length; i++){
      //console.log(this.selection.selected.length);
      var pos = this.studentSelected.indexOf(this.selection.selected[i]);
      this.studentNotSelected.push(this.studentSelected[pos]);
      this.studentSelected.splice(pos, 1);
    }
    this.dataSource = new MatTableDataSource<Student>(this.studentSelected);
    console.log(this.studentNotSelected);
    this.numberOfStudentSelected = this.studentSelected.length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.filteredStudent = this.studentNotSelected;
    this.selection.clear();
  }

  displayFn(user: Student): any {
    return user && user.name ? user.name + '  ' + user.firstName + '  ' + user.id: '';
  }

  filter(){
    const filterValue = this.studentControl.value.toLowerCase();
    //console.log(filterValue);
    //console.log(this.studentNotSelected);
    return this.filteredStudent = this.studentNotSelected.filter(option => option.name.toLowerCase().includes(filterValue) || 
        option.firstName.toLowerCase().includes(filterValue) || option.id.toLowerCase().includes(filterValue));
  }

  addStudent() {
    //console.log(this.studentNotSelected);
    if(!this.studentSelected.map( function(x) {
       return x.id; 
    }).includes(this.studentToAdd.id)) {
        this.studentSelected.push(this.studentToAdd);
        this.numberOfStudentSelected = this.studentSelected.length;
        for(let i=0; i<this.studentNotSelected.length; i++){
          if(this.studentNotSelected[i].id == this.studentToAdd.id){
            if(this.studentSelected.length != 0){
              //console.log("ciao");
              this.studentNotSelected.splice(i, 1);
              break;
            } else {
              //console.log("oaic");
              this.studentNotSelected = [];
              break;
            }
          }
        }
        console.log(this.studentSelected);
        console.log(this.studentNotSelected);
        this.dataSource = new MatTableDataSource<Student>(this.studentSelected);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.matInput.value = '';
        this.filteredStudent = this.studentNotSelected; // serve a riportare tutti gli studenti che erano stati esclusi dal filtro
        this.dialog.open(DialogElementsExampleDialog);
    }
  }

  getSelectedStudent(studentSelect: Student) {
    this.studentToAdd = studentSelect;
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  
}