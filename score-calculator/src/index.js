import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            status: [0, 0, 0, 0, 0],
            rarity: 3,
            uniqueLevel: 4,
            skill: {
                129: 0,
                174: 0,
                180: 0,
                191: 0,
                217: 0,
                239: 0,
                288: 0,
                394: 0,
                508: 0,
                559: 0,
            },
            result: '未計算',
        };
        this.handleChange = this.handleChange.bind(this);
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
    calcSkill() {
        let ret = 0;
        for (const [key, value] of Object.entries(this.state.skill)) {
            ret += key * value;
        }
        return ret;
    }
    calcScore() {
        const score = this.calcStatus() + this.calcUnique() + this.calcSkill();
        return score.toString();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            result: this.calcScore(),
        });
    }

    statusInput(i) {
        return (
            <input
                type='number' min={0} max={1200}
                inputMode='numeric'
                onChange={(event) => {
                    let status = this.state.status;
                    status[i] = parseInt(event.target.value, 10);
                    this.setState({
                        status: status,
                        result: this.calcScore(),
                    });
                    event.preventDefault();
                }} />
        );
    }
    inputSpinner(value, desc, onClick) {
        return (
            <div>
                <button onClick={onClick} >-</button>
                <label>{value}</label>
                <button onClick={onClick} >+</button>
                <label>{desc}</label>
            </div>
        )
    }
    skillInput(skillPoint, desc) {
        const value = this.state.skill[skillPoint]
        const onClick = (event) => {
            let skill = this.state.skill;
            const operation = event.target.innerText;
            if (operation === '+') {
                skill[skillPoint]++;
            }
            if (operation === '-') {
                skill[skillPoint]--;
            }
            this.setState({
                skill: skill,
                result: this.calcScore(),
            });
        }
        return this.inputSpinner(value, desc, onClick)
    }

    render() {
        return (
            <div className='Main'>
                <div className='Control'>
                    <div className='statusInput'>
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
                            value={this.state.rarity}
                            inputMode='numeric'
                            onChange={this.handleChange} />
                        <label>固有レベル</label>
                        <input
                            type='number'
                            name='uniqueLevel' min={1} max={6}
                            value={this.state.uniqueLevel}
                            inputMode='numeric'
                            onChange={this.handleChange} />
                    </div>
                    <div className='skillInput'>
                        {this.skillInput(129, '緑丸、集中力')}
                        {this.skillInput(174, '緑二重丸')}
                        {this.skillInput(180, '継承固有')}
                        {this.skillInput(191, 'コツ丸')}
                        {this.skillInput(217, '汎用')}
                        {this.skillInput(239, '距離脚質丸、コツ二重丸')}
                        {this.skillInput(288, '距離脚質二重丸')}
                        {this.skillInput(394, 'コンセントレーション')}
                        {this.skillInput(508, '汎用金')}
                        {this.skillInput(559, '距離脚質金')}
                    </div>
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