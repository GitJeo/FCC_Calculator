
const buttons = [
    {
        display: 'AC',
        id: 'clear',
        key: 'allClear'
    },
    {
        display: '',
        id: 'placeholder-left',
        key: 'placeholderKey1'
    },
    {
        display: '',
        id: 'placeholder-right',
        key: 'placeholderKey2'
    },
    {
        display: '←',
        id: 'popOut',
        key: 'popOutKey'
    },

    {
        display: '7',
        id: 'seven',
        key: 'sevenKey'
    },
    {
        display: '8',
        id: 'eight',
        key: 'eightKey'
    },
    {
        display: '9',
        id: 'nine',
        key: 'nineKey'
    },
    {
        display: '/',
        id: 'divide',
        key: 'divideKey'
    },

    {
        display: '4',
        id: 'four',
        key: 'fourKey'
    },
    {
        display: '5',
        id: 'five',
        key: 'fiveKey'
    },
    {
        display: '6',
        id: 'six',
        key: 'sixKey'
    },
    {
        display: '*',
        id: 'multiply',
        key: 'multiplyKey'
    },

    {
        display: '1',
        id: 'one',
        key: 'oneKey'
    },
    {
        display: '2',
        id: 'two',
        key: 'twoKey'
    },
    {
        display: '3',
        id: 'three',
        key: 'threeKey'
    },
    {
        display: '-',
        id: 'subtract',
        key: 'subtractKey'
    },

    {
        display: '0',
        id: 'zero',
        key: 'zeroKey'
    },
    {
        display: '.',
        id: 'decimalPoint',
        key: 'decimalPointKey'
    },
    {
        display: '=',
        id: 'equal',
        key: 'equalKey'
    },
    {
        display: '+',
        id: 'add',
        key: 'addKey'
    },
]

class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="display-section">
                <div id="display">
                    <div id="minified-display">{this.props.state.miniDisplay}</div>
                    <input type="int" id="mainDisplay" name="mainDisplay" value={this.props.state.mainDisplay} />
                </div>
            </section>
        );
    }
}

class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            miniDisplay: '0',
            mainDisplay: '0',
            default: '0'
        }

        this.numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        this.operators = ['/', '*', '-', '+', '=']
        this.func = ['<', '>', 'AC', '←']
    }

    renderToDisplay(button) {
        try {
            if (this.numbers.includes(button)) {
                if (this.state.mainDisplay == 0) {
                    this.setState({ mainDisplay: button })
                } else {
                    this.setState({ mainDisplay: this.state.mainDisplay + button })
                }
            } else if (this.operators.includes(button)) {
                if (button === "=") {
                    this.setState({ miniDisplay: this.state.mainDisplay })
                    this.setState({ mainDisplay: eval(this.state.mainDisplay) })
                } else {
                    if (this.state.mainDisplay === '0') {
                        this.setState({ mainDisplay: button })
                    } else if (this.operators.includes(this.state.mainDisplay[this.state.mainDisplay.length - 1])) {
                        this.state.mainDisplay = this.state.mainDisplay.substring(0, this.state.mainDisplay.length - 1)
                        this.state.mainDisplay += button
                        this.setState({ mainDisplay: this.state.mainDisplay })
                    } else {
                        this.setState({ mainDisplay: this.state.mainDisplay + button })
                    }
                }
            } else if (button === 'AC') {
                this.setState({ miniDisplay: '0' })
                this.setState({ mainDisplay: '0' })
            } else if (button === '←') {
                if (this.state.mainDisplay.length === 1) {
                    this.setState({ mainDisplay: this.state.default })
                } else { this.setState({ mainDisplay: this.state.mainDisplay.substring(0, this.state.mainDisplay.length - 1) }) }
            } else {
                this.setState({ mainDisplay: this.state.mainDisplay + button })
            }
        } catch (e) {
            this.setState({ miniDisplay: "Not a valid expression: " + this.state.mainDisplay })
            this.setState({ mainDisplay: "Syntax Error" })
        }

    }

    render() {
        return (
            <div>
                <Display state={this.state} />
                <section id="buttons">
                    {this.props.state.buttons.map(button => <button key={button.key} type="button" id={button.id}
                        onClick={this.renderToDisplay.bind(this, button.display)}>{button.display}</button>)}
                </section>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttons: buttons
        }
    }

    render() {
        return (
            <div id="calculator">
                <Frame state={this.state} />
            </div>
        );
    }

}

ReactDOM.render(<App />, document.getElementById('root'))