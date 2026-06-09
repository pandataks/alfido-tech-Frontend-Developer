document.getElementById("year").textContent = new Date().getFullYear();

const text = "Frontend Developer | UI Designer | Problem Solver";
let i = 0;

function type(){
  if(i < text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 60);
  }
}
type();