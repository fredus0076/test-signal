import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CategorySearchControlComponent } from './category-search-control/category-search-control.component';

@Component({
  standalone: true,
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, CategorySearchControlComponent],
})
export class CategoryProductsComponent {
  category: string | null = null;
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    search: [''],
  });

  constructor(
    private route: ActivatedRoute,
  ) {
    this.category = this.route.snapshot.paramMap.get('category');
  }
}
