
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzaSOUNsZaVYbU-oHs4Nec65PNLU1uDrk",
    authDomain: "ai-web-5db26.firebaseapp.com",
    projectId: "ai-web-5db26",
    storageBucket: "ai-web-5db26.firebasestorage.app",
    messagingSenderId: "106860509139",
    appId: "1:106860509139:web:5e07d0e6f9d3270e772126",
    measurementId: "G-8DXGGRBSHL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const ADMIN_EMAIL = "rijanjoshi66@gmail.com";

const unauthorizedDiv = document.getElementById('unauthorized-access');
const adminDashboardDiv = document.getElementById('admin-dashboard');
const userListDiv = document.getElementById('user-list');

onAuthStateChanged(auth, user => {
    if (user && user.email === ADMIN_EMAIL) {
        adminDashboardDiv.style.display = 'block';
        loadUsers();
    } else {
        unauthorizedDiv.style.display = 'block';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }
});

async function loadUsers() {
    userListDiv.innerHTML = 'Loading users...';
    try {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const users = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        userListDiv.innerHTML = '';
        if(users.length === 0) {
            userListDiv.innerHTML = '<p>No registered users found.</p>';
            return;
        }

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `
                <div>
                    <strong>${user.name}</strong> (${user.email})
                    <span style="color: ${user.isBanned ? 'red' : 'green'};">${user.isBanned ? ' [Banned]' : ''}</span>
                </div>
                <div class="user-item-actions">
                    <button class="ban-btn" data-id="${user.id}" data-banned="${user.isBanned}">${user.isBanned ? 'Unban' : 'Ban'}</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </div>
            `;
            userListDiv.appendChild(userItem);
        });

    } catch (error) {
        userListDiv.innerHTML = '<p>Error loading users.</p>';
        console.error("Error loading users: ", error);
    }
}

userListDiv.addEventListener('click', async (e) => {
    const target = e.target;
    const userId = target.dataset.id;

    if (!userId) return;

    if (target.classList.contains('ban-btn')) {
        const isBanned = target.dataset.banned === 'true';
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { isBanned: !isBanned });
        loadUsers(); // Refresh the list
    }

    if (target.classList.contains('delete-btn')) {
        if (confirm("Are you sure you want to delete this user's data? This action cannot be undone.")) {
            await deleteDoc(doc(db, "users", userId));
            loadUsers(); // Refresh the list
        }
    }
});
