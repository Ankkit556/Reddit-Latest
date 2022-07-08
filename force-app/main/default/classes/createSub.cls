public with sharing class createSub {
    @AuraEnabled
    public static SubReddit__c createSubReddit(SubReddit__c sub) {
        system.debug('sub'+sub);
        insert sub;
        return sub;
    }
}