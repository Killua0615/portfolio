// Watercolor painting animation
(function () {
	const canvas = document.createElement('canvas');
	canvas.id = 'watercolor-bg';
	canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;';
	document.body.insertBefore(canvas, document.body.firstChild);

	const ctx = canvas.getContext('2d');
	let W, H;

	function resize() {
		W = canvas.width = window.innerWidth;
		H = canvas.height = window.innerHeight;
	}
	resize();
	window.addEventListener('resize', () => {
		resize();
		drawAll();
	});

	// Dutch flag palette (red, white, blue) - subtle watercolor
	const palette = [
		{ r: 210, g: 50, b: 40, a: 0.08 },    // dutch red
		{ r: 185, g: 40, b: 35, a: 0.06 },    // deeper red
		{ r: 30, g: 80, b: 180, a: 0.08 },    // dutch blue
		{ r: 50, g: 110, b: 210, a: 0.07 },   // lighter blue
		{ r: 200, g: 200, b: 215, a: 0.05 },  // soft white/silver
		{ r: 190, g: 60, b: 50, a: 0.06 },    // warm red
		{ r: 40, g: 90, b: 175, a: 0.07 },    // muted blue
		{ r: 220, g: 215, b: 205, a: 0.04 },  // warm white
	];

	// Generate blob shapes
	const blobs = [];
	for (let i = 0; i < 8; i++) {
		blobs.push({
			x: Math.random() * 1.4 - 0.2,  // relative to W
			y: Math.random() * 1.4 - 0.2,  // relative to H
			rx: 0.15 + Math.random() * 0.25,
			ry: 0.12 + Math.random() * 0.2,
			rot: Math.random() * Math.PI * 2,
			color: palette[i % palette.length],
			layers: 3 + Math.floor(Math.random() * 3),
			delay: i * 300,
		});
	}

	// Draw a single watercolor blob (multiple transparent layers for watercolor feel)
	function drawBlob(blob, progress) {
		if (progress <= 0) return;
		const p = Math.min(progress, 1);
		const cx = blob.x * W;
		const cy = blob.y * H;
		const rx = blob.rx * W * p;
		const ry = blob.ry * H * p;
		const c = blob.color;

		ctx.save();
		ctx.translate(cx, cy);
		ctx.rotate(blob.rot);

		for (let layer = 0; layer < blob.layers; layer++) {
			const layerScale = 1 - layer * 0.08;
			const wobble = layer * 0.15;
			const alpha = c.a * p * (1 - layer * 0.06);

			ctx.beginPath();

			// Organic shape using bezier curves with randomized control points
			const points = 8;
			const angleStep = (Math.PI * 2) / points;
			const seed = blob.delay + layer;

			for (let j = 0; j <= points; j++) {
				const angle = j * angleStep;
				const noise = seededRandom(seed + j) * wobble + 1;
				const px = Math.cos(angle) * rx * layerScale * noise;
				const py = Math.sin(angle) * ry * layerScale * noise;

				if (j === 0) {
					ctx.moveTo(px, py);
				} else {
					const prevAngle = (j - 0.5) * angleStep;
					const cpNoise = seededRandom(seed + j + 100) * wobble + 1;
					const cpx = Math.cos(prevAngle) * rx * layerScale * cpNoise * 1.1;
					const cpy = Math.sin(prevAngle) * ry * layerScale * cpNoise * 1.1;
					ctx.quadraticCurveTo(cpx, cpy, px, py);
				}
			}
			ctx.closePath();

			ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
			ctx.fill();
		}

		ctx.restore();
	}

	// Simple seeded random for consistent shapes
	function seededRandom(seed) {
		const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
		return x - Math.floor(x);
	}

	// Animation
	let startTime = null;
	const duration = 3000; // 3 seconds total

	function drawAll() {
		ctx.clearRect(0, 0, W, H);
		const now = Date.now();
		if (!startTime) startTime = now;
		const elapsed = now - startTime;

		blobs.forEach(blob => {
			const blobElapsed = elapsed - blob.delay;
			const progress = Math.max(0, Math.min(1, blobElapsed / (duration - blob.delay)));
			// Ease out cubic
			const eased = 1 - Math.pow(1 - progress, 3);
			drawBlob(blob, eased);
		});

		if (elapsed < duration + 500) {
			requestAnimationFrame(drawAll);
		}
	}

	// Start painting
	requestAnimationFrame(drawAll);
})();
