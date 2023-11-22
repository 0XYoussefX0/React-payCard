import alertIcon from "../assets/alertIcon.png"
import { useState } from "react"

function Form(props) {
  const [isTheCardNumberValid, setIsTheCardNumberValid] = useState(true)

  const [isTheCardHolderValid, setIsTheCardHolderValid] = useState(true)

  const [isExpirationDateValid, setIsExpirationDateValid] = useState(true)

  const [isTheCvvValid, setIsCvvValid] = useState(true)

  const validatingTheCardNumber = () => {
    /*luhn's algorithm to check whether the credit card number is valid or not*/
    const luhnCheck = (val) => {
      let checksum = 0 // running checksum total
      let j = 1 // takes value of 1 or 2

      // Process each digit one by one starting from the last
      for (let i = val.length - 1; i >= 0; i--) {
        let calc = 0
        // Extract the next digit and multiply by 1 or 2 on alternative digits.
        calc = Number(val.charAt(i)) * j

        // If the result is in two digits add 1 to the checksum total
        if (calc > 9) {
          checksum = checksum + 1
          calc = calc - 10
        }

        // Add the units element to the checksum total
        checksum = checksum + calc

        // Switch the value of j
        if (j == 1) {
          j = 2
        } else {
          j = 1
        }
      }

      //Check if it is divisible by 10 or not.
      return checksum % 10 == 0
    }
    if (
      !(props.cardNumberInput.length === 16) ||
      !props.cardNumberInput.match(/^[0-9]*$/) ||
      !luhnCheck(props.cardNumberInput)
    ) {
      return false
    } else {
      return true
    }
  }
  const validatingTheCardHolder = () => {
    return props.cardHolderInput != ""
  }
  const validatingTheExpirationDate = () => {
    if (
      !props.expirationDate.match(/^(0[1-9]|1[0-2])\/(20\d{2}|[3-9]\d{3})$/)
    ) {
      return false
    }
    /*comparing the current date with the expiration date that the user was inputed, the expiration date shouldn't be in the past*/
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
    if (!props.cvvInput.match(/^\d{3,4}$/)) {
      return false
    } else {
      return true
    }
  }

  const handleFormSubmission = (e) => {
    /*checking whether the fields are empty */
    setIsTheCardNumberValid(props.cardNumberInput)
    setIsTheCardHolderValid(props.cardHolderInput)
    setIsExpirationDateValid(props.expirationDate)
    setIsCvvValid(props.cvvInput)
    e.preventDefault()
    if (
      isTheCardNumberValid &&
      isTheCardHolderValid &&
      isExpirationDateValid &&
      isTheCvvValid
    ) {
      /*
      sending form data to the server ...
      */
    }
  }
  return (
    <>
      <form className="form" onSubmit={handleFormSubmission}>
        <div className="inputGroup">
          <label htmlFor="card-number">Card Number</label>
          <input
            className={!isTheCardNumberValid ? "redBorder" : null}
            id="card-number"
            name="card-number"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength="16"
            aria-describedby="card-number-error"
            value={props.cardNumberInput}
            onChange={(e) => props.setCardNumberInput(e.target.value)}
            onFocus={() => {
              props.setCardNumberIsFocused(true)
            }}
            onBlur={() => {
              props.setCardNumberIsFocused(false)
              if (props.cardNumberInput) {
                setIsTheCardNumberValid(validatingTheCardNumber())
              }
            }}
          />
          {!isTheCardNumberValid ? (
            <div
              className="cardNumberError flexBox"
              role="alert"
              id="card-number-error"
            >
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
            spellcheck="false"
            aria-describedby="card-holder-error"
            value={props.cardHolderInput}
            onChange={(e) => props.setCardHolderInput(e.target.value)}
            onFocus={() => {
              props.setCardHolderIsFocused(true)
            }}
            onBlur={() => {
              props.setCardHolderIsFocused(false)
              if (props.cardHolderInput) {
                setIsTheCardHolderValid(validatingTheCardHolder())
              }
            }}
          />
          {!isTheCardHolderValid ? (
            <div
              className="cardHolderError flexBox"
              role="alert"
              id="card-holder-error"
            >
              <img className="alertIcon" src={alertIcon} />
              <div className="error">
                Please enter the name of the card holder.
              </div>
            </div>
          ) : null}
        </div>

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
            aria-describedby="expiration-date-error"
            value={props.expirationDate}
            onChange={(e) => props.setExpirationDate(e.target.value)}
            onFocus={() => {
              props.setExpirationDateIsFocused(true)
            }}
            onBlur={() => {
              props.setExpirationDateIsFocused(false)
              if (props.expirationDate) {
                setIsExpirationDateValid(validatingTheExpirationDate())
              }
            }}
          />
          {!isExpirationDateValid ? (
            <div
              className="expirationDate flexBox"
              role="alert"
              id="expiration-date-error"
            >
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
            aria-describedby="cvv-error"
            value={props.cvvInput}
            onChange={(e) => props.setCvvInput(e.target.value)}
            onFocus={() => {
              props.setCvvIsFocused(true)
            }}
            onBlur={() => {
              props.setCvvIsFocused(false)
              if (props.cvvInput) {
                setIsCvvValid(validatingTheCvv())
              }
            }}
          />
          {!isTheCvvValid ? (
            <div
              className="cardCvvError flexBox"
              role="alert"
              aria-describedby="cvv-error"
            >
              <img className="alertIcon" src={alertIcon} />
              <div className="error">Please enter a 3-digit CVV number.</div>
            </div>
          ) : null}
        </div>

        <input type="submit" value="Submit" />
      </form>
    </>
  )
}

export default Form
