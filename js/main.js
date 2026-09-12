document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.15}).observe(el));
  document.querySelectorAll('[data-counter]').forEach(el=>new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting||el.dataset.counted)return;el.dataset.counted='true';const end=Number(el.dataset.counter),suffix=el.dataset.suffix||'',start=performance.now();const tick=now=>{const value=Math.min(end,Math.round(end*((now-start)/900)));el.textContent=value+suffix;if(value<end)requestAnimationFrame(tick)};requestAnimationFrame(tick)}),{threshold:.4}).observe(el));
});
