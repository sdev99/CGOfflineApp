(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-form-accident-report-form-accident-report-module"], {
    /***/
    "PtOF":
    /*!***************************************************************************!*\
      !*** ./src/app/pages/form-accident-report/form-accident-report.module.ts ***!
      \***************************************************************************/

    /*! exports provided: FormAccidentReportPageModule */

    /***/
    function PtOF(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FormAccidentReportPageModule", function () {
        return FormAccidentReportPageModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _form_accident_report_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./form-accident-report-routing.module */
      "gyqi");
      /* harmony import */


      var _form_accident_report_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./form-accident-report.page */
      "Siwv");
      /* harmony import */


      var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../components/components.module */
      "j1ZV");

      var FormAccidentReportPageModule = function FormAccidentReportPageModule() {
        _classCallCheck(this, FormAccidentReportPageModule);
      };

      FormAccidentReportPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _form_accident_report_routing_module__WEBPACK_IMPORTED_MODULE_5__["FormAccidentReportPageRoutingModule"], _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]],
        declarations: [_form_accident_report_page__WEBPACK_IMPORTED_MODULE_6__["FormAccidentReportPage"]]
      })], FormAccidentReportPageModule);
      /***/
    },

    /***/
    "Siwv":
    /*!*************************************************************************!*\
      !*** ./src/app/pages/form-accident-report/form-accident-report.page.ts ***!
      \*************************************************************************/

    /*! exports provided: FormAccidentReportPage */

    /***/
    function Siwv(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FormAccidentReportPage", function () {
        return FormAccidentReportPage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _raw_loader_form_accident_report_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! raw-loader!./form-accident-report.page.html */
      "wEPM");
      /* harmony import */


      var _form_accident_report_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./form-accident-report.page.scss */
      "lgNe");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "TEn/");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _services_static_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../services/static-data.service */
      "hYb0");
      /* harmony import */


      var _modals_exit_confirmation_exit_confirmation_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../modals/exit-confirmation/exit-confirmation.page */
      "GR7D");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _services_enum_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../services/enum.service */
      "AIDl");
      /* harmony import */


      var _services_shared_data_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../services/shared-data.service */
      "msgi");
      /* harmony import */


      var _services_observables_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../services/observables.service */
      "mxI+");
      /* harmony import */


      var _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ionic-native/screen-orientation/ngx */
      "0QAI");
      /* harmony import */


      var _services_account_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../../services/account.service */
      "flj8");
      /* harmony import */


      var _services_util_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ../../services/util.service */
      "2Rin");
      /* harmony import */


      var _services_api_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ../../services/api.service */
      "H+bZ");
      /* harmony import */


      var _services_validator_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ../../services/validator.service */
      "Npox");

      var FormAccidentReportPage = /*#__PURE__*/function () {
        function FormAccidentReportPage(navCtrl, sharedDataService, modalController, route, observablesService, screenOrientation, ngZone, accountService, apiService, utilService, validatorService) {
          var _this = this;

          _classCallCheck(this, FormAccidentReportPage);

          var _a, _b;

          this.navCtrl = navCtrl;
          this.sharedDataService = sharedDataService;
          this.modalController = modalController;
          this.route = route;
          this.observablesService = observablesService;
          this.screenOrientation = screenOrientation;
          this.ngZone = ngZone;
          this.accountService = accountService;
          this.apiService = apiService;
          this.utilService = utilService;
          this.validatorService = validatorService;
          this.EnumService = _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"];
          this.UtilService = _services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"];
          this.isSubmitted = false;
          this.errorMessage = "";
          this.types = [];
          this.classifications = [];
          this.bodyParts = _services_static_data_service__WEBPACK_IMPORTED_MODULE_6__["StaticDataService"].bodyParts.clone();
          this.currentBodyPartIndex = 0;
          this.selectedBodyParts = {};
          this.accidentAlertOptions = {
            header: "Where the accident happened ?"
          };
          this.typeAlertOptions = {
            header: "Select Type"
          };
          this.isShowOritationPortrait = false; // formBuilderDetail = JSON.parse('{"formId":112,"title":"Accident Report Form One","description":null,"formVersionId":163,"formVersionNo":1,"isDraft":false,"formTypeID":5,"companyId":27,"defaultLanguageId":0,"sections":[{"sectionId":156,"sectionIsHidden":false,"sectionDisplayOrder":1,"isRiskAssessmentSection":false,"isHAVSection":false,"isAccidentReportSection":true,"sectionTranslations":[{"sectionTranslationId":257,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Accident Report"}],"questions":[{"questionId":310,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":9,"questionDisplayOrder":1,"sectionID":156,"questionTranslations":[{"questionTranslationId":382,"questionTranslationLanguageId":35,"questionTranslationTitle":"Accident Date and Time","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":311,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":12,"questionDisplayOrder":2,"sectionID":156,"questionTranslations":[{"questionTranslationId":383,"questionTranslationLanguageId":35,"questionTranslationTitle":"Accident Location","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":312,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":1,"questionDisplayOrder":3,"sectionID":156,"questionTranslations":[{"questionTranslationId":384,"questionTranslationLanguageId":35,"questionTranslationTitle":"Is RIDDOR Report Needed?","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[{"answerChoiceAttributeId":362,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":481,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Yes"}]},{"answerChoiceAttributeId":363,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":482,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"No"}]}],"questionLogics":[],"questionAttachments":[]},{"questionId":313,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":2,"questionDisplayOrder":4,"sectionID":156,"questionTranslations":[{"questionTranslationId":385,"questionTranslationLanguageId":35,"questionTranslationTitle":"About","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[{"answerChoiceAttributeId":364,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":483,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"People"}]},{"answerChoiceAttributeId":365,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":484,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Equipment"}]},{"answerChoiceAttributeId":366,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":485,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Environment"}]}],"questionLogics":[],"questionAttachments":[]},{"questionId":314,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":11,"questionDisplayOrder":5,"sectionID":156,"questionTranslations":[{"questionTranslationId":386,"questionTranslationLanguageId":35,"questionTranslationTitle":"Type","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":315,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":11,"questionDisplayOrder":6,"sectionID":156,"questionTranslations":[{"questionTranslationId":387,"questionTranslationLanguageId":35,"questionTranslationTitle":"Classification","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":316,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":13,"questionDisplayOrder":7,"sectionID":156,"questionTranslations":[{"questionTranslationId":388,"questionTranslationLanguageId":35,"questionTranslationTitle":"Body Part Affected","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":317,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":4,"questionDisplayOrder":8,"sectionID":156,"questionTranslations":[{"questionTranslationId":389,"questionTranslationLanguageId":35,"questionTranslationTitle":"Description","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":318,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":10,"questionDisplayOrder":9,"sectionID":156,"questionTranslations":[{"questionTranslationId":390,"questionTranslationLanguageId":35,"questionTranslationTitle":"Attachment","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]}],"tasks":[]}],"selectedLanguage":null,"selectedLanguages":[{"languageId":35,"languageLabel":"English"}],"supportedLanguages":[],"answerTypes":[],"answerChoiceColors":null,"hourFormats":null,"questionActionOnList":null,"questionActionTypes":null,"questionChoiceSetTypes":null,"questionOperatorTypes":null,"userList":null,"groupList":null,"workPermitDetails":{"workPermitId":0,"totalScore":null,"hasExpirationDate":false,"hasExpiresOn":false,"expiresOnDate":null,"hasExpiresAfter":false,"durationValue":null,"hasPermitIssuedNotification":false,"hasPermitNotIssuedNotification":false,"operatorTypeID":null,"durationTypeID":null,"permitIssuedNotificationID":null,"permitNotIssuedNotificationID":null,"formVersionID":0,"permitNotIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]}},"accidentReport":{"accidentReportId":7,"hasAccidentNotification":false,"notificationID":null,"formVersionID":163,"accidentNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]}},"modifiedBy":"00000000-0000-0000-0000-000000000000","folderDocumentList":null,"folderDocumentTreeList":null,"signedUsers":[],"taskTemplates":[]}');

          this.formBuilderDetail = JSON.parse('{"formId":236,"title":"Accident Report PDF Test","description":null,"formVersionId":364,"formVersionNo":1,"isDraft":false,"formTypeID":5,"companyId":27,"defaultLanguageId":35,"sections":[{"sectionId":411,"sectionIsHidden":false,"sectionDisplayOrder":1,"isRiskAssessmentSection":false,"isHAVSection":false,"isAccidentReportSection":true,"sectionTranslations":[{"sectionTranslationId":553,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Accident Report"}],"questions":[{"questionId":1177,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":9,"questionDisplayOrder":1,"sectionID":411,"questionTranslations":[{"questionTranslationId":1449,"questionTranslationLanguageId":35,"questionTranslationTitle":"Accident Date and Time","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":1178,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":12,"questionDisplayOrder":2,"sectionID":411,"questionTranslations":[{"questionTranslationId":1450,"questionTranslationLanguageId":35,"questionTranslationTitle":"Accident Location","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":1179,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":1,"questionDisplayOrder":3,"sectionID":411,"questionTranslations":[{"questionTranslationId":1451,"questionTranslationLanguageId":35,"questionTranslationTitle":"Is RIDDOR Report Needed?","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[{"answerChoiceAttributeId":1002,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1206,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Yes"}]},{"answerChoiceAttributeId":1003,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1207,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"No"}]}],"questionLogics":[],"questionAttachments":[]},{"questionId":1180,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":2,"questionDisplayOrder":4,"sectionID":411,"questionTranslations":[{"questionTranslationId":1452,"questionTranslationLanguageId":35,"questionTranslationTitle":"About","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[{"answerChoiceAttributeId":1004,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1208,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"People"}]},{"answerChoiceAttributeId":1005,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1209,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Equipment"}]},{"answerChoiceAttributeId":1006,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"white","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1210,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Environment"}]}],"questionLogics":[],"questionAttachments":[]},{"questionId":1181,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":11,"questionDisplayOrder":5,"sectionID":411,"questionTranslations":[{"questionTranslationId":1453,"questionTranslationLanguageId":35,"questionTranslationTitle":"Type","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":1182,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":11,"questionDisplayOrder":6,"sectionID":411,"questionTranslations":[{"questionTranslationId":1454,"questionTranslationLanguageId":35,"questionTranslationTitle":"Classification","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":1183,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":13,"questionDisplayOrder":7,"sectionID":411,"questionTranslations":[{"questionTranslationId":1455,"questionTranslationLanguageId":35,"questionTranslationTitle":"Body Part Affected","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":1184,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":4,"questionDisplayOrder":8,"sectionID":411,"questionTranslations":[{"questionTranslationId":1456,"questionTranslationLanguageId":35,"questionTranslationTitle":"Description","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":1185,"questionIsHidden":false,"questionIsRequired":false,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":10,"questionDisplayOrder":9,"sectionID":411,"questionTranslations":[{"questionTranslationId":1457,"questionTranslationLanguageId":35,"questionTranslationTitle":"Attachment","questionTranslationInstructionOrNote":null,"questionTranslationTextLabel":null}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]}],"tasks":[]},{"sectionId":412,"sectionIsHidden":false,"sectionDisplayOrder":2,"isRiskAssessmentSection":false,"isHAVSection":false,"isAccidentReportSection":false,"sectionTranslations":[{"sectionTranslationId":554,"sectionTranslationLanguageId":35,"sectionTranslationTitle":"Sec 2"}],"questions":[{"questionId":1186,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":true,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":5,"questionDisplayOrder":1,"sectionID":412,"questionTranslations":[{"questionTranslationId":1458,"questionTranslationLanguageId":35,"questionTranslationTitle":"Sec 2 Q1","questionTranslationInstructionOrNote":"","questionTranslationTextLabel":""}],"answerChoiceAttributes":[],"questionLogics":[],"questionAttachments":[]},{"questionId":1187,"questionIsHidden":false,"questionIsRequired":true,"allowInstructionOrNote":false,"allowTextLabel":false,"shouldShowOptionalComment":false,"allowAttachment":false,"allowQuestionLogic":false,"isExistingFile":false,"shouldShowAnswerChoiceTemplate":false,"selectedAnswerTypeId":2,"questionDisplayOrder":2,"sectionID":412,"questionTranslations":[{"questionTranslationId":1459,"questionTranslationLanguageId":35,"questionTranslationTitle":"Sec 2 Q2","questionTranslationInstructionOrNote":"","questionTranslationTextLabel":""}],"answerChoiceAttributes":[{"answerChoiceAttributeId":1007,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"green","answerChoiceAttributeScoreOrWeight":4,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1211,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Good"}]},{"answerChoiceAttributeId":1008,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"blue","answerChoiceAttributeScoreOrWeight":3,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1212,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Fair"}]},{"answerChoiceAttributeId":1009,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"gold","answerChoiceAttributeScoreOrWeight":2,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1213,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"Poor"}]},{"answerChoiceAttributeId":1010,"answerChoiceAttributeText":null,"answerChoiceAttributeColor":"grey","answerChoiceAttributeScoreOrWeight":0,"answerChoiceAttributeHeaders":[{"answerChoiceAttributeHeaderId":1214,"answerChoiceAttributeHeaderLanguageId":35,"answerChoiceAttributeHeaderTitle":"N/A"}]}],"questionLogics":[],"questionAttachments":[]}],"tasks":[]}],"selectedLanguage":null,"selectedLanguages":[{"languageId":35,"languageLabel":"English"}],"supportedLanguages":[],"answerTypes":[],"answerChoiceColors":null,"hourFormats":null,"questionActionOnList":null,"questionActionTypes":null,"questionChoiceSetTypes":null,"questionOperatorTypes":null,"userList":null,"groupList":null,"workPermitDetails":{"workPermitId":0,"totalScore":null,"hasExpirationDate":false,"hasExpiresOn":false,"expiresOnDate":null,"hasExpiresAfter":false,"durationValue":null,"hasPermitIssuedNotification":false,"hasPermitNotIssuedNotification":false,"operatorTypeID":null,"durationTypeID":null,"permitIssuedNotificationID":null,"permitNotIssuedNotificationID":null,"formVersionID":0,"permitNotIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]},"permitIssuedNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":false,"isSMSNotification":false,"selectedUsersAndGroups":[]}},"accidentReport":{"accidentReportId":27,"hasAccidentNotification":true,"notificationID":86,"formVersionID":364,"accidentNotification":{"notifyUser":true,"selectedUserId":"00000000-0000-0000-0000-000000000000","selectedUsers":[],"notifyGroup":false,"selectedGroupId":0,"selectedGroups":[],"isSystemNotification":true,"isEmailNotification":true,"isSMSNotification":true,"selectedUsersAndGroups":[{"notifyUserAndGroupId":66,"notificationID":86,"userId":"b01f4cf5-c26c-4c8f-be94-a7c68fede752","groupId":null,"name":"Arvin2 Biricik2","notifyType":1}]}},"modifiedBy":"00000000-0000-0000-0000-000000000000","folderDocumentList":null,"folderDocumentTreeList":null,"signedUsers":[],"taskTemplates":[]}');
          this.questionElementIds = [];

          this.getAccidentTypeList = function () {
            _this.apiService.getAccidentTypeList().subscribe(function (response) {
              if (response.StatusCode === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].ApiResponseCode.RequestSuccessful) {
                _this.types = response.Result;

                _this.setupDynamicChoiceList(_services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentFormFieldOrder.Type);
              }
            }, function (error) {});
          };

          this.getAccidentClassificationList = function () {
            _this.apiService.getAccidentClassificationList().subscribe(function (response) {
              if (response.StatusCode === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].ApiResponseCode.RequestSuccessful) {
                _this.classifications = response.Result;

                _this.setupDynamicChoiceList(_services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentFormFieldOrder.Classification);
              }
            }, function (error) {});
          };

          this.getLocationItemList = function () {
            _this.apiService.getLocationItemList(_this.companyId).subscribe(function (res) {
              if (res.StatusCode === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].ApiResponseCode.RequestSuccessful) {
                _this.locations = res.Result;

                _this.setupDynamicChoiceList(_services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentFormFieldOrder.AccidentLocation);
              }
            }, function (error) {});
          }; // getAccidentBodyPartList = () => {
          //     this.apiService.getAccidentBodyPartList().subscribe((response: Response) => {
          //         if (response.StatusCode === EnumService.ApiResponseCode.RequestSuccessful) {
          //             this.bodyParts = response.Result;
          //         }
          //     }, (error) => {
          //     });
          // };


          this.setupDynamicChoiceList = function (listType) {
            var sections = _this.formBuilderDetail.sections;

            if (sections) {
              sections.map(function (section) {
                if (section.isAccidentReportSection) {
                  var questions = section.questions;
                  questions.map(function (question) {
                    if (question.questionDisplayOrder === listType) {
                      if (question.questionDisplayOrder === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentFormFieldOrder.Type) {
                        question.answerChoiceAttributes = _this.types;
                        question.listValueKey = "accidentTypeId";
                        question.listLabelKey = "accidentTypeTitle";
                      } else if (question.questionDisplayOrder === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentFormFieldOrder.Classification) {
                        question.answerChoiceAttributes = _this.classifications;
                        question.listValueKey = "accidentClassificationId";
                        question.listLabelKey = "accidentClassificationTitle";
                      } else if (question.questionDisplayOrder === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentFormFieldOrder.AccidentLocation) {
                        question.answerChoiceAttributes = _this.locations;
                        question.listValueKey = "locationName";
                        question.listLabelKey = "locationID";
                      }
                    }
                  });
                }
              });
            }
          };

          this.handleOrientation = function () {
            if (_this.sharedDataService.dedicatedMode) {
              if (_this.screenOrientation.type.includes("landscape")) {
                if (!_services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].isLocalHost()) {
                  _this.screenOrientation.unlock();
                }

                _this.isShowOritationPortrait = true;
              } else {
                if (!_services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].isLocalHost()) {
                  _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
                }
              }

              _this.screenOrientationSubscribe = _this.screenOrientation.onChange().subscribe(function () {
                _this.ngZone.run(function () {
                  if (_this.screenOrientation.type.includes("portrait")) {
                    _this.isShowOritationPortrait = false;

                    if (!_services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].isLocalHost()) {
                      _this.screenOrientation.lock(_this.screenOrientation.ORIENTATIONS.PORTRAIT);
                    }
                  }

                  if (_this.screenOrientation.type.includes("landscape")) {
                    _this.isShowOritationPortrait = true;
                  }
                });
              });
            }
          };

          this.openImageAnnotation = function (photo) {
            _this.sharedDataService.isOpenImageAnnotation = true;

            _this.sharedDataService.setAnnotationImage(photo);

            _this.sharedDataService.onAnnotationImageDone = function (image) {
              _this.accidentImage = image;
            };

            _this.navCtrl.navigateForward(["/image-annotation"]);
          };

          this.isBodyPartSelected = function () {
            return Object.keys(_this.selectedBodyParts).length > 0;
          };

          this.user = accountService.userValue;

          if (this.sharedDataService.dedicatedMode) {
            this.companyId = (_a = this.sharedDataService.dedicatedModeDeviceDetailData) === null || _a === void 0 ? void 0 : _a.companyID;
          } else {
            this.companyId = (_b = this.user) === null || _b === void 0 ? void 0 : _b.companyID;
          }

          if (sharedDataService.formBuilderDetails) {
            this.formBuilderDetail = sharedDataService.formBuilderDetails;
          } // Add form controls for each type of fields


          this.formGroup = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({});
          var sections = this.formBuilderDetail.sections;

          if (sections) {
            sections.map(function (section, sectionIndex) {
              if (section.isAccidentReportSection) {
                var questions = section.questions;
                questions.map(function (question, questionIndex) {
                  if (section.isAccidentReportSection) {
                    // Make photo attachment not required field for accident section, it should be from api but for temporary for here make it not required
                    if (question.selectedAnswerTypeId === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].CustomAnswerType.PhotoVideoUpload) {
                      question.questionIsRequired = false;
                    }

                    if (question.selectedAnswerTypeId === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].CustomAnswerType.BodyPartControl) {
                      question.bodyParts = _this.bodyParts;
                      _this.bodyPartControlName = _services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].FCUniqueName(section, question);
                    } else if (question.selectedAnswerTypeId === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].CustomAnswerType.LocationSelection) {
                      _this.locationIdControlName = _services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].FCUniqueName(section, question);
                    }

                    if (!question.answerChoiceAttributes || question.answerChoiceAttributes.length === 0) {
                      _this.setupDynamicChoiceList(question.questionDisplayOrder);
                    }
                  }
                });
              }
            });
          }

          this.utilService.questionElementIdsUpdate = function (questionElementIds) {
            _this.questionElementIds = questionElementIds;
          };

          this.utilService.addFormControlsForVisibleFields(sections, this.formGroup); // -- End -- Add form controls for each type of fields
        }

        _createClass(FormAccidentReportPage, [{
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {
            this.sharedDataService.isOpenImageAnnotation = false;
            this.getLocationItemList();
            this.getAccidentTypeList();
            this.getAccidentClassificationList();
          }
        }, {
          key: "ionViewWillLeave",
          value: function ionViewWillLeave() {}
        }, {
          key: "ionViewWillEnter",
          value: function ionViewWillEnter() {
            this.handleOrientation();
          }
        }, {
          key: "ionViewDidLeave",
          value: function ionViewDidLeave() {
            if (this.sharedDataService.dedicatedMode) {
              if (!this.sharedDataService.isOpenImageAnnotation) {
                if (!_services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].isLocalHost()) {
                  this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
                  this.screenOrientationSubscribe.unsubscribe();
                }
              }
            }
          }
        }, {
          key: "placeInTheListChange",
          value: function placeInTheListChange(event) {
            if (event.detail.value) {
              this.formGroup.controls[_services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentCustomLocationControlsName.PlaceNotintheList].setValue(false);

              this.formGroup.controls[_services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentCustomLocationControlsName.LocationName].setValue("");
            }
          }
        }, {
          key: "placeNotintheListChange",
          value: function placeNotintheListChange(event, controlName) {
            if (event.detail.checked) {
              this.formGroup.controls[controlName].setValue("");
            } else {
              this.formGroup.controls[_services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentCustomLocationControlsName.LocationName].setValue("");
            }
          }
        }, {
          key: "previousPart",
          value: function previousPart() {
            if (this.currentBodyPartIndex > 0) {
              this.currentBodyPartIndex--;
            }
          }
        }, {
          key: "nextPart",
          value: function nextPart() {
            if (this.currentBodyPartIndex < this.bodyParts.length - 1) {
              this.currentBodyPartIndex++;
            }
          }
        }, {
          key: "partSelectChange",
          value: function partSelectChange(item, event) {
            this.selectedBodyParts[item.id] = Object.assign(Object.assign({}, item), {
              checked: event.detail.checked
            });
            var element = document.getElementById(item.id);

            if (event.detail.checked) {
              element.style.fill = "#E74731";
            } else {
              element.style.fill = item.path.fill;
            }
          }
        }, {
          key: "pathSelect",
          value: function pathSelect(type) {
            var selectedItem;
            this.bodyParts.map(function (item) {
              item.parts.map(function (subItem) {
                if (subItem.id === type) {
                  selectedItem = subItem;
                  return;
                }
              });

              if (selectedItem) {
                return;
              }
            });

            if (selectedItem) {
              var checked = this.selectedBodyParts[type] && this.selectedBodyParts[type].checked ? false : true;
              this.selectedBodyParts[type] = Object.assign(Object.assign({}, selectedItem), {
                checked: checked
              });
              var bodyPartControlGroup = this.formGroup.controls[this.bodyPartControlName];

              bodyPartControlGroup.controls[_services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].SubFCName(this.bodyPartControlName, type)].setValue(checked);

              var element = document.getElementById(selectedItem.id);

              if (this.selectedBodyParts[type].checked) {
                element.style.fill = "#E74731";
              } else {
                element.style.fill = selectedItem.path.fill;
              }
            }
          }
        }, {
          key: "photoAdded",
          value: function photoAdded(photo) {
            this.openImageAnnotation(photo);
          }
        }, {
          key: "photoRemoved",
          value: function photoRemoved() {
            this.accidentImage = null;
          }
        }, {
          key: "removeSelectedBodyPart",
          value: function removeSelectedBodyPart(item) {
            this.selectedBodyParts[item.id] = Object.assign(Object.assign({}, item), {
              checked: false
            });
            var bodyPartControlGroup = this.formGroup.controls[this.bodyPartControlName];

            bodyPartControlGroup.controls[_services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].SubFCName(this.bodyPartControlName, item.id)].setValue(false);

            var element = document.getElementById(item.id);
            element.style.fill = item.path.fill;
          }
        }, {
          key: "onClose",
          value: function onClose() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this2 = this;

              var modal;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.modalController.create({
                        component: _modals_exit_confirmation_exit_confirmation_page__WEBPACK_IMPORTED_MODULE_7__["ExitConfirmationPage"],
                        swipeToClose: false,
                        showBackdrop: false,
                        backdropDismiss: false,
                        animated: true,
                        componentProps: {}
                      });

                    case 2:
                      modal = _context.sent;
                      _context.next = 5;
                      return modal.present();

                    case 5:
                      modal.onWillDismiss().then(function (_ref) {
                        var data = _ref.data;

                        if (data) {
                          _this2.onBack();
                        }
                      });

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "onBack",
          value: function onBack() {
            if (this.sharedDataService.viewFormFor === _services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].ViewFormForType.Induction) {
              this.navCtrl.navigateBack("/checkinout-confirm");
            } else {
              this.navCtrl.back();
            }
          }
        }, {
          key: "isError",
          value: function isError(section, question) {
            var controlName = _services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"].FCUniqueName(section, question);

            return this.isSubmitted && !this.formGroup.controls[controlName].valid;
          } // If location not selected or not entered manually

        }, {
          key: "isLocationSelected",
          value: function isLocationSelected() {
            var locationIdControl = this.formGroup.controls[this.locationIdControlName];
            var locationNameControl = this.formGroup.controls[_services_enum_service__WEBPACK_IMPORTED_MODULE_9__["EnumService"].AccidentCustomLocationControlsName.LocationName];

            if (locationIdControl && locationNameControl && !(locationIdControl === null || locationIdControl === void 0 ? void 0 : locationIdControl.value) && !(locationNameControl === null || locationNameControl === void 0 ? void 0 : locationNameControl.value)) {
              return false;
            }

            return true;
          }
        }, {
          key: "onContinue",
          value: function onContinue() {
            var _this3 = this;

            this.isSubmitted = true;
            this.errorMessage = "";

            if (this.formGroup.valid && !this.isLocationSelected()) {
              this.errorMessage = "Please select a location or enter one manually.";
            }

            if (!this.errorMessage) {
              this.sharedDataService.saveFormAnswers(this.apiService, this.formGroup, this.formBuilderDetail, this.user, function (status, result) {
                if (status) {} else {
                  _this3.errorMessage = result;
                }
              });
            }
          }
        }]);

        return FormAccidentReportPage;
      }();

      FormAccidentReportPage.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"]
        }, {
          type: _services_shared_data_service__WEBPACK_IMPORTED_MODULE_10__["SharedDataService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]
        }, {
          type: _services_observables_service__WEBPACK_IMPORTED_MODULE_11__["ObservablesService"]
        }, {
          type: _ionic_native_screen_orientation_ngx__WEBPACK_IMPORTED_MODULE_12__["ScreenOrientation"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]
        }, {
          type: _services_account_service__WEBPACK_IMPORTED_MODULE_13__["AccountService"]
        }, {
          type: _services_api_service__WEBPACK_IMPORTED_MODULE_15__["ApiService"]
        }, {
          type: _services_util_service__WEBPACK_IMPORTED_MODULE_14__["UtilService"]
        }, {
          type: _services_validator_service__WEBPACK_IMPORTED_MODULE_16__["ValidatorService"]
        }];
      };

      FormAccidentReportPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: "app-form-accident-report",
        template: _raw_loader_form_accident_report_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_form_accident_report_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
      })], FormAccidentReportPage);
      /***/
    },

    /***/
    "gyqi":
    /*!***********************************************************************************!*\
      !*** ./src/app/pages/form-accident-report/form-accident-report-routing.module.ts ***!
      \***********************************************************************************/

    /*! exports provided: FormAccidentReportPageRoutingModule */

    /***/
    function gyqi(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FormAccidentReportPageRoutingModule", function () {
        return FormAccidentReportPageRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _form_accident_report_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./form-accident-report.page */
      "Siwv");

      var routes = [{
        path: '',
        component: _form_accident_report_page__WEBPACK_IMPORTED_MODULE_3__["FormAccidentReportPage"]
      }];

      var FormAccidentReportPageRoutingModule = function FormAccidentReportPageRoutingModule() {
        _classCallCheck(this, FormAccidentReportPageRoutingModule);
      };

      FormAccidentReportPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], FormAccidentReportPageRoutingModule);
      /***/
    },

    /***/
    "lgNe":
    /*!***************************************************************************!*\
      !*** ./src/app/pages/form-accident-report/form-accident-report.page.scss ***!
      \***************************************************************************/

    /*! exports provided: default */

    /***/
    function lgNe(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "ion-content.dedicated-mode {\n  --background: #F6F9FB;\n}\nion-content.dedicated-mode ion-list {\n  width: 70%;\n  border-radius: 12px;\n  margin: 20px auto 0;\n}\nion-content.dedicated-mode .text-bottom-msg {\n  box-shadow: 0px 0 20px rgba(0, 0, 0, 0.3);\n  margin-top: 40px;\n  color: #171538;\n  padding: 0 16px;\n  background-color: #ffffff;\n}\nion-content.dedicated-mode .text-bottom-msg ion-label {\n  padding: 16px 0;\n}\nion-content.dedicated-mode .text-bottom-msg .action-btn {\n  width: 200px;\n  margin: 0;\n  margin-left: 16px;\n}\nion-content ion-list ion-item {\n  --min-height: 18px;\n  --padding-start: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --inner-padding-end: 0;\n  margin: 0 23px;\n  margin-top: 24px;\n}\nion-content ion-list ion-item ion-label {\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #575568;\n}\nion-content ion-list ion-item.date-item .date-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  border: 1px solid #E8EAF2;\n  border-radius: 3px;\n  padding: 2px 16px;\n  width: 100%;\n}\nion-content ion-list ion-item.date-item ion-datetime {\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #171538;\n}\nion-content ion-list ion-item.drop-down-item ion-select {\n  height: 42px;\n  --padding-start: 44px;\n  --padding-end: 8px;\n  --color: #171538;\n  --placeholder-color: #171538;\n  margin-top: 9px;\n  border: 1px solid #CACEE1;\n  border-radius: 3px;\n  --background: #FFFFFF;\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  background-image: url('arrow-down.svg');\n  background-position: 16px;\n  background-repeat: no-repeat;\n}\nion-content ion-list ion-item.drop-down-item ion-select::part(icon) {\n  display: none !important;\n}\nion-content ion-list ion-item.input-item ion-input {\n  min-height: 42px;\n  --color: #171538;\n  --placeholder-color: #171538;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  margin-top: 9px;\n  border: 1px solid #CACEE1;\n  border-radius: 3px;\n  --background: #FFFFFF;\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n}\nion-content ion-list ion-item .error {\n  --background: #FFF6DE !important;\n  background-color: #FFF6DE !important;\n  border: 1px solid #E4D3A3 !important;\n  border-radius: 3px !important;\n}\nion-content ion-list .radio-input-view {\n  margin-top: 28px;\n}\nion-content ion-list .radio-input-view h2 {\n  margin: 0 23px;\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #171538;\n  margin-bottom: 8px;\n}\nion-content ion-list .radio-input-view ion-radio {\n  --border-radius: 12px;\n  --color: #A1A8CA;\n  --color-checked: #A1A8CA;\n  --inner-border-radius: 11px;\n  margin-right: 13px;\n}\nion-content ion-list .radio-input-view ion-checkbox {\n  --border-color: #A1A8CA;\n  --border-color-checked: #A1A8CA;\n  --checkmark-color: #A1A8CA;\n  --border-width: 1px;\n  --border-style: solid;\n  --border-radius: 2px;\n  --background-checked: transparent;\n  --background: transparent;\n  margin-right: 13px;\n}\nion-content ion-list .radio-input-view ion-label {\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #171538;\n}\nion-content ion-list .radio-input-view ion-item {\n  margin-top: 0;\n}\nion-content ion-list .affected-body-part-view {\n  padding: 23px;\n}\nion-content ion-list .affected-body-part-view ion-label {\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #171538;\n}\nion-content ion-list .affected-body-part-view .visual-body-part {\n  justify-content: center;\n  align-items: center;\n  display: flex;\n}\nion-content ion-list .affected-body-part-view .visual-body-part svg {\n  margin-top: 30px;\n  width: 100%;\n  height: auto;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view {\n  display: none;\n  position: absolute;\n  width: 90%;\n  background-color: #ffffff;\n  border: 1px solid #E8EAF2;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view ion-toolbar {\n  min-height: 44px;\n  --background: #F8F9FB;\n  --border-color: #E8EAF2;\n  --border-width: 0 0 1px;\n  --border-style: solid;\n  --padding-bottom: 0;\n  --padding-top: 0;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view ion-toolbar ion-title {\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  display: flex;\n  text-align: center;\n  color: #171538;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view ion-toolbar .arrow-button {\n  --color: #323232;\n  width: 44px;\n  height: 44px;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view ion-toolbar .arrow-button ion-icon {\n  width: 16px;\n  height: 16px;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view .parts-checkboxes {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 16px 0;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view .parts-checkboxes ion-item {\n  width: 50%;\n  margin-top: 0;\n  margin: 0;\n  padding-left: 25px;\n}\nion-content ion-list .affected-body-part-view .visual-body-part .parts-view .parts-checkboxes ion-item ion-checkbox {\n  --border-color: #A1A8CA;\n  --border-color-checked: #CACEE1;\n  --checkmark-color: #ffffff;\n  --border-width: 1px;\n  --border-style: solid;\n  --border-radius: 2px;\n  --background-checked: #2A6FDB;\n  --background: transparent;\n  margin-right: 8px;\n  --size: 16px;\n}\nion-content ion-list .affected-body-part-view .selected-parts-view {\n  margin-top: 16px;\n  display: flex;\n  flex-wrap: wrap;\n}\nion-content ion-list .affected-body-part-view .selected-parts-view .body-part {\n  display: flex;\n  flex-direction: row;\n  padding: 0px 5px;\n  align-items: center;\n  justify-content: center;\n  margin: 8px;\n  background-color: #2A6FDB;\n  border-radius: 2px;\n}\nion-content ion-list .affected-body-part-view .selected-parts-view .body-part .name {\n  margin-left: 4px;\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 12px;\n  line-height: 16px;\n  color: #FFFFFF;\n}\nion-content ion-list .affected-body-part-view .selected-parts-view .body-part ion-button {\n  margin-left: 6px;\n  padding: 0;\n  --background: #558CE2;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  height: 16px;\n  width: 16px;\n  --border-radius: 50%;\n  color: #fff;\n}\nion-content ion-list .affected-body-part-view .selected-parts-view .body-part ion-icon {\n  font-size: 12px;\n}\nion-content ion-list .hr-line-full {\n  width: 100%;\n  height: 1px;\n  background-color: rgba(74, 144, 226, 0.2);\n}\nion-content ion-list .description {\n  margin: 0 23px;\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  color: #171538;\n}\nion-content ion-list .notes-view {\n  margin: 16px 23px;\n  background: #F7FAFE;\n  padding: 5px 10px;\n}\nion-content ion-list .notes-view ion-textarea {\n  margin-top: 8px;\n  --border-radius: 3px;\n  --placeholder-color: #A1A8CA;\n  --color: #A1A8CA;\n  --padding-start: 12px;\n  --padding-end: 12px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  background: #FFFFFF;\n  border: 1px solid #E8EAF2;\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n}\nion-content ion-list .text-bottom-msg {\n  font-family: IBM Plex Sans;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 18px;\n  text-align: center;\n  color: #171538;\n  padding: 16px 32px;\n}\nion-content ion-list .action-btn {\n  width: 100%;\n  margin: 0;\n  --border-radius: 3px;\n  border-radius: 3px;\n  overflow: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2Zvcm0tYWNjaWRlbnQtcmVwb3J0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFRTtFQUNFLHFCQUFBO0FBREo7QUFHSTtFQUNFLFVBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBRE47QUFLSTtFQUNFLHlDQUFBO0VBRUEsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBSk47QUFNTTtFQUNFLGVBQUE7QUFKUjtBQU9NO0VBQ0UsWUFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtBQUxSO0FBV0k7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBVE47QUFXTTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFUUjtBQWFRO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0FBWFY7QUFjUTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFaVjtBQWlCUTtFQUNFLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSx1Q0FBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7QUFmVjtBQWlCVTtFQUNFLHdCQUFBO0FBZlo7QUFxQlE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQW5CVjtBQXdCTTtFQUNFLGdDQUFBO0VBQ0Esb0NBQUE7RUFDQSxvQ0FBQTtFQUNBLDZCQUFBO0FBdEJSO0FBMEJJO0VBQ0UsZ0JBQUE7QUF4Qk47QUEwQk07RUFDRSxjQUFBO0VBQ0EsMEJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBeEJSO0FBMkJNO0VBQ0UscUJBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQXpCUjtBQTRCTTtFQUNFLHVCQUFBO0VBQ0EsK0JBQUE7RUFDQSwwQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlDQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtBQTFCUjtBQTZCTTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUEzQlI7QUE4Qk07RUFDRSxhQUFBO0FBNUJSO0FBZ0NJO0VBQ0UsYUEvS2M7QUFpSnBCO0FBZ0NNO0VBQ0UsMEJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQTlCUjtBQWlDTTtFQUNFLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0FBL0JSO0FBaUNRO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQS9CVjtBQWtDUTtFQUNFLGFBQUE7RUFFQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUNBLHlCQUFBO0FBakNWO0FBbUNVO0VBQ0UsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFqQ1o7QUFtQ1k7RUFDRSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBakNkO0FBb0NZO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQWxDZDtBQW9DYztFQUNFLFdBQUE7RUFDQSxZQUFBO0FBbENoQjtBQXdDVTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQXRDWjtBQXdDWTtFQUNFLFVBQUE7RUFDQSxhQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBdENkO0FBd0NjO0VBQ0UsdUJBQUE7RUFDQSwrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsNkJBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtBQXRDaEI7QUE2Q007RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0FBM0NSO0FBNkNRO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7QUEzQ1Y7QUE2Q1U7RUFDRSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUEzQ1o7QUE4Q1U7RUFDRSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLFdBQUE7QUE1Q1o7QUErQ1U7RUFDRSxlQUFBO0FBN0NaO0FBbURJO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSx5Q0FBQTtBQWpETjtBQW9ESTtFQUNFLGNBQUE7RUFDQSwwQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBbEROO0FBcURJO0VBQ0UsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FBbkROO0FBc0RNO0VBQ0UsZUFBQTtFQUNBLG9CQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQXBEUjtBQXlESTtFQUNFLDBCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0FBdkROO0FBMERJO0VBQ0UsV0FBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUF4RE4iLCJmaWxlIjoiZm9ybS1hY2NpZGVudC1yZXBvcnQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJHBhZGRpbmdIb3Jpem9udGFsOiAyM3B4O1xuaW9uLWNvbnRlbnQge1xuICAmLmRlZGljYXRlZC1tb2RlIHtcbiAgICAtLWJhY2tncm91bmQ6ICNGNkY5RkI7XG5cbiAgICBpb24tbGlzdCB7XG4gICAgICB3aWR0aDogNzAlO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgIG1hcmdpbjogMjBweCBhdXRvIDA7XG4gICAgfVxuXG5cbiAgICAudGV4dC1ib3R0b20tbXNnIHtcbiAgICAgIGJveC1zaGFkb3c6IDBweCAwIDIwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuXG4gICAgICBtYXJnaW4tdG9wOiA0MHB4O1xuICAgICAgY29sb3I6ICMxNzE1Mzg7XG4gICAgICBwYWRkaW5nOiAwIDE2cHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuXG4gICAgICBpb24tbGFiZWwge1xuICAgICAgICBwYWRkaW5nOiAxNnB4IDA7XG4gICAgICB9XG5cbiAgICAgIC5hY3Rpb24tYnRuIHtcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlvbi1saXN0IHtcbiAgICBpb24taXRlbSB7XG4gICAgICAtLW1pbi1oZWlnaHQ6IDE4cHg7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gICAgICAtLXBhZGRpbmctdG9wOiAwO1xuICAgICAgLS1wYWRkaW5nLWJvdHRvbTogMDtcbiAgICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDA7XG4gICAgICBtYXJnaW46IDAgJHBhZGRpbmdIb3Jpem9udGFsO1xuICAgICAgbWFyZ2luLXRvcDogMjRweDtcblxuICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgZm9udC1mYW1pbHk6IElCTSBQbGV4IFNhbnM7XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICAgICAgY29sb3I6ICM1NzU1Njg7XG4gICAgICB9XG5cbiAgICAgICYuZGF0ZS1pdGVtIHtcbiAgICAgICAgLmRhdGUtZmllbGQge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNFOEVBRjI7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgIHBhZGRpbmc6IDJweCAxNnB4O1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgaW9uLWRhdGV0aW1lIHtcbiAgICAgICAgICBmb250LWZhbWlseTogSUJNIFBsZXggU2FucztcbiAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gICAgICAgICAgY29sb3I6ICMxNzE1Mzg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5kcm9wLWRvd24taXRlbSB7XG4gICAgICAgIGlvbi1zZWxlY3Qge1xuICAgICAgICAgIGhlaWdodDogNDJweDtcbiAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDQ0cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgICAgIC0tY29sb3I6ICMxNzE1Mzg7XG4gICAgICAgICAgLS1wbGFjZWhvbGRlci1jb2xvcjogIzE3MTUzODtcbiAgICAgICAgICBtYXJnaW4tdG9wOiA5cHg7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI0NBQ0VFMTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgLS1iYWNrZ3JvdW5kOiAjRkZGRkZGO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBJQk0gUGxleCBTYW5zO1xuICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi8uLi8uLi8uLi9hc3NldHMvaWNvbi9hcnJvdy1kb3duLnN2Zyk7XG4gICAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTZweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXG4gICAgICAgICAgJjo6cGFydChpY29uKSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYuaW5wdXQtaXRlbSB7XG4gICAgICAgIGlvbi1pbnB1dCB7XG4gICAgICAgICAgbWluLWhlaWdodDogNDJweDtcbiAgICAgICAgICAtLWNvbG9yOiAjMTcxNTM4O1xuICAgICAgICAgIC0tcGxhY2Vob2xkZXItY29sb3I6ICMxNzE1Mzg7XG4gICAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgICAgIG1hcmdpbi10b3A6IDlweDtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjQ0FDRUUxO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAtLWJhY2tncm91bmQ6ICNGRkZGRkY7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IElCTSBQbGV4IFNhbnM7XG4gICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgLmVycm9yIHtcbiAgICAgICAgLS1iYWNrZ3JvdW5kOiAjRkZGNkRFICFpbXBvcnRhbnQ7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY2REUgIWltcG9ydGFudDtcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI0U0RDNBMyAhaW1wb3J0YW50O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAzcHggIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAucmFkaW8taW5wdXQtdmlldyB7XG4gICAgICBtYXJnaW4tdG9wOiAyOHB4O1xuXG4gICAgICBoMiB7XG4gICAgICAgIG1hcmdpbjogMCAkcGFkZGluZ0hvcml6b250YWw7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBJQk0gUGxleCBTYW5zO1xuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gICAgICAgIGNvbG9yOiAjMTcxNTM4O1xuICAgICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICB9XG5cbiAgICAgIGlvbi1yYWRpbyB7XG4gICAgICAgIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgLS1jb2xvcjogI0ExQThDQTtcbiAgICAgICAgLS1jb2xvci1jaGVja2VkOiAjQTFBOENBO1xuICAgICAgICAtLWlubmVyLWJvcmRlci1yYWRpdXM6IDExcHg7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTNweDtcbiAgICAgIH1cblxuICAgICAgaW9uLWNoZWNrYm94IHtcbiAgICAgICAgLS1ib3JkZXItY29sb3I6ICNBMUE4Q0E7XG4gICAgICAgIC0tYm9yZGVyLWNvbG9yLWNoZWNrZWQ6ICNBMUE4Q0E7XG4gICAgICAgIC0tY2hlY2ttYXJrLWNvbG9yOiAjQTFBOENBO1xuICAgICAgICAtLWJvcmRlci13aWR0aDogMXB4O1xuICAgICAgICAtLWJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgICAgIC0tYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICAtLWJhY2tncm91bmQtY2hlY2tlZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMTNweDtcbiAgICAgIH1cblxuICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgZm9udC1mYW1pbHk6IElCTSBQbGV4IFNhbnM7XG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICAgICAgY29sb3I6ICMxNzE1Mzg7XG4gICAgICB9XG5cbiAgICAgIGlvbi1pdGVtIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuYWZmZWN0ZWQtYm9keS1wYXJ0LXZpZXcge1xuICAgICAgcGFkZGluZzogJHBhZGRpbmdIb3Jpem9udGFsO1xuXG4gICAgICBpb24tbGFiZWwge1xuICAgICAgICBmb250LWZhbWlseTogSUJNIFBsZXggU2FucztcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgICAgICBjb2xvcjogIzE3MTUzODtcbiAgICAgIH1cblxuICAgICAgLnZpc3VhbC1ib2R5LXBhcnQge1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcblxuICAgICAgICBzdmcge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICB9XG5cbiAgICAgICAgLnBhcnRzLXZpZXcge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG5cbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgd2lkdGg6IDkwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNFOEVBRjI7XG5cbiAgICAgICAgICBpb24tdG9vbGJhciB7XG4gICAgICAgICAgICBtaW4taGVpZ2h0OiA0NHB4O1xuICAgICAgICAgICAgLS1iYWNrZ3JvdW5kOiAjRjhGOUZCO1xuICAgICAgICAgICAgLS1ib3JkZXItY29sb3I6ICNFOEVBRjI7XG4gICAgICAgICAgICAtLWJvcmRlci13aWR0aDogMCAwIDFweDtcbiAgICAgICAgICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgICAgIC0tcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgICAgICAtLXBhZGRpbmctdG9wOiAwO1xuXG4gICAgICAgICAgICBpb24tdGl0bGUge1xuICAgICAgICAgICAgICBmb250LWZhbWlseTogSUJNIFBsZXggU2FucztcbiAgICAgICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICAgIGNvbG9yOiAjMTcxNTM4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuYXJyb3ctYnV0dG9uIHtcbiAgICAgICAgICAgICAgLS1jb2xvcjogIzMyMzIzMjtcbiAgICAgICAgICAgICAgd2lkdGg6IDQ0cHg7XG4gICAgICAgICAgICAgIGhlaWdodDogNDRweDtcblxuICAgICAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE2cHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAucGFydHMtY2hlY2tib3hlcyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICAgICAgcGFkZGluZzogMTZweCAwO1xuXG4gICAgICAgICAgICBpb24taXRlbSB7XG4gICAgICAgICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAyNXB4O1xuXG4gICAgICAgICAgICAgIGlvbi1jaGVja2JveCB7XG4gICAgICAgICAgICAgICAgLS1ib3JkZXItY29sb3I6ICNBMUE4Q0E7XG4gICAgICAgICAgICAgICAgLS1ib3JkZXItY29sb3ItY2hlY2tlZDogI0NBQ0VFMTtcbiAgICAgICAgICAgICAgICAtLWNoZWNrbWFyay1jb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgICAgICAgICAtLWJvcmRlci13aWR0aDogMXB4O1xuICAgICAgICAgICAgICAgIC0tYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgICAgICAgICAtLWJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICAgICAgICAtLWJhY2tncm91bmQtY2hlY2tlZDogIzJBNkZEQjtcbiAgICAgICAgICAgICAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgICAgICAgICAgIC0tc2l6ZTogMTZweDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuc2VsZWN0ZWQtcGFydHMtdmlldyB7XG4gICAgICAgIG1hcmdpbi10b3A6IDE2cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtd3JhcDogd3JhcDtcblxuICAgICAgICAuYm9keS1wYXJ0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgcGFkZGluZzogMHB4IDVweDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIG1hcmdpbjogOHB4O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyQTZGREI7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuXG4gICAgICAgICAgLm5hbWUge1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBJQk0gUGxleCBTYW5zO1xuICAgICAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICAgICAgICAgICAgY29sb3I6ICNGRkZGRkY7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIC0tYmFja2dyb3VuZDogIzU1OENFMjtcbiAgICAgICAgICAgIC0tcGFkZGluZy1ib3R0b206IDA7XG4gICAgICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gICAgICAgICAgICAtLXBhZGRpbmctZW5kOiAwO1xuICAgICAgICAgICAgLS1wYWRkaW5nLXRvcDogMDtcbiAgICAgICAgICAgIGhlaWdodDogMTZweDtcbiAgICAgICAgICAgIHdpZHRoOiAxNnB4O1xuICAgICAgICAgICAgLS1ib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmhyLWxpbmUtZnVsbCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGhlaWdodDogMXB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg3NCwgMTQ0LCAyMjYsIDAuMik7XG4gICAgfVxuXG4gICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgIG1hcmdpbjogMCAkcGFkZGluZ0hvcml6b250YWw7XG4gICAgICBmb250LWZhbWlseTogSUJNIFBsZXggU2FucztcbiAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICAgIGNvbG9yOiAjMTcxNTM4O1xuICAgIH1cblxuICAgIC5ub3Rlcy12aWV3IHtcbiAgICAgIG1hcmdpbjogMTZweCAkcGFkZGluZ0hvcml6b250YWw7XG4gICAgICBiYWNrZ3JvdW5kOiAjRjdGQUZFO1xuICAgICAgcGFkZGluZzogNXB4IDEwcHg7XG5cblxuICAgICAgaW9uLXRleHRhcmVhIHtcbiAgICAgICAgbWFyZ2luLXRvcDogOHB4O1xuICAgICAgICAtLWJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgLS1wbGFjZWhvbGRlci1jb2xvcjogI0ExQThDQTtcbiAgICAgICAgLS1jb2xvcjogI0ExQThDQTtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAxMnB4O1xuICAgICAgICAtLXBhZGRpbmctZW5kOiAxMnB4O1xuICAgICAgICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAgICAgICAtLXBhZGRpbmctYm90dG9tOiAxMnB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjRThFQUYyO1xuICAgICAgICBmb250LWZhbWlseTogSUJNIFBsZXggU2FucztcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLnRleHQtYm90dG9tLW1zZyB7XG4gICAgICBmb250LWZhbWlseTogSUJNIFBsZXggU2FucztcbiAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBsaW5lLWhlaWdodDogMThweDtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGNvbG9yOiAjMTcxNTM4O1xuICAgICAgcGFkZGluZzogMTZweCAzMnB4O1xuICAgIH1cblxuICAgIC5hY3Rpb24tYnRuIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgLS1ib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cbiAgfVxufVxuXG5cbiJdfQ== */";
      /***/
    },

    /***/
    "wEPM":
    /*!*****************************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/form-accident-report/form-accident-report.page.html ***!
      \*****************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function wEPM(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<app-portrait-orientation *ngIf=\"isShowOritationPortrait;else formView\"\n                          (close)=\"isShowOritationPortrait=false\"></app-portrait-orientation>\n\n<ng-template #formView>\n    <ion-header mode=\"ios\">\n        <app-modal-header *ngIf=\"!sharedDataService.dedicatedMode\" [modalTitle]=\"formBuilderDetail?.title\"\n                          (closeModal)=\"onClose()\"></app-modal-header>\n\n        <app-modal-header-dm *ngIf=\"sharedDataService.dedicatedMode\"\n                             [modalTitle]=\"sharedDataService.getCurrentCheckedInEntityName()\" (closeModal)=\"onClose()\"\n                             [modalSubTitle]=\"formBuilderDetail?.title\"></app-modal-header-dm>\n\n        <app-warning-component *ngIf=\"errorMessage\" [message]=\"errorMessage\"></app-warning-component>\n    </ion-header>\n\n    <ion-content mode=\"ios\" [ngClass]=\"{'dedicated-mode':sharedDataService.dedicatedMode}\">\n        <div class=\"content-container\">\n            <Form [formGroup]=\"formGroup\" (ngSubmit)=\"onContinue()\">\n                <ion-list lines=\"none\">\n\n                    <ng-container *ngFor=\"let section of formBuilderDetail?.sections; let sectionIndex=index\">\n                        <ng-container *ngIf=\"utilService.shouldShowSection(section)\">\n                            <app-section-title\n                                    [title]=\"UtilService.findObj(section.sectionTranslations, 'sectionTranslationLanguageId', sharedDataService.getLanguageIdForForm()).sectionTranslationTitle\">\n                            </app-section-title>\n\n                            <ng-container *ngIf=\"section.isAccidentReportSection; else customQuestions\">\n                                <ng-container *ngFor=\"let question of section.questions; let questionIndex=index\">\n\n                                    <ng-container *ngIf=\"utilService.shouldShowQuestion(question)\">\n                                        <app-date-time-field\n                                                *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.DateTimeField\"\n                                                [form]=\"formGroup\"\n                                                [label]=\"UtilService.findObj(question.questionTranslations, 'questionTranslationLanguageId', sharedDataService.getLanguageIdForForm()).questionTranslationTitle\"\n                                                [inputName]=\"UtilService.FCUniqueName(section, question)\"\n                                                [isError]=\"isError(section, question)\"\n                                                placeholder=\"Choose\"\n                                        ></app-date-time-field>\n\n\n                                        <div class=\"radio-input-view\" style=\"padding-top: 8px;\"\n                                             *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.SingleChoiceSet || question.selectedAnswerTypeId === EnumService.CustomAnswerType.MultipleChoiceSet || question.selectedAnswerTypeId === EnumService.CustomAnswerType.MultiLineText || question.selectedAnswerTypeId === EnumService.CustomAnswerType.PhotoVideoUpload\"\n                                             [ngClass]=\"{'error':isError(section, question)}\">\n                                            <h2>{{UtilService.findObj(question.questionTranslations, 'questionTranslationLanguageId', sharedDataService.getLanguageIdForForm()).questionTranslationTitle}} </h2>\n\n                                            <app-single-choice-field\n                                                    *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.SingleChoiceSet\"\n                                                    [form]=\"formGroup\"\n                                                    [inputName]=\"UtilService.FCUniqueName(section, question)\"\n                                                    [list]=\"question.answerChoiceAttributes\"\n                                            ></app-single-choice-field>\n\n                                            <app-multiple-choice-field\n                                                    *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.MultipleChoiceSet\"\n                                                    [form]=\"formGroup\"\n                                                    [inputName]=\"UtilService.FCUniqueName(section, question)\"\n                                                    [list]=\"question.answerChoiceAttributes\"\n                                            ></app-multiple-choice-field>\n\n                                            <app-multiline-text-field\n                                                    *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.MultiLineText\"\n                                                    [form]=\"formGroup\"\n                                                    [inputName]=\"UtilService.FCUniqueName(section, question)\"\n                                            ></app-multiline-text-field>\n\n                                            <app-photo-field\n                                                    *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.PhotoVideoUpload\"\n                                                    [formControlName]=\"UtilService.FCUniqueName(section, question)\"\n                                            ></app-photo-field>\n                                        </div>\n\n\n                                        <app-dropdown-field\n                                                *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.ClassicDropdown\"\n                                                [form]=\"formGroup\"\n                                                [label]=\"UtilService.findObj(question.questionTranslations, 'questionTranslationLanguageId', sharedDataService.getLanguageIdForForm()).questionTranslationTitle\"\n                                                [inputName]=\"UtilService.FCUniqueName(section, question)\"\n                                                [list]=\"question.answerChoiceAttributes\"\n                                                [listLabelKey]=\"question.listLabelKey\"\n                                                [listValueKey]=\"question.listValueKey\"\n                                                [isError]=\"isError(section, question)\"\n                                                placeholder=\"Choose\"\n                                        ></app-dropdown-field>\n\n                                        <div *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.LocationSelection\"\n                                             [ngClass]=\"{'error': (isSubmitted && !isLocationSelected())}\"\n                                             style=\"padding-bottom: 16px\">\n                                            <ion-item class=\"drop-down-item\">\n                                                <ion-label position=\"stacked\">\n                                                    <h4>{{UtilService.findObj(question.questionTranslations, 'questionTranslationLanguageId', sharedDataService.getLanguageIdForForm()).questionTranslationTitle}}</h4>\n                                                    <p class=\"ion-text-wrap\">\n                                                        Note: if the place is not available in the dropdown above,\n                                                        please\n                                                        type\n                                                        location name to the next box below manually.\n                                                    </p>\n                                                </ion-label>\n                                                <ion-select\n                                                        [interfaceOptions]=\"accidentAlertOptions\"\n                                                        [formControlName]=\"UtilService.FCUniqueName(section, question)\"\n                                                        placeholder=\"Choose\"\n                                                        (ionChange)=\"placeInTheListChange($event)\"\n                                                >\n                                                    <ion-select-option *ngFor=\"let item of locations\"\n                                                                       [value]=\"item.locationID\">{{item.locationName}}</ion-select-option>\n                                                </ion-select>\n                                            </ion-item>\n\n                                            <ion-item>\n                                                <ion-checkbox slot=\"start\"\n                                                              [formControlName]=\"EnumService.AccidentCustomLocationControlsName.PlaceNotintheList\"\n                                                              (ionChange)=\"placeNotintheListChange($event,UtilService.FCUniqueName(section, question))\"></ion-checkbox>\n                                                <ion-label>Place not in the list</ion-label>\n                                            </ion-item>\n\n                                            <ion-item class=\"input-item\"\n                                                      *ngIf=\"formGroup.controls[EnumService.AccidentCustomLocationControlsName.PlaceNotintheList].value\">\n                                                <ion-label position=\"stacked\">\n                                                    Location Name\n                                                    <ion-note style=\"font-size: 90%\">(if not available in above\n                                                        dropdown)\n                                                    </ion-note>\n                                                </ion-label>\n                                                <ion-input\n                                                        [formControlName]=\"EnumService.AccidentCustomLocationControlsName.LocationName\"></ion-input>\n                                            </ion-item>\n                                        </div>\n\n\n                                        <ng-container\n                                                *ngIf=\"question.selectedAnswerTypeId === EnumService.CustomAnswerType.BodyPartControl\">\n                                            <div class=\"affected-body-part-view\"\n                                                 [ngClass]=\"{'error': isError(section, question)}\">\n                                                <ion-label>\n                                                    <h4>\n                                                        {{UtilService.findObj(question.questionTranslations, 'questionTranslationLanguageId', sharedDataService.getLanguageIdForForm()).questionTranslationTitle}}\n                                                        <br/>\n                                                        (tap on the effected area to choose)\n                                                    </h4>\n                                                </ion-label>\n\n                                                <div class=\"visual-body-part\">\n                                                    <svg width=\"100%\" height=\"700\" viewBox=\"0 0 183 459\" fill=\"none\"\n                                                         xmlns=\"http://www.w3.org/2000/svg\">\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.FullBody)\"\n                                                              fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                                                              d=\"M107.22 45.2356C107.048 47.2852 106.789 49.1082 106.249 50.9204C105.926 51.9992 105.149 52.9053 104.944 53.8438C104.48 56.0228 105.074 58.8814 105.106 61.3193C105.138 63.6169 105.095 66.7021 105.591 68.3094C106.789 72.1388 112.959 73.6382 116.799 75.2995C118.115 75.8712 119.41 76.7449 120.855 77.4137C129.453 81.3726 140.574 82.063 145.547 89.9269C149.981 96.9385 151.189 108.945 150.261 120.627C150.035 123.453 149.29 126.377 149.29 129.074C149.29 132.849 150.164 136.743 149.938 140.605C149.733 144.229 148.557 147.822 148.632 151.327C148.708 154.218 150.272 157.886 151.394 160.906C152.516 163.938 153.131 167.303 154.155 170.324C156.14 176.181 158.093 182.697 159.193 189.654C160.843 200.096 161.21 211.951 162.925 222.469C163.529 226.169 163.519 230.106 164.554 233.029C165.773 236.492 169.829 237.571 172.839 240.02C174.155 241.087 174.975 242.576 175.924 244.41C176.765 246.028 177.963 247.571 178.685 248.962C179.128 249.804 179.268 250.785 179.656 251.562C180.53 253.277 182.299 254.518 182.256 256.599C179.753 257.657 177.38 255.715 175.762 254.162C174.5 252.953 173.917 250.882 172.353 250.753C171.684 255.154 173.076 258.962 173.162 263.59C173.205 265.628 173.054 268.12 173.162 270.741C173.238 272.521 173.594 276.469 172.191 276.912C169.16 277.883 168.847 272.349 168.459 270.256C167.855 267.052 167.65 264.183 167.488 261.001C166.636 262.025 166.97 264.345 167.003 266.2C167.024 267.937 167.251 269.771 167.326 271.399C167.477 274.528 168.34 280.418 165.698 280.655C162.591 280.935 163.141 275.045 162.774 272.532C162.278 269.188 161.372 266.329 161.469 262.78C160.8 265.154 161.167 268.012 161.307 270.903C161.437 273.611 162.095 277.009 160.66 278.864C158.147 279.08 158.201 276.243 157.898 274.312C157.219 269.922 156.787 263.892 156.108 259.21C155.849 260.386 155.223 262.597 155.137 265.057C155.051 267.365 156.065 271.734 154.166 272.047C151.922 272.413 151.933 266.47 151.728 264.086C151.469 260.968 151.566 256.438 151.243 254.334C150.919 252.241 150.078 250.3 149.938 248.164C149.797 245.834 150.045 243.579 150.261 241.508C150.477 239.448 151.21 237.344 151.07 235.5C150.898 233.04 148.621 229.707 147.661 227.053C144.415 218.143 141.955 209.114 138.73 200.571C136.486 194.616 134.577 188.845 133.045 182.697C132.247 179.482 131.34 176.213 131.092 172.783C130.844 169.288 130.931 165.577 130.445 161.737C129.895 157.347 127.996 152.741 128.007 147.929C127.565 150.788 126.119 153.409 125.731 156.214C125.31 159.278 125.72 162.805 125.569 166.127C125.418 169.385 124.911 172.751 125.084 175.545C125.235 177.983 126.163 180.291 126.378 182.697C126.616 185.242 126.238 187.982 126.54 190.819C126.777 193.117 127.684 195.436 128.169 197.809C129.561 204.627 131.049 212.048 132.236 219.254C133.002 223.968 134.426 228.52 135.321 233.224C136.249 238.078 136.939 243.029 137.759 247.84C138.611 252.824 139.366 257.818 139.711 262.953C140.412 273.471 140.51 285.38 138.902 295.606C138.352 299.133 137.877 302.822 137.273 306.652C137.09 307.817 136.637 309.155 136.626 310.222C136.605 311.7 137.338 313.502 137.597 315.422C138.298 320.427 138.384 327.05 139.226 332.153C140.218 338.215 142.494 344.267 143.282 350.998C143.681 354.342 144.447 357.6 144.587 361.073C145.17 375.56 144.619 390.964 144.263 405.915C144.145 410.78 143.379 416.131 144.425 420.37C144.706 421.503 145.418 422.355 145.731 423.294C146.594 425.915 146.022 428.957 146.54 431.416C146.885 433.067 149.226 435.289 150.272 437.101C152.785 441.405 156.011 444.49 160.024 447.338C160.013 449.129 162.634 450.013 162.785 451.567C162.893 452.699 162.052 453.271 161.652 454.49C160.477 455.159 158.654 455.17 158.082 456.443C156.55 455.871 155.827 457.5 154.673 457.737C153.238 458.028 152.17 457.651 151.103 456.928C149.085 458.578 142.063 459.905 141.685 455.795C137.834 454.824 137.241 450.607 136.486 446.54C133.681 445.742 131.545 445.267 131.125 442.646C130.801 440.672 132.085 439.01 132.096 437.123C132.106 434.75 130.068 431.233 129.819 428.353C129.42 423.747 130.769 418.698 130.467 414.06C130.262 410.91 129.054 408.224 128.029 405.29C127.08 402.582 126.206 399.724 125.429 396.843C123.897 391.159 121.697 385.474 120.715 379.465C119.173 370.037 117.306 360.944 117.306 349.736C117.306 346.187 117.598 342.206 116.983 339.013C116.713 337.611 115.548 336.069 114.868 334.461C112.97 329.985 110.726 324.936 109.507 319.845C107.803 312.682 106.886 304.85 105.613 297.105C105.009 293.438 102.69 289.824 101.384 286.059C97.5334 274.851 92.841 263.622 90.662 251.454C89.2705 260.267 85.7646 269.005 83.6719 278.422C82.2049 285.045 80.2955 292.003 78.1489 298.4C77.4585 300.471 76.3906 302.488 75.8728 304.57C74.5891 309.769 74.8372 316.037 73.7585 321.625C73.2515 324.267 72.3778 326.619 71.4824 328.938C70.5655 331.311 69.3789 333.976 69.0445 336.09C68.5267 339.38 69.0553 343.318 69.2063 346.974C69.6594 357.708 70.188 368.398 68.5591 378.98C67.6314 385.042 65.7329 391.288 64.6649 397.663C64.1364 400.781 63.4999 404.038 63.0361 407.242C62.5507 410.586 61.7848 414.286 61.9034 417.318C62.0329 420.618 63.6725 423.714 63.3705 426.907C63.0469 430.251 61.3425 433.876 61.418 437.306C61.4612 439.226 62.7556 440.898 62.3889 442.829C61.8063 445.936 57.9122 446.033 55.0752 447.22C54.0504 449.075 53.8238 452.214 51.8282 454.21C51.2781 454.749 50.4367 454.652 49.7139 455.18C49.2177 455.547 48.8186 456.41 48.4195 456.809C46.4886 458.719 40.8685 460.283 38.3443 457.457C36.0574 459.301 33.8244 457.672 31.1924 457.133C30.6098 455.342 29.1536 454.404 29.4017 452.095C29.7037 449.312 33.695 446.874 35.8956 445.105C38.4305 443.077 41.602 441.168 43.2093 438.935C43.9859 437.856 44.5792 436.303 45.3236 435.041C46.0139 433.854 47.3407 432.42 47.5996 431.308C48.0095 429.539 47.6967 427.274 48.0851 425.3C48.4626 423.369 49.1638 421.611 49.2177 419.939C49.304 417.458 48.5705 414.632 48.2469 411.978C46.6396 398.828 45.3343 385.733 44.0183 372.011C43.5221 366.855 42.713 361.623 42.713 355.604C42.713 348.366 44.3527 342.455 45.4746 335.95C45.8306 333.922 46.4778 331.829 46.6072 329.78C46.8014 326.835 46.2728 323.685 46.4454 320.686C46.5317 319.111 47.0387 317.633 47.0927 316.134C47.2113 313.157 46.7151 309.64 46.2836 306.555C45.0431 297.655 43.8565 288.044 43.1985 278.778C42.7131 272.079 41.7206 265.715 42.0658 259.285C42.3894 253.212 43.3711 247.193 44.1801 240.926C45.7119 228.984 47.5457 216.806 49.2177 204.864C50.0267 199.028 51.6017 193.182 52.3028 187.324C52.6588 184.379 53.004 181.305 53.7699 178.554C54.7515 175.005 56.2078 172.255 55.8842 167.994C55.3125 160.432 52.5294 153.032 50.6848 145.74C50.2964 153.366 48.7647 159.839 46.6288 165.718C47.5241 168.565 48.3547 173.754 47.9233 177.734C47.6751 180.075 46.8769 182.513 46.2944 184.886C45.1617 189.546 43.9104 194.163 42.4002 198.532C40.2536 204.713 36.5644 211.39 34.2775 217.863C33.4792 220.128 32.6271 222.436 31.8396 224.68C31.0306 226.999 30.0058 229.297 29.4017 231.508C28.8407 233.536 28.323 235.985 28.4308 237.841C28.5495 239.987 29.4772 242.285 29.7253 244.831C29.9734 247.333 30.0381 250.095 29.8871 252.792C29.7469 255.37 28.83 257.743 28.7545 259.943C28.7113 261.216 29.132 262.748 29.2399 264.496C29.4772 268.26 29.4233 275.66 26.4784 275.056C24.8711 274.722 24.925 270.526 24.8495 268.401C24.7524 265.51 24.2562 262.888 24.0405 261.087C21.6781 261.626 22.9833 266.675 22.9078 269.048C22.8323 271.356 22.239 273.773 21.937 276.362C21.7212 278.217 21.5594 282.23 19.0136 281.561C17.3848 281.14 18.1075 274.722 18.0428 273.115C17.8918 269.458 18.237 266.621 17.7192 263.859C16.3384 263.913 16.8346 265.402 16.7483 266.297C16.2737 271.108 15.4539 275.768 14.4722 280.428C14.1163 282.111 13.523 284.538 11.3871 283.837C10.0711 283.406 10.5133 281.302 10.5781 279.619C10.7291 275.682 10.7722 271.691 10.9017 267.926C9.52093 269.382 9.69351 271.842 9.27281 274.743C8.99234 276.674 8.29119 280.471 5.86408 279.781C4.36466 279.36 4.90402 275.164 5.05504 273.287C5.41101 268.767 5.31392 265.143 6.02588 261.27C7.25999 256.723 2.27393 266.783 0.500112 262.5C-0.25499 260.677 1.61128 259.402 1.99962 258C2.13985 257.515 3.16728 255.898 3.26436 255.413C3.52326 254.172 4.48331 252.479 5.21684 250.699C6.03666 248.714 6.40343 246.535 7.00751 245.338C8.74425 241.897 12.0235 239.89 13.3396 237.539C14.2241 232.339 15.1518 227.485 16.2629 222.598C17.3524 217.798 19.1539 212.998 19.5098 207.982C19.8658 202.998 19.7364 198.424 19.9953 194.012C20.6533 183.085 23.1883 172.966 26.4891 164.445C27.1579 162.729 28.4093 160.96 28.6034 159.407C28.7545 158.156 28.3877 156.43 28.2798 154.855C27.762 147.347 28.0209 138.857 28.7652 131.457C29.0565 128.556 30.1352 125.546 30.0705 123.173C30.0381 122.105 29.434 121.005 29.2614 119.926C28.3661 114.414 28.6682 106.28 29.4233 100.757C29.5851 99.5814 29.4125 98.3516 29.5851 97.3484C29.9087 95.4822 31.3434 93.0875 32.3466 91.34C34.504 87.586 37.9667 85.6767 42.26 83.8645C44.3203 82.9907 46.4562 81.8796 48.4303 81.4266C49.509 81.1785 50.6632 81.4481 51.6772 81.2648C53.2413 80.9843 55.4958 79.6575 57.6856 78.8269C59.9617 77.9639 62.4212 77.2411 64.1795 76.389C65.625 75.6878 67.0273 74.4796 68.5699 73.4656C70.0477 72.4948 71.8384 71.7073 73.1221 70.7041C73.8125 70.1648 75.2364 68.6869 75.3982 68.1044C75.8728 66.3353 75.2364 62.4196 75.0746 60.3053C74.8804 57.8027 74.9451 54.9441 74.4273 52.9916C73.7801 50.5753 71.3422 48.5904 71.3422 45.1925C70.3606 44.6099 70.1448 45.5592 68.9043 44.8688C67.6314 44.1569 66.8008 40.1548 66.6282 37.3933C66.434 34.3082 66.5311 29.5618 69.3897 31.5467C67.7717 23.8878 66.5527 16.0132 70.6842 9.93998C72.7445 6.91957 77.5772 2.66943 81.2448 1.33182C82.2265 0.975839 83.5964 0.846393 84.8154 0.684585C85.9588 0.522778 87.167 0.166802 88.2241 0.0373555C89.8961 -0.167601 91.9133 0.522778 93.909 0.846393C96.0125 1.19158 97.6629 1.68779 98.9466 2.31345C101.945 3.7805 104.459 5.27992 106.422 7.67467C109.982 12.0327 110.985 18.6884 110.651 24.891C110.564 26.5306 109.755 28.44 110.003 30.2522C110.101 30.9857 111.244 31.4712 111.47 32.6901C111.848 34.8476 111.546 43.9627 110.165 45.2032C109.54 45.6239 108.224 45.7642 107.22 45.2356Z\"\n                                                              fill=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.FullBody\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsToeLeft)\"\n                                                              d=\"M158.001 450.5C154.801 449.7 148.001 453.5 145.001 455.5C143.057 456.7 145.523 458.333 148.5 459L160 456.5L163 454C163 452.667 161.201 451.3 158.001 450.5Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsToeLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsToeRight)\"\n                                                              d=\"M34.3079 450.5C37.5079 449.7 44.3079 453.5 47.3079 455.5C49.2521 456.7 46.7853 458.333 43.8086 459L32.3086 456.5L29.3081 454C29.3081 452.667 31.1079 451.3 34.3079 450.5Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsToeRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsFootLeft)\"\n                                                              d=\"M135.583 442.173C133.05 440.494 134.317 436.295 134.317 436.295C145.291 431.677 143.603 435.456 145.714 435.456C147.824 435.456 148.246 439.654 151.201 442.173C153.5 444.133 157 446.335 157 447.175C157 447.847 152.467 449.59 151.201 450.15L145.714 451C144.307 450.72 141.915 450.234 140.226 448.891C138.538 447.547 138.538 446.372 138.116 444.692C138.116 444.692 136.747 442.945 135.583 442.173Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsFootLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsFootRight)\"\n                                                              d=\"M57.4171 442.173C59.9498 440.494 58.6834 436.295 58.6834 436.295C47.7085 431.677 49.397 435.456 47.2864 435.456C45.1759 435.456 44.7538 439.654 41.799 442.173C39.5 444.133 36 446.335 36 447.175C36 447.847 40.5327 449.59 41.799 450.15L47.2864 451C48.6935 450.72 51.0854 450.234 52.7739 448.891C54.4623 447.547 54.4623 446.372 54.8844 444.692C54.8844 444.692 56.2532 442.945 57.4171 442.173Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsFootRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsAnkleLeft)\"\n                                                              d=\"M141.105 421.572C138.789 419.909 134.737 422.264 133 423.65C133 430.714 136.474 432.827 138.211 433L144 429.883C144 427.805 143.421 423.234 141.105 421.572Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsAnkleLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsAnkleRight)\"\n                                                              d=\"M52.8947 421.55C55.2105 419.95 59.2632 422.217 61 423.55C61 430.35 57.5263 432.384 55.7895 432.55L50 429.55C50 427.55 50.5789 423.15 52.8947 421.55Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsAnkleRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsKneeLeft)\"\n                                                              d=\"M131.263 323.858C127.474 321.364 120.842 324.897 118 326.974C118 337.572 123.684 340.74 126.526 341L136 336.325C136 333.208 135.053 326.351 131.263 323.858Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsKneeLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsKneeRight)\"\n                                                              d=\"M53.7368 323.858C57.5263 321.364 64.1579 324.897 67 326.974C67 337.572 61.3158 340.74 58.4737 341L49 336.325C49 333.208 49.9474 326.351 53.7368 323.858Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsKneeRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsUpperLeft)\"\n                                                              d=\"M110.5 286.5C110.5 278.9 102.167 266.5 100.501 261C98.5867 254 120.5 253.5 128.5 256.5C134.9 258.9 134.5 274.167 133.5 281.5C133.167 287 134.701 300.2 131.501 309C128.301 317.8 117.834 315.667 114.5 313.5L111.5 306.5C111.5 306.5 110.5 296 110.5 286.5Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsUpperLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.LegsUpperRight)\"\n                                                              d=\"M72.9547 286.5C72.9547 278.9 81.2877 266.5 82.9544 261C84.8684 254 62.9547 253.5 54.9547 256.5C48.5547 258.9 48.9547 274.167 49.9547 281.5C50.288 287 48.7541 300.2 51.9541 309C55.1541 317.8 65.6214 315.667 68.9547 313.5L71.9547 306.5C71.9547 306.5 72.9547 296 72.9547 286.5Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.LegsUpperRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.BackButtocks)\"\n                                                              d=\"M66.1279 248.996C75.928 251.017 83.575 246.471 86.1736 243.945C88.7721 241.419 91.2279 241.419 93.8264 243.945C96.425 246.471 104.072 251.017 113.872 248.996C126.122 246.471 131.691 243.945 131.691 239.398C131.691 234.852 134.475 222.844 123.338 218.181C116.099 215.151 110.532 216.666 102.179 219.192C93.8264 221.717 86.1736 221.717 77.8208 219.192C69.468 216.666 63.9006 215.151 56.6618 218.181C45.5248 222.844 48.3095 234.852 48.3095 239.398C48.3095 243.945 53.8777 246.471 66.1279 248.996Z\"\n                                                              fill=\"#8B93B8\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.BackButtocks\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.BackLowerBack)\"\n                                                              d=\"M58 165.07C58 157.495 63.7897 154.601 66.631 154.996C68.327 154.996 83.6185 151.5 90.0149 151.5L113.946 154.996C116.787 154.601 123 157.495 123 165.07C123 174.539 121.522 182.811 117.734 186.953C113.946 191.096 112.525 194.647 105.422 195.239C99.7393 195.712 94.5303 195.436 92.6362 195.239H87.9404C86.0462 195.436 80.8372 195.712 75.1547 195.239C68.0516 194.647 66.631 191.096 62.8426 186.953C59.0543 182.811 58 174.539 58 165.07Z\"\n                                                              fill=\"#8B93B8\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.BackLowerBack\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.BackUpperBack)\"\n                                                              d=\"M51.0702 115.53C51.0702 124.499 56.3659 127.925 60.1066 127.458H90.1381H122.399C126.14 127.925 131.993 124.499 131.993 115.53C131.993 104.319 132.375 94.5245 127.387 89.6195C122.399 84.7145 120.529 80.5102 111.177 79.8095C103.696 79.2489 96.838 79.5759 94.3442 79.8095H88.1619C85.6681 79.576 78.8101 79.249 71.3287 79.8095C61.9769 80.5102 60.1066 84.7145 55.119 89.6195C50.1314 94.5245 51.0702 104.319 51.0702 115.53Z\"\n                                                              fill=\"#8B93B8\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.BackUpperBack\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.TorsoAbdomen)\"\n                                                              d=\"M117.831 194.939C117.831 194.939 115.018 219.118 110.018 225.162C104.305 232.069 97.9851 233.162 91.2671 233.162C84.501 233.162 78.715 231.117 72.9984 224.206C67.9982 218.162 65.1855 193.983 65.1855 193.983C65.1855 193.983 65.1852 176.805 85.0171 176.801C93.5 176.801 93.5 176.805 97.5174 176.805C117.831 176.801 117.831 194.939 117.831 194.939Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.TorsoAbdomen\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsWristLeft)\"\n                                                              d=\"M160 230.5C158 228.9 154.5 231.167 153 232.5C153 239.3 156 241.333 157.5 241.5L162.5 238.5C162.5 236.5 162 232.1 160 230.5Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsWristLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsHandLeft)\"\n                                                              d=\"M165.263 244.119C161.474 242.319 154.842 244.87 152 246.37C152 254.024 157.684 256.312 160.526 256.5L170 253.123C170 250.872 169.053 245.92 165.263 244.119Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsHandLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsFingerLeft)\"\n                                                              d=\"M156.396 259.047C159.092 256.211 167.978 257.707 170 260.071C170 272.126 170 278.5 163.135 278.5C163.135 278.5 157.197 275.94 156.396 273.182C155.596 270.423 153.701 261.884 156.396 259.047Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsFingerLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsFingerRight)\"\n                                                              d=\"M21.6036 259.047C18.9082 256.211 10.0216 257.707 8 260.071C8 272.126 8 278.5 14.865 278.5C14.865 278.5 20.8034 275.94 21.6036 273.182C22.4039 270.423 24.2991 261.884 21.6036 259.047Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsFingerRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsHandRight)\"\n                                                              d=\"M13.7368 244.119C17.5263 242.319 24.1579 244.87 27 246.37C27 254.024 21.3158 256.312 18.4737 256.5L9 253.123C9 250.872 9.94737 245.92 13.7368 244.119Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsHandRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsWristRight)\"\n                                                              d=\"M18.5 230.5C20.5 228.9 24 231.167 25.5 232.5C25.5 239.3 22.5 241.333 21 241.5L16 238.5C16 236.5 16.5 232.1 18.5 230.5Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsWristRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsLowerLeft)\"\n                                                              d=\"M158.999 218C159.399 200.8 153.166 181.833 149.999 174.5C143.499 174.5 138.499 174.5 138.999 180C139.399 184.4 146.499 207.167 149.999 218C152.833 225.167 158.599 235.2 158.999 218Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsLowerLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsLowerRight)\"\n                                                              d=\"M21.9831 218C21.5831 200.8 27.8164 181.833 30.9831 174.5C37.4831 174.5 42.4831 174.5 41.9831 180C41.5831 184.4 34.4831 207.167 30.9831 218C28.1498 225.167 22.3831 235.2 21.9831 218Z\"\n                                                              fill=\"#A0A8C9\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsLowerRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsElbowLeft)\"\n                                                              d=\"M150 165.327L148.812 155.779C140.5 146.217 133.375 151.798 131 155.779V162.945L139.312 172.5H145.25C147.15 172.5 149.604 168.114 150 165.327Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\" stroke-width=\"2.44942\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsElbowLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsElbowRight)\"\n                                                              d=\"M28 165.327L29.1875 155.779C37.5 146.217 44.625 151.798 47 155.779V162.945L38.6875 172.5H32.75C30.85 172.5 28.3958 168.114 28 165.327Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\" stroke-width=\"2.44942\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsElbowRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsShoulderRight)\"\n                                                              d=\"M38.7166 108.767L57.1457 89.9797C47.8239 77.517 34.9561 90.8114 31.9864 100.568C29.0168 110.325 35.2358 110.099 38.7166 108.767Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsShoulderRight\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.ArmsShoulderLeft)\"\n                                                              d=\"M140.61 109.203L122.181 90.4156C131.502 77.9529 144.37 91.2472 147.34 101.004C150.309 110.761 144.09 110.535 140.61 109.203Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.ArmsShoulderLeft\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.TorsoChest)\"\n                                                              d=\"M60 101.031C60 90.5756 65.3857 89.0509 68.0785 89.5955H88.2748H92.7252H112.921C115.614 89.0509 121 90.5756 121 101.031C121 114.1 120.102 127.986 116.512 133.704C112.921 139.421 111.575 144.322 104.843 145.139C99.4573 145.793 94.5205 145.411 92.7252 145.139H88.2748C86.4795 145.411 81.5427 145.793 76.157 145.139C69.4249 144.322 68.0785 139.421 64.4881 133.704C60.8976 127.986 60 114.1 60 101.031Z\"\n                                                              fill=\"#A0A8C9\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.TorsoChest\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.TorsoRibs)\"\n                                                              d=\"M106.334 89.407C106.334 93.0951 100.011 94.0172 97.2013 92.9107C95.6342 92.4405 92 91.5 90 91.5C88 91.5 84.3658 92.4405 82.7987 92.9107C79.9885 94.0172 73.6657 93.0951 73.6657 89.407C73.6657 85.7188 77.354 83.8748 79.4616 83.6904C81.1477 83.5428 81.5693 82.1536 81.5693 81.4775C80.2227 80.7399 77.1433 79.7072 75.5977 81.4775C73.6657 83.6904 68.7479 87.5629 69.6261 89.407C70.5043 91.2511 71.5587 94.5704 77.1787 95.8613C82.7987 97.1521 84.9066 96.7833 84.9066 100.656C84.9066 104.528 83.3256 104.528 79.4616 104.528C75.5977 104.528 67.8701 103.606 66.465 100.656C65.0599 97.7053 63.6548 96.4145 65.0599 92.9107C66.465 89.407 62.9521 90.1446 62.9521 91.2511C62.9521 92.3575 60.4932 98.0741 64.3571 101.947C68.2211 105.819 76.6516 107.295 79.9887 106.926C83.3257 106.557 85.7846 105.819 85.7846 108.401C85.7846 110.983 86.1357 111.351 82.7987 111.905C79.4616 112.458 74.7196 113.749 70.1531 112.827C65.5866 111.905 60.4932 108.585 59.7907 107.295C59.0882 106.004 56.9805 105.819 58.3856 108.401C59.7907 110.983 63.8302 115.04 70.1531 115.408C76.476 115.777 78.408 116.146 83.3258 115.04C87.26 114.154 86.6043 117.007 85.7846 118.543C84.6723 119.404 81.4992 121.273 77.7055 121.863C72.9633 122.6 67.5185 123.154 64.3571 121.863C61.8281 120.83 58.9711 118.851 57.8588 117.99C57.0391 116.761 55.5053 115.335 55.9268 119.465C56.4538 121.309 62.601 123.891 63.8305 124.444C65.0599 124.998 69.9777 127.21 82.4477 124.076C86.663 121.125 87.6582 125.735 84.0284 128.133C81.0426 129.915 74.3685 133.517 71.5584 133.665C68.0457 133.849 61.5472 134.034 56.6294 127.395C54.5214 125.551 54.5214 129.239 56.2781 131.083C57.3319 132.62 60.1415 134.956 64.3571 136.062C70.504 137.168 75.5977 134.956 75.5977 134.956C77.0027 134.218 79.6721 133.37 79.1101 135.878C78.5481 138.386 75.9487 140.242 74.7192 140.857C73.0802 142.209 68.6078 144.508 63.8305 142.885C59.0531 141.262 57.0392 138.521 56.6294 137.353C55.5756 137.168 53.9597 137.464 55.9268 140.119C58.3856 143.438 62.601 147.864 71.5584 144.914C74.7192 144.36 73.6073 148.11 70.1531 151.183C69.1579 151.921 66.1137 153.175 61.8985 152.29C59.7907 150.446 55.4 148.602 56.2781 148.602C55.6927 148.602 55.0488 149.339 57.1563 152.29C59.2638 155.24 64.8256 155.978 67.3431 155.978C67.8115 156.285 68.4672 157.232 67.3431 158.56C65.9381 160.219 65.5868 162.617 63.3035 161.879C61.4769 161.289 59.2638 158.806 58.3856 157.638C57.5075 156.654 55.7161 155.351 55.5756 158.006C57.1563 160.035 58.3271 161.695 59.7907 161.879C60.9616 162.555 63.3035 164.203 63.3035 165.383C63.3035 166.858 64.0062 168.702 61.8985 168.149C60.2122 167.706 58.854 166.12 58.3856 165.383C57.8002 165.875 57.0509 167.153 58.737 168.333C60.4231 169.513 61.7814 170.546 62.2497 170.915C62.8937 171.714 64.4979 172.316 65.7624 168.333C67.3431 163.354 80.6914 134.587 90 134.956C99.3086 134.587 112.657 163.354 114.238 168.333C115.502 172.316 117.106 171.714 117.75 170.915C118.219 170.546 119.577 169.513 121.263 168.333C122.949 167.153 122.2 165.875 121.614 165.383C121.146 166.12 119.788 167.706 118.102 168.149C115.994 168.702 116.696 166.858 116.696 165.383C116.696 164.203 119.038 162.555 120.209 161.879C121.673 161.695 122.844 160.035 124.424 158.006C124.284 155.351 122.493 156.654 121.614 157.638C120.736 158.806 118.523 161.289 116.696 161.879C114.413 162.617 114.062 160.219 112.657 158.56C111.533 157.232 112.189 156.285 112.657 155.978C115.174 155.978 120.736 155.24 122.844 152.29C124.951 149.339 124.307 148.602 123.722 148.602C124.6 148.602 120.209 150.446 118.102 152.29C113.886 153.175 110.842 151.921 109.847 151.183C106.393 148.11 105.281 144.36 108.442 144.914C117.399 147.864 121.614 143.438 124.073 140.119C126.04 137.464 124.424 137.168 123.371 137.353C122.961 138.521 120.947 141.262 116.17 142.885C111.392 144.508 106.92 142.209 105.281 140.857C104.051 140.242 101.452 138.386 100.89 135.878C100.328 133.37 102.997 134.218 104.402 134.956C104.402 134.956 109.496 137.168 115.643 136.062C119.859 134.956 122.668 132.62 123.722 131.083C125.479 129.239 125.479 125.551 123.371 127.395C118.453 134.034 111.954 133.849 108.442 133.665C105.631 133.517 98.9574 129.915 95.9716 128.133C92.3418 125.735 93.337 121.125 97.5523 124.076C110.022 127.21 114.94 124.998 116.17 124.444C117.399 123.891 123.546 121.309 124.073 119.465C124.495 115.335 122.961 116.761 122.141 117.99C121.029 118.851 118.172 120.83 115.643 121.863C112.482 123.154 107.037 122.6 102.295 121.863C98.5008 121.273 95.3277 119.404 94.2154 118.543C93.3957 117.007 92.74 114.154 96.6742 115.04C101.592 116.146 103.524 115.777 109.847 115.408C116.17 115.04 120.209 110.983 121.614 108.401C123.019 105.819 120.912 106.004 120.209 107.295C119.507 108.585 114.413 111.905 109.847 112.827C105.28 113.749 100.538 112.458 97.2013 111.905C93.8642 111.351 94.2154 110.983 94.2154 108.401C94.2154 105.819 96.6743 106.557 100.011 106.926C103.348 107.295 111.779 105.819 115.643 101.947C119.507 98.0741 117.048 92.3575 117.048 91.2511C117.048 90.1446 113.535 89.407 114.94 92.9107C116.345 96.4145 114.94 97.7053 113.535 100.656C112.13 103.606 104.402 104.528 100.538 104.528C96.6744 104.528 95.0934 104.528 95.0934 100.656C95.0934 96.7833 97.2013 97.1521 102.821 95.8613C108.441 94.5704 109.496 91.2511 110.374 89.407C111.252 87.5629 106.334 83.6904 104.402 81.4775C102.857 79.7072 99.7773 80.7399 98.4307 81.4775C98.4307 82.1536 98.8523 83.5428 100.538 83.6904C102.646 83.8748 106.334 85.7188 106.334 89.407Z\"\n                                                              fill=\"#B6BEDF\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.TorsoRibs\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.TorsoNeck)\"\n                                                              d=\"M98.2643 75.4318H82.2648C74.2651 73.8138 76.9316 68.1785 79.5982 63.3336C81.7315 59.4576 86.1166 60.9029 87.598 62.5179H93.82C94.7089 60.1111 98.6397 60.4505 100.042 61.7238C100.931 62.531 102.175 64.2936 103.597 68.1677C105.02 72.0419 100.635 74.6247 98.2643 75.4318Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.TorsoNeck\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.HeadFace)\"\n                                                              d=\"M94.3706 21.1489H89.1791L83.9877 21.1481C82.6033 20.3536 79.2116 19.2412 76.7197 21.1481C73.6048 23.5317 63.2219 43.7924 89.1791 59.2859C115.136 43.7924 104.753 23.5325 101.639 21.1489C99.1467 19.242 95.7549 20.3543 94.3706 21.1489Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.HeadFace\"/>\n\n                                                        <path (click)=\"pathSelect(EnumService.AccidentBodyPartsIds.HeadSoftTissue)\"\n                                                              d=\"M92.9984 3C103.499 4.5 108.999 19.5 105.998 19.5L72.0002 19.5C68.5 19.4999 72.9988 6 84.9547 3H92.9984Z\"\n                                                              fill=\"#A1A8CA\" stroke=\"#CACEE1\"\n                                                              [id]=\"EnumService.AccidentBodyPartsIds.HeadSoftTissue\"/>\n\n                                                    </svg>\n\n                                                    <div class=\"parts-view\">\n                                                        <ion-toolbar mode=\"ios\">\n                                                            <ion-buttons slot=\"start\">\n                                                                <ion-button class=\"arrow-button left\" size=\"small\"\n                                                                            fill=\"clear\"\n                                                                            (click)=\"previousPart()\">\n                                                                    <ion-icon slot=\"icon-only\"\n                                                                              name=\"chevron-back-outline\"></ion-icon>\n                                                                </ion-button>\n                                                            </ion-buttons>\n                                                            <ion-title>\n                                                                {{bodyParts[currentBodyPartIndex].type}}\n                                                            </ion-title>\n                                                            <ion-buttons slot=\"end\">\n                                                                <ion-button class=\"arrow-button right\" size=\"small\"\n                                                                            fill=\"clear\"\n                                                                            (click)=\"nextPart()\">\n                                                                    <ion-icon slot=\"icon-only\"\n                                                                              name=\"chevron-forward-outline\"></ion-icon>\n                                                                </ion-button>\n                                                            </ion-buttons>\n                                                        </ion-toolbar>\n\n                                                        <div class=\"parts-checkboxes\"\n                                                             [formGroupName]=\"UtilService.FCUniqueName(section, question)\">\n                                                            <ion-item\n                                                                    *ngFor=\"let item of bodyParts[currentBodyPartIndex].parts\">\n                                                                <ion-checkbox slot=\"start\"\n                                                                              [formControlName]=\"UtilService.SubFCName(UtilService.FCUniqueName(section, question),item.id)\"\n                                                                              (ionChange)=\"partSelectChange(item, $event)\"></ion-checkbox>\n                                                                <ion-label>{{item.name}}</ion-label>\n                                                            </ion-item>\n                                                        </div>\n\n                                                    </div>\n                                                </div>\n\n\n                                                <div class=\"selected-parts-view\">\n                                                    <ng-container *ngFor=\"let item of selectedBodyParts | keyvalue\">\n                                                        <div class=\"body-part\" *ngIf=\"item.value.checked\">\n                                                            <div class=\"name\">{{item.value.name}}</div>\n                                                            <ion-button fill=\"clear\"\n                                                                        (click)=\"removeSelectedBodyPart(item.value)\">\n                                                                <ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\n                                                            </ion-button>\n                                                        </div>\n                                                    </ng-container>\n                                                </div>\n                                            </div>\n                                        </ng-container>\n                                    </ng-container>\n                                </ng-container>\n                            </ng-container>\n\n                            <ng-template #customQuestions>\n                                <app-custom-questions-container\n                                        [sectionId]=\"section.sectionId\"\n                                        [questions]=\"section.questions\"\n                                        [isSubmitted]=\"isSubmitted\"\n                                        [formGroup]=\"formGroup\"\n                                        [sectionIndex]=\"sectionIndex\"\n                                        [questionElementIds]=\"questionElementIds\"\n                                        [section]=\"section\"\n                                ></app-custom-questions-container>\n                            </ng-template>\n                        </ng-container>\n                    </ng-container>\n\n\n                    <!--        End of form -->\n                    <ng-container *ngIf=\"!sharedDataService.dedicatedMode\">\n                        <div class=\"hr-line-full ion-margin-top\"></div>\n\n                        <ion-item class=\"text-bottom-msg\">\n                            <ion-label class=\"ion-text-wrap ion-text-center\">\n                                You've reached the end of the form.\n                                Please check your answers and sign-off.\n                            </ion-label>\n                        </ion-item>\n                        <ion-item class=\"ion-margin-vertical ion-padding-bottom\">\n                            <ion-button expand=\"full\" type=\"submit\" class=\"action-btn\">Sign-Off\n                            </ion-button>\n                        </ion-item>\n                    </ng-container>\n                </ion-list>\n            </Form>\n            <div class=\"fill-vertical-space\"></div>\n            <!--        End of form -->\n            <ng-container *ngIf=\"sharedDataService.dedicatedMode\">\n                <ion-item class=\"text-bottom-msg\" lines=\"none\">\n                    <ion-label class=\"ion-text-wrap ion-padding\">\n                        You've reached the end of the form.\n                        Please check your answers and sign-off.\n                    </ion-label>\n                    <ion-button slot=\"end\" (click)=\"onContinue()\" class=\"action-btn\">Sign-Off</ion-button>\n                </ion-item>\n            </ng-container>\n        </div>\n    </ion-content>\n\n</ng-template>\n";
      /***/
    }
  }]);
})();
//# sourceMappingURL=pages-form-accident-report-form-accident-report-module-es5.js.map