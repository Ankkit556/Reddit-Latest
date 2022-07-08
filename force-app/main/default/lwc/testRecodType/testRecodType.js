import { LightningElement, wire, track } from 'lwc';

// importing to get the object info 
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
// importing Account shcema
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class TestRecodType extends LightningElement {
    @track selectedValue;
    @track options = [];

    // object info using wire service
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accObjectInfo({data, error}) {
        if(data) {
            let optionsValues = [];
            // map of record type Info
            const rtInfos = data.recordTypeInfos;

            // getting map values
            let rtValues = Object.values(rtInfos);

            for(let i = 0; i < rtValues.length; i++) {
                if(rtValues[i].name !== 'Master') {
                    optionsValues.push({
                        label: rtValues[i].name,
                        value: rtValues[i].recordTypeId
                    })
                }
            }

            this.options = optionsValues;
        }
        else if(error) {
            window.console.log('Error ===> '+JSON.stringify(error));
        }
    }
     
    // Handling on change value
    handleChange(event) {
        this.selectedValue = event.detail.value;
    }
}