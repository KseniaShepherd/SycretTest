# Sycret Gift Certificates

## Description

Web application for selecting and purchasing gift certificates.

### Features:
1. **Certificate Selection Page**:
   - Displays a list of certificates obtained using the `OSGetGoodList` method.
   - Users can browse the list, select a certificate, and proceed to checkout by clicking the "Buy" button.

2. **Contact Details Page**:
   - Contains mandatory fields: "Name", "Phone" (with a specific format mask), and "Email".
   - The application ensures correct field filling. The page provides two action buttons: "Back" (returns to the certificate selection page) and "Pay".
   - Collected data is stored using the `OSSale` method.

3. **Payment Page**:
   - For the purpose of this task, the "Pay" button directs users to a stub page displaying the text "payment…"

## Installation and Setup

### Prerequisites:
- Node.js installed

### Installation Steps:
1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` to install all dependencies

### Available Scripts:
- `npm start`: Starts the development server
- `npm build`: Builds the app for production
- `npm test`: Run tests