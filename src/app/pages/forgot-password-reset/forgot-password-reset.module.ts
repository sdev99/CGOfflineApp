import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordResetPageRoutingModule } from './forgot-password-reset-routing.module';

import { ForgotPasswordResetPage } from './forgot-password-reset.page';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, ForgotPasswordResetPageRoutingModule, ComponentsModule, ReactiveFormsModule, TranslateModule],
	declarations: [ForgotPasswordResetPage],
})
export class ForgotPasswordResetPageModule {}
