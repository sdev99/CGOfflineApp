import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { User } from "../_models";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { EnumService } from "./enum.service";
import { SharedDataService } from "./shared-data.service";
import { Response } from "../_models/response";
import { NavController, Platform } from "@ionic/angular";
import { Profile } from "../_models/profile";
import { Subscription } from "rxjs";

declare global {
  interface Array<T> {
    clone(): Array<T>;
  }
}

Array.prototype.clone = function () {
  return JSON.parse(JSON.stringify(this));
};

@Injectable({
  providedIn: "root",
})
export class AccountService implements OnInit, OnDestroy {
  sub: Subscription;

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    public sharedDataService: SharedDataService,
    private http: HttpClient,
    private navController: NavController,
    private platform: Platform
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem(EnumService.LocalStorageKeys.USER_DATA))
    );
    this.user = this.userSubject.asObservable();

    this.checkForMobileLanguageId();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkForMobileLanguageId() {
    if (!this.sharedDataService.dedicatedMode) {
      if (
        this.sharedDataService.userProfile &&
        this.sharedDataService.userProfile?.mobileAppLanguageID
      ) {
        this.sharedDataService.currentLanguageId =
          this.sharedDataService.userProfile?.mobileAppLanguageID;
      } else if (this.userSubject.value?.mobileAppLanguageID) {
        this.sharedDataService.currentLanguageId =
          this.userSubject.value?.mobileAppLanguageID;
      } else {
        this.getUserProfile(this.userSubject.value?.userId);
      }
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email = "", password = "", rememberMe = true) {
    return this.http
      .post(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.UserSignIn}`,
        {
          email,
          password,
          rememberMe,
          deviceID: this.sharedDataService.pushToken,
          platformName: this.platform.is("ios") ? "IOS" : "Android",
        }
      )
      .pipe(
        map((data: Response) => {
          if (
            data?.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const userInfo: User = data.Result;
            localStorage.setItem(
              EnumService.LocalStorageKeys.USER_DATA,
              JSON.stringify(userInfo)
            );
            this.userSubject.next(userInfo);

            if (userInfo.mobileAppLanguageID) {
              this.sharedDataService.currentLanguageId =
                userInfo.mobileAppLanguageID;
            }
            return data;
          }
          return throwError(
            new Error(data?.ResponseException?.ExceptionMessage)
          );
        })
      );
  }

  checkMobileSessionExpirationSetting(companyID) {
    return this.http
      .get(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.GetCompanyMobileSessionDetails}/${companyID}`
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            if (data.Result?.isMobileSessionExpiration) {
              const user = this.userValue;
              user.isMobileSessionExpiration = true;
              localStorage.setItem(
                EnumService.LocalStorageKeys.USER_DATA,
                JSON.stringify(user)
              );
              this.userSubject.next(user);
            }

            return data;
          }
          return throwError(
            new Error(data?.ResponseException?.ExceptionMessage)
          );
        })
      );
  }

  getUserProfile(userId) {
    return this.http
      .get(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.GetUserProfileById}/${userId}`
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const userProfile: Profile = data.Result;
            localStorage.setItem(
              EnumService.LocalStorageKeys.USER_PROFILE,
              JSON.stringify(userProfile)
            );
            this.sharedDataService.userProfile = userProfile;
            this.sharedDataService.currentLanguageId =
              userProfile?.mobileAppLanguageID;
            return userProfile;
          }

          return null;
        })
      );
  }

  getDeviceDetails(deviceUID) {
    return this.http
      .get(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.GetDeviceDetails}/${deviceUID}`
      )
      .pipe(
        map((data: Response) => {
          return data;
        })
      );
  }

  activateDevice() {
    const deviceDetailId =
      this.sharedDataService.dedicatedModeDeviceDetailData?.deviceID;
    return this.http.post(
      `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.ActivateDevice}?id=${deviceDetailId}`,
      {}
    );
  }

  getAccessKey() {
    return this.http
      .get(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.GetAccessKey}`
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const accessKey = data.Result;
            localStorage.setItem(
              EnumService.LocalStorageKeys.API_ACCESS_KEY,
              accessKey
            );
            return { accessKey };
          }

          return {
            accessKey: null,
          };
        })
      );
  }

  getToken() {
    return this.http
      .get(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.GetToken}`,
        {
          headers: new HttpHeaders({
            accessID: this.sharedDataService.deviceUID,
            accessKey: localStorage.getItem(
              EnumService.LocalStorageKeys.API_ACCESS_KEY
            ),
          }),
        }
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const token = data.Result;
            localStorage.setItem(EnumService.LocalStorageKeys.API_TOKEN, token);
            return { token };
          }

          return {
            token: null,
          };
        })
      );
  }

  newAccountSetup(body) {
    return this.http
      .post(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.AccountSetup}`,
        {
          deviceID: this.sharedDataService.pushToken,
          platformName: this.platform.is("ios") ? "IOS" : "Android",
          ...body,
        }
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const userInfo = data.Result;
            localStorage.setItem(
              EnumService.LocalStorageKeys.USER_DATA,
              JSON.stringify(userInfo)
            );
            this.userSubject.next(userInfo);
            return data;
          }
          return throwError(
            new Error(data?.ResponseException?.ExceptionMessage)
          );
        })
      );
  }

  forgotpassword(email) {
    return this.http
      .post(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.ForgotPassword}`,
        { email }
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const message = data.Message;
            return message;
          }
          return null;
        })
      );
  }

  checkOktaEnable(email) {
    return this.http
      .post(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.OktaUserDetails}?email=${email}`,
        {
          email,
        }
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const userInfo: any = data.Result;
            return userInfo;
          }
          return null;
        })
      );
  }

  oktaUserSignIn(email) {
    return this.http
      .post(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.OktaUserSignIn}`,
        {
          email,
          rememberMe: true,
          deviceID: this.sharedDataService.pushToken,
          platformName: this.platform.is("ios") ? "IOS" : "Android",
        }
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const userInfo: User = data.Result;
            localStorage.setItem(
              EnumService.LocalStorageKeys.USER_DATA,
              JSON.stringify(userInfo)
            );
            this.userSubject.next(userInfo);

            if (userInfo.mobileAppLanguageID) {
              this.sharedDataService.currentLanguageId =
                userInfo.mobileAppLanguageID;
            }

            return userInfo;
          }
          return null;
        })
      );
  }

  resetpassword(body) {
    return this.http
      .post(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.ResetPassword}`,
        {
          deviceID: this.sharedDataService.pushToken,
          platformName: this.platform.is("ios") ? "IOS" : "Android",
          ...body,
        }
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const message = data.Message;
            return message;
          }
          return null;
        })
      );
  }

  changePassword(body) {
    return this.http
      .post(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.ChangePassword}`,
        body
      )
      .pipe(
        map((data: Response) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful
          ) {
            const message = data.Message;
            return message;
          }
          return data.Message;
        })
      );
  }

  updateProfile(body) {
    return this.http
      .put(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.UpdateUserProfile}`,
        body
      )
      .pipe(
        map((data: Response) => {
          return data;
        })
      );
  }

  logout(userId, navigateToLogin = true) {
    const option: any = {
      body: {
        deviceID: this.sharedDataService.deviceUID,
      },
    };

    return this.http
      .delete(
        `${this.sharedDataService.apiBaseUrl}/${EnumService.ApiMethods.UserDeviceDelete}/${userId}`,
        option
      )
      .pipe(
        map((data: any) => {
          if (
            data.StatusCode === EnumService.ApiResponseCode.RequestSuccessful ||
            data.StatusCode === EnumService.ApiResponseCode.InvalidData
          ) {
            // remove user from local storage and set current user to null
            localStorage.removeItem(EnumService.LocalStorageKeys.USER_DATA);
            localStorage.removeItem(EnumService.LocalStorageKeys.USER_PROFILE);
            this.userSubject.next(null);
            if (navigateToLogin) {
              const logoutSuccess = () => {
                this.navController.navigateBack(["login"], {
                  replaceUrl: true,
                });
                window.location.reload();
              };

              try {
                if (
                  localStorage.getItem(
                    EnumService.LocalStorageKeys.LOGIN_WITH_OKTA
                  ) === "true"
                ) {
                  localStorage.removeItem(
                    EnumService.LocalStorageKeys.COMPANY_OKTA_DETAILS
                  );
                  localStorage.removeItem(
                    EnumService.LocalStorageKeys.LOGIN_WITH_OKTA
                  );
                }
              } catch (error) {}

              logoutSuccess();
            }
          }
          return data;
        })
      );
  }
}
