import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private requestCount = 0;
    private loadingSubject = new BehaviorSubject<boolean>(true);
    public loading$ = this.loadingSubject.asObservable();

    show(): void {
        this.requestCount++;
        this.loadingSubject.next(true);
    }

    hide(): void {
        this.requestCount--;
        if (this.requestCount === 0) {
            this.loadingSubject.next(false);
        }
    }
}