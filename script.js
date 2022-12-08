if(window.matchMedia('(display-mode: standalone)').matches != true){
  iNstall.style.display = 'flex';
  window.scroll(0,100);
}else{
  iNstall.style.display = 'none';
  document.body.classList.remove('a');
  window.addEventListener('popstate', ()=>{
    if(mUlai.classList.contains('a') == true){
      alert('Saat notifikasi aktif, disarankan untuk tidak menutup aplikasi ini !');
      window.history.pushState(0,null,'');
    }
  });
}

if ('getInstalledRelatedApps' in navigator) {
  navigator.getInstalledRelatedApps().then(e=>{
    if(e[0] != 'undefined'){
      iNstallbtn.textContent = 'Buka Aplikasi';
    }
  });
}

window.addEventListener('offline', ()=>{
  alert('Offline');
  sTop.click();
});

window.addEventListener("beforeinstallprompt", e=>{
  iNstallbtn.textContent = 'Instal Sekarang';
  iNstallbtn.onclick = _=>{
    e.prompt();
    iNstallbtn.textContent = '...';
  };
});

window.addEventListener('appinstalled', () => {
  iNstallbtn.textContent = 'Menginstal...';
  setTimeout(_=>{
    iNstallbtn.textContent = 'Buka Aplikasi';
  },10000);
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
  }
};


let w;
let a;
let b;

function mulai() {
  silent.play();
  
  a = setTimeout(()=>{stop(undefined);mulai();}, 60000*4.5);
  
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
      clearTimeout(b);
      hAsil.textContent = 'hasil : '+e.data;
      navigator.serviceWorker.ready.then(reg=>{
        setTimeout(()=>{
        reg.showNotification('HoB Barbershop', {body: 'x', tag: 'a',icon: 'logo.png', renotify: true});
        }, silent.duration*1000+300);
      });
    };
  }else{
    hAsil.textContent = "Sorry! No Web Worker support.";
  }
  
}

function stop(e) { 
  if(e == null){
    clearTimeout(a);
    clearTimeout(b);
    a = e;
    b = e;
  }
  w.terminate();
  w = undefined;
  
}

mUlai.onclick = ()=>{
  if(mUlai.classList.contains('a') == true){
    return;
  }
  Notification.requestPermission().then(e=>{
    if(e == 'granted'){
      if(navigator.onLine != true){
        alert('Hubungkan ke Internet !');
        return;
      }
      window.history.pushState(0,null,'');
      mUlai.classList.add('a');
      mulai();
    }else{
      alert('Dapatkan pemberitahuan saat ada pembaruan Status.\nIzinkan akses notifikasi!');
      sTop.click();
    }
  });
};

sTop.onclick = ()=>{
  if(mUlai.classList.contains('a') != true){
    return;
  }
  stop(null);
  mUlai.classList.remove('a');
  history.go(-1);
};




  
 

  
  
  
  
  
