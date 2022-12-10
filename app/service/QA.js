const map = new Map([
  [
    ['今晚吃什么'],
    {
      answers: ['贞姨', '撸串'],
    },
  ],
  [
    ['cs'],
    {
      answers: ['你老板可真倒霉'],
    },
  ],
  [
    ['dd', '上号', '五排', '开黑'],
    {
      answers: ['来陪妲己玩耍吧'],
    },
  ],
]);

const randomNum = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const mapKey = (key) => {
  const all_keys = Array.from(map.keys());

  const fit_keys = all_keys.find((i) => i.includes(key));

  const tmp = map.get(fit_keys);

  if (!tmp) return '';

  const answers = tmp.answers;
  const len = answers.length;

  const random = randomNum(0, len - 1);

  return answers[random];
};

module.exports = mapKey;
