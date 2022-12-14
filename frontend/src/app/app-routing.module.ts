import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksListComponent} from './components/books-list/books-list.component';
import {BookDetailComponent} from './components/book-detail/book-detail.component';
import {BooksTableComponent} from './components/books-table/books-table.component';
import {CheckoutsTableComponent} from "./components/checkouts-table/checkouts-table.component";

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books', redirectTo: 'books/table', pathMatch: 'full'},
  {path: 'books/table', component: BooksTableComponent},
  {path: 'books', redirectTo: 'checkouts/table', pathMatch: 'full'},
  {path: 'checkouts/table', component: CheckoutsTableComponent},
  {path: 'books/:id', component: BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
