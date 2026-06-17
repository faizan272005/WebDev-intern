const hamburger=document.getElementById("hamburger");
const navLinks=document.getElementById("navLinks");

hamburger.addEventListener("click",()=>{
navLinks.classList.toggle("active");
});

const themeBtn=document.getElementById("themeBtn");

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
themeBtn.textContent="☀️";
}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
themeBtn.textContent="☀️";
}else{
localStorage.setItem("theme","light");
themeBtn.textContent="🌙";
}
});

const images=[
"https://picsum.photos/id/1015/1200/600",
"https://picsum.photos/id/1018/1200/600",
"https://picsum.photos/id/1025/1200/600",
"https://picsum.photos/id/1043/1200/600",
"https://picsum.photos/id/1067/1200/600"
];

let current=0;

const sliderImage=document.getElementById("sliderImage");

function showImage(){
sliderImage.src=images[current];
}

document.getElementById("next").onclick=()=>{
current=(current+1)%images.length;
showImage();
};

document.getElementById("prev").onclick=()=>{
current=(current-1+images.length)%images.length;
showImage();
};

setInterval(()=>{
current=(current+1)%images.length;
showImage();
},3500);

const modal=document.getElementById("modal");

document.getElementById("openModal").onclick=()=>{
modal.style.display="flex";
};

document.getElementById("closeModal").onclick=()=>{
modal.style.display="none";
};

window.onclick=(e)=>{
if(e.target===modal){
modal.style.display="none";
}
};

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>300){
topBtn.style.display="block";
}else{
topBtn.style.display="none";
}
});

topBtn.onclick=()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
};

document.getElementById("name").addEventListener("input",e=>{
document.getElementById("nameError").textContent=
e.target.value.length<3?
"Name must contain at least 3 characters":"";
});

document.getElementById("email").addEventListener("input",e=>{

const pattern=/^[^\s@]+@[^\s@]+.[^\s@]+$/;

document.getElementById("emailError").textContent=
pattern.test(e.target.value)?
"":
"Enter a valid email";
});

document.getElementById("phone").addEventListener("input",e=>{

const pattern=/^[0-9]{10}$/;

document.getElementById("phoneError").textContent=
pattern.test(e.target.value)?
"":
"Enter 10 digit mobile number";
});

const counters=document.querySelectorAll(".counter");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;
const target=+counter.dataset.target;

let count=0;

const update=()=>{

const increment=target/120;

if(count<target){

count+=increment;
counter.innerText=Math.ceil(count);

requestAnimationFrame(update);

}else{
counter.innerText=target;
}
};

update();

observer.unobserve(counter);
}
});
});

counters.forEach(counter=>{
observer.observe(counter);
});
