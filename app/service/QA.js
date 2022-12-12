const map = new Map([
  [
    ['吃什么'],
    {
      common_key_start: '随机抽了一个：',
      answers: [
        '如轩',
        '观绿茶居',
        '惠城渔仔',
        '膳糧',
        '潮福',
        '今潮',
        '摩打食堂',
        '贞姨',
        '点都德',
        '陶陶居',
        '南京大牌档',
        '海门鱼仔',
        '小炳胜',
        '仙庙烧鸡',
        '外婆家',
        '寿司郎',
        '啫八',
        '滨寿司',
        '惠食佳',
        '珍姐龙虾',
        '洛奇先生',
        '肥姨濑尿虾',
        '等我送上门',
        '凤园椰珍',
        '木屋烧烤',
        '麻蒲烤肉',
        '金顺烤肉',
        '海底捞',
        '陈记顺和',
        '传记潮发',
        '八合里',
        '海银海记',
        '鱼鲜生',
        '九记海鲜',
        '蟹满楼',
        '胖哥俩',
        '蛙小侠',
        '撚手食堂',
        '萨莉亚',
        '敏华',
        '万岁',
        '元气寿司',
        '丽的面家',
        '御前十七',
        '今崎烧',
        '淼鑫猪肚鸡',
        '蕉叶',
        '太二',
        '卡朋',
        '大鸽饭',
        '绿茶',
        '蚝魁',
        '蔡澜港式点心',
        '禄运茶居',
        '牛小灶',
        '胡桃里',
        '榕意',
        '79号渔船',
        '德赛饭堂',
        '肯德基',
        '麦当劳',
        '汤河粉',
        '麻辣香锅',
        '麻辣烫',
        '公司餐',
      ],
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

  [
    ['排行榜'],
    {
      callback: async (_this) => {
        return await _this.service.qw.getRank('qa');
      },
    },
  ],
]);

const randomNum = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const mapKey = async (_this, key) => {
  const all_keys = Array.from(map.keys());

  key = String(key).toLowerCase();

  const fit_keys = all_keys.find((i) => i.includes(key) || key.includes(i));

  const tmp = map.get(fit_keys);

  if (!tmp) return '';
  const callback = tmp?.callback;
  if (callback && typeof callback === 'function') {
    const tmp = await callback(_this);
    return tmp;
  } else {
    const answers = tmp.answers;
    const common_key_start = tmp?.common_key_start || '';
    const len = answers.length;

    const random = randomNum(0, len - 1);

    return `${common_key_start}${answers[random]}`;
  }
};

module.exports = mapKey;
