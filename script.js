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
    if(e[0].platform == 'webapp'){
      iNstallbtn.classList.remove('a');
      iNstallbtn.textContent = 'Buka Aplikasi';
    }
  });
}

window.addEventListener('offline', ()=>{
  alert('Offline');
  sTop.click();
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
        iNstallbtn.classList.remove('a');
        iNstallbtn.textContent = 'Buka Aplikasi';
        alert('Aplikasi berhasil di instal ');
        return b();
      }
    });
  },300);
  
  function b(){
    clearInterval(a);
    a = undefined;
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
      mulai();
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
      if(kOtak.classList.contains('x') == false){
        navigator.serviceWorker.ready.then(reg=>{
          setTimeout(()=>{
          reg.showNotification('HoB Barbershop', {body: 'x', tag: 'a',icon: 'logo.png', renotify: true});
          }, silent.duration*1000+300);
        });
      }
    };
  }else{
    hAsil.textContent = "Sorry! No Web Worker support.";
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
  if(mUlai.classList.contains('a') == true){
    return;
  }
  
  if(kOtak.classList.contains('x') == true){
    kOtak.classList.replace('x','y');
    stop(null);
    return mUlai.click();
  }
  
  Notification.requestPermission().then(e=>{
    if(e != 'granted'){
      alert('Dapatkan pemberitahuan saat ada pembaruan Status.\nIzinkan akses notifikasi!');
      sTop.click();
      return;
    }
  });
  
  window.history.pushState(0,null,'');
  mUlai.classList.add('a');
  mulai();
  
};

sTop.onclick = ()=>{
  if(mUlai.classList.contains('a') != true){
    return;
  }
  stop(null,'x');
  mUlai.classList.remove('a');
  history.go(-1);
};




  
 

  
  
  
  
  
