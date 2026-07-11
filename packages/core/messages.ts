export const COMPLETION_MESSAGES = [
  "Discipline is the bridge between goals and accomplishment.",
  "Your future self is thanking you for this focus session.",
  "The Sentinel is impressed by your commitment.",
  "Every minute focused is a brick in the wall of discipline.",
  "Unshakeable focus. Unstoppable growth.",
  "You conquered the distraction. You won the day.",
  "Consistency beats intensity. Well done.",
];

export const getRandomMessage = () => COMPLETION_MESSAGES[Math.floor(Math.random() * COMPLETION_MESSAGES.length)];
