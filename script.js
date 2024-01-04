

//Fetch tracking data
function trackEmails(trackerJsonUrl, callback) {
    fetch(trackerJsonUrl)
        .then(response => response.json())
        .then(data => {
            // Get all images in the document
            const images = document.querySelectorAll('img');

            // Iterate through each image
            images.forEach(function (image) {
                // Check if the image source matches any tracking pixel URL
                const isTracked = Object.keys(data).some(tracker => {
                    const regex = new RegExp(data[tracker]);
                    return regex.test(image.src);
                });

                if (isTracked) {
                    // Execute the callback with the tracked image
                    callback(image);
                }
            });
        })
        .catch(error => console.error('Error loading tracker.json:', error));
}

// Usage
document.addEventListener('DOMContentLoaded', function () {
    trackEmails('/tracker.json', function (trackedImage) {
        // Mark the email with a specific class or perform any desired action
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-hurricane');

        // Append the icon to the same parent element as the original image
        trackedImage.parentNode.appendChild(icon);
    });
});

// Reload the page every 2.5 seconds (2500 milliseconds)
setInterval(() => {
    location.reload();
}, 2500);