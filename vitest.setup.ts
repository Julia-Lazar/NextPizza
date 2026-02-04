import '@testing-library/jest-dom/vitest'; // tutaj już masz zainportowane rozszerzenia matchers z jest-dom
import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './__mocks__/node';

// Establish API mocking before all tests.
beforeAll(() => server.listen())        
// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())