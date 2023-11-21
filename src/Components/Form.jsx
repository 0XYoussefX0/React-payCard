import alertIcon from "../assets/alertIcon.png"
import { useState } from "react"

function Form(props) {
  const [isTheCardNumberValid, setIsTheCardNumberValid] = useState(true)
  const [isTheCardHolderValid, setIsTheCardHolderValid] = useState(true)
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(true)
  const [isTheCvvValid, setIsCvvValid] = useState(true)

  const validatingTheForm = () => {
    return (
      props.cardHolderInput != undefined &&
      props.month <= 12 &&
      props.month >= 1 &&
      props.year <= ThisYear + 9 &&
      props.year >= ThisYear &&
      props.cvvInput?.length === 3 &&
      props.cardNumberInput.length === 19
    )
  }
  const validatingTheCardNumber = () => {
    return props.cardNumberInput.length === 12
  }
  const validatingTheCardHolder = () => {
    return props.cardHolderInput != undefined
  }
  const validatingTheExpirationDate = () => {
    /*comparing the current date with the expiration date that the user has inputed, the expiration date shouldn't be in the past */
    const date = new Date()
    const [month, year] = props.expirationDate.split("/")
    const formattedExpirationDate = new Date(`${year}-${month}`)
    if (formattedExpirationDate > date) {
      return true
    } else {
      return false
    }
  }
  const validatingTheCvv = () => {
    return props.cvvInput.length === 3
  }

  return (
    <>
      <form className="form">
        <div className="inputGroup">
          <label htmlFor="card-number">Card Number</label>
          <input
            className={!isTheCardNumberValid ? "redBorder" : null}
            id="card-number"
            name="card-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            pattern="^[0-9]*$"
            maxLength="16"
            value={props.cardNumberInput}
            onChange={(e) => props.setCardNumberInput(e.target.value)}
            onFocus={() => {
              props.setCardNumberIsFocused(true)
            }}
            onBlur={() => {
              props.setCardNumberIsFocused(false),
                setIsTheCardNumberValid(validatingTheCardNumber())
            }}
            required
          />
          {!isTheCardNumberValid ? (
            <div className="cardNumberError flexBox">
              <img className="alertIcon" src={alertIcon} />
              <div className="error">
                Please enter a valid 16-digit credit card number.
              </div>
            </div>
          ) : null}
        </div>

        <div className="inputGroup">
          <label htmlFor="card-holder">Card Holder</label>
          <input
            className={!isTheCardHolderValid ? "redBorder" : null}
            id="card-holder"
            name="card-holder"
            autoComplete="cc-name"
            type="text"
            value={props.cardHolderInput}
            onChange={(e) => props.setCardHolderInput(e.target.value)}
            onFocus={() => {
              props.setCardHolderIsFocused(true)
            }}
            onBlur={() => {
              props.setCardHolderIsFocused(false),
                setIsTheCardHolderValid(validatingTheCardHolder())
            }}
            required
          />
          {!isTheCardHolderValid ? (
            <div className="cardHolderError flexBox">
              <img className="alertIcon" src={alertIcon} />
              <div className="error">
                Please enter the name of the card holder.
              </div>
            </div>
          ) : null}
        </div>
        <div className="inputGroupWrapper">
          <div className="inputGroup">
            <label htmlFor="expiration-date">Expiration Date</label>
            <input
              className={!isExpirationDateValid ? "redBorder" : null}
              id="expiration-date"
              name="expiration-date"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              maxLength="7"
              pattern="^[0-9]*$"
              value={props.expirationDate}
              onChange={(e) => props.setExpirationDate(e.target.value)}
              onFocus={() => {
                props.setExpirationDateIsFocused(true)
              }}
              onBlur={() => {
                props.setExpirationDateIsFocused(false),
                  setIsExpirationDateValid(validatingTheExpirationDate())
              }}
              required
            />
            {!isExpirationDateValid ? (
              <div className="expirationDate flexBox">
                <img className="alertIcon" src={alertIcon} />
                <div className="error">Please type an expiration date.</div>
              </div>
            ) : null}
          </div>
          <div className="inputGroup">
            <label htmlFor="cvv">CVV</label>
            <input
              className={!isTheCvvValid ? "redBorder" : null}
              id="cvv"
              name="cvv"
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              minLength="3"
              maxLength="4"
              pattern="^[0-9]*$"
              value={props.cvvInput}
              onChange={(e) => props.setCvvInput(e.target.value)}
              onFocus={() => {
                props.setCvvIsFocused(true)
              }}
              onBlur={() => {
                props.setCvvIsFocused(false), setIsCvvValid(validatingTheCvv())
              }}
              required
            />
            {!isTheCvvValid ? (
              <div className="cardCvvError flexBox">
                <img className="alertIcon" src={alertIcon} />
                <div className="error">Please enter a 3-digit CVV number.</div>
              </div>
            ) : null}
          </div>
        </div>

        <input type="submit" value="submit" disabled={!validatingTheForm()} />
      </form>
    </>
  )
}

export default Form
