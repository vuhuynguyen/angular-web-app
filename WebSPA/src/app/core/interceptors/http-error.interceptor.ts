import { Inject, Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize, filter, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next
      .handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event?.body?.title) {
              throw new HttpErrorResponse({
                error: {
                  title: event.body.title,
                },
                headers: event.headers,
                status: 400,
                statusText: 'Warning',
              });
            }

            return event;
          }
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          const errDetail =
            error && typeof error.error === 'string'
              ? JSON.parse(error.error)
              : error.error;

          this.toastr.error(errDetail.title);

          return throwError(() => errDetail.title);
        })
      );
  }
}
