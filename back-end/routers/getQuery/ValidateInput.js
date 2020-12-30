const checkObjectId = (objectId) => {
    return mongoose.Types.ObjectId(objectId)
}


const checkConvens = (convens) => {
    if(convens != null){
        var keys = Object.keys(convens)
        for(let i = 0; i< keys.length; i++){
            if(convens[keys[i]] != null){
                if(typeof convens[keys[i]] != "boolean"){
                    return false
                }
            }
        }
        return true
    } else{ 
        return false
    }
}

const checkInputNumberValue = (object) => {
    if(object != null){
        var keys = Object.keys(object)
        for(let i = 0; i< keys.length; i++){
            if(object[keys[i]] < 0 ||object[keys[i]] == null ){
                return false
            }
        }
        return true
    } else{ 
        return false
    }
}

const checkInputStringValue = (object, option) => {
    if(object != null){
        var keys = Object.keys(object)
        for(let i = 0; i< keys.length; i++){
            if(typeof object[keys[i]] != "string" || object[keys[i]] == null){
                return false
            } else {
                if(object[keys[i]].length == 0){
                    return false
                } 
            }
        }
        return true
    } else{ 
        return false
    }
}

function checkusernameInput(usernameInput){
    if(usernameInput.length === 0){
        return false;
    }else{
        return true;
    }
}
//kiem tra email
function checkemailInput(emailInput){
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(emailInput) && emailInput.length === 0) {
        return false;
    }else{
        return true;
    }
}

//kiểm tra địa chỉ
function checkaddressInput(addressInput){
    console.log(addressInput);
    if(addressInput.length === 0){
        return false;
    }else{
        return true;
    }
}

//kiểm tra phone
function checkphoneNumberInput(phoneNumberInput){
    const regexPhone = /^[0-9]{10}$/;
    if(phoneNumberInput.length !== 10 && !regexPhone.test(phoneNumberInput)){
        return false;
    }else{
        return true;
    }
}

//kiểm tra mk
function checkpasswordInput(passwordInput){
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(!regexPass.test(passwordInput)){
        return false;
    }else{
        return true;
    }
}

//kiểm tra cf mk
function checkrePasswordInput(passwordInput, rePasswordInput){
    if(passwordInput !== rePasswordInput){
        return false;
    }else{
        return true;
    }
}

module.exports = {
    checkObjectId,
    checkConvens,
    checkInputNumberValue,
    checkInputStringValue,
    checkaddressInput,
    checkemailInput,
    checkpasswordInput,
    checkrePasswordInput,
    checkusernameInput,
    checkphoneNumberInput
};