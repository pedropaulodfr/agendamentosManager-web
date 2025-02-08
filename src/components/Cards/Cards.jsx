import React, { useState } from "react";
import Card from "react-bootstrap/Card";

function Cards({ children, titleHeader = "", titleCard = "", text = " ", textAlign = "start", cursorType= "text", color = "light", click }) {
  const [openCard, setOpenCard] = useState(true)
  return (
    <>
      <Card bg={color} style={{ width: "18rem" }} className="mb-2" text={color.toLowerCase() === 'light' ? 'dark' : 'white'}>
        <Card.Header className="d-flex justify-content-center" style={{cursor: "pointer"}} onClick={() => {setOpenCard(!openCard)}}>
          <b>{titleHeader}</b>
        </Card.Header>
        {openCard &&
          <Card.Body>
            <Card.Title className="d-flex justify-content-center" style={{ fontSize: "40px" }} >
              {titleCard}
            </Card.Title>
            <Card.Text className={`d-flex justify-content-${textAlign}`} style={{cursor: `${cursorType}`}} onClick={() => {click(true)}}>
              {children}
            </Card.Text>
          </Card.Body>
        }
      </Card>
    </>
  );
}

export default Cards;
