import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page} from '../../models/page';
import {Book} from "../../models/book";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})

export class BooksTableComponent implements OnInit {
  books: Book [] = [];
  displayedColumns: String[] = ['title', 'author', 'genre', 'status'];
  totalElements: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bookService: BookService,
  ) {
  }


  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.getBooks({pageIndex: "0", pageSize: "20"})

  }

  private getBooks(request) {
    this.bookService.getBooks(request)
      .subscribe(data => {
          this.books = data['content'];
          this.totalElements = data['totalElements'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['pageIndex'] = event.pageIndex.toString();
    request['pageSize'] = event.pageSize.toString();

    this.getBooks(request);
  }
}
