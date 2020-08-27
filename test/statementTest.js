const test = require('ava');
const {statement} = require('../src/statement');

test('test case1: there is no performances', t => {
  //given
  const invoice = {
    'customer': 'BigCo',
    'performances': [],
  };
    const expectResult = 'Statement for BigCo\n'
        + `Amount owed is $0.00\n`
        + `You earned 0 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});

test('test case2: audience is 30', t => {
  //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };

 const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $400.00 (30 seats)\n`
        + `Amount owed is $400.00\n`
        + `You earned 0 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});


test('test case3: audience is more then 30', t => {
  //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };

 const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $410.00 (31 seats)\n`
        + `Amount owed is $410.00\n`
        + `You earned 1 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});


test('test case4: audience is 20 and play.type is comedy', t => {
  //given
    const invoice = {
        'customer': 'SmallCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
        ],
    };

 const expectResult = 'Statement for SmallCo\n'
        + ` As You Like It: $360.00 (20 seats)\n`
        + `Amount owed is $360.00\n`
        + `You earned 4 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});

test('test case5: audience is 22 and play.type is comedy', t => {
  //given
    const invoice = {
        'customer': 'SmallCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 22,
            }
        ],
    };

 const expectResult = 'Statement for SmallCo\n'
        + ` As You Like It: $476.00 (22 seats)\n`
        + `Amount owed is $476.00\n`
        + `You earned 4 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});

test('test case6: there is many performance', t => {
  //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            },
            {
                'playID': 'as-like',
                'audience': 20,
            },
            {
                'playID': 'othello',
                'audience': 25,
            },
        ],
    };

    const expectResult = 'Statement for BigCo\n'
        + ` Hamlet: $400.00 (30 seats)\n`
        + ` As You Like It: $360.00 (20 seats)\n`
        + ` Othello: $400.00 (25 seats)\n`
        + `Amount owed is $1,160.00\n`
        + `You earned 4 credits \n`;

  //when
  const result = statement(invoice, plays);

  //then
  t.is(result, expectResult);
});

test('test case7: Customer BigCo has one unknown performance. ', t => {
  //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };

    const plays = {
      'hamlet': {
        'name': 'Hamlet',
        'type': 'horror',
      }
    };

  //when
   try {
      statement(invoice, plays);
      t.fail();
    }
    catch (e) {
    //then
      t.is(e.message, 'unknown type: horror');
    }

});


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};