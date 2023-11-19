import alertIcon from "../assets/alertIcon.png"
import { useRef, useState } from "react"

function Form(props) {
  const [isTheCardNumberValid, setIsTheCardNumberValid] = useState(true)
  const [isTheCardHolderValid, setIsTheCardHolderValid] = useState(true)
  const [isTheMonthValid, setIsTheMonthValid] = useState(true)
  const [isTheYearValid, setIsTheYearValid] = useState(true)
  const [isTheCvvValid, setIsCvvValid] = useState(true)

  const selectedYear = useRef(null)
  const cardNumber = useRef(null)
  const cardHolder = useRef(null)
  const cardMonth = useRef(null)
  const cardCvv = useRef(null)

  const MonthsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const date = new Date()

  let YearsArray = []
  let ThisYearMonthsArray = []
  let ThisYear = date.getFullYear()
  let ThisMonth = date.getMonth() + 1

  for (let i = ThisMonth; i <= 12; i++) {
    ThisYearMonthsArray.push(i)
  }

  for (let i = ThisYear; i < ThisYear + 9; i++) {
    YearsArray.push(i)
  }

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
  const validatingTheCvv = () => {
    return props.cvvInput.length === 3
  }

  return (
    <>
      <form className="form">
        <label htmlFor="card-number">Card Number</label>
        <input
          className={!isTheCardNumberValid ? "redBorder" : null}
          ref={cardNumber}
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

        <label htmlFor="card-holder">Card Holder</label>
        <input
          className={!isTheCardHolderValid ? "redBorder" : null}
          ref={cardHolder}
          id="card-holder"
          name="card-holder"
          autocomplete="cc-name"
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

        <label htmlFor="expiration-date">Expiration Date</label>
        <select
          className={!isTheMonthValid ? "redBorder" : null}
          ref={cardMonth}
          id="expiration-date"
          name="cardMonth"
          aria-label="Expiration Month"
          defaultValue={""}
          value={props.month}
          onChange={(e) => props.setMonth(e.target.value)}
          onFocus={() => {
            props.setExpirationDateIsFocused(true)
          }}
          onBlur={() => {
            props.setExpirationDateIsFocused(false),
              setIsTheMonthValid(validatingTheMonth())
          }}
          required
        >
          <option value="" disabled>
            Month
          </option>
          {props.year == ThisYear
            ? ThisYearMonthsArray.map((month, index) => {
                return (
                  <option key={index} value={month}>
                    {month}
                  </option>
                )
              })
            : MonthsArray.map((month, index) => {
                return (
                  <option key={index} value={month}>
                    {month}
                  </option>
                )
              })}
        </select>

        <select
          className={!isTheYearValid ? "redBorder" : null}
          ref={selectedYear}
          name="cardYear"
          id="expiration-date"
          aria-label="Expiration Year"
          defaultValue={""}
          value={props.year}
          onChange={(e) => props.setYear(e.target.value)}
          onFocus={() => {
            props.setExpirationDateIsFocused(true)
          }}
          onBlur={() => {
            props.setExpirationDateIsFocused(false),
              setIsTheYearValid(validatingTheYear())
          }}
          required
        >
          <option value="" disabled>
            Year
          </option>
          {YearsArray.map((year, index) => {
            return (
              <option key={index} value={year}>
                {year}
              </option>
            )
          })}
        </select>
        {!isTheMonthValid || !isTheYearValid ? (
          <div className="expirationDate flexBox">
            <img className="alertIcon" src={alertIcon} />
            <div className="error">Please select the expiration date.</div>
          </div>
        ) : null}

        <label htmlFor="cvv">CVV</label>
        <input
          className={!isTheCvvValid ? "redBorder" : null}
          ref={cardCvv}
          id="cvv"
          name="cvv"
          type="text"
          inputMode="numeric"
          autoComplete="cc-csc"
          minlength="3"
          maxlength="4"
          pattern="^[0-9]*$"
          value={props.cvvInput}
          onChange={(e) => props.setCvvInput(e.target.value)}
          onFocus={() => {
            props.setCardIsFlipped(true)
          }}
          onBlur={() => {
            props.setCardIsFlipped(false),
              setIsCvvValid(validatingTheCvv()),
              isTheCvvValid ? cardCvv.current.focus() : null
          }}
          required
        />
        {!isTheCvvValid ? (
          <div className="cardCvvError flexBox">
            <img className="alertIcon" src={alertIcon} />
            <div className="error">Please enter a 3-digit CVV number.</div>
          </div>
        ) : null}

        <input type="submit" value="submit" disabled={!validatingTheForm()} />
      </form>
    </>
  )
}

export default Form
