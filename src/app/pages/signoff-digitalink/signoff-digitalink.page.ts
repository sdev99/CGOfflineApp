import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {fabric} from 'fabric';
import {ActivatedRoute} from '@angular/router';
import {ObservablesService} from '../../services/observables.service';
import {EnumService} from '../../services/enum.service';
import {SharedDataService} from '../../services/shared-data.service';
import {UtilService} from '../../services/util.service';
import {ApiService} from '../../services/api.service';
import {Response, User} from '../../_models';
import {AccountService} from '../../services/account.service';
import {FilehandlerService} from '../../services/filehandler.service';

@Component({
    selector: 'app-signoff-digitalink',
    templateUrl: './signoff-digitalink.page.html',
    styleUrls: ['./signoff-digitalink.page.scss'],
})
export class SignoffDigitalinkPage implements OnInit {
    errorMessage;

    user: User;
    isConfirm = false;
    canvasRef;

    pageTitle = 'Sign-Off';
    title = 'You are signing-off';
    subTitle = 'Digital Ink Signature';
    aggrementTitle = 'I herby confirm that I\'ve read and understood everything I viewed.';
    showDigitalInk = false;

    type;
    data;

    constructor(
        public navCtrl: NavController,
        public utilService: UtilService,
        public route: ActivatedRoute,
        public observablesService: ObservablesService,
        public sharedDataService: SharedDataService,
        public apiService: ApiService,
        private accountService: AccountService,
        private filehandlerService: FilehandlerService,
    ) {
        this.user = this.accountService.userValue;

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
        switch (this.type) {
            case EnumService.SignOffType.INDUCTION:
                this.aggrementTitle = 'I confirm that I\'ve read the induction.';
                this.subTitle = 'Induction';
                if (this.sharedDataService.checkInDetail && this.sharedDataService.checkInDetail.checkInInduction.isSignatureSignOff) {
                    this.showDigitalInk = true;
                    this.initialiseDrawing();
                }
                break;

            case EnumService.SignOffType.DOCUMENT_ACTIVITY:
                this.aggrementTitle = 'I confirm that I\'ve read the above document.';
                if (this.sharedDataService.activitySignOffDocumentDetail) {
                    this.subTitle = this.sharedDataService.activitySignOffDocumentDetail.documentTitle;
                    if (this.sharedDataService.activitySignOffDocumentDetail && this.sharedDataService.activitySignOffDocumentDetail.isSignatureSignOff) {
                        this.showDigitalInk = true;
                        this.initialiseDrawing();
                    }
                }
                break;


            case EnumService.SignOffType.HAV:
            case EnumService.SignOffType.ACCIDENT_REPORT:
            case EnumService.SignOffType.CUSTOM_FORM:
            case EnumService.SignOffType.RISK_ASSESSMENT:
                this.aggrementTitle = 'I confirm that I\'ve filled the above form.';
                this.subTitle = this.data.name;
                this.showDigitalInk = true;
                this.initialiseDrawing();
                break;

            case EnumService.SignOffType.DOCUMENT_DM:
                this.aggrementTitle = 'I herby confirm that I\'ve read and understood everything I viewed.';
                this.pageTitle = 'Sign-Off';
                this.title = 'Sign-Off';
                this.subTitle = '';
                this.showDigitalInk = true;
                this.initialiseDrawing();
                break;

            case EnumService.SignOffType.WORK_PERMIT:
                this.aggrementTitle = 'I herby confirm that I\'ve read and understood everything I viewed.';
                this.pageTitle = 'Sign-Off';
                this.title = 'Sign-Off';
                this.subTitle = '';
                this.showDigitalInk = true;
                this.initialiseDrawing();
                break;

            default:
                this.showDigitalInk = true;
                this.initialiseDrawing();
        }
    }

    initialiseDrawing() {
        setTimeout(() => {
            this.canvasRef = new fabric.Canvas('digital-signature');
            if (this.sharedDataService.dedicatedMode) {
                const ele = document.getElementById('digital-signature');
                this.canvasRef.setDimensions({width: ele.offsetWidth, height: ele.offsetHeight});
            } else {
                this.canvasRef.setDimensions({width: window.innerWidth - 46, height: (window.innerHeight * 28 / 100)});
            }
            this.canvasRef.on('selection:created', () => {
            });
            this.canvasRef.on('selection:cleared', () => {
            });
            this.canvasRef.freeDrawingBrush.color = '#171538';
            this.canvasRef.freeDrawingBrush.width = 4;
            this.canvasRef.isDrawingMode = true;
        }, 200);
    }

    isDigitalSignEmpty = () => {
        if (this.canvasRef) {
            const context = this.canvasRef.getContext('2d');
            const pixelBuffer = new Uint32Array(
                context.getImageData(0, 0, this.canvasRef.width, this.canvasRef.height).data.buffer
            );
            return !pixelBuffer.some(color => color !== 0);
        }
        return true;
    };

    openAttachement() {
        switch (this.type) {
            case EnumService.SignOffType.DOCUMENT_ACTIVITY:
                if (this.sharedDataService.activitySignOffDocumentDetail) {
                    const fileUri = this.sharedDataService.globalDirectories.documentDirectory + '' + this.sharedDataService.activitySignOffDocumentDetail.documentFileName;
                    this.filehandlerService.openFile(fileUri);
                }
                break;
            default:
        }
    }

    onClose() {
        this.navCtrl.back();
    }

    onContinue() {
        this.errorMessage = '';

        if (this.isConfirm) {
            let downlaodImg;
            if (this.showDigitalInk) {
                this.canvasRef.discardActiveObject();
                downlaodImg = this.canvasRef.toDataURL('jpeg');

                // convert base64 to File Object for send it to server
                fetch(downlaodImg)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], 'signature' + this.utilService.getCurrentTimeStamp() + '.jpeg', {type: 'image/jpeg'});
                        this.apiService.inductionSignatureUpload(file).subscribe((res: Response) => {
                            if (res.StatusCode === EnumService.ApiResponseCode.RequestSuccessful) {
                                this.nextStep(res.Result);
                            } else {
                                this.errorMessage = res.Message;
                            }
                            // {"Version":"1.0.0.0","StatusCode":200,"Message":"Request successful.","ResponseException":null,"Result":"signature.jpeg"}
                        }, (error) => {
                            this.errorMessage = error.message ? error.message : error;
                        });
                    });
            } else {
                this.nextStep();
            }
        }
    }

    nextStep(signatureFileName = '') {
        switch (this.type) {
            case EnumService.SignOffType.INDUCTION:
                if (this.showDigitalInk && signatureFileName) {
                    this.sharedDataService.checkInPostData.digitalInkSignature = signatureFileName;
                }

                if (this.sharedDataService.checkInDetail && this.sharedDataService.checkInDetail.checkInInduction.isPhotoSignOff) {
                    this.navCtrl.navigateForward(['/signoff-photo']);
                } else {
                    this.sharedDataService.submitInductionCheckInData(this.apiService);
                }
                break;

            case EnumService.SignOffType.DOCUMENT_ACTIVITY:
                if (this.showDigitalInk && signatureFileName) {
                    this.sharedDataService.signOffDetailsPostData.digitalInkSignature = signatureFileName;
                }

                if (this.sharedDataService.activitySignOffDocumentDetail && this.sharedDataService.activitySignOffDocumentDetail.isPhotoSignOff) {
                    this.navCtrl.navigateForward(['/signoff-photo']);
                } else {
                    this.sharedDataService.submitPersonalModeSignoffData(this.apiService);
                }
                break;

            case EnumService.SignOffType.HAV:
            case EnumService.SignOffType.ACCIDENT_REPORT:
            case EnumService.SignOffType.CUSTOM_FORM:
            case EnumService.SignOffType.RISK_ASSESSMENT:
            case EnumService.SignOffType.DOCUMENT_DM:
            case EnumService.SignOffType.FORMS_DM:
            case EnumService.SignOffType.WORK_PERMIT:
                this.navCtrl.navigateForward(['/signoff-photo'], {
                    queryParams: {
                        type: this.type,
                        data: JSON.stringify(this.data)
                    }
                });
                break;

            default:
                if (this.sharedDataService.dedicatedMode) {
                    if (UtilService.randomBoolean()) {
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
                    if (UtilService.randomBoolean()) {
                        this.navCtrl.navigateForward(['/checkin-success'], {
                            queryParams: {
                                message: 'You Signed-Off Successfully',
                                nextPage: '/tabs/dashboard'
                            }
                        });
                    } else {
                        this.navCtrl.navigateForward(['/checkin-fail'], {
                            queryParams: {
                                message: 'You Signed-Off Successfully',
                                nextPage: '/tabs/dashboard'
                            }
                        });
                    }
                }
        }
    }
}
