const canvas = document.querySelector("#rafCanvas");
const ctx = canvas.getContext("2d");
const toggleButton = document.querySelector("#toggleRaf");
const speedControl = document.querySelector("#speedControl");

let running = true;
let lastTime = 0;
let t = 0;

function drawFrame(delta) {
  const speed = Number(speedControl.value);
  t += delta * 0.001 * speed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#f8fbfc");
  gradient.addColorStop(1, "#e8f3f1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(21, 33, 47, 0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= canvas.height; y += 34) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  const x = 54 + ((Math.sin(t * 1.25) + 1) / 2) * (canvas.width - 108);
  const y = canvas.height / 2 + Math.sin(t * 2.4) * 42;
  const radius = 20 + Math.sin(t * 3) * 5;

  ctx.beginPath();
  ctx.moveTo(42, canvas.height / 2);
  for (let i = 0; i <= canvas.width - 84; i += 8) {
    const px = 42 + i;
    const py = canvas.height / 2 + Math.sin(i * 0.035 + t * 2.2) * 28;
    ctx.lineTo(px, py);
  }
  ctx.strokeStyle = "#0f766e";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#f97316";
  ctx.shadowColor = "rgba(249, 115, 22, 0.38)";
  ctx.shadowBlur = 22;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#15212f";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.fillText("state + time -> next frame", 26, 34);
}

function loop(now) {
  if (!lastTime) {
    lastTime = now;
  }

  const delta = Math.min(now - lastTime, 48);
  lastTime = now;

  if (running) {
    drawFrame(delta);
    requestAnimationFrame(loop);
  }
}

toggleButton.addEventListener("click", () => {
  running = !running;
  toggleButton.textContent = running ? "暫停" : "播放";

  if (running) {
    lastTime = 0;
    requestAnimationFrame(loop);
  }
});

drawFrame(16);
requestAnimationFrame(loop);
