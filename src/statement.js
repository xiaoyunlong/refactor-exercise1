function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    thisAmount = getAmount(play,perf);
    volumeCredits = calculateVolumeCredits(play.type,perf.audience,volumeCredits);
    result += formatResult(format,play.name,thisAmount,perf.audience);

  }

  totalAmount = calculateTotalAmount(invoice.performances,plays);

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function calculateTotalAmount(performances,plays){
      let totalAmount = 0;
      for (let perf of performances) {
        const play = plays[perf.playID];
        let thisAmount = getAmount(play,perf);
        totalAmount += thisAmount;
      }
      return totalAmount;
}

function formatResult(format,name,thisAmount,audienceNumber){
    return ` ${name}: ${format(thisAmount / 100)} (${audienceNumber} seats)\n`;
}

function calculateVolumeCredits(type,audienceNumber,volumeCredits){

    volumeCredits += Math.max(audienceNumber - 30, 0);
    if ('comedy' === type) volumeCredits += Math.floor(audienceNumber / 5);
    return volumeCredits;

}

function getAmount(play,perf){
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = calculateTragedyAmount(perf.audience);
        break;
      case 'comedy':
        thisAmount = calculateComedyAmount(perf.audience);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
}

function calculateTragedyAmount(audienceNumber){
    let thisAmount = 40000;
    if (audienceNumber > 30) {
        thisAmount += 1000 * (audienceNumber - 30);
    }
    return thisAmount;
}

function calculateComedyAmount(audienceNumber){
    let thisAmount = 30000;
    if (audienceNumber > 20) {
       thisAmount += 10000 + 500 * (audienceNumber - 20);
    }
    thisAmount += 300 * audienceNumber;
    return thisAmount;
}


module.exports = {
  statement,
};
