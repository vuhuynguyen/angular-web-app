import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
  BehaviorSubject,
  filter,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { ChemicalApiClient } from 'src/app/core/api-clients/chemical.client';
import { Chemical } from 'src/app/core/api-clients/chemical.model';
import {
  PagingResult,
  PagingRequest,
  DEFAULT_PAGING_REQUEST,
  DEFAULT_PAGINATION_OPTION,
} from 'src/app/core/api-clients/_index';
import { AddChemicalComponent } from '../add-chemical/add-chemical.component';

@Component({
  selector: 'app-chemical-overview',
  templateUrl: './chemical-overview.component.html',
  styleUrls: ['./chemical-overview.component.scss'],
})
export class ChemicalOverviewComponent implements OnInit {
  chemical$: Observable<PagingResult<Chemical>>;
  chemicalFilter: PagingRequest = DEFAULT_PAGING_REQUEST;
  pageSizeOptions = DEFAULT_PAGINATION_OPTION;
  search$ = new BehaviorSubject<any>(this.chemicalFilter);

  loading = {
    isLoading: true,
    hasData: false,
  };

  pagingConfig = {
    itemCount: 0,
    itemsPerPage: this.chemicalFilter.pageSize,
    currentPage: 1,
    id: 'idcontrol-datatable',
  };

  constructor(
    private chemicalApiClient: ChemicalApiClient,
    private modalService: NgbModal
  ) {
    this.chemical$ = this.getChemical();
  }

  ngOnInit(): void {}

  getChemical() {
    return this.search$.pipe(
      tap(() => {
        this.loading = { isLoading: true, hasData: false };
      }),
      switchMap((filter) => this.chemicalApiClient.getChemicals(filter)),
      shareReplay(1),
      tap((response: PagingResult<Chemical>) => {
        this.pagingConfig.itemCount = response.pageInfo.totalElements;
        this.loading = {
          isLoading: false,
          hasData: response.items.length > 0,
        };
      })
    );
  }

  onPageChange(pageSize: number, pageNumber: number) {
    this.pagingConfig.itemsPerPage = pageSize;
    this.pagingConfig.currentPage = pageNumber;
    this.chemicalFilter.pageSize = pageSize;
    this.chemicalFilter.pageNumber = pageNumber;
    this.search$.next(this.chemicalFilter);
  }

  openAddChemicalModal() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };

    const modalRef = this.modalService.open(
      AddChemicalComponent,
      ngbModalOptions
    );

    modalRef.closed
      .pipe(
        filter((isConfirm: boolean) => !!isConfirm),
        tap((res) => {
          this.reloadTable();
        })
      )
      .subscribe();
  }

  reloadTable() {
    this.pagingConfig.currentPage = 1;
    this.chemicalFilter.pageNumber = 1;
    this.search$.next(this.chemicalFilter);
  }
}
