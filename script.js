if(window.matchMedia('(display-mode: standalone)').matches != true && navigator.userAgent.indexOf("Android") != -1 && navigator.userAgent.match(/chrome|chromium|crios/i) != -1){
  iNstall.style.display = 'flex';
}else{
  cOntainer.classList.remove('a');
  if(navigator.userAgent.match(/chrome|chromium|crios/i) != -1){
  }else{
    alert('Disarankan menggunakan Google Chrome');
  }
  window.addEventListener('popstate', ()=>{
    if(pOto.classList.contains('a') == true){
      document.querySelector('.poto').classList.remove('a');
    }else if(mUlai.textContent == 'Matikan Notifikasi'){
      alert('Saat notifikasi aktif, disarankan untuk tidak menutup aplikasi ini !');
      window.history.pushState(0,null,'');
    }
  });
}

if ('getInstalledRelatedApps' in navigator) {
  navigator.getInstalledRelatedApps().then(e=>{
    if(e[0].platform == 'webapp'){
      iNstallbtn.classList.remove('a');
      iNstallbtn.textContent = 'Buka Aplikasi';
    }
  });
}

window.addEventListener('offline', ()=>{
  alert('Offline');
  stopNotif();
});

window.addEventListener('online', ()=>{
  location.href = '.';
});

window.addEventListener("beforeinstallprompt", e=>{
  iNstallbtn.classList.remove('a');
  iNstallbtn.textContent = 'Instal Sekarang';
  iNstallbtn.onclick = x=>{
    if(iNstallbtn.textContent != 'Instal Sekarang'){
      return;
    }
    e.prompt();
    iNstallbtn.textContent = '...';
  };
});

function installed(){
  let a = setInterval(_=>{
    navigator.getInstalledRelatedApps().then(e=>{
      if(e[0].platform == 'webapp'){
        return b();
      }
    });
  },300);
  
  function b(){
    clearInterval(a);
    a = undefined;
    iNstallbtn.classList.remove('a');
    iNstallbtn.textContent = 'Buka Aplikasi';
    alert('Aplikasi berhasil di instal ');
  }
}

window.addEventListener('appinstalled', () => {
  iNstallbtn.textContent = 'Menginstal';
  iNstallbtn.classList.add('a');
  installed();
});

iNstallbtn.addEventListener('click', e=>{
  if(e.target.textContent == 'Buka Aplikasi'){
    window.open('.');
  }
});

fOoter.onclick = e=>{
  
  if(e.target.textContent == 'Beranda' && kOtak.classList.contains('a') == false){
    if(kOtak.classList.contains('b') == true){
      kOtak.classList.replace('b','a');
    }else{
      kOtak.classList.replace('c','a');
    }
  }else if(e.target.textContent == 'Info' && kOtak.classList.contains('b') == false){
    if(kOtak.classList.contains('a') == true){
      kOtak.classList.replace('a','b');
    }else{
      kOtak.classList.replace('c','b');
    }
  }else if(e.target.textContent == 'Status' && kOtak.classList.contains('c') == false){
    if(kOtak.classList.contains('a') == true){
      kOtak.classList.replace('a','c');
    }else{
      kOtak.classList.replace('b','c');
    }
    
    if(kOtak.classList.contains('x') == false && kOtak.classList.contains('y') == false){
      kOtak.classList.add('x');
      tAnggal.textContent = today();
      mulai();
    }
  }
};


let w;
let a;
let b;

function mulai() {
  silent.volume = .01;
  silent.play();
  
  a = setTimeout(()=>{stop(undefined);mulai();}, 60000*4);
  
  if(typeof(Worker) != 'undefined') {
    if(typeof(w) == 'undefined') {
      w = new Worker("w.js");
    }else{
      return;
    }
    
    
    b = setTimeout(()=>{
          alert('Koneksi terputus\nMemuat ulang...');
          location.href = '.';
        },15000);
        
    w.onmessage = e=>{
      clearTimeout(b);b = undefined;
      silent.volume = 0;
      if(e.data.tutup[0] == 1){
        libur(1,1,e.data.tutup[1]);
      }else{
        libur(e.data.kapster[0],e.data.kapster[1]);
        situasi0.textContent = 'Jumlah orang yg potong rambut: '+e.data.situasi[0];
        situasi1.textContent = 'Jumlah orang yg menunggu giliran: '+e.data.situasi[1];
      }
      
      if(kOtak.classList.contains('x') == false){
        if(situasi0.textContent != xsituasi0.textContent || situasi1.textContent != xsituasi1.textContent || mUlai.classList.contains('a') == true){
          xsituasi0.textContent = situasi0.textContent;
          xsituasi1.textContent = situasi1.textContent;
          if(mUlai.classList.contains('a') == true){
            mUlai.classList.remove('a');
          }
        
           if(mUlai.textContent == 'Notif On'){
            navigator.serviceWorker.ready.then(reg=>{
             // setTimeout(()=>{
              reg.showNotification(situasi0.textContent, {body: situasi1.textContent, tag: 'a',icon: 'icon.png', renotify: true});
             // }, silent.duration*1000+300);
            });
          }
        }
      
      }
    };
  }else{
    hAsil.textContent = "Sorry! No Web Worker support.";
  }
  
}

function libur(a,b,c){
  if(a == 0 && b == 0){
    if(document.querySelectorAll('.libur')[0].classList.contains('a') == true){
    document.querySelectorAll('.libur')[0].classList.remove('a');
    document.querySelectorAll('.libur')[1].classList.remove('a');
    }
    return;
  }
  const x = document.querySelectorAll('.libur');
  if(b != 1 && a == 1 && x[0].classList.contains('a') == false){
      x[0].classList.add('a');
  }else if(a != 1 && b == 1 && x[1].classList.contains('a') == false){
    x[1].classList.add('a');
  }else if(x[0].classList.contains('a') == false && x[1].classList.contains('a') == false){ 
    x[0].classList.add('a');
    x[1].classList.add('a');
    if(!c || c == ''){
      document.querySelector('.situasi').innerHTML = 'TUTUP';
    }else{
      document.querySelector('.situasi').innerHTML = c;
    }
  }
}

function stop(e,x) { 
  if(e == null){
    clearTimeout(a);
    clearTimeout(b);
    a = e;
    b = e;
  }
  w.terminate();
  w = undefined;
  if(x == 'x'){
    kOtak.classList.replace('y','x');
    mulai();
  }
}

mUlai.onclick = ()=>{
  if(mUlai.textContent == 'Notif On'){
    stopNotif();
    return;
  }
  
  if(kOtak.classList.contains('x') == true){
    silent.volume = 0;
    stop(null);
    kOtak.classList.replace('x','y');
    return mUlai.click();
  }
  
  Notification.requestPermission().then(e=>{
    if(e != 'granted'){
      alert('Dapatkan pemberitahuan saat ada pembaruan Status.\nIzinkan akses notifikasi!');
      stopNotif();
      return;
    }
    window.history.pushState(0,null,'');
    mUlai.textContent = 'Notif On';
    mUlai.style.color = 'cyan';
    if(mUlai.classList.contains('a') == false){
      mUlai.classList.add('a');
    }
    mulai();
  });
  
};

function stopNotif(){
  if(mUlai.textContent != 'Notif On'){
    return;
  }
  stop(null,'x');
  mUlai.textContent = 'Notif Off';
  mUlai.style.color = 'white';
  history.go(-1);
}

document.querySelector('.div2').onclick = e=>{
  if(!e.target.src){
    return;
  }
  document.querySelector('.poto img').src = e.target.src;
  pOto.classList.add('a');
  window.history.pushState(0,null,'');
};

pOto.onclick = ()=>{
  history.back();
}

function today(){
  const arrHari = ['Senin','Selasa','Rabu','Kamis',"jum'at",'Sabtu','Minggu'];
      arrBulan = ['Januari', 'Februari', 'Maret', 'April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
      
  return arrHari[new Date().getDay()-1]+', '+new Date().getDate()+' '+arrBulan[new Date().getMonth()]+' '+new Date().getFullYear();
  return arrHari[new Date().getDay()-1]+', '+new Date().getDate()+' '+arrBulan[new Date().getMonth()]+' '+new Date().getFullYear();
}
  
 

  
  
  
  
  
