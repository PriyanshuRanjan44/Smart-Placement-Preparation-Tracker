const API_URL =
"http://localhost:5000/api/problems";

/* =========================
   GLOBAL STATE
========================= */

let problems = [];

let dataset = [];

let currentSearchQuery = "";

let currentDifficultyFilter =
"all";

let currentStatusFilter =
"all";

/* =========================
   LOAD DATASET
========================= */

async function loadDataset() {

    try {

        const response =
        await fetch(
            "./data/problems.json"
        );

        dataset =
        await response.json();

    }

    catch(error){

        console.error(
            "Dataset loading failed",
            error
        );

    }

}

/* =========================
   FETCH PROBLEMS
========================= */

async function fetchProblems(){

    try{

        const response =
        await fetch(API_URL);

        problems =
        await response.json();

        applyFilters();

        updateAnalytics();

        updateActiveFilters();

    }

    catch(error){

        console.error(
            error
        );

    }

}

/* =========================
   SEARCH
========================= */

const searchInput =
document.getElementById(
"searchInput"
);

const suggestionsBox =
document.getElementById(
"suggestions"
);

searchInput.addEventListener(
"input",
()=>{

currentSearchQuery =
searchInput.value
.toLowerCase()
.trim();

renderSuggestions();

applyFilters();

}
);

/* =========================
   SUGGESTIONS
========================= */

function renderSuggestions(){

suggestionsBox.innerHTML="";

if(
currentSearchQuery===""
){
return;
}

const matches=
dataset.filter(problem=>{

return(

problem.title
.toLowerCase()
.includes(
currentSearchQuery
)

||

problem.leetcodeId
.toString()
.includes(
currentSearchQuery
)

);

});

const limited=
matches.slice(0,6);

limited.forEach(problem=>{

const div=
document.createElement(
"div"
);

div.classList.add(
"suggestion-item"
);

div.innerHTML=`

<strong>

${problem.leetcodeId}.
${problem.title}

</strong>

`;

div.onclick=
()=>addProblem(problem);

suggestionsBox
.appendChild(div);

});

}

/* =========================
   ADD PROBLEM
========================= */

async function addProblem(problem){

try{

const exists=
problems.some(

p=>

p.leetcodeId===problem.leetcodeId

);

if(exists){

alert(
"Problem already exists"
);

return;

}

await fetch(

API_URL,

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

leetcodeId:
problem.leetcodeId,

title:
problem.title,

difficulty:
problem.difficulty,

topics:
problem.topics,

platform:
problem.platform,

solved:false

})

}

);

searchInput.value="";

suggestionsBox.innerHTML="";

fetchProblems();

}

catch(error){

console.error(error);

}

}

/* =========================
   DISPLAY TABLE
========================= */

function displayProblems(data){

const list=
document.getElementById(
"problemList"
);

list.innerHTML="";

if(data.length===0){

list.innerHTML=`

<tr class="empty-row">

<td colspan="6">

No problems found

</td>

</tr>

`;

return;

}

data.forEach(p=>{

let badgeClass="";

if(
p.difficulty==="Easy"
){
badgeClass="easy";
}
else if(
p.difficulty==="Medium"
){
badgeClass="medium";
}
else{
badgeClass="hard";
}

const tags=
p.topics.map(

topic=>

`<span class="tag">${topic}</span>`

).join("");

const row=
document.createElement(
"tr"
);

row.innerHTML=`

<td>

${p.solved?"✅":"❌"}

</td>

<td>

${p.leetcodeId}

</td>

<td>

${p.title}

</td>

<td>

<span class="badge ${badgeClass}">

${p.difficulty}

</span>

</td>

<td>

<div class="tags">

${tags}

</div>

</td>

<td>

<div class="problem-actions">

<button
class="solve-btn"
onclick="toggleSolved('${p._id}')"
>

${p.solved?"Unsolve":"Solve"}

</button>

<button
class="delete-btn"
onclick="deleteProblem('${p._id}')"
>

Delete

</button>

</div>

</td>

`;

list.appendChild(
row
);

});

}

/* =========================
   FILTER ENGINE
========================= */

function applyFilters(){

let filtered=
[...problems];

if(
currentSearchQuery!==""
){

filtered=
filtered.filter(p=>{

return(

p.title
.toLowerCase()
.includes(
currentSearchQuery
)

||

p.difficulty
.toLowerCase()
.includes(
currentSearchQuery
)

||

p.topics
.join(" ")
.toLowerCase()
.includes(
currentSearchQuery
)

);

});

}

if(
currentDifficultyFilter!=="all"
){

filtered=
filtered.filter(

p=>

p.difficulty
.toLowerCase()

===

currentDifficultyFilter

);

}

if(
currentStatusFilter==="solved"
){

filtered=
filtered.filter(
p=>p.solved
);

}

if(
currentStatusFilter==="unsolved"
){

filtered=
filtered.filter(
p=>!p.solved
);

}

displayProblems(
filtered
);

}

/* =========================
   FILTER BUTTONS
========================= */

function setDifficultyFilter(value){

currentDifficultyFilter=value;

updateActiveFilters();

applyFilters();

}

function clearDifficultyFilter(){

currentDifficultyFilter="all";

updateActiveFilters();

applyFilters();

}

function setStatusFilter(value){

currentStatusFilter=value;

updateActiveFilters();

applyFilters();

}

function updateActiveFilters(){

document
.querySelectorAll(
".filter-btn"
)
.forEach(btn=>{

btn.classList.remove(
"active"
);

});

}

/* =========================
   SOLVE / DELETE
========================= */

async function toggleSolved(id){

await fetch(

`${API_URL}/${id}`,

{
method:"PUT"
}

);

fetchProblems();

}

async function deleteProblem(id){

await fetch(

`${API_URL}/${id}`,

{
method:"DELETE"
}

);

fetchProblems();

}

/* =========================
   ANALYTICS
========================= */

function updateAnalytics(){

const total=
problems.length;

const solved=
problems.filter(
p=>p.solved
).length;

document.getElementById(
"total"
).textContent=
total;

document.getElementById(
"solved"
).textContent=
solved;

/* Weak topic */

let topicMap={};

problems.forEach(problem=>{

problem.topics.forEach(topic=>{

if(
!topicMap[topic]
){

topicMap[topic]=0;

}

if(
problem.solved
){

topicMap[topic]++;

}

});

});

let weakest="N/A";

let min=Infinity;

for(let topic in topicMap){

if(
topicMap[topic]<min
){

min=
topicMap[topic];

weakest=
topic;

}

}

document.getElementById(
"weakest"
).textContent=
weakest;

document.getElementById(
"insight"
).textContent=

weakest==="N/A"

?

"Start solving problems"

:

`Focus on ${weakest}`;


/* Progress */

const percent=

total===0

?

0

:

(solved/total)*100;

updateProgressBar(
percent
);

}

/* =========================
   PROGRESS BAR
========================= */

function updateProgressBar(percent){

document.getElementById(
"progressBar"
).style.width=

percent+"%";

}

/* =========================
   DARK MODE
========================= */

function toggleDarkMode(){

document.body
.classList.toggle(
"dark"
);

localStorage.setItem(

"theme",

document.body
.classList.contains(
"dark"
)

?

"dark"

:

"light"

);

}

if(

localStorage.getItem(
"theme"
)==="dark"

){

document.body
.classList.add(
"dark"
);

}

/* =========================
   INITIAL LOAD
========================= */

loadDataset();

fetchProblems();