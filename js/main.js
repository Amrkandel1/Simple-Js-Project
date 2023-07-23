var sitName=document.getElementById("siteName");
var siteUrl=document.getElementById("siteUrl");
var btnSubmit=document.getElementById("btnsubmit");
var tBody=document.getElementById("TBody")
var btnDelete=document.getElementById("btnDelete");
var lightboxContainer=document.getElementById("lightbox-container");
var btnClose=document.getElementById("btnClose");
var allWebsitesInfo=[];

if(localStorage.getItem("allWebsitesInfo")!=null){
    allWebsitesInfo=JSON.parse(localStorage.getItem("allWebsitesInfo"));
    displayTableContent()
}

btnSubmit.addEventListener("click" , function(){
    if (sitName.classList.contains("is-valid") && siteUrl.classList.contains("is-valid")){       
        var websiteInfo={
            name:sitName.value,
            url:`https://${siteUrl.value}`
        }
        allWebsitesInfo.push(websiteInfo);
        localStorage.setItem("allWebsitesInfo" , JSON.stringify(allWebsitesInfo));
        displayTableContent();
        clearInput();
        sitName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");
    }else{
        lightboxContainer.classList.remove("d-none")
    }   
})

function displayTableContent(){
    var box=``;
    for(var i=0 ; i<allWebsitesInfo.length ; i++){
        box+=`
        <tr>
        <td>${i+1}</td>
        <td>${allWebsitesInfo[i].name}</td>
        <td><button class="btn btn-success"><a target="_blank" href="${allWebsitesInfo[i].url}" ><i class="fa-solid fa-eye"></i> Visit</a></button></td>
        <td><button onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>     
        </tr>
        `
    }
    tBody.innerHTML=box;
}

function deleteItem(index){
    allWebsitesInfo.splice(index,1);
    localStorage.setItem("allWebsitesInfo" , JSON.stringify(allWebsitesInfo));
    displayTableContent();
}

var regix1=/^[A-Za-z]{3,30}$/;
var regix2=/^www\.[a-zA-Z]{3,20}\.com/

sitName.addEventListener("input" , function(){
   validation(sitName,regix1) 
})
siteUrl.addEventListener("input" , function(){
    validation(siteUrl,regix2)
})

function validation(inputName , regix){
    if(regix.test(inputName.value)){
        inputName.classList.add("is-valid")
        inputName.classList.remove("is-invalid")      
    }else{
        inputName.classList.add("is-invalid")
        inputName.classList.remove("is-valid")
    }
}

function clearInput(){
    sitName.value="";
    siteUrl.value="";
}

btnClose.addEventListener("click" , function(){
    lightboxContainer.classList.add("d-none");
})


