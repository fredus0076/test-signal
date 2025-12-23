import { Component, inject, OnInit } from '@angular/core';
import { MyAutreTestComponent } from './my-autre-test/my-autre-test.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-autre-with-id',
  imports: [MyAutreTestComponent],
  templateUrl: './autre-with-id.component.html',
  styleUrls: ['./autre-with-id.component.css']
})
export class AutreWithIdComponent implements OnInit {
  showContent = false;
  private route = inject(ActivatedRoute);
  user$: Observable<any> = this.route.snapshot.data['user']


  constructor() { }

  ngOnInit() {
    this.user$?.subscribe(data => {
      console.log(data);
    });
    // Reset l'état à chaque navigation
    this.showContent = false;
  }

}
