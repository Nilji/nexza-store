# Project Blueprint

## Overview

This project is a web application named "Nexza Store" that provides a full-featured e-commerce user interface. It includes user authentication (login, signup, Google Sign-In), role-based access control (admin and user), and a responsive, store-themed design. Firebase is used for authentication and Firestore for user data management.

## Current Implementation

### Features:
*   **Project Name:** Nexza Store.
*   **User Authentication:** Users can sign up and log in with email/password or their Google account.
*   **Role-Based Access:**
    *   The user `rijanjoshi66@gmail.com` is designated as the Admin.
    *   An "Admin Access" button is visible to the admin.
    *   The Admin Panel allows viewing all registered users from Firestore, with options to simulate "Ban" or "Delete" actions.
*   **Store Theme:** A modern, responsive e-commerce layout.
*   **Navigation:**
    *   **Desktop:** A top navigation bar with "Home", "Contact Us", "Support", and "Announcement" links.
    *   **Mobile:** A "three-dot" menu reveals the navigation links.
*   **User View:** The main store interface is shown after login.
*   **Admin View:** Admins have access to the standard user view plus the admin panel.
*   **Logo:** A circular logo is displayed in the header.
*   **Notifications:** Popup notifications for login, registration, and other actions.

## Plan for Current Request

1.  **Update `blueprint.md`:** Overhaul the blueprint to reflect the new "Nexza Store" application structure, including admin roles, navigation, and store theme.
2.  **Update `index.html`:**
    *   Replace the login-centric layout with a full application structure.
    *   Add a header with the logo and navigation elements (for both desktop and mobile).
    *   Create a main content area to display different "pages" (Home, Contact, etc.).
    *   Create the structure for the Admin Panel, initially hidden.
    *   Keep the login/signup forms within a modal or separate view that is hidden after login.
3.  **Update `style.css`:**
    *   Completely redesign the CSS to create a modern, responsive "store theme".
    *   Style the header, navigation (desktop and mobile), logo, and content sections.
    *   Style the Admin Panel, including the user list and action buttons.
    *   Ensure the design is responsive and adapts to mobile and desktop screens.
4.  **Update `main.js`:**
    *   Use `onAuthStateChanged` as the primary controller to manage the view state (logged in vs. logged out).
    *   Implement logic to show the main store interface upon login and hide the login forms.
    *   Check the logged-in user's email to determine if they are an admin (`rijanjoshi66@gmail.com`) and show the "Admin Access" button accordingly.
    *   Implement navigation logic to switch between the "Home", "Contact Us", "Support", and "Announcement" views.
    *   For the Admin Panel, fetch and display all users from the "users" collection in Firestore.
    *   Implement client-side logic for "Ban" (updating a user's status in Firestore) and "Delete" (removing a user from Firestore). *Note: True user deletion from Firebase Auth requires a backend function, this will simulate it on the client-side data.*
    *   Handle mobile menu toggling.