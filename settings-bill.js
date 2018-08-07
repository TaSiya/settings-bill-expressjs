
module.exports = function SettingsBill(){
    var call = 0;
    var sms = 0;
    var total = 0;
 
    var callCost = 2 ;
    var smsCost = 0.65;
    var warning = 30.00;
    var critical = 65.00;

    function allValues(){
        return {
            call,
            sms,
            total,
            callCost,
            smsCost,
            warning,
            critical
        }
    }
 
    function calculatingTotal(value){
       if(total > critical){
 
       }
       else{
          if(value === 'call'){
             call = call + callCost;
          }
          else if (value === 'sms'){
             sms = sms + smsCost;
          }
          total = call + sms;
          if(total > critical){
             if(value === 'call'){
                total -= callCost;
                call -= callCost;
 
             }
             else if (value === 'sms'){
                total -= smsCost;
                sms -= smsCost;
             }
          }
       }
    }
 
    function getTotal(){return total;}
    function getCalls(){return call;}
    function getSmses(){return sms;}
    function getCallCost(){return callCost;}
    function getSmsCost(){return smsCost;}
    function getWarning(){return warning;}
    function getCritical(){return critical;}
 
    function setCritical(value){critical = value;}
    function setWarning(value){warning = value;}
    function setCallCost(value){callCost = value;}
    function setSmsCost(value){smsCost = value;}
 
 
    return {
       calculated : calculatingTotal,
       getTotals : getTotal,
       getCall : getCalls,
       getSms : getSmses,
       getCallCost : getCallCost,
       getSmsCost : getSmsCost,
       getWarningLevel : getWarning,
       getCriticalLevel : getCritical,
       setCrit : setCritical,
       setWarn : setWarning,
       setCall : setCallCost,
       setSms : setSmsCost,
       allValues : allValues
    }
 }
 