import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../student.model';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild(MatInput) matInput!: MatInput;
  @ViewChild('matpaginator', {static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort!: MatSort;

  
  @Input() allStudentVector!: Student[];
  @Input() studentSelected!: Student[];
  @Input() filteredStudent: Student[] = [];
  @Input() studentNotSelected: Student[] = [];

  @Output('delete') studentsToUnenroll = new EventEmitter<Student[]>();
  @Output('add') studentToEnroll = new EventEmitter<Student>();
  
  studentControl = new FormControl();
  displayedColumns: string[] = ['select', 'id', 'name', 'firstName'];
  dataSource = new MatTableDataSource<Student>(this.studentSelected);
  selection = new SelectionModel<Student>(true, []);

  studentToAdd!: Student;

  numberOfStudentSelected!: number;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
    this.numberOfStudentSelected = this.studentSelected.length;
    this.dataSource = new MatTableDataSource<Student>(this.studentSelected);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  /*deleteSelectedStudent() {
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
  }*/

  unenrollSelectedStudent(){
    if(!this.selection.isEmpty()){
      this.studentsToUnenroll.emit(this.selection.selected);
      this.numberOfStudentSelected = this.studentSelected.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection.clear();
    }
  }

  /*addStudent() {
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
  }*/

  enrollSelectedStudent() {
    if(this.matInput.value != ''){
      this.studentToEnroll.emit(this.studentToAdd);
      this.numberOfStudentSelected = this.studentSelected.length;
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

  displayFn(user: Student): any {
    return user && user.name ? user.name + '  ' + user.firstName + '  ' + user.id: '';
  }

  filter(){
    const filterValue = this.studentControl.value.toLowerCase();
    
    return this.filteredStudent = this.studentNotSelected.filter(option => option.name.toLowerCase().includes(filterValue) || 
        option.firstName.toLowerCase().includes(filterValue) || option.id.toLowerCase().includes(filterValue));
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: '../dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  
}