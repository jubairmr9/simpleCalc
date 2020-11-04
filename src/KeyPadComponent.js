import React, {Component} from 'react';

class KeyPadComponent extends Component {

    render() {
        return (
            <div classvalue="button">
                <button value="1" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>1</button>
                <button value="2" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>2</button>
                <button value="3" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>3</button>
                <button value="+" name="op" onClick={e => this.props.onClick(e.target.value, e.target.name)}>+</button><br/>


                <button value="4" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>4</button>
                <button value="5" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>5</button>
                <button value="6" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>6</button>
                <button value="-" name="op" onClick={e => this.props.onClick(e.target.value, e.target.name)}>-</button><br/>

                <button value="7" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>7</button>
                <button value="8" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>8</button>
                <button value="9" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>9</button>
                <button value="*" name="op" onClick={e => this.props.onClick(e.target.value, e.target.name)}>x</button><br/>


                <button value="0" name="var" onClick={e => this.props.onClick(e.target.value, e.target.name)}>0</button>
                <button value="=" name="calc" onClick={e => this.props.onClick(e.target.value, e.target.name)}>=</button>
                <button value="/" name="op" onClick={e => this.props.onClick(e.target.value, e.target.name)}>÷</button>
                <button value="C" name="other" onClick={e => this.props.onClick(e.target.value, e.target.name)}>C</button><br/>
            </div>
        );
    }
}

export default KeyPadComponent;
