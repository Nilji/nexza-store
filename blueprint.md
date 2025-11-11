# Project Blueprint

## Overview

This project is a web application that provides user authentication (login and signup) using Firebase. It also uses Firestore to store user data. The application is designed to be a single-page application with a modern and beautiful user interface.

## Current Implementation

### Features:
*   **User Authentication:** Users can sign up and log in using their email and password, or with their Google account.
*   **Firebase Integration:** The application is connected to a Firebase project for authentication and database services.
*   **Firestore Database:** User information is stored in a Firestore database.
*   **Single-Page Interface:** The login and signup forms are on the same page, with a toggle to switch between them.
*   **Popup Notifications:** The application displays popup notifications for login status, registration status, and errors.

### Design:
*   **Layout:** A centered form layout with a container that switches between the login and signup views.
*   **Styling:** Modern CSS with a gradient background, box shadows for depth, and a clean, user-friendly form design.
*   **Responsiveness:** The layout is responsive and works on different screen sizes.

## Plan for Current Request

1.  **Update `blueprint.md`:** Reflect the addition of Google Sign-In and popup notifications.
2.  **Update `index.html`:**
    *   Add a "Sign in with Google" button to both login and signup forms.
    *   Add a container for popup notifications.
3.  **Update `style.css`:**
    *   Add styles for the Google Sign-In button.
    *   Add styles for the popup notification container and its animations.
4.  **Update `main.js`:**
    *   Import `GoogleAuthProvider` and `signInWithPopup` from the Firebase SDK.
    *   Implement a function to show popup notifications.
    *   Add an event listener to the "Sign in with Google" button to trigger the `signInWithPopup` flow.
    *   Handle the response from the Google Sign-In, creating a new user document in Firestore if the user is new.
    *   Update the existing email/password authentication to use the new popup notification system.
5.  **Review and Test:** Ensure all authentication methods work correctly and that notifications are displayed as expected.