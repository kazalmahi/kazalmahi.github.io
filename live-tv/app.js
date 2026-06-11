const video = document.getElementById("video");
const loader = document.getElementById("loader");

const stream =
"https://tv-proxy.kazalmahi-gd.workers.dev";

if(Hls.isSupported()){

const hls = new Hls({
enableWorker:true,
lowLatencyMode:true,
maxBufferLength:30,
backBufferLength:90
});

hls.loadSource(stream);
hls.attachMedia(video);

hls.on(Hls.Events.MANIFEST_PARSED,()=>{

loader.style.display="none";
video.play();

});

hls.on(Hls.Events.ERROR,(event,data)=>{

if(data.fatal){
loader.style.display="none";
console.log(data);
}

});

}else if(video.canPlayType(
'application/vnd.apple.mpegurl'
)){

video.src=stream;

video.addEventListener(
'loadedmetadata',
()=>{
loader.style.display="none";
video.play();
}
);

}

document
.getElementById("fullscreenBtn")
.addEventListener("click",()=>{

if(video.requestFullscreen){
video.requestFullscreen();
}

});
