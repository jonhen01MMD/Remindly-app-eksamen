# Remindly
Remindly is a mobile application built with React Native and Expo, designed to help you stay organized by managing your daily tasks and upcoming plans. It provides a seamless and intuitive user experience for creating, tracking, and completing reminders. All your data is stored securely on your device, ensuring privacy and offline access.

Readme file er lavet med "www.gitread.dev"


## Features

-   **Intuitive Dashboard:** Get a quick overview of your day, including how many reminders are left and a summary of your upcoming week.
-   **Reminder Management:** Easily add, view, complete, and delete reminders. Set titles, descriptions, dates, and times.
-   **Priority Levels:** Assign 'high', 'medium', or 'low' priority to your tasks to focus on what matters most.
-   **Upcoming & Completed Views:** Toggle between your upcoming plans and a list of all your completed reminders.
-   **Personalization:** Customize your profile with a name, email, and a profile picture from your camera or photo library.
-   **App Settings:** Toggle settings like notifications and dark mode to fit your preferences.
-   **Local Data Storage:** All user data, including reminders and settings, is stored locally on the device using AsyncStorage for privacy and offline functionality.
-   **Data Control:** A dedicated privacy section allows you to delete all your application data permanently.

## Tech Stack

-   **Framework:** React Native, Expo
-   **Language:** TypeScript
-   **Routing:** Expo Router
-   **Styling:** NativeWind (Tailwind CSS for React Native)
-   **State Management:** React Context API
-   **Local Storage:** AsyncStorage
-   **UI Components:** Gorhom Bottom Sheet, React Native Reanimated

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js
-   npm or yarn
-   Expo Go app on your mobile device (for testing)

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/jonhen01mmd/remindly-app-eksamen.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd remindly-app-eksamen
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the App

1.  Start the Metro bundler:
    ```sh
    npm start
    ```
2.  Scan the QR code with the Expo Go app on your iOS or Android device.

Alternatively, you can run the app directly on a connected device or emulator:
-   To run on Android:
    ```sh
    npm run android
    ```
-   To run on iOS:
    ```sh
    npm run ios
    ```

