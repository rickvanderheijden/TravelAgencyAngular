import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const PUBLIC_ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: '../../pages/public/homepage/homepage.module#HomepageModule'
  },
  {

  }
];
