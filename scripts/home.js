let allIssues = [];
let openIssues = [];
let closedIssues = [];
let searchIssues = [];
const allBtn = document.getElementById('all-btn');
const allIssue = document.getElementById('allIssue');
const allIssueContainer = document.getElementById('allIssueContainer');
const openClosedIcon = document.getElementById('openClosedIcon');
const openIssue = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');
const openClosAllBtn = document.querySelectorAll('.open-close-all');
const searchBar = document.getElementById('search');

function displayLabels(labels){
    return labels.map(el=>{
        let bg ='';
        let icon = '';
        if(el==='bug'){
         bg = 'bg-yellow-200';
         icon='fa-bug'
        }else if(el === 'help wanted'){
           bg = 'bg-red-100';
            icon='fa-dharmachakra'
        }else if(el ==='enhancement'){
             bg = 'bg-green-100';
            icon='fa-bahai'
        }else if(el==='good first issue'){
             bg = 'bg-purple-100';
            icon='fa-brands fa-gg'
        }else{
             bg = 'bg-blue-100';
            icon='fa-brands fa-readme'
        }
        return `<span class="text-md text-rose-600 p-1 ${bg} rounded-lg "><i class="fa-solid ${icon}"></i> ${el}</span>`
    }
    ).join('');
    
}

 async function loadAllIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    displayAllIssues(data.data);
    data.data.forEach(item=>{
        allIssues.push(item);
    })
     allIssue.innerText=allIssues.length;
 }
 function displayAllIssues(data) {
      allIssueContainer.innerHTML='';
    data.forEach(item=>{
        loadSingleIssue(item.id);
        const div = document.createElement('div');
        div.className='card  bg-base-100 card-sm shadow-lg';
        div.innerHTML=`
         <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <div id="openClosedIcon"><img src="./assets/Open-Status.png" alt=""></div>
                        <span id="status" class="py-2 px-4 bg-red-100 text-red-500 font-semibold rounded-xl text-center">${item.priority}</span>
                    </div>
                    <h2 class="font-semibold">${item.title}</h2>
                    <p class="line-clamp-2 text-[#64748B]">${item.description}</p>
                    <div  class="flex gap-2 flex-wrap labels">
                     ${displayLabels(item.labels)}
                    </div>
                    <hr class="text-[#64748B80]">
                    <div class="space-y-1">
                        <p class="text-[#64748B]">#${item.id} by ${item.author}</p>
                        <p class="text-[#64748B]">${item.createdAt}</p>
                    </div>
                </div>
        ` 
        allIssueContainer.appendChild(div);
        
    })
 }

async function loadSingleIssue(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
   if(data.data.status === 'open'){
     openIssues.push(data.data);
   }else if(data.data.status === 'closed'){
     closedIssues.push(data.data);
   }else{
     allIssues.push(data.data);
   }
}

function displayOpenIssue(){
   
   allIssueContainer.innerHTML='';
    allIssue.innerText=openIssues.length;
   openIssues.forEach(item=>{
        const div = document.createElement('div');
        div.className='card  bg-base-100 card-sm shadow-lg';
        div.innerHTML=`
         <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <div id="openClosedIcon"><img src="./assets/Open-Status.png" alt=""></div>
                        <span id="status" class="py-2 px-4 bg-red-100 text-red-500 font-semibold rounded-xl text-center">${item.priority}</span>
                    </div>
                    <h2 class="font-semibold">${item.title}</h2>
                    <p class="line-clamp-2 text-[#64748B]">${item.description}</p>
                    <div  class="flex gap-2 flex-wrap labels">
                     ${displayLabels(item.labels)}
                    </div>
                    <hr class="text-[#64748B80]">
                    <div class="space-y-1">
                        <p class="text-[#64748B]">#${item.id} by ${item.author}</p>
                        <p class="text-[#64748B]">${item.createdAt}</p>
                    </div>
                </div>
        ` 
        allIssueContainer.appendChild(div);
        activeBtn(openIssue);
    })

}

function displayClosedIssue(){
    
   allIssueContainer.innerHTML='';
    allIssue.innerText=closedIssues.length;
   closedIssues.forEach(item=>{
        const div = document.createElement('div');
        div.className='card  bg-base-100 card-sm shadow-lg';
        div.innerHTML=`
         <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <div id="openClosedIcon"><img src="./assets/Open-Status.png" alt=""></div>
                        <span id="status" class="py-2 px-4 bg-red-100 text-red-500 font-semibold rounded-xl text-center">${item.priority}</span>
                    </div>
                    <h2 class="font-semibold">${item.title}</h2>
                    <p class="line-clamp-2 text-[#64748B]">${item.description}</p>
                    <div  class="flex gap-2 flex-wrap labels">
                     ${displayLabels(item.labels)}
                    </div>
                    <hr class="text-[#64748B80]">
                    <div class="space-y-1">
                        <p class="text-[#64748B]">#${item.id} by ${item.author}</p>
                        <p class="text-[#64748B]">${item.createdAt}</p>
                    </div>
                </div>
        ` 
        allIssueContainer.appendChild(div);
        activeBtn(closedBtn);
    })

}
 allBtn.addEventListener('click',()=>{
     
  allIssueContainer.innerHTML='';
    allIssue.innerText=allIssues.length;
     allIssues.forEach(item=>{
        const div = document.createElement('div');
        div.className='card  bg-base-100 card-sm shadow-lg';
        div.innerHTML=`
         <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <div id="openClosedIcon"><img src="./assets/Open-Status.png" alt=""></div>
                        <span id="status" class="py-2 px-4 bg-red-100 text-red-500 font-semibold rounded-xl text-center">${item.priority}</span>
                    </div>
                    <h2 class="font-semibold">${item.title}</h2>
                    <p class="line-clamp-2 text-[#64748B]">${item.description}</p>
                    <div  class="flex gap-2 flex-wrap labels">
                     ${displayLabels(item.labels)}
                    </div>
                    <hr class="text-[#64748B80]">
                    <div class="space-y-1">
                        <p class="text-[#64748B]">#${item.id} by ${item.author}</p>
                        <p class="text-[#64748B]">${item.createdAt}</p>
                    </div>
                </div>
        ` 
        allIssueContainer.appendChild(div);
        activeBtn(allBtn);
    })
 })

 function activeBtn(id){
     openClosAllBtn.forEach(item=>{
       item.classList.remove('btn-primary','text-white');
     item.classList.add('btn-outline');
     })
    id.classList.remove('btn-outline');
    id.classList.add('btn-primary','text-white');
 }
 async function loadSearchValue() {
    const searchText = searchBar.value;
    searchBar.innerText='';
    const res=await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const data = await res.json();
    data.data.forEach(item=>{
       searchIssues.push(item);
    })
    allIssue.innerText=searchIssues.length;
   displayAllIssues(data.data);
 }
 loadAllIssues();
 