/**
 * 上海穿搭建议数据库
 * 包含50+条穿搭方案，考虑气温、季节、性别、星座风格等因素
 */

export const clothing = [
  // 男士穿搭 - 春季
  {
    id: 1,
    style: '商务休闲',
    items: ['白衬衫', '卡其色休闲裤', '小白鞋', '腕表'],
    gender: 'male',
    tempRange: [15, 22],
    season: '春',
    occasion: ['约会', '聚会', '日常'],
    zodiacMatch: ['处女座', '摩羯座', '金牛座'],
    description: '清爽干练，适合多种场合'
  },
  {
    id: 2,
    style: '街头潮流',
    items: ['卫衣', '破洞牛仔裤', '板鞋', '棒球帽'],
    gender: 'male',
    tempRange: [12, 20],
    season: '春',
    occasion: ['约会', '聚会', '逛街'],
    zodiacMatch: ['白羊座', '狮子座', '射手座'],
    description: '年轻活力，展现个性'
  },
  {
    id: 3,
    style: '文艺清新',
    items: ['针织开衫', '白T恤', '九分裤', '帆布鞋'],
    gender: 'male',
    tempRange: [14, 20],
    season: '春',
    occasion: ['约会', '咖啡厅', '看展'],
    zodiacMatch: ['双鱼座', '巨蟹座', '天秤座'],
    description: '温柔斯文，富有品味'
  },
  {
    id: 4,
    style: '运动休闲',
    items: ['运动外套', '运动裤', '跑鞋', '运动包'],
    gender: 'male',
    tempRange: [10, 18],
    season: '春',
    occasion: ['运动', '户外', '日常'],
    zodiacMatch: ['白羊座', '射手座', '水瓶座'],
    description: '舒适自在，方便活动'
  },
  {
    id: 5,
    style: '简约风格',
    items: ['黑色T恤', '牛仔裤', '板鞋'],
    gender: 'male',
    tempRange: [16, 24],
    season: '春',
    occasion: ['约会', '日常', '聚会'],
    zodiacMatch: ['天蝎座', '摩羯座', '处女座'],
    description: '永不过时的经典搭配'
  },
  // 男士穿搭 - 夏季
  {
    id: 6,
    style: '清爽夏日',
    items: ['白色短袖衬衫', '卡其色短裤', '凉鞋'],
    gender: 'male',
    tempRange: [25, 35],
    season: '夏',
    occasion: ['约会', '海滩', '度假'],
    zodiacMatch: ['双子座', '天秤座', '水瓶座'],
    description: '清凉透气，夏日必备'
  },
  {
    id: 7,
    style: '运动型男',
    items: ['速干T恤', '运动短裤', '跑鞋', '遮阳帽'],
    gender: 'male',
    tempRange: [26, 36],
    season: '夏',
    occasion: ['运动', '户外', '健身'],
    zodiacMatch: ['白羊座', '狮子座', '射手座'],
    description: '透气排汗，运动首选'
  },
  {
    id: 8,
    style: '文艺青年',
    items: ['亚麻短袖', '棉麻九分裤', '帆布鞋'],
    gender: 'male',
    tempRange: [24, 32],
    season: '夏',
    occasion: ['约会', '咖啡厅', '文艺活动'],
    zodiacMatch: ['双鱼座', '巨蟹座', '金牛座'],
    description: '透气舒适，文艺范十足'
  },
  {
    id: 9,
    style: 'POLO商务',
    items: ['POLO衫', '休闲长裤', '皮鞋', '皮带'],
    gender: 'male',
    tempRange: [26, 33],
    season: '夏',
    occasion: ['商务', '约会', '正式场合'],
    zodiacMatch: ['处女座', '摩羯座', '天蝎座'],
    description: '商务休闲兼得，正式不失活力'
  },
  {
    id: 10,
    style: '潮流街头',
    items: ['印花T恤', '工装短裤', '老爹鞋', '渔夫帽'],
    gender: 'male',
    tempRange: [25, 34],
    season: '夏',
    occasion: ['逛街', '聚会', '音乐节'],
    zodiacMatch: ['水瓶座', '双子座', '射手座'],
    description: '个性张扬，潮流前线'
  },
  // 男士穿搭 - 秋季
  {
    id: 11,
    style: '绅士风范',
    items: ['针织衫', '衬衫', '西裤', '皮鞋'],
    gender: 'male',
    tempRange: [15, 22],
    season: '秋',
    occasion: ['约会', '商务', '正式场合'],
    zodiacMatch: ['处女座', '天秤座', '摩羯座'],
    description: '成熟稳重，展现品味'
  },
  {
    id: 12,
    style: '复古学院',
    items: ['毛衣马甲', '衬衫', '牛仔裤', '马丁靴'],
    gender: 'male',
    tempRange: [12, 20],
    season: '秋',
    occasion: ['约会', '逛街', '咖啡厅'],
    zodiacMatch: ['金牛座', '处女座', '双鱼座'],
    description: '复古雅致，文艺气息'
  },
  {
    id: 13,
    style: '工装机能',
    items: ['工装夹克', 'T恤', '工装裤', '马丁靴'],
    gender: 'male',
    tempRange: [10, 18],
    season: '秋',
    occasion: ['户外', '逛街', '日常'],
    zodiacMatch: ['白羊座', '天蝎座', '水瓶座'],
    description: '硬朗有型，功能性强'
  },
  {
    id: 14,
    style: '轻奢风格',
    items: ['羊绒开衫', '高领毛衣', '西裤', '乐福鞋'],
    gender: 'male',
    tempRange: [14, 21],
    season: '秋',
    occasion: ['约会', '商务', '聚会'],
    zodiacMatch: ['金牛座', '天秤座', '狮子座'],
    description: '低调奢华，品质生活'
  },
  {
    id: 15,
    style: '日系简约',
    items: ['宽松T恤', '阔腿裤', '帆布鞋', '单肩包'],
    gender: 'male',
    tempRange: [16, 23],
    season: '秋',
    occasion: ['日常', '逛街', '咖啡厅'],
    zodiacMatch: ['双鱼座', '巨蟹座', '天秤座'],
    description: '舒适自在，日式美学'
  },
  // 男士穿搭 - 冬季
  {
    id: 16,
    style: '暖男穿搭',
    items: ['羽绒服', '高领毛衣', '休闲裤', '马丁靴'],
    gender: 'male',
    tempRange: [0, 10],
    season: '冬',
    occasion: ['约会', '日常', '逛街'],
    zodiacMatch: ['巨蟹座', '双鱼座', '金牛座'],
    description: '温暖舒适，阳光大男孩'
  },
  {
    id: 17,
    style: '商务精英',
    items: ['呢子大衣', '西装', '围巾', '皮鞋'],
    gender: 'male',
    tempRange: [2, 12],
    season: '冬',
    occasion: ['商务', '正式场合', '约会'],
    zodiacMatch: ['摩羯座', '天蝎座', '处女座'],
    description: '精英范儿，成功人士'
  },
  {
    id: 18,
    style: '运动保暖',
    items: ['冲锋衣', '抓绒衣', '运动裤', '登山鞋'],
    gender: 'male',
    tempRange: [-5, 8],
    season: '冬',
    occasion: ['运动', '户外', '登山'],
    zodiacMatch: ['白羊座', '射手座', '水瓶座'],
    description: '保暖防风，户外必备'
  },
  {
    id: 19,
    style: '韩系暖男',
    items: ['长款羽绒服', '针织衫', '牛仔裤', '运动鞋'],
    gender: 'male',
    tempRange: [1, 11],
    season: '冬',
    occasion: ['约会', '逛街', '日常'],
    zodiacMatch: ['天秤座', '双子座', '狮子座'],
    description: '时尚保暖，韩范十足'
  },
  {
    id: 20,
    style: '街头潮酷',
    items: ['飞行员夹克', '卫衣', '束脚裤', '高帮球鞋'],
    gender: 'male',
    tempRange: [3, 13],
    season: '冬',
    occasion: ['逛街', '聚会', '滑板'],
    zodiacMatch: ['水瓶座', '双子座', '射手座'],
    description: '潮流前线，街头王者'
  },
  // 女士穿搭 - 春季
  {
    id: 21,
    style: '甜美淑女',
    items: ['碎花连衣裙', '针织开衫', '平底鞋', '小包'],
    gender: 'female',
    tempRange: [14, 22],
    season: '春',
    occasion: ['约会', '逛街', '下午茶'],
    zodiacMatch: ['双鱼座', '巨蟹座', '金牛座'],
    description: '温柔甜美，公主范儿'
  },
  {
    id: 22,
    style: '法式优雅',
    items: ['白衬衫', 'A字半裙', '平底芭蕾舞鞋', '贝雷帽'],
    gender: 'female',
    tempRange: [15, 23],
    season: '春',
    occasion: ['约会', '咖啡厅', '看展'],
    zodiacMatch: ['天秤座', '双子座', '处女座'],
    description: '优雅知性，法式浪漫'
  },
  {
    id: 23,
    style: '运动少女',
    items: ['运动背心', '紧身裤', '运动鞋', '发带'],
    gender: 'female',
    tempRange: [12, 20],
    season: '春',
    occasion: ['运动', '健身', '瑜伽'],
    zodiacMatch: ['白羊座', '狮子座', '射手座'],
    description: '活力四射，健康美丽'
  },
  {
    id: 24,
    style: '通勤OL',
    items: ['西装外套', '白衬衫', '铅笔裙', '高跟鞋'],
    gender: 'female',
    tempRange: [16, 24],
    season: '春',
    occasion: ['商务', '约会', '工作'],
    zodiacMatch: ['处女座', '摩羯座', '天蝎座'],
    description: '干练专业，职场女性'
  },
  {
    id: 25,
    style: '森系文艺',
    items: ['棉麻衬衫', '背带裙', '帆布鞋', '草帽'],
    gender: 'female',
    tempRange: [15, 23],
    season: '春',
    occasion: ['约会', '郊游', '拍照'],
    zodiacMatch: ['双鱼座', '巨蟹座', '处女座'],
    description: '清新自然，文艺范儿'
  },
  // 女士穿搭 - 夏季
  {
    id: 26,
    style: '度假风情',
    items: ['吊带连衣裙', '草帽', '凉鞋', '编织包'],
    gender: 'female',
    tempRange: [26, 35],
    season: '夏',
    occasion: ['度假', '海滩', '旅游'],
    zodiacMatch: ['射手座', '双子座', '狮子座'],
    description: '度假必备，海滩女神'
  },
  {
    id: 27,
    style: '清凉甜美',
    items: ['雪纺衫', '牛仔短裙', '凉鞋', '墨镜'],
    gender: 'female',
    tempRange: [25, 34],
    season: '夏',
    occasion: ['约会', '逛街', '聚会'],
    zodiacMatch: ['双鱼座', '天秤座', '金牛座'],
    description: '清凉透气，甜美可人'
  },
  {
    id: 28,
    style: '运动活力',
    items: ['运动背心', '瑜伽裤', '运动鞋', '遮阳帽'],
    gender: 'female',
    tempRange: [26, 36],
    season: '夏',
    occasion: ['运动', '健身', '跑步'],
    zodiacMatch: ['白羊座', '狮子座', '水瓶座'],
    description: '活力无限，健康生活'
  },
  {
    id: 29,
    style: '职场丽人',
    items: ['短袖衬衫', '高腰阔腿裤', '高跟鞋', '手提包'],
    gender: 'female',
    tempRange: [27, 34],
    season: '夏',
    occasion: ['商务', '工作', '约会'],
    zodiacMatch: ['处女座', '摩羯座', '天蝎座'],
    description: '专业干练，都市女性'
  },
  {
    id: 30,
    style: '少女风',
    items: ['T恤', '牛仔短裤', '小白鞋', '双肩包'],
    gender: 'female',
    tempRange: [24, 33],
    season: '夏',
    occasion: ['日常', '逛街', '学生'],
    zodiacMatch: ['双子座', '白羊座', '水瓶座'],
    description: '青春活泼，少女感满满'
  },
  // 女士穿搭 - 秋季
  {
    id: 31,
    style: '温柔知性',
    items: ['针织衫', '百褶裙', '短靴', '贝雷帽'],
    gender: 'female',
    tempRange: [14, 22],
    season: '秋',
    occasion: ['约会', '咖啡厅', '看展'],
    zodiacMatch: ['天秤座', '双鱼座', '处女座'],
    description: '温柔优雅，知性美人'
  },
  {
    id: 32,
    style: '英伦学院',
    items: ['格子西装', '白衬衫', '格裙', '乐福鞋'],
    gender: 'female',
    tempRange: [12, 20],
    season: '秋',
    occasion: ['约会', '逛街', '日常'],
    zodiacMatch: ['处女座', '摩羯座', '金牛座'],
    description: '学院风格，复古典雅'
  },
  {
    id: 33,
    style: '摩登都市',
    items: ['风衣', '紧身裤', '短靴', '手提包'],
    gender: 'female',
    tempRange: [10, 18],
    season: '秋',
    occasion: ['商务', '约会', '逛街'],
    zodiacMatch: ['天蝎座', '摩羯座', '狮子座'],
    description: '摩登时尚，都市丽人'
  },
  {
    id: 34,
    style: '休闲舒适',
    items: ['卫衣', '阔腿裤', '运动鞋', '帆布包'],
    gender: 'female',
    tempRange: [13, 21],
    season: '秋',
    occasion: ['日常', '逛街', '聚会'],
    zodiacMatch: ['水瓶座', '双子座', '射手座'],
    description: '舒适自在，休闲风格'
  },
  {
    id: 35,
    style: '复古名媛',
    items: ['毛衣', '高腰阔腿裤', '高跟鞋', '复古包'],
    gender: 'female',
    tempRange: [15, 23],
    season: '秋',
    occasion: ['约会', '聚会', '正式场合'],
    zodiacMatch: ['天秤座', '金牛座', '巨蟹座'],
    description: '复古优雅，名媛气质'
  },
  // 女士穿搭 - 冬季
  {
    id: 36,
    style: '温暖可爱',
    items: ['羽绒服', '毛衣', '打底裤', '雪地靴'],
    gender: 'female',
    tempRange: [0, 10],
    season: '冬',
    occasion: ['日常', '逛街', '约会'],
    zodiacMatch: ['双鱼座', '巨蟹座', '金牛座'],
    description: '保暖舒适，可爱满分'
  },
  {
    id: 37,
    style: '优雅大衣',
    items: ['长款大衣', '针织连衣裙', '长靴', '围巾'],
    gender: 'female',
    tempRange: [2, 12],
    season: '冬',
    occasion: ['约会', '商务', '逛街'],
    zodiacMatch: ['天秤座', '处女座', '摩羯座'],
    description: '优雅大气，气质出众'
  },
  {
    id: 38,
    style: '运动保暖',
    items: ['羽绒马甲', '卫衣', '运动裤', '运动鞋'],
    gender: 'female',
    tempRange: [1, 11],
    season: '冬',
    occasion: ['运动', '户外', '日常'],
    zodiacMatch: ['白羊座', '射手座', '狮子座'],
    description: '运动保暖，活力依旧'
  },
  {
    id: 39,
    style: '甜美毛绒',
    items: ['毛绒外套', '卫衣', '牛仔裤', '短靴'],
    gender: 'female',
    tempRange: [3, 13],
    season: '冬',
    occasion: ['约会', '逛街', '拍照'],
    zodiacMatch: ['双鱼座', '巨蟹座', '天秤座'],
    description: '软萌可爱，毛绒质感'
  },
  {
    id: 40,
    style: '时尚街头',
    items: ['羽绒服', '卫衣', '阔腿裤', '老爹鞋'],
    gender: 'female',
    tempRange: [0, 10],
    season: '冬',
    occasion: ['逛街', '日常', '聚会'],
    zodiacMatch: ['水瓶座', '双子座', '射手座'],
    description: '潮流前卫，街头酷女孩'
  },
  // 通用穿搭 - 全季节
  {
    id: 41,
    style: '极简黑白',
    items: ['白T恤', '黑色裤子', '小白鞋'],
    gender: 'unisex',
    tempRange: [15, 28],
    season: '春',
    occasion: ['日常', '约会', '逛街'],
    zodiacMatch: ['处女座', '摩羯座', '天蝎座'],
    description: '永恒经典，简约不简单'
  },
  {
    id: 42,
    style: '韩系慵懒',
    items: ['宽松毛衣', '阔腿裤', '帆布鞋'],
    gender: 'female',
    tempRange: [12, 20],
    season: '秋',
    occasion: ['日常', '咖啡厅', '逛街'],
    zodiacMatch: ['双鱼座', '巨蟹座', '天秤座'],
    description: '慵懒舒适，韩范满满'
  },
  {
    id: 43,
    style: '轻熟职场',
    items: ['针织衫', '西装裤', '高跟鞋', '手表'],
    gender: 'female',
    tempRange: [16, 24],
    season: '春',
    occasion: ['商务', '工作', '约会'],
    zodiacMatch: ['处女座', '摩羯座', '金牛座'],
    description: '轻熟魅力，职场女王'
  },
  {
    id: 44,
    style: '日系原宿',
    items: ['印花卫衣', '直筒裤', '帆布鞋', '单肩包'],
    gender: 'unisex',
    tempRange: [14, 23],
    season: '春',
    occasion: ['逛街', '聚会', '音乐节'],
    zodiacMatch: ['水瓶座', '双子座', '射手座'],
    description: '原宿风格，个性十足'
  },
  {
    id: 45,
    style: '优雅名媛',
    items: ['小香风外套', '珍珠项链', '包臀裙', '高跟鞋'],
    gender: 'female',
    tempRange: [18, 26],
    season: '春',
    occasion: ['正式场合', '晚宴', '商务'],
    zodiacMatch: ['天秤座', '金牛座', '狮子座'],
    description: '名媛气质，优雅高贵'
  },
  {
    id: 46,
    style: '工装机能',
    items: ['工装背心', 'T恤', '工装裤', '马丁靴'],
    gender: 'male',
    tempRange: [16, 25],
    season: '春',
    occasion: ['日常', '户外', '逛街'],
    zodiacMatch: ['白羊座', '天蝎座', '水瓶座'],
    description: '功能性强，硬朗有型'
  },
  {
    id: 47,
    style: '学院清新',
    items: ['衬衫', '背带裤', '帆布鞋', '双肩包'],
    gender: 'female',
    tempRange: [15, 24],
    season: '春',
    occasion: ['日常', '学生', '约会'],
    zodiacMatch: ['处女座', '双鱼座', '巨蟹座'],
    description: '学生气息，清新可人'
  },
  {
    id: 48,
    style: '复古波普',
    items: ['复古衬衫', '高腰阔腿裤', '乐福鞋', '复古包'],
    gender: 'female',
    tempRange: [17, 26],
    season: '夏',
    occasion: ['约会', '拍照', '逛街'],
    zodiacMatch: ['天秤座', '金牛座', '狮子座'],
    description: '复古回潮，时髦精致'
  },
  {
    id: 49,
    style: '度假慵懒',
    items: ['亚麻衬衫', '白色长裤', '拖鞋', '草帽'],
    gender: 'male',
    tempRange: [26, 34],
    season: '夏',
    occasion: ['度假', '海滩', '旅游'],
    zodiacMatch: ['双鱼座', '巨蟹座', '双子座'],
    description: '度假风情，慵懒惬意'
  },
  {
    id: 50,
    style: '摇滚朋克',
    items: ['皮夹克', 'T恤', '破洞牛仔裤', '马丁靴'],
    gender: 'unisex',
    tempRange: [12, 22],
    season: '秋',
    occasion: ['演出', '聚会', '酒吧'],
    zodiacMatch: ['天蝎座', '水瓶座', '白羊座'],
    description: '摇滚范儿，叛逆不羁'
  },
  {
    id: 51,
    style: '温柔姐姐',
    items: ['V领毛衣', '半身裙', '短靴', '长款项链'],
    gender: 'female',
    tempRange: [13, 21],
    season: '秋',
    occasion: ['约会', '咖啡厅', '逛街'],
    zodiacMatch: ['天秤座', '双鱼座', '金牛座'],
    description: '温柔知性，姐姐范儿'
  },
  {
    id: 52,
    style: '科技未来',
    items: ['机能外套', '黑色紧身衣', '运动裤', '高帮鞋'],
    gender: 'unisex',
    tempRange: [10, 20],
    season: '秋',
    occasion: ['逛街', '展览', '聚会'],
    zodiacMatch: ['水瓶座', '双子座', '射手座'],
    description: '未来感十足，科技潮流'
  },
  {
    id: 53,
    style: '暖系男友',
    items: ['厚毛衣', '休闲裤', '板鞋', '围巾'],
    gender: 'male',
    tempRange: [5, 15],
    season: '冬',
    occasion: ['约会', '日常', '逛街'],
    zodiacMatch: ['巨蟹座', '金牛座', '双鱼座'],
    description: '温暖可靠，男友力MAX'
  },
  {
    id: 54,
    style: '仙女飘飘',
    items: ['长款毛衣', '纱裙', '短靴', '贝雷帽'],
    gender: 'female',
    tempRange: [8, 18],
    season: '秋',
    occasion: ['约会', '拍照', '聚会'],
    zodiacMatch: ['双鱼座', '天秤座', '巨蟹座'],
    description: '仙气十足，飘逸灵动'
  },
  {
    id: 55,
    style: '商务精英',
    items: ['三件套西装', '领带', '皮鞋', '公文包'],
    gender: 'male',
    tempRange: [10, 24],
    season: '春',
    occasion: ['商务', '正式场合', '会议'],
    zodiacMatch: ['摩羯座', '处女座', '天蝎座'],
    description: '精英范儿，商务首选'
  }
]

/**
 * 根据条件筛选穿搭
 * @param {Object} filters - 筛选条件
 * @returns {Array} 符合条件的穿搭列表
 */
export function filterClothing(filters = {}) {
  return clothing.filter(item => {
    // 性别匹配（unisex通用）
    if (filters.gender && item.gender !== 'unisex' && item.gender !== filters.gender) {
      return false
    }
    
    // 温度匹配
    if (filters.temperature !== undefined) {
      if (filters.temperature < item.tempRange[0] || filters.temperature > item.tempRange[1]) {
        return false
      }
    }
    
    // 季节匹配
    if (filters.season && item.season !== filters.season) {
      return false
    }
    
    // 场合匹配
    if (filters.occasion && !item.occasion.includes(filters.occasion)) {
      return false
    }
    
    // 星座匹配
    if (filters.zodiac && item.zodiacMatch && !item.zodiacMatch.includes(filters.zodiac)) {
      return false
    }
    
    return true
  })
}

/**
 * 根据月份获取季节
 * @param {Number} month - 月份 (1-12)
 * @returns {String} 季节
 */
export function getSeasonByMonth(month) {
  if (month >= 3 && month <= 5) return '春'
  if (month >= 6 && month <= 8) return '夏'
  if (month >= 9 && month <= 11) return '秋'
  return '冬'
}

