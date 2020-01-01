import { LightningElement, api } from 'lwc';

export default class App extends LightningElement {

    @api row;
    @api rowheight = 0;

    handleChange(e) {
        // create CustomEvent to dispatch event from Shadow DOM
        e.preventDefault();
        const selectedEvent = new CustomEvent('select', { detail: this.row.id });
        this.dispatchEvent(selectedEvent);
    }

    get rowStyle() {
        return `
            height: ${this.rowheight}px;
        `;
    }
}