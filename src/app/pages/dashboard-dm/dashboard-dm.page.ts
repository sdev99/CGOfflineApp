import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { SharedDataService } from "../../services/shared-data.service";
import { ApiService } from "../../services/api.service";
import { AccountService } from "../../services/account.service";

import { DedicatedModeDeviceDetailData } from "../../_models/dedicatedModeDeviceDetailData";
import { UtilService } from "../../services/util.service";

import { FilehandlerService } from "src/app/services/filehandler.service";
import { StaticDataService } from "src/app/services/static-data.service";
import { EnumService } from "src/app/services/enum.service";
import { Response } from "src/app/_models";
import { ObservablesService } from "src/app/services/observables.service";

@Component({
    selector: "app-dashboard-dm",
    templateUrl: "./dashboard-dm.page.html",
    styleUrls: ["./dashboard-dm.page.scss"],
})
export class DashboardDmPage implements OnInit, OnDestroy {
    dedicatedModeDeviceDetailData: DedicatedModeDeviceDetailData;

    constructor(
        public navController: NavController,
        public sharedDataService: SharedDataService,
        private apiService: ApiService,
        private platform: Platform,
        private observablesService: ObservablesService,
        private filehandlerService: FilehandlerService,
        private accountService: AccountService
    ) {
        this.dedicatedModeDeviceDetailData =
            this.sharedDataService.dedicatedModeDeviceDetailData;
    }

    ngOnInit() {
        // Remove all form images directory
        try {
            this.filehandlerService
                .removeDirectory(
                    this.filehandlerService.offlineFilesDirectory(),
                    StaticDataService.formImagesFolderName
                )
                .then(() => {})
                .catch(() => {});
        } catch (error) {}

        this.accountService.activateDevice().subscribe(() => {});

        if (UtilService.isLocalHost()) {
            setTimeout(() => {
                const testFormType: any = "";

                switch (testFormType) {
                    case "hav":
                        this.sharedDataService.formBuilderDetails = JSON.parse(
                            '{"formId":541,"title":"Hav Form Test","description":null,"formVersionId":830,"formVersionNo":1,"isDraft":false,"formTypeID":4,"companyId":27,"defaultLanguageId":35,"isPreview":false,"sections":[{"sectionId":1811,"sectionIsHidden":false,"sectionDisplayOrder":1,"isRiskAssessmentSection":false,"isHAVSection":true,"isAccidentReportSection":false,"sectionTranslations":[{"sectionTranslationId":1953,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"HAVs Assessment"}],"questions":[{"questionId":5569,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":7,"questionDisplayOrder":1,"sectionID":1811,"questionTranslations":[{"questionTranslationId":5841,"questionTranslationLanguageId":35,"questionTranslationTitle":"Date of Usage","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":false,"allowQRCodeDocument":false,"allowQRCodeForm":false,"allowQRCodeUser":false,"matrixRows":[],"matrixColumns":[]},{"questionId":5570,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":11,"questionDisplayOrder":2,"sectionID":1811,"questionTranslations":[{"questionTranslationId":5842,"questionTranslationLanguageId":35,"questionTranslationTitle":"Manufacturer","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":false,"allowQRCodeDocument":false,"allowQRCodeForm":false,"allowQRCodeUser":false,"matrixRows":[],"matrixColumns":[]},{"questionId":5571,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":11,"questionDisplayOrder":3,"sectionID":1811,"questionTranslations":[{"questionTranslationId":5843,"questionTranslationLanguageId":35,"questionTranslationTitle":"Type","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":false,"allowQRCodeDocument":false,"allowQRCodeForm":false,"allowQRCodeUser":false,"matrixRows":[],"matrixColumns":[]},{"questionId":5572,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":11,"questionDisplayOrder":4,"sectionID":1811,"questionTranslations":[{"questionTranslationId":5844,"questionTranslationLanguageId":35,"questionTranslationTitle":"Model","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":false,"allowQRCodeDocument":false,"allowQRCodeForm":false,"allowQRCodeUser":false,"matrixRows":[],"matrixColumns":[]},{"questionId":5573,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":8,"questionDisplayOrder":5,"sectionID":1811,"questionTranslations":[{"questionTranslationId":5845,"questionTranslationLanguageId":35,"questionTranslationTitle":"Planned Time of Use (in minutes)","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":false,"allowQRCodeDocument":false,"allowQRCodeForm":false,"allowQRCodeUser":false,"matrixRows":[],"matrixColumns":[]}],"tasks":[]}],"selectedLanguage":null,"selectedLanguages":[{"languageId":35,"languageLabel":"English"}],"supportedLanguages":[],"answerTypes":[],"answerChoiceColors":null,"hourFormats":null,"questionActionOnList":null,"questionActionTypes":null,"questionChoiceSetTypes":null,"questionOperatorTypes":null,"questionActivityTypes":null,"userList":null,"groupList":null,"workPermitDetails":{"workPermitId":0,"totalScore":null,"hasExpirationDate":false,"hasExpiresOn":false,"expiresOnDate":null,"hasExpiresAfter":false,"durationValue":null,"hasPermitIssuedNotification":false,"hasPermitNotIssuedNotification":false,"operatorTypeID":null,"durationTypeID":null,"permitIssuedNotificationID":null,"permitNotIssuedNotificationID":null,"formVersionID":0,"whoDefinesDateType":null,"permitNotIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedAvailableUsers":[],"permitIssuedAvailableUserGroups":[],"permitNotIssuedAvailableUsers":[],"permitNotIssuedAvailableUserGroups":[]},"accidentReport":{"accidentReportId":0,"hasAccidentNotification":false,"notificationID":null,"formVersionID":0,"accidentNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"availableUsers":[],"availableUserGroups":[]},"riskAssessmentDetails":{"riskAssessmentId":0,"controlMeasureAddOptions":[],"allowEndUserToAddHazardsAndCM":true,"selectedControlMeasureAddOption":0,"formVersionID":830},"modifiedBy":"00000000-0000-0000-0000-000000000000","folderDocumentList":null,"folderDocumentTreeList":null,"signedUsers":[],"taskTemplates":[]}'
                        );
                        this.navController.navigateForward(["/form-hav"]);

                        break;
                    case "custom":
                        this.sharedDataService.formBuilderDetails = JSON.parse(
                            '{"formId":582,"title":"Custom Form  ScanQrCode Test","description":null,"formVersionId":929,"formVersionNo":6,"isDraft":false,"formTypeID":1,"companyId":27,"defaultLanguageId":35,"isPreview":false,"sections":[{"sectionId":1975,"sectionIsHidden":false,"sectionDisplayOrder":1,"isRiskAssessmentSection":false,"isHAVSection":false,"isAccidentReportSection":false,"sectionTranslations":[{"sectionTranslationId":2169,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Section one"}],"questions":[{"questionId":5984,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":true,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":16,"questionDisplayOrder":1,"sectionID":1975,"questionTranslations":[{"questionTranslationId":6381,"questionTranslationLanguageId":35,"questionTranslationTitle":"3D Matrix ","questionTranslationInstructionOrNote":"3D matrix note for table","questionTranslationTextLabel":""}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":false,"allowQRCodeDocument":false,"allowQRCodeForm":false,"allowQRCodeUser":false,"matrixRows":[{"matrixRowId":14,"matrixRowDisplayOrder":1,"matrixRowTranslations":[{"matrixRowTranslationId":14,"matrixRowTranslationLanguageId":35,"matrixRowTranslationName":"Row 1"}]},{"matrixRowId":15,"matrixRowDisplayOrder":2,"matrixRowTranslations":[{"matrixRowTranslationId":15,"matrixRowTranslationLanguageId":35,"matrixRowTranslationName":"EVENLY VERY LONG ROW NAME"}]},{"matrixRowId":16,"matrixRowDisplayOrder":3,"matrixRowTranslations":[{"matrixRowTranslationId":16,"matrixRowTranslationLanguageId":35,"matrixRowTranslationName":"Row3"}]},{"matrixRowId":17,"matrixRowDisplayOrder":4,"matrixRowTranslations":[{"matrixRowTranslationId":17,"matrixRowTranslationLanguageId":35,"matrixRowTranslationName":"EVENLY VERY LONG ROW NAME"}]}],"matrixColumns":[{"matrixColumnId":18,"matrixColumnDisplayOrder":1,"matrixColumnTranslations":[{"matrixColumnTranslationId":18,"matrixColumnTranslationLanguageId":35,"matrixColumnTranslationName":"EVENLY VERY LONG COLUMN NAME"}]},{"matrixColumnId":19,"matrixColumnDisplayOrder":2,"matrixColumnTranslations":[{"matrixColumnTranslationId":19,"matrixColumnTranslationLanguageId":35,"matrixColumnTranslationName":"COLUMN NAME"}]},{"matrixColumnId":20,"matrixColumnDisplayOrder":3,"matrixColumnTranslations":[{"matrixColumnTranslationId":20,"matrixColumnTranslationLanguageId":35,"matrixColumnTranslationName":"COLUMN NAME"}]},{"matrixColumnId":21,"matrixColumnDisplayOrder":4,"matrixColumnTranslations":[{"matrixColumnTranslationId":21,"matrixColumnTranslationLanguageId":35,"matrixColumnTranslationName":"COLUMN NAME"}]},{"matrixColumnId":22,"matrixColumnDisplayOrder":5,"matrixColumnTranslations":[{"matrixColumnTranslationId":22,"matrixColumnTranslationLanguageId":35,"matrixColumnTranslationName":"EVENLY VERY LONG COLUMN NAME"}]}]},{"questionId":5985,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":15,"questionDisplayOrder":2,"sectionID":1975,"questionTranslations":[{"questionTranslationId":6382,"questionTranslationLanguageId":35,"questionTranslationTitle":"Can you scan in your forms?","questionTranslationInstructionOrNote":"","questionTranslationTextLabel":""}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":true,"allowQRCodeDocument":false,"allowQRCodeForm":true,"allowQRCodeUser":false,"matrixRows":[],"matrixColumns":[]},{"questionId":5986,"questionIsHidden":false,"questionIsRequired":false,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":15,"questionDisplayOrder":3,"sectionID":1975,"questionTranslations":[{"questionTranslationId":6383,"questionTranslationLanguageId":35,"questionTranslationTitle":"Can you scan in your Users?","questionTranslationInstructionOrNote":"","questionTranslationTextLabel":""}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[],"questionAttachmentIconPath":null,"allowQRCodeLocation":false,"allowQRCodeProject":false,"allowQRCodeInventoryItem":false,"allowQRCodeDocument":false,"allowQRCodeForm":false,"allowQRCodeUser":true,"matrixRows":[],"matrixColumns":[]}],"tasks":[]}],"selectedLanguage":null,"selectedLanguages":[{"languageId":35,"languageLabel":"English"}],"supportedLanguages":[],"answerTypes":[],"answerChoiceColors":null,"hourFormats":null,"questionActionOnList":null,"questionActionTypes":null,"questionChoiceSetTypes":null,"questionOperatorTypes":null,"questionActivityTypes":null,"userList":null,"groupList":null,"workPermitDetails":{"workPermitId":0,"totalScore":null,"hasExpirationDate":false,"hasExpiresOn":false,"expiresOnDate":null,"hasExpiresAfter":false,"durationValue":null,"hasPermitIssuedNotification":false,"hasPermitNotIssuedNotification":false,"operatorTypeID":null,"durationTypeID":null,"permitIssuedNotificationID":null,"permitNotIssuedNotificationID":null,"formVersionID":0,"whoDefinesDateType":null,"permitNotIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedAvailableUsers":[],"permitIssuedAvailableUserGroups":[],"permitNotIssuedAvailableUsers":[],"permitNotIssuedAvailableUserGroups":[]},"accidentReport":{"accidentReportId":0,"hasAccidentNotification":false,"notificationID":null,"formVersionID":0,"accidentNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"availableUsers":[],"availableUserGroups":[]},"riskAssessmentDetails":{"riskAssessmentId":0,"controlMeasureAddOptions":[],"allowEndUserToAddHazardsAndCM":true,"selectedControlMeasureAddOption":0,"formVersionID":929},"modifiedBy":"00000000-0000-0000-0000-000000000000","folderDocumentList":null,"folderDocumentTreeList":null,"signedUsers":[{"userId":"e243237f-3147-4810-9dbd-6f5ea7bffb30","userName":"Demo Two App"}],"taskTemplates":[]}'
                        );
                        this.navController.navigateForward(["/form-custom"]);
                        break;
                    case "riskassessment":
                        this.sharedDataService.formBuilderDetails = JSON.parse(
                            '{"formId":589,"title":"Risk Assessment QR Scan Test Form","description":null,"formVersionId":922,"formVersionNo":1,"isDraft":false,"formTypeID":2,"companyId":27,"defaultLanguageId":35,"isPreview":false,"sections":[{"sectionId":1969,"sectionIsHidden":false,"sectionDisplayOrder":1,"isRiskAssessmentSection":true,"isHAVSection":false,"isAccidentReportSection":false,"sectionTranslations":[{"sectionTranslationId":2163,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Risk Assessment"}],"questions":[],"tasks":[]}],"selectedLanguage":null,"selectedLanguages":[{"languageId":35,"languageLabel":"English"}],"supportedLanguages":[],"answerTypes":[],"answerChoiceColors":null,"hourFormats":null,"questionActionOnList":null,"questionActionTypes":null,"questionChoiceSetTypes":null,"questionOperatorTypes":null,"questionActivityTypes":null,"userList":null,"groupList":null,"workPermitDetails":{"workPermitId":0,"totalScore":null,"hasExpirationDate":false,"hasExpiresOn":false,"expiresOnDate":null,"hasExpiresAfter":false,"durationValue":null,"hasPermitIssuedNotification":false,"hasPermitNotIssuedNotification":false,"operatorTypeID":null,"durationTypeID":null,"permitIssuedNotificationID":null,"permitNotIssuedNotificationID":null,"formVersionID":0,"whoDefinesDateType":null,"permitNotIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedAvailableUsers":[],"permitIssuedAvailableUserGroups":[],"permitNotIssuedAvailableUsers":[],"permitNotIssuedAvailableUserGroups":[]},"accidentReport":{"accidentReportId":0,"hasAccidentNotification":false,"notificationID":null,"formVersionID":0,"accidentNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"availableUsers":[],"availableUserGroups":[]},"riskAssessmentDetails":{"riskAssessmentId":40,"controlMeasureAddOptions":[],"allowEndUserToAddHazardsAndCM":true,"selectedControlMeasureAddOption":3,"formVersionID":922},"modifiedBy":"00000000-0000-0000-0000-000000000000","folderDocumentList":null,"folderDocumentTreeList":null,"signedUsers":[],"taskTemplates":[]}'
                        );
                        this.navController.navigateForward([
                            "/form-riskassessment",
                        ]);
                        break;
                    default:
                        break;
                }
            }, 2000);
        }

        this.platform.resume.subscribe(() => {
            this.checkLocationArchive();
        });

        this.observablesService
            .getObservable(EnumService.ObserverKeys.CHECK_FOR_LOCATION_ARCHIVE)
            .subscribe(() => {
                this.checkLocationArchive();
            });
    }

    ngOnDestroy(): void {}

    ionViewWillEnter() {
        this.checkLocationArchive();
        this.accountService.checkForMobileLanguageId();
    }

    checkLocationArchive = () => {
        if (!this.sharedDataService.offlineMode) {
            const locationParam = {};
            if (this.sharedDataService.dedicatedModeLocationUse?.locationID) {
                locationParam["locationID"] =
                    this.sharedDataService.dedicatedModeLocationUse.locationID;
            } else if (
                this.sharedDataService.dedicatedModeLocationUse?.inventoryItemID
            ) {
                locationParam["inventoryItemID"] =
                    this.sharedDataService.dedicatedModeLocationUse.inventoryItemID;
            } else if (
                this.sharedDataService.dedicatedModeLocationUse?.projectID
            ) {
                locationParam["projectID"] =
                    this.sharedDataService.dedicatedModeLocationUse.projectID;
            }

            this.apiService.checkLocationArchive(locationParam).subscribe(
                (res: Response) => {
                    if (
                        res &&
                        res.StatusCode ===
                            EnumService.ApiResponseCode.RequestSuccessful &&
                        res.Result
                    ) {
                        this.sharedDataService.resetAllSharedVariable();
                        localStorage.removeItem(
                            EnumService.LocalStorageKeys
                                .DEDICATED_MODE_LOCATION_USE
                        );
                        this.navController.navigateRoot("choose-location");
                    }
                },
                (error) => {}
            );
        }
    };

    checkInOutClick() {
        this.navController.navigateForward("checkinout-option-dm");
    }

    documentsClick() {
        this.navController.navigateForward("documents-dm");
    }

    formsClick() {
        this.navController.navigateForward("forms-dm");
    }

    permitsClick() {
        this.navController.navigateForward("permits-dm");
    }

    evacuationClick() {
        this.navController.navigateForward("evacuation-dm");
    }
}
