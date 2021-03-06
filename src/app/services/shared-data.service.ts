import { Injectable } from "@angular/core";
import { EnumService } from "./enum.service";
import { NavController, Platform } from "@ionic/angular";
import { Profile } from "../_models/profile";
import { CheckinDetail } from "../_models/checkinDetail";
import { LocationItem } from "../_models/locationItem";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { SocialSharing } from "@awesome-cordova-plugins/social-sharing/ngx";

import {
    Capacitor,
    GeolocationPosition,
    PermissionType,
    Plugins,
    PushNotification,
    PushNotificationActionPerformed,
    PushNotificationToken,
} from "@capacitor/core";
import { ActivityListItem } from "../_models/activityListItem";
import { DocumentDetail } from "../_models/documentDetail";
import { CheckInPostData } from "../_models/checkInPostData";
import { SignOffDetailsPostData } from "../_models/signOffDetailsPostData";
import { UtilService } from "./util.service";
import { ApiService } from "./api.service";
import { Response, User } from "../_models";
import { ObservablesService } from "./observables.service";
import { CheckedInDetailItem } from "../_models/checkedInDetailItem";
import { SignOffFormDetail } from "../_models/signOffFormDetail";
import { HavAnswerObject } from "../_models/havAnswerObject";
import { FormAnswerObject } from "../_models/formAnswerObject";
import { SubmitAnswersObject } from "../_models/submitAnswersObject";
import { FormGroup } from "@angular/forms";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import * as moment from "moment/moment";
import { WorkPermitAnswer } from "../_models/workPermitAnswer";
import { ArAnswerObject } from "../_models/arAnswerObject";
import { StaticDataService } from "./static-data.service";
import { RiskRatingItem } from "../_models/riskRatingItem";
import { DedicatedModeDeviceDetailData } from "../_models/dedicatedModeDeviceDetailData";
import { DeviceEntityDetail } from "../_models/deviceEntityDetail";
import { DedicatedModeGuestDetail } from "../_models/dedicatedModeGuestDetail";
import { UserDetail } from "../_models/userDetail";
import {
    FileTransfer,
    FileUploadOptions,
} from "@ionic-native/file-transfer/ngx";
import { environment } from "../../environments/environment";
import { RiskRatingSeverityOption } from "../_models/riskRatingSeverityOption";
import { RiskRatingProbabilityOption } from "../_models/riskRatingProbabilityOption";
import { RAtaskTemplateItem } from "../_models/RAtaskTemplateItem";
import { HavAnswerDetail } from "../_models/havAnswerDetail";
import { TranslateService } from "@ngx-translate/core";
import { EntityItem } from "../_models/entityItem";
import { AccountService } from "./account.service";
import { OfflineManagerService } from "./offline-manager.service";
import { DeviceUserDetail } from "../_models/offline/DeviceUserDetail";
import { File } from "@ionic-native/file/ngx";
import { InductionItem } from "../_models/inductionItem";
import { FilehandlerService } from "./filehandler.service";
import { Insomnia } from "@ionic-native/insomnia/ngx";
import { Storage } from "@ionic/storage-angular";

const { PushNotifications, Permissions } = Plugins;

const apiPath: string = "/x4wnyp56gow2ffl/api";
const allEnvironmentSiteUrl = {
    prod: "https://login.be-safetech.com",
    staging: "https://besafetech-test.com",
    dev: "https://cg.utopia-test.com",
};
const webAppAllEnvironmentDomain = {
    prod: "https://access.be-safetech.com",
    staging: "https://access.besafetech-test.com",
    dev: "https://cgaccess.utopia-test.com",
};

@Injectable({
    providedIn: "root",
})
export class SharedDataService {
    apiServiceRerence: ApiService;
    accountServiceRef: AccountService;

    apiBaseUrl = environment.siteBaseUrl + apiPath;
    siteBaseUrl = environment.siteBaseUrl;

    myCurrentGeoLocation: GeolocationPosition;

    isNavigationTypeDeepLink = false;
    isLoginAfterAppOpen = false;

    annotationImage;
    annotationColor = "#98C16B";
    onAnnotationImageDone;

    deviceUID = ""; // For simulator ipad
    // deviceUID = '33F3FF08-8A4E-4E24-84DC-D8AF80B8EAC1';
    // deviceUID = '5A8CD1FF-24AE-44B9-A2AD-65AA5309E2CE'; ipad
    // deviceUID = "33F3FF08-8A4E-4E24-14DC-D8AF80B8EAC1"; // For test dedicated mode
    // deviceUID = "33F3FF08-8A4E-4E24-14DC-D8AF80B8EAC12222"; // For test dedicated mode assign one location
    // deviceUID = 'f5aa72ed-21ca-4b12-8485-a24447cb420d'; // Arvin ipad device id
    // deviceUID = "f44ab87b-a2d6-8df0-8637-870495265348"; // SdevAndroid
    // deviceUID = "67DA70A1-FD31-4B48-81F6-74E9EB356632"; // SdevIphone
    // deviceUID = '0d98044b-6541-c58e-6353-935090075482'; // Rosana Tablet5.1

    pushToken = "000";
    isTablet = false;
    isDevelopmentMode = false;

    dedicatedMode =
        localStorage.getItem(EnumService.LocalStorageKeys.IS_DEDICATED_MODE) ===
        "true";
    offlineMode = true;
    // when open form or document , useful for next screens

    dedicatedModeDeviceDetailData: DedicatedModeDeviceDetailData;
    dedicatedModeAssignedEntities: Array<DeviceEntityDetail>;

    dedicatedModeGuestDetail: DedicatedModeGuestDetail;
    dedicatedModeUserDetail: UserDetail;

    // Data from Api
    checkedInPlaces: Array<CheckedInDetailItem> = [];
    currentSelectedCheckinPlace: CheckedInDetailItem;

    // Userful for personal mode dashbord
    activityList: Array<ActivityListItem>;
    activityOverviewData;

    userId: any;
    userProfile: Profile;
    timeZoneList;
    companyLanguageList;

    riskRatingsList: [RiskRatingItem];
    severityRatings: Array<RiskRatingSeverityOption>;
    probabilityRatings: Array<RiskRatingProbabilityOption>;
    raTaskTemplateList: Array<RAtaskTemplateItem>;

    locationItemList;

    // data for another pages
    checkInDetail: CheckinDetail;
    currentActivityOpen: ActivityListItem;
    signOffFormDetail: SignOffFormDetail; // For form activity signoff
    signOffDocumentDetail: DocumentDetail; // For activity document  signoff and current checkin document signoff
    viewFormDetail;

    /** Location selected on choose-location page**/
    dedicatedModeLocationUse: DeviceEntityDetail;

    // For dedicated mode
    dedicatedModeProcessType = ""; // EnumService.DedicatedModeProcessTypes
    checkinoutDmAs = ""; // EnumService.CheckInType
    signOffFor = ""; // EnumService.SignOffType
    dedicatedModeTempAuthFor = ""; // EnumService.DedicatedModeTempAuthType
    dedicatedModeTempAuthBy = ""; // EnumService.DedicatedModeTempAuthBy
    dedicatedModeCapturePhotoFor = ""; // EnumService.DedicatedModeCapturePhotoForType
    dedicatedModeCapturedSelfieForCheckinProcess; // photo name of uploaded captured selfie during checkin process, (For reuse it for signoff)

    viewFormFor; // View form for induction process or activity detail
    viewFormForActivityId; // View form for induction process or activity detail
    inductionContentItemIndex = 0;

    // Store location data for checkinout
    checkinLocationByOption; // EnumService.CheckInLocationByOptions
    checkInForLocation: LocationItem;
    checkOutForCheckedInDetail: CheckedInDetailItem;

    // Store  all screen checkin details for whole process and use this data on end of checkin data send to server
    checkInPostData: CheckInPostData;
    signOffDetailsPostData: SignOffDetailsPostData;

    formBuilderDetails: any;
    savedFormStateData: any;
    savedFormStateIndex: number = -1;

    // for use in next screen
    availableWorkPermits;

    isOpenSubScreen = false;
    isGalleryOrCameraOpened = false;

    workPermitAnswer: WorkPermitAnswer;

    currentLanguageId = 0;

    videoFileUpload;

    autocheckoutTimeoutRef = {};

    translateService: TranslateService;
    companyLangaugeTranslations = {};

    indexDbStorage: Storage = null;

    constructor(
        public platform: Platform,
        private fileTransfer: FileTransfer,
        private navCtrl: NavController,
        private observablesService: ObservablesService,
        private offlineManagerService: OfflineManagerService,
        public utilService: UtilService,
        public fileOpener: FileOpener,
        public file: File,
        private insomnia: Insomnia,
        private socialSharing: SocialSharing,
        private filehandlerService: FilehandlerService,
        private screenOrientation: ScreenOrientation //  private translateService: TranslateService
    ) {
        const currentHost = window.location.host;
        // Forpreview site domain
        const apiUrlDevHostname = new URL(allEnvironmentSiteUrl.dev).hostname;
        const apiUrlStagingHostname = new URL(allEnvironmentSiteUrl.staging)
            .hostname;
        const apiUrlProdHostname = new URL(allEnvironmentSiteUrl.prod).hostname;

        // Set dynamic api url for WebApp based on domain
        if (environment.isFormPreview || UtilService.isWebApp()) {
            // Webapp Site Domain
            const siteDevHostname = new URL(webAppAllEnvironmentDomain.dev)
                .hostname;
            const siteStagingHostname = new URL(
                webAppAllEnvironmentDomain.staging
            ).hostname;
            const siteProdHostname = new URL(webAppAllEnvironmentDomain.prod)
                .hostname;

            if (
                currentHost === apiUrlDevHostname ||
                currentHost === siteDevHostname
            ) {
                this.apiBaseUrl = allEnvironmentSiteUrl.dev + apiPath;
                this.siteBaseUrl = allEnvironmentSiteUrl.dev;
                this.isDevelopmentMode = true;
            } else if (
                currentHost === apiUrlStagingHostname ||
                currentHost === siteStagingHostname
            ) {
                this.apiBaseUrl = allEnvironmentSiteUrl.staging + apiPath;
                this.siteBaseUrl = allEnvironmentSiteUrl.staging;
            } else if (
                currentHost === apiUrlProdHostname ||
                currentHost === siteProdHostname
            ) {
                this.apiBaseUrl = allEnvironmentSiteUrl.prod + apiPath;
                this.siteBaseUrl = allEnvironmentSiteUrl.prod;
            }
        } else {
            if (
                (!environment.production &&
                    (currentHost === apiUrlDevHostname ||
                        environment.siteBaseUrl.indexOf(apiUrlDevHostname) !==
                            -1)) ||
                UtilService.isLocalHost()
            ) {
                this.isDevelopmentMode = true;
            }
        }

        this.isTablet = platform.is("tablet");
        this.dedicatedMode =
            localStorage.getItem(
                EnumService.LocalStorageKeys.IS_DEDICATED_MODE
            ) === "true";
        const dedicatedModeLocationUse = localStorage.getItem(
            EnumService.LocalStorageKeys.DEDICATED_MODE_LOCATION_USE
        );
        if (dedicatedModeLocationUse) {
            this.dedicatedModeLocationUse = JSON.parse(
                dedicatedModeLocationUse
            );
        }
        const dedicatedModeDeviceDetail = localStorage.getItem(
            EnumService.LocalStorageKeys.DEDICATED_MODE_DEVICE_DETAIL
        );
        if (dedicatedModeDeviceDetail) {
            this.dedicatedModeDeviceDetailData = JSON.parse(
                dedicatedModeDeviceDetail
            );
        }

        const dedicatedModeAssignedEntities = localStorage.getItem(
            EnumService.LocalStorageKeys.DEDICATED_MODE_ASSIGNED_ENTITIES
        );
        if (dedicatedModeAssignedEntities) {
            this.dedicatedModeAssignedEntities = JSON.parse(
                dedicatedModeAssignedEntities
            );
        }

        const userProfile = localStorage.getItem(
            EnumService.LocalStorageKeys.USER_PROFILE
        );
        if (userProfile) {
            this.userProfile = JSON.parse(userProfile);
        }

        const timeZoneList = localStorage.getItem(
            EnumService.LocalStorageKeys.TIMEZONE_LIST
        );
        if (timeZoneList) {
            this.timeZoneList = JSON.parse(timeZoneList);
        }

        const checkedInPlaces = localStorage.getItem(
            EnumService.LocalStorageKeys.CHECKED_IN_PLACES
        );
        if (checkedInPlaces) {
            this.checkedInPlaces = JSON.parse(checkedInPlaces);
        }

        const pushToken = localStorage.getItem(
            EnumService.LocalStorageKeys.PUSH_TOKEN
        );
        if (pushToken) {
            this.pushToken = pushToken;
        }

        const selectedCheckedInPlace = localStorage.getItem(
            EnumService.LocalStorageKeys.CURRENT_SELECTED_CHECKIN_PLACE
        );
        if (selectedCheckedInPlace) {
            this.currentSelectedCheckinPlace = JSON.parse(
                selectedCheckedInPlace
            );
        }
    }

    setAnnotationImage(image) {
        this.annotationImage = image;
    }

    getAnnotationImage() {
        return this.annotationImage;
    }

    dedicatedModeDeviceDeleted() {
        this.dedicatedModeDeviceDetailData = null;
        this.dedicatedModeAssignedEntities = null;
        this.dedicatedMode = false;
        localStorage.removeItem(EnumService.LocalStorageKeys.IS_DEDICATED_MODE);
        localStorage.removeItem(
            EnumService.LocalStorageKeys.DEDICATED_MODE_DEVICE_DETAIL
        );
        localStorage.removeItem(
            EnumService.LocalStorageKeys.DEDICATED_MODE_ASSIGNED_ENTITIES
        );
        this.navCtrl.navigateRoot("/login", { replaceUrl: true });
        if (!UtilService.isLocalHost()) {
            this.screenOrientation.lock(
                this.screenOrientation.ORIENTATIONS.PORTRAIT
            );
        }
        this.configureForPushNotification();
    }

    resetAllSharedVariable() {
        this.checkedInPlaces = [];
        this.currentSelectedCheckinPlace = null;
        this.userProfile = null;
        this.timeZoneList = null;
        this.companyLanguageList = null;
        this.locationItemList = null;
        this.checkInDetail = null;
        this.currentActivityOpen = null;
        this.signOffFormDetail = null;
        this.signOffDocumentDetail = null;
        this.dedicatedModeLocationUse = null;
        this.dedicatedModeCapturedSelfieForCheckinProcess = null;
        this.checkinoutDmAs = "";
        this.signOffFor = "";
        this.viewFormFor = null;
        this.inductionContentItemIndex = 0;
        this.checkInForLocation = null;
        this.checkOutForCheckedInDetail = null;
        this.checkInPostData = null;
        this.signOffDetailsPostData = null;
        this.formBuilderDetails = null;
        this.availableWorkPermits = null;
        this.isOpenSubScreen = false;
        this.workPermitAnswer = null;
    }

    getLoggedInUser() {
        const user: User = JSON.parse(
            localStorage.getItem(EnumService.LocalStorageKeys.USER_DATA)
        );
        return user;
    }

    getLanguageIdForForm() {
        const formBuilderDetail = this.formBuilderDetails;
        if (!this.dedicatedMode && this.currentLanguageId) {
            let sections = formBuilderDetail.sections;
            let selectedLanguageID = formBuilderDetail.defaultLanguageId;

            if (selectedLanguageID !== this.currentLanguageId) {
                const firstSection =
                    sections && sections.length > 0 ? sections[0] : null;
                if (
                    firstSection &&
                    firstSection.sectionTranslations?.length > 1
                ) {
                    firstSection.sectionTranslations.some((item) => {
                        if (
                            item.sectionTranslationLanguageId ===
                            this.currentLanguageId
                        ) {
                            selectedLanguageID = this.currentLanguageId;
                            return true;
                        }
                    });
                }
            }
            return selectedLanguageID;
        } else {
            return this.formBuilderDetails?.defaultLanguageId;
        }
    }

    configureForPushNotification = async () => {
        if (Capacitor.isNative) {
            try {
                const notificationPermission = await Permissions.query({
                    name: PermissionType.Notifications,
                });

                if (notificationPermission.state !== "granted") {
                    await PushNotifications.requestPermission().then(
                        (result) => {
                            if (result.granted) {
                                localStorage.setItem(
                                    EnumService.LocalStorageKeys
                                        .PUSH_PERMISSION_ALLOWED,
                                    "true"
                                );
                                // Register with Apple / Google to receive push via APNS/FCM
                                this.registerForPushNotification();
                            } else {
                                localStorage.setItem(
                                    EnumService.LocalStorageKeys
                                        .PUSH_PERMISSION_ALLOWED,
                                    "false"
                                );
                                this.updatePushSettingOnServer(false);
                            }
                        }
                    );
                } else {
                    localStorage.setItem(
                        EnumService.LocalStorageKeys.PUSH_PERMISSION_ALLOWED,
                        "true"
                    );
                    this.registerForPushNotification();
                }

                // On success, we should be able to receive notifications
                PushNotifications.addListener(
                    "registration",
                    (token: PushNotificationToken) => {
                        localStorage.setItem(
                            EnumService.LocalStorageKeys.PUSH_TOKEN,
                            token.value
                        );
                        this.pushToken = token.value;
                        console.log(
                            "Push registration success, token: " + token.value
                        );
                    }
                );

                // Show us the notification payload if the app is open on our device
                PushNotifications.addListener(
                    "pushNotificationReceived",
                    (notification: PushNotification) => {
                        console.log(
                            "Push received: " + JSON.stringify(notification)
                        );
                    }
                );

                // Method called when tapping on a notification
                PushNotifications.addListener(
                    "pushNotificationActionPerformed",
                    (notification: PushNotificationActionPerformed) => {
                        if (notification.actionId === "tap") {
                            const notificationData =
                                notification.notification.data;
                            switch (notificationData.action) {
                                case EnumService.NotificationActionType
                                    .NewActivityAssigned:
                                case EnumService.NotificationActionType
                                    .SignOffRejected:
                                case EnumService.NotificationActionType
                                    .ActivityOverdue:
                                    if (
                                        !this.dedicatedMode &&
                                        this.getLoggedInUser() &&
                                        this.getLoggedInUser().userId
                                    ) {
                                        setTimeout(() => {
                                            const contentlink =
                                                notificationData.contentlink;
                                            const activityId = contentlink
                                                .split("_")
                                                .pop();

                                            const activityList =
                                                this.activityList;
                                            let currentActivityOpen: ActivityListItem;
                                            if (activityList) {
                                                activityList.map((item) => {
                                                    if (
                                                        item.activityIndividualID ===
                                                        activityId
                                                    ) {
                                                        currentActivityOpen =
                                                            item;
                                                        return;
                                                    }
                                                });
                                            }
                                            if (!currentActivityOpen) {
                                                currentActivityOpen = {
                                                    activityIndividualID:
                                                        activityId,
                                                } as ActivityListItem;
                                            }

                                            this.currentActivityOpen =
                                                currentActivityOpen;
                                            console.log(
                                                "Push currentActivityOpen",
                                                currentActivityOpen
                                            );
                                            this.navCtrl.navigateForward([
                                                "/activity-detail",
                                            ]);
                                        }, 100);
                                    }
                                    break;
                            }
                        }
                        // {"actionId":"tap","notification":{"body":"You have a new Activity Assigned","badge":1,"id":"A50F97EA-2426-4407-B9B6-80E576527CD1","subtitle":"","data":{"google.c.a.e":"1","contentlink":"https://cg.utopia-test.com/Activity/ActivityDetail/0_1339","action":"New Activity Assigned","aps":{"alert":{"title":"ComplianceGenie","body":"You have a new Activity Assigned"},"sound":"default","category":"FCM_PLUGIN_ACTIVITY"},"content":"You have a new Activity Assigned","gcm.message_id":"1610621468120206","google.c.sender.id":"1005975349422"},"title":"ComplianceGenie"}}
                        console.log(
                            "Push action performed: " +
                                JSON.stringify(notification)
                        );
                    }
                );
            } catch (e) {}
        }
    };

    registerForPushNotification = () => {
        PushNotifications.register();
        this.updatePushSettingOnServer(true);
    };

    updatePushSettingOnServer = (isEnable) => {
        if (this.dedicatedMode) {
            this.apiServiceRerence
                .updatePushNotification(
                    {
                        isPushNotification: isEnable,
                    },
                    this.deviceUID
                )
                .subscribe(() => {});
        } else {
            if (this.getLoggedInUser()?.userId) {
                this.apiServiceRerence
                    .updatePushNotification(
                        {
                            isPushNotification: isEnable,
                        },
                        this.getLoggedInUser()?.userId
                    )
                    .subscribe(() => {});
            }
        }
    };

    /**
     * GetLangFileTranslation from api
     * @param callBack
     */
    getLangFileTranslation = (callBack, resetPassCode = null) => {
        const onSuccessCallBack = (response: Response) => {
            if (response) {
                this.translateService.setTranslation("en", response, true);
                this.translateService.use("en");
                this.companyLangaugeTranslations = response;
            }
            callBack && callBack();
        };

        const onErrorCallBack = (error) => {
            callBack && callBack();
        };

        if (resetPassCode) {
            this.apiServiceRerence
                .getCompanyLanguageTemplateByCode(resetPassCode)
                .subscribe(onSuccessCallBack, onErrorCallBack);
        } else {
            this.apiServiceRerence
                .getCompanyLanguageTemplate()
                .subscribe(onSuccessCallBack, onErrorCallBack);
        }
    };

    /**
     * checkAutoCheckOutForCurrentCheckin
     */
    public checkAutoCheckOutForCurrentCheckin() {
        const timeZoneList = this.timeZoneList;
        let userProfileTimeZone;
        timeZoneList?.some((item) => {
            if (item.timeZoneID === this.userProfile?.timeZoneID) {
                userProfileTimeZone = item;
                return true;
            }
        });

        //Clear previous timeout
        Object.keys(this.autocheckoutTimeoutRef).map((timeoutRef: any) => {
            clearTimeout(timeoutRef);
        });
        this.autocheckoutTimeoutRef = {};

        const currentCheckinList = this.checkedInPlaces;
        if (currentCheckinList && currentCheckinList.length > 0) {
            currentCheckinList.map((item) => {
                let autoCheckoutDateTime;
                const currentCheckinMyTime = moment(item.checkInDate).add(
                    userProfileTimeZone?.timeDifference || 0,
                    "minutes"
                );
                let isAutoCheckOut = false;

                if (
                    (item.userAutoCheckOutTime &&
                        item.userAutoCheckOutTime.indexOf(":") !== -1) ||
                    (item.locationAutoCheckOutTime &&
                        item.locationAutoCheckOutTime.indexOf(":") !== -1)
                ) {
                    let parts;
                    if (
                        item.userAutoCheckOutTime &&
                        item.userAutoCheckOutTime.indexOf(":") !== -1
                    ) {
                        parts = item.userAutoCheckOutTime.split(":");
                    } else {
                        parts = item.locationAutoCheckOutTime.split(":");
                    }
                    let hour = parseInt(parts[0]);
                    let minute = parseInt(parts[1]);
                    let checkInDate = moment(item.checkInDate);
                    autoCheckoutDateTime = moment(
                        checkInDate.format(
                            "YYYY-MM-DDT" +
                                UtilService.appendZero(hour) +
                                ":" +
                                UtilService.appendZero(minute) +
                                ":00.00"
                        )
                    );

                    isAutoCheckOut = true;
                }

                if (!isAutoCheckOut) {
                    if (item.locationAutoCheckOutHour > 0) {
                        autoCheckoutDateTime = moment(currentCheckinMyTime).add(
                            item.locationAutoCheckOutHour,
                            "hour"
                        );
                        isAutoCheckOut = true;
                    }
                }

                if (isAutoCheckOut) {
                    const userProfileCurrentDate = moment(
                        item.currentUTCDate
                    ).add(userProfileTimeZone?.timeDifference || 0, "minutes");
                    if (userProfileCurrentDate < autoCheckoutDateTime) {
                        const seconds = autoCheckoutDateTime.diff(
                            userProfileCurrentDate,
                            "seconds"
                        );
                        if (seconds > 0) {
                            this.autocheckoutTimeoutRef[
                                item.userCheckInDetailID
                            ] = setTimeout(() => {
                                if (this.checkedInPlaces) {
                                    this.checkedInPlaces.some(
                                        (place, placeIndex) => {
                                            if (
                                                place.userCheckInDetailID ===
                                                item.userCheckInDetailID
                                            ) {
                                                this.checkedInPlaces.splice(
                                                    placeIndex,
                                                    1
                                                );
                                                this.observablesService.publishSomeData(
                                                    EnumService.ObserverKeys
                                                        .UPDATE_CURRENT_CHECKIN_LIST_IN_COMPONENT,
                                                    {}
                                                );
                                                return true;
                                            }
                                        }
                                    );
                                }
                                setTimeout(() => {
                                    this.observablesService.publishSomeData(
                                        EnumService.ObserverKeys
                                            .REFRESH_CURRENT_CHECKIN_LIST,
                                        {}
                                    );
                                }, 1000 * 60 * 3);
                            }, seconds * 1000);
                        }
                    }
                }
            });
        }
    }

    showLimitedAccessAlert = () => {
        this.utilService.showAlert(
            "Access to this document has been limited",
            "Restricted File"
        );
    };

    /**
     * For dedicated mode
     */
    public getCurrentCheckedInEntityName = () => {
        return this.getEntityName(this.dedicatedModeLocationUse);
    };

    /**
     * For dedicated mode
     */
    public getEntityName = (deviceEntityDetail: DeviceEntityDetail) => {
        if (deviceEntityDetail?.locationID > 0) {
            return deviceEntityDetail?.locationName;
        } else if (deviceEntityDetail?.projectID > 0) {
            return deviceEntityDetail?.projectName;
        } else if (deviceEntityDetail?.inventoryItemID > 0) {
            return deviceEntityDetail?.itemName;
        }
        return "";
    };

    public getCheckinDetails = async (userId, apiService: ApiService) => {
        if (userId && this.checkInForLocation) {
            let ifAlreadyCheckedinPlace;
            if (this.checkedInPlaces) {
                this.checkedInPlaces.map((place) => {
                    const entityIds = this.utilService.getRelevantEntityId(
                        this.checkInForLocation.locationID
                    );
                    if (
                        (entityIds.InventoryID > 0 &&
                            entityIds.InventoryID === place.inventoryItemID) ||
                        (entityIds.ProjectID > 0 &&
                            entityIds.ProjectID === place.projectID) ||
                        (entityIds.LocationID > 0 &&
                            entityIds.LocationID === place.locationID)
                    ) {
                        ifAlreadyCheckedinPlace = place;
                        return;
                    }
                });
            }

            if (ifAlreadyCheckedinPlace) {
                this.checkOutForCheckedInDetail = ifAlreadyCheckedinPlace;

                this.translateService
                    .get([
                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_OUT",
                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_ARE_CHECKING_OUT",
                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_OUT_NOW",
                    ])
                    .subscribe((res) => {
                        this.navCtrl.navigateForward(["/checkinout-confirm"], {
                            queryParams: {
                                headerTitle:
                                    res[
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_OUT"
                                    ],
                                title: res[
                                    "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_ARE_CHECKING_OUT"
                                ],
                                subtitle: ifAlreadyCheckedinPlace.entityName,
                                buttonTitle:
                                    res[
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_OUT_NOW"
                                    ],
                                locationCheckType:
                                    EnumService.ConfirmForCheckType.CheckOut,
                            },
                            replaceUrl: true,
                        });
                    });
            } else {
                this.utilService.presentLoadingWithOptions();
                apiService
                    .getCheckInDetails(
                        userId,
                        this.checkInForLocation.locationID
                    )
                    .subscribe(
                        (response: Response) => {
                            this.utilService.hideLoading();
                            if (
                                response.StatusCode ===
                                EnumService.ApiResponseCode.RequestSuccessful
                            ) {
                                this.checkInDetail =
                                    response.Result as CheckinDetail;
                                this.checkInPostData = {
                                    userId,
                                    checkInLatitude:
                                        this.myCurrentGeoLocation?.coords
                                            ?.latitude,
                                    checkInLongitude:
                                        this.myCurrentGeoLocation?.coords
                                            ?.longitude,
                                    isGuestReturning: false,
                                    projectID:
                                        this.checkInDetail.checkInEntityDetail
                                            .projectID,
                                    inventoryItemID:
                                        this.checkInDetail.checkInEntityDetail
                                            .inventoryItemID,
                                    locationID:
                                        this.checkInDetail.checkInEntityDetail
                                            .locationID,
                                } as CheckInPostData;

                                this.translateService
                                    .get([
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_IN",
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_ARE_CHECKING_IN",
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_IN_NOW",
                                    ])
                                    .subscribe((res) => {
                                        this.navCtrl.navigateForward(
                                            ["/checkinout-confirm"],
                                            {
                                                queryParams: {
                                                    headerTitle:
                                                        res[
                                                            "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_IN"
                                                        ],
                                                    title: res[
                                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_ARE_CHECKING_IN"
                                                    ],
                                                    subtitle:
                                                        this.checkInForLocation
                                                            .locationName,
                                                    buttonTitle:
                                                        res[
                                                            "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.CHECK_IN_NOW"
                                                        ],
                                                    nextPageData:
                                                        JSON.stringify({
                                                            locationDetail:
                                                                JSON.stringify(
                                                                    this
                                                                        .checkInForLocation
                                                                ),
                                                        }),
                                                    nextPagePath:
                                                        "/checkin-induction",
                                                    locationCheckType:
                                                        EnumService
                                                            .ConfirmForCheckType
                                                            .CheckIn,
                                                },
                                                replaceUrl: true,
                                            }
                                        );
                                    });
                            }
                        },
                        (error: any) => {
                            const errorField =
                                error?.error?.ResponseException
                                    ?.ValidationErrors[0].Field;

                            this.utilService.hideLoading();
                            if (
                                errorField.indexOf("SimultaneousCheckIn") !== -1
                            ) {
                                this.translateService
                                    .get([
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN",
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.SIMULTANIOUS_CHECKIN_NOT_ALLOWED",
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_ARE_ALREADY_CHECKEDIN_TO_ANOTHER_PLACE",
                                    ])
                                    .subscribe((res) => {
                                        this.navCtrl.navigateForward(
                                            ["/checkin-fail"],
                                            {
                                                queryParams: {
                                                    title: res[
                                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN"
                                                    ],
                                                    errorTitle:
                                                        res[
                                                            "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.SIMULTANIOUS_CHECKIN_NOT_ALLOWED"
                                                        ],
                                                    errorMessage:
                                                        res[
                                                            "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_ARE_ALREADY_CHECKEDIN_TO_ANOTHER_PLACE"
                                                        ],
                                                    nextPage: "/tabs/dashboard",
                                                },
                                                replaceUrl: true,
                                            }
                                        );
                                    });
                            } else {
                                this.translateService
                                    .get([
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN",
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.NO_QUALIFICATION",
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_DO_NOT_HAVE_THE_REQUIRED_QUALIFICATIONS",
                                    ])
                                    .subscribe((res) => {
                                        this.navCtrl.navigateForward(
                                            ["/checkin-fail"],
                                            {
                                                queryParams: {
                                                    title: res[
                                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN"
                                                    ],
                                                    errorTitle:
                                                        res[
                                                            "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.NO_QUALIFICATION"
                                                        ],
                                                    errorMessage:
                                                        res[
                                                            "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_DO_NOT_HAVE_THE_REQUIRED_QUALIFICATIONS"
                                                        ],
                                                    nextPage: "/tabs/dashboard",
                                                },
                                                replaceUrl: true,
                                            }
                                        );
                                    });
                            }
                        }
                    );
            }
        }
    };

    /**
     * Get Checkin Details for Dedicated mode
     * @param userId temp auth user id
     * @param apiService ApiService class refrence
     * @param userPhoto userPhoto if captured and uploaded to CheckInPhotoUpload api
     * @param callBack call back to the block where it is called
     */
    public getCheckinDetailsForDedicatedMode = async (
        userId,
        apiService: ApiService,
        userPhoto = null,
        callBack = null
    ) => {
        if (userId && this.dedicatedModeLocationUse) {
            const onSuccess = (result) => {
                let canUserCheckinToLocation = true;
                if (
                    this.dedicatedModeProcessType ===
                        EnumService.DedicatedModeProcessTypes.CheckinOut &&
                    this.checkinoutDmAs === EnumService.CheckInType.QrCode
                ) {
                    const checkinDetail = result as CheckinDetail;
                    if (
                        checkinDetail &&
                        !checkinDetail.checkInEntityDetail.checkInPersonalQR
                    ) {
                        canUserCheckinToLocation = false;
                        UtilService.fireCallBack(callBack, {
                            ischeckInPersonalQRNotAllowed: true,
                        });
                    }
                }

                if (canUserCheckinToLocation) {
                    this.checkInDetail = result as CheckinDetail;
                    this.checkInPostData = {
                        userId,
                        userPhoto,
                        checkInLatitude:
                            this.myCurrentGeoLocation?.coords?.latitude,
                        checkInLongitude:
                            this.myCurrentGeoLocation?.coords?.longitude,
                        isGuestReturning: false,
                        projectID: this.dedicatedModeLocationUse.projectID,
                        inventoryItemID:
                            this.dedicatedModeLocationUse.inventoryItemID,
                        locationID: this.dedicatedModeLocationUse.locationID,
                        companyID: this.dedicatedModeDeviceDetailData
                            .companyID as any,
                    } as CheckInPostData;

                    this.processCheckinDetailsStepInitial(apiService, false);
                }
            };

            const entityId = this.utilService.getEntityIdFromId(
                this.dedicatedModeLocationUse
            );

            if (this.offlineMode) {
                this.offlineManagerService
                    .getDeviceUserCheckinDetails(
                        this.dedicatedModeLocationUse,
                        userId
                    )
                    .then(async (response: any) => {
                        onSuccess(response);
                    })
                    .catch((error) => {
                        this.processCheckInError(error, "/dashboard-dm");
                    });
            } else {
                this.utilService.presentLoadingWithOptions();
                apiService.getCheckInDetails(userId, entityId).subscribe(
                    (response: Response) => {
                        this.utilService.hideLoading();
                        if (
                            response.StatusCode ===
                            EnumService.ApiResponseCode.RequestSuccessful
                        ) {
                            onSuccess(response.Result);
                        }
                    },
                    (error: any) => {
                        this.utilService.hideLoading();
                        this.processCheckInError(error, "/dashboard-dm");
                    }
                );
            }
        }
    };

    public getCheckinDetailsGuest = (
        apiService: ApiService,
        isGuestReturning = false
    ) => {
        const entityId = this.utilService.getEntityIdFromId(
            this.dedicatedModeLocationUse
        );
        const nextScreen = this.dedicatedMode
            ? "/dashboard-dm"
            : "/tabs/dashboard";

        const dedicatedModeDeviceDetailData =
            this.dedicatedModeDeviceDetailData;
        const dedicatedModeGuestDetail = this.dedicatedModeGuestDetail;
        const dedicatedModeLocationUse = this.dedicatedModeLocationUse;

        const onSuccess = (data) => {
            this.checkInDetail = data;
            this.checkInPostData = {
                checkInLatitude: this.myCurrentGeoLocation?.coords?.latitude,
                checkInLongitude: this.myCurrentGeoLocation?.coords?.longitude,
                isGuestReturning,
                projectID: dedicatedModeLocationUse.projectID,
                inventoryItemID: dedicatedModeLocationUse.inventoryItemID,
                locationID: dedicatedModeLocationUse.locationID,
                guestPhone: dedicatedModeGuestDetail.guestPhone,
                guestFirsName: dedicatedModeGuestDetail.guestFirsName,
                guestMiddleName: dedicatedModeGuestDetail.guestMiddleName,
                guestLastName: dedicatedModeGuestDetail.guestLastName,
                guestPhotoImageVideoFileId:
                    dedicatedModeGuestDetail.guestPhotoImageVideoFileId,
                guestPhoto: dedicatedModeGuestDetail.guestPhoto,
                companyID: dedicatedModeDeviceDetailData.companyID,
            } as unknown as CheckInPostData;

            this.processCheckinDetailsStepInitial(apiService, true);
        };

        if (this.offlineMode) {
            this.offlineManagerService
                .getDeviceUserCheckinDetails(
                    this.dedicatedModeLocationUse,
                    dedicatedModeGuestDetail.guestPhone,
                    true
                )
                .then(async (response: any) => {
                    onSuccess(response);
                })
                .catch((error) => {
                    this.processCheckInError(error, nextScreen);
                });
        } else {
            this.utilService.presentLoadingWithOptions();
            apiService
                .getCheckInDetails_Guest(
                    dedicatedModeGuestDetail.guestPhone || "",
                    dedicatedModeGuestDetail.guestFirsName || "",
                    dedicatedModeGuestDetail.guestMiddleName || "",
                    dedicatedModeGuestDetail.guestLastName || "",
                    entityId
                )
                .subscribe(
                    (res: Response) => {
                        this.utilService.hideLoading();

                        if (
                            res.StatusCode ===
                            EnumService.ApiResponseCode.RequestSuccessful
                        ) {
                            onSuccess(res.Result);
                        }
                    },
                    (error) => {
                        this.utilService.hideLoading();
                        this.processCheckInError(error, nextScreen);
                    }
                );
        }
    };

    /**
     * Process checking for Dedicated mode
     * @param apiService ApiService Refrence
     * @param isGuest is CHeckin Type Guest User
     */
    processCheckinDetailsStepInitial = (apiService, isGuest) => {
        if (
            (this.checkinoutDmAs === EnumService.CheckInType.AS_GUEST &&
                this.checkInDetail?.checkInEntityDetail?.checkInGuestPhoto) ||
            (this.checkinoutDmAs === EnumService.CheckInType.MY_NAME &&
                this.checkInDetail?.checkInEntityDetail?.checkInPersonalPhoto)
        ) {
            if (this.dedicatedModeCapturedSelfieForCheckinProcess) {
                if (this.checkinoutDmAs === EnumService.CheckInType.AS_GUEST) {
                    if (this.offlineMode) {
                        this.checkInPostData.guestPhotoImageVideoFileId =
                            this.dedicatedModeCapturedSelfieForCheckinProcess;
                    } else {
                        this.checkInPostData.guestPhoto =
                            this.dedicatedModeCapturedSelfieForCheckinProcess;
                    }
                } else if (
                    this.checkinoutDmAs === EnumService.CheckInType.MY_NAME
                ) {
                    if (this.offlineMode) {
                        this.checkInPostData.userPhotoImageVideoFileId =
                            this.dedicatedModeCapturedSelfieForCheckinProcess;
                    } else {
                        this.checkInPostData.userPhoto =
                            this.dedicatedModeCapturedSelfieForCheckinProcess;
                    }
                }
                this.processCheckinDetailsStepInduction(apiService, isGuest);
            } else {
                this.dedicatedModeCapturePhotoFor =
                    EnumService.DedicatedModeCapturePhotoForType.LocationPhoto;
                this.navCtrl.navigateForward(["/checkinout-photoidentity-dm"]);
            }
        } else {
            this.processCheckinDetailsStepInduction(apiService, isGuest);
        }
    };

    processCheckinDetailsStepInduction = (apiService, isGuest) => {
        if (
            this.checkInDetail?.checkInEntityDetail?.processInduction &&
            this.checkInDetail?.checkInInductionItems?.length > 0
        ) {
            this.navCtrl.navigateForward(["checkin-induction"]);
        } else {
            this.processCheckinDetailsStepSubmit(apiService, isGuest);
        }
    };

    processCheckinDetailsStepSubmit = (apiService, isGuest) => {
        if (isGuest) {
            this.submitInductionCheckInDataGuest(apiService);
        } else {
            this.submitInductionCheckInData(apiService);
        }
    };

    uploadVideo = (selectedVideo, mimeType, callBack, progress) => {
        const accessID = this.deviceUID;
        const token = localStorage.getItem(
            EnumService.LocalStorageKeys.API_TOKEN
        );

        const url =
            this.apiBaseUrl +
            "/" +
            EnumService.ApiMethods.FormPhotoOrVideoUpload;
        const filename = selectedVideo.substr(
            selectedVideo.lastIndexOf("/") + 1
        );
        const options: FileUploadOptions = {
            fileName: filename,
            fileKey: "file",
            mimeType,
            headers: {
                accessID,
                token,
            },
        };
        this.videoFileUpload = this.fileTransfer.create();

        this.videoFileUpload
            .upload(selectedVideo, url, options)
            .then((data) => {
                UtilService.fireCallBack(progress, 0);
                return JSON.parse(data.response);
            })
            .then((data) => {
                UtilService.fireCallBack(progress, 100);
                UtilService.fireCallBack(callBack, {
                    status: true,
                    result: data,
                });
            })
            .catch((err) => {
                UtilService.fireCallBack(progress, 0);
                UtilService.fireCallBack(callBack, {
                    status: false,
                    result: err,
                });
            });
        this.videoFileUpload.onProgress((data) => {
            const uploadPercent = Math.round((data.loaded / data.total) * 100);
            UtilService.fireCallBack(progress, uploadPercent);
        });
    };

    private getUserSavedSates(callBack) {
        const userId = this.dedicatedMode
            ? this.dedicatedModeUserDetail?.userId
            : this.getLoggedInUser().userId;

        let uniqueKey = ""; // entityKey or activityId

        if (this.viewFormFor === EnumService.ViewFormForType.Activity) {
            uniqueKey = this.viewFormForActivityId;
        } else {
            if (this.dedicatedMode) {
                if (this.dedicatedModeLocationUse?.inventoryItemID) {
                    uniqueKey =
                        "inventoryItem_" +
                        this.dedicatedModeLocationUse.inventoryItemID;
                } else if (this.dedicatedModeLocationUse?.locationID) {
                    uniqueKey =
                        "locationID_" +
                        this.dedicatedModeLocationUse.locationID;
                } else if (this.dedicatedModeLocationUse?.projectID) {
                    uniqueKey =
                        "projectID_" + this.dedicatedModeLocationUse.projectID;
                }
            } else {
                if (this.currentSelectedCheckinPlace?.inventoryItemID) {
                    uniqueKey =
                        "inventoryItem_" +
                        this.currentSelectedCheckinPlace.inventoryItemID;
                } else if (this.currentSelectedCheckinPlace?.locationID) {
                    uniqueKey =
                        "locationID_" +
                        this.currentSelectedCheckinPlace.locationID;
                } else if (this.currentSelectedCheckinPlace?.projectID) {
                    uniqueKey =
                        "projectID_" +
                        this.currentSelectedCheckinPlace.projectID;
                }
            }
        }

        this.indexDbStorage
            .get(userId)
            .then((res: any) => {
                if (res) {
                    callBack(userId, uniqueKey, res);
                } else {
                    callBack(userId, uniqueKey, {});
                }
            })
            .catch(() => {
                callBack(userId, uniqueKey, {});
            });
    }
    /**
     *
     * @param index
     */
    public async removeSavedFormStateForActivity(activityId, callBack) {
        const userId = this.dedicatedMode
            ? this.dedicatedModeUserDetail?.userId
            : this.getLoggedInUser().userId;

        this.indexDbStorage
            .get(userId)
            .then((res: any) => {
                if (res) {
                    delete res[activityId];
                    this.indexDbStorage.set(userId, res);
                }
                callBack();
            })
            .catch(() => {
                callBack();
            });
    }

    /**
     *
     * @param index
     */
    public async removeSavedFormState(index: number, callBack) {
        this.getUserSavedSates((userId, uniqueKey, res) => {
            let savedForms = [];
            if (res[uniqueKey]) {
                savedForms = res[uniqueKey];
            }

            if (index >= 0) {
                savedForms.splice(index, 1);
            }

            res[uniqueKey] = savedForms;

            this.indexDbStorage.set(userId, res);

            callBack(savedForms);
        });
    }

    public async removeAllSavedFormState(callBack) {
        this.indexDbStorage
            .clear()
            .then((res: any) => {
                if (res) {
                    callBack();
                }
            })
            .catch(() => {});
    }

    /**
     * Save Uncompleted form state to indexDb for mobile and webapp
     * @param formGroup
     * @param formBuilderDetail
     * @param personalModeLoggedUser
     * @param originalCallBack
     * @param havAnswerDetail
     * @param workPermitAnswer
     */
    public async saveFormState(
        formType,
        formGroup: FormGroup,
        formBuilderDetail,
        personalModeLoggedUser: User,
        originalCallBack,
        havAnswerDetail: HavAnswerDetail = null,
        workPermitAnswer: WorkPermitAnswer = null
    ) {
        const savedStateIndex = this.savedFormStateIndex;

        const saveToIndexDb = (formAnswerData) => {
            this.getUserSavedSates((userId, uniqueKey, res) => {
                let savedForms = [];
                if (res[uniqueKey]) {
                    savedForms = res[uniqueKey];
                }

                if (savedStateIndex >= 0) {
                    savedForms[savedStateIndex].lastSave =
                        moment().toISOString();
                    savedForms[savedStateIndex].formBuilderDetail =
                        formBuilderDetail;
                    savedForms[savedStateIndex].formAnswerData = formAnswerData;
                } else {
                    savedForms.push({
                        formType,
                        formAnswerData,
                        formBuilderDetail,
                        lastSave: moment().toISOString(),
                        startSave: moment().toISOString(),
                    });
                }

                res[uniqueKey] = savedForms;

                this.indexDbStorage.set(userId, res);

                if (
                    !this.dedicatedMode &&
                    this.viewFormFor === EnumService.ViewFormForType.Activity
                ) {
                    this.utilService.presentLoadingWithOptions();
                    this.apiServiceRerence
                        .activityInProgress(userId, this.viewFormForActivityId)
                        .subscribe(
                            (res) => {
                                this.utilService.hideLoading();
                                originalCallBack && originalCallBack(true);
                            },
                            (error) => {
                                this.utilService.hideLoading();
                            }
                        );
                } else {
                    originalCallBack && originalCallBack(true);
                }
            });
        };

        this.saveSavedStateFormAnswers(
            this.apiServiceRerence,
            formGroup,
            formBuilderDetail,
            personalModeLoggedUser,
            (formAnswerData) => {
                saveToIndexDb(formAnswerData);
            },
            havAnswerDetail,
            workPermitAnswer
        );
    }

    public async saveSavedStateFormAnswers(
        apiService: ApiService,
        formGroup: FormGroup,
        formBuilderDetail,
        personalModeLoggedUser: User,
        originalCallBack,
        havAnswerDetail: HavAnswerDetail = null,
        workPermitAnswer: WorkPermitAnswer = null
    ) {
        if (!environment.isFormPreview) {
            // Prevent app sleep while submiting form
            this.insomnia.keepAwake().then(
                () => console.log("keepAwake success"),
                (error) => console.log("keepAwake error", error)
            );

            const callBack = (param1) => {
                originalCallBack(param1);

                // allow app sleep after for submiting form success or fail

                this.insomnia.allowSleepAgain().then(
                    () => console.log("success"),
                    (error) => console.log(" allowSleepAgain error", error)
                );
            };

            const sections = formBuilderDetail.sections;

            let attachmentCount = 0;
            let attachmentUploadedCount = 0;
            const attachemtUploaded = {};

            const onUploaded = () => {
                attachmentUploadedCount++;
                if (attachmentCount === attachmentUploadedCount) {
                    this.utilService.hideLoading();
                    this.submitSavedFormStateAnswers(
                        apiService,
                        formGroup,
                        formBuilderDetail,
                        personalModeLoggedUser,
                        callBack,
                        havAnswerDetail,
                        workPermitAnswer,
                        attachemtUploaded
                    );
                }
            };

            sections.map((section, sectionIndex) => {
                if (this.utilService.shouldShowSection(section)) {
                    const questions = section.questions;
                    questions.map(async (question, questionIndex) => {
                        if (this.utilService.shouldShowQuestion(question)) {
                            const controlName = UtilService.FCUniqueName(
                                section,
                                question
                            );
                            const control = formGroup.controls[controlName];

                            if (
                                question.selectedAnswerTypeId ===
                                EnumService.CustomAnswerType.PhotoVideoUpload
                            ) {
                                if (control && control.value) {
                                    attachmentCount++;

                                    let fileName =
                                        "photo" +
                                        this.utilService.getCurrentTimeStamp() +
                                        ".jpeg";
                                    let mimeType = "image/jpeg";
                                    let isVideo = false;
                                    let extension = "jpeg";

                                    // if value is base64 format then find mimetype and extension
                                    if (
                                        UtilService.IsBase64Sring(control.value)
                                    ) {
                                        try {
                                            extension =
                                                control.value.match(
                                                    /[^:/]\w+(?=;|,)/
                                                )[0];
                                            if (
                                                StaticDataService.videoFormats.indexOf(
                                                    extension.toLowerCase()
                                                ) !== -1
                                            ) {
                                                isVideo = true;
                                                fileName =
                                                    "video" +
                                                    this.utilService.getCurrentTimeStamp() +
                                                    "." +
                                                    extension;
                                                mimeType = control.value.match(
                                                    /[^:]\w+\/[\w-+\d.]+(?=;|,)/
                                                )[0];
                                            }
                                        } catch (error) {}
                                    } else {
                                        extension = control.value
                                            .split(".")
                                            .pop()
                                            .toLowerCase();
                                        if (
                                            StaticDataService.videoFormats.indexOf(
                                                extension
                                            ) !== -1
                                        ) {
                                            isVideo = true;
                                            fileName = control.value.substr(
                                                control.value.lastIndexOf("/") +
                                                    1
                                            );
                                            mimeType =
                                                StaticDataService.fileMimeTypes[
                                                    extension
                                                ];
                                        }
                                    }
                                    // --end

                                    let filePathOrBinaryData = control.value;

                                    if (
                                        UtilService.isWebApp() ||
                                        UtilService.isLocalHost()
                                    ) {
                                        attachemtUploaded[question.questionId] =
                                            filePathOrBinaryData;
                                        onUploaded();
                                    } else {
                                        this.filehandlerService.saveFileOnDevicePath(
                                            filePathOrBinaryData,
                                            StaticDataService.formStateFileFolderName,
                                            (status, res) => {
                                                if (status) {
                                                    attachemtUploaded[
                                                        question.questionId
                                                    ] = res;
                                                    onUploaded();
                                                } else {
                                                    onUploaded();
                                                }
                                            }
                                        );
                                    }
                                }
                            }
                        }
                    });
                }
            });

            if (attachmentCount === 0) {
                this.submitSavedFormStateAnswers(
                    apiService,
                    formGroup,
                    formBuilderDetail,
                    personalModeLoggedUser,
                    callBack,
                    havAnswerDetail,
                    workPermitAnswer
                );
            }
        }
    }

    private submitSavedFormStateAnswers = (
        apiService: ApiService,
        formGroup: FormGroup,
        formBuilderDetail,
        personalModeLoggedUser: User,
        callBack,
        havAnswerDetail: HavAnswerDetail = null,
        workPermitAnswer: WorkPermitAnswer = null,
        attachemtUploaded = {}
    ) => {
        const sections = formBuilderDetail.sections;
        const workPermitDetails = formBuilderDetail.workPermitDetails;
        const accidentReport = formBuilderDetail.accidentReport;
        const formVersionId = formBuilderDetail.formVersionId;

        const questionAnswers = [];
        const accidentReportQuestionAnswers = [];
        const riskAssessmentAnswers = [];
        const riskAssessmentAnswerDetails = { taskAnswers: [] };

        const selectedLanguageID = this.getLanguageIdForForm();

        const formattedSections = [];

        const userId = this.dedicatedMode
            ? this.dedicatedModeUserDetail?.userId
            : personalModeLoggedUser?.userId;
        const companyId = this.dedicatedMode
            ? this.dedicatedModeDeviceDetailData.companyID
            : personalModeLoggedUser.companyID;

        let savedStatesAnswerByFormControlName = {};

        sections.map((section, sectionIndex) => {
            if (this.utilService.shouldShowSection(section)) {
                const formattedAnswers = [];
                const sectionFormattedObject: any = JSON.parse(
                    JSON.stringify(section)
                );

                if (section.isRiskAssessmentSection) {
                    const tasks =
                        section.riskAssessmentAnswerDetails?.taskAnswers;
                    riskAssessmentAnswerDetails.taskAnswers = tasks;
                    tasks.map((task) => {
                        if (this.utilService.shouldShowQuestion(task)) {
                            const answerFormattedObject: any = JSON.parse(
                                JSON.stringify(task)
                            );
                            const hazardsAnswers = task.hazardAnswers;

                            answerFormattedObject.answerData = hazardsAnswers;
                            formattedAnswers.push(answerFormattedObject);
                        }
                    });

                    sectionFormattedObject.taskAnswerData = formattedAnswers;
                } else if (section.isHAVSection) {
                    const havAssessmentTools = section.havAssessmentTools;
                    havAssessmentTools.some((havAssessmentTool) => {
                        const questions = havAssessmentTool.questions;

                        questions.some((question, questionIndex) => {
                            const questionDisplayOrder = questionIndex + 1;
                            const questionLabel = UtilService.findObj(
                                question.questionTranslations,
                                "questionTranslationLanguageId",
                                selectedLanguageID
                            ).questionTranslationTitle;
                            const answerFormattedObject: any = JSON.parse(
                                JSON.stringify(question)
                            );

                            const havQuestionAnswerObject: HavAnswerObject = {
                                hAVQuestionAnswerId: 0,
                                questionID: question.questionId,
                                questionTitle: questionLabel,
                                formVersionID: formVersionId,
                                answerTypeID: question.selectedAnswerTypeId,
                                hAVSequence: question.questionDisplayOrder,
                                [EnumService.QuestionLogic.ActionTypeForForm
                                    .MarkAsFailed]:
                                    question[
                                        EnumService.QuestionLogic
                                            .ActionTypeForForm.MarkAsFailed
                                    ],
                                [EnumService.QuestionLogic.ActionTypeForForm
                                    .Notify]:
                                    question[
                                        EnumService.QuestionLogic
                                            .ActionTypeForForm.Notify
                                    ],
                                [EnumService.QuestionLogic.ActionTypeForForm
                                    .CreateNewActivity]:
                                    question[
                                        EnumService.QuestionLogic
                                            .ActionTypeForForm.CreateNewActivity
                                    ],
                            };

                            let isValueFilled = false;
                            switch (questionDisplayOrder) {
                                case EnumService.HavFormFieldOrder.DateOfUsage:
                                    if (question.value) {
                                        havQuestionAnswerObject.dateOfUsage =
                                            moment(question.value).format(
                                                StaticDataService.dateFormat
                                            );
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder.Manufacturer:
                                    if (question.value) {
                                        havQuestionAnswerObject.hAVManufacturerID =
                                            question.value;
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder.Type:
                                    if (question.value) {
                                        havQuestionAnswerObject.hAVTypeID =
                                            question.value;
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder.Model:
                                    if (question.value) {
                                        havQuestionAnswerObject.hAVModelID =
                                            question.value;
                                        havQuestionAnswerObject.inventoryItemID =
                                            question.inventoryItemID;
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder
                                    .PlannedTimeOfUsage:
                                    if (question.value) {
                                        isValueFilled = true;
                                        havQuestionAnswerObject.plannedTimeOfUse =
                                            Number(question.value);
                                    }
                                    break;
                            }

                            if (isValueFilled) {
                                answerFormattedObject.havAnswerData =
                                    havQuestionAnswerObject;
                                formattedAnswers.push(answerFormattedObject);
                            }
                        });
                    });

                    sectionFormattedObject.answerData = formattedAnswers;
                } else {
                    const questions = section.questions;

                    questions.map((question, questionIndex) => {
                        const questionDisplayOrder = questionIndex + 1;
                        if (this.utilService.shouldShowQuestion(question)) {
                            const answerFormattedObject: any = JSON.parse(
                                JSON.stringify(question)
                            );
                            const controlName = UtilService.FCUniqueName(
                                section,
                                question
                            );
                            const control = formGroup.controls[controlName];
                            let isValueFilled = false;

                            if (control) {
                                const questionLabel = UtilService.findObj(
                                    question.questionTranslations,
                                    "questionTranslationLanguageId",
                                    selectedLanguageID
                                ).questionTranslationTitle;

                                if (section.isAccidentReportSection) {
                                    const answerObject: ArAnswerObject = {
                                        accidentReportQuestionAnswerId: 0,
                                        questionID: question.questionId,
                                        questionTitle: questionLabel,
                                        formVersionID: formVersionId,
                                        answerTypeID:
                                            question.selectedAnswerTypeId,
                                        accidentAnswerSequence:
                                            question.questionDisplayOrder,
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm.MarkAsFailed]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm
                                                    .MarkAsFailed
                                            ],
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm.Notify]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm.Notify
                                            ],
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm
                                            .CreateNewActivity]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm
                                                    .CreateNewActivity
                                            ],
                                    };

                                    switch (questionDisplayOrder) {
                                        case EnumService.AccidentFormFieldOrder
                                            .AccidentDateTime:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentDateTime =
                                                    moment(
                                                        control.value
                                                    ).format(
                                                        StaticDataService.dateTimeFormat
                                                    );
                                            }

                                            savedStatesAnswerByFormControlName[
                                                controlName
                                            ] = control.value;
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .AccidentLocation:
                                            const placeNotintheList =
                                                formGroup.controls
                                                    .placeNotintheList;
                                            const locationName =
                                                formGroup.controls.locationName;

                                            if (placeNotintheList.value) {
                                                isValueFilled = true;
                                                answerObject.accidentLocationName =
                                                    locationName.value;

                                                savedStatesAnswerByFormControlName[
                                                    EnumService.AccidentCustomLocationControlsName.PlaceNotintheList
                                                ] = placeNotintheList.value;
                                                savedStatesAnswerByFormControlName[
                                                    EnumService.AccidentCustomLocationControlsName.LocationName
                                                ] = locationName.value;
                                            } else if (control.value) {
                                                isValueFilled = true;
                                                const entityIds =
                                                    this.utilService.getRelevantEntityId(
                                                        control.value
                                                    );
                                                answerObject.accidentInventoryID =
                                                    entityIds.InventoryID;
                                                answerObject.accidentProjectID =
                                                    entityIds.ProjectID;
                                                answerObject.accidentLocationID =
                                                    entityIds.LocationID;

                                                savedStatesAnswerByFormControlName[
                                                    controlName
                                                ] = control.value;
                                            }
                                            break;

                                        case EnumService.AccidentFormFieldOrder
                                            .About:
                                            const formGroups =
                                                control.value as FormGroup;
                                            const multipleChoiceValueIDs = [];
                                            const multipleChoiceValueAnswer =
                                                {};
                                            question.answerChoiceAttributes.map(
                                                (choice) => {
                                                    const subControlName =
                                                        UtilService.SubFCName(
                                                            controlName,
                                                            choice.answerChoiceAttributeId
                                                        );
                                                    const choiceControl =
                                                        formGroups[
                                                            subControlName
                                                        ];
                                                    if (choiceControl) {
                                                        multipleChoiceValueIDs.push(
                                                            choice.answerChoiceAttributeId
                                                        );
                                                        multipleChoiceValueAnswer[
                                                            subControlName
                                                        ] = true;
                                                    }
                                                }
                                            );
                                            if (
                                                multipleChoiceValueIDs.length >
                                                0
                                            ) {
                                                isValueFilled = true;
                                                answerObject.accidentAboutIDs =
                                                    multipleChoiceValueIDs.join(
                                                        ","
                                                    );
                                            }

                                            savedStatesAnswerByFormControlName[
                                                controlName
                                            ] = multipleChoiceValueAnswer;
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Type:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentTypeID =
                                                    control.value;
                                                savedStatesAnswerByFormControlName[
                                                    controlName
                                                ] = control.value;
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Classification:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentClassificationID =
                                                    control.value;
                                                savedStatesAnswerByFormControlName[
                                                    controlName
                                                ] = control.value;
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .BodyPartEffected:
                                            const bodyPartFormGroups =
                                                control.value as FormGroup;
                                            const bodyPartsIDs = [];

                                            const selectedBodyPartsValue = {};
                                            StaticDataService.bodyParts.map(
                                                (partGroup) => {
                                                    partGroup.parts.map(
                                                        (part) => {
                                                            const subControlName =
                                                                UtilService.SubFCName(
                                                                    controlName,
                                                                    part.id
                                                                );

                                                            const choiceControl =
                                                                bodyPartFormGroups[
                                                                    subControlName
                                                                ];
                                                            if (choiceControl) {
                                                                bodyPartsIDs.push(
                                                                    part.id
                                                                );

                                                                selectedBodyPartsValue[
                                                                    subControlName
                                                                ] = true;
                                                            }
                                                        }
                                                    );
                                                }
                                            );
                                            if (bodyPartsIDs.length > 0) {
                                                isValueFilled = true;
                                                answerObject.accidentBodyPartIDs =
                                                    bodyPartsIDs.join(",");
                                                savedStatesAnswerByFormControlName[
                                                    controlName
                                                ] = selectedBodyPartsValue;
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Description:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentDescription =
                                                    control.value;
                                                savedStatesAnswerByFormControlName[
                                                    controlName
                                                ] = control.value;
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Attachment:
                                            if (
                                                attachemtUploaded[
                                                    question.questionId
                                                ]
                                            ) {
                                                isValueFilled = true;
                                                if (this.offlineMode) {
                                                    answerObject.accidentAttachmentFileId =
                                                        attachemtUploaded[
                                                            question.questionId
                                                        ];
                                                } else {
                                                    answerObject.accidentAttachmentFileName =
                                                        attachemtUploaded[
                                                            question.questionId
                                                        ];
                                                }

                                                savedStatesAnswerByFormControlName[
                                                    controlName
                                                ] =
                                                    attachemtUploaded[
                                                        question.questionId
                                                    ];
                                            }
                                            break;
                                    }

                                    if (isValueFilled) {
                                        accidentReportQuestionAnswers.push(
                                            answerObject
                                        );
                                        answerFormattedObject.arAnswerData =
                                            answerObject;
                                    }
                                } else {
                                    switch (question.selectedAnswerTypeId) {
                                        case EnumService.CustomAnswerType
                                            .ClassicDropdown:

                                        case EnumService.CustomAnswerType
                                            .SingleLineText:
                                        case EnumService.CustomAnswerType
                                            .MultiLineText:
                                        case EnumService.CustomAnswerType
                                            .SingleChoiceSet:
                                        case EnumService.CustomAnswerType
                                            .ConfirmationBox:
                                        case EnumService.CustomAnswerType
                                            .ScanQrCodeField:
                                        case EnumService.CustomAnswerType
                                            .NumberFieldInteger:
                                        case EnumService.CustomAnswerType
                                            .NumberFieldDecimal:
                                        case EnumService.CustomAnswerType
                                            .DateField:
                                        case EnumService.CustomAnswerType
                                            .TimeField:
                                        case EnumService.CustomAnswerType
                                            .DateTimeField:
                                            savedStatesAnswerByFormControlName[
                                                controlName
                                            ] = control.value;
                                            break;

                                        case EnumService.CustomAnswerType
                                            .MultipleChoiceSet:
                                            const formGroups =
                                                control.value as FormGroup;
                                            const subValues = {};
                                            question.answerChoiceAttributes.map(
                                                (choice) => {
                                                    const choiceControl =
                                                        formGroups[
                                                            UtilService.SubFCName(
                                                                controlName,
                                                                choice.answerChoiceAttributeId
                                                            )
                                                        ];

                                                    subValues[
                                                        UtilService.SubFCName(
                                                            controlName,
                                                            choice.answerChoiceAttributeId
                                                        )
                                                    ] = choiceControl
                                                        ? true
                                                        : false;
                                                }
                                            );

                                            savedStatesAnswerByFormControlName[
                                                controlName
                                            ] = subValues;
                                            break;

                                        case EnumService.CustomAnswerType
                                            .Matrix3DField:
                                            savedStatesAnswerByFormControlName[
                                                controlName
                                            ] = control.value;

                                            break;

                                        case EnumService.CustomAnswerType
                                            .PhotoVideoUpload:
                                            if (
                                                attachemtUploaded[
                                                    question.questionId
                                                ]
                                            ) {
                                                savedStatesAnswerByFormControlName[
                                                    controlName
                                                ] =
                                                    attachemtUploaded[
                                                        question.questionId
                                                    ];
                                            }
                                            break;
                                    }

                                    // if additional comment
                                    if (question.shouldShowOptionalComment) {
                                        const additionalControl =
                                            formGroup.controls[
                                                UtilService.FCNameAdditioanlNoteUq(
                                                    controlName
                                                )
                                            ];
                                        if (additionalControl.value) {
                                            savedStatesAnswerByFormControlName[
                                                UtilService.FCNameAdditioanlNoteUq(
                                                    controlName
                                                )
                                            ] = additionalControl.value;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });

        callBack(savedStatesAnswerByFormControlName);
    };
    /**
     * getSavedFormStates
     */
    public getSavedFormStates(callBack) {
        this.getUserSavedSates((userId, uniqueKey, res) => {
            let savedForms = [];
            if (res[uniqueKey]) {
                savedForms = res[uniqueKey];
            }

            callBack(savedForms);
        });
    }

    public async saveFormAnswers({
        apiService,
        formGroup,
        formBuilderDetail,
        personalModeLoggedUser,
        originalCallBack,
        havAnswerDetail = null,
        workPermitAnswer = null,
        isGenerateTestJsonFile = false,
    }: {
        apiService: ApiService;
        formGroup: FormGroup;
        formBuilderDetail: any;
        personalModeLoggedUser: User;
        originalCallBack: any;
        havAnswerDetail?: HavAnswerDetail;
        workPermitAnswer?: WorkPermitAnswer;
        isGenerateTestJsonFile?: boolean;
    }) {
        if (!environment.isFormPreview) {
            // Prevent app sleep while submiting form
            this.insomnia.keepAwake().then(
                () => console.log("keepAwake success"),
                (error) => console.log("keepAwake error", error)
            );

            const callBack = (param1, param2) => {
                originalCallBack(param1, param2);

                // allow app sleep after for submiting form success or fail

                this.insomnia.allowSleepAgain().then(
                    () => console.log("success"),
                    (error) => console.log(" allowSleepAgain error", error)
                );
            };

            const sections = formBuilderDetail.sections;

            let requiredFieldsCount = 0;
            let requiredFieldsValidCount = 0;

            let filledFieldsCount = 0;
            let filledFieldsValidCount = 0;

            if (sections) {
                sections.map((section, sectionIndex) => {
                    if (this.utilService.shouldShowSection(section)) {
                        if (section.isRiskAssessmentSection) {
                            const tasks =
                                section.riskAssessmentAnswerDetails
                                    ?.taskAnswers;
                            tasks.map((task) => {
                                if (task.isRequired) {
                                    requiredFieldsCount++;
                                    const hazards = task.hazardAnswers;
                                    let isValid = true;
                                    if (!task.taskAnswerTitle) {
                                        isValid = false;
                                    }
                                    hazards.map((hazard) => {
                                        if (!hazard.hazardAnswerTitle) {
                                            isValid = false;
                                        }
                                        if (
                                            !hazard.riskRatingSeverityID ||
                                            !hazard.riskRatingProbabilityID
                                        ) {
                                            isValid = false;
                                        }
                                        if (
                                            !hazard.residualRiskRatingSeverityID ||
                                            !hazard.residualRiskRatingProbabilityID
                                        ) {
                                            isValid = false;
                                        }

                                        if (hazard.isMembersOfTheWorkForce) {
                                            if (
                                                !hazard.isMembersOfTheWorkForceUserIDs &&
                                                !hazard.isMembersOfTheWorkForceUserGroupIDs
                                            ) {
                                                isValid = false;
                                            }
                                            if (
                                                hazard.hasPersonnelExposedNotification
                                            ) {
                                                if (
                                                    !hazard.personnelExposedNotificationUserIDs &&
                                                    !hazard.personnelExposedNotificationUserGroupIDs
                                                ) {
                                                    isValid = false;
                                                }
                                            }
                                        }

                                        if (hazard.isMembersOfThePublic) {
                                            if (
                                                !hazard.membersOfThePublicDescription
                                            ) {
                                                isValid = false;
                                            }
                                        }

                                        const controlMeasures =
                                            hazard.controlMeasureAnswers;
                                        if (
                                            controlMeasures &&
                                            controlMeasures.length > 0
                                        ) {
                                            controlMeasures.map(
                                                (controlMeasure) => {
                                                    if (
                                                        !controlMeasure.controlMeasureAnswerTitle
                                                    ) {
                                                        isValid = false;
                                                    }
                                                }
                                            );
                                        } else {
                                            isValid = false;
                                        }
                                    });
                                    if (isValid) {
                                        requiredFieldsValidCount++;
                                        filledFieldsCount++;
                                    }
                                }
                            });
                        } else if (section.isHAVSection) {
                            requiredFieldsCount++;
                            filledFieldsCount++;
                            requiredFieldsValidCount++;
                            //skip
                        } else {
                            const questions = section.questions;
                            questions.map((question, questionIndex) => {
                                if (
                                    this.utilService.shouldShowQuestion(
                                        question
                                    )
                                ) {
                                    const controlName =
                                        UtilService.FCUniqueName(
                                            section,
                                            question
                                        );
                                    const control =
                                        formGroup.controls[controlName];
                                    if (question.questionIsRequired) {
                                        requiredFieldsCount++;
                                    }

                                    if (
                                        question.selectedAnswerTypeId ===
                                        EnumService.CustomAnswerType
                                            .MultipleChoiceSet
                                    ) {
                                        const formGroups =
                                            control.value as FormGroup;
                                        const multipleChoiceValueIDs = [];
                                        question.answerChoiceAttributes.map(
                                            (choice) => {
                                                const choiceControl =
                                                    formGroups[
                                                        UtilService.SubFCName(
                                                            controlName,
                                                            choice.answerChoiceAttributeId
                                                        )
                                                    ];
                                                if (choiceControl) {
                                                    multipleChoiceValueIDs.push(
                                                        choice.answerChoiceAttributeId
                                                    );
                                                }
                                            }
                                        );
                                        if (multipleChoiceValueIDs.length > 0) {
                                            filledFieldsCount++;
                                            filledFieldsValidCount++;
                                            if (question.questionIsRequired) {
                                                requiredFieldsValidCount++;
                                            }
                                        }
                                    } else {
                                        if (control.value) {
                                            filledFieldsCount++;
                                            if (control.valid) {
                                                filledFieldsValidCount++;
                                                if (
                                                    question.questionIsRequired
                                                ) {
                                                    requiredFieldsValidCount++;
                                                }
                                            }
                                        } else if (
                                            section.isAccidentReportSection &&
                                            question.selectedAnswerTypeId ===
                                                EnumService.CustomAnswerType
                                                    .LocationSelection
                                        ) {
                                            const locationNameControl =
                                                formGroup.controls[
                                                    EnumService
                                                        .AccidentCustomLocationControlsName
                                                        .LocationName
                                                ];
                                            if (
                                                locationNameControl.value &&
                                                locationNameControl.valid
                                            ) {
                                                if (
                                                    question.questionIsRequired
                                                ) {
                                                    requiredFieldsValidCount++;
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }

            if (
                formGroup.valid &&
                requiredFieldsCount === requiredFieldsValidCount &&
                filledFieldsCount > 0
            ) {
                let uploadStartedIndex = -1;
                let attachmentCount = 0;
                let attachmentUploadedCount = 0;
                const attachemtUploaded = {};

                let loading;

                let fileToBeUploads = [];

                const uploadImageVideoFile = (index) => {
                    if (fileToBeUploads.length > index) {
                        const data = fileToBeUploads[index];
                        if (data.isVideo && !UtilService.isWebApp()) {
                            this.uploadVideo(
                                data.file,
                                data.mimeType,
                                (response) => {
                                    console.log(
                                        "Uploaded " +
                                            " " +
                                            data.fileName +
                                            "" +
                                            response
                                    );
                                    if (response.status) {
                                        attachemtUploaded[data.questionId] =
                                            response.result.Result;
                                    }
                                    onUploaded();
                                },
                                (progress) => {
                                    console.log(
                                        "Progress " +
                                            " " +
                                            data.fileName +
                                            "" +
                                            progress
                                    );
                                }
                            );
                        } else {
                            apiService
                                .formPhotoOrVideoUpload(
                                    data.file,
                                    data.fileName
                                )
                                .subscribe(
                                    (response: Response) => {
                                        attachemtUploaded[data.questionId] =
                                            response.Result;

                                        onUploaded();
                                    },
                                    (error) => {
                                        onUploaded();
                                    }
                                );
                        }
                    }
                };

                const onUploaded = () => {
                    attachmentUploadedCount++;
                    if (attachmentCount === attachmentUploadedCount) {
                        loading = false;
                        this.utilService.hideLoading();
                        this.submitFormAnswers(
                            apiService,
                            formGroup,
                            formBuilderDetail,
                            personalModeLoggedUser,
                            callBack,
                            havAnswerDetail,
                            workPermitAnswer,
                            attachemtUploaded,
                            isGenerateTestJsonFile
                        );
                    } else {
                        if (!this.offlineMode) {
                            uploadImageVideoFile(attachmentUploadedCount);
                        }
                    }
                };

                sections.map((section, sectionIndex) => {
                    if (this.utilService.shouldShowSection(section)) {
                        const questions = section.questions;
                        questions.map(async (question, questionIndex) => {
                            if (this.utilService.shouldShowQuestion(question)) {
                                const controlName = UtilService.FCUniqueName(
                                    section,
                                    question
                                );
                                const control = formGroup.controls[controlName];

                                if (
                                    question.selectedAnswerTypeId ===
                                    EnumService.CustomAnswerType
                                        .PhotoVideoUpload
                                ) {
                                    if (control && control.value) {
                                        attachmentCount++;

                                        let fileName =
                                            "photo" +
                                            this.utilService.getCurrentTimeStamp() +
                                            ".jpeg";
                                        let mimeType = "image/jpeg";
                                        let isVideo = false;
                                        let extension = "jpeg";

                                        // if value is base64 format then find mimetype and extension
                                        if (
                                            UtilService.IsBase64Sring(
                                                control.value
                                            )
                                        ) {
                                            try {
                                                extension =
                                                    control.value.match(
                                                        /[^:/]\w+(?=;|,)/
                                                    )[0];
                                                if (
                                                    StaticDataService.videoFormats.indexOf(
                                                        extension.toLowerCase()
                                                    ) !== -1
                                                ) {
                                                    isVideo = true;
                                                    fileName =
                                                        "video" +
                                                        this.utilService.getCurrentTimeStamp() +
                                                        "." +
                                                        extension;
                                                    mimeType =
                                                        control.value.match(
                                                            /[^:]\w+\/[\w-+\d.]+(?=;|,)/
                                                        )[0];
                                                }
                                            } catch (error) {}
                                        } else {
                                            extension = control.value
                                                .split(".")
                                                .pop()
                                                .toLowerCase();
                                            if (
                                                StaticDataService.videoFormats.indexOf(
                                                    extension
                                                ) !== -1
                                            ) {
                                                isVideo = true;
                                                fileName = control.value.substr(
                                                    control.value.lastIndexOf(
                                                        "/"
                                                    ) + 1
                                                );
                                                mimeType =
                                                    StaticDataService
                                                        .fileMimeTypes[
                                                        extension
                                                    ];
                                            }
                                        }
                                        // --end

                                        if (this.offlineMode) {
                                            const insertImageVideoFileToDb = (
                                                offlineFileName
                                            ) => {
                                                this.offlineManagerService
                                                    .insertImageVideoFile({
                                                        fileName:
                                                            offlineFileName,
                                                        fileUsedIn: "form",
                                                    })
                                                    .then((res) => {
                                                        attachemtUploaded[
                                                            question.questionId
                                                        ] = res;
                                                        onUploaded();
                                                    })
                                                    .catch((error) => {
                                                        onUploaded();
                                                    });
                                            };

                                            let filePathOrBinaryData =
                                                control.value;

                                            this.filehandlerService.saveFileOnDevice(
                                                filePathOrBinaryData,
                                                (status, res) => {
                                                    if (status) {
                                                        insertImageVideoFileToDb(
                                                            res
                                                        );
                                                    } else {
                                                        onUploaded();
                                                    }
                                                }
                                            );
                                        } else {
                                            if (isVideo) {
                                                this.utilService
                                                    .dataUriToFile(
                                                        control.value,
                                                        fileName,
                                                        mimeType
                                                    )
                                                    .then(async (file) => {
                                                        if (!loading) {
                                                            this.utilService.presentLoadingWithOptions();
                                                            loading = true;
                                                        }

                                                        fileToBeUploads.push({
                                                            file,
                                                            mimeType,
                                                            fileName,
                                                            isVideo,
                                                            questionId:
                                                                question.questionId,
                                                        });

                                                        if (
                                                            uploadStartedIndex ===
                                                            -1
                                                        ) {
                                                            uploadStartedIndex = 0;
                                                            uploadImageVideoFile(
                                                                0
                                                            );
                                                        }
                                                    })
                                                    .catch(() => {
                                                        onUploaded();
                                                    });
                                            } else {
                                                const uploadImage = (file) => {
                                                    if (!loading) {
                                                        this.utilService.presentLoadingWithOptions();
                                                        loading = true;
                                                    }

                                                    fileToBeUploads.push({
                                                        file,
                                                        fileName,
                                                        questionId:
                                                            question.questionId,
                                                    });

                                                    if (
                                                        uploadStartedIndex ===
                                                        -1
                                                    ) {
                                                        uploadStartedIndex = 0;
                                                        uploadImageVideoFile(0);
                                                    }
                                                };

                                                const imageUrlOrBase64 =
                                                    control.value;
                                                if (
                                                    UtilService.IsBase64Sring(
                                                        imageUrlOrBase64
                                                    )
                                                ) {
                                                    this.utilService
                                                        .dataUriToFile(
                                                            imageUrlOrBase64,
                                                            fileName,
                                                            mimeType
                                                        )
                                                        .then(async (file) => {
                                                            uploadImage(file);
                                                        })
                                                        .catch(() => {
                                                            onUploaded();
                                                        });
                                                } else {
                                                    const response =
                                                        await fetch(
                                                            Capacitor.convertFileSrc(
                                                                imageUrlOrBase64
                                                            )
                                                        );
                                                    const file =
                                                        await response.blob();
                                                    uploadImage(file);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                });

                if (attachmentCount === 0) {
                    this.submitFormAnswers(
                        apiService,
                        formGroup,
                        formBuilderDetail,
                        personalModeLoggedUser,
                        callBack,
                        havAnswerDetail,
                        workPermitAnswer,
                        {},
                        isGenerateTestJsonFile
                    );
                }
            } else if (requiredFieldsCount === 0 && filledFieldsCount === 0) {
                this.translateService
                    .get(
                        "SHARED_TEXT.ERRORS.ATLEAST_ONE_ANSWER_TO_BE_FILLED_IN"
                    )
                    .subscribe((res) => {
                        const errorMessage = res;
                        callBack(false, errorMessage);
                    });
            } else if (requiredFieldsValidCount === 0) {
                this.translateService
                    .get("SHARED_TEXT.ERRORS.ENTER_VALID_DATA")
                    .subscribe((res) => {
                        const errorMessage = res;
                        callBack(false, errorMessage);
                    });
            } else {
                const missingFieldCount =
                    requiredFieldsCount - requiredFieldsValidCount;
                if (
                    missingFieldCount === 0 &&
                    filledFieldsCount !== filledFieldsValidCount
                ) {
                    this.translateService
                        .get(
                            "SHARED_TEXT.ERRORS.INCORRECT_DATA_FOUND_PLS_CHECK_ANSWERS"
                        )
                        .subscribe((res) => {
                            const errorMessage = res;
                            callBack(false, errorMessage);
                        });
                } else {
                    this.translateService
                        .get("SHARED_TEXT.ERRORS.REQUIRED_FIELDS_NEED_TO_FILL")
                        .subscribe((res) => {
                            const errorMessage = missingFieldCount + " " + res;
                            callBack(false, errorMessage);
                        });
                }
            }
        }
    }

    private submitFormAnswers = (
        apiService: ApiService,
        formGroup: FormGroup,
        formBuilderDetail,
        personalModeLoggedUser: User,
        callBack,
        havAnswerDetail: HavAnswerDetail = null,
        workPermitAnswer: WorkPermitAnswer = null,
        attachemtUploaded = {},
        isGenerateTestJsonFile = false
    ) => {
        const sections = formBuilderDetail.sections;
        const workPermitDetails = formBuilderDetail.workPermitDetails;
        const accidentReport = formBuilderDetail.accidentReport;
        const formVersionId = formBuilderDetail.formVersionId;

        const questionAnswers = [];
        const accidentReportQuestionAnswers = [];
        const riskAssessmentAnswers = [];
        const riskAssessmentAnswerDetails = { taskAnswers: [] };

        const selectedLanguageID = this.getLanguageIdForForm();

        const formattedSections = [];

        const userId = this.dedicatedMode
            ? this.dedicatedModeUserDetail?.userId
            : personalModeLoggedUser?.userId;
        const companyId = this.dedicatedMode
            ? this.dedicatedModeDeviceDetailData.companyID
            : personalModeLoggedUser.companyID;

        sections.map((section, sectionIndex) => {
            if (this.utilService.shouldShowSection(section)) {
                const formattedAnswers = [];
                const sectionFormattedObject: any = JSON.parse(
                    JSON.stringify(section)
                );

                if (section.isRiskAssessmentSection) {
                    const tasks =
                        section.riskAssessmentAnswerDetails?.taskAnswers;
                    riskAssessmentAnswerDetails.taskAnswers = tasks;
                    tasks.map((task) => {
                        if (this.utilService.shouldShowQuestion(task)) {
                            const answerFormattedObject: any = JSON.parse(
                                JSON.stringify(task)
                            );
                            const hazardsAnswers = task.hazardAnswers;

                            answerFormattedObject.answerData = hazardsAnswers;
                            formattedAnswers.push(answerFormattedObject);
                        }
                    });

                    sectionFormattedObject.taskAnswerData = formattedAnswers;
                } else if (section.isHAVSection) {
                    const havAssessmentTools = section.havAssessmentTools;
                    havAssessmentTools.some((havAssessmentTool) => {
                        const questions = havAssessmentTool.questions;

                        questions.some((question, questionIndex) => {
                            const questionDisplayOrder = questionIndex + 1;
                            const questionLabel = UtilService.findObj(
                                question.questionTranslations,
                                "questionTranslationLanguageId",
                                selectedLanguageID
                            ).questionTranslationTitle;
                            const answerFormattedObject: any = JSON.parse(
                                JSON.stringify(question)
                            );

                            const havQuestionAnswerObject: HavAnswerObject = {
                                hAVQuestionAnswerId: 0,
                                questionID: question.questionId,
                                questionTitle: questionLabel,
                                formVersionID: formVersionId,
                                answerTypeID: question.selectedAnswerTypeId,
                                hAVSequence: question.questionDisplayOrder,
                                [EnumService.QuestionLogic.ActionTypeForForm
                                    .MarkAsFailed]:
                                    question[
                                        EnumService.QuestionLogic
                                            .ActionTypeForForm.MarkAsFailed
                                    ],
                                [EnumService.QuestionLogic.ActionTypeForForm
                                    .Notify]:
                                    question[
                                        EnumService.QuestionLogic
                                            .ActionTypeForForm.Notify
                                    ],
                                [EnumService.QuestionLogic.ActionTypeForForm
                                    .CreateNewActivity]:
                                    question[
                                        EnumService.QuestionLogic
                                            .ActionTypeForForm.CreateNewActivity
                                    ],
                            };

                            let isValueFilled = false;
                            switch (questionDisplayOrder) {
                                case EnumService.HavFormFieldOrder.DateOfUsage:
                                    if (question.value) {
                                        havQuestionAnswerObject.dateOfUsage =
                                            moment(question.value).format(
                                                StaticDataService.dateFormat
                                            );
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder.Manufacturer:
                                    if (question.value) {
                                        havQuestionAnswerObject.hAVManufacturerID =
                                            question.value;
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder.Type:
                                    if (question.value) {
                                        havQuestionAnswerObject.hAVTypeID =
                                            question.value;
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder.Model:
                                    if (question.value) {
                                        havQuestionAnswerObject.hAVModelID =
                                            question.value;
                                        havQuestionAnswerObject.inventoryItemID =
                                            question.inventoryItemID;
                                        isValueFilled = true;
                                    }
                                    break;
                                case EnumService.HavFormFieldOrder
                                    .PlannedTimeOfUsage:
                                    if (question.value) {
                                        isValueFilled = true;
                                        havQuestionAnswerObject.plannedTimeOfUse =
                                            Number(question.value);
                                    }
                                    break;
                            }

                            if (isValueFilled) {
                                answerFormattedObject.havAnswerData =
                                    havQuestionAnswerObject;
                                formattedAnswers.push(answerFormattedObject);
                            }
                        });
                    });

                    sectionFormattedObject.answerData = formattedAnswers;
                } else {
                    const questions = section.questions;

                    questions.map((question, questionIndex) => {
                        const questionDisplayOrder = questionIndex + 1;
                        if (this.utilService.shouldShowQuestion(question)) {
                            const answerFormattedObject: any = JSON.parse(
                                JSON.stringify(question)
                            );
                            const controlName = UtilService.FCUniqueName(
                                section,
                                question
                            );
                            const control = formGroup.controls[controlName];
                            let isValueFilled = false;

                            if (control) {
                                const questionLabel = UtilService.findObj(
                                    question.questionTranslations,
                                    "questionTranslationLanguageId",
                                    selectedLanguageID
                                ).questionTranslationTitle;

                                if (section.isAccidentReportSection) {
                                    const answerObject: ArAnswerObject = {
                                        accidentReportQuestionAnswerId: 0,
                                        questionID: question.questionId,
                                        questionTitle: questionLabel,
                                        formVersionID: formVersionId,
                                        answerTypeID:
                                            question.selectedAnswerTypeId,
                                        accidentAnswerSequence:
                                            question.questionDisplayOrder,
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm.MarkAsFailed]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm
                                                    .MarkAsFailed
                                            ],
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm.Notify]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm.Notify
                                            ],
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm
                                            .CreateNewActivity]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm
                                                    .CreateNewActivity
                                            ],
                                    };

                                    switch (questionDisplayOrder) {
                                        case EnumService.AccidentFormFieldOrder
                                            .AccidentDateTime:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentDateTime =
                                                    moment(
                                                        control.value
                                                    ).format(
                                                        StaticDataService.dateTimeFormat
                                                    );
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .AccidentLocation:
                                            const placeNotintheList =
                                                formGroup.controls
                                                    .placeNotintheList;
                                            const locationName =
                                                formGroup.controls.locationName;

                                            if (placeNotintheList.value) {
                                                isValueFilled = true;
                                                answerObject.accidentLocationName =
                                                    locationName.value;
                                            } else if (control.value) {
                                                isValueFilled = true;
                                                const entityIds =
                                                    this.utilService.getRelevantEntityId(
                                                        control.value
                                                    );
                                                answerObject.accidentInventoryID =
                                                    entityIds.InventoryID;
                                                answerObject.accidentProjectID =
                                                    entityIds.ProjectID;
                                                answerObject.accidentLocationID =
                                                    entityIds.LocationID;
                                            }
                                            break;

                                        case EnumService.AccidentFormFieldOrder
                                            .About:
                                            const formGroups =
                                                control.value as FormGroup;
                                            const multipleChoiceValueIDs = [];
                                            question.answerChoiceAttributes.map(
                                                (choice) => {
                                                    const choiceControl =
                                                        formGroups[
                                                            UtilService.SubFCName(
                                                                controlName,
                                                                choice.answerChoiceAttributeId
                                                            )
                                                        ];
                                                    if (choiceControl) {
                                                        multipleChoiceValueIDs.push(
                                                            choice.answerChoiceAttributeId
                                                        );
                                                    }
                                                }
                                            );
                                            if (
                                                multipleChoiceValueIDs.length >
                                                0
                                            ) {
                                                isValueFilled = true;
                                                answerObject.accidentAboutIDs =
                                                    multipleChoiceValueIDs.join(
                                                        ","
                                                    );
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Type:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentTypeID =
                                                    control.value;
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Classification:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentClassificationID =
                                                    control.value;
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .BodyPartEffected:
                                            const bodyPartFormGroups =
                                                control.value as FormGroup;
                                            const bodyPartsIDs = [];
                                            StaticDataService.bodyParts.map(
                                                (partGroup) => {
                                                    partGroup.parts.map(
                                                        (part) => {
                                                            const choiceControl =
                                                                bodyPartFormGroups[
                                                                    UtilService.SubFCName(
                                                                        controlName,
                                                                        part.id
                                                                    )
                                                                ];
                                                            if (choiceControl) {
                                                                bodyPartsIDs.push(
                                                                    part.id
                                                                );
                                                            }
                                                        }
                                                    );
                                                }
                                            );
                                            if (bodyPartsIDs.length > 0) {
                                                isValueFilled = true;
                                                answerObject.accidentBodyPartIDs =
                                                    bodyPartsIDs.join(",");
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Description:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.accidentDescription =
                                                    control.value;
                                            }
                                            break;
                                        case EnumService.AccidentFormFieldOrder
                                            .Attachment:
                                            if (
                                                attachemtUploaded[
                                                    question.questionId
                                                ]
                                            ) {
                                                isValueFilled = true;
                                                if (this.offlineMode) {
                                                    answerObject.accidentAttachmentFileId =
                                                        attachemtUploaded[
                                                            question.questionId
                                                        ];
                                                } else {
                                                    answerObject.accidentAttachmentFileName =
                                                        attachemtUploaded[
                                                            question.questionId
                                                        ];
                                                }
                                            }
                                            break;
                                    }

                                    if (isValueFilled) {
                                        accidentReportQuestionAnswers.push(
                                            answerObject
                                        );
                                        answerFormattedObject.arAnswerData =
                                            answerObject;
                                    }
                                } else {
                                    const answerObject: FormAnswerObject = {
                                        questionAnswerId: 0,
                                        questionID: question.questionId,
                                        questionTitle: questionLabel,
                                        formVersionID: formVersionId,
                                        answerTypeID:
                                            question.selectedAnswerTypeId,
                                        multipleChoiceAnswers: [],
                                        matrixAnswer: {},
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm.MarkAsFailed]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm
                                                    .MarkAsFailed
                                            ],
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm.Notify]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm.Notify
                                            ],
                                        [EnumService.QuestionLogic
                                            .ActionTypeForForm
                                            .CreateNewActivity]:
                                            question[
                                                EnumService.QuestionLogic
                                                    .ActionTypeForForm
                                                    .CreateNewActivity
                                            ],
                                    };

                                    switch (question.selectedAnswerTypeId) {
                                        case EnumService.CustomAnswerType
                                            .ClassicDropdown:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.singleChoiceValueID =
                                                    control.value[
                                                        question.listValueKey
                                                    ];
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .SingleLineText:
                                        case EnumService.CustomAnswerType
                                            .MultiLineText:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.textValue =
                                                    control.value;
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .SingleChoiceSet:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.singleChoiceValueID =
                                                    control.value;
                                            }
                                            break;

                                        case EnumService.CustomAnswerType
                                            .MultipleChoiceSet:
                                            const formGroups =
                                                control.value as FormGroup;
                                            const multipleChoiceValueIDs = [];
                                            question.answerChoiceAttributes.map(
                                                (choice) => {
                                                    const choiceControl =
                                                        formGroups[
                                                            UtilService.SubFCName(
                                                                controlName,
                                                                choice.answerChoiceAttributeId
                                                            )
                                                        ];
                                                    if (choiceControl) {
                                                        multipleChoiceValueIDs.push(
                                                            choice.answerChoiceAttributeId
                                                        );
                                                    }
                                                }
                                            );
                                            if (
                                                multipleChoiceValueIDs.length >
                                                0
                                            ) {
                                                isValueFilled = true;
                                                answerObject.multipleChoiceValueIDs =
                                                    multipleChoiceValueIDs.join(
                                                        ","
                                                    );
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .ConfirmationBox:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.isConfirmBoxChecked =
                                                    true;
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .ScanQrCodeField:
                                            if (control.value) {
                                                isValueFilled = true;
                                                const entityItem: EntityItem =
                                                    control.value as EntityItem;
                                                answerObject.selectedQRCodeType =
                                                    entityItem.entityType.replace(
                                                        " ",
                                                        ""
                                                    );
                                                switch (entityItem.entityType) {
                                                    case EnumService
                                                        .SelectedQRCodeType
                                                        .Location:
                                                        answerObject.qrCodeLocationID =
                                                            entityItem.entityID;
                                                        answerObject.qrCodeLocationName =
                                                            entityItem.entityName;
                                                        break;
                                                    case EnumService
                                                        .SelectedQRCodeType
                                                        .Project:
                                                        answerObject.qrCodeProjectID =
                                                            entityItem.entityID;
                                                        answerObject.qrCodeProjectName =
                                                            entityItem.entityName;
                                                        break;
                                                    case EnumService
                                                        .SelectedQRCodeType
                                                        .InventoryItem:
                                                        answerObject.qrCodeInventoryItemID =
                                                            entityItem.entityID;
                                                        answerObject.qrCodeInventoryItemName =
                                                            entityItem.entityName;
                                                        break;
                                                    case EnumService
                                                        .SelectedQRCodeType
                                                        .Document:
                                                        answerObject.qrCodeDocumentID =
                                                            entityItem.entityID;
                                                        answerObject.qrCodeDocumentName =
                                                            entityItem.entityName;
                                                        break;
                                                    case EnumService
                                                        .SelectedQRCodeType
                                                        .Form:
                                                        answerObject.qrCodeFormID =
                                                            entityItem.entityID;
                                                        answerObject.qrCodeFormTitle =
                                                            entityItem.entityName;
                                                        break;
                                                    case EnumService
                                                        .SelectedQRCodeType
                                                        .User:
                                                        answerObject.qrCodeUserID =
                                                            entityItem.entityID;
                                                        answerObject.qrCodeUserName =
                                                            entityItem.entityName;
                                                        break;

                                                    default:
                                                        break;
                                                }
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .Matrix3DField:
                                            if (control.value) {
                                                const matrixSelectedValues =
                                                    control.value;
                                                const matrixRows =
                                                    question.matrixRows;
                                                const matrixColumns =
                                                    question.matrixColumns;
                                                if (
                                                    matrixRows &&
                                                    matrixColumns &&
                                                    matrixSelectedValues &&
                                                    Object.keys(
                                                        matrixSelectedValues
                                                    ).length > 0
                                                ) {
                                                    isValueFilled = true;
                                                    const matrixRowsAnswer = [];

                                                    matrixRows.map(
                                                        (rowItem, rowIndex) => {
                                                            const matrixColsAnswer =
                                                                [];

                                                            matrixColumns.map(
                                                                (
                                                                    colItem,
                                                                    colIndex
                                                                ) => {
                                                                    const matKey =
                                                                        rowIndex +
                                                                        "_" +
                                                                        colIndex;
                                                                    if (
                                                                        matrixSelectedValues[
                                                                            matKey
                                                                        ]
                                                                    ) {
                                                                        matrixColsAnswer.push(
                                                                            {
                                                                                matrixColumnId:
                                                                                    colItem.matrixColumnId,
                                                                                matrixColumnName:
                                                                                    UtilService.findObj(
                                                                                        colItem.matrixColumnTranslations,
                                                                                        "matrixColumnTranslationLanguageId",
                                                                                        this.getLanguageIdForForm(),
                                                                                        0
                                                                                    )
                                                                                        .matrixColumnTranslationName,
                                                                            }
                                                                        );
                                                                    }
                                                                }
                                                            );

                                                            if (
                                                                matrixColsAnswer &&
                                                                matrixColsAnswer.length >
                                                                    0
                                                            ) {
                                                                matrixRowsAnswer.push(
                                                                    {
                                                                        matrixRowId:
                                                                            rowItem.matrixRowId,
                                                                        matrixRowName:
                                                                            UtilService.findObj(
                                                                                rowItem.matrixRowTranslations,
                                                                                "matrixRowTranslationLanguageId",
                                                                                this.getLanguageIdForForm(),
                                                                                0
                                                                            )
                                                                                .matrixRowTranslationName,
                                                                        matrixColumns:
                                                                            matrixColsAnswer,
                                                                    }
                                                                );
                                                            }
                                                        }
                                                    );

                                                    answerObject.matrixAnswer =
                                                        {
                                                            matrixRows:
                                                                matrixRowsAnswer,
                                                        };
                                                }
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .NumberFieldInteger:
                                            if (control.value) {
                                                isValueFilled = true;
                                                // answerObject.integerValue =
                                                //     Number(control.value);
                                                answerObject.integerValueInString =
                                                    control.value;
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .NumberFieldDecimal:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.decimalValue =
                                                    Number(control.value);
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .DateField:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.dateValue = moment(
                                                    control.value
                                                ).format(
                                                    StaticDataService.dateFormat
                                                );
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .TimeField:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.timeValue = moment(
                                                    control.value
                                                ).format(
                                                    StaticDataService.timeFormat
                                                );
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .DateTimeField:
                                            if (control.value) {
                                                isValueFilled = true;
                                                answerObject.dateTimeValue =
                                                    moment(
                                                        control.value
                                                    ).format(
                                                        StaticDataService.dateTimeFormat
                                                    );
                                            }
                                            break;
                                        case EnumService.CustomAnswerType
                                            .PhotoVideoUpload:
                                            if (
                                                attachemtUploaded[
                                                    question.questionId
                                                ]
                                            ) {
                                                isValueFilled = true;
                                                if (this.offlineMode) {
                                                    answerObject.imageVideoFileId =
                                                        attachemtUploaded[
                                                            question.questionId
                                                        ];
                                                } else {
                                                    answerObject.imageVideoFileName =
                                                        attachemtUploaded[
                                                            question.questionId
                                                        ];
                                                }
                                            }
                                            break;
                                    }

                                    // if additional comment
                                    if (question.shouldShowOptionalComment) {
                                        const additionalControl =
                                            formGroup.controls[
                                                UtilService.FCNameAdditioanlNoteUq(
                                                    controlName
                                                )
                                            ];
                                        if (additionalControl.value) {
                                            answerObject.questionComment =
                                                additionalControl.value;
                                        }
                                    }

                                    if (isValueFilled) {
                                        questionAnswers.push(answerObject);
                                        answerFormattedObject.answerData =
                                            answerObject;
                                    }
                                }
                            }

                            if (isValueFilled) {
                                formattedAnswers.push(answerFormattedObject);
                            }
                        }
                    });
                    sectionFormattedObject.answerData = formattedAnswers;
                }

                if (
                    (sectionFormattedObject.answerData &&
                        sectionFormattedObject.answerData.length > 0) ||
                    (sectionFormattedObject.taskAnswerData &&
                        sectionFormattedObject.taskAnswerData.length > 0)
                ) {
                    formattedSections.push(sectionFormattedObject);
                }
            }
        });

        const submitAnswersObject: SubmitAnswersObject = {
            formId: formBuilderDetail.formId,
            formVersionId,
            selectedLanguageID,
            formTypeId: formBuilderDetail.formTypeID,
            userId: userId || StaticDataService.userDefaultGuid,
            guest_FirstName: this.checkInPostData?.guestFirsName || "",
            guest_MiddleName: this.checkInPostData?.guestMiddleName || "",
            guest_LastName: this.checkInPostData?.guestLastName || "",
            guest_Phone: this.checkInPostData?.guestPhone || "",
            companyId,
            questionAnswers,
            accidentReportQuestionAnswers,
            riskAssessmentAnswers,
            havAnswerDetail: havAnswerDetail,
            workPermitAnswer: workPermitAnswer,
            formattedSections,
            workPermitDetails,
            accidentReport,
            riskAssessmentAnswerDetails,
        };

        const saveFormSuccess = (result) => {
            if (
                this.viewFormFor === EnumService.ViewFormForType.Activity ||
                this.viewFormFor ===
                    EnumService.ViewFormForType.CurrentCheckin ||
                this.viewFormFor ===
                    EnumService.ViewFormForType.CurrentCheckinWorkPermit ||
                this.viewFormFor === EnumService.ViewFormForType.FormDM ||
                this.viewFormFor === EnumService.ViewFormForType.WorkPermitDM
            ) {
                this.workPermitAnswer = workPermitAnswer;
                this.startFormSignOffProcess(userId, apiService, result);
            } else if (
                this.viewFormFor === EnumService.ViewFormForType.Induction
            ) {
                if (this.checkInPostData) {
                    if (this.offlineMode) {
                        const formSubmitDataId = result;
                        if (
                            !this.checkInPostData.formSubmitDataId ||
                            !Array.isArray(
                                this.checkInPostData.formSubmitDataId
                            )
                        ) {
                            this.checkInPostData.formSubmitDataId = [];
                        }
                        this.checkInPostData.formSubmitDataId.push(
                            formSubmitDataId
                        );
                    } else {
                        if (
                            !this.checkInPostData.inductionFormList ||
                            !Array.isArray(
                                this.checkInPostData.inductionFormList
                            )
                        ) {
                            this.checkInPostData.inductionFormList = [];
                        }

                        //It is old keys , not used now
                        this.checkInPostData.inductionFormContent = "";
                        this.checkInPostData.answerNotificationList = "";

                        // For support multiple induction forms list
                        this.checkInPostData.inductionFormList.push({
                            formId: formBuilderDetail.formId,
                            inductionFormContent: result.formAnswerHtmlString,
                            answerNotificationList:
                                result.answerNotificationList,
                        });
                    }
                }
                this.inductionNavigationProcess(
                    userId,
                    this.inductionContentItemIndex
                );
            }
            callBack(true, result);
        };

        this.utilService.presentLoadingWithOptions();

        if (this.offlineMode) {
            this.offlineManagerService
                .insertFormSubmitData(submitAnswersObject)
                .then((formSubmitDataId) => {
                    this.utilService.hideLoading();
                    if (havAnswerDetail && havAnswerDetail.totalExposure) {
                        this.offlineManagerService
                            .insertHAVExposureForDate({
                                userID: userId,
                                isOfflineDone: true,
                                exposurePoints:
                                    havAnswerDetail.calculatedExposure,
                                modifiedDate: moment
                                    .utc()
                                    .format("YYYY-MM-DDT00:00:00"),
                            })
                            .then((res) => {});
                    }

                    saveFormSuccess(formSubmitDataId);
                })
                .catch((error) => {
                    callBack(false, error.message);
                    this.utilService.hideLoading();
                });
        } else {
            apiService.saveFormAnswers(submitAnswersObject).subscribe(
                (response: Response) => {
                    this.utilService.hideLoading();
                    saveFormSuccess(response.Result);
                },
                (error) => {
                    callBack(false, error.message);
                    this.utilService.hideLoading();
                }
            );
        }
    };

    private startFormSignOffProcess = (
        userId,
        apiService: ApiService,
        saveAnswerResult
    ) => {
        const signOffFormDetail = this.signOffFormDetail;

        if (this.dedicatedMode) {
            this.signOffDetailsPostData = {
                userId,
                formVersionID: signOffFormDetail?.formData?.formVersionID,
                latitude: this.myCurrentGeoLocation?.coords?.latitude,
                longitude: this.myCurrentGeoLocation?.coords?.longitude,
                locationID: this.dedicatedModeLocationUse?.locationID,
                projectID: this.dedicatedModeLocationUse?.projectID,
                inventoryItemID: this.dedicatedModeLocationUse?.inventoryItemID,
            } as SignOffDetailsPostData;
            if (this.offlineMode) {
                const formSubmitDataId = saveAnswerResult;
                this.signOffDetailsPostData.formSubmitDataId = formSubmitDataId;
            } else {
                this.signOffDetailsPostData.formContent =
                    saveAnswerResult.formAnswerHtmlString;
                this.signOffDetailsPostData.answerNotificationList =
                    saveAnswerResult.answerNotificationList;
            }
        } else {
            this.signOffDetailsPostData = {
                userId,
                formVersionID: signOffFormDetail?.formData?.formVersionID,
                latitude: this.myCurrentGeoLocation?.coords?.latitude,
                longitude: this.myCurrentGeoLocation?.coords?.longitude,
                locationID: this.currentSelectedCheckinPlace?.locationID || 0,
                projectID: this.currentSelectedCheckinPlace?.projectID || 0,
                inventoryItemID:
                    this.currentSelectedCheckinPlace?.inventoryItemID || 0,
                userCheckInDetailID:
                    this.currentSelectedCheckinPlace?.userCheckInDetailID || 0,
                formContent: saveAnswerResult.formAnswerHtmlString,
                answerNotificationList: saveAnswerResult.answerNotificationList,
            } as SignOffDetailsPostData;
        }

        if (this.viewFormFor === EnumService.ViewFormForType.Activity) {
            this.signOffDetailsPostData.activityIndividualID =
                this.currentActivityOpen?.activityIndividualID;
            if (
                !this.currentSelectedCheckinPlace &&
                signOffFormDetail.entityList.length > 0
            ) {
                const locationItem = signOffFormDetail.entityList[0];
                const entityIds = this.utilService.getRelevantEntityId(
                    locationItem.locationID
                );
                this.signOffDetailsPostData.locationID =
                    entityIds.LocationID || 0;
                this.signOffDetailsPostData.projectID =
                    entityIds.ProjectID || 0;
                this.signOffDetailsPostData.inventoryItemID =
                    entityIds.InventoryID || 0;
            }
            this.signOffFor = EnumService.SignOffType.FORM_ACTIVITY;
        } else if (
            this.viewFormFor === EnumService.ViewFormForType.CurrentCheckin
        ) {
            this.signOffFor = EnumService.SignOffType.FORM_CURRENT_CHECKIN;
        } else if (
            this.viewFormFor ===
            EnumService.ViewFormForType.CurrentCheckinWorkPermit
        ) {
            this.signOffFor =
                EnumService.SignOffType.WORKPERMIT_FORM_CURRENT_CHECKIN;
        } else if (this.viewFormFor === EnumService.ViewFormForType.FormDM) {
            this.signOffFor = EnumService.SignOffType.FORMS_DM;
        } else if (
            this.viewFormFor === EnumService.ViewFormForType.WorkPermitDM
        ) {
            this.signOffFor = EnumService.SignOffType.WORK_PERMIT_DM;
        }

        if (
            signOffFormDetail.formData.isDigitalSignOff ||
            signOffFormDetail.formData.isSignatureSignOff
        ) {
            this.navCtrl.navigateForward(["/signoff-digitalink"]);
        } else if (signOffFormDetail.formData.isPhotoSignOff) {
            if (this.dedicatedMode) {
                this.dedicatedModeCapturePhotoFor =
                    EnumService.DedicatedModeCapturePhotoForType.Signoff;
                this.navCtrl.navigateForward(["/checkinout-photoidentity-dm"]);
            } else {
                this.navCtrl.navigateForward(["/signoff-photo"]);
            }
        } else {
            this.submitPersonalModeSignoffData(apiService);
        }
    };

    submitInductionCheckInData = async (apiService: ApiService) => {
        const nextScreen = this.dedicatedMode
            ? "/dashboard-dm"
            : "/tabs/dashboard";

        const onSuccess = (data) => {
            this.observablesService.publishSomeData(
                EnumService.ObserverKeys.NEW_CHECKED_IN,
                data
            );

            const successScreen = this.dedicatedMode
                ? "/checkinout-success-dm"
                : "/checkin-success";
            this.translateService
                .get([
                    "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_HAVE_NOW_CHECKEDIN",
                    "SHARED_TEXT.CONTINUE",
                ])
                .subscribe((res) => {
                    this.navCtrl.navigateForward([successScreen], {
                        queryParams: {
                            message:
                                res[
                                    "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_HAVE_NOW_CHECKEDIN"
                                ],
                            nextPage: nextScreen,
                            actionBtnTitle: res["SHARED_TEXT.CONTINUE"],
                        },
                        replaceUrl: true,
                    });
                });
        };

        if (this.offlineMode) {
            const utcDateTime = moment()
                .utc()
                .format(StaticDataService.dateTimeFormat);

            let entityData: any;
            if (this.dedicatedModeLocationUse.locationID) {
                entityData =
                    await this.offlineManagerService.getDeviceLocationDetail(
                        this.dedicatedModeLocationUse.locationID
                    );
            } else if (this.dedicatedModeLocationUse.projectID) {
                entityData =
                    await this.offlineManagerService.getDeviceProjectDetail(
                        this.dedicatedModeLocationUse.projectID
                    );
            } else if (this.dedicatedModeLocationUse.inventoryItemID) {
                entityData =
                    await this.offlineManagerService.getDeviceInventoryItemDetail(
                        this.dedicatedModeLocationUse.inventoryItemID
                    );
            }

            const dedicatedModeUserDetail: DeviceUserDetail = this
                .dedicatedModeUserDetail as any;

            const checkinData = {
                checkInDate: utcDateTime || "",
                checkInLatitude: this.checkInPostData.checkInLatitude || "",
                checkInLongitude: this.checkInPostData.checkInLongitude || "",
                companyID: this.checkInPostData.companyID || "",
                currentUTCDate: utcDateTime || "",
                digitalInkSignatureImageVideoFileId:
                    this.checkInPostData.digitalInkSignatureImageVideoFileId ||
                    "",
                entityName:
                    this.dedicatedModeLocationUse.projectName ||
                    this.dedicatedModeLocationUse.locationName ||
                    this.dedicatedModeLocationUse.itemName ||
                    "",
                firstAndLastName:
                    dedicatedModeUserDetail?.firstName +
                    " " +
                    (dedicatedModeUserDetail?.middleName
                        ? dedicatedModeUserDetail?.middleName + " "
                        : "") +
                    dedicatedModeUserDetail?.lastName,
                firstName: dedicatedModeUserDetail?.firstName || "",
                lastName: dedicatedModeUserDetail?.lastName || "",
                isOfflineDone: true,
                isSimultaneousCheckIn:
                    entityData.isSimultaneousCheckIn || false,
                inventoryItemID:
                    this.dedicatedModeLocationUse.inventoryItemID || 0,
                projectID: this.dedicatedModeLocationUse.projectID || 0,
                locationID: this.dedicatedModeLocationUse.locationID || 0,
                userDetailPhoto: dedicatedModeUserDetail.userPhoto || "",
                userId:
                    this.checkInPostData.userId ||
                    StaticDataService.userDefaultGuid,
                userSignaturePhotoImageVideoFileId:
                    this.checkInPostData.userSignaturePhotoImageVideoFileId ||
                    "",
                locationAutoCheckOutHour: entityData.autoCheckOutHour || "",
                locationAutoCheckOutTime: entityData.autoCheckOutTime || "",
                userAutoCheckOutTime:
                    dedicatedModeUserDetail?.userAutoCheckOutTime || "",
                formSubmitDataId: this.checkInPostData?.formSubmitDataId || "",
                processInductionsteps:
                    this.checkInDetail?.checkInEntityDetail?.processInduction,
            };

            this.offlineManagerService
                .insertCheckinDetails(checkinData)
                .then((res) => {
                    // Remove all form images directory if there was form filled
                    try {
                        this.filehandlerService
                            .removeDirectory(
                                this.filehandlerService.offlineFilesDirectory(),
                                StaticDataService.formImagesFolderName
                            )
                            .then(() => {})
                            .catch(() => {});
                    } catch (error) {}

                    if (
                        this.checkInDetail?.checkInEntityDetail
                            ?.processInduction
                    ) {
                        this.insertInductionItemsArchiveRecords(() => {
                            this.observablesService.publishSomeData(
                                EnumService.ObserverKeys
                                    .OFFLINE_DATA_SYNC_NEEDED,
                                true
                            );
                            onSuccess(checkinData);
                        });
                    } else {
                        onSuccess(checkinData);
                    }
                })
                .catch((error) => {
                    this.processCheckInError(error, nextScreen);
                });
        } else {
            const utcDateTime = moment()
                .utc(false)
                .format("DD.MM.YYYY HH:mm:ss");
            this.utilService.presentLoadingWithOptions();
            this.checkInPostData.signOffDate = utcDateTime;

            apiService.insertCheckInDetails(this.checkInPostData).subscribe(
                (response: Response) => {
                    this.utilService.hideLoading();

                    // Remove all form images directory if there was form filled
                    try {
                        this.filehandlerService
                            .removeDirectory(
                                this.filehandlerService.offlineFilesDirectory(),
                                StaticDataService.formImagesFolderName
                            )
                            .then(() => {})
                            .catch(() => {});
                    } catch (error) {}

                    if (
                        response.StatusCode ===
                        EnumService.ApiResponseCode.RequestSuccessful
                    ) {
                        onSuccess(response.Result);
                    }
                },
                (error) => {
                    this.utilService.hideLoading();
                    this.processCheckInError(error, nextScreen);
                }
            );
        }
    };

    private insertInductionItemsArchiveRecords(callBack) {
        // insert form signoff detail to form archive list

        const checkInInductionItems = this.checkInDetail?.checkInInductionItems;
        let insertCount = 0;
        const onRecordInserted = () => {
            if (checkInInductionItems.length === ++insertCount) {
                callBack();
            }
        };

        if (checkInInductionItems && checkInInductionItems.length > 0) {
            checkInInductionItems.forEach((item: InductionItem) => {
                let titlePrepend: string = "";
                switch (item.contentType) {
                    case EnumService.InductionContentTypes.VISITOR_AGREEMENT:
                        titlePrepend = "Visitor Agreement Sign-Off at";
                        break;

                    case EnumService.InductionContentTypes.RICH_TEXT:
                    case EnumService.InductionContentTypes.VIDEO_FILE:
                    case EnumService.InductionContentTypes.IMAGE_FILE:
                    case EnumService.InductionContentTypes.FORM:
                        titlePrepend = "Induction Sign-Off at";

                        break;

                    default:
                        break;
                }

                let signedByName = "";
                if (this.checkinoutDmAs === EnumService.CheckInType.AS_GUEST) {
                    signedByName =
                        (this.dedicatedModeGuestDetail.guestFirsName || "") +
                        " " +
                        (this.dedicatedModeGuestDetail.guestMiddleName
                            ? this.dedicatedModeGuestDetail.guestMiddleName +
                              " "
                            : "") +
                        (this.dedicatedModeGuestDetail.guestLastName || "");
                } else {
                    signedByName =
                        (this.dedicatedModeUserDetail.firstName || "") +
                        " " +
                        (this.dedicatedModeUserDetail.middleName
                            ? this.dedicatedModeUserDetail.middleName + " "
                            : "") +
                        (this.dedicatedModeUserDetail.lastName || "");
                }

                const inductionTitle =
                    titlePrepend +
                    " " +
                    (this.dedicatedModeLocationUse.itemName ||
                        this.dedicatedModeLocationUse.projectName ||
                        this.dedicatedModeLocationUse.locationName) +
                    " by " +
                    signedByName;
                const createdDateStr = UtilService.todayCompanyDate(
                    this.offlineManagerService.offlineDeviceDetailData
                        .timeDifference,
                    false
                ).format(StaticDataService.dateTimeFormatForDb);

                const archiveData = {
                    documentID: item.checkInInductionItemID,
                    documentTitle: inductionTitle,
                    documentFileName: "",
                    createdDate: createdDateStr,
                    formattedCreatedDate: "",
                    todayDate: "",
                    documentFileIconURL: "",
                    documentFileFormat: "",
                    timeDifference: "",
                    inventoryItemID:
                        this.dedicatedModeLocationUse?.inventoryItemID,
                    signedByName: signedByName,
                    locationID: this.dedicatedModeLocationUse?.locationID,
                    projectID: this.dedicatedModeLocationUse?.projectID,
                };

                if (
                    item.contentType === EnumService.InductionContentTypes.FORM
                ) {
                    this.offlineManagerService
                        .insertDeviceArchivedForms(archiveData)
                        .then((res) => {
                            onRecordInserted();
                        })
                        .catch(() => {
                            onRecordInserted();
                        });
                } else {
                    this.offlineManagerService
                        .insertDeviceArchivedDocuments(archiveData)
                        .then((res) => {
                            onRecordInserted();
                        })
                        .catch(() => {
                            onRecordInserted();
                        });
                }
            });
        } else {
            callBack();
        }
    }

    submitInductionCheckInDataGuest = async (apiService: ApiService) => {
        const nextScreen = this.dedicatedMode
            ? "/dashboard-dm"
            : "/tabs/dashboard";

        const onSuccess = () => {
            this.translateService
                .get([
                    "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_HAVE_NOW_CHECKEDIN",
                    "SHARED_TEXT.CONTINUE",
                ])
                .subscribe((res) => {
                    this.navCtrl.navigateForward(["/checkinout-success-dm"], {
                        queryParams: {
                            message:
                                res[
                                    "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_HAVE_NOW_CHECKEDIN"
                                ],
                            nextPage: nextScreen,
                            actionBtnTitle: res["SHARED_TEXT.CONTINUE"],
                        },
                        replaceUrl: true,
                    });
                });
        };

        if (this.offlineMode) {
            const utcDateTime = moment()
                .utc()
                .format(StaticDataService.dateTimeFormat);
            this.checkInPostData.signOffDate = utcDateTime;

            let entityData: any;
            if (this.dedicatedModeLocationUse.locationID) {
                entityData =
                    await this.offlineManagerService.getDeviceLocationDetail(
                        this.dedicatedModeLocationUse.locationID
                    );
            } else if (this.dedicatedModeLocationUse.projectID) {
                entityData =
                    await this.offlineManagerService.getDeviceProjectDetail(
                        this.dedicatedModeLocationUse.projectID
                    );
            } else if (this.dedicatedModeLocationUse.inventoryItemID) {
                entityData =
                    await this.offlineManagerService.getDeviceInventoryItemDetail(
                        this.dedicatedModeLocationUse.inventoryItemID
                    );
            }

            const checkinData = {
                checkInDate: utcDateTime || "",
                checkInLatitude: this.checkInPostData.checkInLatitude || "",
                checkInLongitude: this.checkInPostData.checkInLongitude || "",
                companyID: this.checkInPostData.companyID || "",
                currentUTCDate: utcDateTime || "",
                digitalInkSignatureImageVideoFileId:
                    this.checkInPostData.digitalInkSignatureImageVideoFileId ||
                    "",
                userSignaturePhotoImageVideoFileId:
                    this.checkInPostData.userSignaturePhotoImageVideoFileId ||
                    "",
                entityName:
                    this.dedicatedModeLocationUse.projectName ||
                    this.dedicatedModeLocationUse.locationName ||
                    this.dedicatedModeLocationUse.itemName ||
                    "",
                guestPhone: this.checkInPostData.guestPhone.toString() || "",
                guestFirsName: this.checkInPostData.guestFirsName || "",
                guestLastName: this.checkInPostData.guestLastName || "",
                guestMiddleName: this.checkInPostData.guestMiddleName || "",
                guestPhotoImageVideoFileId:
                    this.dedicatedModeGuestDetail.guestPhotoImageVideoFileId ||
                    "",
                isOfflineDone: true,
                isGuestReturning:
                    this.checkInPostData.isGuestReturning || false,
                isSimultaneousCheckIn:
                    entityData.isSimultaneousCheckIn || false,
                inventoryItemID:
                    this.dedicatedModeLocationUse.inventoryItemID || 0,
                projectID: this.dedicatedModeLocationUse.projectID || 0,
                locationID: this.dedicatedModeLocationUse.locationID || 0,
                locationAutoCheckOutHour: entityData.autoCheckOutHour || "",
                locationAutoCheckOutTime: entityData.autoCheckOutTime || "",
                formSubmitDataId: this.checkInPostData?.formSubmitDataId || "",
                processInductionsteps:
                    this.checkInDetail?.checkInEntityDetail?.processInduction,
            };

            this.offlineManagerService
                .insertGuestCheckinDetails(checkinData)
                .then((res) => {
                    if (
                        this.checkInDetail?.checkInEntityDetail
                            ?.processInduction
                    ) {
                        this.insertInductionItemsArchiveRecords(() => {
                            this.observablesService.publishSomeData(
                                EnumService.ObserverKeys
                                    .OFFLINE_DATA_SYNC_NEEDED,
                                true
                            );
                            onSuccess();
                        });
                    } else {
                        onSuccess();
                    }
                })
                .catch((error) => {
                    this.processCheckInError(error, nextScreen);
                });
        } else {
            const utcDateTime = moment().utc().format("DD.MM.YYYY HH:mm:ss");
            this.checkInPostData.signOffDate = utcDateTime;

            this.utilService.presentLoadingWithOptions();
            apiService
                .insertCheckInDetailsGuest(this.checkInPostData)
                .subscribe(
                    (response: Response) => {
                        this.utilService.hideLoading();

                        // Remove all form images directory if there was form filled
                        try {
                            this.filehandlerService
                                .removeDirectory(
                                    this.filehandlerService.offlineFilesDirectory(),
                                    StaticDataService.formImagesFolderName
                                )
                                .then(() => {})
                                .catch(() => {});
                        } catch (error) {}

                        if (
                            response.StatusCode ===
                            EnumService.ApiResponseCode.RequestSuccessful
                        ) {
                            onSuccess();
                        }
                    },
                    (error) => {
                        this.utilService.hideLoading();
                        this.processCheckInError(error, nextScreen);
                    }
                );
        }
    };

    processCheckInError = (error, nextScreen) => {
        const exception = error.error as Response;
        const failScreen = this.dedicatedMode
            ? "/checkinout-fail-dm"
            : "/checkin-fail";
        if (exception?.ResponseException?.ValidationErrors?.length > 0) {
            const fieldsInfo =
                exception.ResponseException.ValidationErrors[0].Field.split(
                    "#"
                );
            const fieldName = fieldsInfo[0];
            const message =
                exception.ResponseException.ValidationErrors[0].Message;

            if (fieldName === "SimultaneousCheckIn") {
                const locationName = message.match(/\'(.*)\'/).pop();
                this.navCtrl.navigateForward(
                    ["/checkinout-alreadycheckin-dm"],
                    {
                        queryParams: {
                            locationName,
                            locationId: fieldsInfo[1],
                        },
                        replaceUrl: true,
                    }
                );
            } else if (fieldName === "Location" && fieldsInfo.length > 1) {
                const locationName = this.getCurrentCheckedInEntityName();
                this.navCtrl.navigateForward(
                    ["/checkinout-alreadycheckin-dm"],
                    {
                        queryParams: {
                            isAlreadyCheckedInSameLocation: 1,
                            locationName,
                            locationId: fieldsInfo[1],
                        },
                        replaceUrl: true,
                    }
                );
            } else if (fieldName === "Qualification") {
                this.translateService
                    .get([
                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN",
                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.NO_QUALIFICATION",
                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_DO_NOT_HAVE_THE_REQUIRED_QUALIFICATIONS",
                    ])
                    .subscribe((res) => {
                        this.navCtrl.navigateForward([failScreen], {
                            queryParams: {
                                title: res[
                                    "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN"
                                ],
                                errorTitle:
                                    res[
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.NO_QUALIFICATION"
                                    ],
                                errorMessage:
                                    res[
                                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_DO_NOT_HAVE_THE_REQUIRED_QUALIFICATIONS"
                                    ],
                                nextPage: nextScreen,
                            },
                            replaceUrl: true,
                        });
                    });
            } else {
                this.translateService
                    .get(
                        "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN"
                    )
                    .subscribe((res) => {
                        this.navCtrl.navigateForward([failScreen], {
                            queryParams: {
                                title: res,
                                errorTitle: fieldName,
                                errorMessage: message,
                                nextPage: nextScreen,
                            },
                            replaceUrl: true,
                        });
                    });
            }
        } else {
            this.translateService
                .get(["PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN"])
                .subscribe((res) => {
                    this.navCtrl.navigateForward([failScreen], {
                        queryParams: {
                            title: res[
                                "PAGESPECIFIC_TEXT.CHECK_IN_AND_OUT.YOU_CANNOT_CHECKIN"
                            ],
                            errorTitle: "",
                            errorMessage:
                                exception?.ResponseException
                                    ?.ExceptionMessage || exception?.Message,
                            nextPage: nextScreen,
                        },
                        replaceUrl: true,
                    });
                });
        }
    };

    /**
     * This function is use for submit personal mode sign off data
     */
    submitPersonalModeSignoffData = async (apiService: ApiService) => {
        const checkInSuccessPage = this.dedicatedMode
            ? "/checkinout-success-dm"
            : "/checkin-success";
        const checkInFailPage = this.dedicatedMode
            ? "/checkinout-fail-dm"
            : "/checkin-fail";
        let nextPage = this.dedicatedMode ? "dashboard-dm" : "/tabs/dashboard";

        const isWorkPermitCurrentCheckin =
            this.signOffFor ===
                EnumService.SignOffType.WORKPERMIT_FORM_CURRENT_CHECKIN ||
            this.signOffFor === EnumService.SignOffType.WORK_PERMIT_DM;
        const isworkPermitActivity =
            this.signOffFor === EnumService.SignOffType.FORM_ACTIVITY &&
            this.signOffFormDetail?.formData?.formType ===
                EnumService.FormTypes.WORK_PERMIT;

        if (this.dedicatedMode) {
            switch (this.dedicatedModeProcessType) {
                case EnumService.DedicatedModeProcessTypes.Document:
                    nextPage = "documents-dm";
                    break;
                case EnumService.DedicatedModeProcessTypes.Form:
                    nextPage = "forms-dm";
                    break;
                case EnumService.DedicatedModeProcessTypes.WorkPermit:
                    nextPage = "permits-dm";
                    break;
            }
        } else {
            if (isWorkPermitCurrentCheckin) {
                nextPage = "/tabs/current-checkin/checkin-workpermit";
            } else if (isworkPermitActivity) {
                nextPage = "/tabs/dashboard";
            }
        }

        const onSuccessCallBack = (status, errorMessage = "") => {
            if (status) {
                if (
                    this.signOffFor === EnumService.SignOffType.FORM_ACTIVITY ||
                    this.signOffFor ===
                        EnumService.SignOffType.DOCUMENT_ACTIVITY
                ) {
                    this.removeSavedFormStateForActivity(
                        this.viewFormForActivityId,
                        () => {}
                    );
                    this.observablesService.publishSomeData(
                        EnumService.ObserverKeys.ACTIVITY_COMPLETED,
                        true
                    );
                }

                // show work permit issue success/fail for work permit type form filled from current checkin or activity list

                if (isWorkPermitCurrentCheckin || isworkPermitActivity) {
                    if (
                        this.workPermitAnswer.scoreAchieved >=
                        this.workPermitAnswer.totalScore
                    ) {
                        if (this.dedicatedMode && this.offlineMode) {
                            const todayDate = UtilService.todayCompanyDate(
                                this.offlineManagerService
                                    .offlineDeviceDetailData.timeDifference
                            );

                            const todayDateTime = UtilService.todayCompanyDate(
                                this.offlineManagerService
                                    .offlineDeviceDetailData.timeDifference,
                                false
                            );

                            const dateTimeNow = todayDateTime.format(
                                StaticDataService.dateTimeFormat
                            );

                            let expiryDate;
                            if (
                                this.formBuilderDetails?.workPermitDetails
                                    ?.whoDefinesDateType === "UserDefined"
                            ) {
                                const hasExpiresOn =
                                    this.workPermitAnswer.hasExpiresOn;
                                const hasExpiresAfter =
                                    this.workPermitAnswer.hasExpiresAfter;
                                expiryDate = moment(todayDate).add(60, "days");
                                if (hasExpiresAfter) {
                                    const durations = [
                                        "days",
                                        "weeks",
                                        "months",
                                        "years",
                                    ];
                                    const unit: any =
                                        durations[
                                            this.workPermitAnswer
                                                .durationTypeID - 1
                                        ];
                                    expiryDate = moment(todayDate).add(
                                        this.workPermitAnswer.durationValue,
                                        unit
                                    );
                                } else if (hasExpiresOn) {
                                    expiryDate = moment(
                                        UtilService.fixTimeString(
                                            this.workPermitAnswer.expiresOnDate
                                        ),
                                        StaticDataService.dateTimeFormat
                                    );
                                }
                            } else {
                                const workPermitDetail =
                                    this.formBuilderDetails?.workPermitDetails;
                                const hasExpiresOn =
                                    workPermitDetail.hasExpiresOn;
                                const hasExpiresAfter =
                                    workPermitDetail.hasExpiresAfter;
                                expiryDate = moment(todayDate).add(60, "days");
                                if (hasExpiresAfter) {
                                    const durations = [
                                        "days",
                                        "weeks",
                                        "months",
                                        "years",
                                    ];
                                    const unit: any =
                                        durations[
                                            workPermitDetail.durationTypeID - 1
                                        ];
                                    expiryDate = moment(todayDate).add(
                                        workPermitDetail.durationValue,
                                        unit
                                    );
                                } else if (hasExpiresOn) {
                                    expiryDate = moment(
                                        workPermitDetail.expiresOnDate,
                                        "DD/MM/YYYY"
                                    );
                                }
                            }

                            const permitData = {
                                locationID:
                                    this.dedicatedModeLocationUse.locationID,
                                projectID:
                                    this.dedicatedModeLocationUse.projectID,
                                inventoryItemID:
                                    this.dedicatedModeLocationUse
                                        .inventoryItemID,
                                expiryDate: expiryDate.format(
                                    StaticDataService.dateTimeFormatForDb
                                ),
                                firstName:
                                    this.dedicatedModeUserDetail.firstName,
                                formTitle: this.formBuilderDetails.title,
                                formattedExpiryDate: "",
                                formattedIssuedDate: "",
                                issuedDate: dateTimeNow,
                                lastName: this.dedicatedModeUserDetail.lastName,
                                middleName:
                                    this.dedicatedModeUserDetail.middleName,
                                photo: this.dedicatedModeUserDetail.photo,
                                timeDifference: "",
                                todayDate: dateTimeNow,
                                isOfflineDone: true,
                            };
                            this.offlineManagerService.insertLiveWorkPermit(
                                permitData
                            );
                        }

                        this.translateService
                            .get([
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.PASSED",
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.PERMIT_ISSUED",
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.YOUR_WORK_PERMIT_IS_ACTIVE",
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.WORK_PERMIT",
                            ])
                            .subscribe((res) => {
                                this.navCtrl.navigateForward(
                                    [checkInSuccessPage],
                                    {
                                        queryParams: {
                                            title: res[
                                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.PASSED"
                                            ],
                                            message:
                                                res[
                                                    "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.PERMIT_ISSUED"
                                                ],
                                            description:
                                                res[
                                                    "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.YOUR_WORK_PERMIT_IS_ACTIVE"
                                                ],
                                            nextPage,
                                            pageTitle:
                                                res[
                                                    "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.WORK_PERMIT"
                                                ],
                                        },
                                        replaceUrl: true,
                                    }
                                );
                            });
                    } else {
                        this.translateService
                            .get([
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_PASSED",
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NO_PERMIT",
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_ELIGIBLE_FOR_WORK_PERMIT",
                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.WORK_PERMIT",
                            ])
                            .subscribe((res) => {
                                this.navCtrl.navigateForward(
                                    [checkInFailPage],
                                    {
                                        queryParams: {
                                            title: res[
                                                "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_PASSED"
                                            ],
                                            errorTitle:
                                                res[
                                                    "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NO_PERMIT"
                                                ],
                                            errorMessage:
                                                res[
                                                    "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_ELIGIBLE_FOR_WORK_PERMIT"
                                                ],
                                            nextPage,
                                            pageTitle:
                                                res[
                                                    "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.WORK_PERMIT"
                                                ],
                                        },
                                        replaceUrl: true,
                                    }
                                );
                            });
                    }
                } else {
                    this.translateService
                        .get([
                            "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_SIGNOFF_OFF_SUCCESSFULLY",
                            "PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF",
                        ])
                        .subscribe((res) => {
                            this.navCtrl.navigateForward([checkInSuccessPage], {
                                queryParams: {
                                    message:
                                        res[
                                            "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_SIGNOFF_OFF_SUCCESSFULLY"
                                        ],
                                    nextPage,
                                    pageTitle:
                                        res[
                                            "PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF"
                                        ],
                                },
                            });
                        });
                }
            } else {
                if (isWorkPermitCurrentCheckin || isworkPermitActivity) {
                    this.translateService
                        .get([
                            "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_PASSED",
                            "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NO_PERMIT",
                            "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_ELIGIBLE_FOR_WORK_PERMIT",
                            "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.WORK_PERMIT",
                        ])
                        .subscribe((res) => {
                            this.navCtrl.navigateForward([checkInFailPage], {
                                queryParams: {
                                    title: res[
                                        "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_PASSED"
                                    ],
                                    errorTitle:
                                        res[
                                            "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NO_PERMIT"
                                        ],
                                    errorMessage:
                                        res[
                                            "PAGESPECIFIC_TEXT.FORM_LIST.SPECIFIC_FORMS.WORK_PERMIT_FORM.NOT_ELIGIBLE_FOR_WORK_PERMIT"
                                        ],
                                    nextPage,
                                    pageTitle:
                                        res[
                                            "PAGESPECIFIC_TEXT.PAGESPECIFIC_TEXT.FORM_LIST"
                                        ],
                                },
                                replaceUrl: true,
                            });
                        });
                } else {
                    this.translateService
                        .get([
                            "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_CANNOT_SIGNOFF",
                            "PAGESPECIFIC_TEXT.SIGN_OFF.NOT_QUALIFIED",
                            "PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF",
                        ])
                        .subscribe((res) => {
                            this.navCtrl.navigateForward([checkInFailPage], {
                                queryParams: {
                                    title: res[
                                        "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_CANNOT_SIGNOFF"
                                    ],
                                    errorTitle:
                                        res[
                                            "PAGESPECIFIC_TEXT.SIGN_OFF.NOT_QUALIFIED"
                                        ],
                                    errorMessage: errorMessage,
                                    nextPage,
                                    pageTitle:
                                        res[
                                            "PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF"
                                        ],
                                },
                                replaceUrl: true,
                            });
                        });
                }
            }
        };

        const onErrorCallBack = (error) => {
            this.translateService
                .get([
                    "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_CANNOT_SIGNOFF",
                    "PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF",
                ])
                .subscribe((res) => {
                    this.navCtrl.navigateForward([checkInFailPage], {
                        queryParams: {
                            title: res[
                                "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_CANNOT_SIGNOFF"
                            ],
                            errorTitle: "",
                            errorMessage: error.message || error,
                            nextPage,
                            pageTitle:
                                res["PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF"],
                        },
                        replaceUrl: true,
                    });
                });
        };

        if (this.offlineMode) {
            const utcDateTime = moment()
                .utc()
                .format(StaticDataService.dateTimeFormatForDb);
            this.signOffDetailsPostData.signOffDate = utcDateTime;

            const signOffData = {
                userId:
                    this.signOffDetailsPostData.userId ||
                    StaticDataService.userDefaultGuid,
                documentID: this.signOffDetailsPostData.documentID || 0,
                documentVersionID:
                    this.signOffDetailsPostData.documentVersionID || 0,
                formVersionID: this.signOffDetailsPostData.formVersionID || 0,
                latitude: this.signOffDetailsPostData.latitude || "",
                longitude: this.signOffDetailsPostData.longitude || "",
                locationID: this.signOffDetailsPostData.locationID || 0,
                projectID: this.signOffDetailsPostData.projectID || 0,
                inventoryItemID:
                    this.signOffDetailsPostData.inventoryItemID || 0,
                signOffDate: this.signOffDetailsPostData.signOffDate || "",
                digitalInkSignatureImageVideoFileId:
                    this.signOffDetailsPostData
                        .digitalInkSignatureImageVideoFileId || "",
                userSignaturePhotoImageVideoFileId:
                    this.signOffDetailsPostData
                        .userSignaturePhotoImageVideoFileId || "",

                formSubmitDataId:
                    this.signOffDetailsPostData.formSubmitDataId || "",
            };

            this.offlineManagerService
                .insertSignOffDetail(signOffData)
                .then((res) => {
                    this.observablesService.publishSomeData(
                        EnumService.ObserverKeys.OFFLINE_DATA_SYNC_NEEDED,
                        true
                    );

                    // Remove all form images directory if there was form filled
                    try {
                        this.filehandlerService
                            .removeDirectory(
                                this.filehandlerService.offlineFilesDirectory(),
                                StaticDataService.formImagesFolderName
                            )
                            .then(() => {})
                            .catch(() => {});
                    } catch (error) {}

                    //Add sign off form/document in archive list

                    const createdDateStr = UtilService.todayCompanyDate(
                        this.offlineManagerService.offlineDeviceDetailData
                            .timeDifference,
                        false
                    ).format(StaticDataService.dateTimeFormatForDb);
                    const signedByName =
                        (this.dedicatedModeUserDetail.firstName || "") +
                        " " +
                        (this.dedicatedModeUserDetail.middleName
                            ? this.dedicatedModeUserDetail.middleName + " "
                            : "") +
                        (this.dedicatedModeUserDetail.lastName || "");

                    if (this.signOffDetailsPostData.documentID) {
                        const documentDetail: any = this.signOffDocumentDetail;

                        const documentTitle =
                            "Document Sign-Off for " +
                            documentDetail?.documentTitle +
                            " by " +
                            signedByName;

                        const archiveDocumentData = {
                            documentID: this.signOffDetailsPostData.documentID,
                            documentTitle: documentTitle,
                            documentFileName: "",
                            createdDate: createdDateStr,
                            formattedCreatedDate: "",
                            timeDifference: "",
                            todayDate: "",
                            signedByName: signedByName,
                            inventoryItemID:
                                this.dedicatedModeLocationUse?.inventoryItemID,
                            locationID:
                                this.dedicatedModeLocationUse?.locationID,
                            projectID: this.dedicatedModeLocationUse?.projectID,
                        };
                        this.offlineManagerService
                            .insertDeviceArchivedDocuments(archiveDocumentData)
                            .then((res) => {
                                onSuccessCallBack(true);
                            });
                    } else if (this.signOffDetailsPostData.formVersionID) {
                        const formBuilderDetails: any = this.formBuilderDetails;

                        const formTitle =
                            "Form Sign-Off for " +
                            formBuilderDetails.title +
                            " by " +
                            signedByName;

                        const archiveFormData = {
                            createdDate: createdDateStr,
                            documentID: formBuilderDetails.formId,
                            documentTitle: formTitle,
                            formattedCreatedDate: "",
                            timeDifference: "",
                            todayDate: "",
                            signedByName: signedByName,
                            inventoryItemID:
                                this.dedicatedModeLocationUse?.inventoryItemID,
                            locationID:
                                this.dedicatedModeLocationUse?.locationID,
                            projectID: this.dedicatedModeLocationUse?.projectID,
                        };
                        this.offlineManagerService
                            .insertDeviceArchivedForms(archiveFormData)
                            .then((res) => {
                                onSuccessCallBack(true);
                            });
                    }
                });
        } else {
            const utcDateTime = moment().utc().format("DD.MM.YYYY HH:mm:ss");
            this.signOffDetailsPostData.signOffDate = utcDateTime;

            this.utilService.presentLoadingWithOptions();

            apiService
                .insertPersonalModeSignOffDetails(this.signOffDetailsPostData)
                .subscribe(
                    (response: Response) => {
                        this.utilService.hideLoading();

                        // Remove all form images directory if there was form filled
                        try {
                            this.filehandlerService
                                .removeDirectory(
                                    this.filehandlerService.offlineFilesDirectory(),
                                    StaticDataService.formImagesFolderName
                                )
                                .then(() => {})
                                .catch(() => {});
                        } catch (error) {}

                        if (
                            response.StatusCode ===
                            EnumService.ApiResponseCode.RequestSuccessful
                        ) {
                            onSuccessCallBack(true);
                        } else {
                            onSuccessCallBack(false, response.Message);
                        }
                    },
                    (error) => {
                        this.utilService.hideLoading();
                        onErrorCallBack(error);
                    }
                );
        }
    };

    /**
     * This function is use for generate sigoff html file for developers test, it can call only in development mode
     */
    generatePersonalModeSignoffHtmlFileForTest = async (
        apiService: ApiService
    ) => {
        const onSuccessCallBack = (status, resData = "") => {
            if (status) {
                let blob = new Blob([resData], {
                    type: "text/html;charset=utf-8",
                });

                const fileName = "SignOffDetailHtml.html";

                if (UtilService.isWebApp() || UtilService.isLocalHost()) {
                    var a = document.createElement("a");
                    a.href = window.URL.createObjectURL(blob);
                    a.download = fileName;
                    a.click();
                } else {
                    const writeDirectory = this.platform.is("android")
                        ? this.file.externalRootDirectory + "/Download"
                        : this.file.documentsDirectory;

                    this.file
                        .writeFile(writeDirectory, fileName, blob, {
                            replace: true,
                        })
                        .then((res) => {
                            console.log("Write file success");

                            this.socialSharing
                                .share("", "", writeDirectory + "/" + fileName)
                                .then((res) => {})
                                .catch((error) => {
                                    this.utilService.showAlert(error.message);
                                });
                        })
                        .catch((error) => {
                            console.log("Write file failed", error);
                        });
                }
            } else {
                this.translateService
                    .get([
                        "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_CANNOT_SIGNOFF",
                        "PAGESPECIFIC_TEXT.SIGN_OFF.NOT_QUALIFIED",
                        "PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF",
                    ])
                    .subscribe((res) => {
                        this.utilService.showAlert(
                            resData,
                            res["PAGESPECIFIC_TEXT.SIGN_OFF.NOT_QUALIFIED"]
                        );
                    });
            }
        };

        const onErrorCallBack = (error) => {
            this.translateService
                .get([
                    "PAGESPECIFIC_TEXT.SIGN_OFF.YOU_CANNOT_SIGNOFF",
                    "PAGESPECIFIC_TEXT.SIGN_OFF.SIGNOFF",
                ])
                .subscribe((res) => {
                    this.utilService.showAlert(
                        error.message || error,
                        res["PAGESPECIFIC_TEXT.SIGN_OFF.YOU_CANNOT_SIGNOFF"]
                    );
                });
        };

        if (!this.offlineMode) {
            const utcDateTime = moment().utc().format("DD.MM.YYYY HH:mm:ss");
            this.signOffDetailsPostData.signOffDate = utcDateTime;

            this.utilService.presentLoadingWithOptions();

            apiService
                .insertPersonalModeSignOffDetailsTest(
                    this.signOffDetailsPostData
                )
                .subscribe(
                    (response: Response) => {
                        this.utilService.hideLoading();
                        if (
                            response.StatusCode ===
                            EnumService.ApiResponseCode.RequestSuccessful
                        ) {
                            onSuccessCallBack(true, response.Result);
                        } else {
                            onSuccessCallBack(false, response.Message);
                        }
                    },
                    (error) => {
                        this.utilService.hideLoading();

                        if (
                            error.status ===
                            EnumService.ApiResponseCode.RequestSuccessful
                        ) {
                            onSuccessCallBack(true, error.error?.text);
                        } else {
                            onErrorCallBack(error);
                        }
                    }
                );
        }
    };

    /**
     * Navigate to the induction item type screen
     * @param userId for personal mode, it will get on the time of login
     * @param inductionContentItemIndex index of induction item
     */

    inductionNavigationProcess = (userId = null, inductionContentItemIndex) => {
        if (this.checkInDetail) {
            const inductionItems = this.checkInDetail.checkInInductionItems;
            if (
                inductionItems &&
                inductionContentItemIndex < inductionItems.length - 1
            ) {
                const inductionContentItem =
                    inductionItems[inductionContentItemIndex + 1];
                if (
                    inductionContentItem.contentType ===
                    EnumService.InductionContentTypes.FORM
                ) {
                    if (this.dedicatedMode) {
                        const onSuccess = (result) => {
                            this.viewFormFor =
                                EnumService.ViewFormForType.Induction;
                            this.signOffFormDetail =
                                result as SignOffFormDetail;
                            this.inductionContentItemIndex =
                                inductionContentItemIndex + 1;
                            this.navCtrl.navigateForward(
                                UtilService.InductionContentTypeScreenIdentify(
                                    inductionContentItem.contentType,
                                    this.dedicatedMode
                                ),
                                {
                                    queryParams: {
                                        inductionContentItemIndex:
                                            this.inductionContentItemIndex,
                                    },
                                    replaceUrl: true,
                                }
                            );
                        };

                        if (this.offlineMode) {
                            this.offlineManagerService
                                .getSignOffFormDetail(
                                    inductionContentItem.formID
                                )
                                .then((response) => {
                                    onSuccess(response);
                                });
                        } else {
                            this.utilService.presentLoadingWithOptions();
                            this.apiServiceRerence
                                .getDedicatedModeSignOffFormDetail(
                                    inductionContentItem.formID
                                )
                                .subscribe(
                                    (response: Response) => {
                                        this.utilService.hideLoading();
                                        if (
                                            response.StatusCode ===
                                            EnumService.ApiResponseCode
                                                .RequestSuccessful
                                        ) {
                                            onSuccess(response.Result);
                                        }
                                    },
                                    (error) => {
                                        this.utilService.hideLoading();
                                    }
                                );
                        }
                    } else {
                        const entityIds = this.utilService.getRelevantEntityId(
                            this.checkInForLocation?.locationID
                        );
                        const LocationID = entityIds.LocationID;
                        const ProjectID = entityIds.ProjectID;
                        const InventoryID = entityIds.InventoryID;

                        this.utilService.presentLoadingWithOptions();
                        this.apiServiceRerence
                            .getSignOffFormDetail(
                                userId,
                                inductionContentItem.formID,
                                LocationID,
                                ProjectID,
                                InventoryID
                            )
                            .subscribe(
                                (response: Response) => {
                                    this.utilService.hideLoading();
                                    if (
                                        response.StatusCode ===
                                        EnumService.ApiResponseCode
                                            .RequestSuccessful
                                    ) {
                                        this.viewFormFor =
                                            EnumService.ViewFormForType.Induction;
                                        this.signOffFormDetail =
                                            response.Result as SignOffFormDetail;
                                        this.inductionContentItemIndex =
                                            inductionContentItemIndex + 1;
                                        this.navCtrl.navigateForward(
                                            UtilService.InductionContentTypeScreenIdentify(
                                                inductionContentItem.contentType,
                                                this.dedicatedMode
                                            ),
                                            {
                                                queryParams: {
                                                    inductionContentItemIndex:
                                                        this
                                                            .inductionContentItemIndex,
                                                },
                                                replaceUrl: true,
                                            }
                                        );
                                    }
                                },
                                (error) => {
                                    this.utilService.hideLoading();
                                }
                            );
                    }
                } else {
                    this.inductionContentItemIndex =
                        inductionContentItemIndex + 1;
                    this.navCtrl.navigateForward(
                        UtilService.InductionContentTypeScreenIdentify(
                            inductionContentItem.contentType,
                            this.dedicatedMode
                        ),
                        {
                            queryParams: {
                                inductionContentItemIndex:
                                    this.inductionContentItemIndex,
                            },
                            replaceUrl: true,
                        }
                    );
                }
            } else if (
                this.checkInDetail.checkInInduction.isDigitalSignOff ||
                this.checkInDetail.checkInInduction.isSignatureSignOff
            ) {
                this.signOffFor = EnumService.SignOffType.INDUCTION;
                this.navCtrl.navigateForward(["/signoff-digitalink"]);
            } else if (this.checkInDetail.checkInInduction.isPhotoSignOff) {
                this.signOffFor = EnumService.SignOffType.INDUCTION;
                if (this.dedicatedMode) {
                    if (this.dedicatedModeCapturedSelfieForCheckinProcess) {
                        if (this.offlineMode) {
                            this.checkInPostData.userSignaturePhotoImageVideoFileId =
                                this.dedicatedModeCapturedSelfieForCheckinProcess;
                        } else {
                            this.checkInPostData.userSignaturePhoto =
                                this.dedicatedModeCapturedSelfieForCheckinProcess;
                        }

                        if (
                            this.checkinoutDmAs ===
                            EnumService.CheckInType.AS_GUEST
                        ) {
                            this.submitInductionCheckInDataGuest(
                                this.apiServiceRerence
                            );
                        } else {
                            this.submitInductionCheckInData(
                                this.apiServiceRerence
                            );
                        }
                    } else {
                        this.dedicatedModeCapturePhotoFor =
                            EnumService.DedicatedModeCapturePhotoForType.Signoff;
                        this.navCtrl.navigateForward([
                            "/checkinout-photoidentity-dm",
                        ]);
                    }
                } else {
                    this.navCtrl.navigateForward(["/signoff-photo"]);
                }
            } else {
                this.submitInductionCheckInData(this.apiServiceRerence);
            }
        }
    };

    dedicatedModeDocumentSignOffProcess = (photoName = null) => {
        this.signOffDetailsPostData.userId =
            this.dedicatedModeUserDetail?.userId;
        if (
            this.signOffDocumentDetail.isDigitalSignOff ||
            this.signOffDocumentDetail.isSignatureSignOff
        ) {
            this.navCtrl.navigateForward(["/signoff-digitalink"]);
        } else if (this.signOffDocumentDetail.isPhotoSignOff) {
            this.dedicatedModeCapturePhotoFor =
                EnumService.DedicatedModeCapturePhotoForType.Signoff;
            this.navCtrl.navigateForward(["/checkinout-photoidentity-dm"]);
        } else {
            this.submitPersonalModeSignoffData(this.apiServiceRerence);
        }
    };

    dedicatedModeFormSignOffProcess = (photoName = null) => {
        this.navCtrl.navigateForward(["/form-cover-dm"]);
    };

    dedicatedModeWorkPermitSignOffProcess = (photoName = null) => {
        this.navCtrl.navigateForward(["/form-cover-dm"]);
    };
}
