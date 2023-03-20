import { useRef, useState } from 'react';
import { create } from 'zustand';

export function Calc() {
  const ref = useRef();
  const refMonth = useRef();

  const [cardHolderPercent, setCardHolderPercent] = useState(1.5);
  const [subscriptionPercent, setSubscribtionPercent] = useState(2);

  interface Store {
    cashAmount: number;
    monthAmount: number;
    totalPercent: number;
    setCashAmount: () => void;
    setMonthAmount: () => void;
    setTotalPercent: () => void;
  }

  const useCreditStore = create<Store>((set) => ({
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

  interface Percent {
    cardHolderChecked: boolean;
    subscribtionChecked: boolean;
    setCardHolderChecked: () => void;
    setSubscribtionChecked: () => void;
  }

  const usePercentStore = create<Percent>((set) => ({
    cardHolderChecked: false,
    subscribtionChecked: false,
    setCardHolderChecked: () =>
      set((state) => ({ cardHolderChecked: !state.cardHolderChecked })),
    setSubscribtionChecked: () =>
      set((state) => ({ subscribtionChecked: !state.subscribtionChecked })),
  }));

  function SetCardHolder() {
    const cardHolder = usePercentStore((state) => state.cardHolderChecked);
    return (
      <input
        type="checkbox"
        checked={cardHolder}
        onChange={usePercentStore((state) => state.setCardHolderChecked)}
        onClick={changeTotalPercent()}
      />
    );
  }

  function SetSubHolder() {
    const subHolder = usePercentStore((state) => state.subscribtionChecked);
    return (
      <input
        type="checkbox"
        checked={subHolder}
        onChange={usePercentStore((state) => state.setSubscribtionChecked)}
      />
    );
  }

  function CashHandler() {
    const cashCounter = useCreditStore((state) => state.cashAmount);
    return <span>{`${cashCounter} руб.`}</span>;
  }

  const cashAmount = useCreditStore((state) => state.setCashAmount);

  const cashAmountToggle = () => {
    cashAmount(ref.current.value);
  };

  function MonthHandler() {
    const monthCounter = useCreditStore((state) => state.monthAmount);
    return <span>{monthCounter}</span>;
  }

  const monthAmount = useCreditStore((state) => state.setMonthAmount);

  const monthAmountToggle = () => {
    monthAmount(refMonth.current.value);
  };

  const changeTotal = useCreditStore((state) => state.setTotalPercent);

  function changeTotalPercent() {
    changeTotal(
      usePercentStore((state) => state.cardHolderChecked)
        ? cardHolderPercent
        : 0
    );
  }

  function SetTotalCashMonth() {
    const totalSum = Math.round(
      useCreditStore((state) => state.cashAmount) /
        useCreditStore((state) => state.monthAmount) +
        useCreditStore((state) => state.totalPercent)
    );
    return <span>{`${totalSum} руб.`}</span>;
  }

  function SetTotalPercent() {
    const totalSum = useCreditStore((state) => state.totalPercent);
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
              <span>{`- ${cardHolderPercent} %`}</span>
            </div>
            <div className="flex justify-between my-3 ">
              <span>Подписка на меня в инста </span>

              <SetSubHolder />
              <span>{`- ${subscriptionPercent} %`}</span>
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
        <button
          onClick={(event) => {
            changeTotalPercent();
          }}
          className="bg-blue-500  px-8 py-4 border-2 rounded-2xl shadow-2xll hover:bg-blue-300 "
        >
          Оформить кредит
        </button>
      </div>
    </div>
  );
}
