import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {DemoDataService} from '../../services/demo-data.service';
import {PhotoService} from '../../services/photo.service';
import {SharedDataService} from '../../services/shared-data.service';
import {ExitConfirmationPage} from '../../modals/exit-confirmation/exit-confirmation.page';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EnumService} from '../../services/enum.service';
import {ActivatedRoute} from '@angular/router';
import {FilehandlerService} from '../../services/filehandler.service';
import {ObservablesService} from '../../services/observables.service';
import {Subscription} from 'rxjs';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {PortraitModePage} from '../../modals/portrait-mode/portrait-mode.page';

@Component({
    selector: 'app-form-custom',
    templateUrl: './form-custom.page.html',
    styleUrls: ['./form-custom.page.scss'],
})
export class FormCustomPage implements OnDestroy {

    errorMessage = '';

    isSubmitted = false;
    activityDetail;

    list = DemoDataService.activityCustomForm.clone();
    answer = {};

    currentPageIndex = 1;
    totalPage = 32;

    screenOrientationModal;

    constructor(
        public navCtrl: NavController,
        public photoService: PhotoService,
        public sharedDataService: SharedDataService,
        public observablesService: ObservablesService,
        public modalController: ModalController,
        public route: ActivatedRoute,
        private filehandlerService: FilehandlerService,
        private screenOrientation: ScreenOrientation
    ) {

        this.list.map((item, key) => {
            this.answer[key] = {};
        });

        route.queryParams.subscribe((params: any) => {
            if (params) {
                if (params.activityDetail) {
                    this.activityDetail = JSON.parse(params.activityDetail);
                }
            }
        });

        if (this.sharedDataService.dedicatedMode) {

            if (screenOrientation.type.includes('landscape')) {
                screenOrientation.unlock();
                this.showOrientationModal();
            }

            screenOrientation.onChange().subscribe(() => {
                if (screenOrientation.type.includes('portrait')) {
                    if (this.screenOrientationModal) {
                        this.screenOrientationModal.dismiss();
                    }
                }
                if (screenOrientation.type.includes('landscape')) {
                    screenOrientation.unlock();
                    this.showOrientationModal();
                }
            });
        }
    }


    ionViewDidEnter() {

    }

    ionViewWillLeave(): void {
    }

    ngOnDestroy() {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
    }

    async showOrientationModal() {
        const modal = await this.modalController.create({
            component: PortraitModePage,
            swipeToClose: false,
            showBackdrop: false,
            backdropDismiss: false,
            animated: false,
            componentProps: {},
            cssClass: 'portrait-mode-model'
        });
        await modal.present();

        modal.onWillDismiss().then(({data}) => {
            if (data) {
                // this.navCtrl.back();
            }
        });

        this.screenOrientationModal = modal;
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
            this.navCtrl.navigateForward(['/signoff-digitalink'], {
                queryParams: {
                    type: EnumService.SignOffType.CUSTOM_FORM,
                    data: JSON.stringify(this.activityDetail),
                }
            });
        } else {
            this.errorMessage = invalidCount + ' required questions are not answered yet';
        }
    }

    addImage(index) {
        this.photoService.choosePhotoOption((photo) => {
            this.openImageAnnotation(index, photo);
        });
    }

    openImageAnnotation = (index, photo) => {
        this.sharedDataService.setAnnotationImage(photo);
        this.sharedDataService.onAnnotationImageDone = (image) => {
            this.answer[index] = {
                ...this.answer[index],
                image
            };
        };

        this.navCtrl.navigateForward(['/image-annotation']);
    };

    addDateNote(index) {
        this.answer[index] = {
            ...this.answer[index],
            addNote: true,
        };
    }

    isValid(index, section) {
        let isValid = true;
        if (this.isSubmitted && section.required) {
            isValid = false;
            const answer = this.answer[index];
            if (answer) {
                switch (section.question_type) {
                    case 'date':
                        isValid = answer.date;
                        break;
                    case 'image_annotation':
                        isValid = answer.image;
                        break;
                    case 'options':
                        if (section.canMultipleAsnwer) {
                            section.options.map((item) => {
                                if (item.checked) {
                                    isValid = item.checked;
                                    return;
                                }
                            });
                        } else {
                            isValid = section.selectedValue;
                        }
                        break;
                    case 'photo':
                        isValid = answer.image;
                        break;
                    case 'time':
                        isValid = answer.time;
                        break;
                    default:
                        isValid = true;
                }
            }
        }
        return isValid;
    }

    photoAdded(index, photo) {
        this.openImageAnnotation(index, photo);
    }

    photoRemoved(index) {
        this.answer[index] = {
            ...this.answer[index],
            image: null,
        };
    }

    timeSelect(index, time) {
        this.answer[index] = {
            ...this.answer[index],
            timePeriod: time,
        };
    }


    previous() {
        if (this.currentPageIndex > 1) {
            this.currentPageIndex--;
        }
    }

    next() {
        if (this.currentPageIndex < this.totalPage) {
            this.currentPageIndex++;
        }
    }


}
