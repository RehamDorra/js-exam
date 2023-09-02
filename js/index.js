$(document).ready(()=>{
    $(".inner-loading-screen").fadeOut(500)
    $(".loading-screen").fadeOut(500 , ()=>{ 
        displayMeals()

        $("body").css("overflow" , "visible")
        $(".side-nav").fadeIn(500 )
    } )        
    })

$(".nav-btn").click(function(){
   let widthOfNav= $(".inner-side-nav").outerWidth()
   console.log(widthOfNav)
   if($(".side-nav").css("left") == "0px"){
    $(".side-nav").animate({left : -widthOfNav} , 500)
    $(".nav-btn").addClass("fa-align-justify");
    $(".nav-btn").removeClass("fa-x");

   }
   else{
    $(".side-nav").animate({left : 0} , 500)
    $(".nav-btn").removeClass("fa-align-justify");
    $(".nav-btn").addClass("fa-x");
   }
})
//////////////////////meals//////////////////////////////////////////////////////////////////
let mealArray = []
let productReq = new XMLHttpRequest()
productReq.open("get" , "https://www.themealdb.com/api/json/v1/1/search.php?s=")
productReq.send()
productReq.addEventListener("readystatechange" , function(){
    if(productReq.readyState == 4 && productReq.status == 200){
        mealArray = JSON.parse(productReq.response).meals.splice(0 , 25)
        console.log(JSON.parse(productReq.response).meals.splice(0 , 25))
        
    }
})

function displayMeals(){
    let cartona = ""
    for(let i = 0 ; i < mealArray.length ; i++){
        cartona+=`
        <div class="col-md-3">
        <div class="meal position-relative rounded-2 overflow-hidden" onclick="searchCategoryDesc('${mealArray[i].idMeal}')">
            <img src="${mealArray[i].strMealThumb}" class="w-100" alt="">
            <div class="meal-layer position-absolute w-100 h-100 text-black d-flex align-items-center"> 
                <h3>${mealArray[i].strMeal}</h3>
            </div>
        </div>
    </div>
        `
    }
    document.querySelector("#data").innerHTML = cartona
}

/////////////////////////////////////////////////////////////

function searchCategoryDesc(idMeal){
    let mealscategoryDescArray = []
let mealsCategoryDescRequest = new XMLHttpRequest()
mealsCategoryDescRequest.open("get" , `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
mealsCategoryDescRequest.send()
mealsCategoryDescRequest.addEventListener("readystatechange" , function(){
    if(mealsCategoryDescRequest.readyState == 4 && mealsCategoryDescRequest.status == 200){
        mealscategoryDescArray = JSON.parse(mealsCategoryDescRequest.response).meals
        console.log(mealscategoryDescArray)
        displayMealsOfCategoryDesc(mealscategoryDescArray)
    }
})
}

function displayMealsOfCategoryDesc(mealscategoryDescArray){
    let cartona = ""
    let ingr = ``
    let tags = ``
    for (let i = 1; i < `mealscategoryDescArray[i].strIngredient${i}`; i++) {
        if (`mealscategoryDescArray[i].strIngredient${i}`) {
            ingr += `<li class="p-1 m-2 rounded-3"> ${`mealscategoryDescArray[i].strIngredient${i}`}</li>`
        }
    }console.log(ingr)
for(let i = 0 ; i <  mealscategoryDescArray.length ; i++ ){
    cartona+=`
    <div class="col-md-4">
    <div class="meal-img text-white text-capitalize">
        <img src="${mealscategoryDescArray[i].strMealThumb}" class="w-100 rounded-3" alt="">
        <h2>${mealscategoryDescArray[i].strMeal}</h2>
    </div>
  </div>
  <div class="col-md-8">
    <div class="about-meal text-white">
        <h3>Instructions</h3>
        <p>${mealscategoryDescArray[i].strInstructions}</p>
        <h3><span class="fw-bolder">Area:</span> ${mealscategoryDescArray[i].strArea}</h3>
        <h3><span class="fw-bolder">Category:</span> ${mealscategoryDescArray[i].strCategory}</h3>
        <h3><span class="fw-bolder">Recipes:</span> </h3>
        <ul class="list-unstyled recipy d-flex g-3 flex-wrap ">
        ${ingr}
        </ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled tag d-flex g-3 flex-wrap ">
        <li class="p-1 m-2 rounded-3">${mealscategoryDescArray[i].strTags}</li>
        </ul>
        <a href="${mealscategoryDescArray[i].strSource}" class="btn btn-success text-white">Source</a>
        <a href="${mealscategoryDescArray[i].strYoutube}" class="btn btn-danger text-white">Youtube</a>
    </div>
</div>
    `
    }
    document.querySelector("#data").innerHTML = cartona
}
/////////////////////////////search term/////////////////////////////////////////////////
function displaySearch(){
    document.querySelector("#search").innerHTML = `
    <div class="col-md-6 ">
    <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
</div>
<div class="col-md-6">
    <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
</div>
    `
    document.querySelector("#data").innerHTML = ""
    
}
document.querySelector("#searchpage").addEventListener("click" , function(){
    displaySearch()
    let widthOfNav= $(".inner-side-nav").outerWidth()
    $(".side-nav").animate({left : -widthOfNav} , 500)
    $(".nav-btn").addClass("fa-align-justify");
    $(".nav-btn").removeClass("fa-x");

})
function searchByName(term){   
let searchArray = []
let searchRequest = new XMLHttpRequest()
searchRequest.open("get" , `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
searchRequest.send()
searchRequest.addEventListener("readystatechange" , function(){
    if(searchRequest.readyState == 4 && searchRequest.status == 200){
        console.log(JSON.parse(searchRequest.response).meals)
        searchArray = JSON.parse(searchRequest.response).meals
        console.log(searchArray)
        whatYouSearchedFor(searchArray)
    }
})
}
function whatYouSearchedFor(searchArray){
    let cartona = ""
    for(let i = 0 ; i < searchArray.length ; i++){
        cartona+= `
        <div class="col-md-3">
        <div class="category position-relative overflow-hidden" onclick="searchCategoryDesc( '${searchArray[i].idMeal}' )" )" >
            <img src="${searchArray[i].strMealThumb}" class="w-100" alt="">
            <div class="category-layer position-absolute w-100 h-100 text-black d-flex align-items-center">
                <h3>${searchArray[i].strMeal}</h3>
            </div>
        </div>
     </div>`
}
document.querySelector("#data").innerHTML = cartona
}
/////////////////////////////////search first letter/////////////////////////////////////////////////////
function searchByFLetter(term){   
    let firstsearchArray = []
    let firsearchRequest = new XMLHttpRequest()
    firsearchRequest.open("get" , `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    firsearchRequest.send()
    firsearchRequest.addEventListener("readystatechange" , function(){
        if(firsearchRequest.readyState == 4 && firsearchRequest.status == 200){
            console.log(JSON.parse(firsearchRequest.response).meals)
            firstsearchArray = JSON.parse(firsearchRequest.response).meals
            console.log(firstsearchArray)
            whatYouSearchedFor(firstsearchArray)
        }
    })
    }
    function whatYouSearchedFor(firstsearchArray){
        let cartona = ""
        for(let i = 0 ; i < firstsearchArray.length ; i++){
            cartona+= `
            <div class="col-md-3">
            <div class="category position-relative overflow-hidden" onclick="searchCategoryDesc( '${firstsearchArray[i].idMeal}' )" )" >
                <img src="${firstsearchArray[i].strMealThumb}" class="w-100" alt="">
                <div class="category-layer position-absolute w-100 h-100 text-black d-flex align-items-center">
                    <h3>${firstsearchArray[i].strMeal}</h3>
                </div>
            </div>
         </div>`
    }
    document.querySelector("#data").innerHTML = cartona
    }

////////////////////category//////////////////////////////////
let categoryArray = []
let categoryRequest = new XMLHttpRequest()
categoryRequest.open("get" , "https://www.themealdb.com/api/json/v1/1/categories.php")
categoryRequest.send()
categoryRequest.addEventListener("readystatechange" , function(){
    if(categoryRequest.readyState == 4 && categoryRequest.status == 200){

        console.log(JSON.parse(categoryRequest.response).categories)
        categoryArray = JSON.parse(categoryRequest.response).categories
        console.log(categoryArray)
        $(".inner-loading-screen").fadeOut(500)
    }
})


function displayCategory(){
   

    let cartona = ""
    for(let i = 0 ; i < categoryArray.length ; i++){

        cartona+= `
        <div class="col-md-3">
        <div class="category position-relative overflow-hidden" onclick="searchMeal( '${categoryArray[i].strCategory}' )" >
            <img src="${categoryArray[i].strCategoryThumb}" class="w-100" alt="">
            <div class="category-layer position-absolute w-100 h-100 text-black text-center">
                <h3>${categoryArray[i].strCategory}</h3>
                <p>${categoryArray[i].strCategoryDescription}</p>
            </div>
        </div>
     </div>`
    }

    document.querySelector("#data").innerHTML = cartona

}

document.querySelector("#category").addEventListener("click" , function(){
        displayCategory()
            let widthOfNav= $(".inner-side-nav").outerWidth()
            $(".side-nav").animate({left : -widthOfNav} , 500)
            $(".nav-btn").addClass("fa-align-justify");
            $(".nav-btn").removeClass("fa-x");
        
           
})


/////////////////////////////


function searchMeal(meal){
document.querySelector("#data").innerHTML =""
$(".inner-loading-screen").fadeIn(500)

let mealscategoryArray = []
let mealsCategoryRequest = new XMLHttpRequest()
mealsCategoryRequest.open("get" , `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
mealsCategoryRequest.send()
mealsCategoryRequest.addEventListener("readystatechange" , function(){
    if(mealsCategoryRequest.readyState == 4 && mealsCategoryRequest.status == 200){
        mealscategoryArray = JSON.parse(mealsCategoryRequest.response).meals
        console.log(mealscategoryArray)
        displayMealsOfCategory(mealscategoryArray)
        $(".inner-loading-screen").fadeOut(500)
    }
})
}
function displayMealsOfCategory(mealscategoryArray){
    let cartona = ""
    for(let i = 0 ; i < mealscategoryArray.length ; i++){

        cartona+= `
        <div class="col-md-3">
        <div class="category position-relative overflow-hidden" onclick="searchCategoryDesc( '${mealscategoryArray[i].idMeal}' )" >
            <img src="${mealscategoryArray[i].strMealThumb}" class="w-100" alt="">
            <div class="category-layer position-absolute w-100 h-100 text-black text-center d-flex align-items-center">
                <h3>${mealscategoryArray[i].strMeal}</h3>
                
            </div>
        </div>
     </div>`
    }

    document.querySelector("#data").innerHTML = cartona

}

///////////////////////////////mealCategoryDetails/////////////////////////////////////////////////////

function searchCategoryDesc(idMeal){
    let mealscategoryDescArray = []
let mealsCategoryDescRequest = new XMLHttpRequest()
mealsCategoryDescRequest.open("get" , `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
mealsCategoryDescRequest.send()
mealsCategoryDescRequest.addEventListener("readystatechange" , function(){
    if(mealsCategoryDescRequest.readyState == 4 && mealsCategoryDescRequest.status == 200){
        mealscategoryDescArray = JSON.parse(mealsCategoryDescRequest.response).meals
        console.log(mealscategoryDescArray)
        displayMealsOfCategoryDesc(mealscategoryDescArray)
    }
})
}

function displayMealsOfCategoryDesc(mealscategoryDescArray){
    
    let cartona = ""
    let ingredients = ``
    let tags = ``
     for (let i = 1; i <= 20; i++) {
         if (`mealscategoryDescArray.strIngredient${i}`) {
        ingredients += `<li class="p-1 m-2 rounded-3">${mealscategoryDescArray[`strMeasure${i}`]} ${mealscategoryDescArray[`strIngredient${i}`]}</li>`
         }
    }
for(let i = 0 ; i <  mealscategoryDescArray.length ; i++ ){
    cartona+=`
    <div class="col-md-4">
    <div class="meal-img text-white text-capitalize">
        <img src="${mealscategoryDescArray[i].strMealThumb}" class="w-100 rounded-3" alt="">
        <h2>${mealscategoryDescArray[i].strMeal}</h2>
    </div>
  </div>
  <div class="col-md-8">
    <div class="about-meal text-white">
        <h3>Instructions</h3>
        <p>${mealscategoryDescArray[i].strInstructions}</p>
        <h3><span class="fw-bolder">Area:</span> ${mealscategoryDescArray[i].strArea}</h3>
        <h3><span class="fw-bolder">Category:</span> ${mealscategoryDescArray[i].strCategory}</h3>
        <h3><span class="fw-bolder">Recipes:</span> </h3>
        <ul class="list-unstyled recipy d-flex g-3 flex-wrap ">
        ${ingredients} 
        </ul>
        <h3>Tags:</h3>
        <ul class="list-unstyled tag d-flex g-3 flex-wrap ">
        <li class="p-1 m-2 rounded-3">${mealscategoryDescArray[i].strTags}</li>
        </ul>
        <a href="${mealscategoryDescArray[i].strSource}" class="btn btn-success text-white">Source</a>
        <a href="${mealscategoryDescArray[i].strYoutube}" class="btn btn-danger text-white">Youtube</a>
    </div>
</div>
    `
    }
    document.querySelector("#data").innerHTML = cartona
}

//////////////////////////Area//////////////////////////////////////////
let areaArray = []
let areaRequest = new XMLHttpRequest()
areaRequest.open("get" , "https://www.themealdb.com/api/json/v1/1/list.php?a=list")
areaRequest.send()
areaRequest.addEventListener("readystatechange" , function(){
    if(areaRequest.readyState == 4 && areaRequest.status == 200){
        areaArray = JSON.parse(areaRequest.response).meals
        console.log(areaArray)
    }
})
function displayArea(){
    let cartona = ""
    for(let i = 0 ; i < areaArray.length ; i++){
        cartona+= `
        <div class="col-md-3">
        <div class="area rounded-2 text-center text-capitalize" onclick="searchArea('${areaArray[i].strArea}')">
            <i class="fa-solid fa-house-laptop "></i>
            <h3>${areaArray[i].strArea}</h3>
        </div>
    </div>
        `
    }
    document.querySelector("#data").innerHTML = cartona
}

document.querySelector("#area").addEventListener("click" , function(){
    displayArea()
    let widthOfNav= $(".inner-side-nav").outerWidth()
    $(".side-nav").animate({left : -widthOfNav} , 500)
    $(".nav-btn").addClass("fa-align-justify");
    $(".nav-btn").removeClass("fa-x");

})
///////////////////////////////////////////////////////////////////////

function searchArea(area){   
let areaMealsArray = []
let areaMealsRequest = new XMLHttpRequest()
areaMealsRequest.open("get" , `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
areaMealsRequest.send()
areaMealsRequest.addEventListener("readystatechange" , function(){
    if(areaMealsRequest.readyState == 4 && areaMealsRequest.status == 200){
        areaMealsArray = JSON.parse(areaMealsRequest.response).meals
        console.log(areaMealsArray)
        displayAreaMeals(areaMealsArray)
    }
})
}

function displayAreaMeals(areaMealsArray){
    let cartona = ""
    for(let i = 0 ; i < areaMealsArray.length ; i++){
        cartona+= `
        <div class="col-md-3">
        <div class="category position-relative overflow-hidden" onclick="searchCategoryDesc( '${areaMealsArray[i].idMeal}' )">
            <img src="${areaMealsArray[i].strMealThumb}" class="w-100" alt="">
            <div class="category-layer position-absolute w-100 h-100 text-black text-center d-flex align-items-center">
                <h3>${areaMealsArray[i].strMeal}</h3>                
            </div>
        </div>
     </div>`
    }
    document.querySelector("#data").innerHTML = cartona
    }
 ///////////////////////////////Ingrediants////////////////////////////////////////////////////

 let ingrediantsArray = []
let ingrediantsRequest = new XMLHttpRequest()
ingrediantsRequest.open("get" , "https://www.themealdb.com/api/json/v1/1/list.php?i=list")
ingrediantsRequest.send()
ingrediantsRequest.addEventListener("readystatechange" , function(){
    if(ingrediantsRequest.readyState == 4 && ingrediantsRequest.status == 200){
        ingrediantsArray = JSON.parse(ingrediantsRequest.response).meals.slice(0,20)
        console.log(ingrediantsArray)
    }
})
function displayIngrediant(){
    let cartona = ""
    for(let i = 0 ; i < ingrediantsArray.length ; i++){
        cartona+= `
        <div class="col-md-3">
        <div class="area rounded-2 text-center " onclick="searchIngrediant( '${ingrediantsArray[i].strIngredient}' )">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h3 class="text-capitalize">${ingrediantsArray[i].strIngredient}</h3>
            <p>${ingrediantsArray[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>
        `
    }
    document.querySelector("#data").innerHTML = cartona
}
document.querySelector("#ingrediant").addEventListener("click" , function(){
    displayIngrediant()
    let widthOfNav= $(".inner-side-nav").outerWidth()
    $(".side-nav").animate({left : -widthOfNav} , 500)
    $(".nav-btn").addClass("fa-align-justify");
    $(".nav-btn").removeClass("fa-x");

})
/////////////////////////////////////////////////////////////////////////////////

function searchIngrediant(ingrediant){   
    let ingrediantMealsArray = []
    let ingrediantMealsRequest = new XMLHttpRequest()
    ingrediantMealsRequest.open("get" , `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`)
    ingrediantMealsRequest.send()
    ingrediantMealsRequest.addEventListener("readystatechange" , function(){
        if(ingrediantMealsRequest.readyState == 4 && ingrediantMealsRequest.status == 200){
            ingrediantMealsArray = JSON.parse(ingrediantMealsRequest.response).meals
            console.log(ingrediantMealsArray)
            displayIngrediantsMeals(ingrediantMealsArray)
        }
    })
    }
    function displayIngrediantsMeals(ingrediantMealsArray){
        document.querySelector("#search").innerHTML=""
        let cartona = ""
        for(let i = 0 ; i < ingrediantMealsArray.length ; i++){
            cartona+= `
            <div class="col-md-3">
            <div class="category position-relative overflow-hidden" onclick="searchCategoryDesc( '${ingrediantMealsArray[i].idMeal}' )">
                <img src="${ingrediantMealsArray[i].strMealThumb}" class="w-100" alt="">
                <div class="category-layer position-absolute w-100 h-100 text-black text-center d-flex align-items-center">
                    <h3>${ingrediantMealsArray[i].strMeal}</h3>                
                </div>
            </div>
         </div>`
        }
        document.querySelector("#data").innerHTML = cartona
        }

//////////////////////////////contact/////////////////////////////////////////////




function showContacts() {
    document.querySelector("#data").innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

document.querySelector("#contact").addEventListener("click" , function(){
    showContacts()
    let widthOfNav= $(".inner-side-nav").outerWidth()
    $(".side-nav").animate({left : -widthOfNav} , 500)
    $(".nav-btn").addClass("fa-align-justify");
    $(".nav-btn").removeClass("fa-x");

})