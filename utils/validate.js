/*
    This function will check the value type
    Only numbers are accepted
*/
let isNumber= (amount)=>{
    console.log('amount ',amount)
    if(typeof(amount)!=="number"){
        throw "Invalid amount"
    }
    return true
}

/*
    This function checks that the number is a whole 
    number and not a decimal
*/
let isWhole= (amount)=>{
    if(amount%1!==0){
        throw 'Invalid Quantity Requested'
    }

    return true
}

/*
    This will check that the value of the amount are 
    at least greate than 1
*/
let atLeastOne=(amount)=>{
    if(amount<1){
        throw 'Invalid Amount Request'
    }

    return true
}

/*
    This function is specific for dollar amounts
    it does not check that it is a whole number because
    dollar and cents can be fractions
*/
let validateMoney=async (amount)=>{
    try{
        await isNumber(amount)
        await atLeastOne(amount)
    }catch(err){
        throw 'Invalid Cost of Share'
    }
}

/*
    This function is specific to validating quantity
    It will check for the same criteria as the dollar

*/
let validateQty=async (amount)=>{
    try{
        await isNumber(amount)
        await isWhole(amount)
        await atLeastOne(amount)
    }catch(err){
        throw 'Invalid Quantity Demanded'
    }
}

let functions = {
    validateQty,
    validateMoney,
    isNumber,
    isWhole,
    atLeastOne,
}

module.exports=functions