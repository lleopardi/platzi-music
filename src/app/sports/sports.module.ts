import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule } from '@ionic/angular';

import { SportsPageRoutingModule } from './sports-routing.module';
import { SportsPage } from './sports.page';
import { TracksFinderComponent } from './containers/tracks-finder/tracks-finder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportsPageRoutingModule,
    LeafletModule,
    ReactiveFormsModule
  ],
  declarations: [SportsPage, TracksFinderComponent]
})
export class SportsPageModule {}
