// Countdown Timer
function updateCountdown() {
  const now = new Date();
  const christmas = new Date(now.getFullYear(), 11, 24); // Dec 25

  // If Christmas has passed this year, calculate for next year
  if (now > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }

  const diff = christmas - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Snowfall Effect
const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

function createSnowflake() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 4 + 1;
  const speed = Math.random() * 2 + 0.5;
  snowflakes.push({ x, y, size, speed });
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.beginPath();

  snowflakes.forEach((flake, index) => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
    flake.y += flake.speed;

    // Reset snowflake when it goes off screen
    if (flake.y > canvas.height) {
      snowflakes[index] = { x: Math.random() * canvas.width, y: 0, size: flake.size, speed: flake.speed };
    }
  });

  ctx.fill();
}

function animateSnow() {
  drawSnowflakes();
  requestAnimationFrame(animateSnow);
}

// Initialize Snowflakes
for (let i = 0; i < 100; i++) {
  createSnowflake();
}

animateSnow();

const audio = document.getElementById('backgroundMusic');

// Play music after user interaction
function playMusic() {
  audio.play().catch((error) => {
    console.log('Autoplay failed:', error);
  });
}

// Add an event listener for user interaction
document.addEventListener('click', playMusic, { once: true });

// Optionally log a message for debugging
console.log("Music will play on user interaction.");