import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {PhotoService} from '../../services/photo.service';
import {ObservablesService} from '../../services/observables.service';
import {ActivatedRoute} from '@angular/router';
import {EnumService} from '../../services/enum.service';
import {SharedDataService} from '../../services/shared-data.service';
import {UtilService} from '../../services/util.service';
import {Response} from '../../_models';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-signoff-photo',
    templateUrl: './signoff-photo.page.html',
    styleUrls: ['./signoff-photo.page.scss'],
})
export class SignoffPhotoPage implements OnInit {
    errorMessage;

    capturedPhoto;

    type;
    data;

    constructor(
        public navCtrl: NavController,
        public photoService: PhotoService,
        public apiService: ApiService,
        public utilService: UtilService,
        public route: ActivatedRoute,
        public observablesService: ObservablesService,
        public sharedDataService: SharedDataService,
    ) {
        route.queryParams.subscribe((params: any) => {
            if (params) {
                if (params.type) {
                    this.type = params.type;
                }
                if (params.data) {
                    this.data = JSON.parse(params.data);
                }
            }
        });

        if (sharedDataService.signOffFor) {
            this.type = sharedDataService.signOffFor;
        }
    }

    ngOnInit() {
    }

    takePhoto() {
        this.photoService.takePhotoFromCamera((photo) => {
            this.capturedPhoto = photo;
        });
    }

    onClose() {
        this.navCtrl.back();
    }


    continue() {
        const fileName = 'user' + this.utilService.getCurrentTimeStamp() + '.jpeg';
        const mimeType = 'image/jpeg';
        this.utilService.dataUriToFile(this.capturedPhoto.dataUrl, fileName, mimeType)
            .then((file) => {
                switch (this.type) {
                    case EnumService.SignOffType.INDUCTION:
                        this.uploadInductionPhoto(file, fileName, (photoName) => {
                            this.sharedDataService.checkInPostData.userSignaturePhoto = photoName;
                            this.sharedDataService.submitInductionCheckInData(this.apiService);
                        });
                        break;

                    case EnumService.SignOffType.DOCUMENT_ACTIVITY:
                        this.uploadInductionPhoto(file, fileName, (photoName) => {
                            this.sharedDataService.signOffDetailsPostData.userSignaturePhoto = photoName;
                            this.sharedDataService.submitPersonalModeSignoffData(this.apiService);
                        });
                        break;

                    case EnumService.SignOffType.HAV:
                    case EnumService.SignOffType.ACCIDENT_REPORT:
                    case EnumService.SignOffType.CUSTOM_FORM:
                    case EnumService.SignOffType.RISK_ASSESSMENT:
                    case EnumService.SignOffType.DOCUMENT_DM:
                    case EnumService.SignOffType.FORMS_DM:
                        this.uploadInductionPhoto(file, fileName, (photoName) => {
                            this.sharedDataService.checkInPostData.userSignaturePhoto = photoName;
                            this.sharedDataService.submitInductionCheckInData(this.apiService);
                        });
                        break;

                    case EnumService.SignOffType.WORK_PERMIT:
                        this.navCtrl.navigateForward('permit-issued-result-dm', {
                            queryParams: {
                                permitResult: UtilService.randomBoolean() ? 'success' : 'failed'
                            }
                        });
                        break;

                    default:
                        this.uploadInductionPhoto(file, fileName, (photoName) => {
                            this.sharedDataService.checkInPostData.userSignaturePhoto = photoName;
                            this.sharedDataService.submitInductionCheckInData(this.apiService);
                        });
                }
            });
    }

    showCheckInResultScreen = (status = false) => {
        if (this.sharedDataService.dedicatedMode) {
            if (status) {
                this.navCtrl.navigateForward(['/checkinout-success-dm'], {
                    queryParams: {
                        message: 'You have now checked-in',
                        nextPage: 'dashboard-dm'
                    }
                });
            } else {
                this.navCtrl.navigateForward(['/checkinout-fail-dm'], {
                    queryParams: {
                        failTitle: 'No Qualification',
                        failSubTitle: 'Check in Not Allowed',
                        failMessage: 'This check-in requires to have certain \n' +
                            'qualifications which you do not have.',
                        nextPage: 'dashboard-dm'
                    }
                });
            }
        } else {
            if (status) {
                this.navCtrl.navigateForward(['/checkin-success'], {
                    queryParams: {
                        message: 'You Signed-Off Successfully',
                        nextPage: '/tabs/dashboard'
                    }
                });
            } else {
                this.navCtrl.navigateForward(['/checkin-fail'], {
                    queryParams: {}
                });
            }
        }
    };

    /**
     * Upload photo for  signoff
     */
    uploadInductionPhoto = async (file, fileName = '', callBack = null) => {
        const loading = await this.utilService.startLoadingWithOptions();

        this.apiService.inductionPhotoUpload(file, fileName).subscribe((res: Response) => {
            this.utilService.hideLoadingFor(loading);
            if (res.StatusCode === EnumService.ApiResponseCode.RequestSuccessful) {
                UtilService.fireCallBack(callBack, res.Result);
            } else {
                this.errorMessage = res.Message;
            }
        }, (error) => {
            this.utilService.hideLoadingFor(loading);
            this.errorMessage = error.message ? error.message : error;
        });
    };
}
