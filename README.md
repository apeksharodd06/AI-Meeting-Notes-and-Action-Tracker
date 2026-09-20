# MeetFlow – AI Meeting Notes & Action Tracker

## College Project – Feature Set B

MeetFlow is a full-stack web application designed to help students and teams manage meeting notes, generate summaries, extract action items, assign task owners, track task status, and search previous meetings.

The application uses a **HTML, CSS, JavaScript frontend**, **Node.js + Express backend**, and **MySQL database**.

---

## 1. Project Title

**AI Meeting Notes & Action Tracker – MeetFlow**

### Feature Set B

* Text/File Meeting Input
* Generate Meeting Summary
* Extract Action Items
* Assign Task/Owner
* Search Meeting History
* Track Action Item Status
* Dashboard Statistics

---

## 2. Project Objective

The main objective of MeetFlow is to simplify the process of managing meeting information.

Instead of manually reading meeting notes and creating task lists, the application helps identify important action items from the meeting notes and stores them in a MySQL database.

The system provides a centralized dashboard where users can view meetings, tasks, owners, and task completion status.

---

## 3. Main Features

### 3.1 Dashboard

The Dashboard provides an overview of the project.

It displays:

* Total Meetings
* Total Action Items
* Completed Tasks
* Pending Tasks

The numbers are retrieved from the MySQL database.

Example:

```text
Total Meetings     5
Action Items       12
Completed           7
Pending             5
```

The **Completed** number automatically increases when an action item's status is changed to `Completed`.

---

### 3.2 New Meeting

The New Meeting section allows users to create a new meeting.

Users can enter:

* Meeting title
* Meeting date
* Meeting notes

Users can also upload a `.txt` meeting file.

Example meeting notes:

```text
Meeting about college project.

Apeksha will complete the website design.
Rahul will prepare the database.
The team will review the project tomorrow.
```

After clicking:

**Generate Summary & Actions**

the system generates a meeting summary and extracts possible action items.

---

### 3.3 Generate Summary

The system creates a short summary from the entered meeting notes.

Example:

```text
The meeting covered the college project.
Apeksha will complete the website design.
Rahul will prepare the database.
The team will review the project tomorrow.
```

The current college-project version uses rule-based text processing and does not require an external AI API.

---

### 3.4 Extract Action Items

The application identifies sentences containing task-related words such as:

* will
* must
* should
* complete
* prepare
* review
* create
* update
* submit
* design
* develop
* test

Example:

```text
Apeksha will complete the website design.
```

becomes:

```text
Task:
Apeksha will complete the website design.

Owner:
Apeksha

Status:
Pending
```

---

### 3.5 Assign Task / Owner

Action items can be assigned to team members.

Example:

| Task                    | Owner   |
| ----------------------- | ------- |
| Complete website design | Apeksha |
| Prepare database        | Rahul   |
| Review project          | Apeksha |

The owner information is stored in MySQL.

---

### 3.6 Action Item Status

Each action item has a status.

Available statuses:

```text
Pending
In Progress
Completed
```

When the user changes the status to:

```text
Completed
```

and clicks **Save**, the database is updated.

The Dashboard then automatically updates the Completed and Pending numbers.

---

### 3.7 Meeting History

The Meeting History section displays previously saved meetings.

Users can search meetings using the search box.

Search can be performed using information such as:

* Meeting title
* Meeting notes
* Summary

Example:

```text
Search:
college
```

The application displays meetings related to the search.

---

## 4. Technology Stack

### Frontend

```text
HTML5
CSS3
JavaScript
```

### Backend

```text
Node.js
Express.js
```

### Database

```text
MySQL
MySQL Workbench
```

### Other Technologies

```text
CORS
dotenv
mysql2
```

---

## 5. Project Structure

```text
MeetFlow/
│
├── frontend/
│   │
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── database/
│   │
│   └── meeting_tracker.sql
│
└── README.md
```

---

## 6. Database Structure

The application uses a MySQL database named:

```text
meeting_tracker
```

It contains two main tables.

### Meetings Table

```text
meetings
```

Columns:

```text
id
title
meeting_date
notes
summary
created_at
```

### Action Items Table

```text
action_items
```

Columns:

```text
id
meeting_id
task
owner
status
created_at
```

The `meeting_id` connects action items to their corresponding meeting.

---

## 7. Database Setup

Open **MySQL Workbench**.

Open:

```text
database/meeting_tracker.sql
```

Execute the SQL script.

It creates:

```text
meeting_tracker
```

and the required tables:

```text
meetings
action_items
```

---

## 8. Backend Setup

Open Command Prompt in the backend folder.

Example:

```cmd
cd MeetFlow\backend
```

Install the required packages:

```cmd
npm install
```

After installation, create the `.env` file.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=meeting_tracker
DB_PORT=3306
PORT=5000
```

Replace:

```text
YOUR_MYSQL_PASSWORD
```

with your MySQL password.

---

## 9. Start the Backend

Inside the `backend` folder, run:

```cmd
npm start
```

You should see:

```text
Server running at http://localhost:5000
```

Keep this Command Prompt window open while using the website.

---

## 10. Start the Frontend

Open:

```text
frontend/index.html
```

in a web browser.

The MeetFlow application will open.

---

## 11. How the System Works

The complete application works using the following flow:

```text
User
 │
 ↓
Frontend
 │
 │ HTML
 │ CSS
 │ JavaScript
 ↓
Node.js + Express
 │
 ↓
MySQL Database
 │
 ├── Meetings
 │
 └── Action Items
```

---

## 12. Example Workflow

### Step 1

Open **New Meeting**.

### Step 2

Enter:

```text
Meeting about college project.

Apeksha will complete the website design.
Rahul will prepare the database.
The team will review the project tomorrow.
```

### Step 3

Click:

```text
Generate Summary & Actions
```

### Step 4

The application generates the summary.

### Step 5

Action items are extracted.

Example:

```text
Apeksha will complete the website design.
Owner: Apeksha

Rahul will prepare the database.
Owner: Rahul

The team will review the project tomorrow.
Owner: Unassigned
```

### Step 6

The meeting and action items are stored in MySQL.

### Step 7

Open **Action Items**.

Assign owners and change task statuses.

### Step 8

Click **Save**.

### Step 9

Return to **Dashboard**.

The statistics will automatically update.

---

## 13. Example Dashboard

After creating one meeting with three action items:

```text
Total Meetings       1
Action Items         3
Completed            0
Pending              3
```

After completing one task:

```text
Total Meetings       1
Action Items         3
Completed            1
Pending              2
```

After completing all three:

```text
Total Meetings       1
Action Items         3
Completed            3
Pending              0
```

---

## 14. Testing

The following features should be tested before project submission.

### Dashboard

* [ ] Dashboard opens
* [ ] Total Meetings displays correctly
* [ ] Action Items displays correctly
* [ ] Completed count displays correctly
* [ ] Pending count displays correctly

### New Meeting

* [ ] Meeting title can be entered
* [ ] Meeting date can be selected
* [ ] Meeting notes can be entered
* [ ] `.txt` file can be uploaded
* [ ] Summary is generated
* [ ] Action items are extracted
* [ ] Meeting is saved to MySQL

### Meeting History

* [ ] Saved meetings are displayed
* [ ] Search works
* [ ] Meeting information is displayed correctly

### Action Items

* [ ] Tasks are displayed
* [ ] Owner can be assigned
* [ ] Status can be changed
* [ ] Save button works
* [ ] Completed count updates

### Database

* [ ] MySQL server is running
* [ ] `meeting_tracker` database exists
* [ ] `meetings` table exists
* [ ] `action_items` table exists
* [ ] Data is stored correctly

---

## 15. Advantages

* Simple and user-friendly interface
* Centralized meeting management
* Reduces manual task tracking
* Easy task assignment
* Searchable meeting history
* Real-time dashboard statistics
* MySQL-based persistent storage
* Suitable for college project demonstration

---

## 16. Future Enhancements

The project can be extended with:

* Real AI-generated meeting summaries
* AI-based action item extraction
* User login and authentication
* Team member management
* Email notifications
* Task deadlines
* Calendar integration
* PDF meeting reports
* Export to Excel
* Dark mode
* Cloud deployment
* Multiple project/workspace support

---

## 17. Project Conclusion

MeetFlow provides a complete solution for recording meeting information, generating summaries, extracting action items, assigning owners, tracking task progress, and searching meeting history.

The project demonstrates the integration of:

```text
Frontend
+
Backend
+
REST API
+
MySQL Database
```

and provides a practical full-stack web application suitable for a college project.

---

## 18. Quick Start

For future use, the basic commands are:

### Backend

```cmd
cd MeetFlow\backend
npm install
npm start
```

### Database

Run:

```text
database/meeting_tracker.sql
```

in MySQL Workbench.

### Frontend

Open:

```text
frontend/index.html
```

in your browser.

---

## 19. Project Name

**MeetFlow – AI Meeting Notes & Action Tracker**

**Feature Set B**

> Text/File Meeting Input · Generate Summary · Extract Action Items · Assign Task/Owner · Search Meeting History
