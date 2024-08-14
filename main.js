//DOM Variables
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let cityInput = document.getElementById("city")
let typeInput = document.getElementById("type");
let fieldOfInterestInput = document.getElementById("fieldOfInterest");
let submitButton = document.getElementById("submit");
let resultOutput = document.getElementById("results");
let foiTitle = document.getElementById("fieldOfInterestTitle");
let typeTitle = document.getElementById("typeTitle");

let nameWelcome;
let nameWelcomeDiv = document.getElementById("nameWelcome");
let noResults;

//add functionality to button
submitButton.addEventListener("click", selectAPI);

typeInput.style.display = "none";
fieldOfInterestInput.style.display = "none";
foiTitle.style.display = "none";
typeTitle.style.display = "none";

typeInput.addEventListener("change", foiNone);
ageInput.addEventListener("change", checkAge);


function foiNone(){
    if(typeInput.value=="Programs"){
        fieldOfInterestInput.style.display="none";
    }
}

//"https://www.themuse.com/api/public/jobs?category=Science%20and%20Engineering&level=Internship&location=New%20York%2C%20NY&page=1"


function checkAge(){
    if(ageInput.value >= 14){
        typeInput.style.display = "block";
        fieldOfInterestInput.style.display = "block";
        foiTitle.style.display = "block";
        typeTitle.style.display = "block";
        
    }else{
        typeInput.style.display = "none";
        fieldOfInterestInput.style.display = "none";
        foiTitle.style.display = "none";
        typeTitle.style.display = "none";
        typeInput.value="Programs";
    }
}

let category;
let level;
let jobLocationInput;
let jobLocation;
let programLocation;

let individualResultDiv;
let job_internshipNum;
let title;
let company;
let link;

let programNum;

let directionTitle;
let directionsDiv;
let eachDirection;

function search(){
    fetch('https://www.themuse.com/api/public/jobs?category='+category+'&level='+level+'&'+jobLocation+'&page=1')
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(myJson){
        //place all code for HTML here

        //logs all of the results
        console.log(myJson);
        console.log("\n");
        

        if((myJson.results).length==0){
            noResults = document.createElement("h2");
            noResults.innerText = "Sorry no results :("
            resultOutput.append(noResults);
        
        }
        //logs each result with certain properties
        for(let i=0; i<((myJson.results).length); i++){
            console.log("Internship #" + (i+1));
            console.log("Title: "+myJson.results[i].name);
            console.log("Company: "+ myJson.results[i].company.name);
            console.log("Link: "+ myJson.results[i].refs.landing_page);
            console.log("\n");



            individualResultDiv = document.createElement('div');
            individualResultDiv.className = 'individualResult';

            job_internshipNum = document.createElement('p');
            job_internshipNum.className = 'job_internshipNum';
            job_internshipNum.innerHTML = typeInput.value + "# " + (i+1)

            title = document.createElement('p');
            title.className = 'title'
            title.innerText = "Title: "+myJson.results[i].name

            company = document.createElement('p');
            company.className = 'company';
            company.innerText = "Company: "+ myJson.results[i].company.name;

            directionsDiv = document.createElement('div');
            directionsDiv.className = "directionsDiv";
            directionTitle = document.createElement('p');
            directionTitle.className="directionTitle";
            directionTitle.innerText = "Location(s): ";
            directionsDiv.appendChild(directionTitle);

            for(let j =0; j<myJson.results[i].locations.length; j++){
                eachDirection = document.createElement('span');
                eachDirection.className="eachDirection";
                if(j==myJson.results[i].locations.length-1){
                    eachDirection.innerText = myJson.results[i].locations[j].name;
                }else{
                    eachDirection.innerText = myJson.results[i].locations[j].name + "---" ;
                }
        
                directionsDiv.appendChild(eachDirection);
            }
            directionsDiv.style.margin = "15px";
            
            link = document.createElement('div'); 
            link.className = 'link';
            linkTitle = document.createElement('span');
            linkTitle.innerText = "Link: ";
            linkRef = document.createElement('a');
            linkRef.href= myJson.results[i].refs.landing_page;
            linkRef.target = "_blank";
            linkRef.innerHTML = myJson.results[i].refs.landing_page;
            link.append(linkTitle);
            link.append(linkRef);
            link.style.margin = "15px";

            individualResultDiv.appendChild(job_internshipNum);
            individualResultDiv.appendChild(title);
            individualResultDiv.appendChild(company);
            individualResultDiv.appendChild(link);
            individualResultDiv.style.border = "solid 5px black";
            individualResultDiv.style.margin = "20px";
            individualResultDiv.appendChild(directionsDiv);

            resultOutput.append(individualResultDiv);
        }
    })
}
//youth program API only accepts lower case inputs


function youthProgram(){
    let bearerToken = 'XC1PGrb46NyDd0x6J9J18Fvo0Ad6XDIpCtJJqxPmpSY2WoZCZ28kGKiRZuk3p3K13MOaIYkX97WAuvV2o4hAEQ==';
    let apiUrl = 'https://api.careeronestop.org/v1/youthprogramfinder/BwLhIDH3UBED1NU/'+programLocation+'/25/0/0/0/10?enableMetaData=true';
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`, 
            'Content-Type': 'application/json'
        }
    })
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(myJson){
        //place all code for HTML here




        //logs all of the results
        console.log(myJson);
        console.log("\n");
        
        //logs each result with certain properties
        if(myJson.YouthProgramList.length==0){
            resultOutput.innerText = "Sorry no results :("
        }
        for(let i=0; i<((myJson.YouthProgramList).length); i++){
            console.log("Youth Program #" + (i+1));
            console.log("Company: "+ myJson.YouthProgramList[i].Name);
            console.log("Link: "+ myJson.YouthProgramList[i].WebSiteUrl);
            console.log("Location: " + `${myJson.YouthProgramList[i].Address1}, ${myJson.YouthProgramList[i].City}, ${myJson.YouthProgramList[i].StateName}, ${myJson.YouthProgramList[i].Zip}`)
            console.log("\n");

            individualResultDiv = document.createElement('div');
            individualResultDiv.className = 'individualResult';
    
            programNum = document.createElement('p');
            programNum.className = 'programNum';
            programNum.innerHTML = "Program #" + (i+1)
    
    
            company = document.createElement('p');
            company.className = 'company';
            company.innerText = "Company: "+ myJson.YouthProgramList[i].Name
    
            link = document.createElement('div'); 
            link.className = 'link';
            linkTitle = document.createElement('span');
            linkTitle.innerText = "Link: ";
            linkRef = document.createElement('a');
            linkRef.href= myJson.YouthProgramList[i].WebSiteUrl;
            linkRef.target = "_blank";
            linkRef.innerHTML = myJson.YouthProgramList[i].WebSiteUrl;
            link.append(linkTitle);
            link.append(linkRef);
            link.style.margin = "15px";
    
            locationP=document.createElement('p');
            locationP.className = 'location';
            locationP.innerText = "Location: " + `${myJson.YouthProgramList[i].Address1}, ${myJson.YouthProgramList[i].City}, ${myJson.YouthProgramList[i].StateName}, ${myJson.YouthProgramList[i].Zip}`;
    
            individualResultDiv.appendChild(programNum);
            individualResultDiv.appendChild(locationP);
            individualResultDiv.appendChild(company);
            individualResultDiv.appendChild(link);
            individualResultDiv.style.border = "solid 5px black";
            individualResultDiv.style.margin = "20px";
    
            resultOutput.append(individualResultDiv);



        }


    })
}

//chooses which API to run based on job/internship or program
function selectAPI(event){
    event.preventDefault();

    resultOutput.innerHTML = "";
    nameWelcomeDiv.innerHTML = "";
    
    category = encodeURIComponent(fieldOfInterestInput.value);
    level = encodeURIComponent(typeInput.value);
    jobLocationInput = encodeURIComponent(cityInput.value);
    jobLocation = "location="+ jobLocationInput;
    programLocation = jobLocationInput.toLowerCase();

    nameWelcome = document.createElement("h1");
    nameWelcome.className = "nameWelcome"
    nameWelcome.innerText = "Welcome " + nameInput.value + ". Here are your results!"
    nameWelcomeDiv.append(nameWelcome);


    if(typeInput.value=="Job" || typeInput.value== "Internship"){
        search();
        if(typeInput.value==''||ageInput.value==''||cityInput.value==''||typeInput.value==''||(fieldOfInterestInput.value=='')){
            alert("Complete all fields");
        }
    }else if(typeInput.value=="Programs"){
        if(typeInput.value==''||ageInput.value==''||cityInput.value==''){
            alert("Complete all fields");    
        }
        youthProgram();
    }
    
}

