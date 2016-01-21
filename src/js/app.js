import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'

import styles from '../styles/main.styl'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      walterPrice: 0.53,
      tarePrice: 0.08,
      initialMoney: 0,
      walters: 0,
      amount: 0,
      wtf: 0
    }
  }

  onChangeWalterPrice (e) {
    this.setState({ walterPrice: e.target.value })
  }

  onChangeInitialMoney (e) {
    this.setState({ initialMoney: e.target.value })
  }

  theMaxNumberOfBottles (money) {
    let { walterPrice } = this.state
    return Math.floor(money / walterPrice)
  }

  moneyForTare (walters) {
    let { tarePrice } = this.state
    return Math.round((tarePrice * walters) * 100.0) / 100.0
  }

  moneyWithTare (cash, walters) {
    return Math.round((cash + this.moneyForTare(this, walters)))
  }

  thePriceOfBottles (bottles) {
    let { walterPrice } = this.state
    return Math.round((bottles * walterPrice) * 100.0) / 100.0
  }

  theCalculator (initialMoney = this.state.initialMoney) {
    let { tarePrice, walters } = this.state

    if (initialMoney <= 0) {
      return 0
    }

    let numbersOfBottles = this.theMaxNumberOfBottles(initialMoney)
    let priceOfBottles = this.thePriceOfBottles(numbersOfBottles)
    let amountLeft = initialMoney - priceOfBottles
    let addedAmount = amountLeft + numbersOfBottles * tarePrice
    let canIBuyMore = numbersOfBottles(addedAmount) > 0

    if (canIBuyMore) {
      [walters, addedAmount] = this.theCalculator(addedAmount)
    }

    // this.setState({ walters: total, amount: numbersOfBottles, wtf: addedAmount })
  }

  handleSubmit (e) {
    e.preventDefault()
    let { walterPrice, tarePrice, initialMoney } = this.state
    let total = this.thePriceOfBottles(initialMoney)
    let amountLeft = initialMoney - total
    let numbersOfBottles = this.theMaxNumberOfBottles(initialMoney)
    let addedAmount = amountLeft + numbersOfBottles * tarePrice

    // this.theCalculator(initialMoney)
    this.setState({ walters: total, amount: numbersOfBottles, wtf: amountLeft })
  }

  render () {
    let { walters, amount, wtf } = this.state
    return (
      <section>
        <div className='wrapper'>
          <h3>Walter Calculator</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input onChange={this.onChangeWalterPrice.bind(this)} value={this.state.walterPrice} />
            <input onChange={this.onChangeInitialMoney.bind(this)} value={this.state.availableMoney} />
            <button>Calculate</button>
            <p>Bottles: {amount}</p>
            <p>Total: {walters}</p>
            <p>WTF: {wtf}</p>
          </form>
        </div>
      </section>
    )
  }

}

render(<App />, document.getElementById('app__root'))
