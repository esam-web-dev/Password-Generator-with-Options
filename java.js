let inpotLength = document.getElementById("length");
let generateBtn = document.getElementById("generate");
let displaypasswordDiv = document.getElementById("password");

displaypasswordDiv.innerHTML = window.localStorage.getItem("passwordDis"); // مشام ازا عمل ريفرش يعرض عشاشة اخر كلمة مرور




inpotLength.addEventListener("input", function() {

    let valueInpo = inpotLength.value;

    // تبديل كلشي عدا الارقام الى سترينغ فاضي ...(يعني مابخلي المستخدم يدخل غير ارقام)
    valueInpo = valueInpo.replace(/\D/g, "");
    

    // بدي اعمل ماياخد غير بين الاقام من 1 - 32

    if(valueInpo) {
        valueInpo = Math.max(1, Math.min(32, parseInt(valueInpo)));
    }


    inpotLength.value = valueInpo;
})

// مشان وقت اخرج من الحقل يحط 10 لحالو 
inpotLength.addEventListener("blur", function() {
    if(inpotLength.value === ""){ inpotLength.value = 10;}
});





// Generate Password Function

function generatepassword(length, includeNums, includeSpecialChars) {
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let special = "!@#$%^&*()_+-=[]{}|;:',.<>?";

let charcterPool = lowercase + uppercase;

if(includeNums) charcterPool += numbers;
if(includeSpecialChars) charcterPool += special;

let password = "";
// console.log(charcterPool)
// console.log(charcterPool.length)
for(let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charcterPool.length)

    password += charcterPool[randomIndex]
}

return password;
}

// console.log(generatepassword(12,true,true))


// click on generate btn

generateBtn.addEventListener("click", function() {
    // Get password Length
    let lenthValuePassword = parseInt(inpotLength.value);
    // console.log(lenthValuePassword);
    let includeNums = document.getElementById("include-nums").checked; /* هون عم شوف ازا المستخدم عمل تشيك او لا */
    let includespicial = document.getElementById("include-spicial").checked; /* هون عم شوف ازا المستخدم عمل تشيك او لا */
    // console.log(includeNums);

    // Get Random Password From GeneratePasswordFunction 
    let password =  generatepassword(lenthValuePassword,includeNums,includespicial);

    displaypasswordDiv.textContent = password;


    // saved password to localStorage
    savePassword(password);
    displaySavedPassword();
})

// save The Password to local Storage

function savePassword(pass) {
     // قراءة 
    let savedPasswordsArr = JSON.parse(localStorage.getItem("password")) || [];

    // console.log(savePassword);
    savedPasswordsArr.unshift(pass); // add Password to the Start of Array        // تعديل
    // console.log(savePassword);
    if(savedPasswordsArr.length > 10){ savedPasswordsArr.pop()}; // Remove the Latest Element
    localStorage.setItem("password", JSON.stringify(savedPasswordsArr))       // تخزين
}


function displaySavedPassword() {
    let savedPasswords = JSON.parse(localStorage.getItem("password")); // استخدام
    // console.log(savedPasswords);
    let listOfpasswords = savedPasswords.map((p,i) => `<div><span>${i+1}</span>  ${EscapeHtml(p)} <button class="btnDle" onclick="deletPassword(${i})">Delete</button></div>`).join(" ");


    // console.log(listOfpasswords.join(" "));
    document.getElementById("saved-passswords").innerHTML = listOfpasswords || "Password Will be show Here";   /* ملاحظة: لحالو الانر اتش تي ام ال بحولك المصفوفة الى سلسلة نصية */
}

// Escape HTML

function EscapeHtml(str) {
return str.replace(/&/g,"&amp;").replace(/</g, "&lt").replace(/>/g,"&gt").replace(/"/g,"&quot").replace(/'/g,"&#039");
}


function deletPassword(index) {
    
        let arrPass = JSON.parse(localStorage.getItem("password")) || {};

      arrPass.splice(index, 1); // حذف العنصر من المصفوفة

        localStorage.setItem("password", JSON.stringify(arrPass));
        displaySavedPassword();

    // تابع لتزبيط شاشة العرض لكلمات السر
        getpass(arrPass);
}


    // تابع لتزبيط شاشة العرض لكلمات السر

    function getpass(passwordsArray) {
    if (passwordsArray.length === 0) {
        displaypasswordDiv.textContent = "Password Will Appear Here";
    } else {
        displaypasswordDiv.textContent = passwordsArray[0]; // عرض آخر كلمة سر محفوظة
            window.localStorage.setItem("passwordDis", displaypasswordDiv.textContent);
    }
}




// Display Passwords On Page Load 

document.addEventListener("DOMContentLoaded",displaySavedPassword);





























































































//  ملاحظة: 

// String: أشياء فيك تعملها على الـ 

// let str = "hello";

// console.log(str[0]);       // "h"
// console.log(str.length);   // 5
// console.log(str.charAt(1)); // "e"
// console.log(str.includes("ell")); // true
