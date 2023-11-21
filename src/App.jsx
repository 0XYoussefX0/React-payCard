import "./App.css"
import Form from "./Components/Form"
import Card from "./Components/Card"
import { useState } from "react"

function App() {
  const [cardNumberIsFocused, setCardNumberIsFocused] = useState(false)
  const [cardHolderIsFocused, setCardHolderIsFocused] = useState(false)
  const [expirationDateIsFocused, setExpirationDateIsFocused] = useState(false)
  const [cvvIsFocused, setCvvIsFocused] = useState(false)

  const [expirationDate, setExpirationDate] = useState()
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
          expirationDate={expirationDate}
          cardNumberIsFocused={cardNumberIsFocused}
          cardHolderIsFocused={cardHolderIsFocused}
          expirationDateIsFocused={expirationDateIsFocused}
          cvvIsFocused={cvvIsFocused}
        />
        <Form
          cvvInput={cvvInput}
          setCvvInput={setCvvInput}
          cardNumberInput={cardNumberInput}
          setCardNumberInput={setCardNumberInput}
          cardHolderInput={cardHolderInput}
          setCardHolderInput={setCardHolderInput}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
          setCvvIsFocused={setCvvIsFocused}
          setCardNumberIsFocused={setCardNumberIsFocused}
          setCardHolderIsFocused={setCardHolderIsFocused}
          setExpirationDateIsFocused={setExpirationDateIsFocused}
        />
      </div>
    </>
  )
}

export default App
