import React from 'react';
import axios from 'axios';
import './modal.css';

const { useState } = React;

function ItemModal({showDetails, setShowDetails, onCloseItem, item, user, changeView}) {
  if (!showDetails) {
    return null;
  }
  console.log('item ', item);
  console.log('USER ', user);

  const onClick = () => {
    setShowDetails(false);
  }

  const toItem = () => {
    console.log('send stuff to item');
    changeView('ItemDetails', {currentUserId: user.id, currentItemId: item.itemID, changeview: changeView})
  }

  return (
    <div className="modal-background">
      <div className="item-modal">
        <div className="modal-header">
          <div className="titleCloseBtn">
            <button className="closeBtn" onClick={() => onCloseItem()}> X </button>
          </div>
          <h2 className="modal-title">DETAILS</h2>
        </div>
        <div className="modal-content" />
          <div className="modal-break">
            <a className="info-title">item:</a>
            <br></br>
            <a className="modal-text">{item.name}</a>
          </div>
          <div className="modal-break">
            <a className="info-title">description:</a>
            <br></br>
            <a className="modal-text"> {item.description}</a>
          </div>
          <div className="modal-break">
            <a className="info-title">condition:</a>
            <br></br>
            <a className="modal-text">{item.condition}</a>
          </div>
        <div className="modal-body">
          <button className="modal-button" onClick={() => toItem()}>GO TO ITEM</button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;