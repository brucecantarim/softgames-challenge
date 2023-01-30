import Button from "./Button";
import events from "../utils/events";

const BackButton = () => {
  const button = Button({
    label: "◀ Back",
    width: 120,
    height: 60,
    callback: () => {
      events.emit("back");
    },
    color: 0xffffff,
    backgroundColor: 0xff0000,
  });

  button.x = window.innerWidth - (button.width + 10);
  button.y = 10;

  return button;
};

export default BackButton;
