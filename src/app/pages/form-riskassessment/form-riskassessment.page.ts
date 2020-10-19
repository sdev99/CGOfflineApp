import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {DemoDataService} from '../../services/demo-data.service';
import {ExitConfirmationPage} from '../../modals/exit-confirmation/exit-confirmation.page';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EnumService} from '../../services/enum.service';
import {ActivatedRoute} from '@angular/router';
import {FilehandlerService} from '../../services/filehandler.service';
import {ObservablesService} from '../../services/observables.service';
import {Subscription} from 'rxjs';
import {SharedDataService} from '../../services/shared-data.service';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';


@Component({
    selector: 'app-form-riskassessment',
    templateUrl: './form-riskassessment.page.html',
    styleUrls: ['./form-riskassessment.page.scss'],
})
export class FormRiskassessmentPage {
    isSubmitted = false;
    errorMessage = '';

    activityDetail;

    totalItem = 42;
    currentItem = 1;

    list = DemoDataService.riskAssesmentQuestions.clone();
    riskRatings = DemoDataService.riskRatings.clone();
    residualRiskRatings = DemoDataService.residualRiskRatings.clone();
    users = DemoDataService.users.clone();
    groups = DemoDataService.usersGroups.clone();

    ionSelectInterface = 'popover';

    userGroupTypes = [{name: 'Users', id: 'users'}, {name: 'Groups', id: 'groups'}];

    unanswerCount = 0;

    screenOrientationSubscribe;
    isShowOritationPortrait = false;

    constructor(
        public navCtrl: NavController,
        public modalController: ModalController,
        public route: ActivatedRoute,
        private filehandlerService: FilehandlerService,
        public observablesService: ObservablesService,
        public sharedDataService: SharedDataService,
        private screenOrientation: ScreenOrientation,
        private ngZone: NgZone,
    ) {

        route.queryParams.subscribe((params: any) => {
            if (params) {
                if (params.activityDetail) {
                    this.activityDetail = JSON.parse(params.activityDetail);
                }
            }
        });

        this.totalItem = this.list.length;
    }

    ionViewDidEnter() {

    }

    ionViewWillLeave(): void {

    }

    handleOrientation = () => {
        if (this.sharedDataService.dedicatedMode) {
            if (this.screenOrientation.type.includes('landscape')) {
                this.screenOrientation.unlock();
                this.isShowOritationPortrait = true;
            }

            this.screenOrientationSubscribe = this.screenOrientation.onChange().subscribe(() => {
                this.ngZone.run(() => {
                    if (this.screenOrientation.type.includes('portrait')) {
                        this.isShowOritationPortrait = false;
                    }
                    if (this.screenOrientation.type.includes('landscape')) {
                        this.isShowOritationPortrait = true;
                    }
                });
            });
        }
    };


    ionViewWillEnter() {
        this.handleOrientation();
    }

    ionViewDidLeave(): void {

        if (this.sharedDataService.dedicatedMode) {
            this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
            this.screenOrientationSubscribe.unsubscribe();
        }
    }

    openFile() {
        this.filehandlerService.openFile();
    }

    async onClose() {
        const modal = await this.modalController.create({
            component: ExitConfirmationPage,
            swipeToClose: false,
            showBackdrop: false,
            backdropDismiss: false,
            animated: true,
            componentProps: {}
        });
        await modal.present();

        modal.onWillDismiss().then(({data}) => {
            if (data) {
                this.navCtrl.back();
            }
        });
    }

    previous() {
        if (this.currentItem > 1) {
            this.currentItem--;
        }
    }

    next() {
        if (this.currentItem < this.totalItem) {
            this.currentItem++;
        }
    }

    residualRiskRatingChange(event, section, type) {
        section[type] = event.detail.checked;
    }


    addUser(section) {
        if (!section.addedUsers) {
            section.addedUsers = {};
        }
        this.users.map((item) => {
            if (item.id === section.selectedUser) {
                section.addedUsers[section.selectedUser] = item;
                return;
            }
        });
        section.selectedUser = null;
    }

    addGroup(section) {
        if (!section.addedGroups) {
            section.addedGroups = {};
        }
        this.groups.map((item) => {
            if (item.id === section.selectedGroup) {
                section.addedGroups[section.selectedGroup] = item;
                return;
            }
        });
        section.selectedGroup = null;
    }

    removeUser(section, id) {
        delete section.addedUsers[id];
    }

    removeGroup(section, id) {
        delete section.addedGroups[id];
    }

    onContinue() {
        this.isSubmitted = true;

        //check if all questions answers

        let unanswerCount = 0;

        this.list.map((item: any) => {
            let error = false;
            if (item.required) {
                if (!item.riskRating || !item.residualRiskRating) {
                    error = true;
                }
                if (error) {
                    unanswerCount++;
                }
            }
            item.error = error;
        });
        this.unanswerCount = unanswerCount;

        if (unanswerCount === 0) {
            this.navCtrl.navigateForward(['/signoff-digitalink'], {
                queryParams: {
                    type: EnumService.SignOffType.RISK_ASSESSMENT,
                    data: JSON.stringify(this.activityDetail),
                }
            });
        } else {
            this.errorMessage = unanswerCount + ' required questions are not answered yet';
        }
    }

}
