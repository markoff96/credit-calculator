import { useRef, useState } from 'react';
import { create } from 'zustand';

export function Calc() {
  const ref = useRef();
  const refMonth = useRef();

  interface Percent {
    cardHolderChecked: boolean;
    subscribtionChecked: boolean;
    cashAmount: number;
    monthAmount: number;
    totalPercent: number;
    setCardHolderChecked: () => void;
    setSubscribtionChecked: () => void;
    setCashAmount: () => void;
    setMonthAmount: () => void;
    setTotalPercent: () => void;
  }

  const usePercentStore = create<Percent>((set) => ({
    cardHolderChecked: false,
    subscribtionChecked: false,
    setCardHolderChecked: () =>
      set((state) => ({ cardHolderChecked: !state.cardHolderChecked })),
    setSubscribtionChecked: () =>
      set((state) => ({ subscribtionChecked: !state.subscribtionChecked })),
    cashAmount: 300000,
    monthAmount: 13,
    totalPercent: 10.99,
    setCashAmount: (ref: number) => set((state) => ({ cashAmount: ref })),
    setMonthAmount: (refMonth: number) =>
      set((state) => ({ monthAmount: refMonth })),
    setTotalPercent: (percent: number) =>
      set((state) => ({
        totalPercent: state.totalPercent - percent,
      })),
  }));

  const changeTotal = usePercentStore((state) => state.setTotalPercent);

  function changeTotalPercent(percent: number) {
    changeTotal(percent);
  }

  function SetCardHolder() {
    const cardHolder = usePercentStore((state) => state.cardHolderChecked);
    return (
      <input
        type="checkbox"
        checked={cardHolder}
        onChange={changeTotalPercent(2)}
        onClick={usePercentStore((state) => state.setCardHolderChecked)}
      />
    );
  }

  function SetSubHolder() {
    const subHolder = usePercentStore((state) => state.subscribtionChecked);
    return (
      <input
        type="checkbox"
        checked={subHolder}
        onChange={changeTotalPercent(1.5)}
        onClick={usePercentStore((state) => state.setSubscribtionChecked)}
      />
    );
  }

  function CashHandler() {
    const cashCounter = usePercentStore((state) => state.cashAmount);
    return <span>{`${cashCounter} руб.`}</span>;
  }

  const cashAmount = usePercentStore((state) => state.setCashAmount);

  const cashAmountToggle = () => {
    cashAmount(ref.current.value);
  };

  function MonthHandler() {
    const monthCounter = usePercentStore((state) => state.monthAmount);
    return <span>{monthCounter}</span>;
  }

  const monthAmount = usePercentStore((state) => state.setMonthAmount);

  const monthAmountToggle = () => {
    monthAmount(refMonth.current.value);
  };

  function SetTotalCashMonth() {
    const totalSum = Math.round(
      usePercentStore((state) => state.cashAmount) /
        usePercentStore((state) => state.monthAmount) +
        usePercentStore((state) => state.totalPercent)
    );
    return <span>{`${totalSum} руб.`}</span>;
  }

  function SetTotalPercent() {
    const totalSum = usePercentStore((state) => state.totalPercent);
    return <span>{`${totalSum} %`}</span>;
  }

  return (
    <div className=" m-auto border-2 bg-white rounded-2xl w-max shadow-2xl">
      <div className="py-10 px-10">
        <h2>Калькулятор рассчёта по кредиту наличными</h2>
        <div className="flex flex-col  my-2 ">
          <div id="setMoneyInput" className="my-5">
            <p className="flex justify-start">Сумма кредита</p>
            <div className=" flex justify-between">
              <CashHandler />
            </div>

            <input
              type="range"
              ref={ref}
              className="my-2 w-100 h-2 w-full"
              max={'7000000'}
              min={'300000'}
              onChange={cashAmountToggle}
            />

            <div className=" flex justify-between font-thin ">
              <span>от 300,000 P</span>
              <span>до 7,000,000 P </span>
            </div>
          </div>

          <div id="setMounthsInput" className="my-5">
            <p className="flex justify-start">Срок кредита</p>
            <div className=" flex justify-between">
              <MonthHandler />
            </div>
            <input
              ref={refMonth}
              type="range"
              className="my-2 w-100 h-2 w-full"
              max={'60'}
              min={'13'}
              onChange={monthAmountToggle}
            />
            <div className=" flex justify-between font-thin">
              <span>13 месяцев</span>
              <span>60 месяцев</span>
            </div>
          </div>
        </div>

        <div className="my-5 py-3">
          <div>
            <p className="flex justify-start">Дополнительные опции</p>
            <div className="flex justify-between my-3 py-2">
              <span>Зарплатная карта КирБанка</span>
              <SetCardHolder />
              <span>-1.5%</span>
            </div>
            <div className="flex justify-between my-3 ">
              <span>Подписка на меня в инста </span>

              <SetSubHolder />
              <span>-2%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col  my-8 py-2">
          <div className="flex justify-between my-3">
            <p>Ежемесячный платёж</p>
            <SetTotalCashMonth />
          </div>
          <div className="flex justify-between my-2">
            <p>Процентная ставка</p>
            <SetTotalPercent />
          </div>
        </div>
        <button className="bg-blue-500  px-8 py-4 border-2 rounded-2xl shadow-2xll hover:bg-blue-300 ">
          Оформить кредит
        </button>
      </div>
    </div>
  );
}
