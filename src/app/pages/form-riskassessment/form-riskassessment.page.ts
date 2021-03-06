import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import {
    IonContent,
    ModalController,
    NavController,
    PopoverController,
} from "@ionic/angular";
import { DemoDataService } from "../../services/demo-data.service";
import { ExitConfirmationPage } from "../../modals/exit-confirmation/exit-confirmation.page";
import { FormGroup } from "@angular/forms";
import { EnumService } from "../../services/enum.service";
import { ActivatedRoute } from "@angular/router";
import { FilehandlerService } from "../../services/filehandler.service";
import { ObservablesService } from "../../services/observables.service";
import { SharedDataService } from "../../services/shared-data.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { UtilService } from "../../services/util.service";
import { ApiService } from "../../services/api.service";
import { Response, User } from "../../_models";
import { AccountService } from "../../services/account.service";
import { PhotoService } from "../../services/photo.service";
import { RiskRatingItem } from "../../_models/riskRatingItem";
import { RAtaskAswerObject } from "src/app/_models/RAtaskAswerObject";
import { RAhazardAswerObject } from "src/app/_models/RAhazardAswerObject";
import { RAcontrolMeasureAnswerObject } from "src/app/_models/RAcontrolMeasureAnswerObject";
import { RiskRatingSeverityOption } from "src/app/_models/riskRatingSeverityOption";
import { RiskRatingProbabilityOption } from "src/app/_models/riskRatingProbabilityOption";
import { RAcontrolMeasureTemplateItem } from "src/app/_models/RAcontrolMeasureTemplateItem";
import { RAtaskTemplateItem } from "src/app/_models/RAtaskTemplateItem";
import { TemplateDropdownComponent } from "src/app/components/template-dropdown/template-dropdown.component";
import { TranslateService } from "@ngx-translate/core";
import { EntityItem } from "src/app/_models/entityItem";
import { OfflineManagerService } from "src/app/services/offline-manager.service";
import { FormStateSaveExitPage } from "src/app/modals/form-state-save-exit/form-state-save-exit.page";

@Component({
    selector: "app-form-riskassessment",
    templateUrl: "./form-riskassessment.page.html",
    styleUrls: ["./form-riskassessment.page.scss"],
})
export class FormRiskassessmentPage implements OnInit {
    @ViewChild(IonContent) content: IonContent;

    EnumService = EnumService;
    UtilService = UtilService;
    user: User;

    errorMessage = "";

    isSubmitted = false;
    formGroup: FormGroup;
    isFormSubmitting = false;

    list = DemoDataService.riskAssesmentQuestions.clone();
    riskRatings: [RiskRatingItem];
    residualRiskRatings: [RiskRatingItem];

    severityRatings: Array<RiskRatingSeverityOption>;
    probabilityRatings: Array<RiskRatingProbabilityOption>;

    users = [];
    groups = [];

    ionSelectInterface = "popover";

    userGroupTypes = [
        { name: "Users", id: "users" },
        { name: "Groups", id: "groups" },
    ];

    screenOrientationSubscribe;
    isShowOritationPortrait = false;

    // formBuilderDetail = JSON.parse('{"formId":131,"title":"Risk Assessment Form","description":null,"formVersionId":197,"formVersionNo":3,"isDraft":false,"formTypeID":2,"companyId":27,"defaultLanguageId":35,"sections":[{"sectionId":208,"sectionIsHidden":false,"sectionDisplayOrder":1,"isRiskAssessmentSection":true,"isHAVSection":false,"isAccidentReportSection":false,"sectionTranslations":[{"sectionTranslationId":311,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Risk Assessmentssss"}],"questions":[],"tasks":[{"taskId":29,"isRequired":true,"shouldShowTaskTemplate":false,"allowInstructionOrNote":true,"shouldShowOptionalComment":false,"allowAttachment":true,"displayOrder":1,"sectionID":208,"selectedTaskTemplateID":null,"taskTranslations":[{"taskTranslationId":32,"taskTranslationLanguageId":35,"taskTranslationTitle":"Task One","taskTranslationInstructionOrNote":"Test Note for task one"}],"taskAttachments":[{"questionAttachmentId":0,"isExistingFile":false,"shouldSaveFileToPlatform":false,"fileName":"demo51.png","fileType":null,"fileExtension":"png","folderName":"Choose","questionID":29,"documentID":125,"folderID":null}],"hazards":[{"hazardId":34,"riskRating":null,"residualRiskRating":null,"hasPersonnelExposedNotification":false,"displayOrder":1,"taskID":29,"personnelExposedNotificationID":null,"personnelExposedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"hazardTranslations":[{"hazardTranslationId":38,"hazardTranslationLanguageId":35,"hazardTranslationTitle":"Hazard One Test"}],"controlMeasures":[{"controlMeasureId":38,"shouldShowControlMeasureTemplate":false,"displayOrder":1,"controlMeasureTranslations":[{"controlMeasureTranslationId":44,"controlMeasureTranslationLanguageId":35,"controlMeasureTranslationTitle":"Wight measure"}]},{"controlMeasureId":39,"shouldShowControlMeasureTemplate":false,"displayOrder":2,"controlMeasureTranslations":[{"controlMeasureTranslationId":45,"controlMeasureTranslationLanguageId":35,"controlMeasureTranslationTitle":"Height measure"}]},{"controlMeasureId":40,"shouldShowControlMeasureTemplate":false,"displayOrder":3,"controlMeasureTranslations":[{"controlMeasureTranslationId":46,"controlMeasureTranslationLanguageId":35,"controlMeasureTranslationTitle":"Width measure"}]}]},{"hazardId":35,"riskRating":null,"residualRiskRating":null,"hasPersonnelExposedNotification":false,"displayOrder":2,"taskID":29,"personnelExposedNotificationID":null,"personnelExposedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"hazardTranslations":[{"hazardTranslationId":39,"hazardTranslationLanguageId":35,"hazardTranslationTitle":"Hazard Two Test"}],"controlMeasures":[]}]},{"taskId":30,"isRequired":false,"shouldShowTaskTemplate":false,"allowInstructionOrNote":false,"shouldShowOptionalComment":false,"allowAttachment":false,"displayOrder":2,"sectionID":208,"selectedTaskTemplateID":null,"taskTranslations":[{"taskTranslationId":33,"taskTranslationLanguageId":35,"taskTranslationTitle":"Task Two","taskTranslationInstructionOrNote":""}],"taskAttachments":[],"hazards":[{"hazardId":36,"riskRating":null,"residualRiskRating":null,"hasPersonnelExposedNotification":false,"displayOrder":1,"taskID":30,"personnelExposedNotificationID":null,"personnelExposedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"hazardTranslations":[{"hazardTranslationId":40,"hazardTranslationLanguageId":35,"hazardTranslationTitle":"Task two hazard one"}],"controlMeasures":[{"controlMeasureId":41,"shouldShowControlMeasureTemplate":false,"displayOrder":1,"controlMeasureTranslations":[{"controlMeasureTranslationId":47,"controlMeasureTranslationLanguageId":35,"controlMeasureTranslationTitle":"Level measure"}]},{"controlMeasureId":42,"shouldShowControlMeasureTemplate":false,"displayOrder":2,"controlMeasureTranslations":[{"controlMeasureTranslationId":48,"controlMeasureTranslationLanguageId":35,"controlMeasureTranslationTitle":"Pressure measure"}]}]}]}]},{"sectionId":209,"sectionIsHidden":false,"sectionDisplayOrder":2,"isRiskAssessmentSection":false,"isHAVSection":false,"isAccidentReportSection":false,"sectionTranslations":[{"sectionTranslationId":312,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Section Two Custom Questions"}],"questions":[{"questionId":475,"questionIsHidden":false,"questionIsRequired":false,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":3,"questionDisplayOrder":1,"sectionID":209,"questionTranslations":[{"questionTranslationId":553,"questionTranslationLanguageId":35,"questionTranslationTitle":"Single Line Text","questionTranslationInstructionOrNote":"","questionTranslationTextLabel":""}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":476,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":true,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":true,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":2,"questionDisplayOrder":2,"sectionID":209,"questionTranslations":[{"questionTranslationId":554,"questionTranslationLanguageId":35,"questionTranslationTitle":"Multiple Choice Question","questionTranslationInstructionOrNote":"Choose multiple answers","questionTranslationTextLabel":""}],"answerChoiceAttributes":[{"answerChoiceAttributeId":527,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"turquoise","answerChoiceAttributeScoreOrWeight":3,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":646,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Correct"}]},{"answerChoiceAttributeId":528,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"red","answerChoiceAttributeScoreOrWeight":2,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":647,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Wrong"}]},{"answerChoiceAttributeId":529,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"blue","answerChoiceAttributeScoreOrWeight":3,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":648,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Wrong"}]},{"answerChoiceAttributeId":530,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"blue","answerChoiceAttributeScoreOrWeight":2,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":649,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Correct"}]}],"questionLogics":[],"questionAttachments":[{"questionAttachmentId":36,"isExistingFile":false,"shouldSaveFileToPlatform":false,"fileName":"videoplayback.mp4","fileType":null,"fileExtension":"mp4","folderName":"Choose","questionID":476,"documentID":228,"folderID":null}]},{"questionId":477,"questionIsHidden":false,"questionIsRequired":false,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":5,"questionDisplayOrder":3,"sectionID":209,"questionTranslations":[{"questionTranslationId":555,"questionTranslationLanguageId":35,"questionTranslationTitle":"Number Field Integer","questionTranslationInstructionOrNote":"","questionTranslationTextLabel":""}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":478,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":6,"questionDisplayOrder":4,"sectionID":209,"questionTranslations":[{"questionTranslationId":556,"questionTranslationLanguageId":35,"questionTranslationTitle":"Number Field Decimal","questionTranslationInstructionOrNote":"","questionTranslationTextLabel":""}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]}],"tasks":[]}],"selectedLanguage":null,"selectedLanguages":[{"languageId":35,"languageLabel":"English"}],"supportedLanguages":[],"answerTypes":[],"answerChoiceColors":null,"hourFormats":null,"questionActionOnList":null,"questionActionTypes":null,"questionChoiceSetTypes":null,"questionOperatorTypes":null,"userList":null,"groupList":null,"workPermitDetails":{"workPermitId":0,"totalScore":null,"hasExpirationDate":false,"hasExpiresOn":false,"expiresOnDate":null,"hasExpiresAfter":false,"durationValue":null,"hasPermitIssuedNotification":false,"hasPermitNotIssuedNotification":false,"operatorTypeID":null,"durationTypeID":null,"permitIssuedNotificationID":null,"permitNotIssuedNotificationID":null,"formVersionID":0,"permitNotIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]}},"accidentReport":{"accidentReportId":0,"hasAccidentNotification":false,"notificationID":null,"formVersionID":0,"accidentNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]}},"modifiedBy":"00000000-0000-0000-0000-000000000000","folderDocumentList":null,"folderDocumentTreeList":null,"signedUsers":[],"taskTemplates":[]}');
    formBuilderDetail = JSON.parse(
        '{"formId":505,"title":"CLN-31 Test","description":null,"formVersionId":776,"formVersionNo":1,"isDraft":false,"formTypeID":2,"companyId":27,"defaultLanguageId":35,"isPreview":false,"sections":[{"sectionId":1699,"sectionIsHidden":false,"sectionDisplayOrder":1,"isRiskAssessmentSection":true,"isHAVSection":false,"isAccidentReportSection":false,"sectionTranslations":[{"sectionTranslationId":1841,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Risk Assessment"}],"questions":[],"tasks":[]}],"selectedLanguage":null,"selectedLanguages":[{"languageId":35,"languageLabel":"English"}],"supportedLanguages":[],"answerTypes":[],"answerChoiceColors":null,"hourFormats":null,"questionActionOnList":null,"questionActionTypes":null,"questionChoiceSetTypes":null,"questionOperatorTypes":null,"userList":null,"groupList":null,"workPermitDetails":{"workPermitId":0,"totalScore":null,"hasExpirationDate":false,"hasExpiresOn":false,"expiresOnDate":null,"hasExpiresAfter":false,"durationValue":null,"hasPermitIssuedNotification":false,"hasPermitNotIssuedNotification":false,"operatorTypeID":null,"durationTypeID":null,"permitIssuedNotificationID":null,"permitNotIssuedNotificationID":null,"formVersionID":0,"permitNotIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedAvailableUsers":[],"permitIssuedAvailableUserGroups":[],"permitNotIssuedAvailableUsers":[],"permitNotIssuedAvailableUserGroups":[]},"accidentReport":{"accidentReportId":0,"hasAccidentNotification":false,"notificationID":null,"formVersionID":0,"accidentNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"availableUsers":[],"availableUserGroups":[]},"riskAssessmentDetails":{"riskAssessmentId":9,"controlMeasureAddOptions":[],"allowEndUserToAddHazardsAndCM":true,"selectedControlMeasureAddOption":3,"formVersionID":776},"modifiedBy":"00000000-0000-0000-0000-000000000000","folderDocumentList":null,"folderDocumentTreeList":null,"signedUsers":[],"taskTemplates":[]}'
    );

    exposedNotificationType = [
        {
            title: "system",
            apiKey: "isPersonnelExposedSystemNotification",
            disabled: true,
        },
        { title: "email", apiKey: "isPersonnelExposedEmailNotification" },
        { title: "sms", apiKey: "isPersonnelExposedSMSNotification" },
    ];

    questionElementIds = [];
    currentQuestionIndex = 0;
    scrollingDetail: any;

    companyId;

    riskAssessmentInputEditType =
        EnumService.RiskAssessmentAnswerEditOptionsType.Choose;
    canTemplateEnable = false;
    canInputEnable = false;
    allowEndUserToAddHazardsAndCM = false;

    taskTemplateList: Array<RAtaskTemplateItem> = [];
    controlMeasureTemplateList: Array<RAcontrolMeasureTemplateItem> = [];

    isFirstTime = true;

    constructor(
        public navCtrl: NavController,
        public modalController: ModalController,
        public route: ActivatedRoute,
        private filehandlerService: FilehandlerService,
        public observablesService: ObservablesService,
        public sharedDataService: SharedDataService,
        private screenOrientation: ScreenOrientation,
        private apiService: ApiService,
        public utilService: UtilService,
        private ngZone: NgZone,
        public accountService: AccountService,
        public photoService: PhotoService,
        public popoverController: PopoverController,
        public translateService: TranslateService,
        public offlineManagerService: OfflineManagerService
    ) {
        this.user = accountService.userValue;

        if (sharedDataService.formBuilderDetails) {
            this.formBuilderDetail = sharedDataService.formBuilderDetails;
        }

        if (sharedDataService.raTaskTemplateList) {
            this.taskTemplateList = sharedDataService.raTaskTemplateList;
        }

        if (this.sharedDataService.dedicatedMode) {
            this.companyId =
                this.sharedDataService.dedicatedModeDeviceDetailData?.companyID;
        } else {
            this.companyId = this.user?.companyID;
        }

        if (!this.companyId) {
            this.companyId = this.formBuilderDetail.companyId;
        }

        if (
            sharedDataService.severityRatings &&
            sharedDataService.severityRatings.length > 0 &&
            sharedDataService.probabilityRatings &&
            sharedDataService.probabilityRatings.length > 0
        ) {
            this.putRiskRatingInVariable();
        }

        const riskAssessmentDetails =
            this.formBuilderDetail.riskAssessmentDetails;
        this.riskAssessmentInputEditType =
            riskAssessmentDetails?.selectedControlMeasureAddOption;
        this.allowEndUserToAddHazardsAndCM =
            riskAssessmentDetails?.allowEndUserToAddHazardsAndCM;

        if (
            this.riskAssessmentInputEditType ===
            EnumService.RiskAssessmentAnswerEditOptionsType.Both
        ) {
            this.canTemplateEnable = true;
            this.canInputEnable = true;
        } else if (
            this.riskAssessmentInputEditType ===
            EnumService.RiskAssessmentAnswerEditOptionsType.Template
        ) {
            this.canTemplateEnable = true;
        } else if (
            this.riskAssessmentInputEditType ===
            EnumService.RiskAssessmentAnswerEditOptionsType.Manually
        ) {
            this.canInputEnable = true;
        }

        if (this.canTemplateEnable) {
            this.getRiskItemList();
        }

        const sections = this.formBuilderDetail.sections;
        if (sections) {
            sections.map((section) => {
                if (section.isRiskAssessmentSection) {
                    section.riskAssessmentAnswerDetails = {
                        taskAnswers:
                            section.riskAssessmentAnswerDetails &&
                            section.riskAssessmentAnswerDetails.taskAnswers
                                ? section.riskAssessmentAnswerDetails
                                      .taskAnswers
                                : [],
                    };
                }
            });
        }

        // Add form controls for each type of fields
        this.formGroup = new FormGroup({});
        this.utilService.questionElementIdsUpdate = (questionElementIds) => {
            this.questionElementIds = questionElementIds || [];
        };
        this.utilService.addFormControlsForVisibleFields(
            sections,
            this.formGroup,
            this.sharedDataService.savedFormStateData,
            (elementId) => {
                setTimeout(() => {
                    const y = document.getElementById(elementId)?.offsetTop;
                    this.content.scrollToPoint(0, y, 500);
                }, 1000);
            }
        );
        // -- End -- Add form controls for each type of fields
    }

    ngOnInit() {
        this.getCompanyUserList();
        this.getRiskAssessmentProbabilityOptions();
        this.getRiskAssessmentSeverityOptions();
    }

    ionViewDidEnter() {
        this.sharedDataService.isOpenSubScreen = false;
    }

    ionViewWillEnter() {
        if (!UtilService.isWebApp()) {
            this.handleOrientation();
        }
    }

    ionViewDidLeave(): void {
        if (!UtilService.isWebApp()) {
            if (this.sharedDataService.dedicatedMode) {
                if (!this.sharedDataService.isOpenSubScreen) {
                    if (!UtilService.isLocalHost()) {
                        this.screenOrientationSubscribe.unsubscribe();
                        this.screenOrientation.lock(
                            this.screenOrientation.ORIENTATIONS.LANDSCAPE
                        );
                    }
                }
            }
        }
    }

    async openTaskTemplateForTask(event, task) {
        this.translateService
            .get(
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.NO_TEMPLATES_AVAILABLE"
            )
            .subscribe(async (res) => {
                const popover = await this.popoverController.create({
                    component: TemplateDropdownComponent,
                    cssClass: "template-dropdown-popover",
                    event: event,
                    translucent: true,
                    mode: "md",
                    componentProps: {
                        emptyListText: res,
                        showEmptyListIcon: true,
                        titleKey: "riskItemName",
                        list: this.taskTemplateList,
                    },
                });
                popover.onWillDismiss().then(({ data }) => {
                    if (data) {
                        task.taskAnswerTitle = data.riskItemName;
                        this.getHazardItemList(data.companyRiskItemID);
                    }
                });
                return await popover.present();
            });
    }

    async openTaskTemplateForControlMeasure(event, controlMeasure) {
        this.translateService
            .get(
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.NO_TEMPLATES_AVAILABLE"
            )
            .subscribe(async (res) => {
                const popover = await this.popoverController.create({
                    component: TemplateDropdownComponent,
                    cssClass: "template-dropdown-popover",
                    event: event,
                    translucent: true,
                    mode: "md",
                    componentProps: {
                        emptyListText: res,
                        showEmptyListIcon: true,
                        titleKey: "hazardItemName",
                        list: this.controlMeasureTemplateList,
                    },
                });
                popover.onWillDismiss().then(({ data }) => {
                    if (data) {
                        controlMeasure.controlMeasureAnswerTitle =
                            data.hazardItemName;
                    }
                });
                return await popover.present();
            });
    }

    /**
     *
     * @param event
     * @param hazard
     * @param selectionHoldKey
     * @param valuesHoldKey  comma separated string
     * @param list
     * @param titleKey
     * @param valueKey
     * @returns
     */
    async openDrodownForAddUserGroup(
        event,
        hazard,
        selectionHoldKey,
        valuesHoldKey,
        list,
        titleKey,
        valueKey,
        isValueTypeNumber = false
    ) {
        const valuesList = hazard[valuesHoldKey]
            ? this.convertStringToArray(
                  hazard[valuesHoldKey],
                  isValueTypeNumber
              )
            : [];
        let filteredList = list.filter((value) => {
            return valuesList.indexOf(value[valueKey]) === -1;
        });
        const popover = await this.popoverController.create({
            component: TemplateDropdownComponent,
            cssClass: "template-dropdown-popover",
            event: event,
            translucent: true,
            mode: "md",
            componentProps: {
                showEmptyListIcon: false,
                titleKey: titleKey,
                list: filteredList,
            },
        });
        popover.onWillDismiss().then(({ data }) => {
            if (data) {
                hazard[selectionHoldKey] = data[valueKey];
            }
        });
        return await popover.present();
    }

    addTask(section) {
        const newTask = new RAtaskAswerObject();
        newTask.taskAnswerDisplayOrder =
            (section.riskAssessmentAnswerDetails?.taskAnswers?.length || 0) + 1;
        section.riskAssessmentAnswerDetails?.taskAnswers.push(newTask);
        this.utilService.addFormControlsForVisibleFields(
            this.formBuilderDetail.sections,
            this.formGroup
        );
    }

    addTaskHazard(task: RAtaskAswerObject) {
        const newHazard = new RAhazardAswerObject();
        newHazard.hazardAnswerDisplayOrder =
            (task.hazardAnswers?.length || 0) + 1;
        task.hazardAnswers.push(newHazard);
    }

    addControlMeasure(hazard: RAhazardAswerObject) {
        const newControlMeasure = new RAcontrolMeasureAnswerObject();
        newControlMeasure.controlMeasureAnswerDisplayOrder =
            (hazard.controlMeasureAnswers?.length || 0) + 1;
        hazard.controlMeasureAnswers.push(newControlMeasure);
    }

    removeTask(section, taskIndex) {
        this.translateService
            .get([
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DO_YOU_WANT_TO_REMOVE_THIS_ITEM",
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DELETE_CONFIRMATION",
            ])
            .subscribe((res) => {
                this.utilService.showConfirmAlert(
                    res[
                        "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DO_YOU_WANT_TO_REMOVE_THIS_ITEM"
                    ],
                    res[
                        "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DELETE_CONFIRMATION"
                    ],
                    (status) => {
                        if (status) {
                            try {
                                section.riskAssessmentAnswerDetails?.taskAnswers.splice(
                                    taskIndex,
                                    1
                                );
                                section.riskAssessmentAnswerDetails?.taskAnswers.map(
                                    (taskAnswer: RAtaskAswerObject, key) => {
                                        taskAnswer.taskAnswerDisplayOrder =
                                            key + 1;
                                    }
                                );
                                this.utilService.addFormControlsForVisibleFields(
                                    this.formBuilderDetail.sections,
                                    this.formGroup
                                );
                            } catch (error) {}
                        }
                    }
                );
            });
    }

    removeHazard(task, hazardIndex) {
        this.translateService
            .get([
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DO_YOU_WANT_TO_REMOVE_THIS_ITEM",
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DELETE_CONFIRMATION",
            ])
            .subscribe((res) => {
                this.utilService.showConfirmAlert(
                    res[
                        "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DO_YOU_WANT_TO_REMOVE_THIS_ITEM"
                    ],
                    res[
                        "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DELETE_CONFIRMATION"
                    ],
                    (status) => {
                        if (status) {
                            try {
                                task.hazardAnswers.splice(hazardIndex, 1);
                                task.hazardAnswers.map(
                                    (
                                        hazardAnswer: RAhazardAswerObject,
                                        key
                                    ) => {
                                        hazardAnswer.hazardAnswerDisplayOrder =
                                            key + 1;
                                    }
                                );
                            } catch (error) {}
                        }
                    }
                );
            });
    }

    removeControlMeasure(hazard, controlMeasureIndex) {
        this.translateService
            .get([
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DO_YOU_WANT_TO_REMOVE_THIS_ITEM",
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DELETE_CONFIRMATION",
            ])
            .subscribe((res) => {
                this.utilService.showConfirmAlert(
                    res[
                        "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DO_YOU_WANT_TO_REMOVE_THIS_ITEM"
                    ],
                    res[
                        "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.DELETE_CONFIRMATION"
                    ],
                    (status) => {
                        if (status) {
                            try {
                                hazard.controlMeasureAnswers.splice(
                                    controlMeasureIndex,
                                    1
                                );
                                hazard.controlMeasureAnswers.map(
                                    (
                                        controlMeasureAnswer: RAcontrolMeasureAnswerObject,
                                        key
                                    ) => {
                                        controlMeasureAnswer.controlMeasureAnswerDisplayOrder =
                                            key + 1;
                                    }
                                );
                            } catch (error) {}
                        }
                    }
                );
            });
    }

    scanUserQrCode = (event, hazard, valueKey, listType) => {
        event.stopPropagation();
        this.sharedDataService.isOpenSubScreen = true;

        const uniqueKey = UtilService.randomNumber();

        const fromFormCallbackKey =
            EnumService.ObserverKeys.QRCODE_SCANNED_RESULT + "" + uniqueKey;
        this.observablesService
            .getObservable(fromFormCallbackKey)
            .subscribe((result) => {
                this.sharedDataService.isOpenSubScreen = false;

                const entityItem = result as EntityItem;
                this.ngZone.run(() => {
                    setTimeout(() => {
                        hazard[valueKey] = entityItem.entityID?.toLowerCase();
                        this.addUserOrGroup(hazard, listType, valueKey);
                    }, 0);
                });

                this.observablesService.removeObservable(fromFormCallbackKey);
            });
        this.navCtrl.navigateForward("/dashboard-qrscan", {
            queryParams: {
                fromFormPage: true,
                fromFormCallbackKey: fromFormCallbackKey,
                fromFormAllowedQrCodeTypes: [
                    EnumService.SelectedQRCodeType.User,
                ],
            },
        });
    };

    async getCompanyUserList() {
        if (this.sharedDataService.offlineMode) {
            this.offlineManagerService
                .getDeviceCompanyUsers()
                .then((res: any) => {
                    if (res) {
                        this.users = res;
                    }
                });
            this.getCompanyUserGroupList();
        } else {
            this.utilService.presentLoadingWithOptions();

            this.apiService.getCompanyUserList(this.companyId).subscribe(
                (response: Response) => {
                    if (
                        response.StatusCode ===
                        EnumService.ApiResponseCode.RequestSuccessful
                    ) {
                        this.users = response.Result;
                    }
                    this.utilService.hideLoading();
                    this.getCompanyUserGroupList();
                },
                (error) => {
                    this.utilService.hideLoading();
                    this.getCompanyUserGroupList();
                }
            );
        }
    }

    // async getRiskRatingOptionList() {
    // 	if (!this.sharedDataService.riskRatingsList) {
    // 		this.utilService.presentLoadingWithOptions();
    // 	}
    // 	this.apiService.getRiskRatingOptionList().subscribe(
    // 		(response: Response) => {
    // 			this.utilService.hideLoading();
    // 			if (response.StatusCode === EnumService.ApiResponseCode.RequestSuccessful) {
    // 				if (response.Result && response.Result.length > 0) {
    // 					this.sharedDataService.riskRatingsList = response.Result;
    // 					this.putRiskRatingInVariable();
    // 				}
    // 			}
    // 		},
    // 		(error) => {
    // 			this.utilService.hideLoading();
    // 		}
    // 	);
    // }

    async getRiskAssessmentProbabilityOptions() {
        if (this.sharedDataService.offlineMode) {
            this.offlineManagerService
                .getDeviceRiskAssessmentProbabilityOptions()
                .then((res: any) => {
                    if (res) {
                        this.sharedDataService.probabilityRatings = res;
                        this.putRiskRatingInVariable();
                    }
                });
        } else {
            if (!this.sharedDataService.probabilityRatings) {
                this.utilService.presentLoadingWithOptions();
            }
            this.apiService.getRiskAssessmentProbabilityOptions().subscribe(
                (response: Response) => {
                    this.utilService.hideLoading();
                    if (
                        response.StatusCode ===
                        EnumService.ApiResponseCode.RequestSuccessful
                    ) {
                        if (response.Result && response.Result.length > 0) {
                            this.sharedDataService.probabilityRatings =
                                response.Result;
                            this.putRiskRatingInVariable();
                        }
                    }
                },
                (error) => {
                    this.utilService.hideLoading();
                }
            );
        }
    }

    async getRiskAssessmentSeverityOptions() {
        if (this.sharedDataService.offlineMode) {
            this.offlineManagerService
                .getDeviceRiskAssessmentSeverityOptions()
                .then((res: any) => {
                    if (res) {
                        this.sharedDataService.severityRatings = res;
                        this.putRiskRatingInVariable();
                    }
                });
        } else {
            if (!this.sharedDataService.severityRatings) {
                this.utilService.presentLoadingWithOptions();
            }
            this.apiService.getRiskAssessmentSeverityOptions().subscribe(
                (response: Response) => {
                    this.utilService.hideLoading();
                    if (
                        response.StatusCode ===
                        EnumService.ApiResponseCode.RequestSuccessful
                    ) {
                        if (response.Result && response.Result.length > 0) {
                            this.sharedDataService.severityRatings =
                                response.Result;
                            this.putRiskRatingInVariable();
                        }
                    }
                },
                (error) => {
                    this.utilService.hideLoading();
                }
            );
        }
    }

    async getRiskItemList() {
        if (this.sharedDataService.offlineMode) {
            this.offlineManagerService.getDeviceRiskItems().then((res: any) => {
                if (res) {
                    this.sharedDataService.raTaskTemplateList = res;
                    this.taskTemplateList = res;
                }
            });
        } else {
            this.utilService.presentLoadingWithOptions();
            this.apiService.getRiskItemList(this.companyId).subscribe(
                (response: Response) => {
                    this.utilService.hideLoading();
                    if (
                        response.StatusCode ===
                        EnumService.ApiResponseCode.RequestSuccessful
                    ) {
                        if (response.Result && response.Result.length > 0) {
                            this.sharedDataService.raTaskTemplateList =
                                response.Result;
                            this.taskTemplateList = response.Result;
                        }
                    }
                },
                (error) => {
                    this.utilService.hideLoading();
                }
            );
        }
    }

    async getHazardItemList(companyRiskItemID) {
        if (this.sharedDataService.offlineMode) {
            this.offlineManagerService
                .getDeviceHazardItems(this.companyId, companyRiskItemID)
                .then((res: any) => {
                    if (res) {
                        this.controlMeasureTemplateList = res;
                    }
                });
        } else {
            this.utilService.presentLoadingWithOptions();
            this.apiService
                .getHazardItemList(this.companyId, companyRiskItemID)
                .subscribe(
                    (response: Response) => {
                        this.utilService.hideLoading();
                        if (
                            response.StatusCode ===
                            EnumService.ApiResponseCode.RequestSuccessful
                        ) {
                            if (response.Result && response.Result.length > 0) {
                                this.controlMeasureTemplateList =
                                    response.Result;
                            }
                        }
                    },
                    (error) => {
                        this.utilService.hideLoading();
                    }
                );
        }
    }

    getCompanyUserGroupList() {
        if (this.sharedDataService.offlineMode) {
            this.offlineManagerService
                .getDeviceCompanyUserGroups()
                .then((res: any) => {
                    if (res) {
                        this.groups = res;
                    }
                });
        } else {
            this.utilService.presentLoadingWithOptions();
            this.apiService.getCompanyUserGroupList(this.companyId).subscribe(
                (response: Response) => {
                    if (
                        response.StatusCode ===
                        EnumService.ApiResponseCode.RequestSuccessful
                    ) {
                        this.groups = response.Result;
                    }
                    this.utilService.hideLoading();
                },
                (error) => {
                    this.utilService.hideLoading();
                }
            );
        }
    }

    putRiskRatingInVariable = () => {
        this.severityRatings = this.sharedDataService.severityRatings as [
            RiskRatingSeverityOption
        ];
        this.probabilityRatings = this.sharedDataService.probabilityRatings as [
            RiskRatingProbabilityOption
        ];
    };

    handleOrientation = () => {
        if (this.sharedDataService.dedicatedMode) {
            this.screenOrientationSubscribe?.unsubscribe();
            this.screenOrientationSubscribe = null;

            if (
                this.screenOrientation.type.includes("landscape") &&
                this.isFirstTime
            ) {
                this.screenOrientation.unlock();
                this.isShowOritationPortrait = true;
            } else {
                if (!UtilService.isLocalHost()) {
                    this.screenOrientation.lock(
                        this.screenOrientation.ORIENTATIONS.PORTRAIT
                    );
                }
                this.isShowOritationPortrait = false;
            }

            this.screenOrientationSubscribe = this.screenOrientation
                .onChange()
                .subscribe(() => {
                    this.ngZone.run(() => {
                        if (this.screenOrientation.type.includes("portrait")) {
                            if (!UtilService.isLocalHost()) {
                                this.screenOrientation.lock(
                                    this.screenOrientation.ORIENTATIONS.PORTRAIT
                                );
                            }
                            this.isShowOritationPortrait = false;
                        } else if (
                            this.screenOrientation.type.includes("landscape")
                        ) {
                            if (
                                this.sharedDataService
                                    .isGalleryOrCameraOpened ||
                                !this.isFirstTime
                            ) {
                                this.isShowOritationPortrait = false;
                                this.screenOrientation.lock(
                                    this.screenOrientation.ORIENTATIONS.PORTRAIT
                                );
                            } else {
                                this.isShowOritationPortrait = true;
                            }
                        }
                        if (this.isFirstTime) {
                            setTimeout(() => {
                                this.isFirstTime = false;
                            }, 1000);
                        }
                    });
                });
        } else {
            if (!UtilService.isLocalHost()) {
                this.screenOrientation.lock(
                    this.screenOrientation.ORIENTATIONS.PORTRAIT
                );
            }
        }
    };

    openFile(taskItem) {
        this.filehandlerService.openFile();
    }

    openImageAnnotation = (question, photo) => {
        this.sharedDataService.isOpenSubScreen = true;
        this.sharedDataService.setAnnotationImage(photo);
        this.sharedDataService.onAnnotationImageDone = (image) => {
            question.answer = image;
        };

        this.navCtrl.navigateForward(["/image-annotation"]);
    };

    async onClose() {
        if (
            this.sharedDataService.viewFormFor ===
            EnumService.ViewFormForType.Induction
        ) {
            const modal = await this.modalController.create({
                component: ExitConfirmationPage,
                swipeToClose: false,
                showBackdrop: false,
                backdropDismiss: false,
                animated: true,
                componentProps: {},
                cssClass: "exit-confirmation-modal",
            });
            await modal.present();

            modal.onWillDismiss().then(({ data }) => {
                if (data) {
                    this.onBack();
                }
            });
        } else {
            const modal = await this.modalController.create({
                component: FormStateSaveExitPage,
                swipeToClose: false,
                showBackdrop: false,
                backdropDismiss: false,
                animated: true,
                cssClass: "form-state-save-exit-modal",
                componentProps: {},
            });
            await modal.present();

            modal.onWillDismiss().then(({ data }) => {
                if (data === 2) {
                    this.sharedDataService.saveFormState(
                        EnumService.FormTypes.RISK_ASSESSMENT,
                        this.formGroup,
                        this.formBuilderDetail,
                        this.user,
                        (status, result) => {
                            this.isFormSubmitting = false;
                            if (status) {
                                this.onBack();
                            }
                        }
                    );
                } else if (data) {
                    this.onBack();
                }
            });
        }
    }

    onBack() {
        if (
            this.sharedDataService.viewFormFor ===
            EnumService.ViewFormForType.Induction
        ) {
            this.navCtrl.navigateBack("/checkinout-confirm");
        } else {
            this.navCtrl.back();
        }
    }

    // Navigate to question
    previous() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.scrollToQuestion();
        }
    }

    next() {
        if (this.currentQuestionIndex < this.questionElementIds.length - 1) {
            this.currentQuestionIndex++;
            this.scrollToQuestion();
        }
    }

    onScrollEnd = (event) => {
        try {
            if (this.scrollingDetail) {
                const scrollTop = this.scrollingDetail.scrollTop;
                if (scrollTop === 0) {
                    this.currentQuestionIndex = 0;
                } else {
                    this.questionElementIds.map((elementId, key) => {
                        const y = document.getElementById(elementId).offsetTop;
                        if (scrollTop >= y) {
                            this.currentQuestionIndex = key;
                            return;
                        }
                    });
                }
            }
        } catch (error) {}
    };

    onScroll = (event) => {
        this.scrollingDetail = event.detail;
    };

    scrollToQuestion = () => {
        try {
            const elementId =
                this.questionElementIds[this.currentQuestionIndex];
            const y = document.getElementById(elementId).offsetTop;
            this.content.scrollToPoint(0, y, 500);
        } catch (error) {}
    };

    createSeverityOptionTitleLangKey(title) {
        if (title.indexOf("_") === -1) {
            const keyTitle = title.replace(" ", "_");
            return (
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.SEVERITY_DROPDOWN." +
                keyTitle.toUpperCase()
            );
        }
        return title;
    }

    createProbabilityOptionTitleLangKey(title) {
        if (title.indexOf("_") === -1) {
            const keyTitle = title.replace(" ", "_");
            return (
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.PROBABILITY_DROPDOWN." +
                keyTitle.toUpperCase()
            );
        }
        return title;
    }

    getRatingTypeAndColor = (rating) => {
        let color = "";
        let type = "";

        if (rating >= 1 && rating <= 3) {
            color = UtilService.getColorForAnswerChoice("green");
            type =
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.CALCULATED_VALUE_DROPDOWN.LOW";
        } else if (rating >= 4 && rating <= 6) {
            color = UtilService.getColorForAnswerChoice("yellow");
            type =
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.CALCULATED_VALUE_DROPDOWN.MODERATE";
        } else if (rating >= 8 && rating <= 12) {
            color = UtilService.getColorForAnswerChoice("orange");
            type =
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.CALCULATED_VALUE_DROPDOWN.HIGH";
        } else if (rating >= 15 && rating <= 25) {
            color = UtilService.getColorForAnswerChoice("red");
            type =
                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.RISKASSESSMENT_FORM.CALCULATED_VALUE_DROPDOWN.EXTREME";
        } else {
            color = "#ffffff";
            type = "";
        }

        return {
            color,
            type,
        };
    };

    calculateResidualRatingForHazard(hazard) {
        const severityId = hazard.residualRiskRatingSeverityID || 0;
        const probabilityId = hazard.residualRiskRatingProbabilityID || 0;
        hazard.residualRiskRatingCalculatedValue = severityId * probabilityId;
    }

    calculateRatingForHazard(hazard) {
        const severityId = hazard.riskRatingSeverityID || 0;
        const probabilityId = hazard.riskRatingProbabilityID || 0;
        hazard.riskRatingCalculatedValue = severityId * probabilityId;
    }
    // -- End -- Navigate to question

    isValid(index, question) {
        let isValid = true;
        if (this.isSubmitted && question.questionIsRequired) {
            isValid = false;
            const answer = question.answer;
            switch (question.selectedAnswerTypeId) {
                case EnumService.CustomAnswerType.DateField:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.TimeField:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.DateTimeField:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.PhotoVideoUpload:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.SingleChoiceSet:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.SingleLineText:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.MultiLineText:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.NumberFieldInteger:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.NumberFieldDecimal:
                    isValid = answer;
                    break;
                case EnumService.CustomAnswerType.MultipleChoiceSet:
                    question.answerChoiceAttributes.map((item) => {
                        if (item.checked) {
                            isValid = item.checked;
                            return;
                        }
                    });
                    break;

                default:
                    isValid = true;
            }
        }
        return isValid;
    }

    convertStringToArray = (str, isValueTypeNumber = false) => {
        if (isValueTypeNumber) {
            return str?.split(",").map(Number);
        }
        return str?.split(",");
    };

    addUserOrGroup(hazard, listType, selectedIdKey) {
        let list;
        if (hazard[listType]) {
            list = hazard[listType].split(",");
        } else {
            list = [];
        }

        if (
            list.indexOf(hazard[selectedIdKey]) === -1 &&
            list.indexOf(parseInt(hazard[selectedIdKey])) === -1
        ) {
            list.push(hazard[selectedIdKey]);
        }
        hazard[listType] = list.join(",");
        hazard[selectedIdKey] = null;
    }

    removeUserOrGroup(hazard, listType, index) {
        let list;
        if (hazard[listType]) {
            list = hazard[listType].split(",");
        } else {
            list = [];
        }
        list.splice(index, 1);
        hazard[listType] = list.join(",");
    }

    // Check required field valid or not
    isTaskValid(task) {
        let isValid = true;
        if (this.isSubmitted && task.isRequired) {
            const hazards = task.hazardAnswers;
            hazards.map((hazard) => {
                if (
                    !this.isRiskRatingValid(
                        task,
                        hazard.riskRatingSeverityID
                    ) ||
                    !this.isRiskRatingValid(
                        task,
                        hazard.riskRatingProbabilityID
                    ) ||
                    !this.isRiskRatingValid(
                        task,
                        hazard.residualRiskRatingSeverityID
                    ) ||
                    !this.isRiskRatingValid(
                        task,
                        hazard.residualRiskRatingProbabilityID
                    ) ||
                    !this.isMemberOfTheWorkForceValid(task, hazard) ||
                    !this.isMemberOfThePublicValid(task, hazard)
                ) {
                    isValid = false;
                    return;
                }
            });
        }
        return isValid;
    }

    isRiskRatingValid(task, riskRating) {
        if (this.isSubmitted && task.isRequired && !riskRating) {
            return false;
        }
        return true;
    }

    isMemberOfTheWorkForceValid(task, hazard) {
        if (
            this.isSubmitted &&
            task.isRequired &&
            hazard.isMembersOfTheWorkForce &&
            !hazard.isMembersOfTheWorkForceUserIDs &&
            !hazard.isMembersOfTheWorkForceUserGroupIDs
        ) {
            return false;
        }

        return this.hasPersonnelExposedNotificationValid(task, hazard);
    }

    isMemberOfThePublicValid(task, hazard) {
        if (
            this.isSubmitted &&
            task.isRequired &&
            hazard.isMembersOfThePublic &&
            !hazard.membersOfThePublicDescription
        ) {
            return false;
        }
        return true;
    }

    hasPersonnelExposedNotificationValid(task, hazard) {
        if (
            this.isSubmitted &&
            task.isRequired &&
            hazard.hasPersonnelExposedNotification &&
            !hazard.personnelExposedNotificationUserIDs &&
            !hazard.personnelExposedNotificationUserGroupIDs
        ) {
            return false;
        }
        return true;
    }

    // --- End ---
    onContinue() {
        this.isSubmitted = true;
        this.errorMessage = "";

        this.isFormSubmitting = true;
        this.sharedDataService.saveFormAnswers({
            apiService: this.apiService,
            formGroup: this.formGroup,
            formBuilderDetail: this.formBuilderDetail,
            personalModeLoggedUser: this.user,
            originalCallBack: (status, result) => {
                this.isFormSubmitting = false;

                if (status) {
                } else {
                    this.errorMessage = result;
                    this._scrollToTop();
                }
            },
        });
    }

    _scrollToTop() {
        this.content.scrollToTop(200);
    }
}
