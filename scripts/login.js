const loginBtn = document.getElementById('login-btn');
const loginPin = document.getElementById('login-pin');
const userName = document.getElementById('user-name');
loginBtn.addEventListener('click', ()=>{
   if(userName.value != 'admin'){
    alert(`Invalid User Name`);
    return;
   }
   if(loginPin.value === 'admin123'){
    window.location.assign('./home.html');
   }else{
    alert(`Invalid password`);
    return;
   }
})