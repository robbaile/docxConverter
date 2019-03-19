const fs = require('fs');
const mammoth = require("mammoth");
const { unminifySource } = require('unminify');

const output = './output/'
const input = './directory';

// Read Directory
fs.readdir(input, (err, items) => {
    items.map((item) => {
        fs.readFile(`${input}/${item}`, 'utf-8', function(err, contents) { 
			// Throw it into the inspector, with the file name. 
			convertHTML(item);  
		});
    });
});

const options = {
    styleMap: [
        "p[style-name='Font Size 26'] => h4.fbels__heading.fbels__heading--remember:fresh",
    ]
};

let convertHTML = (filename) => {
    let split = filename.split('.');
    mammoth.convertToHtml({path: `${input}/${filename}`}, options)
    .then((result) => {
        let html = result.value; // The generated HTML
        let messages = result.messages; // Any messages, such as warnings during conversion
        
        fs.appendFileSync(`${output}/${split[0]}.html`, html);
        console.log(messages);
    })
    .done();
}

