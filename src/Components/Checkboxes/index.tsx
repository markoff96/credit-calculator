import { create } from 'zustand';
import { useState } from 'react';

export function Checkboxes() {
  const [cardHolderChecked, setCardHolderChecked] = useState(false);
  const [subscribtionChecked, setSubscribtionChecked] = useState(false);

  return (
    <div>
      <p className="flex justify-start">Дополнительные опции</p>
      <div className="flex justify-between my-3 py-2">
        <input
          type="checkbox"
          checked={cardHolderChecked}
          onChange={() => setCardHolderChecked(!cardHolderChecked)}
          onClick={changePercentage(10)}
        />
        <span>Зарплатная карта КирБанка</span>
        <span>-1,5%</span>
      </div>
      <div className="flex justify-between my-3 ">
        <input
          type="checkbox"
          checked={subscribtionChecked}
          onChange={() => setSubscribtionChecked(!subscribtionChecked)}
        />
        <span>Подписка на меня в инст </span>
        <span>-2%</span>
      </div>
    </div>
  );
}
