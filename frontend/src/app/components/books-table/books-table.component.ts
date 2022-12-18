import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from "../../models/book";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})

export class BooksTableComponent implements OnInit {
  books: Book [] = [];
  pageIndex: string;
  pageSize: string;
  sort: string;
  direction: string;
  displayedColumns: String[] = ['title', 'author', 'genre', 'status'];
  totalElements: number = 0;
  status: string;
  searchString: string;

  constructor(
    private bookService: BookService,
  ) {
  }


  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.getAllBooks({pageIndex: "0", pageSize: "20", sort: '', direction: ''})
  }

  private searchBooks() {
    const request = {};
    request['pageIndex'] = this.pageIndex != null ? this.pageIndex.toString() : '0';
    request['pageSize'] = this.pageSize != null ?  this.pageSize.toString() : '20';
    request['sort'] = this.sort;
    request['direction'] = this.direction;
    this.bookService.searchBooks(this.searchString, request)
      .subscribe(data => {
        this.books = data['content']
      }
        , error => {
          console.log(error.error.message);
        });
  }

  private getAllBooks(request) {
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
    this.pageIndex = event.pageIndex.toString();
    this.pageSize = event.pageSize.toString();
    request['pageIndex'] = event.pageIndex.toString();
    request['pageSize'] = event.pageSize.toString();
    request['sort'] = this.sort;
    request['direction'] = this.direction;
    this.getAllBooks(request);
  }
}
