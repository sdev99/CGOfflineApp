import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailPageRoutingModule } from './activity-detail-routing.module';

import { ActivityDetailPage } from './activity-detail.page';
import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ActivityDetailPageRoutingModule,
        ComponentsModule,
        PipesModule
    ],
  declarations: [ActivityDetailPage]
})
export class ActivityDetailPageModule {}
