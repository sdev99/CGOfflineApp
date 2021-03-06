import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderContentListPageRoutingModule } from './folder-content-list-routing.module';

import { FolderContentListPage } from './folder-content-list.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, FolderContentListPageRoutingModule, ComponentsModule, TranslateModule],
	declarations: [FolderContentListPage],
})
export class FolderContentListPageModule {}
