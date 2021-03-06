import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentOpenchoicePageRoutingModule } from './document-openchoice-routing.module';

import { DocumentOpenchoicePage } from './document-openchoice.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, DocumentOpenchoicePageRoutingModule, ComponentsModule, TranslateModule],
	declarations: [DocumentOpenchoicePage],
})
export class DocumentOpenchoicePageModule {}
