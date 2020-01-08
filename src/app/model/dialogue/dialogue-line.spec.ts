import { LineContainer } from './dialogue-line';

xdescribe('DialogueLine', () => {
  // empty for now
});

describe('LineContainer', () => {
  let container: LineContainer;

  const fill = () => container.add(
    'Chicken chaser! Do you chase chickens?',
    'I used to be an adventurer, like you. Then I took an arrow in the knee',
    `You'll never take me alive, you robotic sumbitch!`
  );

  beforeEach(() => container = new LineContainer());

  it('should add single lines', () => {
    expect(container.empty).toBe(true);

    container.add('Hurro');
    expect(container.length).toBe(1);

    expect(container.empty).toBe(false);
  });

  it('should add multiple lines', () => {
    container.add(
      'Chicken chaser! Do you chase chickens?',
      'I used to be an adventurer, like you. Then I took an arrow in the knee',
      `You'll never take me alive, you robotic sumbitch!`
    );

    expect(container.length).toBe(3);
  });

  it('should remove lines', () => {
    fill();
    container.remove(1);
    expect(container.length).toBe(2);
  });

  it('should swap lines', () => {
    fill();
    container.swap(0, 1);
    expect(container.lines[0].line).toBe('I used to be an adventurer, like you. Then I took an arrow in the knee');

    container.swap(0, 2);
    expect(container.lines[0].line).toBe(`You'll never take me alive, you robotic sumbitch!`);
  });

  it('should not swap when one of the indices is not in the lines array', () => {
    const bestFableTitle = 'Chicken chaser! Do you chase chickens?';
    fill();

    container.swap(0, 42);
    expect(container.lines[0].line).toBe(bestFableTitle);

    container.swap(42, 0);
    expect(container.lines[0].line).toBe(bestFableTitle);

    container.swap(0, -1);
    expect(container.lines[0].line).toBe(bestFableTitle);

    container.swap(-1, 0);
    expect(container.lines[0].line).toBe(bestFableTitle);
  });

  it('should clear', () => {
    fill();
    expect(container.empty).toBe(false);
    container.clear();
    expect(container.empty).toBe(true);
  });
});
