import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Control extends React.Component {
    render() {
        return(
            <form >
                <label>
                    Label:
                    <select onChange={this.props.handleChange}>
                        <option selected value={0}>0</option>
                        <option selected value={1}>1</option>
                    </select>
                </label>
            </form>
        );
    }
}


class Result extends React.Component {
    render() {
        return this.props.value.toString();
    }
}


class App extends React.Component {
    constructor() {
        super();
        this.state = {value: 0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className='Main'>
                <div className='Control'>
                    <Control handleChange={this.handleChange} />
                </div>
                <div className='Result'>
                    <Result value={this.state.value}/>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);