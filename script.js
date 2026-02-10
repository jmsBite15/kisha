// Create floating hearts background
function createBackgroundHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🩷'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-float';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (4 + Math.random() * 4) + 's';
            heart.style.animationDelay = (Math.random() * 2) + 's';
            container.appendChild(heart);

            // Remove and recreate for continuous effect
            heart.addEventListener('animationend', () => {
                heart.remove();
                createSingleHeart();
            });
        }, i * 400);
    }
}

function createSingleHeart() {
    const container = document.getElementById('heartsBg');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🩷'];
    
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
        createSingleHeart();
    });
}

// Position no button initially
function positionNoButton(btn) {
    const card = document.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    
    // Position to the right of the card initially
    btn.style.left = (cardRect.right + 20) + 'px';
    btn.style.top = (cardRect.top + cardRect.height / 2) + 'px';
    
    // Make sure it's visible
    keepInViewport(btn);
}

// Click counters for each screen
let noClickCount1 = 0;
let noClickCount2 = 0;

// Different texts for the No button
const noTexts1 = ['No', 'No no', 'Ayaw ko', 'Hindi talaga', 'Sige na please', 'Bakit ayaw mo? 🥺', 'Pretty please?', 'Last chance na!', 'Sure ka lang?', 'Think again 💔'];
const noTexts2 = ['Um let me think…', 'Hmm...', 'Ayoko nga', 'Di ko alam eh', 'Baka next time', 'Sige na please 🥺', 'Para sa akin?', 'Last na to!'];

// Begging/Pleading GIFs - changes as user clicks No more (using simple direct URLs)
const beggingGifs1 = [
    'gif1/g1.gif',
    'gif1/g2.gif',
    'gif1/g3.gif',
    'gif1/g4.gif',
    'gif1/g5.gif',
    'gif1/g6.gif',
    'gif1/g7.gif',
    'gif1/g8.gif',
];

const beggingGifs2 = [
    'gif2/g1.gif',
    'gif2/g2.gif',
    'gif2/g3.gif',
    'gif2/g4.gif',
    'gif2/g5.gif',
    'gif2/g6.gif',
    'gif2/g7.gif',
    'gif2/g8.gif',
];

// Change GIF based on click count
function changeGif(screenNum, clickCount) {
    if (screenNum === 1) {
        const gif = document.getElementById('gif1');
        const gifIndex = Math.min(clickCount, beggingGifs1.length - 1);
        gif.src = beggingGifs1[gifIndex];
    } else {
        const gif = document.getElementById('gif2');
        const gifIndex = Math.min(clickCount, beggingGifs2.length - 1);
        gif.src = beggingGifs2[gifIndex];
    }
}

// Handle No button click
function handleNoClick(screenNum) {
    if (screenNum === 1) {
        noClickCount1++;
        const noBtn = document.getElementById('noBtn1');
        const yesBtn = document.getElementById('yesBtn1');
        
        // Change text
        if (noClickCount1 < noTexts1.length) {
            noBtn.textContent = noTexts1[noClickCount1];
        }
        
        // Change GIF to begging/pleading
        changeGif(1, noClickCount1);
        
        // Grow Yes button
        growYesButton(yesBtn, noClickCount1);
        
        // Move No button
        runAway(noBtn);
    } else {
        noClickCount2++;
        const noBtn = document.getElementById('noBtn2');
        const yesBtn = document.getElementById('yesBtn2');
        
        // Change text
        if (noClickCount2 < noTexts2.length) {
            noBtn.textContent = noTexts2[noClickCount2];
        }
        
        // Change GIF to begging/pleading
        changeGif(2, noClickCount2);
        
        // Grow Yes button
        growYesButton(yesBtn, noClickCount2);
        
        // Move No button
        runAway(noBtn);
    }
}

// Make Yes button grow
function growYesButton(btn, clickCount) {
    const baseSize = 1;
    const growthFactor = 0.1;
    const maxScale = 1.8;
    
    const newScale = Math.min(baseSize + (clickCount * growthFactor), maxScale);
    btn.style.transform = `scale(${newScale})`;
    btn.style.zIndex = '50';
}

// Make button run away inside the card only
function runAway(btn) {
    const card = document.querySelector('.card');
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    
    // Button dimensions
    const btnWidth = btn.offsetWidth || 100;
    const btnHeight = btn.offsetHeight || 45;
    
    // Safe padding from card edges
    const padding = 15;
    
    // Calculate safe bounds inside card
    const maxX = cardWidth - btnWidth - padding;
    const maxY = cardHeight - btnHeight - padding;
    
    // Generate new random position inside card
    let newX = Math.random() * (maxX - padding) + padding;
    let newY = Math.random() * (maxY - padding) + padding;
    
    // Clamp to safe bounds
    newX = Math.max(padding, Math.min(newX, maxX));
    newY = Math.max(padding, Math.min(newY, maxY));
    
    // Apply absolute position relative to card
    btn.style.position = 'absolute';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
}

function keepInViewport(btn) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = btn.getBoundingClientRect();
    
    let left = parseFloat(btn.style.left) || btnRect.left;
    let top = parseFloat(btn.style.top) || btnRect.top;
    
    if (left + btnRect.width > viewportWidth - 10) {
        left = viewportWidth - btnRect.width - 20;
    }
    if (left < 10) left = 20;
    if (top + btnRect.height > viewportHeight - 10) {
        top = viewportHeight - btnRect.height - 20;
    }
    if (top < 10) top = 20;
    
    btn.style.left = left + 'px';
    btn.style.top = top + 'px';
}

// Navigate between screens
function goToScreen(screenNum) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // Show target screen
    document.getElementById('screen' + screenNum).classList.add('active');
    
    // Handle runaway buttons
    const noBtn1 = document.getElementById('noBtn1');
    const noBtn2 = document.getElementById('noBtn2');
    
    if (screenNum === 2) {
        noBtn1.style.display = 'none';
        // Reset noBtn2 to inline position
        noBtn2.classList.remove('runaway');
        noBtn2.style.left = '';
        noBtn2.style.top = '';
    } else if (screenNum === 3) {
        noBtn1.style.display = 'none';
        noBtn2.style.display = 'none';
    }
}

// Show final celebration
function showFinal() {
    goToScreen(4);
    document.getElementById('noBtn1').style.display = 'none';
    document.getElementById('noBtn2').style.display = 'none';
    
    // Create confetti
    createConfetti();
    
    // Create celebration hearts
    createCelebrationHearts();
    
    // Change background to more festive
    document.body.style.background = 'linear-gradient(135deg, #ff99cc 0%, #ff69b4 50%, #ff1493 100%)';
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff69b4', '#ff1493', '#ff99cc', '#ffb6c1', '#fff', '#ffd700', '#ff6b6b', '#ee82ee'];
    const shapes = ['❤️', '💕', '💖', '✨', '🌟', '💗'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Randomly choose between shape emoji or colored square
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (15 + Math.random() * 20) + 'px';
                confetti.style.width = 'auto';
                confetti.style.height = 'auto';
            } else {
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.width = (8 + Math.random() * 8) + 'px';
                confetti.style.height = (8 + Math.random() * 8) + 'px';
            }
            
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';
            
            container.appendChild(confetti);
            
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }, i * 30);
    }
    
    // Continue confetti for a while
    setTimeout(() => {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (15 + Math.random() * 20) + 'px';
                confetti.style.width = 'auto';
                confetti.style.height = 'auto';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
                container.appendChild(confetti);
                
                confetti.addEventListener('animationend', () => {
                    confetti.remove();
                });
            }, i * 60);
        }
    }, 2000);
}

function createCelebrationHearts() {
    const container = document.getElementById('celebrationHearts');
    const positions = [
        { left: '5%', top: '10%' },
        { left: '90%', top: '15%' },
        { left: '8%', top: '80%' },
        { left: '88%', top: '75%' },
        { left: '15%', top: '45%' },
        { left: '85%', top: '50%' },
    ];
    
    positions.forEach((pos, i) => {
        const heart = document.createElement('div');
        heart.className = 'big-heart';
        heart.textContent = ['💖', '💕', '💗', '💝', '💓', '💘'][i % 6];
        heart.style.left = pos.left;
        heart.style.top = pos.top;
        heart.style.animationDelay = (i * 0.2) + 's';
        container.appendChild(heart);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts background
    createBackgroundHearts();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const noBtn1 = document.getElementById('noBtn1');
        const noBtn2 = document.getElementById('noBtn2');
        
        if (noBtn1.classList.contains('runaway')) {
            keepInViewport(noBtn1);
        }
        if (noBtn2.classList.contains('runaway')) {
            keepInViewport(noBtn2);
        }
    });
});
