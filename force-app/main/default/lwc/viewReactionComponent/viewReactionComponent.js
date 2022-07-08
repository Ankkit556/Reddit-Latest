import { LightningElement,wire,track,api } from 'lwc';
import {
    getRecord, updateRecord
} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

//import PostReaction Objects and Fields.
import REACTION_OBJECT from '@salesforce/schema/Post_Reactions__c'
import REACTION_LIKED from '@salesforce/schema/Post_Reactions__c.Liked__c';
import REACTION_DISLIKED from '@salesforce/schema/Post_Reactions__c.Disliked__c';
import REACTED_POST from '@salesforce/schema/Post_Reactions__c.Posts__c';
import REACTION_USER from '@salesforce/schema/Post_Reactions__c.User__c';

//import Post_FIELDS 
import POST_Comments from '@salesforce/schema/Post__c.No_Of_Comments__c';
import POST_UPVOTES from '@salesforce/schema/Post__c.No_Of_Upvotes__c';
import POST_DOWNVOTES from '@salesforce/schema/Post__c.No_Of_Downvotes__c';
import POST_ID from '@salesforce/schema/Post__c.Id';

const POST_FIELDS = [POST_Comments,POST_DOWNVOTES,POST_UPVOTES];
const REACTION_FIELDS = [REACTED_POST,REACTION_DISLIKED,REACTION_LIKED,REACTION_USER];
export default class ViewReactionComponent extends LightningElement {
    @api postid;
    @track upvotes;
    @track downvotes;
    commentsTotal;
    //get Record from REACTION object.
    @wire(getRecord,{recordId:'$postid', fields:POST_FIELDS})
    gotReaction({error,data}){
        if(error){
            console.log('error:', error);
            
        }else if(data){
            console.log('####-data:', data);
            this.upvotes  = data.fields.No_Of_Upvotes__c.value;
            this.downvotes = data.fields.No_Of_Downvotes__c.value;
        }
    }
    /* @wire(getRecord,{}) */
    toggleDecrement(){
        const fields = {};
        fields[POST_ID.fieldApiName] = this.postid;
        //fields[POST_UPVOTES.fieldApiName] = this.upvotes++; // this.template.queeySelector("[data-field = 'Upvote']").value;
        fields[POST_DOWNVOTES.fieldApiName] = this.downvotes+ 1 ;
        const recordInput = {fields};
        updateRecord(recordInput).then(()=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Whoops!!',
                    message: 'Post DisLiked',
                    variant: 'error'
                })
            );
            // Display fresh data in the form
            //return refreshApex(this.contact);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    toggleIncrement(){
        const fields = {};
        fields[POST_ID.fieldApiName] = this.postid;
        fields[POST_UPVOTES.fieldApiName] = this.upvotes + 1; // this.template.queeySelector("[data-field = 'Upvote']").value;
       // fields[POST_DOWNVOTES.fieldApiName] = this.downvotes-- ;
        const recordInput = {fields};
        updateRecord(recordInput).then(()=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Post Liked',
                    variant: 'success'
                })
            );
            // Display fresh data in the form
            return refreshApex(this.gotReaction.data);
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
}