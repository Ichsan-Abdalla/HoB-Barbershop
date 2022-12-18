if(window.matchMedia('(display-mode: standalone)').matches != true && 'getInstalledRelatedApps' in navigator){
  iNstall.style.display = 'flex';
}else{
  cOntainer.classList.remove('a');
  if('getInstalledRelatedApps' in navigator){
  }else{
    alert('Disarankan menggunakan Google Chrome untuk dapat menginstal aplikasi');
  }
  window.addEventListener('popstate', ()=>{
    if(pOto.classList.contains('a') == true){
      pOto.src = '';
      pOto.classList.remove('a');
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
    alert('Aplikasi berhasil di Instal');
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
      uPdate.click();
    }
  }
};

let w;
let a;

function waktu(){
  let $jam = new Date().getHours();
  let $menit = new Date().getMinutes();
  if($jam < 10){
    $jam = '0'+$jam;
  }
  if($menit < 10){
    $menit = '0'+$menit;
  }

  return [$jam,$menit];

}

function update(){
  if(typeof(Worker) != 'undefined') {
    if(typeof(w) == 'undefined') {
      if(navigator.onLine != true){
        alert('Hubungkan ke Internet!');
        uPdate.classList.remove('a');
        uPdate.textContent = 'Perbarui';
        return;
      }
      
      w = new Worker("w.js?v="+Math.random());
      a = setTimeout(()=>{
            w = undefined;
            alert('Gagal melakukan pembaruan...\nPeriksa koneksi Internet anda!');
          uPdate.classList.remove('a');
          uPdate.textContent = 'Perbarui';
        },20000);
    }else{
      return;
    }
        
    w.onmessage = e=>{if(typeof(e.data) != 'undefined'){
      
      clearTimeout(a);a = undefined;
      w = undefined;
      uPdate.classList.remove('a');
      uPdate.textContent = 'Perbarui';
      if(e.data.tutup[0] == 1){
        libur(1,1,e.data.tutup[1]);
      }else{
        if(tutup.classList.contains('a') == true){
          tutup.classList.remove('a');
        }
        libur(e.data.kapster[0],e.data.kapster[1]);
        situasi0.textContent = 'Jumlah orang yg potong rambut: '+e.data.situasi[0];
        situasi1.textContent = 'Jumlah orang yg menunggu giliran: '+e.data.situasi[1];
      }
      
      let $waktu = waktu();
      
      jam.textContent = '*Data ini diperbarui pada pukul '+$waktu[0]+':'+$waktu[1]+' WIB';
    }};
  
  }else{
    hAsil.textContent = "Sorry! No Web Worker support.";
  }
}

uPdate.onclick = ()=>{
  let $waktu = waktu();
  if(uPdate.textContent != 'Perbarui'){
    return;
  }else if(jam.textContent == '*Data ini diperbarui pada pukul '+$waktu[0]+':'+$waktu[1]+' WIB'){
    alert('Pembaruan baru saja dilakukan.\nTunggu selama 1 menit.');
    return;
  }
  if(kOtak.classList.contains('x') == true){
    kOtak.classList.replace('x','y');
  }
  uPdate.textContent = 'Memperbarui';
  uPdate.classList.add('a');
  update();
};

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
    if(tutup.classList.contains('a') == false){
      tutup.classList.add('a');
    }
    if(!c || c == ''){
      document.querySelector('#tutup p').innerHTML = '<h2>TUTUP<h2/>';
    }else{
      document.querySelector('#tutup p').textContent = c;
    }
  
  }
}

function poto(e){
  if(!e.target.src){
    return;
  }
  document.querySelector('.poto img').src = e.target.src;
  pOto.classList.add('a');
  window.history.pushState(0,null,'');
}

document.querySelector('.div2').onclick = e=>{
  poto(e);
};

document.querySelector('.kapster').onclick = e=>{
  poto(e);
};

pOto.onclick = ()=>{
  history.back();
}

function today(){
  let $hari = new Date().getDay();
  const arrHari = ['Senin','Selasa','Rabu','Kamis',"Jum'at",'Sabtu','Minggu'];
      arrBulan = ['Januari', 'Februari', 'Maret', 'April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  if($hari == 0){
    $hari = "Minggu";
  }else{
    $hari = arrHari[new Date().getDay()-1];
  }
  return $hari+', '+new Date().getDate()+' '+arrBulan[new Date().getMonth()]+' '+new Date().getFullYear();
}

window.addEventListener('offline', ()=>{
  w = undefined;
});

window.addEventListener('online', ()=>{
  uPdate.click();
});


 

  
  
  
  
  
