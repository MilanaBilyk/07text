const $=id=>document.getElementById(id),t=$('t');
const STOP=new Set('и в во не что он на я с со как а то все она так его но да ты к у же вы за бы по только ее мне было вот от меня еще нет о из ему теперь когда даже ну вдруг ли если уже или ни быть был него до вас нибудь опять уж вам ведь там потом себя ничего ей может они тут где есть надо ней для мы тебя их чем была сам чтоб без будто чего раз тоже себе под будет ж тогда кто этот того потому этого какой совсем ним здесь этом один почти мой тем чтобы нее сейчас были куда зачем всех никогда можно при наконец два об другой хоть после над больше тот через эти нас про всего них какая много разве три эту моя впрочем хорошо свою этой перед иногда лучше чуть том нельзя такой им более всегда конечно всю между the a of to is in and'.split(' '));
const words=s=>s.toLowerCase().match(/[\p{L}\p{N}-]+/gu)||[];
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function update(){const s=t.value,w=words(s);
const st=[['Символов',s.length],['Без пробелов',s.replace(/\s/g,'').length],['Слов',w.length],['Предложений',(s.match(/[^.!?…]+[.!?…]+/g)||(s.trim()?[s]:[])).length],['Абзацев',s.split(/\n\s*\n/).filter(x=>x.trim()).length],['Чтение, мин',(w.length/180).toFixed(1)]];
$('stats').innerHTML=st.map(x=>`<div class="stat">${x[0]}<b>${x[1]}</b></div>`).join('');
const c={};w.forEach(x=>{if(x.length>2&&!STOP.has(x))c[x]=(c[x]||0)+1});
const top=Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,10);
$('kw').innerHTML=top.length?'<table><tr><th>Слово</th><th>Раз</th><th>Плотность</th></tr>'+top.map(([k,v])=>`<tr><td>${esc(k)}</td><td>${v}</td><td>${(v/w.length*100).toFixed(1)}%</td></tr>`).join('')+'</table>':'Введите текст.';
const r=[...new Set((s.toLowerCase().match(/(?<![\p{L}\p{N}])([\p{L}\p{N}]+)\s+\1(?![\p{L}\p{N}])/gu)||[]))];
$('rep').innerHTML=r.length?r.map(esc).join(', '):'Не найдены.'}
const acts={'Убрать лишние пробелы':s=>s.replace(/[ \t]+/g,' ').replace(/ ?\n ?/g,'\n').trim(),'Убрать пустые строки':s=>s.split('\n').filter(l=>l.trim()).join('\n'),'ВЕРХНИЙ РЕГИСТР':s=>s.toUpperCase(),'нижний регистр':s=>s.toLowerCase(),'Первая заглавная':s=>s.toLowerCase().replace(/(^|[.!?]\s+)(\p{L})/gu,(m,a,b)=>a+b.toUpperCase()),'Сортировать строки':s=>s.split('\n').sort((a,b)=>a.localeCompare(b,'ru')).join('\n'),'Убрать дубли строк':s=>[...new Set(s.split('\n'))].join('\n')};
const b=$('btns');Object.entries(acts).forEach(([n,f])=>{const e=document.createElement('button');e.className='alt';e.textContent=n;e.onclick=()=>{t.value=f(t.value);update()};b.appendChild(e)});
const cp=document.createElement('button');cp.textContent='Копировать';cp.onclick=async()=>{try{await navigator.clipboard.writeText(t.value);cp.textContent='Скопировано ✓'}catch(e){t.select();document.execCommand('copy');cp.textContent='Скопировано ✓'}setTimeout(()=>cp.textContent='Копировать',1500)};b.appendChild(cp);
const cl=document.createElement('button');cl.className='alt';cl.textContent='Очистить';cl.onclick=()=>{t.value='';update()};b.appendChild(cl);
t.addEventListener('input',update);update();
