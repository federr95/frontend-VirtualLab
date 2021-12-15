import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    template: `
      <h2 style="border-left-width: 0px;border-left-style: solid;margin-left: 21px;">
        Page Not Found
      </h2>`,
})

export class PageNotFoundComponent implements OnInit {

    path!: string;
      
    constructor(private route: ActivatedRoute) {}
      
    ngOnInit() {
      
    }
}
