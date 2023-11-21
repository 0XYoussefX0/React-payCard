import visaIcon from "../assets/visa.png"
import chipIcon from "../assets/chip.png"
import { useEffect, useRef, useState } from "react"

function Card(props) {
  const defaultDimenions = {
    height: 240,
    width: 420,
    positionTop: 13,
    positionLeft: 503,
    opacity: 0,
  }

  const shouldHideFocusBox =
    !props.cardHolderIsFocused &&
    !props.expirationDateIsFocused &&
    !props.cardNumberIsFocused

  const cardNumbers = useRef()
  const childOfcard_frontBottomBox = useRef()
  const secondChildOfcard_frontBottomBox = useRef()

  const [dimensions, setDimensions] = useState(defaultDimenions)

  useEffect(() => {
    let timer
    const setDimensionsWithTimeout = (element) => {
      return setTimeout(() => {
        setDimensions({
          height: element.offsetHeight,
          width: element.offsetWidth,
          positionTop: element.getBoundingClientRect().top + window.scrollY,
          positionLeft: element.getBoundingClientRect().left,
          opacity: 1,
        })
      }, 300)
    }
    if (props.cardHolderIsFocused) {
      timer = setDimensionsWithTimeout(childOfcard_frontBottomBox.current)
    } else if (props.expirationDateIsFocused) {
      timer = setDimensionsWithTimeout(secondChildOfcard_frontBottomBox.current)
    } else if (props.cardNumberIsFocused) {
      timer = setDimensionsWithTimeout(cardNumbers.current)
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
      {!props.cvvIsFocused && (
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
      )}
      <div className="card">
        <div
          style={
            props.cvvIsFocused
              ? { transform: "rotateY(180deg)" }
              : { transform: "rotateY(0deg)" }
          }
          className="card-inner"
        >
          <div className="card_front">
            <div className="card_frontTopBox">
              <img src={chipIcon} className="chipIcon" />
              <img src={visaIcon} className="visaIcon" />
            </div>
            <div ref={cardNumbers} className="card_frontCardNumber shadow">
              {props.cardNumberInput ? (
                <>
                  {Array.from(props.cardNumberInput).map((num, index) => {
                    if (index >= 4 && index <= 11) {
                      return (
                        <div
                          className={`animation ${
                            index == 7 || index == 11 ? "padding-r16" : null
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
                            index == 3 ? "padding-r16" : null
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
                  <div className="padding-r16">#</div>
                  <div>*</div>
                  <div>*</div>
                  <div>*</div>
                  <div className="padding-r16">*</div>
                  <div>*</div>
                  <div>*</div>
                  <div>*</div>
                  <div className="padding-r16">*</div>
                  <div>#</div>
                  <div>#</div>
                  <div>#</div>
                  <div>#</div>
                </>
              )}
            </div>
            <div className="card_frontBottomBox">
              <div ref={childOfcard_frontBottomBox}>
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
              <div ref={secondChildOfcard_frontBottomBox}>
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
