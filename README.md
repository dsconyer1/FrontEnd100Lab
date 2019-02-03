# Front-End Web 100 Starter Project

This is a project created for the Front-End Web 100 Class.

It is a starter project that has WebPack installed, and the Babel loader, as well as loaders for CSS.

## Some Commands

This project uses NPM scripts, configured in the `package.json` file.
These commands should be run in the root directory of this project from a terminal window.

### To Install the Dependencies

`npm install`

### To run your specs (tests)

`npm test`

### To run your application in development mode

`npm run dev`

### To build your application

`npm run build`

# Code Review Notes

Daryl! Really nice job. I can see your prework paid off. All sorts of good JavaScript doo-dads in your code. 

I put a few comments in the `index.html` and the `index.js` file for you. Nothing major.

I'd say your next step would be to break up that `index.js` file some. I found it a bit challenging to navigate with all
the stuff going on in there. There was a lot of validators that easily could have been moved to another file (module) because you did a good job of making them pure functions.

For functions that aren't pure (rely on module-level variables) you could see if there are groups of functions that rely on a specific set of those variables and move them to a module. You might even consider making some a class.

But super job. I look forward to seeing you in 200!