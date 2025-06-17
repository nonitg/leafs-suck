// The exact date and time when the Leafs last won the Stanley Cup
// May 2, 1967 - Game 6 at Maple Leaf Gardens
const LEAFS_LAST_CUP = new Date('1967-05-02T22:00:00'); // Approximate end time of game

// The date when Mitch Marner left the Leafs (July 1, 2025 - Free Agency Day)
const MARNER_LEFT_DATE = new Date('2025-07-01T00:00:00'); // Free agency starts at midnight

// Array of trolling messages to rotate through
const TROLL_MESSAGES = [
    "Still waiting... 🍃",
    "Maybe next century? 😂",
    "The drought continues... 💧",
    "Hope springs eternal... and dies 💀",
    "It's been 84 years... actually more 👴",
    "Your grandkids will see it... maybe 🤡",
    "At least they're consistent! 📉",
    "The math is brutal 📊",
    "Tick... tock... tick... tock ⏰",
    "Pain is tradition in Toronto 😭",
    "Currently experiencing technical difficulties 🚧",
    "404: Cup not found 🔍"
];

// Array of Marner-specific troll messages
const MARNER_TROLL_MESSAGES = [
    "Finally free from the pressure! 🎉",
    "$11M well spent... elsewhere 💸",
    "Someone else's playoff problem now! 😌",
    "No more choking in blue and white! 🥅",
    "The cap space feels so good 💰",
    "Addition by subtraction 📉➡️📈",
    "Can't hurt you anymore, Toronto 🩹",
    "Living his best life post-Leafs ✈️",
    "Probably winning cups somewhere else 🏆",
    "The curse follows players, not teams... right? 🤞",
    "Freedom tastes like victory 🥳",
    "Escaped before the next collapse 🏃‍♂️💨"
];

let trollMessageIndex = 0;
let marnerTrollMessageIndex = 0;

// Function to calculate time difference for Marner
function calculateMarnerTimeDifference() {
    const now = new Date();
    const difference = now - MARNER_LEFT_DATE;
    
    // If the date hasn't passed yet, show zeros or a "coming soon" message
    if (difference < 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            isComingSoon: true
        };
    }
    
    // Calculate each unit
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
        days,
        hours,
        minutes,
        isComingSoon: false
    };
}

// Function to calculate time difference
function calculateTimeDifference() {
    const now = new Date();
    const difference = now - LEAFS_LAST_CUP;
    
    // Calculate each unit
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Total days for the "Days of Suffering" stat
    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalDays
    };
}

// Function to update the display
function updateDisplay() {
    const timeDiff = calculateTimeDifference();
    
    // Update time units
    document.getElementById('years').textContent = timeDiff.years.toLocaleString();
    document.getElementById('months').textContent = timeDiff.months;
    document.getElementById('days').textContent = timeDiff.days;
    document.getElementById('hours').textContent = timeDiff.hours;
    document.getElementById('minutes').textContent = timeDiff.minutes;
    document.getElementById('seconds').textContent = timeDiff.seconds;
    
    // Update Marner countdown
    const marnerDiff = calculateMarnerTimeDifference();
    if (marnerDiff.isComingSoon) {
        document.getElementById('marner-days').textContent = "Soon™";
        document.getElementById('marner-hours').textContent = "Soon™";
        document.getElementById('marner-minutes').textContent = "Soon™";
    } else {
        document.getElementById('marner-days').textContent = marnerDiff.days.toLocaleString();
        document.getElementById('marner-hours').textContent = marnerDiff.hours;
        document.getElementById('marner-minutes').textContent = marnerDiff.minutes;
    }
    
    // Update stats
    document.getElementById('total-days').textContent = timeDiff.totalDays.toLocaleString();
    
    // Calculate approximate playoff rounds lost (assuming they make playoffs 60% of the time and lose in round 1 mostly)
    const playoffRounds = Math.floor(timeDiff.years * 0.6 * 1.2); // Rough estimate
    document.getElementById('playoff-rounds').textContent = playoffRounds;
    
    // Generations (assuming 25 years per generation)
    const generations = Math.floor(timeDiff.years / 25);
    document.getElementById('generations').textContent = generations;
    
    // Add some visual effects
    addRandomGlitch();
}

// Function to add random visual glitch effects for extra trolling
function addRandomGlitch() {
    if (Math.random() < 0.1) { // 10% chance every second
        const numbers = document.querySelectorAll('.time-unit .number');
        numbers.forEach(number => {
            number.style.animation = 'none';
            setTimeout(() => {
                number.style.animation = 'smoothCountUp 0.5s ease-out';
            }, 10);
        });
    }
}

// Function to rotate troll messages
function rotateTrollMessage() {
    const messageElement = document.getElementById('troll-message');
    messageElement.style.opacity = '0';
    
    setTimeout(() => {
        messageElement.textContent = TROLL_MESSAGES[trollMessageIndex];
        messageElement.style.opacity = '1';
        trollMessageIndex = (trollMessageIndex + 1) % TROLL_MESSAGES.length;
    }, 300);
}

// Function to rotate Marner troll messages
function rotateMarnerTrollMessage() {
    const messageElement = document.getElementById('marner-message');
    messageElement.style.opacity = '0';
    
    setTimeout(() => {
        messageElement.textContent = MARNER_TROLL_MESSAGES[marnerTrollMessageIndex];
        messageElement.style.opacity = '1';
        marnerTrollMessageIndex = (marnerTrollMessageIndex + 1) % MARNER_TROLL_MESSAGES.length;
    }, 300);
}

// Function to add dynamic background particles (for extra visual flair)
function createFloatingLeaf() {
    const leaf = document.createElement('div');
    leaf.innerHTML = '🍃';
    leaf.style.position = 'fixed';
    leaf.style.fontSize = Math.random() * 20 + 10 + 'px';
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.top = '-50px';
    leaf.style.zIndex = '-1';
    leaf.style.opacity = '0.3';
    leaf.style.pointerEvents = 'none';
    leaf.style.transition = 'all ' + (Math.random() * 3 + 2) + 's linear';
    
    document.body.appendChild(leaf);
    
    // Animate the leaf falling
    setTimeout(() => {
        leaf.style.top = '100vh';
        leaf.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
    }, 100);
    
    // Remove the leaf after animation
    setTimeout(() => {
        if (leaf.parentNode) {
            leaf.parentNode.removeChild(leaf);
        }
    }, 5000);
}

// Function to show fun facts based on the time elapsed
function showContextualFacts() {
    const timeDiff = calculateTimeDifference();
    const factContainer = document.querySelector('.facts-container');
    
    // Add some dynamic facts based on the current drought length
    const dynamicFacts = [
        `🗓️ It's been ${timeDiff.totalDays.toLocaleString()} days since they won`,
        `📅 That's ${Math.floor(timeDiff.totalDays / 7).toLocaleString()} weeks of waiting`,
        `⏰ Approximately ${Math.floor(timeDiff.totalDays * 24).toLocaleString()} hours of suffering`,
        `💸 Millions of dollars spent on hope and disappointment`,
        `🎪 ${timeDiff.years} seasons of false promises`,
        `👶 Fans have been born, grown up, and had kids of their own`
    ];
    
    // Occasionally add a dynamic fact
    if (Math.random() < 0.3) {
        const existingFacts = factContainer.children.length;
        if (existingFacts < 12) { // Don't add too many
            const newFact = document.createElement('div');
            newFact.className = 'fact-item';
            newFact.textContent = dynamicFacts[Math.floor(Math.random() * dynamicFacts.length)];
            newFact.style.animation = 'fadeInUp 0.5s ease-out';
            factContainer.appendChild(newFact);
        }
    }
}

// Function to add some easter eggs
function addEasterEggs() {
    // Konami code easter egg (up, up, down, down, left, right, left, right, B, A)
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((key, index) => key === konamiSequence[index])) {
            // Easter egg triggered!
            document.body.style.filter = 'hue-rotate(180deg)';
            alert('🎉 You found the secret! But the Leafs still haven\'t won since 1967... 😭');
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            konamiCode = [];
        }
    });
}

// Function to handle mobile interactions
function addMobileInteractions() {
    // Add touch effects for mobile users
    const interactiveElements = document.querySelectorAll('.time-unit, .stat-card, .achievement, .fact-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = '';
        });
    });
}

// Initialize the app
function init() {
    // Update display immediately
    updateDisplay();
    
    // Set up intervals
    setInterval(updateDisplay, 1000); // Update every second
    setInterval(rotateTrollMessage, 5000); // Change message every 5 seconds
    setInterval(rotateMarnerTrollMessage, 4000); // Change Marner message every 4 seconds (slightly offset)
    setInterval(createFloatingLeaf, 3000); // Create a floating leaf every 3 seconds
    setInterval(showContextualFacts, 30000); // Add contextual facts every 30 seconds
    
    // Add easter eggs and mobile interactions
    addEasterEggs();
    addMobileInteractions();
    
    // Add a special effect on load
    setTimeout(() => {
        document.querySelector('.main-title').style.animation = 'subtleGlow 3s ease-in-out infinite alternate';
    }, 2000);
    
    console.log('🍃 Leafs Drought Tracker initialized!');
    console.log(`Last cup: ${LEAFS_LAST_CUP.toLocaleDateString()}`);
    console.log(`Days since: ${calculateTimeDifference().totalDays}`);
    console.log('😭 The pain is real...');
}

// Start the app when the page loads
document.addEventListener('DOMContentLoaded', init);

// Add some fun console messages for developers who inspect the code
console.log('%c🍃 LEAFS DROUGHT TRACKER 🍃', 'font-size: 20px; color: #0066cc; font-weight: bold;');
console.log('%cMade with 💔 for your Leafs-loving friend', 'font-size: 14px; color: #666;');
console.log('%cFun fact: The Leafs haven\'t won since before JavaScript was invented!', 'font-size: 12px; color: #ff6666;');

// Export for potential use in other scripts
window.LeafsDroughtTracker = {
    calculateTimeDifference,
    updateDisplay,
    LEAFS_LAST_CUP
}; 