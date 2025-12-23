import { Routes } from '@angular/router';

export const SHOP_ROUTES: Routes = [
  {
    path: '',
    // /shop
    loadComponent: () =>
      import('./pages/shop-home/shop-home.component')
        .then(c => c.ShopHomeComponent),
  },
  {
    path: 'product/:id',
    // /shop/product/42
    loadComponent: () =>
      import('./pages/product-details/product-details.component')
        .then(c => c.ProductDetailsComponent),
  },
  {
    path: 'category/:category',
    // /shop/category/shoes
    loadComponent: () =>
      import('./pages/category-products/category-products.component')
        .then(c => c.CategoryProductsComponent),
  },
];
