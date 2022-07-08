public with sharing class RecordsSearch {
    public RecordsSearch() {

    }
    @AuraEnabled
    public static List<Post__c> getPosts(String postTitle){
        List<Post__c> postResults = new List<Post__c>();
        String searchKey = '%'+postTitle+'%';
        try {
            if(searchKey != ''){
                postResults = [SELECT Id, Name , Title__c FROM Post__c
                WHERE Title__c LIKE :searchKey];
            }
           
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return postResults;
    }
}