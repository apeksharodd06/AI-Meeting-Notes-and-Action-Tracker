const API = "http://localhost:5000/api";


// ===============================
// SET TODAY'S DATE
// ===============================

document.getElementById("meetingDate").value =
    new Date().toISOString().split("T")[0];


// ===============================
// TEXT FILE UPLOAD
// ===============================

document
    .getElementById("meetingFile")
    .addEventListener("change", function(event) {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function() {

            document.getElementById("meetingNotes").value =
                reader.result;

        };

        reader.readAsText(file);

    });


// ===============================
// EXTRACT ACTION ITEMS
// ===============================

function extractActions(text) {

    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);


    const keywords =
        /\b(will|must|should|need to|complete|prepare|review|update|create|finish|submit|design|develop|test)\b/i;


    return sentences

        .filter(sentence =>
            keywords.test(sentence)
        )

        .map(sentence => {

            let owner = "";


            const ownerMatch =
                sentence.match(
                    /\b(Apeksha|Rahul|Priya|Ravi|Amit|Anu)\b/i
                );


            if (ownerMatch) {

                owner = ownerMatch[1];

            }


            return {

                task: sentence,

                owner: owner

            };

        });

}


// ===============================
// GENERATE SUMMARY
// ===============================

function generateSummary(text) {

    const sentences =
        text
            .split(/(?<=[.!?])\s+/)
            .map(x => x.trim())
            .filter(Boolean);


    if (sentences.length === 0) {

        return "No summary available.";

    }


    return (
        "The meeting covered " +
        sentences
            .slice(0, 4)
            .join(" ")
    );

}


// ===============================
// GENERATE MEETING
// ===============================

async function generateMeeting() {

    const title =
        document.getElementById("meetingTitle").value.trim();


    const date =
        document.getElementById("meetingDate").value;


    const notes =
        document.getElementById("meetingNotes").value.trim();


    const message =
        document.getElementById("message");


    if (!notes) {

        alert(
            "Please enter meeting notes or upload a .txt file."
        );

        return;

    }


    const meetingTitle =
        title || "Untitled Meeting";


    const summary =
        generateSummary(notes);


    const actions =
        extractActions(notes);


    // Show summary

    document.getElementById("summary")
        .textContent = summary;


    // Show actions

    const actionContainer =
        document.getElementById("generatedActions");


    if (actions.length === 0) {

        actionContainer.innerHTML =
            `<p class="empty">
                No action items detected.
            </p>`;

    }

    else {

        actionContainer.innerHTML =
            actions.map(action => `

                <div class="action-item">

                    <strong>
                        ${escapeHTML(action.task)}
                    </strong>

                    <span>
                        Owner:
                        ${escapeHTML(
                            action.owner || "Unassigned"
                        )}
                    </span>

                </div>

            `).join("");

    }


    // Save to database

    try {

        const response =
            await fetch(
                API + "/meetings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        title:
                            meetingTitle,

                        meeting_date:
                            date,

                        notes:
                            notes,

                        summary:
                            summary,

                        actions:
                            actions

                    })

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.error || "Server error"
            );

        }


        message.textContent =
            "✓ Meeting saved successfully.";

        message.style.color =
            "#16a34a";


        await loadDashboard();

        await loadMeetings();

        await loadActionItems();

    }

    catch (error) {

        console.error(error);


        message.textContent =
            "Could not connect to backend. Make sure npm start is running.";

        message.style.color =
            "#dc2626";

    }

}


// ===============================
// CLEAR FORM
// ===============================

function clearMeeting() {

    document.getElementById("meetingTitle").value = "";

    document.getElementById("meetingNotes").value = "";

    document.getElementById("meetingFile").value = "";

    document.getElementById("summary").textContent =
        "Your meeting summary will appear here.";

    document.getElementById("generatedActions").innerHTML =
        "No action items yet.";

    document.getElementById("message").textContent = "";

}


// ===============================
// DASHBOARD
// ===============================

async function loadDashboard() {

    try {

        const response =
            await fetch(
                API + "/dashboard"
            );


        const data =
            await response.json();


        document.getElementById(
            "totalMeetings"
        ).textContent =
            data.meetings;


        document.getElementById(
            "totalActions"
        ).textContent =
            data.actions;


        document.getElementById(
            "completedActions"
        ).textContent =
            data.completed;


        document.getElementById(
            "pendingActions"
        ).textContent =
            data.pending;

    }

    catch (error) {

        console.log(
            "Dashboard unavailable"
        );

    }

}


// ===============================
// MEETING HISTORY
// ===============================

async function loadMeetings() {

    try {

        const response =
            await fetch(
                API + "/meetings"
            );


        const meetings =
            await response.json();


        displayMeetings(meetings);

    }

    catch (error) {

        console.log(
            "Meeting history unavailable"
        );

    }

}


// ===============================
// SEARCH MEETINGS
// ===============================

async function searchMeetings() {

    const search =
        document.getElementById(
            "searchMeeting"
        ).value;


    try {

        const response =
            await fetch(
                API +
                "/meetings?search=" +
                encodeURIComponent(search)
            );


        const meetings =
            await response.json();


        displayMeetings(meetings);

    }

    catch (error) {

        console.log(error);

    }

}


// ===============================
// DISPLAY MEETINGS
// ===============================

function displayMeetings(meetings) {

    const container =
        document.getElementById(
            "meetingHistory"
        );


    if (!meetings.length) {

        container.innerHTML =
            `<p class="empty">
                No meetings found.
            </p>`;

        return;

    }


    container.innerHTML =
        meetings.map(meeting => `

            <div class="history-item">

                <div>

                    <h3>
                        ${escapeHTML(
                            meeting.title
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            meeting.meeting_date ||
                            ""
                        )}

                        ·

                        ${escapeHTML(
                            (meeting.notes || "")
                                .substring(0, 100)
                        )}
                    </p>

                </div>


                <div class="history-badge">

                    ${meeting.action_count || 0}
                    Actions

                </div>

            </div>

        `).join("");

}


// ===============================
// ACTION ITEMS
// ===============================

async function loadActionItems() {

    try {

        const response =
            await fetch(
                API + "/actions"
            );


        const actions =
            await response.json();


        const table =
            document.getElementById(
                "actionTable"
            );


        if (!actions.length) {

            table.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        class="empty"
                    >
                        No action items yet.
                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            actions.map(action => `

                <tr>

                    <td>
                        ${escapeHTML(
                            action.task
                        )}
                    </td>


                    <td>

                        <input

                            class="owner-input"

                            id="owner-${action.id}"

                            value="${escapeHTML(
                                action.owner || ""
                            )}"

                            placeholder="Owner"

                        >

                    </td>


                    <td>

                        <select

                            class="status-select"

                            id="status-${action.id}"

                        >

                            <option
                                value="Pending"
                                ${action.status === "Pending"
                                ? "selected"
                                : ""}
                            >
                                Pending
                            </option>


                            <option
                                value="In Progress"
                                ${action.status === "In Progress"
                                ? "selected"
                                : ""}
                            >
                                In Progress
                            </option>


                            <option
                                value="Completed"
                                ${action.status === "Completed"
                                ? "selected"
                                : ""}
                            >
                                Completed
                            </option>

                        </select>

                    </td>


                    <td>

                        <button

                            class="save-button"

                            onclick="updateAction(${action.id})"

                        >
                            Save

                        </button>

                    </td>

                </tr>

            `).join("");

    }

    catch (error) {

        console.log(error);

    }

}


// ===============================
// UPDATE ACTION
// ===============================

async function updateAction(id) {

    const owner =
        document.getElementById(
            "owner-" + id
        ).value;


    const status =
        document.getElementById(
            "status-" + id
        ).value;


    try {

        await fetch(
            API + "/actions/" + id,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    owner:
                        owner,

                    status:
                        status

                })

            }
        );


        await loadActionItems();

        await loadDashboard();

    }

    catch (error) {

        alert(
            "Could not update action item."
        );

    }

}


// ===============================
// HTML SECURITY
// ===============================

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ===============================
// INITIAL LOAD
// ===============================

loadDashboard();

loadMeetings();

loadActionItems();