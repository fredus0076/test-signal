import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { delay } from 'rxjs';

@Component({
  selector: 'app-my-autre-test',
  templateUrl: './my-autre-test.component.html',
  styleUrls: ['./my-autre-test.component.css']
})
export class MyAutreTestComponent implements OnInit {
  private readonly http = inject(HttpClient);
  constructor() { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(delay(2000)).subscribe((data: any) => {
      console.log(data);
    });

  }

}
