const projectCases={
  uav:{title:'UAV — Mechanical Packaging',body:'Design and execution of robust 3D modeling and mechanical packaging for structural assemblies and sheet metal enclosures for defense-grade UAV systems. Enforced strict design for manufacturing (DFM) limits and GD&T principles to achieve assembly precision, material optimization, and production viability. Delivered exhaustive manufacturing packages, including detailed 2D engineering drawings and comprehensive Bills of Materials (BOM).',tags:['DESIGN','ASSEMBLY','DFM','GD&T','BOM']},
  sae:{title:'SAE DDC 2025 — Fixed-Wing UAV',body:'Led cross-functional CAD modeling efforts using SolidWorks for system architecture layout, rapid prototyping, and full assembly validation. Optimized material selection and conducted FEA-based analyses to secure component structural integrity while maximizing physical payload distribution. Team Aerotech captured All India Rank 1 (AIR 1) for Best Design Report at the national SAE DDC competition.',tags:['CAD','ASSEMBLY','FEA','PROTOTYPING']},
  mold:{title:'Plastic Injection Hand Mold',body:'Modeled and simulated tool-room injection molds in Creo, then generated production drawings for CNC toolpaths including milling, turning, and grinding. Developed DFMEA and process flow charts to mitigate molding risks and ensure design for manufacturability with engineering plastics.',tags:['CREO','DFMEA','CNC','MANUFACTURING']},
  drdo:{title:'DRDO — Supersonic Pressure Analysis',body:'Engineered complex 3D modeling profiles with parametric detailing and investigated high-displacement shockwave pressure distributions for supersonic structures. Leveraged advanced CAD assemblies and analytical validation strategies to capture wave-pulse geometry and vector behaviors during a summer internship at DRDO, Chandipur.',tags:['CFD','PRESSURE','CAD','VALIDATION']},
  nalco:{title:'NALCO — Industrial Plant Machinery',body:'Interfaced with heavy industrial plant machinery layouts. Applied Six Sigma methodology to assess and support operational equipment troubleshooting and workflow efficiency studies as an Industrial Trainee at NALCO, Angul.',tags:['INDUSTRIAL','SIX SIGMA','LAYOUTS']}
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
