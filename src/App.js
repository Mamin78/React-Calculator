import React from "react";

import Keypad from "./components/Keypad";
import Screen from "./components/Screen";
import "./App.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenText: "",
            firstNumber: 0,
            secondNumber: 0,
            isFirstNumber: true,
            operator: '', //1 is division, 2 is multiplication, 3 is minus, 4 is plus operation and 5 is mode.
            isFraction: false,
            fractionPlace: 10,
            isNegative: false,
            memoryValue: 0,
        };
    }

    handlePressDigit = (digit) => {
        let showingNumber;
        if (!this.state.isFraction) {
            if (this.state.isFirstNumber) {
                if (this.state.isNegative) {
                    showingNumber = this.state.firstNumber * 10 - digit;
                } else {
                    showingNumber = this.state.firstNumber * 10 + digit;
                }
                this.setState({firstNumber: showingNumber});
            } else {
                if (this.state.isNegative) {
                    showingNumber = this.state.secondNumber * 10 - digit;
                } else {
                    showingNumber = this.state.secondNumber * 10 + digit;
                }
                this.setState({secondNumber: showingNumber});
            }
        } else {
            if (this.state.isFirstNumber) {
                if (this.state.isNegative) {
                    showingNumber = this.state.firstNumber - (digit / this.state.fractionPlace);
                } else {
                    showingNumber = this.state.firstNumber + (digit / this.state.fractionPlace);
                }
                this.setState({
                    firstNumber: showingNumber,
                    fractionPlace: this.state.fractionPlace * 10
                });
            } else {
                if (this.state.isNegative) {
                    showingNumber = this.state.secondNumber - (digit / this.state.fractionPlace);
                } else {
                    showingNumber = this.state.secondNumber + (digit / this.state.fractionPlace);
                }
                this.setState({
                    secondNumber: showingNumber,
                    fractionPlace: this.state.fractionPlace * 10
                });
            }
        }
        this.setState({screenText: showingNumber});
    };
    handlePressOperator = (operator) => {
        this.setState({isFirstNumber: !this.state.isFirstNumber});
        this.setState({operator: operator});
        this.setState({firstNumber: this.state.screenText});
        this.setState({
            isFraction: false,
            fractionPlace: 10,
            isNegative: false,
        });
    };
    handlePressAC = () => {
        this.setState({
            screenText: "",
            firstNumber: 0,
            secondNumber: 0,
            isFirstNumber: true,
            operator: '',
            isFraction: false,
            fractionPlace: 10,
            isNegative: false,
        })
    };
    handlePressDot = () => {
        this.setState({isFraction: true});
    };
    handlePressNegator = () => {
        let showingNumber = this.state.screenText;
        if (this.state.isFirstNumber) {
            showingNumber = showingNumber * -1;
            this.setState({firstNumber: showingNumber});
        } else {
            showingNumber = showingNumber * -1;
            this.setState({secondNumber: showingNumber});
        }
        this.setState({
            screenText: showingNumber,
            isNegative: true
        });
    };
    handlePressResult = () => {
        let result = 0;
        if (this.state.operator === '/') {
            result = this.state.firstNumber / this.state.secondNumber;
        } else if (this.state.operator === '*') {
            result = this.state.firstNumber * this.state.secondNumber;
        } else if (this.state.operator === '-') {
            result = this.state.firstNumber - this.state.secondNumber;
        } else if (this.state.operator === '+') {
            result = this.state.firstNumber + this.state.secondNumber;
        } else if (this.state.operator === '%') {
            result = this.state.firstNumber % this.state.secondNumber;
        } else {
            result = this.state.firstNumber + this.state.secondNumber;
        }
        this.setState({firstNumber: result});
        this.setState({screenText: result});
        this.setState({
            firstNumber: 0,
            secondNumber: 0,
            isFirstNumber: true,
            operator: '',
            isFraction: false,
            fractionPlace: 10,
            isNegative: false,
        });
    };


    onPressMS = () => {
        this.setState({memoryValue: this.state.screenText});
    };

    onPressMR = () => {
        this.setState({screenText: this.state.memoryValue});
    };

    onPressMC = () => {
        this.setState({memoryValue: 0});
    };

    onPressMM = () => {
        this.setState({memoryValue: this.state.memoryValue - this.state.screenText});
    };

    onPressMP = () => {
        this.setState({memoryValue: this.state.screenText + this.state.memoryValue});
    };

    render() {
        return (
            <div>
                <Screen text={this.state.screenText}/>
                <Keypad
                    onPressDigit={this.handlePressDigit}
                    onPressOperator={this.handlePressOperator}
                    onPressAC={this.handlePressAC}
                    onPressDot={this.handlePressDot}
                    onPressNegator={this.handlePressNegator}
                    onPressResult={this.handlePressResult}
                    onPressMS={this.onPressMS}
                    onPressMR={this.onPressMR}
                    onPressMC={this.onPressMC}
                    onPressMM={this.onPressMM}
                    onPressMP={this.onPressMP}
                />
            </div>
        );
    }
}

export default App;
