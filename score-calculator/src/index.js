import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {status: 0, result: '未計算'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    calcScore(x) {
        const k = [5, 8, 10, 13, 16, 18, 21, 24, 26, 28, 29, 30, 31, 33, 34, 35, 39, 41, 42, 43, 52, 55, 66, 68, 60];
        const p = Math.floor(x / 50)
        const r = x % 50;
        const cum = k.slice(0, p).reduce((acc, cur) => acc + cur, 0);
        return Math.floor(cum * 5 + (r + 1) * k[p] / 10);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        const res = this.calcScore(this.state.status).toString();
        this.setState({
            result: res
        });
        event.preventDefault();
    }
    render() {
        return (
            <div className='Main'>
                <div className='Control'>
                    <form
                        onSubmit={this.handleSubmit}
                        autoComplete='off'>
                        <input
                            name='status'
                            type='number' min={0} max={1200}
                            value={this.state.value}
                            onChange={this.handleChange} />
                    </form>
                </div>
                <div className='Result'>
                    {this.state.result}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);