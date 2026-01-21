import { ConsoleLogger, LOGGER_TOKEN } from './injectToken.constante';

describe('LOGGER_TOKEN', () => {
  it('should be defined', () => {
    expect(LOGGER_TOKEN).toBeTruthy();
  });
});

describe('ConsoleLogger', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log with a default prefix', () => {
    const logger = new ConsoleLogger();

    logger.log('hello');

    expect(console.log).toHaveBeenCalledWith('[LOG] hello');
  });

  it('should include context when provided', () => {
    const logger = new ConsoleLogger();

    logger.log('hello', { a: 1 });

    expect(console.log).toHaveBeenCalledWith('[LOG] hello', { a: 1 });
  });
});
