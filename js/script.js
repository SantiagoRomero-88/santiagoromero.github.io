/* Sitio sin dependencias. projects.js es la copia de projects.json compatible con file://. */
(() => {
  'use strict';
  let language = 'es';
  let category = 'all';
  let activeProject = null;
  let returnFocus = null;
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const categories = {
    all: {es:'Todos',en:'All'},
    luminotecnia:{es:'Simulación luminotécnica',en:'Lighting simulation'},
    electrico:{es:'Diseño eléctrico',en:'Electrical design'},
    inventor:{es:'Diseño 3D Inventor',en:'Inventor 3D design'},
    automatizacion:{es:'Automatización y control',en:'Automation & control'}
  };
  const $ = (selector) => document.querySelector(selector);
  const t = value => typeof value === 'object' && value !== null ? (value[language] || value.es || '') : (value || '');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const localAsset = value => typeof value === 'string' && /^assets\/[a-zA-Z0-9_./-]+$/.test(value) && !value.includes('..') ? value : '';

  function translate(root = document) {
    root.querySelectorAll('[data-es][data-en]').forEach(el => { el.textContent = el.dataset[language].replace(/\\n/g,'\n'); });
  }

  function renderPortfolio() {
    const focusedFilter = document.activeElement?.dataset.category;
    $('#filters').innerHTML = Object.entries(categories).map(([id,label]) => `<button type="button" class="filter" data-category="${id}" aria-pressed="${category===id}">${escape(t(label))}</button>`).join('');
    if(focusedFilter) $(`[data-category="${focusedFilter}"]`)?.focus();
    $('#filters').setAttribute('aria-label',language==='es'?'Categorías de proyectos':'Project categories');
    const selected = projects.filter(p => category === 'all' || p.category === category);
    $('#project-count').textContent = language==='es' ? `${selected.length} proyectos · Documentación y vistas originales` : `${selected.length} projects · Original documentation and views`;
    $('#project-grid').innerHTML = selected.length ? selected.map(p => `<article class="project-card">
      <button class="project-image-button" type="button" data-project="${escape(p.id)}" data-fit="${p.coverFit==='cover'?'cover':'contain'}" aria-label="${escape((language==='es'?'Ver proyecto: ':'View project: ')+t(p.title))}"><img src="${escape(localAsset(p.cover))}" alt="${escape(t(p.title))}" width="640" height="405" loading="lazy" decoding="async"></button>
      <div class="project-info"><p class="project-category">${escape(t(categories[p.category]))}</p><h3>${escape(t(p.title))}</h3><p>${escape(t(p.description))}</p><button type="button" class="project-open" data-project="${escape(p.id)}"><span>${language==='es'?'Explorar proyecto':'Explore project'}</span><span aria-hidden="true">↗</span></button></div></article>`).join('') : `<p class="empty-state">${language==='es'?'No hay proyectos disponibles.':'No projects available.'}</p>`;
  }

  function renderProject(p) {
    $('#dialog-category').textContent=t(categories[p.category]);
    $('#dialog-title').textContent=t(p.title);
    $('#dialog-description').textContent=t(p.description);
    $('#dialog-specs').innerHTML=p.specs?.length ? `<dl class="specs">${p.specs.map(s=>`<div><dt>${escape(t(s.label))}</dt><dd>${escape(t(s.value))}</dd></div>`).join('')}</dl>` : '';
    $('#dialog-gallery').innerHTML=p.gallery?.length ? `<div class="gallery ${p.gallery.length===1?'single':''}">${p.gallery.map(g=>`<figure><a href="${escape(localAsset(g.src))}" target="_blank" rel="noopener" aria-label="${escape((language==='es'?'Ampliar: ':'Enlarge: ')+t(g.caption))}"><img src="${escape(localAsset(g.src))}" alt="${escape(t(g.caption))}" loading="lazy" decoding="async"></a><figcaption>${escape(t(g.caption))} · ${language==='es'?'Abrir y ampliar ↗':'Open and enlarge ↗'}</figcaption></figure>`).join('')}</div>` : '';
    $('#dialog-documents').innerHTML=p.documents?.length ? `<div class="documents">${p.documents.map((d,i)=>`<button class="button primary" type="button" data-pdf="${i}">${language==='es'?'Ver PDF':'View PDF'}${p.documents.length>1?' · '+escape(t(d.label)):''}</button><a class="button secondary" href="${escape(localAsset(d.src))}" target="_blank" rel="noopener">${language==='es'?'Abrir en otra pestaña':'Open in new tab'} ↗</a>`).join('')}</div>` : '';
    $('#dialog-notes').textContent=t(p.notes);
    $('#dialog-notes').hidden=!t(p.notes);
    $('#pdf-viewer').hidden=true;
    $('#pdf-frame').removeAttribute('src');
    translate($('#project-dialog'));
  }
  function openProject(id, trigger) {
    const p=projects.find(item=>item.id===id);if(!p)return;
    activeProject=p;returnFocus=trigger;renderProject(p);
    $('#project-dialog').showModal();document.body.classList.add('modal-open');
    $('#project-dialog').scrollTop=0;$('#close-dialog').focus();
  }
  function closeProject(){ $('#project-dialog').close(); }
  $('#project-dialog').addEventListener('close',()=>{document.body.classList.remove('modal-open');$('#pdf-frame').removeAttribute('src');activeProject=null;returnFocus?.focus();});
  $('#close-dialog').addEventListener('click',closeProject);
  $('#project-dialog').addEventListener('click',e=>{if(e.target===$('#project-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeProject();}});
  $('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){category=b.dataset.category;renderPortfolio();}});
  $('#project-grid').addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(b)openProject(b.dataset.project,b);});
  $('#dialog-documents').addEventListener('click',e=>{const b=e.target.closest('[data-pdf]');if(!b||!activeProject)return;const d=activeProject.documents[Number(b.dataset.pdf)];if(!d)return;$('#pdf-frame').src=localAsset(d.src)+'#toolbar=1&navpanes=1&view=FitH';$('#pdf-frame').title=t(d.label);$('#pdf-direct-link').href=localAsset(d.src);$('#pdf-viewer').hidden=false;$('#pdf-viewer').scrollIntoView({block:'start',behavior:'auto'});});

  function setLanguage(value) {
    language=value==='en'?'en':'es';document.documentElement.lang=language;
    document.title=language==='es'?'Santiago Romero | Ingeniero electromecánico':'Santiago Romero | Electromechanical Engineer';
    $('meta[name="description"]').content=language==='es'?'Santiago Romero, ingeniero electromecánico en Sucre, Bolivia. Experiencia y proyectos de diseño eléctrico, automatización industrial y diseño mecánico 3D.':'Santiago Romero, electromechanical engineer in Sucre, Bolivia. Experience and projects in electrical design, industrial automation and mechanical 3D design.';
    document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));
    $('.brand').setAttribute('aria-label',language==='es'?'Santiago Romero — inicio':'Santiago Romero — home');
    $('.main-nav').setAttribute('aria-label',language==='es'?'Principal':'Main navigation');
    translate();renderPortfolio();if(activeProject)renderProject(activeProject);
    try{localStorage.setItem('sr-language',language);}catch{/* file:// o almacenamiento restringido: mantener en memoria. */}
  }
  document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.language)));
  $('#year').textContent=String(new Date().getFullYear());
  let saved;try{saved=localStorage.getItem('sr-language');}catch{}
  setLanguage(saved || 'es');
})();
