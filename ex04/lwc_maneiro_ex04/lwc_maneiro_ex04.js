import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import LEAD_OBJECT from '@salesforce/schema/Lead';
import LAST_NAME_FIELD from '@salesforce/schema/Lead.LastName';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Lead.AnnualRevenue';
import RATING_FIELD from '@salesforce/schema/Lead.Rating';
import PHONE_FIELD from '@salesforce/schema/Lead.Phone';
import MOBILE_PHONE_FIELD from '@salesforce/schema/Lead.MobilePhone';

export default class Lwc_maneiro_ex04 extends LightningElement {

    company = '';
    lastName = '';
    annualRevenue = '';
    rating = '';
    phone = '';
    mobilePhone = '';

    handleInputChange(event) {
        this[event.target.name] = event.target.value;
    }

    handleSubmit() {
        const fields = {};
        fields[COMPANY_FIELD.fieldApiName] = this.company;
        fields[LAST_NAME_FIELD.fieldApiName] = this.lastName;
        fields[ANNUAL_REVENUE_FIELD.fieldApiName] = this.annualRevenue;
        fields[RATING_FIELD.fieldApiName] = this.rating;
        fields[PHONE_FIELD.fieldApiName] = this.phone;
        fields[MOBILE_PHONE_FIELD.fieldApiName] = this.mobilePhone;

        const recordInput = { apiName: LEAD_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Lead criado',
                        message: 'O lead foi criado com sucesso!',
                        variant: 'success',
                    }),
                );
                this.handleClear();
                this.navigateToRecord(result.id);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Erro ao criar lead',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }

    handleClear() {
        this.company = '';
        this.lastName = '';
        this.annualRevenue = '';
        this.rating = '';
        this.phone = '';
        this.mobilePhone = '';
    }

    navigateToRecord(recordId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Lead',
                actionName: 'view',
            },
        });
    }
}