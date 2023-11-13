roadplan

### User Authentication and Profiles:
1. **User Registration:**
   - Create a registration form with fields like username, email, and password.
   - Use Angular Reactive Forms for form validation.
   - Send registration data to the server to create a new user account.

2. **User Login:**
   - Implement a login page with fields for email and password.
   - Authenticate users using JWT (JSON Web Tokens).
   - Store the JWT securely on the client side (e.g., in local storage) after successful login.

3. **Password Reset:**
   - Create a feature for users to request a password reset.
   - Implement a secure password reset process.

4. **User Dashboard:**
   - Develop a personalized dashboard for users.
   - Display user-specific information like bookings and reviews.

### Admin Panel:
1. **Admin Login:**
   - Create a separate login page for administrators.
   - Authenticate admins using JWT.

2. **Manage Tours:**
   - Implement features to add, update, and soft-delete tours.
   - Display a list of all tours with appropriate actions for admins.

3. **Manage Profiles:**
   - Allow admins to manage their profiles, update information as needed.

4. **Manage Users:**
   - Provide functionality for admins to manage user accounts.
   - View a list of users and perform actions like suspension or deletion.

### Tours Section:
1. **Create New Events:**
   - Develop a form for admins to add new events with details like destination, duration, price, and tour type.

2. **Display Available Events:**
   - Create a page to display all available events to users.

3. **Tour Filtering:**
   - Allow users to search for tours and filter based on tour type.

4. **Booking Tours:**
   - Enable users to book tours from the available options.

5. **Tour Reviews:**
   - Implement a system to leave reviews for tours.
   - Ensure that reviews are only open after the duration when the tour is happening.

