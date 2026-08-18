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
                        <a href="mailto:aishani.t@mindey.org">aishani.t@mindey.org</a>
                        <div class="page-watermark-note">MindMappers wellness space · Reflect gently · Grow steadily</div>
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
                    inventory: []
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
function logMood(moodString) {
    const statusElement = document.getElementById('mood-status');
    const user = firebase.auth().currentUser;
    
    db.collection("moods").add({
        mood: moodString,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userUid: user ? user.uid : 'anonymous'
    })
    .then(() => {
        if (statusElement) {
            statusElement.style.opacity = 0;
            setTimeout(() => {
                statusElement.innerText = `Saved securely to cloud: You logged "${moodString}"! ✨`;
                statusElement.style.opacity = 1;
            }, 150);
        }
        triggerBrainPulse(`Mood Tracked: ${moodString}`);
    })
    .catch((error) => {
        console.error("Firebase Mood Error: ", error);
    });
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
function launchCalmZone(buttonElement) {
    if (!buttonElement) return;
    
    buttonElement.innerText = "Inhale deeply... Hold... Exhale... 🧘";
    buttonElement.style.background = "linear-gradient(90deg, #11998e, #38ef7d)";
    
    triggerBrainPulse("Calm-Zone Vagus Nerve Reset Active");

    setTimeout(() => {
        buttonElement.innerText = "Launch Calm-Zone";
        buttonElement.style.background = ""; 
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
