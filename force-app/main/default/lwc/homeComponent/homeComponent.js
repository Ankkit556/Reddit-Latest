import {
    LightningElement,
    api,
    wire
} from 'lwc';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
    NavigationMixin
} from 'lightning/navigation';

import POST_OBJECT from '@salesforce/schema/Post__c';
import POST_TITLE from '@salesforce/schema/Post__c.Title__c';
import POST_BODY from '@salesforce/schema/Post__c.Body__c';
import POST_NAME from '@salesforce/schema/Post__c.Name';
import POST_SUBREDDIT from '@salesforce/schema/Post__c.SubReddit__c';
import POST_Comments from '@salesforce/schema/Post__c.No_Of_Comments__c';
import POST_UPVOTES from '@salesforce/schema/Post__c.No_Of_Upvotes__c';
import POST_DOWNVOTES from '@salesforce/schema/Post__c.No_Of_Downvotes__c';
import POST_CREATEDDATE from '@salesforce/schema/Post__c.CreatedDate';
import getPosts from '@salesforce/apex/fetchRecords.fetchPosts';

import SUBREDDIT_OBJECT from '@salesforce/schema/SubReddit__c';
import NAME_FIELD from '@salesforce/schema/SubReddit__c.Name';
import TITLE_FIELD from '@salesforce/schema/SubReddit__c.Title__c';
import DES_FIELD from '@salesforce/schema/SubReddit__c.Description__c';



//import comment object and fields

import COMMENT_OBJECT from '@salesforce/schema/Comment__c';
import COMMENT_BODY from '@salesforce/schema/Comment__c.Body__c';
export default class HomeComponent extends NavigationMixin(LightningElement) {
    @api postFields;
    @api objectApiName;
    @api recordId;

    @api objectName;
    @api SUBfIELDS;
    count;
    addend;
    showcreatePost = false;
    createsubReddit = false;
    objectApiName = POST_OBJECT;
    postidddd
    objectName = SUBREDDIT_OBJECT;
    SUBfIELDS = [NAME_FIELD, TITLE_FIELD, DES_FIELD];

    postFields = [POST_NAME, POST_TITLE, POST_BODY];
    postList;
    constructor() {
        super()
        this.state = {
            count: 0,
            addend: 0 // either 1, 0, or -1
        }
    }
    @wire(getPosts)
    postsList({
        data,
        error
    }) {
        if (data) {
            this.postList = data;
            console.log('data->', data);
        } else if (error) {
            console.log('error:', error);
        }
    };

    
    connectedCallback() {
        console.log('objectApiName:', this.objectApiName);
        console.log('postFields:', this.postFields);
        console.log('postList:', this.postsList);
    }
    createPost() {
        this.showcreatePost = true;
    }
    closePostCreateModal() {
        this.showcreatePost = false;
    }
    SubmitPost() {
        this.showcreatePost = false;
    }
    postCreated() {
        this.createsubReddit = false;
        const toastEvent = new ShowToastEvent({
            title,
            variant: "success",
            message: "Post created successfully"
        })
        this.dispatchEvent(toastEvent)
    }

    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }

    handleClick() {
        const {
            base64,
            filename,
            recordId
        } = this.fileData
        uploadFile({
            base64,
            filename,
            recordId
        }).then(result => {
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            this.toast(title)
        })
    }

    toast(title) {
        const toastEvent = new ShowToastEvent({
            title,
            variant: "success"
        })
        this.dispatchEvent(toastEvent)
    }

    openPost(event) {

        console.log('event:', event.target.dataset.id);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.dataset.id,
                objectApiName: 'Post__c',
                actionName: 'view'
            },
        });
    }
    createSubreddit(event) {
        this.createsubReddit = true;
        this.postidddd = event.target.dataset.postId;
    }
    SubmitReddit() {
        this.createsubReddit = false;
    }

    closeSubModal(){
        this.createsubReddit = false;
    }
    /* toggleIncrement = () => {
        this.setState(prevState => ({
            addend: prevState.addend === 1 ? 0 : 1
        }))
    }

    toggleDecrement = () => {

        this.setState(prevState => ({
            addend: prevState.addend === -1 ? 0 : -1
        }))
    } */


}