import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeValueProivider from './context/ThemeValueContext';
import App from './App';
import axios from 'axios';
import { useState } from 'react';
describe('Table test', () => {
  render(
    <Provider store={store}>
      <ThemeValueProivider>
        <App />
      </ThemeValueProivider>
    </Provider>
  );
  test('fetch data', async () => {
    const [error, setError] = useState<string>('');
    const [total, setTotal] = useState<number>(0);
    function fetchData(
      url: string,
      page: number,
      per_page: number,
      id: number | string,
      action: string
    ) {
      console.log(`${url}/?page=${page}&per_page=${per_page}&id=${id}`);
      axios
        .get(`${url}/?page=${page}&per_page=${per_page}&id=${id}`)
        .then((result: DATA) => {
          console.log(result);
          setError('');
          if (id !== '') {
            dispatch({ type: action, payload: [result.data.data] });
            setTotal(1);
          } else {
            dispatch({ type: action, payload: result.data.data });
            setTotal(result.data.total);
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setLoading(true));
    }
    const item = await screen.findAllByTestId('table-item');
    expect(item.length).toBeGreaterThan(0);
  });
});
