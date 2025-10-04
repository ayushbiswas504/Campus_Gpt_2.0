// --- Doubt Solving Section ---
function submitDoubt() {
    const pdfFile = document.getElementById('pdfUpload').files[0];
    const question = document.getElementById('doubtQuestion').value;

    if (!question.trim()) {
        alert("Please type your question before submitting.");
        return;
    }

    // This is a placeholder alert.
    // A real implementation would require a backend to process the PDF and question.
    let responseMessage = Your question has been submitted.;
    if (pdfFile) {
        responseMessage += \nFile Uploaded: ${pdfFile.name};
    }
    
    alert(responseMessage);

    // Clear the form
    document.getElementById('doubtQuestion').value = '';
    document.getElementById('pdfUpload').value = '';
}


// --- Event Reminders Section ---

function addEvent() {
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const eventList = document.getElementById('eventList');

    const eventName = eventNameInput.value.trim();
    const eventDate = eventDateInput.value;

    if (!eventName || !eventDate) {
        alert("Please provide both an event name and a date.");
        return;
    }

    // Clear the "No events" message if it exists
    if (eventList.querySelector('p')) {
        eventList.innerHTML = '';
    }

    // Create the new event item
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';

    const eventDetails = document.createElement('span');
    // Format the date for better readability
    const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    eventDetails.textContent = ${eventName} on ${formattedDate};
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.onclick = function() {
        eventList.removeChild(eventItem);
        // If the list becomes empty, show the placeholder message again
        if (eventList.children.length === 0) {
            eventList.innerHTML = '<p>No upcoming events.</p>';
        }
    };
    
    eventItem.appendChild(eventDetails);
    eventItem.appendChild(deleteButton);
    eventList.appendChild(eventItem);

    // Clear input fields
    eventNameInput.value = '';
    eventDateInput.value = '';
}