import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor() {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
  }

  ngOnInit() {
      window.scrollTo(0, 0);
  }

}
