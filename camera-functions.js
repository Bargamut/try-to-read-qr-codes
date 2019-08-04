function camera_init() {
	const constraints = {
		video: true
	};

	deviceId = cookieGet('cameraId');

	if (typeof deviceId !== 'undefined') {
		constraints.video = { 
			deviceId: {
				exact: deviceId
			}                 
		};

		navigator.mediaDevices.getUserMedia(constraints)
			.then(on_videostream_success)
			.catch(on_videostream_error);
	} else {
		alert('Зайдите в настройки и укажите какую камеру использовать.');
	}
}

function on_videostream_success(stream) {
	const track = stream.getVideoTracks()[0];

	g_barcodescan_track = track;

	video.addEventListener('loadedmetadata', (e) => {  
		window.setTimeout(() => (
			onCapabilitiesReady(track.getCapabilities())
		), 500);
	});
	
	function onCapabilitiesReady(capabilities) {
		cameraLight = cookieGet('cameraLight') === 'on';

		var constraints = {
			advanced: [{
				torch: cameraLight
			}]
		};  
			
		if (capabilities.torch) {
			track.applyConstraints(constraints)
				.catch(e => console.log(e));
		}
			
		g_barcodescan_video.play();

		BarcodeJob();
	}
	
	g_barcodescan_video.srcObject = stream;
}