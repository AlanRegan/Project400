import { render, screen } from '@testing-library/react';
import { isToastIdValid } from 'react-toastify/dist/utils';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div)
});

describe("attributes", () => {
  it('uses the right homepage', () =>{
    const app = new App()
    expect(app.homepage).toEqual("https://eloquent-shaw-e2d2b7.netlify.app")
  })
})
