import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {status: [0, 0, 0, 0, 0], result: '未計算'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    calcStatus_(x) {
        const k = [5, 8, 10, 13, 16, 18, 21, 24, 26, 28, 29, 30, 31, 33, 34, 35, 39, 41, 42, 43, 52, 55, 66, 68, 60];
        const p = Math.floor(x / 50);
        const r = x % 50;
        const cum = k.slice(0, p).reduce((acc, cur) => acc + cur, 0);
        return Math.floor(cum * 5 + (r + 1) * k[p] / 10);
    }
    calcStatus() {
        return this.state.status.reduce(
            (acc, cur) => acc + this.calcStatus_(cur), 0
        )
    }
    calcUnique() {
        const k = (this.state.rarity < 3)? 120: 170;
        return k * this.state.uniqueLevel;
    }
    calcScore() {
        const score = this.calcStatus() + this.calcUnique();
        return score.toString();
    }
    statusInput(i) {
        return (
        <input
            name={i.toString()}
            type='number' min={0} max={1200}
            onChange={(event) => {
                let status = this.state.status;
                status[i] = event.target.value;
                this.setState({status: status})
            }} />
        );
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        this.setState({
            result: this.calcScore(),
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
                            <div className='statusInput'>
                                <label>ステータス</label>
                                {this.statusInput(0)}
                                {this.statusInput(1)}
                                {this.statusInput(2)}
                                {this.statusInput(3)}
                                {this.statusInput(4)}
                            </div>
                            <div className='uniqueInput'>
                                <label>星</label>
                                <input
                                    type='number'
                                    name='rarity' min={1} max={5}
                                    onChange={this.handleChange} />
                                <label>固有レベル</label>
                                <input
                                    type='number'
                                    name='uniqueLevel' min={1} max={6}
                                    onChange={this.handleChange} />
                            </div>
                        <input type='submit' value='calc' />
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