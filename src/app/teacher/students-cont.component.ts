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
    {id: 's216986', name: 'Marco', firstName: 'Giallo'},
    {id: 's216987', name: 'Francesco', firstName: 'Grigio'},
    {id: 's216988', name: 'Luigi', firstName: 'Fucsia'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
