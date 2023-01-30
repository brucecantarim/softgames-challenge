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

Due to the time limitation, the following decisions were made to deliver the project in time:

- The Cards Demo only makes use of PixiJS default package. It could be greatly improved using other plugins and libraries, such as @pixi/layers for dealing with the zIndex of the cards and animejs or gsap for the animations.
- The project lacks test implementation, did all of my testing manually, but I did added the jest library and tried to make most of the functions prepared for testing (that's why I opted for coding in a functional programming paradigm instead of OOP).
- There's no music or audio in this demo.
- It works on mobile, but the UI experience was not optimized for it. I wish I had started the project with a good strategy to deal better with font and elements resizing according to the device.
- Assets are not fully optmized in terms of size and delivery. I pushed it to the end of development, and ended up not being able to review them.
- Particle textures and Images are by [Kenney](https://kenney.nl/assets/particle-pack)

Thank you for your consideration!
