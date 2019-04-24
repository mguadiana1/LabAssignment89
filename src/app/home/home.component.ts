import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('id_token');
    console.log('from login ngOnInIt token: ', token);
    if (token == null) {
      this.loggedIn = false;
      this.router.navigate(['login']);

    } else {
      this.loggedIn = true;
    }
  }

}
