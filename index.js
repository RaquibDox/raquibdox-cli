#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fs from "fs";
import open from "open";
import clipboardy from "clipboardy";
import https from "https";


const sleep =(ms = 500) => new Promise((r) => setTimeout(r, ms));

async function welcome(){
    const msg = `RaquibDox`
    figlet( msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    });

    await sleep();

    console.log(`
    ${chalk.blue('Pick an Option : ')}`);

    async function Options(){
        const answers = await inquirer.prompt({
            name: 'Choose',
            message: 'Pick an Option : ',
            type: 'list',
            choices: [
                'Download Resume',
                'My Socials',
                'Live Project Links',
                'Portfolio Website',
                'Contact Me',
                'Quit'
            ],
        });

        return handleAnswer(answers.Choose)
    }

    async function handleAnswer(option){
        console.clear();
        
        const msg = `RaquibDox`
        figlet( msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
        });

        switch (option){
            case 'Download Resume':

                const url = "https://raquib-dox-resume.netlify.app/Md_Raquib_resume.pdf";

                // Options
                    const spinner = createSpinner("Downloading Resume").start();

                    https.get(url, (res) => {
                        // Image will be stored at this path
                        const path = `${process.cwd()}/Md_Raquib_resume.pdf`;
                        const filePath = fs.createWriteStream(path);
                        res.pipe(filePath);
                        filePath.on("finish", () => {
                            filePath.close();
                            spinner.success({
                                text: "Resume downloaded in current directory.",
                            });
                            setTimeout(() => {
                                Options();
                            }, 2000);
                        });
                    });
                break;
               
            case 'My Socials':
                const answers = await inquirer.prompt({
                    name: 'Social',
                    message: 'Pick a Social Media Link : ',
                    type: 'list',
                    choices: [
                        'GitHub',
                        'LinkedIn',
                        'Go Back',
                        'Quit'
                    ],
                });
                return handleAnswer(answers.Social);
    

            case 'GitHub':
                open('https://github.com/RaquibDox');
                await handleAnswer('My Socials');
                break;

            case 'LinkedIn':
                open('https://www.linkedin.com/in/md-raquib-6a410b192/');
                await handleAnswer('My Socials');
                break;
            
            
            case 'Live Project Links':
                const links = await inquirer.prompt({
                    name: 'Project',
                    type: 'list',
                    message: 'Pick a Live Project Link : ',
                    choices: [
                        'MoviesDox',
                        'TypingDox',
                        'Go Back',
                        'Quit'
                    ],
                });
                return handleAnswer(links.Project);

            case 'MoviesDox':
                open('https://moviesdox.netlify.app/');
                await handleAnswer('Live Project Links');
                break;

            case 'TypingDox':
                open('https://typingdox.netlify.app/');
                await handleAnswer('Live Project Links');
                break;

            case 'Portfolio Website':
                open('https://raquibdox.netlify.app/');
                await Options();
                break;
            
            case 'Contact Me':
                const contact = await inquirer.prompt({
                    name: 'Contact',
                    type: 'list',
                    message: 'Pick a Method of Communication : ',
                    choices: [
                        'Mail Me',
                        'Copy Email to Clipboard',
                        'Go Back',
                        'Quit'
                    ],
                });
                return handleAnswer(contact.Contact);

            case 'Mail Me':
                open('https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=70raquib@gmail.com');
                await handleAnswer('Contact Me');
                break;
            
            case 'Copy Email to Clipboard':
                clipboardy.writeSync('70raquib@gmail.com');
                console.log('Text copied to clipboard!');
                await handleAnswer('Contact Me');
                break;

            case 'Go Back':
                await Options();
                break;   

            case 'Quit':
                console.log("Ok, Byeeeeee!");
                break;    

            default:
                console.log("Sorry, Not yet Available");
                await Options();
                break;
        }
    }

await Options();
}

await welcome();