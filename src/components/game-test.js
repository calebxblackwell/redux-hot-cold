import React from 'react';
import { shallow } from 'enzyme';

import Game from './game';

describe('<Game />', () => {
  it('Renders without crashing', () => {
    shallow(<Game />);
  });

  it('Starts a new game', () => {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      guesses: [1, 2, 3, 4],
      feedback: 'Rad',
      correctAnswer: -1
    });
    wrapper.instance().restartGame();
    expect(wrapper.state('guesses')).toEqual([]);
    expect(wrapper.state('feedback')).toEqual('Try to guess!');
    expect(wrapper.state('correctAnswer')).toBeGreaterThanOrEqual(0);
    expect(wrapper.state('correctAnswer')).toBeLessThanOrEqual(100);
  });

  it('Can make guesses', () => {
    const wrapper = shallow(<Game />);
    wrapper.setState({
      correctAnswer: 100
    });

    wrapper.instance().makeGuess(25);
    expect(wrapper.state('guesses')).toEqual([25]);
    expect(wrapper.state('feedback')).toEqual('Super Cold...');

    wrapper.instance().makeGuess(60);
    expect(wrapper.state('guesses')).toEqual([25, 60]);
    expect(wrapper.state('feedback')).toEqual('Cold...');

    wrapper.instance().makeGuess(80);
    expect(wrapper.state('guesses')).toEqual([25, 60, 80]);
    expect(wrapper.state('feedback')).toEqual('Warm.');

    wrapper.instance().makeGuess(95);
    expect(wrapper.state('guesses')).toEqual([25, 60, 80, 95]);
    expect(wrapper.state('feedback')).toEqual('Hot!');

    wrapper.instance().makeGuess(100);
    expect(wrapper.state('guesses')).toEqual([25, 60, 80, 95, 100]);
    expect(wrapper.state('feedback')).toEqual('You guessed it!');
  });

  it('Can generate aural updates', () => {
    const wrapper = shallow(<Game />);

    wrapper.setState({
      correctAnswer: 100
    });

    wrapper.instance().makeGuess(95);
    wrapper.instance().makeGuess(17);
    wrapper.instance().makeGuess(27);

    wrapper.instance().generateAuralUpdate();

    expect(wrapper.state('auralStatus')).toEqual('Status of the game: Warm. You\'ve made 3 guesses. In order of most- to least-recent, they are: 95, 17, 27');

  });
});
