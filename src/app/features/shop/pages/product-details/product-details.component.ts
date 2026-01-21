import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SimuleLourdComponent } from './simuleLourdComponent/simuleLourdComponent';

@Component({
  standalone: true,
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  imports: [CommonModule, SimuleLourdComponent],
})
export class ProductDetailsComponent {
  productId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }
}
