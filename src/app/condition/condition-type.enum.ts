// alphabetical list of possible conditions
export enum ConditionType {
    DispositionTowardsPlayer,
    GetItemCount,
    HasItem,
    Name,
    QuestStage
}

export const booleanTypes = [
    ConditionType.HasItem
];
export const numericTypes = [
    ConditionType.DispositionTowardsPlayer,
    ConditionType.GetItemCount,
    ConditionType.QuestStage
];

export const playerConditions = [
    ConditionType.GetItemCount,
    ConditionType.HasItem,
    ConditionType.Name
];
export const actorConditions = [
    ...playerConditions,
    ConditionType.DispositionTowardsPlayer,
];
export const questConditions = [
    ConditionType.QuestStage
];
