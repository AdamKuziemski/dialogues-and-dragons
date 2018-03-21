// alphabetical list of possible actions
export enum ActionType {
    AddItem,
    RemoveItem,
    SetQuestStage
}

export const booleanTypes = [];
export const numericTypes = [
    ActionType.AddItem,
    ActionType.RemoveItem,
    ActionType.SetQuestStage
];

export const playerActions = [
    ActionType.AddItem,
    ActionType.RemoveItem
];
export const questActions = [
    ActionType.SetQuestStage
];
