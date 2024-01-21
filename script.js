document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const speedSlider = document.getElementById("speedSlider");
  const angleSlider = document.getElementById("angleSlider");
  const heightSlider = document.getElementById("heightSlider");
  const speedValue = document.getElementById("speedValue");

  const angleValue = document.getElementById("angleValue");
  const heightValue = document.getElementById("heightValue");
  const distanceValue = document.getElementById("distanceValue");
  const heightValueDisplay = document.getElementById("heightValueDisplay");

  let v0 = parseInt(speedSlider.value);
  let angle = parseInt(angleSlider.value);
  let h0 = parseInt(heightSlider.value);
  let x = 0,
    y = canvas.height - h0,
    t = 0;
  const g = 9.81;
  const toRad = Math.PI / 180;
  let path = [];
  let isPaused = false;
  const pauseButton = document.getElementById("pauseButton");

  pauseButton.addEventListener("click", function () {
    isPaused = !isPaused;
    if (!isPaused) {
      requestAnimationFrame(loop);
    }
  });

  speedSlider.oninput = function () {
    v0 = parseInt(this.value);
    speedValue.innerHTML = this.value;
    reset();
  };

  angleSlider.oninput = function () {
    angle = parseInt(this.value);
    angleValue.innerHTML = this.value;
    reset();
  };

  heightSlider.oninput = function () {
    h0 = parseInt(this.value);
    heightValue.innerHTML = this.value;
    reset();
  };

  function update() {
    t += 0.1;
    x = v0 * Math.cos(angle * toRad) * t;
    y =
      canvas.height - h0 - (v0 * Math.sin(angle * toRad) * t - 0.5 * g * t * t);

    path.push({ x: x, y: y });

    distanceValue.textContent = x.toFixed(2);
    heightValueDisplay.textContent = (canvas.height - y).toFixed(2);

    if (y > canvas.height) {
      reset();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxes();

    ctx.beginPath();
    for (let i = 0; i < path.length - 1; i++) {
      ctx.moveTo(path[i].x, path[i].y);
      ctx.lineTo(path[i + 1].x, path[i + 1].y);
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  function reset() {
    t = 0;
    x = 0;
    y = canvas.height - h0;
    path = [];
  }

  function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();

    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.fillText(i + "m", i, canvas.height - 5);
    }

    for (let i = 0; i <= canvas.height; i += 50) {
      ctx.fillText(i + "m", 5, canvas.height - i);
    }
  }

  function loop() {
    if (!isPaused) {
      update();
      draw();
      requestAnimationFrame(loop);
    }
  }

  loop();
});
