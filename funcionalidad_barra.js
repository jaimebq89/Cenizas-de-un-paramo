// JavaScript Document
var mivideo, reproducir, barra, progreso, maximo;
var miaudio, reproducir2, barra2, progreso2;
var edad;
maximo=600;
var y=100;
var estadoy="bajando";
var arriba=y;
var elem_destino;
var soltar;

function jscanva1(){
	var elemento=document.getElementById("lienzo");
	lienzo=elemento.getContext("2d");
	setInterval(animacion,70);
	window.addEventListener("mousemove",animacion2,false);
}
function animacion2(e){
	lienzo.clearRect(300,100,300,100);
	var xdelraton=e.clientX;
	var ydelraton=e.clientY;
	var xcentro=360;
	var ycentro=150;
	var angulo=Math.atan2(xdelraton-xcentro,ydelraton-ycentro);
	var x=xcentro+Math.round(Math.sin(angulo)*10);
	var y=ycentro+Math.round(Math.cos(angulo)*10);
	lienzo.beginPath();
	lienzo.arc(xcentro, ycentro,20,0,Math.PI*2, false);
	lienzo.moveTo(430,150);
	lienzo.arc(410,ycentro,20,0,Math.PI*2, false);
	lienzo.stroke();
	lienzo.beginPath();
	lienzo.arc(x,y,10,0,Math.PI*2,false);
	lienzo.moveTo(x,y);
	lienzo.arc(x+50,y,10,0,Math.PI*2,false);
	lienzo.fill();
}
function animacion(){
	if(y<300 && estadoy=="bajando"){
		lienzo.clearRect(0,0,720,300)
		lienzo.beginPath();
		lienzo.arc(300,y,40,0,Math.PI*2,false);	
		lienzo.fill();
		y+=50; 
	}
	if(y==300){
		//arriba+=50;
		estadoy="subiendo";
	}
	if(y>=arriba && estadoy=="subiendo"){
		lienzo.clearRect(0,0,720,300)
		lienzo.beginPath();
		lienzo.arc(300,y,40,0,Math.PI*2,false);	
		lienzo.fill();
		y-=50;
	}
	if(y==arriba){
		estadoy="bajando";
	}
	lienzo.strokeStyle="blue";
	lienzo.fillStyle="f8c30d";
	lienzo.globalAlpha=0.8;
	lienzo.strokeRect(110,110,100,100);
	lienzo.fillRect(120,120,80,80);
	lienzo.clearRect(130,130,60,60);	
}
window.addEventListener("load",jscanva1,false);

function iniciar(){
	zonadatos2=document.getElementById("zonadatos2");
	var archivos=document.getElementById("archivos");
	archivos.addEventListener("change",procesar,false);
	
	edad=document.getElementById("edad");
	edad.addEventListener("change", cambia_rango, false);
	document.formulario.addEventListener("invalid",validar,true);
	document.getElementById("Enviar").addEventListener("click",enviar,false);
	document.formulario.addEventListener("input",validar_tiempo_real,false);
}
function procesar(e){
	var archivos=e.target.files;
	zonadatos2.innerHTML="";
	var mi_archivo=archivos[0];
	//alert(mi_archivo.type);
	if(!mi_archivo.type.match(/image/)){
		
		alert("Selecciona una imagen, por favor");
	}else{
		zonadatos2.innerHTML+="Nombre del archivo: " + mi_archivo.name + "<br>";
		zonadatos2.innerHTML+="Tamaño del archivo: " + Math.round(mi_archivo.size/1024) + " kB <br>";
		var lector=new FileReader();
		//lector.readAsText(mi_archivo,  "iso-8859-1");
		lector.readAsDataURL(mi_archivo);
		lector.addEventListener("load",mostrar_en_web,false);
	}
	
}
function mostrar_en_web(e){
	var resultado=e.target.result;
	zonadatos2.innerHTML+="<img src='" +resultado + "' width='85%'>";
}
function cambia_rango(){
	var salida=document.getElementById("rango");
	var calculo=edad.value-30;
	if(calculo<30){
		calculo=0;
		edad.value=30;	
	}
	salida.innerHTML=calculo+" a "+edad.value;
}
function validar(e){
	var elemento=e.target;
	elemento.style.background="#FFDDDD";
}
function enviar(){
	var cuadro_usuario=document.getElementById("usuario");
	var correcto=document.registrar_usuario.checkValidity();
	if(correcto==true){
		document.formulario.submit();
	}else if(cuadro_usuario.validity.valueMissing==true){
			alert("El usuario no puede estar vacío");
 }
}
function validar_tiempo_real(e){
	var elemento=e.target;
	if(elemento.validity.valid==true){
		elemento.style.background="#FFFFFF";	
	}else{
		elemento.style.background="FFDDDD";
	}
}
window.addEventListener("load",iniciar,false);

function tipoNombre(){
	alert("Cenizas de un Páramo");
}
function zoominnin(){
	var imagen2=document.querySelectorAll("#imagenes img");
	for (var i=0;i<imagen2.length;i++){
//imagen2[i].addEventListener("mouseover", function(){imagen2[i].width=225;imagen2[i].height=225;},false);
//imagen2[i].addEventListener("mouseout",function(){imagen2[i].width=200;imagen2[i].height=200;},false);
		imagen2[i].addEventListener("click",tipoNombre,false);
}
}
window.addEventListener("load",zoominnin,false);

function arrastraimagen(){	
	var imagen=document.querySelectorAll("#imagenes img");
		
for (var i=0;i<imagen.length;i++){
		imagen[i].addEventListener("dragstart",comenzamos_arrastrar,false);
		imagen[i].addEventListener("dragend",terminado,false);

}	
	elem_destino=document.getElementById("zonadestino");
	elem_destino.addEventListener("dragover",function(e){e.preventDefault();},false);
	elem_destino.addEventListener("drop",soltado,false);
	elem_destino.addEventListener("dragenter",entrando,false);
	elem_destino.addEventListener("dragleave",saliendo,false);
	
}

function comenzamos_arrastrar(e){
	var elemento=e.target;
	e.dataTransfer.setData("Text", elemento.getAttribute("id"));
}
function soltado(e){
	
	e.preventDefault();
	var id=e.dataTransfer.getData("Text");
	var src=document.getElementById(id).src;
	elem_destino.innerHTML="<img src='"+ src +"'>";	
}

function terminado(e){
	var elemento=e.target;
	elemento.style.visibility="hidden";	
}
function entrando(e){
	e.preventDefault;
	elem_destino.style.background="rgba(8,252,25,.8)";
}
function saliendo(e){
	e.preventDefault();
	elem_destino.style.background="#FFFFFF";
}

window.addEventListener("load",arrastraimagen,false);

function leeNombreArchivo(){
	soltar=document.getElementById("zonadestino2");
	soltar.addEventListener("dragenter",function(e){e.preventDefault();},false);
	soltar.addEventListener("dragover",function(e){e.preventDefault();},false);
	soltar.addEventListener("drop",soltado2, false);
}

function soltado2(e){
	e.preventDefault();
	var archivos=e.dataTransfer.files;
	var listado="";
	for(var f=0;f<archivos.length;f++){
	//listado=archivos[f].name;
	//listado=(archivos[f].size/1024).toFixed(2);
	listado+="Archivo: " + archivos[f].name + " " + "Peso: " + (archivos[f].size/1024).toFixed(2) + " " + "Tipo: " + archivos[f].type + " " + "Fecha: " + archivos[f].lastModifiedDate.toLocaleString(); + "<br>";
	}
	soltar.innerHTML=listado;
}
window.addEventListener("load",leeNombreArchivo,false);

function comenzarvideo(){
	mivideo=document.getElementById("mivideo");
	reproducir=document.getElementById("reproducir");
	barra=document.getElementById("barra");
	progreso=document.getElementById("progreso");
	miaudio=document.getElementById("miaudio");
	reproducir2=document.getElementById("reproducir2");
	barra2=document.getElementById("barra2");
	progreso2=document.getElementById("progreso2");
	reproducir.addEventListener("click",clicando,false);
	reproducir2.addEventListener("click",clicando2,false);
	barra.addEventListener("click",desplazando,false);
	barra2.addEventListener("click",desplazando2,false);
}
function clicando(){
	if((mivideo.paused==false) && (mivideo.ended==false)){
		mivideo.pause();
		reproducir.innerHTML="play";
	}
	else{
		mivideo.play();
		reproducir.innerHTML="pause";
		bucle=setInterval(estado,30);
	}
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
function estado(){
	if(mivideo.ended==false){
		var total=parseInt(mivideo.currentTime*maximo/mivideo.duration);
		progreso.style.width=total+"px";
	}
}
function estado2(){
	if(miaudio.ended==false){
		var total2=parseInt(miaudio.currentTime*maximo/miaudio.duration);
		progreso2.style.width=total2+"px";
	}
}
function desplazando(posicion){
	if((mivideo.paused==false) && (mivideo.ended)==false){
		var ratonX=posicion.pageX-barra.offsetLeft;
		var nuevoTiempo=ratonX*mivideo.duration/maximo;
		mivideo.currentTime=nuevoTiempo;
		progreso.style.width=ratonX+"px";
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
window.addEventListener("load",comenzarvideo,false);
function boton_localizacion(){
	var miboton=document.getElementById("dame_ubicacion");
	miboton.addEventListener("click",obtener_localizacion,false);
}
function obtener_localizacion(){
	var parametros={enableHighAccuracy: true, timeout: 10000, maximumAge: 60000};
	navigator.geolocation.getCurrentPosition(mostrar_posicion,gestion_errores,parametros);
}
function mostrar_posicion(posicion){
	var ubicacion=document.getElementById("ubicacion");
	var miubicacion="";
	miubicacion+="Latitud: " + posicion.coords.latitude + "<br>";
	miubicacion+="Longitud: " + posicion.coords.longitude + "<br>";
	miubicacion+="Exactitud: " + posicion.coords.accuracy + "<br>";
//	var mimapa="http://maps.google.com/maps/api/staticmap?center=" + posicion.coords.latitude + "," +posicion.coords.longitude + "," + "&zoom=12&size=400x400&sensor=false&markers=" +posicion.coords.latitude + "," + posicion.coords.longitude;
//	ubicacion.innerHTML="<img src='" + mimapa + "'>";
	ubicacion.innerHTML=miubicacion;
}
function gestion_errores(error){
	alert("Ha habido un error. Codigo del error:  " + error.code + ". Descripcion del error: " + error.message);
	if(error.message=="User denied Geolocation"){
		alert("Debes permitir el uso de la geolocalizacion en tu navegador");
	}
}
window.addEventListener("load",boton_localizacion,false);

function guardarBD(){
	zonadatos=document.getElementById("zonadatos");
	boton=document.getElementById("grabar");
	boton.addEventListener("click",itemNuevo,false);
	var solicitud=indexedDB.open("mibase");
	solicitud.onsuccess=function(e){
	bd=e.target.result;
	}
	solicitud.onupgradeneeded=function(e){
		bd=e.target.result;
		bd.createObjectStore("gente", {keyPath: "clave"});
	}
}

function itemNuevo(){

	var clave=document.getElementById("clave").value;
	var valor=document.getElementById("valor").value;
	var titulo=document.getElementById("texto").value;
	var Fecha=document.getElementById("fecha").value;
	
	var transaccion=bd.transaction(["gente"], "readwrite");
	var almacen=transaccion.objectStore("gente");
	var agregar=almacen.add({clave: clave, titulo: titulo, Fecha: Fecha});
	agregar.addEventListener("success", mostrar,false);
	//sessionStorage.setItem(clave, valor);
	//localStorage[clave]=valor;
	document.getElementById("clave").value="";
	document.getElementById("valor").value="";
	document.getElementById("texto").value="";
	document.getElementById("fecha").value="";
}
function mostrar(){
	
	zonadatos.innerHTML="";
	var transaccion=bd.transaction(["gente"],"readonly");
	var almacen=transaccion.objectStore("gente");
	var cursor=almacen.openCursor();
	cursor.addEventListener("success",mostrarDatos,false);
	
}
function mostrarDatos(e){
	var cursor=e.target.result;
	if(cursor){
		zonadatos.innerHTML+="<div>" + cursor.value.clave + " - " + cursor.value.titulo + " - " + cursor.value.Fecha + "</div>";
		cursor.continue();
	}
}
//function leer_mostrar(clave){
//	var zonadatos=document.getElementById("zonadatos");
//	zonadatos.innerHTML='<div><button onclick="eliminarTodo()">Eliminar todo</button></div>';
//
//	for(var i=0;i<localStorage.length;i++){
//		clave=localStorage.key(i);
//		var elvalor=localStorage.getItem(clave);
//		zonadatos.innerHTML+='<div> Clave: ' + clave + '--' + 'Valor: ' + elvalor + '<br><button onclick="eliminarItem(\'' + clave + '\')">Eliminar</button></div>';
//	}
//		
//}
//function eliminarTodo(){
//if(confirm("¿Estás seguro?")){
//	localStorage.clear();
//	leer_mostrar();
//}
//}
//function eliminarItem(clave){
//	if(confirm("¿Estás seguro?")){
//		localStorage.removeItem(clave);
//		leer_mostrar();
//	}
//}



window.addEventListener("load",guardarBD,false);


//API Directories&System
function CreandoArch(){
	zonadatos3=document.getElementById("zonadatos3");
	var boton=document.getElementById("boton");
	boton.addEventListener("click", crear, false);
	
	navigator.webkitPersistentStorage.requestQuota(5*1024*1024, acceso);
	
}
function acceso(){
	window.webkitRequestFileSystem(PERSISTENT, 5*1024*1024, crearsis, errores);
}
function crearsis(sistema){
	espacio=sistema.root;
	ruta="";
	mostrar2();
}

function crear(){
	var nombre_archivo=document.getElementById("entrada").value;	
	if(nombre_archivo!=""){
		nombre_archivo=ruta+nombre_archivo;
		espacio.getFile(nombre_archivo,{create:true, exclusive:false},mostrar2, errores);
	}
	
}
function mostrar2(entrada){
	document.getElementById("entrada").value="";
	zonadatos3.innerHTML="";
	espacio.getDirectory(ruta,null,leerdir,errores);
}

function leerdir(dir){
	lector2=dir.createReader();
	leer();
	
}

function leer(){
	lector2.readEntries(function(archivos2){
	if(archivos2.length){
		listar(archivos2);
	}
 }, errores);
}

function listar(archivos2){
	for(var i=0;i<archivos2.length;i++){
		if(archivos2[i].isFile){
			zonadatos3.innerHTML+=archivos2[i].name+"<br>";
		}else if(archivos2[i].isDirectory){

			zonadatos3.innerHTML+="<span onclick='cambiardir(\"" + archivos2[i].name + "\)' class='directorio'>" +archivos2[i].name + "</span><br>";
		}
	}
}
function cambiardir(nuevaruta){
	ruta=ruta+nuevaruta +"/";
	mostrar2();
}

function volver(){
	espacio.getDirectory(ruta,null,function(dir_actual){
		dir_actual.getParent(function(dir_padre){
			ruta=dir_padre.fullPath;
			mostrar2();
		},errores);
	},errores);
}

function errores(e){
	alert("Ha Habido un error: " + e.code);
	
}



window.addEventListener("load", CreandoArch, false);


