import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeValueProivider from './context/ThemeValueContext';
import App from './App';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react-hooks';
import axios, { AxiosResponse } from 'axios';

describe('Table test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const mAxiosResponse: object = {
    data: {
      page: 1,
      per_page: 5,
      total: 12,
      total_pages: 3,
      data: [
        {
          id: 1,
          name: 'cerulean',
          year: 2000,
          color: '#98B2D1',
          pantone_value: '15-4020'
        },
        {
          id: 2,
          name: 'fuchsia rose',
          year: 2001,
          color: '#C74375',
          pantone_value: '17-2031'
        },
        {
          id: 3,
          name: 'true red',
          year: 2002,
          color: '#BF1932',
          pantone_value: '19-1664'
        },
        {
          id: 4,
          name: 'aqua sky',
          year: 2003,
          color: '#7BC4C4',
          pantone_value: '14-4811'
        },
        {
          id: 5,
          name: 'tigerlily',
          year: 2004,
          color: '#E2583E',
          pantone_value: '17-1456'
        }
      ],
      support: {
        url: 'https://reqres.in/#support-heading',
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
      }
    }
  } as AxiosResponse;
  test('buttons: next, back, first and last', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mAxiosResponse);

    act(() => {
      render(
        <Provider store={store}>
          <ThemeValueProivider>
            <App />
          </ThemeValueProivider>
        </Provider>
      );
    });
    const page = await screen.findByTestId('page');
    const next = await screen.getByTestId('next-button');
    const back = await screen.getByTestId('back-button');
    const last = await screen.getByTestId('last-button');
    const first = await screen.getByTestId('first-button');
    await waitFor(() => userEvent.click(next));
    expect(Number(page.textContent)).toBe(2);
    await waitFor(() => userEvent.click(back));
    expect(Number(page.textContent)).toBe(1);
    await waitFor(() => userEvent.click(last));
    expect(Number(page.textContent)).toBe(3);
    await waitFor(() => userEvent.click(first));
    expect(Number(page.textContent)).toBe(1);
  });
});
