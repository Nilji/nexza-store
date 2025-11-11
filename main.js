
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzaSOUNsZaVYbU-oHs4Nec65PNLU1uDrk",
    authDomain: "ai-web-5db26.firebaseapp.com",
    projectId: "ai-web-5db26",
    storageBucket: "ai-web-5db26.firebasestorage.app",
    messagingSenderId: "106860509139",
    appId: "1:106860509139:web:5e07d0e6f9d3270e772126",
    measurementId: "G-8DXGGRBSHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const ADMIN_EMAIL = "rijanjoshi66@gmail.com";

// DOM Elements
const authModal = document.getElementById('auth-modal');
const appContainer = document.getElementById('app');
const loginContainer = document.getElementById('login-container');
const signupContainer = document.getElementById('signup-container');
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginGoogleBtn = document.getElementById('login-google-btn');
const signupGoogleBtn = document.getElementById('signup-google-btn');
const adminAccessBtn = document.getElementById('admin-access-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const navLinks = document.querySelectorAll('.nav-link');

// --- Authentication Logic ---
onAuthStateChanged(auth, user => {
    if (user) {
        // User is logged in
        authModal.classList.remove('show');
        appContainer.style.display = 'block';

        if (user.email === ADMIN_EMAIL) {
            adminAccessBtn.style.display = 'block';
        }
    } else {
        // User is logged out
        authModal.classList.add('show');
        appContainer.style.display = 'none';
        adminAccessBtn.style.display = 'none';
    }
});

// --- Form Submissions ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showNotification("Logged in successfully!");
        })
        .catch((error) => {
            showNotification(error.message, 'error');
        });
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            // Store user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: user.email,
                isBanned: false
            });
            showNotification("Account created successfully!");
        })
        .catch((error) => {
            showNotification(error.message, 'error');
        });
});

const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
             await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                isBanned: false
            }, { merge: true }); // Merge to avoid overwriting existing data
            showNotification(`Signed in as ${user.displayName}!`);
        }).catch((error) => {
            showNotification(error.message, 'error');
        });
};

loginGoogleBtn.addEventListener('click', handleGoogleSignIn);
signupGoogleBtn.addEventListener('click', handleGoogleSignIn);

// --- UI & Navigation ---
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');

        if(mobileNav.classList.contains('show')) {
            mobileNav.classList.remove('show');
        }
    });
});

// --- Admin Button ---
adminAccessBtn.addEventListener('click', () => {
    window.open('admin.html', '_blank');
});

// --- Helper Functions ---
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if(container.contains(notification)){
                container.removeChild(notification);
            }
        }, 500);
    }, 3000);
}
