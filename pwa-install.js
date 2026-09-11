(()=>{
  let deferredPrompt=null;
  const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
  const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari=()=>/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isMac=()=>/mac/i.test(navigator.platform||navigator.userAgent);

  const ensureModal=()=>{
    let modal=document.getElementById('installHelpModal');
    if(modal)return modal;
    modal=document.createElement('div');
    modal.id='installHelpModal';
    modal.className='installHelpModal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML=`<div class="installHelpSheet" role="dialog" aria-modal="true" aria-labelledby="installHelpTitle">
      <button class="installHelpClose" type="button" aria-label="Cerrar">×</button>
      <div class="installHelpIcon">📲</div>
      <h3 id="installHelpTitle">Instalar Luaj Tahará</h3>
      <div id="installHelpBody" class="installHelpBody"></div>
      <button class="btn installHelpOk" type="button">Entendido</button>
    </div>`;
    document.body.appendChild(modal);
    const close=()=>{modal.classList.remove('show');modal.setAttribute('aria-hidden','true')};
    modal.querySelector('.installHelpClose').onclick=close;
    modal.querySelector('.installHelpOk').onclick=close;
    modal.addEventListener('click',e=>{if(e.target===modal)close()});
    return modal;
  };

  const showHelp=()=>{
    const modal=ensureModal();
    const body=modal.querySelector('#installHelpBody');
    if(isIOS()){
      body.innerHTML='<p>En iPhone o iPad:</p><ol><li>Abre esta página en <b>Safari</b>.</li><li>Toca el botón <b>Compartir</b>.</li><li>Elige <b>Agregar a pantalla de inicio</b>.</li><li>Confirma <b>Agregar</b>.</li></ol><p>Luaj Tahará quedará con su propio icono y se abrirá como app.</p>';
    }else if(isSafari()&&isMac()){
      body.innerHTML='<p>En Safari para Mac:</p><ol><li>Abre el menú <b>Archivo</b>.</li><li>Elige <b>Agregar al Dock</b>.</li><li>Confirma el nombre <b>Luaj Tahará</b>.</li></ol><p>También puedes instalarla desde Chrome o Edge cuando aparezca el botón de instalación.</p>';
    }else{
      body.innerHTML='<p>Tu navegador no mostró el instalador automático en este momento.</p><p>En Chrome o Edge busca el icono de instalación en la barra de direcciones o vuelve a abrir esta página después de unos segundos.</p>';
    }
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  };

  const ensureButton=()=>{
    if(isStandalone())return null;
    let button=document.getElementById('pwaInstallBtn');
    if(button)return button;
    button=document.createElement('button');
    button.id='pwaInstallBtn';
    button.className='pwaInstallBtn';
    button.type='button';
    button.innerHTML='<span aria-hidden="true">⬇️</span><span>Instalar Luaj Tahará</span>';
    const header=document.querySelector('header');
    if(header)header.appendChild(button);else document.body.prepend(button);
    button.addEventListener('click',async()=>{
      if(deferredPrompt){
        const prompt=deferredPrompt;
        deferredPrompt=null;
        button.disabled=true;
        try{await prompt.prompt();await prompt.userChoice}catch(e){console.error('No se pudo abrir el instalador',e)}
        button.disabled=false;
        if(isStandalone())button.remove();
      }else showHelp();
    });
    return button;
  };

  window.addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();
    deferredPrompt=event;
    const button=ensureButton();
    if(button)button.classList.add('ready');
  });

  window.addEventListener('appinstalled',()=>{
    deferredPrompt=null;
    document.getElementById('pwaInstallBtn')?.remove();
  });

  const start=()=>{
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(error=>console.error('Service Worker:',error));
    }
    if(!isStandalone()&&(isIOS()||isSafari()||deferredPrompt))ensureButton();
    setTimeout(()=>{if(!isStandalone())ensureButton()},1200);
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
