# Google OAuth Setup Guide

To resolve the `Error 401: invalid_client`, you must provide a valid Client ID from the [Google Cloud Console](https://console.cloud.google.com/).

## Steps to create a Client ID:

1.  **Create a New Project**: Go to the Google Cloud Console and create a project named `OpenClaw Bot Creator`.
2.  **Configure OAuth Consent Screen**:
    *   Navigate to `APIs & Services` > `OAuth consent screen`.
    *   Choose `External` and fill in the required app info.
    *   Add your email and `david@openclaw.ai` (or your preferred contact).
    *   Add the `.../auth/userinfo.profile` and `.../auth/userinfo.email` scopes.
3.  **Create Credentials**:
    *   Navigate to `APIs & Services` > `Credentials`.
    *   Click `+ CREATE CREDENTIALS` > `OAuth client ID`.
    *   Select `Web application` as the Application type.
    *   Add `http://localhost:5173` to **Authorized JavaScript origins**.
    *   Add `http://localhost:5173` to **Authorized redirect URIs**.
4.  **Update Environment Variables**:
    *   Copy the **Client ID** provided.
    *   Open the `.env` file in the project root.
    *   Replace the placeholder with your Client ID:
        ```bash
        VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com
        ```
5.  **Restart the App**: Stop the terminal running `npm run dev` and start it again.

---

> [!TIP]
> If you don't want to set this up right now, I am implementing a **Simulation Fallback** that will allow you to bypass this screen if the Client ID is not detected.
