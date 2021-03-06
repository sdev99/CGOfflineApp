import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { PhotoService } from "../../services/photo.service";
import { ObservablesService } from "../../services/observables.service";
import { ActivatedRoute } from "@angular/router";
import { EnumService } from "../../services/enum.service";
import { SharedDataService } from "../../services/shared-data.service";
import { UtilService } from "../../services/util.service";
import { Response } from "../../_models";
import { ApiService } from "../../services/api.service";

@Component({
    selector: "app-signoff-photo",
    templateUrl: "./signoff-photo.page.html",
    styleUrls: ["./signoff-photo.page.scss"],
})
export class SignoffPhotoPage implements OnInit {
    errorMessage;
    capturedPhoto;
    type;
    showGenerateJsonFileButton: boolean = false;

    constructor(
        public navCtrl: NavController,
        public photoService: PhotoService,
        public apiService: ApiService,
        public utilService: UtilService,
        public route: ActivatedRoute,
        public observablesService: ObservablesService,
        public sharedDataService: SharedDataService
    ) {
        if (sharedDataService.signOffFor) {
            this.type = sharedDataService.signOffFor;
        }
        this.checkForShowGenerateJsonButton();
    }

    ngOnInit() {}

    checkForShowGenerateJsonButton = () => {
        if (this.sharedDataService.isDevelopmentMode) {
            switch (this.type) {
                case EnumService.SignOffType.DOCUMENT_ACTIVITY:
                case EnumService.SignOffType.FORM_ACTIVITY:
                case EnumService.SignOffType.FORM_CURRENT_CHECKIN:
                case EnumService.SignOffType.DOCUMENT_CURRENT_CHECKIN:
                case EnumService.SignOffType.WORKPERMIT_FORM_CURRENT_CHECKIN:
                    this.showGenerateJsonFileButton = true;
                    break;

                default:
            }
        }
    };

    takePhoto() {
        this.photoService.takePhotoFromCamera(
            (photo) => {
                this.capturedPhoto = photo;
            },
            true,
            true
        );
    }

    onClose() {
        if (
            this.sharedDataService.signOffFor ===
            EnumService.SignOffType.INDUCTION
        ) {
            if (this.sharedDataService.dedicatedMode) {
                this.navCtrl.navigateBack("/dashboard-dm");
            } else {
                this.navCtrl.navigateBack("/checkinout-confirm");
            }
        } else {
            this.navCtrl.back();
        }
    }

    continue(isGenerateTestJsonFile = false) {
        const fileName =
            "photo" + this.utilService.getCurrentTimeStamp() + ".jpeg";
        const mimeType = "image/jpeg";
        this.utilService
            .dataUriToFile(this.capturedPhoto.dataUrl, fileName, mimeType)
            .then((file) => {
                this.uploadInductionPhoto(file, fileName, (photoName) => {
                    this.processToNextScreen(photoName, isGenerateTestJsonFile);
                });
            });
    }

    /**
     * Upload photo for  signoff
     */
    uploadInductionPhoto = async (file, fileName = "", callBack = null) => {
        this.utilService.presentLoadingWithOptions();

        this.apiService.inductionPhotoUpload(file, fileName).subscribe(
            (res: Response) => {
                this.utilService.hideLoading();
                if (
                    res.StatusCode ===
                    EnumService.ApiResponseCode.RequestSuccessful
                ) {
                    UtilService.fireCallBack(callBack, res.Result);
                } else {
                    this.errorMessage = res.Message;
                }
            },
            (error) => {
                this.utilService.hideLoading();
                this.errorMessage = error.message ? error.message : error;
            }
        );
    };

    processToNextScreen = (photoName, isGenerateTestJsonFile = false) => {
        switch (this.type) {
            case EnumService.SignOffType.INDUCTION:
                this.sharedDataService.checkInPostData.userSignaturePhoto =
                    photoName;
                this.sharedDataService.submitInductionCheckInData(
                    this.apiService
                );
                break;

            case EnumService.SignOffType.DOCUMENT_ACTIVITY:
            case EnumService.SignOffType.FORM_ACTIVITY:
            case EnumService.SignOffType.FORM_CURRENT_CHECKIN:
            case EnumService.SignOffType.DOCUMENT_CURRENT_CHECKIN:
            case EnumService.SignOffType.WORKPERMIT_FORM_CURRENT_CHECKIN:
                this.sharedDataService.signOffDetailsPostData.userSignaturePhoto =
                    photoName;
                if (isGenerateTestJsonFile) {
                    this.sharedDataService.generatePersonalModeSignoffHtmlFileForTest(
                        this.apiService
                    );
                } else {
                    this.sharedDataService.submitPersonalModeSignoffData(
                        this.apiService
                    );
                }

                break;

            default:
        }
    };
}
