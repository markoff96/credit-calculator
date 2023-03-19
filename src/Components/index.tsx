import React from 'react';
import { create } from 'zustand';

export function Calc() {
  interface Store {
    cashAmount: number;
    mounthAmount: number;
    setCashAmount: () => any;
    setMountAmount: () => void;
  }

  const useCreditStore = create<Store>((set) => ({
    cashAmount: 300000,
    mounthAmount: 13,
    setCashAmount: () => set((state) => ({ cashAmount: 100 })),
    setMountAmount: () =>
      set((state) => ({ mounthAmount: state.mounthAmount + 1 })),
  }));

  function CashHandler() {
    const cashCounter = useCreditStore((state) => state.cashAmount);
    return <span>{cashCounter}</span>;
  }

  const InputValueHandler = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    return (
      <input
        type="range"
        ref={inputRef}
        className="my-2 w-100 h-2 w-full"
        max={'7000000'}
      />
    );
  };

  const mounthHandler = useCreditStore((state) => state.mounthAmount);
  function CashInput() {
    const changeVal = useCreditStore((state) => state.setCashAmount);
    return (
      <InputValueHandler />
      //   <input
      //     type="range"
      //     className="my-2 w-100 h-2 w-full"
      //     max={'7000000'}
      //     onClick={changeVal}
      //   />
    );
  }

  return (
    <div className=" m-auto border-2 border-blue-300 rounded-2xl w-max">
      <div className="py-10 px-10">
        <h2>Калькулятор рассчёта по кредиту наличными</h2>
        <div className="flex flex-col  my-2 ">
          <div id="setMoneyInput" className="my-5">
            <p className="flex justify-start">Сумма кредита</p>
            <div className=" flex justify-between">
              <CashHandler />

              <span>7,000,000</span>
            </div>

            <CashInput />

            <div className=" flex justify-between font-thin ">
              <span>от 300,000 P</span>
              <span>до 7,000,000 P </span>
            </div>
          </div>

          <div id="setMounthsInput" className="my-5">
            <p className="flex justify-start">Срок кредита</p>
            <div className=" flex justify-between">
              <span>{`${mounthHandler} месяцев`}</span>
              <span>60 месяцев</span>
            </div>
            <input type="range" className="my-2 w-100 h-2 w-full" max={'60'} />
            <div className=" flex justify-between font-thin">
              <span>13 месяцев</span>
              <span>60 месяцев</span>
            </div>
          </div>
        </div>

        <div>
          <p className="flex justify-start">Дополнительные опции</p>
          <div className="flex justify-between my-3 ">
            <button>toggle</button>
            <span>Зарплатная карта КирБанка</span>
            <span>-1,5%</span>
          </div>
          <div className="flex justify-between my-3 ">
            <button>toggle</button>
            <span>Подписка на меня в инст </span>
            <span>-2%</span>
          </div>
        </div>
        <div>
          <p>Ставка</p>
          <span>%</span>
          <p>Ежемесячный платёж</p>
        </div>
        <button className="bg-blue-500 px-8 py-4 border-2">
          Оформить кредит
        </button>
      </div>
    </div>
  );
}
