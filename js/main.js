let width = 500 , height = 0 , 
filter = 'none' , streaming = false ;

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const photoFilter = document.getElementById('photo-filter');
const clearButton = document.getElementById('clear-button');

navigator.mediaDevices.getUserMedia({ video : true , audio : false }
	).then(function(stream) {
 		video.srcObject = stream;
 		video.play();
 	}).catch(function(err){
 		console.log(err);
	});

video.addEventListener('canplay',function(e){
	if(!streaming){

		height = (video.videoHeight)/(video.videoWidth/width);

		video.setAttribute('width',width);
		video.setAttribute('height',height);
		canvas.setAttribute('width',width);
		canvas.setAttribute('height',height);

		streaming = true;
	}
});

photoFilter.addEventListener('change', function(e){
	e.preventDefault();
	filter = e.target.value;
	video.style.filter = filter;
})


photoButton.addEventListener('click',function(e){
	e.preventDefault();
	takePicture();
});

function takePicture(){

	const ctx=canvas.getContext("2d");
	ctx.drawImage(video,0,0,canvas.width,canvas.height);

	const imgUrl = canvas.toDataURL('image/png');
	const img = document.createElement('img');
	img.setAttribute('src',imgUrl);
	img.style.filter = filter;
	photos.appendChild(img);
}

clearButton.addEventListener('click',function(e){
	e.preventDefault();
	photos.innerHTML = '';
	filter = 'none';
	video.style.filter = filter;
	photoFilter.selectedIndex = 0;

});