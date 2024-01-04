// script.js

// Import the trackEmails function from emailService.js
import {trackEmails} from './emailService.js';

document.addEventListener('DOMContentLoaded', function () {
    trackEmails('/tracker.json', function (trackedImage) {
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-hurricane');
        trackedImage.parentNode.appendChild(icon);
    });
});

setInterval(() => {
    location.reload();
}, 2500);
