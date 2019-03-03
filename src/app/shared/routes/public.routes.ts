import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from '../../pages/public/homepage/homepage.component';

//Route for content layout with sidebar, navbar and footer
export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadChildren: '../../pages/public/homepage/homepage#HomepageModuleModule'
  }
];
