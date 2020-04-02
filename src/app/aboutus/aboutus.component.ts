import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
  }

  ngOnInit() {
      window.scrollTo(0, 0);
  }

}
