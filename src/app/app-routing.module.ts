import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthGuard } from "./helpers/auth.guard";
import { CheckoktaenablePage } from "./pages/checkoktaenable/checkoktaenable.page";
import { OktaResponsePage } from "./pages/okta-response/okta-response.page";

const routes: Routes = [
  {
    path: "tabs",
    data: { authGuardRedirect: "login" },
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkoktaenable",
    component: CheckoktaenablePage,
  },
  {
    path: "oktaresponse",
    component: OktaResponsePage,
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "image-annotation",
    loadChildren: () =>
      import("./pages/image-annotation/image-annotation.module").then(
        (m) => m.ImageAnnotationPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "forgot-password",
    loadChildren: () =>
      import("./pages/forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: "linksend-success",
    loadChildren: () =>
      import("./pages/linksend-success/linksend-success.module").then(
        (m) => m.LinksendSuccessPageModule
      ),
  },
  {
    path: "checkin-fail",
    loadChildren: () =>
      import("./pages/checkin-fail/checkin-fail.module").then(
        (m) => m.CheckinFailPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkin-success",
    loadChildren: () =>
      import("./pages/checkin-success/checkin-success.module").then(
        (m) => m.CheckinSuccessPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkin-induction",
    loadChildren: () =>
      import("./pages/checkin-induction/checkin-induction.module").then(
        (m) => m.CheckinInductionPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkin-induction-video-file",
    loadChildren: () =>
      import(
        "./pages/checkin-induction-video-file/checkin-induction-video-file.module"
      ).then((m) => m.CheckinInductionVideoFilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkin-induction-image-file",
    loadChildren: () =>
      import(
        "./pages/checkin-induction-image-file/checkin-induction-image-file.module"
      ).then((m) => m.CheckinInductionImageFilePageModule),
  },
  {
    path: "checkin-induction-rich-text",
    loadChildren: () =>
      import(
        "./pages/checkin-induction-rich-text/checkin-induction-rich-text.module"
      ).then((m) => m.CheckinInductionRichTextPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkin-induction-form",
    loadChildren: () =>
      import(
        "./pages/checkin-induction-form/checkin-induction-form.module"
      ).then((m) => m.CheckinInductionFormPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkin-induction-va",
    loadChildren: () =>
      import("./pages/checkin-induction-va/checkin-induction-va.module").then(
        (m) => m.CheckinInductionVaPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "signoff-digitalink",
    loadChildren: () =>
      import("./pages/signoff-digitalink/signoff-digitalink.module").then(
        (m) => m.SignoffDigitalinkPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard-qrscan",
    loadChildren: () =>
      import("./pages/dashboard-qrscan/dashboard-qrscan.module").then(
        (m) => m.DashboardQrscanPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "activity-detail",
    loadChildren: () =>
      import("./pages/activity-detail/activity-detail.module").then(
        (m) => m.ActivityDetailPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "form-cover",
    loadChildren: () =>
      import("./pages/form-cover/form-cover.module").then(
        (m) => m.FormCoverPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "form-custom",
    loadChildren: () =>
      import("./pages/form-custom/form-custom.module").then(
        (m) => m.FormCustomPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "form-riskassessment",
    loadChildren: () =>
      import("./pages/form-riskassessment/form-riskassessment.module").then(
        (m) => m.FormRiskassessmentPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "my-profile-edit",
    loadChildren: () =>
      import("./pages/my-profile-edit/my-profile-edit.module").then(
        (m) => m.MyProfileEditPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-confirm",
    loadChildren: () =>
      import("./pages/checkinout-confirm/checkinout-confirm.module").then(
        (m) => m.CheckoutConfirmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "form-hav",
    loadChildren: () =>
      import("./pages/form-hav/form-hav.module").then(
        (m) => m.FormHavPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "form-accident-report",
    loadChildren: () =>
      import("./pages/form-accident-report/form-accident-report.module").then(
        (m) => m.FormAccidentReportPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "new-account-setup",
    loadChildren: () =>
      import("./pages/new-account-setup/new-account-setup.module").then(
        (m) => m.NewAccountSetupPageModule
      ),
  },
  {
    path: "terms-conditions",
    loadChildren: () =>
      import("./pages/terms-conditions/terms-conditions.module").then(
        (m) => m.TermsConditionsPageModule
      ),
  },
  {
    path: "my-profile-changepass",
    loadChildren: () =>
      import("./pages/my-profile-changepass/my-profile-changepass.module").then(
        (m) => m.MyProfileChangepassPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "signoff-photo",
    loadChildren: () =>
      import("./pages/signoff-photo/signoff-photo.module").then(
        (m) => m.SignoffPhotoPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "home-exit-dm",
    loadChildren: () =>
      import("./modals/home-exit-dm/home-exit-dm.module").then(
        (m) => m.HomeExitDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-option-dm",
    loadChildren: () =>
      import("./pages/checkinout-option-dm/checkinout-option-dm.module").then(
        (m) => m.CheckinoutOptionDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-name-dm",
    loadChildren: () =>
      import("./pages/checkinout-name-dm/checkinout-name-dm.module").then(
        (m) => m.CheckinoutNameDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-guest-dm",
    loadChildren: () =>
      import("./pages/checkinout-guest-dm/checkinout-guest-dm.module").then(
        (m) => m.CheckinoutGuestDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-alreadycheckin-dm",
    loadChildren: () =>
      import(
        "./pages/checkinout-alreadycheckin-dm/checkinout-alreadycheckin-dm.module"
      ).then((m) => m.CheckinoutAlreadycheckinDmPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-photoidentity-dm",
    loadChildren: () =>
      import(
        "./pages/checkinout-photoidentity-dm/checkinout-photoidentity-dm.module"
      ).then((m) => m.CheckinoutPhotoidentityDmPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "documents-dm",
    loadChildren: () =>
      import("./pages/documents-dm/documents-dm.module").then(
        (m) => m.DocumentsDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "permits-dm",
    loadChildren: () =>
      import("./pages/permits-dm/permits-dm.module").then(
        (m) => m.PermitsDmPageModule
      ),
  },
  {
    path: "evacuation-dm",
    loadChildren: () =>
      import("./pages/evacuation-dm/evacuation-dm.module").then(
        (m) => m.EvacuationDmPageModule
      ),
  },
  {
    path: "forms-dm",
    loadChildren: () =>
      import("./pages/forms-dm/forms-dm.module").then(
        (m) => m.FormsDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "permits-generate-dm",
    loadChildren: () =>
      import("./pages/permits-generate-dm/permits-generate-dm.module").then(
        (m) => m.PermitsGenerateDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "permit-issued-result-dm",
    loadChildren: () =>
      import(
        "./pages/permit-issued-result-dm/permit-issued-result-dm.module"
      ).then((m) => m.PermitIssuedResultDmPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "device-sync-dm",
    loadChildren: () =>
      import("./pages/device-sync-dm/device-sync-dm.module").then(
        (m) => m.DeviceSyncDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-guest-phone-dm",
    loadChildren: () =>
      import(
        "./pages/checkinout-guest-phone-dm/checkinout-guest-phone-dm.module"
      ).then((m) => m.CheckinoutPhoneDmPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-success-dm",
    loadChildren: () =>
      import("./pages/checkinout-success-dm/checkinout-success-dm.module").then(
        (m) => m.CheckinoutSuccessDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-fail-dm",
    loadChildren: () =>
      import("./pages/checkinout-fail-dm/checkinout-fail-dm.module").then(
        (m) => m.CheckinoutFailDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkinout-identityconfirm-dm",
    loadChildren: () =>
      import(
        "./pages/checkinout-identityconfirm-dm/checkinout-identityconfirm-dm.module"
      ).then((m) => m.CheckinoutIdentityconfirmDmPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "document-openchoice-dm",
    loadChildren: () =>
      import(
        "./pages/document-openchoice-dm/document-openchoice-dm.module"
      ).then((m) => m.DocumentOpenchoiceDmPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "form-open-auth-dm",
    loadChildren: () =>
      import("./pages/form-open-auth-dm/form-open-auth-dm.module").then(
        (m) => m.FormOpenAuthDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "checkin-workpermit",
    loadChildren: () =>
      import("./pages/checkin-workpermit/checkin-workpermit.module").then(
        (m) => m.CheckinWorkpermitPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "form-cover-dm",
    loadChildren: () =>
      import("./pages/form-cover-dm/form-cover-dm.module").then(
        (m) => m.FormCoverDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "choose-location",
    loadChildren: () =>
      import("./pages/choose-location/choose-location.module").then(
        (m) => m.ChooseLocationPageModule
      ),
  },
  {
    path: "dashboard-dm",
    loadChildren: () =>
      import("./pages/dashboard-dm/dashboard-dm.module").then(
        (m) => m.DashboardDmPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "forgot-password-reset",
    loadChildren: () =>
      import("./pages/forgot-password-reset/forgot-password-reset.module").then(
        (m) => m.ForgotPasswordResetPageModule
      ),
  },
  {
    path: "form-workpermit",
    loadChildren: () =>
      import("./pages/form-workpermit/form-workpermit.module").then(
        (m) => m.FormWorkpermitPageModule
      ),
  },
  {
    path: "document-openchoice",
    loadChildren: () =>
      import("./pages/document-openchoice/document-openchoice.module").then(
        (m) => m.DocumentOpenchoicePageModule
      ),
  },
  {
    path: "checkin-list",
    loadChildren: () =>
      import("./pages/checkin-list/checkin-list.module").then(
        (m) => m.CheckinListPageModule
      ),
  },
  {
    path: "folder-content-list",
    loadChildren: () =>
      import("./pages/folder-content-list/folder-content-list.module").then(
        (m) => m.FolderContentListPageModule
      ),
  },
  {
    path: "device-offline",
    loadChildren: () =>
      import("./modals/device-offline/device-offline.module").then(
        (m) => m.DeviceOfflinePageModule
      ),
  },
  {
    path: 'browserpairing',
    loadChildren: () => import('./pages/browserpairing/browserpairing.module').then( m => m.BrowserpairingPageModule)
  },
];

const formPreviewRoutes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/form-cover/form-cover.module").then(
        (m) => m.FormCoverPageModule
      ),
  },
  {
    path: "form-custom",
    loadChildren: () =>
      import("./pages/form-custom/form-custom.module").then(
        (m) => m.FormCustomPageModule
      ),
  },
  {
    path: "form-riskassessment",
    loadChildren: () =>
      import("./pages/form-riskassessment/form-riskassessment.module").then(
        (m) => m.FormRiskassessmentPageModule
      ),
  },

  {
    path: "form-hav",
    loadChildren: () =>
      import("./pages/form-hav/form-hav.module").then(
        (m) => m.FormHavPageModule
      ),
  },
  {
    path: "form-accident-report",
    loadChildren: () =>
      import("./pages/form-accident-report/form-accident-report.module").then(
        (m) => m.FormAccidentReportPageModule
      ),
  },

  {
    path: "form-workpermit",
    loadChildren: () =>
      import("./pages/form-workpermit/form-workpermit.module").then(
        (m) => m.FormWorkpermitPageModule
      ),
  },
  {
    path: "image-annotation",
    loadChildren: () =>
      import("./pages/image-annotation/image-annotation.module").then(
        (m) => m.ImageAnnotationPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      environment.isFormPreview ? formPreviewRoutes : routes,
      {
        preloadingStrategy: PreloadAllModules,
        onSameUrlNavigation: "reload",
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
