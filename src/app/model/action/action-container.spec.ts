import { ActionContainer } from './action-container';
import { AddItem } from './add-item.action';
import { AddMoney } from './add-money.action';

describe('ActionContainer', () => {
  it('should be empty after creation', () => expect(new ActionContainer().actions.length).toBe(0));

  it('should correctly add actions', () => {
    const container = new ActionContainer();
    container.addAction(new AddItem());
    expect(container.actions.length).toBe(1);
  });

  it('should correctly remove actions', () => {
    const container = new ActionContainer();
    container.addAction(new AddItem());
    container.addAction(new AddItem());
    container.addAction(new AddItem());
    container.removeAction(1);
    expect(container.actions.length).toBe(2);
  });

  it('should throw errors when trying to remove non-existent actions', () => {
    expect(() => new ActionContainer().removeAction(-1)).toThrowError('Cannot remove a non-existent action');
    expect(() => new ActionContainer().removeAction(666)).toThrowError('Cannot remove a non-existent action');
  });

  it('should correctly clear actions', () => {
    const container = new ActionContainer();
    container.addAction(new AddItem());
    container.addAction(new AddItem());
    container.addAction(new AddItem());
    container.clearActions();
    expect(container.actions.length).toBe(0);
  });

  xit('should correctly perform actions', () => {
    const container = new ActionContainer();
    container.addAction(new AddItem());
    container.addAction(new AddMoney());

    expect(container.performActions().length).toBe(2);
  });
});
