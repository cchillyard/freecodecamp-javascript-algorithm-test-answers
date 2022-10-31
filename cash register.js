function checkCashRegister(price, cash, cid) {
  const currencies = [
    {
      name: 'ONE HUNDRED',
      amount: 100
    },
    {
      name: 'TWENTY',
      amount: 20
    },
    {
      name: 'TEN',
      amount: 10
    },
    {
      name: 'FIVE',
      amount: 5
    },
    {
      name: 'ONE',
      amount: 1
    },
    {
      name: 'QUARTER',
      amount: 0.25
    },
    {
      name: 'DIME',
      amount: 0.10
    },
    {
      name: 'NICKEL',
      amount: 0.05
    },
    {
      name: 'PENNY',
      amount: 0.01
    }
  ];
  const output = {
    status: null,
    change: []
  }
  let changeNeeded = cash - price;
  let changeGiven;
  const cidTotal = cid.reduce((total, currency) => {
    return total + currency[1];
  }, 0);

  if (cidTotal > changeNeeded) {
    output.status = 'OPEN';
    cid = cid.reverse();

    output.change = currencies.reduce((result, currency, index) => {
      changeGiven = 0;

      while (cid[index][1] > 0 && changeNeeded >= currency.amount) {
        changeNeeded -= currency.amount;
        cid[index][1] -= currency.amount;
        changeGiven += currency.amount;
        changeNeeded = Math.round(changeNeeded * 100) / 100;
      }

      if (changeGiven > 0) {
        result.push([currency.name, changeGiven]);
      }
      return result;
    }, []);

    if (changeNeeded > 0) {
      output.status = 'INSUFFICIENT_FUNDS';
      output.change = [];
    }
  }
  else {

    if (cidTotal < changeNeeded) {
      output.status = 'INSUFFICIENT_FUNDS';
    }
    else {
      output.status = 'CLOSED';
      output.change = cid;
    }
  }
  return output;
}

checkCashRegister(19.5, 20, [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]]);
