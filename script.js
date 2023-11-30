const fs = require('fs');
const cheerio = require('cheerio');

// Read the HTML file
const htmlFilePath = './index.html';
const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

// Load HTML content into Cheerio
const $ = cheerio.load(htmlContent);

// Find all <img> tags
const imgTags = $('img');

// Iterate over each <img> tag and print its attributes
imgTags.each((index, element) => {
    const src = $(element).attr('src');
    const alt = $(element).attr('alt');

    console.log(`Image ${index + 1}:`);
    console.log(`  Source: ${src}`);
    console.log(`  Alt Text: ${alt || 'N/A'}`);
    console.log('------------------');
});
