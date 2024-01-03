// const fs = require('fs');
// const cheerio = require('cheerio');

// // Read the HTML file
// const htmlFilePath = './index.html';
// const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

// // Load HTML content into Cheerio
// const $ = cheerio.load(htmlContent);

// // Find all <img> tags
// const imgTags = $('img');

// // Iterate over each <img> tag and print its attributes
// imgTags.each((index, element) => {
//     const src = $(element).attr('src');
//     const alt = $(element).attr('alt');

//     console.log(`Image ${index + 1}:`);
//     console.log(`  Source: ${src}`);
//     console.log(`  Alt Text: ${alt || 'N/A'}`);
//     console.log('------------------');
// });

//Fetch tracking data
document.addEventListener('DOMContentLoaded', function () {
    // Load the JSON file containing tracking pixel URLs
    fetch('/tracker.json')
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
                    // Mark the email with a specific class or perform any desired action
                    const icon = document.createElement('i');
                    icon.classList.add('fa-solid', 'fa-hurricane');

                    // Append the icon to the same parent element as the original image
                    image.parentNode.appendChild(icon);
                }
            });
        })
        .catch(error => console.error('Error loading tracker.json:', error));
});

// Reload the page every 2.5 seconds (2500 milliseconds)
setInterval(() => {
    location.reload();
}, 2500);