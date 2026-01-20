import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { delay } from 'rxjs';

import { ENVIRONMENT_TOKEN } from '@core/environnement/environnement.token';

@Component({
  selector: 'app-my-autre-test',
  templateUrl: './my-autre-test.component.html',
  styleUrls: ['./my-autre-test.component.css']
})
export class MyAutreTestComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly environnement = inject(ENVIRONMENT_TOKEN);
  ngOnInit() {
    this.http.get(`${this.environnement.fake_api}todos/1`).pipe(delay(2000)).subscribe((data: any) => {
      console.log(data);
    });

  }

}
