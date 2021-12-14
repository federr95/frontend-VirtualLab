import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
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
  
  toggleForMenuClick() {
    this.sidenav.toggle();
  }

}
