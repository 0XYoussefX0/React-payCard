import visaIcon from "../assets/visa.png"
import chipIcon from "../assets/chip.png"
import { useEffect, useRef, useState } from "react"

function Card(props) {
  const defaultDimenions = {
    height: 0,
    width: 0,
    positionTop: 0,
    positionLeft: 0,
    opacity: 0,
  }

  const shouldHideFocusBox =
    !props.cardHolderIsFocused &&
    !props.expirationDateIsFocused &&
    !props.cardNumberIsFocused

  const creditCardNumberContainer = useRef()
  const cardHolderContainer = useRef()
  const ExpirationDateContainer = useRef()

  const [dimensions, setDimensions] = useState(defaultDimenions)

  useEffect(() => {
    let timer
    const setDimensionsWithTimeout = (element) => {
      return setTimeout(() => {
        setDimensions({
          height: element.offsetHeight,
          width: element.offsetWidth,
          positionTop: element.offsetTop,
          positionLeft: element.offsetLeft,
          opacity: 1,
        })
      }, 300)
    }
    if (props.cardHolderIsFocused) {
      timer = setDimensionsWithTimeout(cardHolderContainer.current)
    } else if (props.expirationDateIsFocused) {
      timer = setDimensionsWithTimeout(ExpirationDateContainer.current)
    } else if (props.cardNumberIsFocused) {
      timer = setDimensionsWithTimeout(creditCardNumberContainer.current)
    } else if (shouldHideFocusBox) {
      timer = setTimeout(() => {
        setDimensions(defaultDimenions)
      }, 300)
    }
    return () => clearTimeout(timer)
  }, [
    props.cardHolderIsFocused,
    props.expirationDateIsFocused,
    props.cardNumberIsFocused,
  ])
  return (
    <>
      <div className="card" role="presentation">
        <div
          style={
            props.cvvIsFocused
              ? { transform: "rotateY(180deg)" }
              : { transform: "rotateY(0deg)" }
          }
          className="card-inner"
        >
          <div className="card_front">
            <div
              style={{
                zIndex: "1",
                height: `${dimensions.height - 2}px`,
                width: `${dimensions.width - 2}px`,
                transition:
                  "width 0.5s ease, height 0.5s ease, top 0.5s ease, left 0.5s ease, opacity 0.5s ease",
                position: "absolute",
                top: `${dimensions.positionTop}px`,
                left: `${dimensions.positionLeft}px`,
                borderRadius: "5px",
                border: "2px solid rgba(255, 255, 255, 0.65)",
                opacity: `${dimensions.opacity}`,
              }}
            ></div>

            <div className="card_frontTopBox">
              <img src={chipIcon} className="chipIcon" />
              <img src={visaIcon} className="visaIcon" />
            </div>
            <div
              ref={creditCardNumberContainer}
              className="card_frontCardNumber shadow"
            >
              {props.cardNumberInput ? (
                <>
                  {Array.from(props.cardNumberInput).map((num, index) => {
                    if (index >= 4 && index <= 11) {
                      return (
                        <div
                          className={`animation ${
                            index == 7 || index == 11 ? "padding" : null
                          }`}
                          key={index}
                        >
                          *
                        </div>
                      )
                    } else {
                      return (
                        <div
                          className={`animation ${
                            index == 3 ? "padding" : null
                          }`}
                          key={index}
                        >
                          {num}
                        </div>
                      )
                    }
                  })}
                </>
              ) : (
                <>
                  <div>#</div>
                  <div>#</div>
                  <div>#</div>
                  <div className="padding">#</div>
                  <div>*</div>
                  <div>*</div>
                  <div>*</div>
                  <div className="padding">*</div>
                  <div>*</div>
                  <div>*</div>
                  <div>*</div>
                  <div className="padding">*</div>
                  <div>#</div>
                  <div>#</div>
                  <div>#</div>
                  <div>#</div>
                </>
              )}
            </div>
            <div className="card_frontBottomBox">
              <div ref={cardHolderContainer}>
                <div className="cardHolder shadow">Card Holder</div>
                <div className="input-text shadow">
                  {props.cardHolderInput ? (
                    <>
                      {Array.from(props.cardHolderInput).map((char, index) => {
                        if (char === " ") {
                          return <div className="emptySpace"></div>
                        } else {
                          return (
                            <div className="animation2" key={index}>
                              {char}
                            </div>
                          )
                        }
                      })}
                    </>
                  ) : (
                    "FULL NAME"
                  )}
                </div>
              </div>
              <div ref={ExpirationDateContainer}>
                <div className="shadow expirationDate">Expires</div>
                <div className="input-text shadow">
                  {props.expirationDate ? (
                    <>
                      {Array.from(props.expirationDate).map((num, index) => {
                        return (
                          <div className="animation" key={index}>
                            {num}
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    "MM/YYYY"
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card_back">
            <div className="blackStripe"></div>
            <div className="card_backMiddleBox">
              <div className="card_backCvv">CVV</div>
              <div className="whiteStripe">
                {props.cvvInput ? (
                  <>
                    {Array.from(props.cvvInput).map((num, index) => {
                      return (
                        <div className="animation" key={index}>
                          *
                        </div>
                      )
                    })}
                  </>
                ) : null}
              </div>
            </div>
            <img src={visaIcon} className="visaIcon margin" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
