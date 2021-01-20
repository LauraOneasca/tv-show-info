import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import EpisodeSidebar from '.';

const info = {
  Title: '401 Unauthorized',
  Released: '06 Oct 2019',
  Episode: '1',
  Plot:
    'During the Christmas season, Elliot and Mr. Robot make their return; Darlene deals with real trouble; Tyrell is bored; Dom becomes paranoid.',
  imdbRating: '9.4',
};

describe('EpisodeSidebar', () => {
  it('should match the snapshot', () => {
    const tree = render(<EpisodeSidebar info={info} />);

    expect(tree.baseElement).toMatchSnapshot();
  });
});
