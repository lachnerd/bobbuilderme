{

	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	const beanie = document.getElementById('beanie');
	const logo = document.getElementById('logo');
	const image = document.getElementById('image');
	image.src = window.location.href.split('?img=')[1];

	const IMAGE_WIDTH = 400;

	let coordinates = {
		left: {},
		right: {}
	}

	let numberOfTimesClicked = 0;




	/* Functions --------------------------- */


	function drawImage() {

		const newWidth = IMAGE_WIDTH;
		const newHeight = (image.height * newWidth) / image.width;

		function clearCanvas() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			canvas.width = newWidth;
			canvas.height = newHeight;
		}
		
		function drawPhotograph() {
			ctx.drawImage(image, 0, 0, newWidth, newHeight);
		}

		function drawBorder() {
			ctx.lineWidth = "15";
			ctx.strokeStyle = "#29a2ef";
			ctx.rect(0, 0, IMAGE_WIDTH, newHeight);
			ctx.stroke();
		}

		function drawLogo() {
			const logoWidth = IMAGE_WIDTH / 1.7;
			const logoHeight = (37 * logoWidth) / 320;
			const x = IMAGE_WIDTH / 2 - logoWidth / 2
			ctx.drawImage(logo, x, newHeight - 60, logoWidth, logoHeight);
		}

		clearCanvas() 
		drawPhotograph()
		drawBorder()
		drawLogo()
	}

	setTimeout(function() {
		drawImage();
	}, 1000)



	function drawBeanie() {

		drawImage();

		const imageWidth = coordinates.right.x - coordinates.left.x + 40;
		ctx.drawImage(beanie, coordinates.left.x, coordinates.left.y - imageWidth, imageWidth, imageWidth);

	}


	function addRect(coords) {
		ctx.lineWidth = "2";
		ctx.strokeStyle = "blue";
		ctx.rect(coords.x - 10, coords.y - 10, 20, 20);
		ctx.stroke();
	}



	function setLeftCoord(coords) {
		coordinates.left = coords;
		document.querySelector('.instruction-1').classList.remove('highlight');
		document.querySelector('.instruction-2').classList.add('highlight');
	}

	function setRightCoord(coords) {
		coordinates.right = coords;
		document.querySelector('.instruction-2').classList.remove('highlight');
		document.querySelector('.instruction-3').classList.add('highlight');
	}

	function moveBeanie(e) {

		const direction = e.target.dataset.direction;

		switch(direction) {
			case 'left':
				coordinates.left.x --
				coordinates.right.x --
				break;
			case 'right':
				coordinates.left.x ++
				coordinates.right.x ++
				break;
			case 'down':
				coordinates.left.y ++
				coordinates.right.y ++
				break;
			case 'up':
				coordinates.left.y --
				coordinates.right.y --
				break;
			default:
				break;
		}

		drawBeanie();

	}

	function exportImage() {
		const canvas = document.getElementById('canvas');
		var exportedImage = canvas.toDataURL();
		window.open(exportedImage);
	}


	function resetCanvas() {
		numberOfTimesClicked = 0;
		drawImage();

		document.querySelector('.instruction-1').classList.add('highlight');
		document.querySelector('.instruction-2').classList.remove('highlight');
		document.querySelector('.instruction-3').classList.remove('highlight');
	}

	function onCanvasClick(e) {
		numberOfTimesClicked++;

		if (numberOfTimesClicked === 3) numberOfTimesClicked = 1;

		const coords = {
			x: e.offsetX,
			y: e.offsetY
		}

		addRect(coords);

		switch (numberOfTimesClicked) {
			case 1:
				setLeftCoord(coords)
				break;
			case 2:
				setRightCoord(coords)
				drawBeanie();
				break;
			default:
				break;
		}
	}

	/* Event Listeners --------------------------- */

	canvas.addEventListener('click', onCanvasClick)

	const moveBeanieButtons = Array.from( document.querySelectorAll('.btn-move-beanie') );
	moveBeanieButtons.forEach(moveBeanieButton => {
		moveBeanieButton.addEventListener('click', moveBeanie)
	})

	document.getElementById('export').addEventListener('click', exportImage);
	document.getElementById('reset').addEventListener('click', resetCanvas);


}