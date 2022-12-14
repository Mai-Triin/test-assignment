import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {CheckoutService} from "../../services/checkout.service";
import {CheckOut} from "../../models/checkout";


@Component({
  selector: 'app-checkouts-table',
  templateUrl: './checkouts-table.component.html',
  styleUrls: ['./checkouts-table.component.scss']
})

export class CheckoutsTableComponent implements OnInit {
  checkOuts: CheckOut [] = [];
  pageIndex: string;
  pageSize: string;
  sort: string;
  direction: string;
  displayedColumns: String[] = ['borrowerFirstName', 'borrowerLastName', 'borrowedBook', 'dueDate'];
  totalElements: number = 0;

  constructor(
    private checkOutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.getAllCheckOuts({pageIndex: "0", pageSize: "20", sort: '', direction: ''})
  }

  private getAllCheckOuts(request) {
    this.checkOutService.getCheckOuts(request)
      .subscribe(data => {
          this.checkOuts = data['content'];
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
    this.getAllCheckOuts(request);
  }

  announceSortChange(event: Sort) {
    const request = {};
    this.sort = event.active;
    this.direction = event.direction;
    request['sort'] = event.active;
    request['direction'] = event.direction;
    request['pageIndex'] = this.pageIndex;
    request['pageSize'] = this.pageSize;
    this.getAllCheckOuts(request);
  }
}
