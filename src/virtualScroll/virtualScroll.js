import { LightningElement, track, api } from 'lwc';

export default class VirtualScroll extends LightningElement {

    @api viewheight = 0;
    @api rowheight = 0;

    @track visibledata = [];
    @track offsetY = 0;

    totalHeight=0;
    _alldata = [];
    alldataLength = 0;

    visibleRowCount = 0;
    startRowIndex = 0;

    bufferRowCount = 5;

    connectedCallback() {
        // Since getData() is an async method, 
        // it is difficult to get data at this time.
    }

    @api 
    get data() {
        return this._alldata;
    }

    set data(value) {
        this.init(value);
    }

    init(data) {
        this._alldata = data.map((row, index) => {
            let refObj = Object.assign({}, row);
            refObj.index = index;
            refObj.checked = false;
            return refObj;
        });

        this.alldataLength = this._alldata.length;
        this.totalHeight = this.alldataLength * this.rowheight;

        this.calcVisibleData(true);
    }

    selectHandler(e) {
        const dataId = e.detail;
        const item = this._alldata.find(data => data.id == dataId);
        item.checked = !item.checked;
    }

    scrollHandler() {
        this.calcVisibleData(false);
    }

    calcVisibleData(firstTime) {
        if(firstTime === false) {
            const scrollTop = this.getScrollTop();
            const lastIndex = this.startRowIndex;
            this.startRowIndex = Math.floor(scrollTop / this.rowheight) - this.bufferRowCount;
            this.startRowIndex = Math.max(0, this.startRowIndex);

            if(lastIndex === this.startRowIndex) return;
        }

        this.visibleRowCount = Math.ceil(this.viewheight / this.rowheight) + 2 * this.bufferRowCount;
        this.visibleRowCount = Math.min(this.alldataLength - this.startRowIndex, this.visibleRowCount);

        this.offsetY = this.startRowIndex * this.rowheight;
        this.visibledata = this.getVisibleData();
    }

    getVisibleData() {
        let endIndex = this.startRowIndex + this.visibleRowCount;
        return this._alldata.slice(this.startRowIndex, endIndex);
    }

    getScrollTop() {
        const element = this.template.querySelector('.viewport');
        return element.scrollTop;
    }

    get transformStyle() {
        return `
            transform: translateY(${this.offsetY}px);
        `;
    }
    
    get contentStyle() {
        return `
            height: ${this.totalHeight}px;
        `;
    }

    get viewportStyle() {
        return `
            max-height: ${this.viewheight}px; 
            overflow: auto;
        `;
    }
}
