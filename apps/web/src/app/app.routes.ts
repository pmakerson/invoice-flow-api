import { Routes } from '@angular/router';
import { InvoicesPage } from './features/invoices/pages/invoices-page';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'invoices'
},
{
    path: 'invoices',
    component: InvoicesPage
}];
