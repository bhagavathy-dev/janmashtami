export type GameObjectType =
  | "butter"
  | "peacock"
  | "diya"
  | "flower"
  | "empty-pot";

export const gameObjects = [
  {
    type: "butter" as GameObjectType,
    emoji: "🧈",
    points: 1,
  },
  {
    type: "peacock" as GameObjectType,
    emoji: "🦚",
    points: 2,
  },
  {
    type: "diya" as GameObjectType,
    emoji: "🪔",
    points: 0,
  },
  {
    type: "flower" as GameObjectType,
    emoji: "🪷",
    points: 0,
  },
  {
    type: "empty-pot" as GameObjectType,
    emoji: "🥣",
    points: -1,
  },
];