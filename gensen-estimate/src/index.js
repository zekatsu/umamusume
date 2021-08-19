import React from 'react';
import ReactDOM from 'react-dom';

const blue = [
    ['☆', 0.5],
    ['☆☆', 0.45],
    ['☆☆☆', 0.05],
]

const blue_type = [
    ['スピード', 0.2],
    ['スタミナ', 0.2],
    ['パワー', 0.2],
    ['根性', 0.2],
    ['賢さ', 0.2],
]

function choose(random_variable) {
    const dice = Math.random();
    const cumulativeSum = (sum => value => [value[0], sum += value[1]])(0);
    const cum = random_variable.map(cumulativeSum)
    return cum.find(element => dice <= element[1])[0];
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            result: 'N/A',
            history: [],
        };
        this.addHistory = this.addHistory.bind(this);
        this.deleteHistory = this.deleteHistory.bind(this);
    }

    addHistory() {
        const count = this.state.count;
        const result = choose(blue_type) + choose(blue);
        const history = this.state.history;
        history.push(result);
        this.setState({
            count: count + 1,
            result: result,
            history: history,
        });
    }

    deleteHistory(index) {
        const history = this.state.history;
        history.splice(index, 1);
        this.setState({
            history: history,
        });
    }

    renderResult(result, index) {
        return(
            <li>{result}
            <input type='button' value='delete' onClick={() => this.deleteHistory(index)} /></li>
        );
    }

    renderHistory(history) {
        return history.map((result, index) =>
            this.renderResult(result, index)
        );
    }

    render() {
        return (
            <div className='App'>
                <div className='counter'>
                    {this.state.count}
                </div>
                <div className='button'>
                    <input type='button' value='start' onClick={this.addHistory} />
                </div>
                <div className='result'>
                    {this.state.result}
                </div>
                <div className='history'>
                    {this.renderHistory(this.state.history)}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);