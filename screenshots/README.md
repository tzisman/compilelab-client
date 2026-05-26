# CompileLab Screenshots

This directory contains screenshots of the CompileLab application for documentation purposes.

## Screenshot Files

### Required Screenshots for README

1. **homepage.png**
   - The main landing page showing the CompileLab welcome message
   - Features the hero section with three key features
   - Dimensions: Full viewport width

2. **login.png**
   - The login authentication page
   - Shows email/password form with visibility toggle
   - Dimensions: Full viewport width

3. **signup.png**
   - The signup/registration page
   - Shows username, email, and password fields
   - Dimensions: Full viewport width

## Capturing Screenshots

To capture new screenshots:

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to each page:
   - Home: `http://localhost:5174/`
   - Login: `http://localhost:5174/login`
   - Sign Up: `http://localhost:5174/signup`

3. Use browser Developer Tools:
   - Press `F12` or `Right-click → Inspect`
   - Go to Device Toolbar (Ctrl + Shift + M)
   - Set to responsive design (1920x1080)
   - Use the screenshot button or Print Screen

4. Save as PNG files in this directory with descriptive names

## Guidelines for Screenshots

- **Resolution:** 1920x1080 or higher
- **Format:** PNG (lossless compression)
- **Content:** Show key UI elements clearly
- **Consistency:** Use same browser and viewport for all shots
- **Naming:** Use lowercase with hyphens (e.g., `course-catalog.png`)

## Current Screenshots

- ✅ homepage.png - Captured 5/27/2026
- ✅ login.png - Captured 5/27/2026
- ✅ signup.png - Captured 5/27/2026

## Additional Screenshots to Consider

For a more comprehensive documentation, consider adding:

1. **Student Features:**
   - `student-courses-list.png` - Student's enrolled courses
   - `student-exercise-list.png` - List of exercises
   - `exercise-workspace.png` - Code editor and submission interface

2. **Teacher Features:**
   - `teacher-course-list.png` - Instructor's courses
   - `course-management.png` - Course management interface
   - `add-exercise-modal.png` - Exercise creation modal
   - `course-report.png` - Analytics and reports

3. **UI Components:**
   - `navbar.png` - Navigation bar
   - `footer.png` - Footer section
   - `error-page.png` - Error page example

## Usage in README

Reference screenshots using markdown syntax:
```markdown
![Description](./screenshots/filename.png)
```

Example:
```markdown
### Login Page
User authentication interface:

![Login Page](./screenshots/login.png)
```

---

**Note:** Screenshots are regularly updated to match the latest UI design and features.
