/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: 'input',
            name: 'URL',
            message: 'Type in your URL: ',
        }
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        const url = answers.URL; // Assuming the user input is a URL
        const qr_svg = qr.image(url, { type: 'png' });
        qr_svg.pipe(fs.createWriteStream('qr_image.png'));

        fs.writeFile('user_input.txt', url, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });