public with sharing class fetchRecords {
    @AuraEnabled(cacheable=true)
    public static List<Post__c> fetchPosts(){
        List<Post__c> posts = new List<Post__c>();
        try {
            posts = [SELECT Id, Name, Title__c, Body__c, SubReddit__c, No_Of_Comments__c, No_Of_Upvotes__c, No_Of_Downvotes__c, CreatedDate
            FROM Post__c ORDER BY CreatedDate DESC];
            system.debug('post->'+posts);
            return posts;
           

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}