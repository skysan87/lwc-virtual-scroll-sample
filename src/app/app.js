import { LightningElement, track } from 'lwc';
import getData from './getData';

export default class App extends LightningElement {


    @track alldata = [];
    @track viewHight = 100;
    @track rowheight = 20;

    async connectedCallback() {
        this.alldata = await getData({ amountOfRecords: 1000 });
    }
}
