import { NgModule } from '@angular/core';
import { PagesRoutingModule } from '../modules/routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [LayoutComponent, SideBarComponent],
  imports: [PagesRoutingModule, SharedModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
