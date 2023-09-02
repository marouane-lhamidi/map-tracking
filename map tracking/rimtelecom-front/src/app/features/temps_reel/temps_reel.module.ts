import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TempsReelRoutingModule } from './temps_reel-routing.module';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    LeafletModule,
    AppRoutingModule,
    TempsReelRoutingModule
  ]
})
export class TempsReelModule { }
