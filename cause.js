// Reasons database (7 Romantic Reasons + 1 Special Ending Teaser)
const reasons = [
    { 
        text: "The way your eyes light up and you smile whenever you're truly happy. It's my absolute favorite view. 💖", 
        emoji: "👑"
    },
    { 
        text: "How incredibly deeply you care for me and look out for me every single day. I'm so obsessed with you. 🌸", 
        emoji: "💗"
    },
    { 
        text: "Our late-night conversations and all those inside chats that only the two of us understand. 🦋✨", 
        emoji: "💕"
    },
    { 
        text: "You are my biggest supporter, Mage Manika, always pushing me to be the best version of myself. 🥳", 
        emoji: "🌟"
    },
    { 
        text: "Your pure heart and the endless warmth you give me. You make the world a much better place. 🦋", 
        emoji: "❤️"
    },
    { 
        text: "How even on my hardest days, just hearing your voice makes everything completely fine. ⭐", 
        emoji: "🧸"
    },
    { 
        text: "Because you are not just my wifey, you are my home, my peace, and my entire world. ♾️", 
        emoji: "🌹"
    },
    { 
        text: "And honestly... there are millions of other reasons why I love you. Ask me to tell you the rest when we are free..! 😉 Every second with you is a blessing.Ummmmmmmmmmh..❤️", 
        emoji: "👀💞"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card (GIF layout removed for a perfect mobile fit)
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    card.appendChild(text);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter UI nicely
        if (currentReasonIndex === reasons.length - 1) {
            reasonCounter.textContent = `And the most important part... ✨`;
        } else {
            reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length - 1}`;
        }
        
        currentReasonIndex++;

        // When the final teaser card is revealed, transform the button to move to the next page
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                backgroundColor: "#ff477e", // Subtle aesthetic pop
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                }
            });
        }

        // Create floating background magic
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Smoothly transitions to the finale page when clicked after the teaser
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐', '🎈', '🌹', '❤️'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px'; 
    document.body.appendChild(element);

    gsap.to(element, {
        y: -600,
        duration: Math.random() * 10 + 8,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor interaction
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.2
        });
    });
}

// Continuous background floating magic
setInterval(createFloatingElement, 1500);
