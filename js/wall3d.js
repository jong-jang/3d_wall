(function () {
	const houseElem = document.querySelector('.house');
	let maxScrollValue;

	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}

	window.addEventListener('scroll', function () {
		const zMove = (window.scrollY / maxScrollValue) * 970 - 490;
		houseElem.style.transform = `translateZ(${zMove}vw)`;
	});

	window.addEventListener('resize', resizeHandler);
	resizeHandler();
})();
