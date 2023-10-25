function Character(info) {
	this.mainElem = document.createElement('div');
	this.mainElem.classList.add('character');
	this.mainElem.innerHTML = `<div class="character">
    <div class="character-face-con character-head">
        <div class="character-face character-head-face face-front"></div>
        <div class="character-face character-head-face face-back"></div>
    </div>
    <div class="character-face-con character-torso">
        <div class="character-face character-torso-face face-front"></div>
        <div class="character-face character-torso-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-right">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-arm character-arm-left">
        <div class="character-face character-arm-face face-front"></div>
        <div class="character-face character-arm-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-right">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
    </div>
    <div class="character-face-con character-leg character-leg-left">
        <div class="character-face character-leg-face face-front"></div>
        <div class="character-face character-leg-face face-back"></div>
    </div>
  </div>`;
	document.querySelector('.stage').appendChild(this.mainElem);

	this.mainElem.style.left = `${info.xPos}%`;
	// 스크롤 중인지 아닌지
	this.scrollState = false;
	// 바로 이전(마지막) 스크롤 위치
	this.lastScrollTop = 0;
	this.speed = info.speed;
	this.xPos = info.xPos;
	this.direction;
	// 좌우 이동 중인지 아닌지
	this.runningState = false;
	this.rafId;
	this.init();
}

Character.prototype = {
	constructor: Character,
	init: function () {
		const self = this;
		window.addEventListener('scroll', () => {
			clearTimeout(self.scrollState);

			if (!self.scrollState) {
				self.mainElem.classList.add('running');
			}

			self.scrollState = setTimeout(function () {
				self.scrollState = false;
				self.mainElem.classList.remove('running');
			}, 500);

			// 이전 스크롤 위치와 현 재스크롤 위치를 비교
			if (self.lastScrollTop > scrollY) {
				// 이전 스크롤 위치가 크다면
				self.mainElem.setAttribute('data-direction', 'backward');
			} else {
				// 현재 스크롤 위치가 크다면
				self.mainElem.setAttribute('data-direction', 'forward');
			}
			self.lastScrollTop = scrollY;
		});

		window.addEventListener('keydown', function (e) {
			if (self.runningState) return;

			if (e.key === 'ArrowLeft') {
				self.direction = 'left';
				self.mainElem.setAttribute('data-direction', 'left');
				self.mainElem.classList.add('running');
				self.run(self);
				self.runningState = true;
			} else if (e.key === 'ArrowRight') {
				self.direction = 'right';
				self.mainElem.setAttribute('data-direction', 'right');
				self.mainElem.classList.add('running');
				self.run(self);
				self.runningState = true;
			}
		});

		window.addEventListener('keyup', function () {
			self.mainElem.classList.remove('running');
			cancelAnimationFrame(self.rafId);
			self.runningState = false;
		});
	},
	run: function (self) {
		if (self.direction == 'left') {
			self.xPos -= self.speed;
		} else if (self.direction == 'right') {
			self.xPos += self.speed;
		}

		if (self.xPos < 2) {
			self.xPos = 2;
		}
		if (self.xPos > 88) {
			self.xPos = 88;
		}

		self.mainElem.style.left = `${self.xPos}%`;

		self.rafId = requestAnimationFrame(function () {
			self.run(self);
		});
	},
};
