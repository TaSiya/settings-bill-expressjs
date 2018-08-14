let assert = require('assert');
let settings = require('../settings-bill');

describe('Settings bill widget', function(){

    describe('Checks if the totals are correct', function(){
       it('if the user make 2 calls and 2 sms(s)', function(){
          var referenced1 = settings();
 
          referenced1.calculated('call');
          referenced1.calculated('call');
          referenced1.calculated('sms');
          referenced1.calculated('sms');
          assert.equal(referenced1.getTotals(),5.30);
       });
 
       it('if the user make 4 calls and 4 sms(s)', function(){
          var referenced2 = settings();
          referenced2.calculated('call');
          referenced2.calculated('call');
          referenced2.calculated('sms');
          referenced2.calculated('sms');
          referenced2.calculated('call');
          referenced2.calculated('call');
          referenced2.calculated('sms');
          referenced2.calculated('sms');
          assert.equal(referenced2.getTotals(),10.60);
       });
 
    });
 
    describe('Checks if the values are updated', function(){
       it('check the call if it does update',function(){
          var referenced3 = settings();
          referenced3.calculated('call');
          referenced3.calculated('call');
          assert.equal(referenced3.getCall(),referenced3.getCallCost()*2);
       });
 
       it('check the sms(s) if it does update',function(){
          var referenced4 = settings();
          referenced4.calculated('sms');
          referenced4.calculated('sms');
          assert.equal(referenced4.getSms(),referenced4.getSmsCost()*2);
       });
    });
 
    describe('Prevent more data when critical point reached', function(){
       it('Check if it prevent further calls or sms(s) if reached critical point', function(){
          var referenced5 = settings();
          referenced5.setCrit(20);
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
          referenced5.calculated('call');
 
          assert.equal(referenced5.getTotals(),20)
       });
 
       it('Check if it prevent further calls or sms(s) if reached critical point', function(){
          var referenced6 = settings();
          referenced6.setCrit(20);
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('call');
          referenced6.calculated('sms');
          referenced6.calculated('sms');
          referenced6.calculated('sms');
          referenced6.calculated('sms');
          referenced6.calculated('sms');
          referenced6.calculated('sms');
          assert.equal(referenced6.getTotals(),20.6)
       });
    });

    describe('Using the settings fields the defaults are call cost = 2, sms cost = 0.65,', function(){
        it('should return 5 if the call cost is updated to 3 ', function(){
            let bill = settings();
            bill.calculated('call');
            bill.setCall(3);
            bill.calculated('call');
            assert.equal(bill.getTotals(), 5);
        });
        it('should return 16 if the call cost is updated to 5 and sms cost into 3', function(){
            let bill = settings();
            bill.setSms(3);
            bill.setCall(5);
            bill.calculated('call');
            bill.calculated('sms');
            bill.calculated('call');
            bill.calculated('sms');
            assert.equal(bill.getTotals(),16);
        });
    });
 
    describe('Filtering the time stamps', function(){
        it("should return call only time stamps", function(){
            let bill = settings();
            bill.calculated('call');
            bill.calculated('call');
            bill.calculated('sms');
            assert.deepEqual(bill.filter('call'),[
                {
                    type : 'call',
                    price : 4,
                    when : new Date()
                },
                {
                    type : 'call',
                    price : 2,
                    when : new Date()
                },
            ]);
        });
        it("should return sms only time stamps", function(){
            let bill = settings();
            bill.calculated('call');
            bill.calculated('sms');
            bill.calculated('sms');
            bill.calculated('call');
            bill.calculated('sms');
            assert.deepEqual(bill.filter('sms'),[
                {
                    type : 'sms',
                    price : 1.95,
                    when : new Date()
                },
                {
                    type : 'sms',
                    price : 1.3,
                    when : new Date()
                },
                {
                    type : 'sms',
                    price : 0.65,
                    when : new Date()
                }
                    
                    
            ]);
        });
    });

    // describe('Displaying all time stamps for the app', function(){
    //     it("should print all 2 calls and 2 sms time stamps", function(){
    //         let bill = settings();
    //         bill.calculated('call');
    //         assert.deepEqual(bill.gettingStamps(),[
    //             {
    //                 type: 'call',
    //                 price : 2,
    //                 when : new Date()
    //             }
    //         ]);
    //     });
    // });


 });


