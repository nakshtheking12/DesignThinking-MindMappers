// ==========================================
// 0. FIREBASE CONFIGURATION INITIALIZATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyBb3i9CgilhLNB3n3HHo2lJSekmzbg82ls",
  authDomain: "holistic-horizons.firebaseapp.com",
  projectId: "holistic-horizons",
  storageBucket: "holistic-horizons.firebasestorage.app",
  messagingSenderId: "412829952964",
  appId: "1:412829952964:web:417a1e43f4ee98f1dbd291",
  measurementId: "G-7C8W3FGPVJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let isGateLoginMode = true;
let currentUserRole = "user"; 

document.addEventListener("DOMContentLoaded", () => {
    // Existing startup behavior is preserved.
    listenToAnonymousStories();
    addMindMappersPageEnhancements();
});

// ==========================================
// 0A. PAGE INSIGHTS & BRAND WATERMARKS
// ==========================================
function addMindMappersPageEnhancements() {
    const pageDetails = {
        'welcome-page': {
            eyebrow: 'A QUIET PLACE TO BEGIN',
            title: 'Your inner journey can be built one gentle moment at a time.',
            text: 'Use MindMappers as a pause between the noise of the day and the wisdom you already carry.',
            stats: [['01', 'Pause', 'before reacting'], ['02', 'Notice', 'what is present'], ['03', 'Choose', 'one kind step']]
        },
        'about-page': {
            eyebrow: 'THE MINDMAPPERS APPROACH',
            title: 'Technology with more humanity in the details.',
            text: 'We bring reflection, mindful action, and supportive connection into one calm digital space.',
            stats: [['01', 'Reflect', 'with curiosity'], ['02', 'Connect', 'without pressure'], ['03', 'Grow', 'at your pace']]
        },
        'services-page': {
            eyebrow: 'YOUR PERSONAL PATTERN MAP',
            title: 'Track patterns, not perfection.',
            text: 'A mood entry is a snapshot, not a label. Over time, small check-ins can help you see what supports your balance.',
            stats: [['09', 'Mood paths', 'to choose from'], ['07', 'Days', 'in each report'], ['01', 'Daily check-in', 'is enough to begin']]
        },
        'self-help': {
            eyebrow: 'RETURN TO THE PRESENT',
            title: 'Your breath is always available as a first step.',
            text: 'Use a short grounding exercise whenever you need to soften the pace, settle your attention, or reset your focus.',
            stats: [['04', 'Slow breaths', 'to begin'], ['05', 'Senses', 'to ground with'], ['01', 'Present moment', 'to return to']]
        },
        'join-page': {
            eyebrow: 'FIND YOUR WELLNESS ROOM',
            title: 'Support feels different for everyone.',
            text: 'Explore movement, conversation, rhythm, and creativity until you find the kind of encouragement that feels natural.',
            stats: [['04', 'Rooms', 'to explore'], ['∞', 'Ways', 'to participate'], ['0', 'Pressure', 'to perform']]
        },
        'reflections-page': {
            eyebrow: 'WORDS THAT MAKE SPACE',
            title: 'Your story may help someone feel less alone.',
            text: 'Share honestly and anonymously, or simply read with compassion. Every reflection helps make the community more human.',
            stats: [['100%', 'Anonymous', 'by design'], ['01', 'Safe post', 'at a time'], ['∞', 'Perspectives', 'to discover']]
        },
        'rewards-shop-page': {
            eyebrow: 'CELEBRATE YOUR PROGRESS',
            title: 'Small rewards can honour meaningful habits.',
            text: 'Use your wellness coins as gentle reminders that showing up for yourself is already worth celebrating.',
            stats: [['100', 'Starter coins', 'for new journeys'], ['01', 'Mindful choice', 'at a time'], ['∞', 'Small wins', 'to celebrate']]
        },
        'customer-care': {
            eyebrow: 'HELP IS PART OF THE JOURNEY',
            title: 'You never have to figure out the platform alone.',
            text: 'Reach out when you need clarity, assistance, or a second pair of eyes. Our care desk is here to make things easier.',
            stats: [['01', 'Support desk', 'for your questions'], ['24h', 'Typical reply', 'for non-urgent queries'], ['∞', 'Care', 'for every member']]
        },
        'contact-page': {
            eyebrow: 'WE ARE HERE TO LISTEN',
            title: 'A thoughtful message can be the beginning of a helpful conversation.',
            text: 'Choose the channel that feels easiest and let us know how we can make your MindMappers experience more supportive.',
            stats: [['04', 'Team contacts', 'available'], ['09–18', 'Hours', 'EST support window'], ['01', 'Conversation', 'can begin today']]
        },
        'profile-page': {
            eyebrow: 'MAKE THIS SPACE YOURS',
            title: 'Your profile is a reflection, not a performance.',
            text: 'Choose the name, image, and words that feel most like you. You can update them whenever your journey changes.',
            stats: [['01', 'Personal space', 'to shape'], ['∞', 'Ways', 'to express yourself'], ['100%', 'Your pace', 'your story']]
        }
    };

    Object.entries(pageDetails).forEach(([pageId, detail]) => {
        const page = document.getElementById(pageId);
        if (!page || page.querySelector('.mindmappers-page-additions')) return;

        const statsMarkup = detail.stats.map(([value, label, caption]) => `
            <div class="page-insight-stat">
                <strong>${value} ${label}</strong>
                <span>${caption}</span>
            </div>
        `).join('');

        page.insertAdjacentHTML('beforeend', `
            <div class="mindmappers-page-additions">
                <div class="page-insight-strip" aria-label="MindMappers page insight">
                    <div class="page-insight-copy">
                        <span class="page-insight-eyebrow">${detail.eyebrow}</span>
                        <h3>${detail.title}</h3>
                        <p>${detail.text}</p>
                    </div>
                    ${statsMarkup}
                </div>
                <div class="page-watermark" aria-label="MindMappers website watermark">
                    <div class="page-watermark-brand">
                        <img class="page-watermark-logo" src="mindmappers.jpeg" alt="MindMappers logo" loading="lazy" decoding="async">
                        <span><strong>MINDMAPPERS</strong><span>Seek the Inner Self</span></span>
                    </div>
                    <div class="page-watermark-contact">
                        <a href="mailto:mindey.support@gmail.com">mindey.support@gmail.com</a>
                        <div class="page-watermark-note">MindMappers Wellness Space · Reflect Gently · Grow Steadily</div>
                    </div>
                </div>
            </div>
        `);
    });
}

// ==========================================
// 1. NEURAL BRAIN INTERACTIVITY ENGINE
// ==========================================
function triggerBrainPulse(lobeName) {
    const feedbackText = document.getElementById('brain-feedback-text');
    const brainHalo = document.querySelector('.brain-halo');
    
    if (feedbackText) {
        feedbackText.style.color = '#00f2fe';
        feedbackText.innerHTML = `⚡ Synapses Firing: <strong>${lobeName}</strong>`;
    }

    if (brainHalo) {
        brainHalo.style.background = 'radial-gradient(circle, rgba(244, 63, 94, 0.6) 0%, rgba(0, 242, 254, 0) 75%)';
        setTimeout(() => {
            brainHalo.style.background = 'radial-gradient(circle, rgba(0, 242, 254, 0.3) 0%, rgba(147, 51, 234, 0) 70%)';
        }, 1200);
    }
}

// ==========================================
// 2. FIREBASE SECURITY ONBOARDING GATEWAY
// ==========================================
function toggleGateMode(event) {
    event.preventDefault();
    isGateLoginMode = !isGateLoginMode;
    
    const title = document.getElementById('gate-title');
    const subtitle = document.getElementById('gate-subtitle');
    const submitBtn = document.getElementById('gate-submit-btn');
    const toggleLink = document.getElementById('gate-toggle-link');
    const usernameGroup = document.getElementById('username-group');
    
    if (isGateLoginMode) {
        title.innerText = "Welcome Back";
        subtitle.innerText = "Please enter your credentials to access your dashboard.";
        submitBtn.innerText = "Log In";
        toggleLink.innerText = "Create one here";
        usernameGroup.style.display = "none";
    } else {
        title.innerText = "Create Account";
        subtitle.innerText = "Sign up below to launch your personal mindfulness tracking panel.";
        submitBtn.innerText = "Get Started";
        toggleLink.innerText = "Log in here";
        usernameGroup.style.display = "block";
    }
}

function handleGateAuth(event) {
    event.preventDefault();
    
    const email = document.getElementById('gate-email').value;
    const password = document.getElementById('gate-password').value;
    const username = document.getElementById('gate-username').value.trim();
    
    if (isGateLoginMode) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(err => alert(`Authentication Failed: ${err.message}`));
    } else {
        if (!username) { alert("Please provide a screen username handle."); return; }
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                return db.collection('users').doc(cred.user.uid).set({
                    username: username,
                    avatarSeed: username,
                    bio: "Welcome to my profile reflection block.",
                    role: "user",
                    coins: 100, 
                    inventory: [],
                    coinRewardClaims: {}
                });
            })
            .catch(err => alert(`Registration Failed: ${err.message}`));
    }
}

firebase.auth().onAuthStateChanged((user) => {
    const authGate = document.getElementById('auth-gate');
    const mainApp = document.getElementById('main-app-content');
    
    if (user) {
        db.collection('users').doc(user.uid).onSnapshot((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                
                currentUserRole = userData.role || "user";
                document.getElementById('nav-username').innerText = userData.username;
                
                const uiCoinDisplays = document.querySelectorAll('.user-coin-balance');
                uiCoinDisplays.forEach(elem => {
                    elem.innerText = userData.coins !== undefined ? userData.coins : 0;
                });

                const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${userData.avatarSeed}`;
                document.getElementById('nav-avatar').src = avatarUrl;
                
                if(document.getElementById('profile-display-name')) {
                    document.getElementById('profile-display-name').value = userData.username;
                    document.getElementById('profile-avatar-seed').value = userData.avatarSeed;
                    document.getElementById('profile-bio').value = userData.bio;
                    document.getElementById('edit-avatar-preview').src = avatarUrl;
                }

                routeTicketSystemView();
                renderInventoryList(userData.inventory || []);
                refreshTodayMoodStatus(user);
                refreshDailyWellnessFeatures(user);
                refreshCoinRewardButtons(userData);
            }
        });

        authGate.style.display = "none";
        mainApp.style.display = "block";
        showPage('welcome-page'); 
        
    } else {
        authGate.style.display = "flex";
        mainApp.style.display = "none";
    }
});

function handleSignOut() {
    firebase.auth().signOut().then(() => {
        document.getElementById('gate-form').reset();
    });
}

// ==========================================
// 3. PROFILE MODIFICATION CONTROLLERS
// ==========================================
function updateAvatarPreview(seedValue) {
    const cleanSeed = seedValue.trim() || "default";
    document.getElementById('edit-avatar-preview').src = `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanSeed}`;
}

function saveUserProfile(event) {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const newName = document.getElementById('profile-display-name').value.trim();
    const newSeed = document.getElementById('profile-avatar-seed').value.trim();
    const newBio = document.getElementById('profile-bio').value.trim();
    
    db.collection('users').doc(user.uid).set({
        username: newName,
        avatarSeed: newSeed,
        bio: newBio
    }, { merge: true })
    .then(() => {
        return db.collection("support_tickets")
            .where("userEmail", "==", user.email)
            .get();
    })
    .then((querySnapshot) => {
        const batch = db.batch();
        querySnapshot.forEach((doc) => {
            batch.update(doc.ref, { userName: newName });
        });
        return batch.commit();
    })
    .then(() => {
        alert("Profile configurations updated successfully!");
        showPage('welcome-page');
    })
    .catch(err => alert(`Error writing parameters: ${err.message}`));
}

// ==========================================
// 4. PAGE NAVIGATION SYSTEM
// ==========================================
function showPage(pageId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active-page');
    });

    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active-page');
    }

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick') === `showPage('${pageId}')`) {
            button.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 5. DYNAMIC AFFIRMATION GENERATOR
// ==========================================
const affirmations = [
    "You are capable of handling whatever comes your way today.",
    "Your mistakes do not define your journey; your resilience does.",
    "Breathe out the chaos, breathe in your inner strength.",
    "Small progress is still progress. Be incredibly proud of your steps.",
    "You belong here, your voice matters, and you are entirely enough.",
    "Give yourself the permission to rest, recharge, and reset today.",
    "Changing your mind is a strength, not a weakness.",
    "You deserve peace, even on the days when life feels overwhelming and uncertain."
];

function generateAffirmation() {
    const displayElement = document.getElementById('affirmation-display');
    if (displayElement) {
        const randomIndex = Math.floor(Math.random() * affirmations.length);
        displayElement.style.opacity = 0;
        setTimeout(() => {
            displayElement.innerText = `"${affirmations[randomIndex]}"`;
            displayElement.style.opacity = 1;
        }, 200);
    }
}

// ==========================================
// 6. FIREBASE MOOD LOGGER (CLEANED DUP)
// ==========================================
function getLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setMoodButtonsLocked(isLocked) {
    document.querySelectorAll('.mood-btn').forEach((button) => {
        button.disabled = isLocked;
        button.classList.toggle('is-locked', isLocked);
        button.setAttribute('aria-disabled', String(isLocked));
    });
}

function showTodayMoodState(moodValue) {
    const statusElement = document.getElementById('mood-status');
    const limitNotice = document.getElementById('mood-limit-notice');
    setMoodButtonsLocked(true);
    if (statusElement) statusElement.innerText = `Today's mood is already logged as "${moodValue}". ✨`;
    if (limitNotice) limitNotice.innerText = 'You have completed today\'s mood check-in. Come back tomorrow to log a new mood.';
}

const dailyWellnessLibrary = {
    'Wonderful 😊': { suggestionTitle: 'Carry the good feeling forward', suggestion: 'Name one thing that helped you feel wonderful today, then make a little room for it again tomorrow.', musicTitle: 'Bright morning acoustics', musicStyle: 'Acoustic · feel-good · light', musicEmoji: '🌞', musicSearch: 'uplifting acoustic feel good playlist' },
    'Neutral 😐': { suggestionTitle: 'Let neutral be enough', suggestion: 'Try a two-minute check-in: notice your breath, relax your shoulders, and choose one uncomplicated next step.', musicTitle: 'A steady focus flow', musicStyle: 'Lo-fi · soft beats · focus', musicEmoji: '🌿', musicSearch: 'lofi focus music no lyrics' },
    'Stressed 😓': { suggestionTitle: 'Make the next minute softer', suggestion: 'Unclench your jaw, take four slower breaths, and step away from one source of noise if you can.', musicTitle: 'A quiet exhale', musicStyle: 'Piano · slow ambient · restorative', musicEmoji: '🌊', musicSearch: 'calm piano music stress relief' },
    'Calm 😌': { suggestionTitle: 'Protect this pocket of calm', suggestion: 'Keep your calm close by writing down one thought you do not need to solve right now.', musicTitle: 'Still water soundscape', musicStyle: 'Nature · ambient · spacious', musicEmoji: '🪷', musicSearch: 'peaceful nature ambient music' },
    'Happy 😄': { suggestionTitle: 'Share a little brightness', suggestion: 'Send a kind message or notice one small detail that made you smile. Joy grows when it is witnessed.', musicTitle: 'A sunny little reset', musicStyle: 'Indie pop · warm · upbeat', musicEmoji: '✨', musicSearch: 'happy feel good indie playlist' },
    'Low 😔': { suggestionTitle: 'Choose care over pressure', suggestion: 'Drink some water, do one gentle stretch, and let today be measured by kindness rather than productivity.', musicTitle: 'A gentle companion', musicStyle: 'Soft guitar · comforting · slow', musicEmoji: '🤍', musicSearch: 'comforting gentle acoustic music' },
    'Anxious 😟': { suggestionTitle: 'Return to what is here', suggestion: 'Name five things you can see, four you can feel, and one breath you can make a little longer.', musicTitle: 'Grounding frequencies', musicStyle: 'Binaural · minimal · slow', musicEmoji: '🌙', musicSearch: 'grounding meditation music anxiety relief' },
    'Energized ⚡': { suggestionTitle: 'Give your energy a direction', suggestion: 'Pick one meaningful task for the next 15 minutes, then pause before deciding what comes next.', musicTitle: 'Intentional momentum', musicStyle: 'Instrumental · rhythmic · focused', musicEmoji: '⚡', musicSearch: 'energizing instrumental focus music' },
    'Grateful 🙏': { suggestionTitle: 'Turn gratitude into an anchor', suggestion: 'Write one specific detail you appreciated today. Specific memories become places you can return to.', musicTitle: 'A thankful pause', musicStyle: 'Meditative · piano · warm', musicEmoji: '🌸', musicSearch: 'peaceful gratitude meditation music' }
};

const moodActivityLibrary = {
    'Wonderful 😊': ['Write down what made today feel good', 'Share one kind message with someone', 'Take a joyful 5-minute movement break'],
    'Neutral 😐': ['Try a three-minute mindful stretch', 'Make a warm drink without multitasking', 'Choose one simple task to finish'],
    'Stressed 😓': ['Do four slow breaths with a longer exhale', 'Relax your jaw and roll your shoulders', 'Take a screen-free water break'],
    'Calm 😌': ['Sit quietly and notice five sounds', 'Write one thought you can release', 'Enjoy a slow walk without your phone'],
    'Happy 😄': ['Capture one detail you want to remember', 'Move to one song that lifts you up', 'Send a small note of appreciation'],
    'Low 😔': ['Drink water and do one gentle stretch', 'Wrap up in something comfortable', 'Read one encouraging reflection'],
    'Anxious 😟': ['Name five things you can see', 'Press both feet into the floor for 20 seconds', 'Breathe in for four and out for six'],
    'Energized ⚡': ['Choose one meaningful 15-minute task', 'Turn your energy into a creative sketch', 'Pause and check what your body needs'],
    'Grateful 🙏': ['Write three specific things you appreciate', 'Notice one person who helped you recently', 'Create a tiny gratitude voice note']
};

let moodAudioContext = null;
let moodSoundscapeNodes = [];
let moodSoundscapeTimer = null;
let activeSoundscapeMood = '';
let calmGameTimer = null;
let calmGameScore = 0;

function renderMoodActivities(moodValue) {
    const list = document.getElementById('mood-activities-list');
    const intro = document.getElementById('activities-intro');
    if (!list) return;
    const activities = moodActivityLibrary[moodValue] || ['Take three slow breaths and notice your shoulders', 'Write one sentence about how you feel', 'Stretch gently for two minutes'];
    if (intro) intro.innerText = moodValue ? `Small, low-pressure ideas selected for your ${moodValue.toLowerCase()} check-in.` : 'Log your mood to unlock a small activity designed for this moment.';
    list.innerHTML = activities.map((activity, index) => `<button class="activity-chip" type="button" onclick="completeMoodActivity(this)"><span>${['🌿', '🫶', '✨'][index]}</span>${activity}<strong>＋</strong></button>`).join('');
}

function completeMoodActivity(button) {
    if (!button) return;
    button.classList.toggle('activity-complete');
    const marker = button.querySelector('strong');
    if (marker) marker.innerText = button.classList.contains('activity-complete') ? '✓' : '＋';
}

let breathingActivityTimer = null;
let breathingActivitySeconds = 0;
let focusResetTimer = null;
let focusResetSeconds = 120;
const gratitudePrompts = [
    'What is one small thing that made today a little easier?',
    'Which person, place, or moment brought you a little comfort recently?',
    'What is something your body did for you today that you appreciate?',
    'What is one quiet detail you would like to remember from this week?'
];

function updateToolkitMood(moodValue) {
    const label = document.getElementById('toolkit-mood-label');
    if (label) label.innerText = moodValue ? `For ${moodValue}` : 'Personalized gently';
}

function openServiceSubpage(pageId) {
    const home = document.getElementById('toolkit-home');
    const pages = document.querySelectorAll('.service-subpage-card');
    if (home) home.style.display = 'none';
    pages.forEach((page) => page.classList.toggle('service-subpage-active', page.id === pageId));
    const target = document.getElementById(pageId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeServiceSubpage() {
    const home = document.getElementById('toolkit-home');
    const pages = document.querySelectorAll('.service-subpage-card');
    pages.forEach((page) => page.classList.remove('service-subpage-active'));
    if (home) { home.style.display = 'block'; home.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}

const activityDetailLibrary = {
    breathing: { icon: '🌬️', eyebrow: '60-SECOND RESET', title: 'Calm Breathing', text: 'Let your breath become a small anchor. Inhale gently, hold without strain, then make your exhale a little longer.', steps: ['Sit comfortably and soften your shoulders.', 'Follow four slow rounds of inhale, hold, exhale, and pause.', 'Notice one change in your body before you continue your day.'], action: 'Begin breathing practice' },
    gratitude: { icon: '📝', eyebrow: 'PRIVATE REFLECTION', title: 'Gratitude Pocket', text: 'Gratitude does not have to be big. Capture one ordinary detail that gave you comfort, support, or a moment of ease.', steps: ['Choose one specific detail from today.', 'Write it in one honest sentence.', 'Read it once without judging how it sounds.'], action: 'Write my reflection' },
    focus: { icon: '⏳', eyebrow: 'TWO-MINUTE RESET', title: 'Focus Reset', text: 'Step away from the noise for a moment, then return with one clear and kind next step.', steps: ['Put both feet on the floor.', 'Take two quiet minutes without switching tasks.', 'Choose one small thing to do next.'], action: 'Start focus reset' },
    grounding: { icon: '🌿', eyebrow: 'SENSORY ANCHOR', title: '5-4-3-2-1 Grounding', text: 'Use your senses as a gentle map back to the present moment, especially when thoughts feel loud or scattered.', steps: ['Name five things you can see.', 'Notice four textures, three sounds, two scents, and one taste.', 'Take one slow breath and look around again.'], action: 'Begin grounding' },
    movement: { icon: '✨', eyebrow: 'GENTLE ENERGY', title: 'Mindful Movement', text: 'Give your body a little space with a slow, pressure-free movement break.', steps: ['Roll your shoulders three times.', 'Stretch your arms upward and release them slowly.', 'Walk or sway for one song while noticing your breath.'], action: 'Start movement pause' }
};

function openActivityDetail(activityKey) {
    const activity = activityDetailLibrary[activityKey] || activityDetailLibrary.breathing;
    const content = document.getElementById('activity-detail-content');
    if (!content) return;
    content.innerHTML = `<div class="activity-detail-hero"><span class="activity-detail-icon">${activity.icon}</span><span class="services-feature-eyebrow">${activity.eyebrow}</span><h2>${activity.title}</h2><p>${activity.text}</p></div><div class="activity-detail-body"><h3>A gentle way to begin</h3><ol>${activity.steps.map((step) => `<li>${step}</li>`).join('')}</ol><div id="activity-detail-feedback" class="activity-detail-feedback">When you are ready, begin below.</div><button class="btn activity-detail-action" type="button" onclick="startActivityDetailSession('${activityKey}')">${activity.action} ✓</button></div>`;
    if (activityKey === 'focus') {
        const actionButton = content.querySelector('.activity-detail-action');
        if (actionButton) {
            actionButton.insertAdjacentHTML('beforebegin', '<div id="detail-focus-clock" class="activity-detail-timer">02:00</div>');
            actionButton.setAttribute('onclick', 'startDetailedFocusTimer()');
        }
    }
    if (activityKey === 'breathing') {
        const actionButton = content.querySelector('.activity-detail-action');
        if (actionButton) { actionButton.insertAdjacentHTML('beforebegin', '<div id="detail-breath-orb" class="activity-detail-breath-orb"><span id="detail-breath-clock">60s · Ready</span></div>'); actionButton.setAttribute('onclick', 'startDetailedBreathingTimer()'); }
    }
    if (activityKey === 'gratitude') {
        const actionButton = content.querySelector('.activity-detail-action');
        if (actionButton) { actionButton.insertAdjacentHTML('beforebegin', '<div class="detail-reflection-box"><p id="detail-gratitude-prompt">What is one small thing that made today a little easier?</p><textarea id="detail-gratitude-note" rows="3" placeholder="Write one gentle sentence..."></textarea><button class="toolkit-text-btn" type="button" onclick="showDetailGratitudePrompt()">New prompt ↻</button></div>'); actionButton.setAttribute('onclick', 'saveDetailGratitudeNote()'); }
    }
    if (activityKey === 'grounding') {
        const actionButton = content.querySelector('.activity-detail-action');
        if (actionButton) { actionButton.insertAdjacentHTML('beforebegin', '<div class="detail-grounding-checklist"><label><input type="checkbox"> I can see 5 things</label><label><input type="checkbox"> I can feel 4 textures</label><label><input type="checkbox"> I can hear 3 sounds</label><label><input type="checkbox"> I can notice 2 scents</label><label><input type="checkbox"> I can name 1 taste</label></div>'); actionButton.setAttribute('onclick', 'completeDetailGrounding()'); }
    }
    showPage('activity-detail-page');
}

let detailedFocusTimer = null;
let detailedFocusSeconds = 120;
let detailedBreathingTimer = null;
let detailedBreathingSeconds = 60;

function startDetailedFocusTimer() {
    const clock = document.getElementById('detail-focus-clock');
    const feedback = document.getElementById('activity-detail-feedback');
    const button = document.querySelector('.activity-detail-action');
    if (!clock || !button) return;
    if (detailedFocusTimer) {
        window.clearInterval(detailedFocusTimer);
        detailedFocusTimer = null;
        detailedFocusSeconds = 120;
        clock.innerText = '02:00';
        button.innerText = 'Start focus reset ✓';
        if (feedback) feedback.innerText = 'The reset is paused. Begin again whenever you are ready.';
        return;
    }
    detailedFocusSeconds = 120;
    button.innerText = 'Stop focus reset';
    if (feedback) feedback.innerText = 'The timer is running. Let these two minutes stay simple.';
    detailedFocusTimer = window.setInterval(() => {
        detailedFocusSeconds -= 1;
        const minutes = String(Math.floor(detailedFocusSeconds / 60)).padStart(2, '0');
        const seconds = String(detailedFocusSeconds % 60).padStart(2, '0');
        clock.innerText = `${minutes}:${seconds}`;
        if (detailedFocusSeconds <= 0) {
            window.clearInterval(detailedFocusTimer);
            detailedFocusTimer = null;
            clock.innerText = 'Done ✦';
            button.innerText = 'Start again';
            if (feedback) feedback.innerText = 'You completed your focus reset. Choose one kind next step.';
        }
    }, 1000);
}

function startDetailedBreathingTimer() {
    const clock = document.getElementById('detail-breath-clock');
    const orb = document.getElementById('detail-breath-orb');
    const feedback = document.getElementById('activity-detail-feedback');
    const button = document.querySelector('.activity-detail-action');
    if (!clock || !button) return;
    if (detailedBreathingTimer) {
        window.clearInterval(detailedBreathingTimer); detailedBreathingTimer = null; detailedBreathingSeconds = 60;
        clock.innerText = '60s · Ready'; if (orb) orb.className = 'activity-detail-breath-orb'; button.innerText = 'Begin breathing practice ✓';
        if (feedback) feedback.innerText = 'The practice is paused. Begin again when you are ready.'; return;
    }
    button.innerText = 'Stop breathing practice';
    if (feedback) feedback.innerText = 'Follow the circle gently. Do not force your breath.';
    const tick = () => {
        const elapsed = 60 - detailedBreathingSeconds; const cycle = elapsed % 16;
        let label = 'Exhale'; let className = 'activity-detail-breath-orb detail-breath-exhale';
        if (cycle < 4) { label = 'Inhale'; className = 'activity-detail-breath-orb detail-breath-inhale'; }
        else if (cycle < 8) { label = 'Hold'; className = 'activity-detail-breath-orb detail-breath-hold'; }
        else if (cycle >= 14) { label = 'Pause'; className = 'activity-detail-breath-orb detail-breath-pause'; }
        clock.innerText = `${detailedBreathingSeconds}s · ${label}`; if (orb) orb.className = className;
        if (detailedBreathingSeconds <= 0) { window.clearInterval(detailedBreathingTimer); detailedBreathingTimer = null; clock.innerText = 'Complete ✦'; button.innerText = 'Start again'; if (feedback) feedback.innerText = 'Beautiful. Notice one change in your body before continuing.'; }
        detailedBreathingSeconds -= 1;
    };
    tick(); detailedBreathingTimer = window.setInterval(tick, 1000);
}

function showDetailGratitudePrompt() {
    const prompt = document.getElementById('detail-gratitude-prompt');
    if (prompt) prompt.innerText = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];
}

function saveDetailGratitudeNote() {
    const note = document.getElementById('detail-gratitude-note'); const feedback = document.getElementById('activity-detail-feedback');
    if (!note || !note.value.trim()) { if (feedback) feedback.innerText = 'Write one gentle sentence before saving your reflection.'; return; }
    try { localStorage.setItem(`mindmappers_gratitude_${getLocalDateKey()}`, note.value.trim()); } catch (error) { console.warn('Local reflection could not be saved.'); }
    note.value = ''; if (feedback) feedback.innerText = 'Your reflection was saved privately on this device. Thank yourself for noticing. ✨';
}

function completeDetailGrounding() {
    const checks = [...document.querySelectorAll('.detail-grounding-checklist input')]; const feedback = document.getElementById('activity-detail-feedback');
    if (checks.length && checks.every((check) => check.checked)) { if (feedback) feedback.innerText = 'You completed the sensory anchor. Take one slow breath and notice the room around you.'; }
    else if (feedback) feedback.innerText = `You have noticed ${checks.filter((check) => check.checked).length} of 5 anchors. Continue gently.`;
}

function startActivityDetailSession(activityKey) {
    const feedback = document.getElementById('activity-detail-feedback');
    const button = document.querySelector('.activity-detail-action');
    const messages = { breathing: 'Start with a quiet inhale. You are allowed to take this slowly.', gratitude: 'Your reflection is yours. Write one sentence that feels true.', focus: 'The reset has started. Let the next two minutes stay uncomplicated.', grounding: 'Look around and name the first thing you can see.', movement: 'Begin with one shoulder roll. Small movement counts.' };
    if (feedback) feedback.innerText = messages[activityKey] || 'You have begun. Stay with this moment.';
    if (button) { button.innerText = 'Activity started ✓'; button.classList.add('activity-started'); }
}

function startBreathingActivity() {
    const button = document.getElementById('breathing-tool-btn');
    const phase = document.getElementById('breathing-phase');
    const orb = document.getElementById('breathing-orb');
    const text = document.getElementById('breathing-tool-text');
    if (breathingActivityTimer) { window.clearInterval(breathingActivityTimer); breathingActivityTimer = null; breathingActivitySeconds = 0; if (button) button.innerText = 'Start 60-second breath'; if (phase) phase.innerText = 'Ready'; if (orb) orb.className = 'breathing-orb'; if (text) text.innerText = 'Inhale, hold, exhale, and pause with a simple guided rhythm.'; return; }
    breathingActivitySeconds = 60;
    if (button) button.innerText = 'Stop breathing practice';
    if (text) text.innerText = 'Follow the circle without forcing your breath.';
    const tick = () => {
        const elapsed = 60 - breathingActivitySeconds;
        const cycle = elapsed % 16;
        let label = 'Exhale', className = 'breathing-orb breathing-exhale';
        if (cycle < 4) { label = 'Inhale'; className = 'breathing-orb breathing-inhale'; }
        else if (cycle < 8) { label = 'Hold'; className = 'breathing-orb breathing-hold'; }
        else if (cycle < 14) { label = 'Exhale'; className = 'breathing-orb breathing-exhale'; }
        else { label = 'Pause'; className = 'breathing-orb breathing-pause'; }
        if (phase) phase.innerText = `${label} · ${breathingActivitySeconds}s`;
        if (orb) orb.className = className;
        if (breathingActivitySeconds <= 0) { window.clearInterval(breathingActivityTimer); breathingActivityTimer = null; if (button) button.innerText = 'Start 60-second breath'; if (phase) phase.innerText = 'Complete ✦'; if (text) text.innerText = 'Beautiful. Notice how your body feels before moving on.'; }
        breathingActivitySeconds -= 1;
    };
    tick();
    breathingActivityTimer = window.setInterval(tick, 1000);
}

function showGratitudePrompt() {
    const prompt = document.getElementById('gratitude-prompt');
    if (prompt) prompt.innerText = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];
}

function saveGratitudeNote() {
    const note = document.getElementById('gratitude-note');
    if (!note || !note.value.trim()) { alert('Write one gentle sentence before saving your reflection.'); return; }
    try { localStorage.setItem(`mindmappers_gratitude_${getLocalDateKey()}`, note.value.trim()); } catch (error) { console.warn('Local reflection could not be saved.'); }
    note.value = '';
    const prompt = document.getElementById('gratitude-prompt');
    if (prompt) prompt.innerText = 'Saved privately on this device. Thank yourself for noticing. ✨';
}

function startFocusReset() {
    const clock = document.getElementById('focus-reset-clock');
    const button = document.getElementById('focus-reset-btn');
    if (focusResetTimer) { window.clearInterval(focusResetTimer); focusResetTimer = null; focusResetSeconds = 120; if (clock) clock.innerText = '02:00'; if (button) button.innerText = 'Start 2-minute reset'; return; }
    focusResetSeconds = 120;
    if (button) button.innerText = 'Stop reset';
    focusResetTimer = window.setInterval(() => {
        focusResetSeconds -= 1;
        const minutes = String(Math.floor(focusResetSeconds / 60)).padStart(2, '0');
        const seconds = String(focusResetSeconds % 60).padStart(2, '0');
        if (clock) clock.innerText = `${minutes}:${seconds}`;
        if (focusResetSeconds <= 0) { window.clearInterval(focusResetTimer); focusResetTimer = null; if (button) button.innerText = 'Start another reset'; if (clock) clock.innerText = 'Done ✦'; }
    }, 1000);
}

function getSoundscapeMood() {
    const moodTag = document.getElementById('daily-suggestion-mood');
    return moodTag && moodTag.innerText.indexOf('For ') === 0 ? moodTag.innerText.slice(4) : '';
}

function startMoodSoundscape() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) { const status = document.getElementById('soundscape-status'); if (status) status.innerText = 'Your browser does not support the soundscape player.'; return; }
    if (moodAudioContext && moodAudioContext.state === 'running') { updateSoundscapeControls(true); return; }
    if (moodAudioContext && moodAudioContext.state === 'suspended') { moodAudioContext.resume(); updateSoundscapeControls(true); return; }
    moodAudioContext = moodAudioContext || new AudioContextClass();
    moodAudioContext.resume();
    const mood = getSoundscapeMood();
    const settings = { 'Stressed 😓': [196, 261.63], 'Anxious 😟': [174.61, 233.08], 'Low 😔': [220, 293.66], 'Energized ⚡': [261.63, 329.63] }[mood] || [220, 277.18];
    const master = moodAudioContext.createGain();
    master.gain.setValueAtTime(0.0001, moodAudioContext.currentTime);
    master.gain.exponentialRampToValueAtTime(0.055, moodAudioContext.currentTime + 2);
    master.connect(moodAudioContext.destination);
    moodSoundscapeNodes = [master];
    settings.forEach((frequency, index) => { const oscillator = moodAudioContext.createOscillator(); const gain = moodAudioContext.createGain(); oscillator.type = index === 0 ? 'sine' : 'triangle'; oscillator.frequency.value = frequency; gain.gain.value = index === 0 ? 0.55 : 0.28; oscillator.connect(gain).connect(master); oscillator.start(); moodSoundscapeNodes.push(oscillator, gain); });
    activeSoundscapeMood = mood;
    moodSoundscapeTimer = window.setInterval(() => playSoundscapeNote(master, settings), 4300);
    updateSoundscapeControls(true);
}

function playSoundscapeNote(master, settings) {
    if (!moodAudioContext || moodAudioContext.state !== 'running') return;
    const note = moodAudioContext.createOscillator(); const gain = moodAudioContext.createGain();
    note.type = 'sine'; note.frequency.value = settings[Math.floor(Math.random() * settings.length)] * (Math.random() > 0.65 ? 2 : 1);
    gain.gain.setValueAtTime(0.0001, moodAudioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.08, moodAudioContext.currentTime + 0.12); gain.gain.exponentialRampToValueAtTime(0.0001, moodAudioContext.currentTime + 2.2);
    note.connect(gain).connect(master); note.start(); note.stop(moodAudioContext.currentTime + 2.3);
}

function toggleMoodSoundscape() { if (moodAudioContext && moodAudioContext.state === 'running') { moodAudioContext.suspend(); updateSoundscapeControls(false, true); } else startMoodSoundscape(); }

function stopMoodSoundscape() {
    if (moodSoundscapeTimer) window.clearInterval(moodSoundscapeTimer);
    moodSoundscapeTimer = null;
    moodSoundscapeNodes.forEach((node) => { try { if (node.stop) node.stop(); else node.disconnect(); } catch (error) {} });
    moodSoundscapeNodes = [];
    if (moodAudioContext) { moodAudioContext.close(); moodAudioContext = null; }
    updateSoundscapeControls(false, false);
}

function updateSoundscapeControls(isPlaying, isPaused = false) {
    const toggle = document.getElementById('soundscape-toggle'); const stop = document.getElementById('soundscape-stop'); const status = document.getElementById('soundscape-status');
    if (toggle) toggle.innerText = isPlaying ? '❚❚ Pause soundscape' : (isPaused ? '▶ Resume soundscape' : '▶ Start soundscape');
    if (stop) stop.disabled = !isPlaying && !isPaused;
    if (status) status.innerText = isPlaying ? `Playing a gentle ${activeSoundscapeMood || 'mood-based'} soundscape. Use Pause or Stop whenever you like.` : (isPaused ? 'Soundscape paused. Resume when you are ready.' : 'Soundscape stopped. Tap Start to play it again.');
}

function startCalmGame() {
    const target = document.getElementById('calm-game-target'); const message = document.getElementById('calm-game-message'); const start = document.getElementById('calm-game-start');
    calmGameScore = 0; if (document.getElementById('calm-game-score')) document.getElementById('calm-game-score').innerText = '0';
    if (start) start.innerText = 'Restart game'; if (message) message.innerText = 'Follow the glow. Breathe out as you tap.';
    if (target) { target.style.display = 'block'; moveCalmTarget(); }
    if (calmGameTimer) window.clearTimeout(calmGameTimer); calmGameTimer = window.setTimeout(endCalmGame, 60000);
}

function moveCalmTarget() { const board = document.getElementById('calm-game-board'); const target = document.getElementById('calm-game-target'); if (!board || !target) return; target.style.left = `${Math.floor(Math.random() * Math.max(1, board.clientWidth - 54))}px`; target.style.top = `${Math.floor(Math.random() * Math.max(1, board.clientHeight - 54))}px`; }
function catchCalmTarget() { const target = document.getElementById('calm-game-target'); if (!target || target.style.display === 'none') return; calmGameScore += 1; const score = document.getElementById('calm-game-score'); if (score) score.innerText = String(calmGameScore); moveCalmTarget(); }
function endCalmGame() { const target = document.getElementById('calm-game-target'); const message = document.getElementById('calm-game-message'); if (calmGameTimer) window.clearTimeout(calmGameTimer); calmGameTimer = null; if (target) target.style.display = 'none'; if (message) message.innerText = `Lovely work. You returned to the present ${calmGameScore} time${calmGameScore === 1 ? '' : 's'}.`; }

function renderDailyWellnessFeatures(moodValue) {
    const fallback = { suggestionTitle: 'Begin with a gentle check-in', suggestion: 'Choose the mood that feels closest to your experience and receive a small, personalized idea for the rest of your day.', musicTitle: 'Your calm playlist awaits', musicStyle: 'Ambient · instrumental · unhurried', musicEmoji: '🎶', musicSearch: 'calm instrumental music' };
    const feature = dailyWellnessLibrary[moodValue] || fallback;
    const suggestionTitle = document.getElementById('daily-suggestion-title');
    const suggestionText = document.getElementById('daily-suggestion-text');
    const suggestionMood = document.getElementById('daily-suggestion-mood');
    const musicTitle = document.getElementById('mood-music-title');
    const musicText = document.getElementById('mood-music-text');
    const musicEmoji = document.getElementById('mood-music-emoji');
    const musicTrack = document.getElementById('mood-music-track');
    const musicStyle = document.getElementById('mood-music-style');
    const musicLink = document.getElementById('mood-music-link');
    if (suggestionTitle) suggestionTitle.innerText = feature.suggestionTitle;
    if (suggestionText) suggestionText.innerText = feature.suggestion;
    if (suggestionMood) suggestionMood.innerText = moodValue ? `For ${moodValue}` : 'Ready when you are';
    if (musicTitle) musicTitle.innerText = feature.musicTitle;
    if (musicText) musicText.innerText = moodValue ? `A listening direction selected for your ${moodValue.toLowerCase()} check-in.` : 'Choose a mood above and we will suggest a listening direction for your next pause.';
    if (musicEmoji) musicEmoji.innerText = feature.musicEmoji;
    if (musicTrack) musicTrack.innerText = feature.musicTitle;
    if (musicStyle) musicStyle.innerText = feature.musicStyle;
    if (musicLink) musicLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(feature.musicSearch)}`;
    renderMoodActivities(moodValue);
    updateToolkitMood(moodValue);
}

function refreshDailyWellnessFeatures(user = firebase.auth().currentUser) {
    if (!user) { renderDailyWellnessFeatures(); return Promise.resolve(); }
    return db.collection('moods').doc(`${user.uid}_${getLocalDateKey()}`).get().then((doc) => {
        renderDailyWellnessFeatures(doc.exists ? doc.data().mood : '');
    }).catch((error) => {
        console.error('Error loading daily wellness features:', error);
        renderDailyWellnessFeatures();
    });
}

function refreshTodayMoodStatus(user = firebase.auth().currentUser) {
    const statusElement = document.getElementById('mood-status');
    const limitNotice = document.getElementById('mood-limit-notice');
    if (!user) {
        setMoodButtonsLocked(false);
        if (limitNotice) limitNotice.innerText = '';
        return Promise.resolve();
    }

    const moodDocId = `${user.uid}_${getLocalDateKey()}`;
    return db.collection('moods').doc(moodDocId).get().then((doc) => {
        if (doc.exists) {
            showTodayMoodState(doc.data().mood || 'a mood');
        } else {
            setMoodButtonsLocked(false);
            if (statusElement && statusElement.innerText.indexOf("already logged") !== -1) statusElement.innerText = '';
            if (limitNotice) limitNotice.innerText = 'One mood entry is available for today.';
        }
    }).catch((error) => {
        console.error('Error checking today\'s mood:', error);
        setMoodButtonsLocked(false);
        if (limitNotice) limitNotice.innerText = 'Mood availability could not be checked. Please try again.';
    });
}

function logMood(moodString) {
    const statusElement = document.getElementById('mood-status');
    const user = firebase.auth().currentUser;
    if (!user) {
        alert('Please log in before recording your mood.');
        return;
    }

    const dateKey = getLocalDateKey();
    const moodRef = db.collection('moods').doc(`${user.uid}_${dateKey}`);
    const userRef = db.collection('users').doc(user.uid);
    setMoodButtonsLocked(true);

    db.runTransaction(async (transaction) => {
        const moodSnapshot = await transaction.get(moodRef);
        const userSnapshot = await transaction.get(userRef);
        if (moodSnapshot.exists) {
            return { alreadyLogged: true, mood: moodSnapshot.data().mood || 'a mood' };
        }

        const userData = userSnapshot.exists ? userSnapshot.data() : {};
        const existingClaims = userData.coinRewardClaims || {};
        const currentCoins = Number(userData.coins) || 0;
        const moodRewardAlreadyClaimed = existingClaims.moodCheckin === dateKey;
        const moodRecord = {
            mood: moodString,
            dateKey: dateKey,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            userUid: user.uid
        };

        transaction.set(moodRef, moodRecord);
        if (userSnapshot.exists && !moodRewardAlreadyClaimed) {
            transaction.set(userRef, {
                coins: currentCoins + 15,
                coinRewardClaims: { ...existingClaims, moodCheckin: dateKey }
            }, { merge: true });
        }
        return { alreadyLogged: false, rewardAdded: !moodRewardAlreadyClaimed, coins: currentCoins + (moodRewardAlreadyClaimed ? 0 : 15) };
    }).then((result) => {
        if (result.alreadyLogged) {
            showTodayMoodState(result.mood);
            return;
        }
        if (statusElement) statusElement.innerText = result.rewardAdded
            ? `Saved securely: you logged "${moodString}" and earned 15 coins! ✨`
            : `Saved securely to cloud: you logged "${moodString}"! ✨`;
        const limitNotice = document.getElementById('mood-limit-notice');
        if (limitNotice) limitNotice.innerText = 'Today\'s mood check-in is complete. Come back tomorrow for a new entry.';
        triggerBrainPulse(`Mood Tracked: ${moodString}`);
        showTodayMoodState(moodString);
        renderDailyWellnessFeatures(moodString);
    }).catch((error) => {
        console.error('Firebase Mood Error: ', error);
        setMoodButtonsLocked(false);
        if (statusElement) statusElement.innerText = 'Unable to save your mood right now. Please try again.';
    });
}

function renderExpandedMoodReport(counts, totalLogs, isDemo = false) {
    const overview = document.getElementById('report-overview-grid');
    const chart = document.getElementById('mood-weekly-chart');
    const activityList = document.getElementById('report-activity-list');
    const moodStyles = {
        'Wonderful 😊': { label: 'Wonderful', color: '#34d399' }, 'Neutral 😐': { label: 'Neutral', color: '#94a3b8' }, 'Stressed 😓': { label: 'Stressed', color: '#fb7185' },
        'Calm 😌': { label: 'Calm', color: '#22d3ee' }, 'Happy 😄': { label: 'Happy', color: '#fbbf24' }, 'Low 😔': { label: 'Low', color: '#818cf8' },
        'Anxious 😟': { label: 'Anxious', color: '#c084fc' }, 'Energized ⚡': { label: 'Energized', color: '#fb923c' }, 'Grateful 🙏': { label: 'Grateful', color: '#f472b6' }
    };
    const entries = Object.entries(counts).filter(([, count]) => count > 0);
    const dominant = entries.slice().sort((a, b) => b[1] - a[1])[0];
    const positiveCount = (counts['Wonderful 😊'] || 0) + (counts['Happy 😄'] || 0) + (counts['Grateful 🙏'] || 0) + (counts['Calm 😌'] || 0);
    const positivePercent = totalLogs ? Math.round((positiveCount / totalLogs) * 100) : 0;
    if (overview) overview.innerHTML = `
        <div class="report-overview-item"><strong>${totalLogs}</strong><span>check-ins recorded</span></div>
        <div class="report-overview-item"><strong>${positivePercent}%</strong><span>positive or calm days</span></div>
        <div class="report-overview-item"><strong>${dominant ? (moodStyles[dominant[0]] || { label: 'Your main mood' }).label : 'No pattern yet'}</strong><span>most frequent mood${isDemo ? ' · demo' : ''}</span></div>
    `;
    if (chart) {
        const maximum = Math.max(1, ...entries.map(([, count]) => count));
        chart.innerHTML = entries.length ? entries.map(([mood, count]) => {
            const style = moodStyles[mood] || { label: String(mood).trim().slice(0, 12), color: '#64748b' };
            return `<div class="mood-chart-column"><span class="mood-chart-count">${count}</span><div class="mood-chart-bar" style="height:${Math.max(8, Math.round((count / maximum) * 112))}px;background:${style.color};" title="${style.label}: ${count}"></div><span class="mood-chart-label">${style.label}</span></div>`;
        }).join('') : '<p class="report-empty-chart">Log more moods to see your pattern chart.</p>';
    }
    const activityByMood = {
        'Stressed 😓': ['4 slow breaths', 'Shoulder release', 'Screen-free water break'], 'Anxious 😟': ['5-4-3-2-1 grounding', 'Feet-on-floor pause', 'Long-exhale breathing'],
        'Low 😔': ['Gentle stretch', 'Comforting reflection', 'One kind message'], 'Energized ⚡': ['15-minute focus', 'Creative sketch', 'Mindful movement'],
        'Wonderful 😊': ['Capture the moment', 'Share appreciation', 'Joyful movement'], 'Happy 😄': ['Save a happy detail', 'Dance to one song', 'Kindness note'],
        'Calm 😌': ['Notice five sounds', 'Quiet walk', 'Release one thought'], 'Grateful 🙏': ['Three gratitudes', 'Thank-you note', 'Gratitude voice note'], 'Neutral 😐': ['Mindful stretch', 'Warm drink pause', 'One simple task']
    };
    const activities = activityByMood[dominant ? dominant[0] : 'Neutral 😐'] || activityByMood['Neutral 😐'];
    if (activityList) activityList.innerHTML = activities.map((activity, index) => `<div class="report-activity-item"><strong>${['01', '02', '03'][index]} · ${activity}</strong>${['A quick reset you can complete in under two minutes.', 'A low-pressure way to support your current energy.', 'A small action that helps you return to yourself.'][index]}</div>`).join('');
}

function generateWeeklyMoodReport() {
    const user = firebase.auth().currentUser;
    const reportContainer = document.getElementById('weekly-report-container');
    const statsContainer = document.getElementById('mood-breakdown-stats');
    const suggestionsText = document.getElementById('weekly-suggestions-text');
    const dateRangeText = document.getElementById('report-date-range');

    if (!user) {
        alert("Please log in to view your personalized weekly mood report.");
        return;
    }

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    db.collection("moods")
        .where("userUid", "==", user.uid)
        .where("timestamp", ">=", sevenDaysAgo)
        .orderBy("timestamp", "desc")
        .get()
        .then((snapshot) => {
            reportContainer.style.display = "block";

            const now = new Date();
            dateRangeText.innerText = `Report generated for: ${sevenDaysAgo.toLocaleDateString()} - ${now.toLocaleDateString()}`;

            if (snapshot.empty) {
                statsContainer.innerHTML = `<p style="color: #64748b; font-style: italic;">No mood logs recorded in the past 7 days. Log your daily moods above to see weekly insights!</p>`;
                renderExpandedMoodReport({}, 0, false);
                suggestionsText.innerText = "Start logging your mood daily to receive tailored weekly recommendations and track your mental well-being trends.";
                return;
            }

            let counts = { 'Wonderful 😊': 0, 'Neutral 😐': 0, 'Stressed 😓': 0 };
            let totalLogs = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                if (counts[data.mood] !== undefined) {
                    counts[data.mood]++;
                } else {
                    counts[data.mood] = 1;
                }
                totalLogs++;
            });

            statsContainer.innerHTML = `
                <div style="background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;">
                    😊 Wonderful: ${counts['Wonderful 😊'] || 0}
                </div>
                <div style="background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;">
                    😐 Neutral: ${counts['Neutral 😐'] || 0}
                </div>
                <div style="background: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;">
                    😓 Stressed: ${counts['Stressed 😓'] || 0}
                </div>
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;">
                    📊 Total Entries: ${totalLogs}
                </div>
            `;

            renderExpandedMoodReport(counts, totalLogs, false);

            const wonderful = counts['Wonderful 😊'] || 0;
            const neutral = counts['Neutral 😐'] || 0;
            const stressed = counts['Stressed 😓'] || 0;

            if (stressed >= wonderful && stressed >= neutral) {
                suggestionsText.innerText = "It looks like stress has been prominent for you this past week. Consider trying our Calm-Zone breathing exercise under the 'Self Help' tab, or consider registering for a Yoga or Art Therapy class to help decompress.";
            } else if (wonderful >= neutral && wonderful >= stressed) {
                suggestionsText.innerText = "Fantastic week! You've maintained positive energy. Keep up your current healthy routines, share your positive reflections in our Community Forum, or reward yourself with a calm item from the Wellness Shop!";
            } else {
                suggestionsText.innerText = "Your week has been balanced and steady. Check out our community Zumba classes or try setting aside 10 minutes a day for guided mindfulness.";
            }

            // Additive support for the expanded mood library. The original
            // three summary cards remain visible, while new moods are added
            // underneath when they appear in the selected seven-day window.
            const originalMoodKeys = ['Wonderful 😊', 'Neutral 😐', 'Stressed 😓'];
            const additionalMoodStyles = {
                'Calm 😌': { background: '#ecfeff', border: '#a5f3fc', color: '#155e75', label: '😌 Calm' },
                'Happy 😄': { background: '#fffbeb', border: '#fde68a', color: '#92400e', label: '😄 Happy' },
                'Low 😔': { background: '#eef2ff', border: '#c7d2fe', color: '#3730a3', label: '😔 Low' },
                'Anxious 😟': { background: '#faf5ff', border: '#e9d5ff', color: '#6b21a8', label: '😟 Anxious' },
                'Energized ⚡': { background: '#fff7ed', border: '#fed7aa', color: '#9a3412', label: '⚡ Energized' },
                'Grateful 🙏': { background: '#fdf2f8', border: '#fbcfe8', color: '#9d174d', label: '🙏 Grateful' }
            };

            Object.entries(counts).forEach(([moodKey, moodCount]) => {
                if (originalMoodKeys.includes(moodKey) || !moodCount) return;
                const moodStyle = additionalMoodStyles[moodKey] || {
                    background: '#f8fafc', border: '#cbd5e1', color: '#334155', label: moodKey
                };
                statsContainer.insertAdjacentHTML('beforeend', `
                    <div style="background: ${moodStyle.background}; border: 1px solid ${moodStyle.border}; color: ${moodStyle.color}; padding: 10px 16px; border-radius: 8px; font-weight: 600; font-size: 0.9rem;">
                        ${moodStyle.label}: ${moodCount}
                    </div>
                `);
            });

            const expandedMoodEntries = Object.entries(counts).filter(([, moodCount]) => moodCount > 0);
            const expandedDominantMood = expandedMoodEntries.sort((a, b) => b[1] - a[1])[0];
            if (expandedDominantMood && !['Wonderful 😊', 'Neutral 😐', 'Stressed 😓'].includes(expandedDominantMood[0])) {
                const expandedSuggestions = {
                    'Calm 😌': "Calm moments are a strong foundation. Protect a little of that spaciousness with a short breathing practice or a quiet evening ritual.",
                    'Happy 😄': "Your positive moments are worth noticing. Consider writing down what supported them so you can return to those patterns later.",
                    'Low 😔': "Lower-energy days deserve care rather than criticism. Try a gentle grounding exercise, a supportive story, or reaching out to someone you trust.",
                    'Anxious 😟': "When anxiety shows up, return to one slow breath and one present-moment detail. The Calm-Zone under Self Help can help you take that pause.",
                    'Energized ⚡': "Use your energy intentionally by choosing one meaningful task, then give yourself permission to pause before taking on more.",
                    'Grateful 🙏': "Gratitude can become a quiet anchor. Capture one specific moment you appreciated and revisit it whenever your day feels noisy."
                };
                if (expandedSuggestions[expandedDominantMood[0]]) {
                    suggestionsText.innerText = expandedSuggestions[expandedDominantMood[0]];
                }
            }
        })
        .catch((error) => {
            console.error("Error generating mood report:", error);
            alert("Could not load weekly mood report. Please try again.");
        });
}

function generateDemoWeeklyMoodReport() {
    const reportContainer = document.getElementById('weekly-report-container');
    const statsContainer = document.getElementById('mood-breakdown-stats');
    const suggestionsText = document.getElementById('weekly-suggestions-text');
    const dateRangeText = document.getElementById('report-date-range');
    if (!reportContainer || !statsContainer || !suggestionsText || !dateRangeText) return;

    reportContainer.style.display = 'block';
    dateRangeText.innerText = 'DEMO REPORT · Sample week: Monday - Sunday';
    statsContainer.innerHTML = `
        <div class="demo-stat-card demo-stat-positive">😊 Wonderful: 2</div>
        <div class="demo-stat-card demo-stat-calm">😌 Calm: 2</div>
        <div class="demo-stat-card demo-stat-neutral">😐 Neutral: 1</div>
        <div class="demo-stat-card demo-stat-stressed">😓 Stressed: 1</div>
        <div class="demo-stat-card demo-stat-total">📊 Total Entries: 6</div>
    `;
    renderExpandedMoodReport({ 'Wonderful 😊': 2, 'Calm 😌': 2, 'Neutral 😐': 1, 'Stressed 😓': 1 }, 6, true);
    suggestionsText.innerText = 'This sample week shows a mostly steady pattern with several calm and positive moments. Keep noticing what supports those moments, and use the Calm-Zone or a mood-matched activity when stress appears.';
    reportContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function downloadCurrentWeeklyReport() {
    const reportContainer = document.getElementById('weekly-report-container');
    if (!reportContainer || reportContainer.style.display === 'none') {
        alert('Please generate a weekly report before downloading it.');
        return;
    }
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('The designed PDF tool is still loading. Please try the download button again in a moment.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = 210;
    const margin = 16;
    const contentWidth = pageWidth - (margin * 2);
    const colors = { navy: [15, 23, 42], blue: [36, 66, 118], cyan: [0, 168, 190], muted: [100, 116, 139], light: [241, 245, 249], green: [5, 150, 105], purple: [99, 75, 170] };
    const addText = (text, x, y, size, color = colors.navy, options = {}) => { pdf.setFont('helvetica', options.bold ? 'bold' : 'normal'); pdf.setFontSize(size); pdf.setTextColor(...color); pdf.text(String(text || ''), x, y, options); };
    const addWrapped = (text, x, y, width, size = 10, color = colors.muted, lineHeight = 5) => { pdf.setFont('helvetica', 'normal'); pdf.setFontSize(size); pdf.setTextColor(...color); const lines = pdf.splitTextToSize(String(text || ''), width); pdf.text(lines, x, y); return y + (lines.length * lineHeight); };
    const roundedCard = (x, y, w, h, fill = colors.light, stroke = [226, 232, 240]) => { pdf.setFillColor(...fill); pdf.setDrawColor(...stroke); pdf.roundedRect(x, y, w, h, 4, 4, 'FD'); };

    pdf.setFillColor(...colors.navy); pdf.rect(0, 0, pageWidth, 47, 'F');
    pdf.setFillColor(...colors.cyan); pdf.circle(183, 12, 23, 'F');
    addText('MINDMAPPERS', margin, 18, 21, [255, 255, 255], { bold: true });
    addText('WEEKLY MOOD REPORT', margin, 29, 9, [165, 243, 252], { bold: true });
    addText('Seek the Inner Self', margin, 38, 8, [203, 213, 225]);
    addText('✦', 178, 19, 18, [15, 23, 42], { bold: true });

    let y = 61;
    const range = document.getElementById('report-date-range');
    addText(range ? range.innerText : 'Your weekly reflection', margin, y, 9, colors.muted);
    y += 10;

    const overviewItems = [...document.querySelectorAll('#report-overview-grid .report-overview-item')];
    if (overviewItems.length) {
        const gap = 4; const cardWidth = (contentWidth - (gap * 2)) / 3;
        overviewItems.slice(0, 3).forEach((item, index) => { const strong = item.querySelector('strong'); const span = item.querySelector('span'); const x = margin + (index * (cardWidth + gap)); roundedCard(x, y, cardWidth, 22, [248, 250, 252]); addText(strong ? strong.innerText : '', x + 5, y + 9, 13, colors.blue, { bold: true }); addText(span ? span.innerText : '', x + 5, y + 17, 7.5, colors.muted); });
        y += 30;
    }

    const chartColumns = [...document.querySelectorAll('#mood-weekly-chart .mood-chart-column')];
    if (chartColumns.length) {
        roundedCard(margin, y, contentWidth, 61, [255, 255, 255]);
        addText('Mood pattern at a glance', margin + 7, y + 10, 11, colors.blue, { bold: true });
        const baseY = y + 51; const chartHeight = 31; const barWidth = Math.min(18, (contentWidth - 24) / chartColumns.length - 5); const maxCount = Math.max(...chartColumns.map((column) => Number(column.querySelector('.mood-chart-count')?.innerText || 1)));
        chartColumns.forEach((column, index) => { const count = Number(column.querySelector('.mood-chart-count')?.innerText || 0); const label = column.querySelector('.mood-chart-label')?.innerText || 'Mood'; const barHeight = Math.max(4, (count / maxCount) * chartHeight); const x = margin + 10 + (index * ((contentWidth - 20) / chartColumns.length)); pdf.setFillColor(...[79, 172, 254]); pdf.roundedRect(x, baseY - barHeight, barWidth, barHeight, 2, 2, 'F'); addText(String(count), x + (barWidth / 2), baseY - barHeight - 3, 7, colors.navy, { bold: true, align: 'center' }); addText(label, x + (barWidth / 2), baseY + 8, 6.5, colors.muted, { align: 'center' }); });
        y += 70;
    }

    const suggestion = document.getElementById('weekly-suggestions-text');
    roundedCard(margin, y, contentWidth, 35, [239, 246, 255], [191, 219, 254]);
    addText('Personalized wellness suggestion', margin + 7, y + 10, 10, colors.blue, { bold: true });
    addWrapped(suggestion ? suggestion.innerText : '', margin + 7, y + 19, contentWidth - 14, 8.5, colors.muted, 4.5);
    y += 44;

    const activities = [...document.querySelectorAll('#report-activity-list .report-activity-item')];
    if (activities.length) {
        addText('Short activities for this week', margin, y, 11, colors.blue, { bold: true }); y += 7;
        const activityWidth = (contentWidth - 8) / 3;
        activities.slice(0, 3).forEach((activity, index) => { const x = margin + (index * (activityWidth + 4)); roundedCard(x, y, activityWidth, 32, [248, 250, 252]); const title = activity.querySelector('strong'); addText(title ? title.innerText : `Activity ${index + 1}`, x + 5, y + 9, 8, colors.purple, { bold: true }); addWrapped(activity.innerText.replace(title ? title.innerText : '', '').trim(), x + 5, y + 17, activityWidth - 10, 7.2, colors.muted, 3.6); });
        y += 42;
    }
    addText('A small step is still progress. Keep reflecting gently.', margin, Math.min(y, 280), 8, colors.muted);
    pdf.setDrawColor(...colors.cyan); pdf.line(margin, 286, pageWidth - margin, 286);
    addText('MindMappers Wellness Space · mindey.support@gmail.com', margin, 293, 7.5, colors.muted);
    pdf.save(`mindmappers-weekly-report-${getLocalDateKey()}.pdf`);
}

function closeWeeklyReport() {
    const reportContainer = document.getElementById('weekly-report-container');
    if (!reportContainer) return;
    reportContainer.style.display = 'none';
    const statusElement = document.getElementById('mood-status');
    if (statusElement) statusElement.innerText = 'Your weekly report is saved in your reflection space. ✨';
}

// ==========================================
// 7. ANONYMOUS STORIES FORUM
// ==========================================
function postComment() {
    const textArea = document.getElementById('anonymous-text');
    if (!textArea) return;
    
    const commentText = textArea.value.trim();
    if (commentText === "") {
        alert("Please write something before publishing your story safely.");
        return;
    }
    
    db.collection("stories").add({
        text: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        textArea.value = ""; 
    })
    .catch((error) => {
        alert("Error saving story to database.");
        console.error("Firestore error: ", error);
    });
}

function listenToAnonymousStories() {
    const commentsList = document.getElementById('comments-list');
    if (!commentsList) return;

    db.collection("stories").orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
        commentsList.innerHTML = ""; 
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            const postCard = document.createElement('div');
            postCard.style.background = '#f8fafc';
            postCard.style.padding = '15px';
            postCard.style.borderRadius = '8px';
            postCard.style.marginTop = '15px';
            postCard.style.borderLeft = '4px solid #4facfe';
            
            postCard.innerHTML = `
                <p style="font-style: italic; color: #334155;">"${data.text}"</p>
                <small style="color: #94a3b8; display: block; margin-top: 5px; font-size: 0.75rem;">
                    Posted Anonymously
                </small>
            `;
            commentsList.appendChild(postCard);
        });
    });
}

// ==========================================
// 8. EVENT REGISTRATION
// ==========================================
function handleFormSubmit(event) {
    event.preventDefault();
    
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        alert("You must be signed in to submit an application request!");
        return;
    }
    
    const nameField = event.target.querySelectorAll('input')[0].value;
    const emailField = event.target.querySelectorAll('input')[1].value;
    const classSelection = event.target.querySelectorAll('select')[0].value;
    
    db.collection("registrations").doc(currentUser.uid).set({
        fullName: nameField,
        email: emailField,
        preferredClass: classSelection,
        userUid: currentUser.uid,
        status: "pending",
        registeredAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Success! Your community application registry has been submitted for review.");
        event.target.reset();
    })
    .catch((error) => {
        console.error("Registration Error: ", error);
    });
}

// ==========================================
// 9. CALM-ZONE MINI-GAME & NEURAL RESET
// ==========================================
function launchCalmZone(buttonElement, onComplete) {
    if (!buttonElement) return;
    
    buttonElement.innerText = "Inhale deeply... Hold... Exhale... 🧘";
    buttonElement.style.background = "linear-gradient(90deg, #11998e, #38ef7d)";
    
    triggerBrainPulse("Calm-Zone Vagus Nerve Reset Active");

    setTimeout(() => {
        buttonElement.innerText = "Launch Calm-Zone";
        buttonElement.style.background = "";
        if (typeof onComplete === 'function') onComplete();
    }, 4000);
    
    alert("Welcome to the Calm-Zone Grounding Reset:\n\n1. Deep breath in for 4 seconds.\n2. Hold your breath for 4 seconds.\n3. Release slowly for 4 seconds.\n\nRepeat until you feel centered.");
}   

// ==========================================
// 10. SHOP STORE FRONT & HELP DESK
// ==========================================
async function buyWebItem(itemName, itemPrice) {
    const user = firebase.auth().currentUser;
    if (!user) return alert("Please log in to make purchases from the storefront.");
    
    const userRef = db.collection("users").doc(user.uid);
    const doc = await userRef.get();
    if (!doc.exists) return;
    
    const userData = doc.data();
    const currentCoins = userData.coins || 0;
    const inventoryArray = userData.inventory || [];
    
    if (currentCoins < itemPrice) {
        alert(`❌ Insufficient Funds! You need ${itemPrice - currentCoins} more coins to checkout this asset.`);
        return;
    }
    
    if (inventoryArray.includes(itemName)) {
        alert("You already own this item configuration badge!");
        return;
    }
    
    await userRef.update({
        coins: currentCoins - itemPrice,
        inventory: firebase.firestore.FieldValue.arrayUnion(itemName)
    });
    
    alert(`🛍️ Purchase Complete! Acquired "${itemName}" for 🪙 ${itemPrice} coins.`);
}

function renderInventoryList(inventoryItems) {
    const lockerContainer = document.getElementById('user-inventory-shelf');
    if (!lockerContainer) return;
    
    if (inventoryItems.length === 0) {
        lockerContainer.innerHTML = `<p style="font-style: italic; color: #94a3b8; text-align: center; width: 100%; padding: 10px 0;">Your locker is currently empty.</p>`;
        return;
    }
    
    lockerContainer.innerHTML = inventoryItems.map(item => `
        <div style="background: #e2e8f0; border: 1px solid #cbd5e1; padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; color: #334155; display: inline-flex; align-items: center; gap: 6px;">
            💎 ${item}
        </div>
    `).join('');
}

function openTicketModal() { document.getElementById('ticket-modal').style.display = 'flex'; }
function closeTicketModal() { document.getElementById('ticket-modal').style.display = 'none'; }

function routeTicketSystemView() {
    const userSubmissionCard = document.getElementById('user-ticket-submission-card');
    const userDashboard = document.getElementById('user-tickets-dashboard');
    const staffDashboard = document.getElementById('staff-tickets-dashboard');
    const staffRegDashboard = document.getElementById('staff-registrations-dashboard');
    const joinCommunityFormCard = document.getElementById('join-community-form-card');
    const unlockedCommunityCard = document.getElementById('unlocked-community-card');

    if (currentUserRole === "staff") {
        if(userSubmissionCard) userSubmissionCard.style.display = "none";
        if(userDashboard) userDashboard.style.display = "none";
        if(joinCommunityFormCard) joinCommunityFormCard.style.display = "none";
        if(unlockedCommunityCard) unlockedCommunityCard.style.display = "none";
        if(staffDashboard) {
            staffDashboard.style.display = "block";
            staffDashboard.style.border = "2px solid #2563eb"; 
        }
        if(staffRegDashboard) staffRegDashboard.style.display = "block";
        
        listenToAllTicketsAsStaff();
        listenToApplicationsAsStaff();
    } else {
        if(userSubmissionCard) userSubmissionCard.style.display = "block";
        if(userDashboard) userDashboard.style.display = "block";
        if(staffDashboard) staffDashboard.style.display = "none";
        if(staffRegDashboard) staffRegDashboard.style.display = "none";
        
        listenToSupportTickets();
        listenToUserApplicationStatus();
    }
}

function submitSupportTicket(event) {
    event.preventDefault();
    
    const subject = document.getElementById('ticket-subject').value;
    const description = document.getElementById('ticket-description').value;
    const currentUser = firebase.auth().currentUser;
    const userEmail = currentUser ? currentUser.email : "anonymous@example.com";
    const userName = document.getElementById('nav-username') ? document.getElementById('nav-username').textContent : "User";

    if (!db) return alert("Database connection not ready!");

    const ticketData = {
        subject: subject,
        userEmail: userEmail,
        userName: userName,
        status: "Open",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        messages: [{ sender: userName, text: description, timestamp: new Date().toISOString() }]
    };

    db.collection("support_tickets").add(ticketData)
        .then(() => {
            document.getElementById('ticket-subject').value = '';
            document.getElementById('ticket-description').value = '';
            closeTicketModal();
        })
        .catch((error) => console.error("Error creating ticket: ", error));
}

function listenToSupportTickets() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    db.collection("support_tickets")
        .where("userEmail", "==", currentUser.email)
        .onSnapshot((snapshot) => {
            const listContainer = document.getElementById('active-tickets-list');
            if (!listContainer) return;

            if (snapshot.empty) {
                listContainer.innerHTML = `<p id="no-tickets-msg" style="text-align: center; color: #94a3b8; font-style: italic; padding: 20px 0;">You have no active support tickets open.</p>`;
                return;
            }

            listContainer.innerHTML = '';
            snapshot.forEach((doc) => {
                const ticket = doc.data();
                const ticketId = doc.id;
                const cardItem = document.createElement('div');
                setupTicketCardDOM(cardItem, ticket, ticketId, false);
                listContainer.appendChild(cardItem);
            });
        });
}

function listenToAllTicketsAsStaff() {
    db.collection("support_tickets")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
            const staffListContainer = document.getElementById('master-staff-tickets-list');
            if (!staffListContainer) return;

            if (snapshot.empty) {
                staffListContainer.innerHTML = `<p style="text-align: center; color: #94a3b8; font-style: italic; padding: 20px 0;">No support tickets found in database.</p>`;
                return;
            }

            staffListContainer.innerHTML = '';
            snapshot.forEach((doc) => {
                const ticket = doc.data();
                const ticketId = doc.id;
                const cardItem = document.createElement('div');
                setupTicketCardDOM(cardItem, ticket, ticketId, true);
                staffListContainer.appendChild(cardItem);
            });
        });
}

function setupTicketCardDOM(cardItem, ticket, ticketId, isStaffViewMode) {
    cardItem.style.background = '#ffffff';
    cardItem.style.border = isStaffViewMode ? '1px solid #cbd5e1' : '1px solid #e2e8f0';
    cardItem.style.borderRadius = '12px';
    cardItem.style.padding = '15px';
    cardItem.style.marginBottom = '5px';

    let messagesHtml = '';
    if (ticket.messages) {
        ticket.messages.forEach(msg => {
            const isStaffMessage = msg.isStaff || msg.sender === 'Admin';
            let alignRight = (isStaffViewMode && isStaffMessage) || (!isStaffViewMode && !isStaffMessage);
            const staffBadge = isStaffMessage ? `<span style="background: #e0f2fe; color: #0369a1; font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; margin-left: 6px; text-transform: uppercase;">Admin</span>` : '';

            messagesHtml += `
                <div style="margin-bottom: 8px; text-align: ${alignRight ? 'right' : 'left'};">
                    <span style="font-size: 0.75rem; font-weight: bold; color: ${isStaffMessage ? '#0369a1' : '#2563eb'}; display: block;">
                        ${msg.sender}${isStaffMessage ? staffBadge : ''}
                    </span>
                    <div style="display: inline-block; background: ${isStaffMessage ? '#e0f2fe' : '#eff6ff'}; padding: 8px 12px; border-radius: 8px; font-size: 0.88rem; max-width: 80%; text-align: left; margin-top: 2px; color:#1e293b;">
                        ${msg.text}
                    </div>
                </div>
            `;
        });
    }

    const ticketStatus = ticket.status || 'Open';
    const isTicketClosed = ticketStatus.toLowerCase() === 'closed';
    const statusClass = isTicketClosed ? 'ticket-status-closed' : 'ticket-status-open';
    const lifecycleActions = isStaffViewMode
        ? (isTicketClosed
            ? `<button class="ticket-lifecycle-btn ticket-reopen-btn" onclick="reopenSupportTicket('${ticketId}')"><span>↻</span> Reopen</button>`
            : `<button class="ticket-lifecycle-btn ticket-admin-close-btn" onclick="markTicketClosed('${ticketId}')"><span>✓</span> Mark as Closed</button>`)
            + `<button class="ticket-lifecycle-btn ticket-delete-btn" onclick="deleteAdminTicket('${ticketId}')"><span>⌫</span> Delete</button>`
        : `<button class="ticket-lifecycle-btn ticket-user-close-btn" onclick="closeUserTicket('${ticketId}')" ${isTicketClosed ? 'disabled' : ''}><span>✓</span> Close Ticket</button>
           <button class="ticket-lifecycle-btn ticket-delete-btn" onclick="deleteUserTicket('${ticketId}')"><span>⌫</span> Delete Ticket</button>`;

    cardItem.innerHTML = `
        <div class="ticket-card-header">
            <div class="ticket-heading-copy">
                <strong>${ticket.subject}</strong>
                <span>${isStaffViewMode ? `User: ${ticket.userName} · ${ticket.userEmail}` : 'Your support conversation'}</span>
            </div>
            <span class="ticket-status-badge ${statusClass}"><span></span>${ticketStatus}</span>
        </div>
        <div class="ticket-message-thread">
            ${messagesHtml}
        </div>
        <div class="ticket-reply-row">
            <input type="text" id="reply-input-${ticketId}" placeholder="Type reply message..." onkeydown="if(event.key === 'Enter') sendTicketReply('${ticketId}')">
            <button class="btn accent-btn ticket-send-btn" onclick="sendTicketReply('${ticketId}')">Send</button>
        </div>
        <div class="ticket-lifecycle-bar">
            <span class="ticket-lifecycle-label">Ticket actions</span>
            <div class="ticket-lifecycle-actions">${lifecycleActions}</div>
        </div>
    `;
}

function sendTicketReply(ticketId) {
    const inputElement = document.getElementById(`reply-input-${ticketId}`);
    const messageText = inputElement.value.trim();
    if (!messageText) return;

    const currentUser = firebase.auth().currentUser;
    let senderIdentity = document.getElementById('nav-username') ? document.getElementById('nav-username').textContent : "User";
    
    const newReply = {
        sender: senderIdentity,
        senderUid: currentUser ? currentUser.uid : null, 
        text: messageText,
        timestamp: new Date().toISOString(),
        isStaff: currentUserRole === "staff"
    };

    db.collection("support_tickets").doc(ticketId).update({
        messages: firebase.firestore.FieldValue.arrayUnion(newReply)
    }).then(() => { inputElement.value = ''; });
}

function closeUserTicket(ticketId) {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return alert("Please sign in to manage this ticket.");
    if (!confirm("Close this support ticket? You can still view it later, but it will be marked closed.")) return;

    db.collection("support_tickets").doc(ticketId).get().then((doc) => {
        if (!doc.exists || doc.data().userEmail !== currentUser.email) throw new Error("You can only close your own tickets.");
        return doc.ref.update({
            status: "Closed",
            closedAt: firebase.firestore.FieldValue.serverTimestamp(),
            closedBy: "user",
            closedByUid: currentUser.uid
        });
    }).catch((error) => {
        console.error("Error closing user ticket: ", error);
        alert(error.message || "Unable to close this ticket right now.");
    });
}

function deleteUserTicket(ticketId) {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return alert("Please sign in to manage this ticket.");
    if (!confirm("Delete this support ticket permanently? This action cannot be undone.")) return;

    db.collection("support_tickets").doc(ticketId).get().then((doc) => {
        if (!doc.exists || doc.data().userEmail !== currentUser.email) throw new Error("You can only delete your own tickets.");
        return doc.ref.delete();
    }).catch((error) => {
        console.error("Error deleting user ticket: ", error);
        alert(error.message || "Unable to delete this ticket right now.");
    });
}

function markTicketClosed(ticketId) {
    if (currentUserRole !== "staff") return alert("Only staff members can close tickets from the admin desk.");
    if (!confirm("Mark this ticket as closed?")) return;

    db.collection("support_tickets").doc(ticketId).update({
        status: "Closed",
        closedAt: firebase.firestore.FieldValue.serverTimestamp(),
        closedBy: "staff",
        closedByUid: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
    }).catch((error) => {
        console.error("Error closing ticket as staff: ", error);
        alert("Unable to mark this ticket as closed right now.");
    });
}

function reopenSupportTicket(ticketId) {
    if (currentUserRole !== "staff") return alert("Only staff members can reopen tickets from the admin desk.");
    if (!confirm("Reopen this support ticket?")) return;

    db.collection("support_tickets").doc(ticketId).update({
        status: "Open",
        reopenedAt: firebase.firestore.FieldValue.serverTimestamp(),
        reopenedBy: "staff",
        reopenedByUid: firebase.auth().currentUser ? firebase.auth().currentUser.uid : null
    }).catch((error) => {
        console.error("Error reopening ticket: ", error);
        alert("Unable to reopen this ticket right now.");
    });
}

function deleteAdminTicket(ticketId) {
    if (currentUserRole !== "staff") return alert("Only staff members can delete tickets from the admin desk.");
    if (!confirm("Delete this ticket permanently from the admin desk? This action cannot be undone.")) return;

    db.collection("support_tickets").doc(ticketId).delete().catch((error) => {
        console.error("Error deleting ticket as staff: ", error);
        alert("Unable to delete this ticket right now.");
    });
}

function listenToUserApplicationStatus() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    const formCard = document.getElementById('join-community-form-card');
    const communityCard = document.getElementById('unlocked-community-card');
    const reviewStatus = document.getElementById('community-review-status');
    const statusNotice = document.getElementById('join-status-notice');

    if (currentUserRole === "staff") {
        if (formCard) formCard.style.display = "none";
        if (communityCard) communityCard.style.display = "none";
        if (reviewStatus) reviewStatus.style.display = "none";
        return; 
    }

    db.collection("registrations").doc(currentUser.uid).onSnapshot((doc) => {
        if (doc.exists) {
            const appData = doc.data();
            if (appData.status === "approved") {
                if(formCard) formCard.style.display = "none";
                if(communityCard) communityCard.style.display = "block";
                if(reviewStatus) reviewStatus.style.display = "none";
            } else {
                // Keep the application as the only visible member view until approval.
                if(formCard) formCard.style.display = "block";
                if(communityCard) communityCard.style.display = "none";
                if (appData.status === "pending") {
                    if (reviewStatus) {
                        reviewStatus.className = "community-review-status is-pending";
                        reviewStatus.style.display = "flex";
                        reviewStatus.querySelector('strong').textContent = "Application Under Review";
                        reviewStatus.querySelector('p').textContent = "Our team is reviewing your community application. This page will update automatically once a decision is made.";
                    }
                    if (statusNotice) statusNotice.textContent = "Your application is currently being reviewed. You can update your details while you wait for approval.";
                } else if (appData.status === "rejected") {
                    if (reviewStatus) {
                        reviewStatus.className = "community-review-status is-rejected";
                        reviewStatus.style.display = "flex";
                        reviewStatus.querySelector('strong').textContent = "Application Needs an Update";
                        reviewStatus.querySelector('p').textContent = "Your previous application was not approved this time. You can submit a fresh application with the class that feels right for you.";
                    }
                    if (statusNotice) statusNotice.textContent = "You are welcome to submit a fresh application with the class that feels right for you.";
                }
            }
        } else {
            if(formCard) formCard.style.display = "block";
            if(communityCard) communityCard.style.display = "none";
            if(reviewStatus) reviewStatus.style.display = "none";
            if(statusNotice) statusNotice.textContent = "Register for upcoming live online workshops, thoughtful conversations, and mentor-led wellness sessions. Once your application is approved, your community room will appear here.";
        }
    });
}

function listenToApplicationsAsStaff() {
    db.collection("registrations").where("status", "==", "pending").onSnapshot((snapshot) => {
        const listContainer = document.getElementById('master-applications-list');
        if (!listContainer) return;

        if (snapshot.empty) {
            listContainer.innerHTML = `
                <div class="staff-empty-state">
                    <span class="staff-empty-icon">✓</span>
                    <strong>All caught up</strong>
                    <p>There are no community applications waiting for review right now.</p>
                </div>`;
            return;
        }

        const safeStaffText = (value) => String(value || '').replace(/[&<>\"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#039;' }[character]));
        listContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            const app = doc.data();
            const appId = doc.id;
            const applicantName = safeStaffText(app.fullName || 'Unnamed applicant');
            const applicantEmail = safeStaffText(app.email || 'Email not provided');
            const preferredClass = safeStaffText(app.preferredClass || 'No preference selected');
            const initials = (app.fullName || 'MM').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase();
            const appItem = document.createElement('article');
            appItem.className = 'staff-application-item';
            appItem.innerHTML = `
                <div class="staff-application-main">
                    <div class="staff-applicant-avatar" aria-hidden="true">${safeStaffText(initials)}</div>
                    <div class="staff-application-details">
                        <div class="staff-application-topline">
                            <strong>${applicantName}</strong>
                            <span class="staff-pending-pill"><span></span> Pending review</span>
                        </div>
                        <p class="staff-applicant-email">${applicantEmail}</p>
                        <div class="staff-application-meta"><span>Preferred community room</span><b>${preferredClass}</b></div>
                    </div>
                </div>
                <div class="staff-application-actions">
                    <button class="staff-approve-btn" onclick="reviewApplication('${appId}', 'approved')"><span>✓</span> Accept</button>
                    <button class="staff-reject-btn" onclick="reviewApplication('${appId}', 'rejected')"><span>×</span> Reject</button>
                </div>
            `;
            listContainer.appendChild(appItem);
        });
    });
}

function reviewApplication(appId, reviewStatus) {
    db.collection("registrations").doc(appId).update({ status: reviewStatus });
}

function leaveCommunity() {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) return;

    if (confirm("Are you sure you want to leave the community?")) {
        db.collection("registrations").doc(currentUser.uid).delete();
    }
}



// ==========================================
// 10. CUSTOM CURSOR + OPTIMIZED 3D PARALLAX (NO LAG)
// ==========================================
function initMindverse3D() {
    const customCursor = document.getElementById('customCursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const cursorIcon = document.querySelector('.cursor-icon');
    
    // Skip custom cursor on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;
    if (isTouch) {
        if (customCursor) customCursor.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
    }

    const thematicBg = document.querySelector('.thematic-bg');
    const mandalas = document.querySelectorAll('.mandala-3d');
    const auras = document.querySelectorAll('.aura');
    const mindSphere = document.querySelector('.mind-sphere-container');
    const lotus = document.querySelector('.lotus-3d');
    const chakraDots = document.querySelectorAll('.chakra-dot');
    const keywords = document.querySelectorAll('.kw');

    // Mouse tracking - only store values, no DOM work here
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    let normalizedX = 0;
    let normalizedY = 0;
    let rafId = null;
    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
        normalizedY = (e.clientY / window.innerHeight - 0.5) * 2;
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    function updateParallax() {
        // LERP for smooth ring follow - reduces lag feel
        const easeRing = 0.14;
        const easeDot = 0.45;
        
        ringX += (targetX - ringX) * easeRing;
        ringY += (targetY - ringY) * easeRing;
        dotX += (targetX - dotX) * easeDot;
        dotY += (targetY - dotY) * easeDot;

        if (!isTouch && cursorDot && cursorRing) {
            // Use translate3d for GPU
            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
            cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            if (cursorIcon) {
                cursorIcon.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
            }
        }

        // Optimized parallax - only update transforms, no layout thrashing
        // Group updates and use small factors
        if (thematicBg) {
            thematicBg.style.transform = `translateZ(0) rotateY(${normalizedX * 1.2}deg) rotateX(${-normalizedY * 1.2}deg)`;
        }

        // Batch mandalas - less frequent, lighter
        if (mandalas.length) {
            mandalas.forEach((el, i) => {
                const speed = 4 + i * 2; // reduced speed
                el.style.transform = `translate3d(${normalizedX * speed}px, ${normalizedY * speed}px, 0)`;
            });
        }

        // Auras - very light movement
        if (auras.length) {
            auras.forEach((el, i) => {
                const speed = 6 + i * 3;
                el.style.transform = `translate3d(${normalizedX * speed}px, ${normalizedY * speed}px, 0)`;
            });
        }

        if (mindSphere) {
            mindSphere.style.transform = `translate3d(${normalizedX * 10}px, ${normalizedY * 8}px, 0)`;
        }
        if (lotus) {
            lotus.style.transform = `translate3d(${normalizedX * -8}px, ${normalizedY * -6}px, 0) rotateY(${normalizedX * 6}deg)`;
        }

        ticking = false;
    }

    // RAF loop for cursor only - active on desktop and visible tabs to reduce lag.
    let cursorFrameId = null;
    function cursorLoop() {
        if (isTouch || document.hidden) {
            cursorFrameId = null;
            return;
        }

        // Ring already updates in updateParallax, but this keeps the follow motion smooth.
        const easeRing = 0.14;
        ringX += (targetX - ringX) * easeRing;
        ringY += (targetY - ringY) * easeRing;
        dotX += (targetX - dotX) * 0.5;
        dotY += (targetY - dotY) * 0.5;
        
        if (cursorDot) cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        if (cursorRing) cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        if (cursorIcon) cursorIcon.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        cursorFrameId = requestAnimationFrame(cursorLoop);
    }

    function startCursorLoop() {
        if (!isTouch && !document.hidden && !cursorFrameId) {
            cursorFrameId = requestAnimationFrame(cursorLoop);
        }
    }

    function stopCursorLoop() {
        if (cursorFrameId) cancelAnimationFrame(cursorFrameId);
        cursorFrameId = null;
    }

    if (!isTouch) startCursorLoop();
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopCursorLoop();
        else startCursorLoop();
    });

    // Hover effects - scale cursor on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .nav-btn, .btn, .chakra-dot, .mandala-3d, .card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isTouch) document.body.classList.add('cursor-hover');
            // Dynamic icon based on element
            if (cursorIcon) {
                if (el.classList.contains('chakra-dot')) {
                    cursorIcon.textContent = '☸️';
                } else if (el.classList.contains('nav-btn')) {
                    cursorIcon.textContent = '→';
                } else {
                    cursorIcon.textContent = 'ॐ';
                }
            }
        });
        el.addEventListener('mouseleave', () => {
            if (!isTouch) document.body.classList.remove('cursor-hover');
            if (cursorIcon) cursorIcon.textContent = 'ॐ';
        });
    });

    // Click pulse
    document.addEventListener('mousedown', () => {
        if (!isTouch) document.body.classList.add('cursor-click');
    });
    document.addEventListener('mouseup', () => {
        if (!isTouch) document.body.classList.remove('cursor-click');
    });

    // Chakra interaction - light
    chakraDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            const label = dot.getAttribute('data-label');
            const fb = document.getElementById('brain-feedback-text');
            if (fb && label) fb.innerHTML = `☸️ Chakra: <strong>${label}</strong>`;
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        if (customCursor) customCursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        if (customCursor) customCursor.style.opacity = '1';
    });

    // Reduced interval for random pulse - less CPU
    setInterval(() => {
        if (document.hidden) return; // pause when tab not visible
        const randomDot = chakraDots[Math.floor(Math.random() * chakraDots.length)];
        if (randomDot) {
            randomDot.style.transition = 'box-shadow 0.4s ease';
            randomDot.style.boxShadow = '0 0 24px currentColor, 0 0 40px currentColor';
            setTimeout(() => { randomDot.style.boxShadow = ''; }, 600);
        }
    }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
    initMindverse3D();
});

function initAuthGate3D() {
    const gateCard = document.querySelector('.gate-card-split');
    const gateBranding = document.querySelector('.gate-branding');
    const gateLogoWrap = document.querySelector('.gate-logo-wrap');
    const gateAuras = document.querySelectorAll('.gate-aura');
    const gateMandalas = document.querySelectorAll('.gate-mandala');
    const gateFeatures = document.querySelectorAll('.gfeat');

    if (!gateCard) return;

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let raf = null;

    gateCard.addEventListener('mousemove', (e) => {
        const rect = gateCard.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        targetX = (e.clientX - cx) / rect.width; // -0.5 to 0.5
        targetY = (e.clientY - cy) / rect.height;
        if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });

    gateCard.addEventListener('mouseleave', () => {
        targetX = 0; targetY = 0;
        if (!raf) raf = requestAnimationFrame(update);
    });

    function update() {
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;

        if (gateBranding) {
            gateBranding.style.transform = `translateZ(0) rotateY(${mouseX * 4}deg) rotateX(${-mouseY * 3}deg)`;
        }
        if (gateLogoWrap) {
            gateLogoWrap.style.transform = `translate3d(${mouseX * 18}px, ${mouseY * 12}px, 30px) rotateY(${mouseX * 10}deg)`;
        }
        gateAuras.forEach((a, i) => {
            const s = 10 + i * 6;
            a.style.transform = `translate3d(${mouseX * s}px, ${mouseY * s}px, 0)`;
        });
        gateMandalas.forEach((m, i) => {
            const s = 14 + i * 5;
            m.style.transform = `translate3d(${mouseX * s}px, ${mouseY * s}px, 0) rotateZ(${mouseX * 10}deg)`;
        });
        gateFeatures.forEach((f, i) => {
            f.style.transform = `translate3d(${mouseX * (4+i)}px, ${mouseY * 2}px, ${5+i*2}px)`;
        });

        if (Math.abs(targetX - mouseX) > 0.001 || Math.abs(targetY - mouseY) > 0.001) {
            raf = requestAnimationFrame(update);
        } else {
            raf = null;
        }
    }

    // Subtle floating for gate quote
    const quote = document.querySelector('.gate-quote');
    if (quote) {
        setInterval(() => {
            quote.style.transform = `translateX(-50%) translateY(${Math.sin(Date.now()/2000)*3}px)`;
        }, 50);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initAuthGate3D();
});


/* ============================================================================
   COMMUNITY CLASS ROOMS
   Separate, content-rich room views for approved Inner Circle members.
   ============================================================================ */

const communityRoomContent = {
    music: {
        label: "MUSIC ROOM",
        icon: "♫",
        theme: "room-music",
        title: "Music Class",
        mentor: "Ms Sangeeta Maam",
        intro: "A gentle space to use rhythm, listening, and expression as tools for presence and emotional release.",
        focus: "Today’s focus: Listening inward through sound",
        activities: [
            "Begin with a two-minute quiet listening exercise and notice the sounds around you.",
            "Follow a simple rhythm pattern using claps, taps, or a favourite instrument.",
            "Choose one sound that matches your current mood and share why it feels meaningful."
        ],
        takeaway: "You do not need to perform perfectly. Let the rhythm give your mind a place to rest.",
        videos: [
            { src: "music1.mp4", title: "Music class session highlight", caption: "A glimpse into the Music Class with rhythm, listening, and joyful expression." }
        ]
    },
    mind: {
        label: "MENTAL WELL-BEING ROOM",
        icon: "◌",
        theme: "room-mind",
        title: "Mental Well-being Class",
        mentor: "Ms Yashvi Maam",
        intro: "A supportive room for thoughtful conversations, emotional awareness, and small practices that make everyday life feel more manageable.",
        focus: "Today’s focus: Naming feelings without judging them",
        activities: [
            "Use the check-in prompt: What am I feeling, where do I notice it, and what might I need?",
            "Practise a short grounding exercise using five things you can see, four you can feel, and three you can hear.",
            "Write one kind and realistic sentence you would offer to a friend in the same situation."
        ],
        takeaway: "Understanding your feelings is not overthinking; it is one way of caring for yourself with honesty.",
        images: [
            { src: "WhatsAppImage2026-08-18at9.38.34.jpeg", alt: "Mental well-being workshop with a mentor speaking to students", caption: "A guided conversation about feelings and emotional awareness." },
            { src: "WhatsAppImage2026-08-18at9.38.34PM.jpeg", alt: "Students listening during a mental well-being session", caption: "Making space to listen, reflect, and feel understood." },
            { src: "Screenshot2026-08-19200805.png", alt: "A facilitator speaking at a supportive group gathering", caption: "Learning together in a welcoming group setting." }
        ]
    },
    yoga: {
        label: "YOGA ROOM",
        icon: "ॐ",
        theme: "room-yoga",
        title: "Yoga Class",
        mentor: "Vikas Sir",
        intro: "A calm movement room where breath, posture, and body awareness come together to support balance and steadiness.",
        focus: "Today’s focus: Breathing into space and ease",
        activities: [
            "Start with slow shoulder rolls and three comfortable breaths before moving further.",
            "Move through a gentle sequence of mountain pose, cat-cow, child’s pose, and seated breathing.",
            "End by noticing one part of the body that feels softer, warmer, or more relaxed."
        ],
        takeaway: "Yoga is not a competition with your body. It is a conversation with it.",
        images: [
            { src: "WhatsAppImage2026-08-19at7.00.46AM.jpeg", alt: "A group practising movement together in a green outdoor space", caption: "Movement, energy, and connection in the open air." },
            { src: "WhatsAppImage2026-08-19at7.00.46AM(1).jpeg", alt: "A group doing balance exercises outdoors", caption: "Building balance with patience and playfulness." },
            { src: "WhatsAppImage2026-08-19at6.59.07AM.jpeg", alt: "A large group following a guided outdoor exercise", caption: "Every body can find a comfortable way to participate." },
            { src: "WhatsAppImage2026-08-19at7.00.46AM(2).jpeg", alt: "People moving together during an outdoor wellness activity", caption: "A shared rhythm makes practice feel lighter." }
        ]
    },
    art: {
        label: "ART ROOM",
        icon: "✎",
        theme: "room-art",
        title: "Art Class",
        mentor: "Kanupriya Maam",
        intro: "A playful creative room where colour, shape, and texture help you express what words may not yet be ready to say.",
        focus: "Today’s focus: Turning an emotion into an image",
        activities: [
            "Pick three colours that describe your current inner weather and place them on the page freely.",
            "Create a simple shape or symbol for something you want to protect, release, or welcome.",
            "Give your artwork a title that feels like a small message to your future self."
        ],
        takeaway: "There is no wrong way to create when the purpose is to listen to yourself.",
        images: [
            { src: "WhatsAppImage2026-08-18at4.27.24PM(1).jpeg", alt: "A creative group proudly holding decorated art frames", caption: "Celebrating the joy of making something personal." },
            { src: "WhatsAppImage2026-08-18at4.27.24PM.jpeg", alt: "A colourful group workshop display on a stage", caption: "Colour, collaboration, and confidence in the creative room." },
            { src: "WhatsAppImage2026-08-18at4.27.35PM.webp", alt: "A colourful collection of decorative nutcracker figures", caption: "Finding inspiration in texture, colour, and playful details." }
        ]
    }
};

function openCommunityRooms() {
    const grid = document.getElementById("community-room-grid");
    const view = document.getElementById("community-room-view");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "center" });
    if (view) view.style.display = "none";
}

function openCommunityRoom(roomKey) {
    const room = communityRoomContent[roomKey];
    const grid = document.getElementById("community-room-grid");
    const view = document.getElementById("community-room-view");
    const content = document.getElementById("community-room-content");
    const label = document.getElementById("community-room-label");
    if (!room || !grid || !view || !content) return;

    if (label) label.textContent = room.label;
    content.innerHTML = `
        <div class="community-room-hero ${room.theme}">
            <div class="community-room-icon-large">${room.icon}</div>
            <div>
                <span class="section-kicker">MINDMAPPERS INNER CIRCLE</span>
                <h2>${room.title}</h2>
                <p class="community-room-mentor">Guided by <strong>${room.mentor}</strong></p>
                <p class="community-room-intro">${room.intro}</p>
            </div>
        </div>
        ${room.images && room.images.length ? `
        <div class="community-room-media" aria-label="${room.title} photo highlights">
            ${room.images.map((image, index) => `
                <figure class="community-room-image-card ${index === 0 ? 'is-featured' : ''}">
                    <div class="community-room-image-frame"><img src="${image.src}" alt="${image.alt}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async"></div>
                    <figcaption>${image.caption}</figcaption>
                </figure>
            `).join('')}
        </div>` : ''}
        ${room.videos && room.videos.length ? `
        <div class="community-room-media community-room-video-media" aria-label="${room.title} video highlights">
            ${room.videos.map((video, index) => `
                <figure class="community-room-video-card ${index === 0 ? 'is-featured' : ''}">
                    <div class="community-room-video-frame">
                        <video controls playsinline preload="metadata" aria-label="${video.title}">
                            <source src="${video.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <figcaption><strong>${video.title}</strong><span>${video.caption}</span></figcaption>
                </figure>
            `).join('')}
        </div>` : ''}
        <div class="community-room-focus">
            <span class="focus-pulse">✦</span>
            <div><strong>${room.focus}</strong><p>Take this slowly. You can participate, observe, or simply breathe with the group.</p></div>
        </div>
        <div class="community-room-columns">
            <div class="community-room-content-card">
                <span class="section-kicker">ROOM PLAN</span>
                <h3>What we may explore</h3>
                <ol>${room.activities.map(activity => `<li>${activity}</li>`).join("")}</ol>
            </div>
            <div class="community-room-content-card room-reflection-card">
                <span class="section-kicker">TAKE THIS WITH YOU</span>
                <blockquote>“${room.takeaway}”</blockquote>
                <p>Bring a notebook, a curious mind, and permission to take the practice at your own pace.</p>
            </div>
        </div>
        <div class="community-room-footer-note"><span>☼</span> This room is a welcoming space. Respect privacy, listen generously, and allow every member to participate differently.</div>
    `;

    grid.style.display = "none";
    view.style.display = "block";
    view.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeCommunityRoom() {
    const grid = document.getElementById("community-room-grid");
    const view = document.getElementById("community-room-view");
    if (view) view.style.display = "none";
    if (grid) {
        grid.style.display = "grid";
        grid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}


/* ============================================================================
   WELLNESS COIN REWARDS
   Each reward can be claimed once per local calendar day per account.
   ============================================================================ */

const dailyCoinRewards = {
    shopVisit: { amount: 10, label: 'Claim +10', success: 'You earned 10 coins for checking in at the Wellness Shop.' },
    affirmation: { amount: 5, label: 'Claim +5', success: 'You earned 5 coins for taking a moment with a daily affirmation.' },
    calmZone: { amount: 10, label: 'Claim +10', success: 'You earned 10 coins for making space for a Calm-Zone reset.' }
};

function setCoinRewardStatus(message, isError = false) {
    const status = document.getElementById('coin-reward-status');
    if (!status) return;
    status.className = `coin-reward-status ${isError ? 'is-error' : 'is-success'}`;
    status.innerText = message;
}

function refreshCoinRewardButtons(userData = {}) {
    const claims = userData.coinRewardClaims || {};
    const today = getLocalDateKey();
    document.querySelectorAll('.coin-reward-btn[data-reward-key]').forEach((button) => {
        const rewardKey = button.dataset.rewardKey;
        const reward = dailyCoinRewards[rewardKey];
        const claimed = reward && claims[rewardKey] === today;
        button.disabled = Boolean(claimed);
        button.classList.toggle('is-claimed', Boolean(claimed));
        button.innerText = claimed ? 'Claimed today ✓' : (reward ? reward.label : 'Claim');
        button.setAttribute('aria-disabled', String(Boolean(claimed)));
    });
}

function showQuestCompletedPopup(reward) {
    const previousPopup = document.querySelector('.quest-completion-popup');
    if (previousPopup) previousPopup.remove();

    const popup = document.createElement('div');
    popup.className = 'quest-completion-popup';
    popup.setAttribute('role', 'alert');
    popup.innerHTML = `
        <div class="quest-completion-icon">✓</div>
        <div>
            <strong>Quest completed!</strong>
            <span>${reward.success}</span>
        </div>
        <b>+${reward.amount} 🪙</b>
    `;
    document.body.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('is-visible'));
    setTimeout(() => {
        popup.classList.remove('is-visible');
        setTimeout(() => popup.remove(), 260);
    }, 4300);
}

function setQuestButtonsBusy(rewardKey, isBusy) {
    document.querySelectorAll(`.coin-reward-btn[data-reward-key="${rewardKey}"]`).forEach((button) => {
        if (isBusy) {
            button.disabled = true;
            button.innerText = 'Completing…';
        }
    });
}

function syncVisibleCoinBalance(coins) {
    document.querySelectorAll('.user-coin-balance').forEach((element) => {
        element.innerText = String(Number(coins) || 0);
    });
}

async function grantCoinReward(rewardKey) {
    const reward = dailyCoinRewards[rewardKey];
    const user = firebase.auth().currentUser;
    if (!reward || !user) throw new Error('You must be signed in to collect this reward.');

    const dateKey = getLocalDateKey();
    const userRef = db.collection('users').doc(user.uid);
    const result = await db.runTransaction(async (transaction) => {
        const userSnapshot = await transaction.get(userRef);
        if (!userSnapshot.exists) throw new Error('User profile was not found.');
        const userData = userSnapshot.data();
        const claims = userData.coinRewardClaims && typeof userData.coinRewardClaims === 'object'
            ? userData.coinRewardClaims
            : {};
        const currentCoins = Number(userData.coins) || 0;
        if (claims[rewardKey] === dateKey) {
            return { alreadyClaimed: true, coins: currentCoins };
        }

        const updatedClaims = { ...claims, [rewardKey]: dateKey };
        transaction.set(userRef, {
            coins: currentCoins + reward.amount,
            coinRewardClaims: updatedClaims
        }, { merge: true });
        return { alreadyClaimed: false, coins: currentCoins + reward.amount };
    });

    syncVisibleCoinBalance(result.coins);
    const refreshedSnapshot = await userRef.get().catch(() => null);
    const refreshedData = refreshedSnapshot && refreshedSnapshot.exists ? refreshedSnapshot.data() : {};
    syncVisibleCoinBalance(refreshedData.coins !== undefined ? refreshedData.coins : result.coins);
    refreshCoinRewardButtons(refreshedData);
    return result;
}

function waitForQuestMoment(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

async function claimCoinReward(rewardKey) {
    const reward = dailyCoinRewards[rewardKey];
    const user = firebase.auth().currentUser;
    if (!reward) return;
    if (!user) {
        alert('Please log in before collecting wellness coins.');
        return;
    }

    setQuestButtonsBusy(rewardKey, true);
    try {
        if (rewardKey === 'affirmation') {
            showPage('welcome-page');
            generateAffirmation();
            await waitForQuestMoment(900);
        }

        if (rewardKey === 'calmZone') {
            showPage('self-help');
            const calmButton = document.getElementById('calm-btn');
            if (!calmButton) throw new Error('The Calm-Zone activity could not be opened.');
            await new Promise((resolve) => launchCalmZone(calmButton, resolve));
        }

        const result = await grantCoinReward(rewardKey);
        if (result.alreadyClaimed) {
            syncVisibleCoinBalance(result.coins);
            setCoinRewardStatus('This quest has already been completed today. Come back tomorrow for a fresh reward.', true);
            return;
        }

        syncVisibleCoinBalance(result.coins);
        setCoinRewardStatus(`✓ ${reward.success}`);
        showQuestCompletedPopup(reward);
    } catch (error) {
        console.error('Coin quest error:', error);
        setCoinRewardStatus('The quest could not be completed yet. Please try again.', true);
        refreshCoinRewardButtons((await db.collection('users').doc(user.uid).get().catch(() => null))?.data() || {});
    }
}
