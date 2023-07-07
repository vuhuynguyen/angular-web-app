import { ApplicationRef, Injectable, Injector, NgZone } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingService: LoadingService | null = null;

  constructor(private injector: Injector, private appRef: ApplicationRef, private ngZone: NgZone) {}

  private ensureLoadingService(): LoadingService {
    if (!this.loadingService) {
      // Lazy initialization of the LoadingService
      this.loadingService = this.injector.get(LoadingService);
    }
    return this.loadingService;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loadingService = this.ensureLoadingService();
    loadingService.show();

    return next.handle(request).pipe(
      finalize(() => {
        loadingService.hide();
        this.ngZone.run(() => {
          this.appRef.tick(); // Trigger change detection manually
        });
      })
    );
  }
}