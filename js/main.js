// Variables

let nav = document.getElementById('nav');
let menu = document.getElementById('enlaces');
let abrir = document.getElementById('open');
let botones = document.getElementsByClassName('btn-header');
let cerrado = true;
/*var miaudio, reproducir2, barra2, progreso2;
function comenzaraudio(){

	miaudio=document.getElementById("miaudio");
	reproducir2=document.getElementById("reproducir2");
	barra2=document.getElementById("barra2");
	progreso2=document.getElementById("progreso2");
	reproducir2.addEventListener("click",clicando2,false);
	barra2.addEventListener("click",desplazando2,false);
}
function clicando2(){
	if((miaudio.paused==false) && (miaudio.ended==false)){
		miaudio.pause();
		reproducir2.innerHTML="play";
	}
	else{
		miaudio.play();
		reproducir2.innerHTML="pause";
		bucle=setInterval(estado2,30);
	}
}
function estado2(){
	if(miaudio.ended==false){
		var total2=parseInt(miaudio.currentTime*maximo/miaudio.duration);
		progreso2.style.width=total2+"px";
		}
}
function desplazando2(posicion2){
	if((miaudio.paused==false) && (miaudio.ended)==false){
		var ratonX2=posicion2.pageX-barra2.offsetLeft;
		var nuevoTiempo2=ratonX2*miaudio.duration/maximo;
		miaudio.currentTime=nuevoTiempo2;
		progreso2.style.width=ratonX2+"px";
	}
}
window.addEventListener("load",comenzaraudio,false);*/
function menus(){
    let Desplazamiento_Actual = window.pageYOffset;

    if(Desplazamiento_Actual <= 300){
        nav.classList.remove('nav2');
        nav.className = ('nav1');
        nav.style.transition = '1s';
        menu.style.top = '80px';
        abrir.style.color = '#fff';
    }else{
        nav.classList.remove('nav1');
        nav.className = ('nav2');
        nav.style.transition = '1s';
        menu.style.top = '100px';
        abrir.style.color = '#000';
    }
}

function apertura(){
    if(cerrado){
        menu.style.width = '70vw';
        cerrado = false;
    }else{
        menu.style.width = '0%';
        menu.style.overflow = 'hidden';
        cerrado = true;
    }
}

window.addEventListener('load', function(){
    $('#onload').fadeOut();
    $('body').removeClass('hidden');
    menus();
});
window.addEventListener('click',function(e){
    console.log(e.target);
    if(cerrado==false){
        let span = document.querySelector('span');
        if(e.target !== span && e.target !== abrir){
            menu.style.width = '0%';
            menu.style.overflow = 'hidden';
            cerrado = true;
        }
    }
});
window.addEventListener('scroll', function(){
    console.log(window.pageYOffset);
    menus();
});
window.addEventListener('resize', function(){
    if(screen.width>= 700){
        cerrado = true;
        menu.style.removeProperty('overflow');
        menu.style.removeProperty('width');
    }
});
abrir.addEventListener('click', function(){
    apertura();
});