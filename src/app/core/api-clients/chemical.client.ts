import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { SelectChemicalViewModel } from 'src/app/shared/controls/select-chemical-type/@model/select-chemical-type.model';
import { environment } from 'src/environments/environment.prod';
import {
  AddChemicalCommand,
  Chemical,
  GetDropdownsRequest,
  PagingRequest,
  PagingResult,
} from './_index';

@Injectable({
  providedIn: 'root',
})
export class ChemicalApiClient {
  apiEndpoint = `${environment.apiBaseUrl}/chemicals`;

  constructor(private httpClient: HttpClient) {}

  getChemicals(pagingOption: PagingRequest): Observable<PagingResult<Chemical>> {
    const options = {
      params: { ...pagingOption },
    };

    return this.httpClient.get<PagingResult<Chemical>>(
      `${this.apiEndpoint}`,
      options
    );
  }

  addChemical(command: AddChemicalCommand): Observable<string> {
    return this.httpClient.post<string>(`${this.apiEndpoint}`, command);
  }

  getChemicalTypeDropdown(
    request: GetDropdownsRequest
  ): Observable<SelectChemicalViewModel[]> {
    const options = {
      params: { ...request },
    };

    return this.httpClient.get<SelectChemicalViewModel[]>(
      `${this.apiEndpoint}/dropdown/type`,
      options
    );
  }
}
