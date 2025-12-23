import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'autre',
        loadChildren: () => import('./autre/autre.routing').then(m => m.AutreRoutes) //loadChildren quand on appel un fichier de routing
    },
    {
        path: 'templating',
        loadComponent: () => import('./templating/templating.component').then(m => m.TemplatingComponent) //loadComponent quand on appel un component
    },
    {
        path: 'shop',
        // => Zoom ici : on utilise loadChildren
        loadChildren: () =>
        import('./features/shop/shop.routes').then(m => m.SHOP_ROUTES)
    },
];
