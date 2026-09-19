const projectCases={
  uav:{title:'UAV — Mechanical Packaging',body:'Structural assemblies and sheet-metal enclosures for defence-grade UAV systems, including 3D CAD, DFM/GD&T, manufacturing packages, drawings, BOMs, prototypes and verification testing.',tags:['DESIGN','ASSEMBLY','DFM','GD&T']},
  sae:{title:'SAE DDC 2025 — Fixed-Wing UAV',body:'SolidWorks system architecture, rapid prototyping, full assembly validation, material selection and FEA-based structural analysis. Team Aerotech received AIR 1 for Best Design Report.',tags:['CAD','ASSEMBLY','FEA','PROTOTYPING']},
  mold:{title:'Plastic Injection Hand Mold',body:'Creo mold modeling and simulation, production drawings, CNC toolpaths, DFMEA and process-flow documentation for manufacturing planning.',tags:['CREO','DFMEA','CNC','MANUFACTURING']},
  drdo:{title:'DRDO — Supersonic Pressure Analysis',body:'3D modeling, supersonic shockwave pressure distributions, CAD assemblies and analytical validation during a summer internship at DRDO, Chandipur.',tags:['CFD','PRESSURE','CAD','VALIDATION']},
  nalco:{title:'NALCO — Industrial Plant Machinery',body:'Heavy-industrial plant machinery layouts with exposure to Six Sigma, troubleshooting and workflow-efficiency studies.',tags:['INDUSTRIAL','SIX SIGMA','LAYOUTS']}
};

const modal=document.querySelector('#project-modal');
const modalBody=document.querySelector('#modal-body');
function openCase(key){
  const item=projectCases[key]; if(!item||!modal||!modalBody)return;
  modalBody.innerHTML=`<button class="modal-close" type="button" aria-label="Close" data-close-modal>×</button><div class="kicker">ENGINEERING CASE</div><h2 id="modal-title">${item.title}</h2><p>${item.body}</p><div class="tags">${item.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  modal.querySelector('[data-close-modal]').focus();
}
function closeCase(){if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>openCase(btn.dataset.project)));
modal?.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-close-modal]'))closeCase()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCase()});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('show')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.side-nav a')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(s=>sectionObserver.observe(s));

document.querySelector('[data-year]')?.append(new Date().getFullYear());
