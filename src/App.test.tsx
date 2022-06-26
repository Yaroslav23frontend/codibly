import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeValueProivider from './context/ThemeValueContext';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Table test', () => {
  render(
    <Provider store={store}>
      <ThemeValueProivider>
        <App />
      </ThemeValueProivider>
    </Provider>
  );
  test('fetch data', async () => {
    const item = await screen.findAllByTestId('table-item');
    expect(item.length).toBeGreaterThan(0);
  });
  test('should add 1 to count', async () => {
    render(
      <Provider store={store}>
        <ThemeValueProivider>
          <App />
        </ThemeValueProivider>
      </Provider>
    );
    const page = screen.getByTestId('page');
    const next = screen.getByTestId('next-button');
    const back = screen.getByTestId('back-button');
    await waitFor(() => userEvent.click(next));
    console.log(window.location.pathname.replace());

    expect(Number(page.textContent)).toBe(2);
    await waitFor(() => userEvent.click(back));
    expect(Number(page.textContent)).toBe(1);
  });
});
