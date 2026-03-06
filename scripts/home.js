let allIssues = [];
const allBtn = document.getElementById('all-btn');
const allIssue = document.getElementById('allIssue');
const allIssueContainer = document.getElementById('allIssueContainer');
 async function loadAllIssues() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    displayAllIssues(data.data);
    data.data.forEach(item=>{
        allIssues.push(item);
    })
     allIssue.innerText=allIssues.length;
 }
 async function displayAllIssues(data) {
    data.forEach(item=>{
        const div = document.createElement('div');
        div.className='card  bg-base-100 card-sm shadow-lg';
        div.innerHTML=`
         <div class="card-body space-y-3">
                    <div class="flex justify-between items-center">
                        <div><i class="fa-solid fa-circle-dot text-accent text-xl"></i></div>
                        <span id="status" class="py-2 px-4 bg-red-100 text-red-500 font-semibold rounded-xl text-center">${item.priority}</span>
                    </div>
                    <h2 class="font-semibold">${item.title}</h2>
                    <p class="line-clamp-2 text-[#64748B]">${item.description}</p>
                    <div class="flex gap-3 items-center">
                         <span id="status" class=" bg-red-100 text-red-500 font-semibold rounded-2xl text-center"><i class="fa-solid fa-bug"></i> Bug</span>
                         <span id="status" class=" bg-yellow-100 text-yellow-500 font-semibold rounded-2xl text-center"><i class="fa-solid fa-stroopwafel"></i> Help wanted</span>
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
 let totalOpenIssue=0;
 let totalCloseIssue=0;

 loadAllIssues();
 