# SOFTGAMES HTML5 GAME DEVELOPER TEST

_Live version:_ [softgames.surge.sh](softgames.surge.sh)

## Description

This is a PixiJS, Typescript and Webpack project that implements the following tasks:

1. Create 144 sprites (NOT graphics object) that are stacked on each other like cards in a deck(so object above covers bottom one, but not completely). Every second 1 object from top of stack goes to other stack - animation of moving should be 2 seconds long. So at the end of whole process you should have reversed stack. Display number of fps in left top corner and make sure, that this demo runs well on mobile devices.
2. Create a tool that will allow mixed text and images in an easy way (for example displaying text with emoticons or prices with money icon). It should come up every 2 seconds a random text with images in random configuration (image + text + image, image + image + image, image + image + text, text + image + text etc) and a random font size.
3. Particles - make a demo that shows an awesome fire effect. Please keep number of images low (max 10 sprites on screen at once). Feel free to use existing libraries how you would use them in a real project.

Please check Acknowlegments bellow for more details.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them. For example:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

### Installing

A step by step guide on how to set up the project on your local machine.

1. Clone the repository
   ` git clone https://github.com/brucecantarim/softgames-challenge.git`

2. Install the dependencies

```
cd your-repository
npm install
```

3. Start the development server
   `npm start`

## Built With

- [PixiJS](https://www.pixijs.com/) - The 2D WebGL renderer used
- [TypeScript](https://www.typescriptlang.org/) - The programming language used
- [Webpack](https://webpack.js.org/) - The module bundler used

## Authors

- **Bruce Cantarim** - [Github Profile](https://github.com/brucecantarim)

## Acknowledgments

- The Cards Demo still needs work. Due to my Card component being a container, the usual strategy to deal with zOrder doesn't work here. I also need to debug and fix the animation loop, it currently stops when reaching the end of the first shuffle.

## Thank you for your consideration!
