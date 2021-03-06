import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DemoDataService } from '../../services/demo-data.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { InductionItem } from '../../_models/inductionItem';
import { UtilService } from '../../services/util.service';
import { EnumService } from '../../services/enum.service';
import { ApiService } from '../../services/api.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../_models';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-checkin-induction-form',
	templateUrl: './checkin-induction-form.page.html',
	styleUrls: ['./checkin-induction-form.page.scss'],
})
export class CheckinInductionFormPage implements OnInit {
	user: User;

	list = DemoDataService.inductionForm.clone().concat();
	errorMessage = '';
	isSubmitted = false;

	inductionItem: InductionItem;

	constructor(
		public navCtrl: NavController,
		public route: ActivatedRoute,
		public sharedDataService: SharedDataService,
		public utilService: UtilService,
		public apiService: ApiService,
		public accountService: AccountService,
		public translateService: TranslateService
	) {
		this.user = accountService.userValue;

		this.route.queryParams.subscribe((parameters) => {
			const inductionContentItemIndex = parameters.inductionContentItemIndex;
			if (this.sharedDataService.checkInDetail?.checkInInductionItems?.length > inductionContentItemIndex) {
				this.inductionItem = this.sharedDataService.checkInDetail?.checkInInductionItems[inductionContentItemIndex];
			}
		});
	}

	ngOnInit() {
		this.getFormDetails();
	}

	onBack() {
		this.navCtrl.back();
	}

	async getFormDetails() {
		this.utilService.presentLoadingWithOptions();

		const entityIds = this.utilService.getRelevantEntityId(this.sharedDataService.checkInForLocation?.locationID);
		this.apiService.getSignOffFormDetail(this.user?.userId, this.inductionItem.formID, entityIds.LocationID, entityIds.ProjectID, entityIds.InventoryID).subscribe(
			(response) => {
				this.utilService.hideLoading();
			},
			(error) => {
				this.utilService.hideLoading();
			}
		);
	}

	onClose() {
		if (this.sharedDataService.dedicatedMode) {
			this.navCtrl.navigateRoot('dashboard-dm', { replaceUrl: true });
		} else {
			this.navCtrl.navigateBack('/checkinout-confirm', { replaceUrl: true });
		}
	}

	onContinue() {
		this.isSubmitted = true;
		let isValid = true;
		let invalidCount = 0;
		this.list.map((item, key) => {
			if (!this.isValid(key, item)) {
				isValid = false;
				invalidCount++;
			}
		});

		if (isValid) {
			let userId;
			if (this.sharedDataService.dedicatedMode) {
				userId = this.sharedDataService.dedicatedModeUserDetail?.userId;
			} else {
				userId = this.user?.userId;
			}
			this.sharedDataService.inductionNavigationProcess(userId, this.sharedDataService.inductionContentItemIndex);
		} else {
			this.translateService.get('SHARED_TEXT.ERRORS.REQUIRED_QUESTIONS_EMPTY_MESSAGE').subscribe((res) => {
				this.errorMessage = invalidCount + ' ' + res;
			});
		}
	}

	previous() {}

	next() {}

	isValid(index, section) {
		let isValid = true;
		if (this.isSubmitted && section.required) {
			isValid = false;
			if (section.answer) {
				isValid = true;
			}
		}
		return isValid;
	}
}
