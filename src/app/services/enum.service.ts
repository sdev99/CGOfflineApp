import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class EnumService {
    static ActivityType = {
        CUSTOM_ACTIVITY: "Custom Activity",
        DOCUMENT_SIGNOFF_ACTIVITY: "Document Sign-Off",
        FORM_SIGNOFF_ACTIVITY: "Form Sign-Off",
    };

    static FormTypes = {
        CUSTOM: "Custom",
        RISK_ASSESSMENT: "Risk Assessment",
        WORK_PERMIT: "Work Permits",
        HAV: "HAV Exposure Calculator",
        ACCIDENT_REPORT: "Accident Report",
    };

    static SignOffType = {
        INDUCTION: "induction",

        DOCUMENT_ACTIVITY: "document_activity",
        FORM_ACTIVITY: "form_activity",

        FORM_CURRENT_CHECKIN: "form_current_checkin",
        WORKPERMIT_FORM_CURRENT_CHECKIN: "workpermit_form_current_checkin",
        DOCUMENT_CURRENT_CHECKIN: "document_current_checkin",

        WORK_PERMIT_DM: "work_permit_dedicated_mode",
        DOCUMENT_DM: "document_dedicated_mode",
        FORMS_DM: "forms_dedicated_mode",
    };

    static CheckInLocationByOptions = {
        QrCode: "qr_code",
        List: "list",
    };

    static CheckInType = {
        QrCode: "qr_code",
        MY_NAME: "my_name",
        AS_GUEST: "as_guest",
    };

    static ViewFormForType = {
        Induction: "induction",
        Activity: "activity",
        CurrentCheckin: "currentCheckin",
        CurrentCheckinWorkPermit: "currentCheckinWorkPermit",
        FormDM: "dedicated_mode_form",
        WorkPermitDM: "dedicated_mode_work_permit_form",
    };

    static ConfirmForCheckType = {
        CheckIn: "checkin",
        CheckOut: "checkout",
    };

    static InductionContentTypes = {
        IMAGE_FILE: "ImageFile",
        RICH_TEXT: "RichText",
        VIDEO_FILE: "VideoFile",
        FORM: "Form",
        VISITOR_AGREEMENT: "VisitorAgreement",
    };

    static ObserverKeys = {
        BACK_BUTTON_PRESSED: "BACK_BUTTON_PRESSED",
        REFRESH_CURRENT_CHECKIN_LIST: "REFRESH_CURRENT_CHECKIN_LIST",
        UPDATE_CURRENT_CHECKIN_LIST_IN_COMPONENT:
            "UPDATE_CURRENT_CHECKIN_LIST_IN_COMPONENT",
        NEW_CHECKED_IN: "NEW_CHECKED_IN",
        CURRENT_CHECKED_IN_CHANGED: "CURRENT_CHECKED_IN_CHANGED",
        APP_RESTORED_RESULT: "APP_RESTORED_RESULT",
        ACTIVITY_COMPLETED: "ACTIVITY_COMPLETED",
        QRCODE_SCANNED_RESULT: "QRCODE_SCANNED_RESULT",
        OFFLINE_DATA_SYNC_NEEDED: "OFFLINE_DATA_SYNC_NEEDED",
        OFFLINE_MODE_CHANGE: "OFFLINE_MODE_CHANGE",
        CHECK_FOR_LOCATION_ARCHIVE: "CHECK_FOR_LOCATION_ARCHIVE",
    };

    static SyncProcessState = {
        STARTED: "started",
        OFFLINE_DATA_PREPARE_START: "offline_data_prepare_start",
        OFFLINE_DATA_UPLOAD_START: "offline_data_upload_start",
        OFFLINE_DATA_DOWNLOAD_START: "offline_data_download_start",
        OFFLINE_DATA_INSERT_START: "offline_data_insert_start",
        COMPLETED: "completed",
        FAILED: "failed",
    };

    static LocalStorageKeys = {
        USER_DATA: "user_data",
        USER_PROFILE: "user_profile",
        API_ACCESS_KEY: "api_access_key",
        LOGIN_WITH_OKTA: "login_with_okta",
        LOGIN_WITH_OKTA_FOR_EMAIL: "login_with_okta_for_email",
        COMPANY_OKTA_DETAILS: "company_okta_details",
        API_TOKEN: "api_token",
        PUSH_TOKEN: "push_token",
        PUSH_PERMISSION_ALLOWED: "push_permission_allowed",
        IS_DEDICATED_MODE: "dedicated_mode",
        DEDICATED_MODE_DEVICE_DETAIL: "dedicated_mode_device_detail",
        DEDICATED_MODE_ASSIGNED_ENTITIES: "dedicated_mode_assigned_entities",
        DEDICATED_MODE_LOCATION_USE: "dedicated_mode_location_use",
        SYNC_DATE_TIME: "sync_date_time",
        CHECKED_IN_PLACES: "checked_in_places",
        CURRENT_SELECTED_CHECKIN_PLACE: "current_selected_checkin_place",
        APP_LANGUAGE: "app_language",
        TIMEZONE_LIST: "timezone_list",
        OFFLINE_MODE_ENABLE: "offline_mode_enable",
        OFFLINEMODE_SYNC_STATE: "offline_mode_sync_state",
        OFFLINE_DATA_FILES: "OFFLINE_DATA_FILES",
        OFFLINE_FILES_FOLDER_NAME: "offline_files_folder_name",
        UNIQUE_WEBAPP_ID: "S3W7SWC6MBLL08GXX8DCBQB2C",
    };

    static ApiMethods = {
        GetAccessKey: "GetAccessKey", // GET
        GetToken: "GetToken", // GET
        GetTermsOfServices: "GetTermsOfServices", // GET
        GetTimeZoneList: "GetTimeZoneList", // GET
        GetCompanyLanguageList: "GetCompanyLanguageList", // GET
        UpdatePushNotification: "UpdatePushNotification", // PUT
        UserSignIn: "UserSignIn", // POST
        GetCompanyMobileSessionDetails: "GetCompanyMobileSessionDetails", // POST
        ForgotPassword: "ForgotPassword", // POST
        OktaUserDetails: "OktaUserDetails", // POST
        OktaUserSignIn: "OktaUserSignIn", // POST
        ResetPassword: "ResetPassword", // POST
        AccountSetup: "AccountSetup", // POST
        GetUserProfileById: "GetUserProfileById", // GET
        UpdateUserProfile: "UpdateUserProfile", // PUT
        ChangePassword: "ChangePassword", // POST
        UserDeviceDelete: "UserDeviceDelete", // DELETE
        GetLocationItemList: "GetLocationItemList", // DELETE
        GetDeviceDetails: "GetDeviceDetails", // GET
        GetUserCurrentCheckInDetails: "GetUserCurrentCheckInDetails", // GET
        GetEntityByQRCode: "GetEntityByQRCode", // GET
        GetCheckInDetails: "GetCheckInDetails", // GET
        GetCheckInDetails_Guest: "GetCheckInDetails_Guest", // GET
        InsertCheckInDetails: "InsertCheckInDetails", // POST
        InsertCheckInDetails_Guest: "InsertCheckInDetails_Guest", // POST
        InsertCheckOutDetails: "InsertCheckOutDetails", // POST
        InsertCheckOutDetails_Guest: "InsertCheckOutDetails_Guest", // POST
        CheckInPhotoUpload: "CheckInPhotoUpload", // POST
        InductionPhotoUpload: "InductionPhotoUpload", // POST
        InductionSignatureUpload: "InductionSignatureUpload", // POST
        GetUserActivityList: "GetUserActivityList", // GET
        GetUserActivityDetail: "GetUserActivityDetail", // GET
        ActivityCompleted: "ActivityCompleted", // POST
        ActivityInProgress: "ActivityInProgress", // POST
        GetActivitySignOffFormDetail: "GetActivitySignOffFormDetail", // GET
        GetSignOffFormDetail: "GetSignOffFormDetail", // GET
        GetDedicatedModeSignOffFormDetail: "GetDedicatedModeSignOffFormDetail", // GET
        GetActivitySignOffDocumentDetail: "GetActivitySignOffDocumentDetail", // GET
        GetPersonalModeAvailableDocuments:
            "GetPersonalModeAvailableDocuments_V1", // GET
        GetPersonalModeAvailableWorkPermits:
            "GetPersonalModeAvailableWorkPermits_V1", // GET
        GetPersonalModeAvailableForms: "GetPersonalModeAvailableForms_V1", // GET
        InsertPersonalModeSignOffDetails: "InsertPersonalModeSignOffDetails", // POST
        InsertPersonalModeSignOffDetails_Test:
            "InsertPersonalModeSignOffDetails_Test", // POST
        MySignedDocuments: "MySignedDocuments", // GET
        DownloadDocument: "DownloadDocument", // GET
        GetDeviceEntityDetails: "GetDeviceEntityDetails", // GET
        ActivateDevice: "ActivateDevice", // POST
        GetUserByQRCode: "GetUserByQRCode", // GET
        GetUserAutoSuggest: "GetUserAutoSuggest", // GET
        GetGuestUserDetailByPhone: "GetGuestUserDetailByPhone", // GET
        GetFormBuilderDetails: "GetFormBuilderDetails", // GET
        GetCompanyUserList: "GetCompanyUserList", // GET
        GetCompanyUserGroupList: "GetCompanyUserGroupList", // GET
        GetManufacturerList: "GetManufacturerList", // GET
        GetTypeList: "GetTypeList", // GET
        GetModelList: "GetModelList", // GET
        FormPhotoOrVideoUpload: "FormPhotoOrVideoUpload", // POST
        SaveFormAnswers: "SaveFormAnswers_V1", // POST
        GetAccidentBodyPartList: "GetAccidentBodyPartList", // GET
        GetAccidentClassificationList: "GetAccidentClassificationList", // GET
        GetAccidentTypeList: "GetAccidentTypeList", // GET
        GetUserTotalHAVExposureForToday: "GetUserTotalHAVExposureForToday", // GET
        GetRiskRatingOptionList: "GetRiskRatingOptionList", // GET
        GetDedicatedModeAvailableDocuments:
            "GetDedicatedModeAvailableDocuments_V1", // GET
        GetDedicatedModeArchiveDocuments: "GetDedicatedModeArchiveDocuments", // GET
        GetDedicatedModeAvailableForms: "GetDedicatedModeAvailableForms_V1", // GET
        GetDedicatedModeArchiveForms: "GetDedicatedModeArchiveForms", // GET
        GetEvacuationList: "GetEvacuationList", // GET
        GetDedicatedModeLiveWorkPermits: "GetDedicatedModeLiveWorkPermits", // GET
        GetDedicatedModeArchiveWorkPermits:
            "GetDedicatedModeArchiveWorkPermits", // GET
        GetDedicatedModeAvailableWorkPermits:
            "GetDedicatedModeAvailableWorkPermits_V1", // GET
        GetRiskAssessmentSeverityOptions: "GetRiskAssessmentSeverityOptions", // GET
        GetRiskAssessmentProbabilityOptions:
            "GetRiskAssessmentProbabilityOptions", // GET
        GetRiskItemList: "GetRiskItemList", // GET
        GetHazardItemList: "GetHazardItemList", // GET
        GetCompanyLanguageTemplate: "GetCompanyLanguageTemplate", // GET
        GetCompanyLanguageTemplateByCode: "GetCompanyLanguageTemplateByCode", // GET
        GetAnswerChoiceEntityByQRCode: "GetAnswerChoiceEntityByQRCode", // GET
        GetUserDirectoryFilePath: "GetUserDirectoryFilePath", // GET
        GetUserCheckInSignOffDirectoryFilePath:
            "GetUserCheckInSignOffDirectoryFilePath", // GET
        GetCompanyDirectoryFilePath: "GetCompanyDirectoryFilePath", // GET
        GetInventoryDirectoryFilePath: "GetInventoryDirectoryFilePath", // GET
        GetDocumentDirectoryFilePath: "GetDocumentDirectoryFilePath", // GET
        // Dedicated Mode Offline Api
        GetDeviceOfflineDetails: "GetDeviceOfflineDetails",
        GetDeviceOfflineFile: "GetDeviceOfflineFile",
        PostOfflineFormAnswerPhotoOrVideo: "PostOfflineFormAnswerPhotoOrVideo",
        DeviceOfflineFileDelete: "DeviceOfflineFileDelete",
        GetSynchStatus: "GetSynchStatus_V1",
        PostDeviceOfflineFile: "PostDeviceOfflineFile_V1",
        SynchDevice: "SynchDevice",
        CheckLocationArchive: "CheckLocationArchive",
    };

    static ApiResponseCode = {
        RequestSuccessful: 200,
        RequestDenied: 401,
        InvalidData: 412,
        UnableToProcess: 400,
        NoDataFound: 204,
        UrlNotFound: 501,
        InvalidToken: 419,
        GeneralError: 500,
    };

    static CustomAnswerType = {
        SingleChoiceSet: 1,
        MultipleChoiceSet: 2,
        SingleLineText: 3,
        MultiLineText: 4,
        NumberFieldInteger: 5,
        NumberFieldDecimal: 6,
        DateField: 7,
        TimeField: 8,
        DateTimeField: 9,
        PhotoVideoUpload: 10,
        ClassicDropdown: 11,
        LocationSelection: 12,
        BodyPartControl: 13,
        ConfirmationBox: 14,
        ScanQrCodeField: 15,
        Matrix3DField: 16,
    };

    static RiskAssessmentAnswerEditOptionsType = {
        Choose: 0,
        Template: 1,
        Manually: 2,
        Both: 3,
    };

    static HavFormFieldOrder = {
        DateOfUsage: 1,
        Manufacturer: 2,
        Type: 3,
        Model: 4,
        PlannedTimeOfUsage: 5,
    };

    static SelectedQRCodeType = {
        Location: "Location",
        Project: "Project",
        InventoryItem: "Inventory Item",
        Document: "Document",
        Form: "Form",
        User: "User",
    };

    static AccidentFormFieldOrder = {
        AccidentDateTime: 1,
        AccidentLocation: 2,
        About: 3,
        Type: 4,
        Classification: 5,
        BodyPartEffected: 6,
        Description: 7,
        Attachment: 8,
    };

    static AccidentCustomLocationControlsName = {
        PlaceNotintheList: "placeNotintheList",
        LocationName: "locationName",
    };

    static AccidentBodyPartsIds = {
        FullBody: 0,
        HeadSoftTissue: 1,
        HeadFace: 2,
        TorsoAbdomen: 3,
        TorsoChest: 4,
        TorsoNeck: 5,
        TorsoRibs: 6,
        BackUpperBack: 7,
        BackLowerBack: 8,
        BackButtocks: 9,
        ArmsShoulderRight: 10,
        ArmsShoulderLeft: 11,
        UpperArmRight: 34,
        UpperArmLeft: 35,
        ArmsElbowRight: 12,
        ArmsElbowLeft: 13,
        ArmsLowerRight: 14,
        ArmsLowerLeft: 15,
        ArmsWristRight: 16,
        ArmsWristLeft: 17,
        ArmsHandRight: 18,
        ArmsHandLeft: 19,
        ArmsFingerRight: 20,
        ArmsFingerLeft: 21,
        LegsAnkleRight: 22,
        LegsAnkleLeft: 23,
        LegsFootRight: 24,
        LegsFootLeft: 25,
        LowerLegRight: 32,
        LowerLegLeft: 33,
        LegsKneeRight: 26,
        LegsKneeLeft: 27,
        LegsUpperRight: 28,
        LegsUpperLeft: 29,
        LegsToeRight: 30,
        LegsToeLeft: 31,
    };

    static QuestionLogic = {
        FormControlNamePreStringForUniqueName:
            "FormControlNamePreStringForUniqueName",
        LogicApplicableForQuestionTypes: [
            EnumService.CustomAnswerType.SingleChoiceSet,
            EnumService.CustomAnswerType.MultipleChoiceSet,
            EnumService.CustomAnswerType.NumberFieldInteger,
            EnumService.CustomAnswerType.NumberFieldDecimal,
            EnumService.CustomAnswerType.DateTimeField,
            EnumService.CustomAnswerType.DateField,
            EnumService.CustomAnswerType.TimeField,
            EnumService.CustomAnswerType.ConfirmationBox,
        ],
        ActionType: {
            Show: 1,
            Hide: 2,
            Duplicate: 3,
            MarkAsFailed: 4,
            Notify: 5,
            CreateNewActivity: 20,
        },
        ActionTypeForForm: {
            ShowForLogic: "showForLogic",
            HideForLogic: "hideForLogic",
            MarkAsFailed: "isMarkedAsFailed",
            Duplicate: "duplicate",
            Notify: "isNotify",
            CreateNewActivity: "isCreateNewActivity",
        },
        SingleMultipleChoiceOperationType: {
            Selected: 1,
            NotSelected: 2,
        },
        OtherValueOperationType: {
            GreaterThen: 1,
            GreaterThenEqualTo: 2,
            LessThen: 3,
            LessThenEqualTo: 4,
            EqualTo: 5,
            NotEqualTo: 6,
        },
    };

    static NotificationActionType = {
        NewActivityAssigned: "New Activity Assigned",
        SignOffRejected: "Sign-Off Rejected",
        ActivityOverdue: "Activity Overdue",
        UserQualificationExpired: "User Qualification Expired",
        UserQualificationIsDueToExpireSoon:
            "User Qualification is Due to Expire Soon",
    };

    static DedicatedModeDocumentListType = {
        Available: "Document List",
        Archive: "Document Archive",
    };

    static DedicatedModeFormListType = {
        Available: "Form List",
        Archive: "Form Archive",
    };

    static DedicatedModePermitListType = {
        Live: "Live Permits",
        Archive: "Permit Archive",
    };

    static DedicatedModeProcessTypes = {
        CheckinOut: "CheckinOut",
        Form: "Form",
        Document: "Document",
        WorkPermit: "WorkPermit",
    };

    static DedicatedModeTempAuthType = {
        Document: "Document",
        Form: "Form",
        WorkPermit: "WorkPermit",
    };

    static DedicatedModeTempAuthBy = {
        QRCode: "QRCode",
        Name: "Name",
    };

    static DedicatedModeCapturePhotoForType = {
        Auth: "Auth",
        LocationPhoto: "LocationPhoto",
        Signoff: "SignOff",
    };

    constructor() {}
}
