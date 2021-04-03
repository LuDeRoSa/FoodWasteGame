import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { CATEGORIES, FOODS } from './SortFruitsData';
import SortFruitsDropzone from './SortFruitsDropzone';
/**
 * Enums for representing the game play state
 */
export const GAME_STATE = {
    READY: 'ready',
    PLAYING: 'playing',
    DONE: 'done',
};
const initialState = {
    // Initialize
    unsorted: FOODS,
    [CATEGORIES.GOOD]: [],
    [CATEGORIES.BAD]: [],
    gameState: GAME_STATE.READY
};
export default class SortFruits extends React.Component {
    state = initialState;
    startGame = () => {
        this.setState(
            {
                gameState: GAME_STATE.PLAYING,
            },
        );
    };
    endGame = () => {
        this.setState({
            gameState: GAME_STATE.DONE,
        });
        // Calculate final user score
        let score = getCalculatedScore(this.state[CATEGORIES.GOOD], this.state[CATEGORIES.BAD]);
    };
    onDragEnd = ({ source, destination }) => {
        // If the destination is not found, return
        if (!destination) {
            return;
        }
        this.setState(state => {
            return move(state, source, destination);
        });
    };
    render() {
        const { gameState, unsorted } = this.state;
        const isDropDisabled = gameState === GAME_STATE.DONE;
        return (
            <>
                {(this.state.gameState === GAME_STATE.PLAYING ||
                    this.state.gameState === GAME_STATE.DONE) && (
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="container">
                            <div className="columns">
                                <SortFruitsDropzone
                                    id={CATEGORIES.GOOD}
                                    foods={this.state[CATEGORIES.GOOD]}
                                    isDropDisabled={isDropDisabled}
                                />
                                <SortFruitsDropzone id="unsorted" foods={unsorted} isDropDisabled={isDropDisabled} />
                                <SortFruitsDropzone
                                    id={CATEGORIES.BAD}
                                    foods={this.state[CATEGORIES.BAD]}
                                    isDropDisabled={isDropDisabled}
                                />
                            </div>
                        </div>
                    </DragDropContext>
                )}
                <button id='end-sort-fruit' onClick={this.endGame}>I'm done!</button>
            </>
        );
    }
    componentDidMount() {
        this.startGame();
    }
}
// Some constants and helper functions
/**
 * Helps handle movement between lists
 */
export const move = (state, source, destination) => {
    const srcListClone = [...state[source.droppableId]];
    const destListClone =
        source.droppableId === destination.droppableId
            ? srcListClone
            : [...state[destination.droppableId]];
    const [movedElement] = srcListClone.splice(source.index, 1);
    destListClone.splice(destination.index, 0, movedElement);
    return {
        [source.droppableId]: srcListClone,
        ...(source.droppableId === destination.droppableId
            ? {}
            : {
                [destination.droppableId]: destListClone,
            }),
    };
};
/**
 * Calculate user score by compare what they have listed as good and bad compared to
 * actual good and bad arrays. Add a point for each correct answer to get the
 * total possible max of 12 (5 good + 7 bad)
 */
export const getCalculatedScore = (goodFoodUserAnswers, badFoodUserAnswers) => {
    debugger;
    let score = 0;
    // Get good and bad correct answers
    let goodFoods = [];
    let badFoods = [];
    for (let i = 0; i < FOODS.length; i++) {
        if (FOODS[i].categories === 'good') {
            debugger;
            let temp = FOODS[i].name;
            goodFoods.push(FOODS[i].name);
        } else {
            badFoods.push(FOODS[i].name)
        }
    }
    // Compare the user's good and bad answers
    // If the user's answer is in the correct answer array, increase the score by 1 point
    score += getComparedAnswerScore(goodFoodUserAnswers, goodFoods);
    score += getComparedAnswerScore(badFoodUserAnswers, badFoods);
    return score;
}
function getComparedAnswerScore(userArray, correctArray) {
    debugger;
    let score = 0;
    for (let i = 0; i < userArray.length; i++) {
        if (correctArray.includes(userArray[i].name)) {
            score++;
        }
    }
    return score;
}