import {RESTART_GAME, MAKE_GUESS, GENERATE_AURAL_UPDATE} from './actions';

const initialState = {
    guesses: [],
    feedback: 'What is your guess?',
    auralStatus: '',
    correctAnswer: Math.round(Math.random() * 100) + 1
};

export default (state = initialState, action) => {
    if (action.type === RESTART_GAME) {
        return Object.assign({}, state, {
            guesses: [],
            feedback: 'What is your guess?',
            auralStatus: '',
            correctAnswer: action.correctAnswer
        });
    }

    if (action.type === MAKE_GUESS) {
        let feedback, guess;

        guess = parseInt(action.guess, 10);
        if (isNaN(guess)) {
            feedback = 'Not a valid number.';

            return Object.assign({}, state, {
                feedback,
                guesses: [...state.guesses, guess]
            });
        }

        const difference = Math.abs(guess - state.correctAnswer);

        if (difference >= 50) {
            feedback = "Super Cold...";
        } else if (difference >= 30) {
            feedback = "Cold...";
        } else if (difference >= 10) {
            feedback = "Warm.";
        } else if (difference >= 1) {
            feedback = "Hot!";
        } else {
            feedback = 'Nailed it!';
        }

        return Object.assign({}, state, {
            feedback,
            guesses: [...state.guesses, guess]
        });
    }

    if (action.type === GENERATE_AURAL_UPDATE) {
        const {guesses, feedback} = state;

        const pluralize = guesses.length !== 1;

        let auralStatus = `This is how the game is going: ${feedback} You've made ${guesses.length} ${pluralize
            ? 'guesses'
            : 'guess'}.`;

        if (guesses.length > 0) {
            auralStatus += ` ${pluralize
                ? 'In order of most- to least-recent, they are'
                : 'It was'}: ${guesses.reverse().join(', ')}`;
        }

        return Object.assign({}, state, {auralStatus});
    }

    return state;
};
