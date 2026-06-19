
/** UI interactions */
export function initProgress(){
const p=document.getElementById('progress');
window.addEventListener('scroll',()=>{
const h=document.documentElement.scrollHeight-window.innerHeight;
p.style.width=((scrollY/h)*100)+'%';
});
}
