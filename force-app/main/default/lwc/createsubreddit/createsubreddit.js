import {
    LightningElement,
    track,api
} from 'lwc';
import SUBREDDIT_OBJECT from '@salesforce/schema/SubReddit__c';
import NAME_FIELD from '@salesforce/schema/SubReddit__c.Name';
import TITLE_FIELD from '@salesforce/schema/SubReddit__c.Title__c';
import DES_FIELD from '@salesforce/schema/SubReddit__c.Description__c';
import SUBREDDIT_POST from '@salesforce/schema/SubReddit__c.Post__c';
import createSubReddit from '@salesforce/apex/createSub.createSubReddit';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

export default class Createsubreddit extends LightningElement {

    @track name = NAME_FIELD;
    @track title = TITLE_FIELD;
    @track des = DES_FIELD;
    @api postid;
    rec = {
        Name: this.name,
        Title: this.title,
        Description: this.des,
        Post :this.postid
    }

    handleNameChange(event) {
        this.rec.Name = event.target.value;
        console.log("name1", this.rec.Name);
    }

    handleTitleChange(event) {
        this.rec.Title = event.target.value;
        console.log("Title", this.rec.Title);
    }

    handleDesChange(event) {
        this.rec.des = event.target.value;
        console.log("Descrip", this.rec.des);
    }

    handleClick() {
        createSubReddit({
                sub: this.rec
            })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if (this.message !== undefined) {
                    this.rec.Name = '';
                    this.rec.Title = '';
                    this.rec.des = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: ' created',
                            variant: 'success',
                        }),
                    );
                }

                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }

}