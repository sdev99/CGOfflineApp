import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DemoDataService} from '../../services/demo-data.service';
import {IonSearchbar, ModalController} from '@ionic/angular';

@Component({
    selector: 'app-search-location',
    templateUrl: './search-location.page.html',
    styleUrls: ['./search-location.page.scss'],
})
export class SearchLocationPage implements OnInit {
    @Input() list: any;

    @ViewChild('searchBar') searchBar: any;
    searchText = '';

    constructor(
        public modalController: ModalController
    ) {
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.searchBar) {
                if (this.searchBar.setFocus) {
                    this.searchBar.setFocus();
                } else {
                    this.searchBar.nativeElement.setFocus();
                }
            }
        }, 1000);
    }

    ionViewDidLoad() {
    }

    onDismiss = (item) => {
        this.modalController.dismiss(item);
    };

}
