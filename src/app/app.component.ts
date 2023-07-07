import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'WebSPA';
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}
}
