public with sharing class accountDetails {
   @AuraEnabled(cacheable=true)
   public static List<Account> getAcc(){
    return [Select Id,Name,Industry,Phone,Rating from Account ];
    
   }
}