import * as PIXI from "pixi.js";
import * as Layers from "@pixi/layers";

import BackButton from "../../components/BackButton";
import Card from "./card";

const cardsScene = (app: PIXI.Application) => {
  // Create a card container
  const container = new PIXI.Container();

  // Create two stacks of cards positions
  const leftDeck = new PIXI.Point(30, window.innerHeight / 5);
  const rightDeck = new PIXI.Point(
    window.innerWidth - 130,
    window.innerHeight / 5
  );

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
  let currentDeck = startingDeck;
  let targetDeck = startingDeck === leftDeck ? rightDeck : leftDeck;
  let cardIndex = 0;
  const deckLength = 144;
  let drawedCards: drawedCardsProps[] = [];
  let timeSinceLastDraw = performance.now();

  // Function to populate a deck
  const populateDeck = (deck: PIXI.Point, quantity: number) => {
    for (let i = 0; i < 144; i++) {
      const card = Card(i + 1);
      card.x = deck.x;
      card.y = deck.y + i * 2;
      container.addChildAt(card, 0);
    }
  };

  // Populate decks
  populateDeck(startingDeck, deckLength);

  const drawCard = (now: number) => {
    // Draw card
    if (cardIndex < deckLength) {
      const card = container.getChildAt(
        deckLength - 1 - cardIndex
      ) as PIXI.Container;
      drawedCards = [
        ...drawedCards,
        { id: cardIndex, card, timeSinceLastMove: now },
      ];
      cardIndex++;
    }
    timeSinceLastDraw = now;
  };

  const removeCardFromDrawedCards = (id: number) => {
    drawedCards = drawedCards.filter((c) => c.id !== id);
  };

  const swapDecksAndReset = (now: number) => {
    // Swap decks and reset cardIndex
    [currentDeck, targetDeck] = [targetDeck, currentDeck];
    cardIndex = 0;
    drawCard(now);
  };

  const moveCard = (id: number, card: PIXI.Container, progress: number) => {
    // Move card to target
    const distanceX = Math.abs(targetDeck.x - card.x);
    const targetY =
      targetDeck === leftDeck
        ? targetDeck.y + id * 2
        : targetDeck.y + deckLength * 2 - id * 2;
    const distanceY = Math.abs(card.y - targetY);
    if (card.x !== targetDeck.x) {
      card.x =
        targetDeck.x > card.x
          ? Math.min(
              card.x + distanceX * progress,
              targetDeck.x - currentDeck.x
            )
          : Math.max(
              card.x - distanceX * progress,
              targetDeck.x - currentDeck.x
            );
    }
    if (card.y < targetY) {
      card.y = Math.min(card.y + distanceY * progress, targetY);
    } else if (card.y > targetY) {
      card.y = Math.max(card.y - distanceY * progress, targetY);
    }
  };

  // Animation loop
  const animate = () => {
    const now = performance.now();

    if (now - timeSinceLastDraw >= drawTimer) drawCard(now);

    // Move cards
    drawedCards.forEach(({ id, card, timeSinceLastMove }) => {
      const progress = (now - timeSinceLastMove) / animationDuration;
      if (progress < 1) moveCard(id, card, progress);
      if (progress >= 1) removeCardFromDrawedCards(id);
    });

    if (cardIndex === deckLength && drawedCards.length <= 0)
      swapDecksAndReset(now);
  };

  ticker.add(() => animate());
  ticker.start();

  // Create a container for the scene
  const scene = new PIXI.Container();
  scene.addChild(container);
  scene.addChild(BackButton());

  return scene;
};

export default cardsScene;
