import { CommonModule } from '@angular/common';
import { Component, computed, effect, linkedSignal, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
interface Product {
  id: number;
  name: string;
  status: 'draft' | 'active' | 'archived';
}
@Component({
  selector: 'app-templating',
  templateUrl: './templating.component.html',
  styleUrls: ['./templating.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TemplatingComponent implements OnInit {

  status = signal<'loading' | 'error' | 'done'>('loading');
  role = signal<'admin' | 'editor' | 'viewer'>('viewer');
  products = signal<Product[]>([]);
  user = signal({ first: 'Ada', last: 'Lovelace' });
  stats = signal({ total: 42, avg: 13.37 });
  sourceA = signal('a');
  sourceB = signal('b');
  selectedDistance = signal<number>(100);
  selectedTimeSlot = signal<number>(2);
  linkedExplicit = linkedSignal({
    source: computed(() => this.sourceA() + this.sourceB()),
    computation: (a) => {
      console.log(a);
      return a + '-linked';
    },
  });

  ngOnInit() {
    // Simule un chargement de données
    setTimeout(() => {
      this.status.set('done');
      this.products.set([
        { id: 1, name: 'Produit A', status: 'draft' },
        { id: 2, name: 'Produit B', status: 'active' },
        { id: 3, name: 'Produit C', status: 'archived' }
      ]);
    }, 8500);
  }

  speed = computed(() => this.selectedDistance() / this.selectedTimeSlot());

  clickOnMe(){
    this.linkedExplicit.update(value => {
      console.log(value)
      return value + '-clicked';
    })
  }

  distanceEff = effect(() =>
    console.log('Latest Distance: ', this.selectedDistance())
  )

}
