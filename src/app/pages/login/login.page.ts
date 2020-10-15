import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {SharedDataService} from '../../services/shared-data.service';
import {UtilService} from '../../services/util.service';
import {DemoDataService} from '../../services/demo-data.service';
import {NavController} from '@ionic/angular';
import {EnumService} from '../../services/enum.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    errorMessage = '';
    isSubmitted = false;
    loginForm: FormGroup;

    languages = DemoDataService.languages.clone();
    selectedLanguage = this.languages[0].code;

    constructor(
        public utilService: UtilService,
        public navCtrl: NavController,
        public sharedDataService: SharedDataService,
    ) {
        this.loginForm = new FormGroup({
            email: new FormControl('test@domain.com', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ]))
        });
    }

    ngOnInit() {
        if (localStorage.getItem(EnumService.LocalStorageKeys.IS_LOGGEDIN) === '1') {
            this.navCtrl.navigateRoot('/tabs/dashboard');
        }
    }

    onSubmit() {
        this.isSubmitted = true;
        this.errorMessage = '';

        if (this.loginForm.valid) {
            const email = this.loginForm.controls.email.value;
            const password = this.loginForm.controls.password.value;

            this.utilService.presentLoadingWithOptions();
            setTimeout(() => {
                this.utilService.hideLoading();
                if (password === 'newaccount') {
                    this.navCtrl.navigateRoot('/new-account-setup');
                } else if (password === 'wronglogin') {
                    this.errorMessage = 'Wrong username or password';
                } else {
                    localStorage.setItem(EnumService.LocalStorageKeys.IS_LOGGEDIN, '1');
                    localStorage.setItem(EnumService.LocalStorageKeys.USER_DATA, JSON.stringify({
                        email,
                        phone: '+01234567890',
                        timeZone: 'GMT+02:00',
                        language: this.selectedLanguage
                    }));
                    this.navCtrl.navigateRoot('/tabs/dashboard');
                }
            }, 2000);
        }
    }
}
