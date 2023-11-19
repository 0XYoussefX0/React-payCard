import "./App.css"
import Form from "./Components/Form"
import Card from "./Components/Card"
import { useState } from "react"

function App() {
  const [cardIsFlipped, setCardIsFlipped] = useState(false)

  const [CardNumberIsFocused, setCardNumberIsFocused] = useState(false)
  const [CardHolderIsFocused, setCardHolderIsFocused] = useState(false)
  const [ExpirationDateIsFocused, setExpirationDateIsFocused] = useState(false)

  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [cardHolderInput, setCardHolderInput] = useState(undefined)
  const [cardNumberInput, setCardNumberInput] = useState()
  const [cvvInput, setCvvInput] = useState()

  return (
    <>
      <div className="cardFormBox">
        <Card
          cvvInput={cvvInput}
          cardNumberInput={cardNumberInput}
          cardHolderInput={cardHolderInput}
          month={month}
          year={year}
          cardIsFlipped={cardIsFlipped}
          CardNumberIsFocused={CardNumberIsFocused}
          CardHolderIsFocused={CardHolderIsFocused}
          ExpirationDateIsFocused={ExpirationDateIsFocused}
        />
        <Form
          cvvInput={cvvInput}
          setCvvInput={setCvvInput}
          cardNumberInput={cardNumberInput}
          setCardNumberInput={setCardNumberInput}
          cardHolderInput={cardHolderInput}
          setCardHolderInput={setCardHolderInput}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          setCardIsFlipped={setCardIsFlipped}
          setCardNumberIsFocused={setCardNumberIsFocused}
          setCardHolderIsFocused={setCardHolderIsFocused}
          setExpirationDateIsFocused={setExpirationDateIsFocused}
        />
      </div>
    </>
  )
}

export default App
