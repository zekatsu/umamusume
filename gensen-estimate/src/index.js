import React from 'react';
import ReactDOM from 'react-dom';

const blue = [
    ['☆', 0.5],
    ['☆☆', 0.95],
    ['☆☆☆', 1],
]

const blue_type = [
    ['スピード', 0.2],
    ['スタミナ', 0.4],
    ['パワー', 0.6],
    ['根性', 0.8],
    ['賢さ', 1],
]

function choose(random_variable) {
    const dice = Math.random();
    return random_variable.find(element => dice <= element[1])[0];
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