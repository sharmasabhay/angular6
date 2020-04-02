import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  constructor() {
        const body_add = document.getElementsByTagName('body')[0];
        body_add.classList.remove('homepage');
  }

  ngOnInit() {
      window.scrollTo(0, 0);
  }

}
