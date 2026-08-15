import { render, screen } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  // App requires the service worker promise that index.js hands it; one that
  // never settles matches the common case of a repeat visit with no new deploy.
  render(<App sWPromise={new Promise(() => {})} />);

  expect(
    screen.getByRole('heading', { name: /Horarios de El Villarino - 319/i })
  ).toBeInTheDocument();
});
