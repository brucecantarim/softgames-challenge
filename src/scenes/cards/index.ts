import * as PIXI from "pixi.js";

import BackButton from "../../components/BackButton";
import Card from "./card";

const cardsScene = () => {
  // TODO: Refactor this so I can correctly change the zOrder of the cards
  // Create two stacks of cards
  const leftDeck = new PIXI.Container();
  const rightDeck = new PIXI.Container();
  leftDeck.x = 30;
  leftDeck.y = window.innerHeight / 5;
  rightDeck.x = window.innerWidth - 130;
  rightDeck.y = window.innerHeight / 5;

  // Animation variables
  interface drawedCardsProps {
    id: number;
    card: PIXI.Container;
    timeSinceLastMove: number;
  }
  const ticker = new PIXI.Ticker();
  const drawTimer = 1000; // 1 second
  const animationDuration = 2000; // 2 seconds

  // Added a type to the startingDeck variable for ease of testing
  const startingDeck = leftDeck;
  const deckLength = 144;

  let currentDeck = startingDeck;
  let targetDeck = startingDeck === leftDeck ? rightDeck : leftDeck;
  let cardIndex = 0;
  let drawedCards: drawedCardsProps[] = [];
  let timeSinceLastDraw = performance.now();

  // Function to populate a deck
  const populateDeck = (deck: PIXI.Container, quantity: number) => {
    for (let i = 0; i < 144; i++) {
      const card = Card(i + 1);
      card.y = i * 2;
      deck.addChildAt(card, 0);
    }
  };

  // Populate decks
  populateDeck(startingDeck, deckLength);

  const drawCard = (now: number) => {
    // Draw card
    const card = currentDeck.getChildAt(cardIndex) as PIXI.Container;
    drawedCards = [
      ...drawedCards,
      { id: cardIndex, card, timeSinceLastMove: now },
    ];
    cardIndex++;
    timeSinceLastDraw = now;
  };

  const addCardToTargetDeck = (card: PIXI.Container, id: number) => {
    card.x = 0;
    drawedCards = drawedCards.filter((c) => c.id !== id);
    targetDeck.addChildAt(card, 0);
  };

  const SwapDecksAndReset = (now: number) => {
    // Swap decks and reset cardIndex
    [currentDeck, targetDeck] = [targetDeck, currentDeck];
    cardIndex = 0;
    drawCard(now);
  };

  const MoveCard = (card: PIXI.Container, progress: number) => {
    // Get card's global position
    const cardX = card.toGlobal(new PIXI.Point()).x;
    // Move card to target
    const distanceX = Math.abs(targetDeck.x - cardX);
    if (cardX !== targetDeck.x) {
      card.x =
        targetDeck.x > cardX
          ? Math.min(cardX + distanceX * progress, targetDeck.x - currentDeck.x)
          : Math.max(
              cardX - distanceX * progress,
              targetDeck.x - currentDeck.x
            );
    }
  };

  // Animation loop
  const animate = () => {
    // TODO: Debug the animation loop
    const now = performance.now();

    if (now - timeSinceLastDraw >= drawTimer) drawCard(now);

    // Move cards
    drawedCards.forEach(({ id, card, timeSinceLastMove }) => {
      const progress = (now - timeSinceLastMove) / animationDuration;

      if (progress >= animationDuration) addCardToTargetDeck(card, id);

      MoveCard(card, progress);
    });

    if (cardIndex >= deckLength) SwapDecksAndReset(now);
  };

  ticker.add(() => animate());
  ticker.start();

  // Create a container for the scene
  const scene = new PIXI.Container();
  scene.addChild(leftDeck);
  scene.addChild(rightDeck);
  scene.addChild(BackButton());

  return scene;
};

export default cardsScene;
