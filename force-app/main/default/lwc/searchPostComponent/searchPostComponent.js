import { LightningElement, wire, api, track } from 'lwc';
import recordSearch from '@salesforce/apex/RecordsSearch.getPosts';
export default class SearchPostComponent extends LightningElement {

    postTitle = '';
    @track postList =[];
   
    changeHandler(event){
        this.postTitle = event.target.value;
        recordSearch({postTitle:this.postTitle})
        .then(result=>{
            this.postList = result;
        })
        console.log('postTitle:', this.postTitle);
    }

}