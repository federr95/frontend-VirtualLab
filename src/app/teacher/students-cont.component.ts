import { Component, OnInit, Output } from '@angular/core';
import { Student } from '../student.model';

@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})
export class StudentsContComponent implements OnInit {
  
  @Output()
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
  
  @Output()
  studentSelected: Student[] = [ 
    {id: 's216984', name: 'Mario', firstName: 'Rossi'},
    {id: 's216985', name: 'Giovanni', firstName: 'Verdi'},
    {id: 's216986', name: 'Marco', firstName: 'Giallo'}
  ];

  @Output() studentNotSelected: Student[] = [];
  @Output() filteredStudent: Student[] = [];

  constructor() { }

  ngOnInit(): void {
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
  }

  unenrollStudent(students: Student[]){
    for(var i=0; i<students.length; i++){
      //console.log(this.selection.selected.length);
      var pos = this.studentSelected.indexOf(students[i]);
      this.studentNotSelected.push(this.studentSelected[pos]);
      this.studentSelected.splice(pos, 1);
    }
    console.log(this.studentNotSelected);
    
    this.filteredStudent = this.studentNotSelected;
  }

  enrollStudent(student: Student){
    if(!this.studentSelected.map( function(x) {
      return x.id; 
    }).includes(student.id)) {
       this.studentSelected.push(student);
       for(let i=0; i<this.studentNotSelected.length; i++){
         if(this.studentNotSelected[i].id == student.id){
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
      }
  }

}
