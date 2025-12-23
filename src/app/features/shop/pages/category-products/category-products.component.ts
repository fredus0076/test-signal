import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
  imports: [CommonModule],
})
export class CategoryProductsComponent {
  category: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.category = this.route.snapshot.paramMap.get('category');
  }
}
