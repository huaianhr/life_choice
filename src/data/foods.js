/**
 * 上海特色午餐数据库
 * 包含50+条午餐选项，考虑季节、五行属性等因素
 */

export const foods = [
  // 本帮菜系列
  {
    id: 1,
    name: '红烧肉',
    category: '本帮菜',
    seasons: ['春', '秋', '冬'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'high',
    tags: ['经典', '浓油赤酱', '下饭'],
    description: '上海传统本帮菜，肥而不腻，入口即化'
  },
  {
    id: 2,
    name: '糖醋小排',
    category: '本帮菜',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['金', '木'],
    temperature: 'warm',
    calories: 'high',
    tags: ['酸甜', '开胃', '经典'],
    description: '酸甜适中，色泽红亮，外焦里嫩'
  },
  {
    id: 3,
    name: '葱油拌面',
    category: '面食',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['木', '金'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['快捷', '传统', '香浓'],
    description: '葱香四溢，简单而美味的上海面食'
  },
  {
    id: 4,
    name: '生煎包',
    category: '小吃',
    seasons: ['秋', '冬', '春'],
    elements: ['土', '水'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['人气', '地道', '鲜美'],
    description: '底部金黄酥脆，馅料鲜美多汁'
  },
  {
    id: 5,
    name: '小笼包',
    category: '点心',
    seasons: ['春', '秋', '冬'],
    elements: ['金', '土'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['精致', '汤汁', '传统'],
    description: '皮薄馅大，汤汁饱满，需轻咬慢品'
  },
  {
    id: 6,
    name: '黄鱼面',
    category: '面食',
    seasons: ['春', '夏', '秋'],
    elements: ['水', '金'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['鲜美', '营养', '本帮'],
    description: '小黄鱼配阳春面，汤鲜味美'
  },
  {
    id: 7,
    name: '腌笃鲜',
    category: '汤菜',
    seasons: ['冬', '春'],
    elements: ['水', '土'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['滋补', '时令', '鲜香'],
    description: '咸肉、鲜肉、春笋慢炖，汤白味鲜'
  },
  {
    id: 8,
    name: '响油鳝糊',
    category: '本帮菜',
    seasons: ['夏', '秋'],
    elements: ['火', '水'],
    temperature: 'hot',
    calories: 'high',
    tags: ['滋补', '鲜香', '下饭'],
    description: '鳝鱼嫩滑，配料丰富，响油提香'
  },
  {
    id: 9,
    name: '四喜烤麸',
    category: '素菜',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['木', '土'],
    temperature: 'warm',
    calories: 'low',
    tags: ['素食', '健康', '传统'],
    description: '烤麸配花生、木耳、金针菜，甜口开胃'
  },
  {
    id: 10,
    name: '油爆虾',
    category: '海鲜',
    seasons: ['春', '夏', '秋'],
    elements: ['水', '火'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['鲜美', '快手', '高蛋白'],
    description: '虾壳酥脆，虾肉Q弹，油香四溢'
  },
  // 盖浇饭系列
  {
    id: 11,
    name: '咖喱牛肉饭',
    category: '盖浇饭',
    seasons: ['春', '秋', '冬'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'high',
    tags: ['浓郁', '饱腹', '快捷'],
    description: '咖喱浓郁，牛肉酥烂，配米饭绝配'
  },
  {
    id: 12,
    name: '茄汁大排饭',
    category: '盖浇饭',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['金', '木'],
    temperature: 'warm',
    calories: 'high',
    tags: ['经典', '酸甜', '分量足'],
    description: '大排厚实，茄汁酸甜，深受欢迎'
  },
  {
    id: 13,
    name: '梅菜扣肉饭',
    category: '盖浇饭',
    seasons: ['秋', '冬', '春'],
    elements: ['土', '火'],
    temperature: 'hot',
    calories: 'high',
    tags: ['下饭', '浓香', '经典'],
    description: '五花肉肥而不腻，梅菜提味解腻'
  },
  {
    id: 14,
    name: '番茄蛋饭',
    category: '盖浇饭',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['木', '金'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['家常', '营养', '清淡'],
    description: '简单家常，酸甜开胃，营养均衡'
  },
  {
    id: 15,
    name: '香菇滑鸡饭',
    category: '盖浇饭',
    seasons: ['春', '秋', '冬'],
    elements: ['木', '土'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['鲜香', '营养', '清淡'],
    description: '鸡肉嫩滑，香菇提鲜，健康选择'
  },
  // 面食系列
  {
    id: 16,
    name: '阳春面',
    category: '面食',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['水', '木'],
    temperature: 'warm',
    calories: 'low',
    tags: ['清淡', '快捷', '传统'],
    description: '清汤面条，简单纯粹，考验汤底功夫'
  },
  {
    id: 17,
    name: '辣肉面',
    category: '面食',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '金'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['辣味', '下饭', '香浓'],
    description: '肉沫辣酱配面条，香辣开胃'
  },
  {
    id: 18,
    name: '三鲜面',
    category: '面食',
    seasons: ['春', '夏', '秋'],
    elements: ['水', '木', '金'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['鲜美', '营养', '丰富'],
    description: '多种海鲜配料，汤鲜味美'
  },
  {
    id: 19,
    name: '红汤牛肉面',
    category: '面食',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'high',
    tags: ['浓郁', '饱腹', '滋补'],
    description: '牛肉软烂，汤汁浓郁，冬日暖身'
  },
  {
    id: 20,
    name: '炸猪排面',
    category: '面食',
    seasons: ['春', '秋', '冬'],
    elements: ['金', '火'],
    temperature: 'hot',
    calories: 'high',
    tags: ['酥脆', '分量足', '经典'],
    description: '炸猪排外酥里嫩，面条劲道'
  },
  // 饺子馄饨系列
  {
    id: 21,
    name: '鲜肉大馄饨',
    category: '馄饨',
    seasons: ['秋', '冬', '春'],
    elements: ['水', '土'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['温暖', '鲜美', '经典'],
    description: '皮薄馅大，汤清味鲜'
  },
  {
    id: 22,
    name: '虾仁馄饨',
    category: '馄饨',
    seasons: ['春', '夏', '秋'],
    elements: ['水', '金'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['鲜美', '营养', '高蛋白'],
    description: '虾仁Q弹，汤底鲜甜'
  },
  {
    id: 23,
    name: '荠菜馄饨',
    category: '馄饨',
    seasons: ['春'],
    elements: ['木', '土'],
    temperature: 'warm',
    calories: 'low',
    tags: ['时令', '清香', '健康'],
    description: '春季时令，荠菜清香独特'
  },
  // 炒菜套餐
  {
    id: 24,
    name: '青椒肉丝套餐',
    category: '套餐',
    seasons: ['春', '夏', '秋'],
    elements: ['木', '火'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['家常', '下饭', '营养'],
    description: '经典家常菜，营养均衡'
  },
  {
    id: 25,
    name: '鱼香肉丝套餐',
    category: '套餐',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['木', '金'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['开胃', '下饭', '经典'],
    description: '酸甜辣俱全，色香味美'
  },
  {
    id: 26,
    name: '宫保鸡丁套餐',
    category: '套餐',
    seasons: ['春', '秋', '冬'],
    elements: ['火', '金'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['香脆', '下饭', '经典'],
    description: '鸡丁嫩滑，花生香脆'
  },
  {
    id: 27,
    name: '麻婆豆腐套餐',
    category: '套餐',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['麻辣', '下饭', '川味'],
    description: '麻辣鲜香，豆腐嫩滑'
  },
  // 粥品系列
  {
    id: 28,
    name: '皮蛋瘦肉粥',
    category: '粥',
    seasons: ['春', '秋', '冬'],
    elements: ['水', '土'],
    temperature: 'warm',
    calories: 'low',
    tags: ['清淡', '养胃', '营养'],
    description: '粥底绵密，皮蛋瘦肉相得益彰'
  },
  {
    id: 29,
    name: '海鲜粥',
    category: '粥',
    seasons: ['春', '夏', '秋'],
    elements: ['水', '金'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['鲜美', '营养', '清淡'],
    description: '海鲜丰富，粥底鲜甜'
  },
  {
    id: 30,
    name: '香菇鸡肉粥',
    category: '粥',
    seasons: ['秋', '冬', '春'],
    elements: ['木', '土'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['滋补', '养胃', '营养'],
    description: '香菇提鲜，鸡肉嫩滑'
  },
  // 快餐系列
  {
    id: 31,
    name: '烧鸭饭',
    category: '快餐',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['火', '金'],
    temperature: 'warm',
    calories: 'high',
    tags: ['香浓', '快捷', '分量足'],
    description: '烧鸭皮脆肉嫩，酱汁浓郁'
  },
  {
    id: 32,
    name: '叉烧饭',
    category: '快餐',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['火', '土'],
    temperature: 'warm',
    calories: 'high',
    tags: ['经典', '甜咸', '快捷'],
    description: '叉烧色泽红亮，甜咸适中'
  },
  {
    id: 33,
    name: '卤肉饭',
    category: '快餐',
    seasons: ['春', '秋', '冬'],
    elements: ['土', '火'],
    temperature: 'hot',
    calories: 'high',
    tags: ['浓香', '下饭', '经典'],
    description: '肉质软烂，卤汁浓郁'
  },
  {
    id: 34,
    name: '酱鸭腿饭',
    category: '快餐',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['火', '金'],
    temperature: 'warm',
    calories: 'high',
    tags: ['鲜香', '肉质好', '快捷'],
    description: '鸭腿酱香浓郁，肉质紧实'
  },
  // 西式快餐
  {
    id: 35,
    name: '意大利肉酱面',
    category: '西餐',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['火', '木'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['西式', '浓郁', '快捷'],
    description: '肉酱浓郁，面条劲道'
  },
  {
    id: 36,
    name: '奶油蘑菇意面',
    category: '西餐',
    seasons: ['秋', '冬', '春'],
    elements: ['木', '土'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['西式', '香浓', '清淡'],
    description: '奶油香滑，蘑菇鲜美'
  },
  {
    id: 37,
    name: '牛排套餐',
    category: '西餐',
    seasons: ['春', '秋', '冬'],
    elements: ['火', '金'],
    temperature: 'hot',
    calories: 'high',
    tags: ['西式', '高蛋白', '精致'],
    description: '牛排鲜嫩，配菜丰富'
  },
  // 日韩料理
  {
    id: 38,
    name: '日式咖喱饭',
    category: '日料',
    seasons: ['春', '秋', '冬'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['日式', '浓郁', '舒适'],
    description: '咖喱香浓，配料丰富'
  },
  {
    id: 39,
    name: '亲子盖饭',
    category: '日料',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['金', '木'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['日式', '营养', '快捷'],
    description: '鸡肉嫩滑，鸡蛋半熟，口感丰富'
  },
  {
    id: 40,
    name: '牛肉盖饭',
    category: '日料',
    seasons: ['春', '秋', '冬'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'high',
    tags: ['日式', '鲜美', '饱腹'],
    description: '牛肉鲜嫩，汤汁浓郁'
  },
  {
    id: 41,
    name: '石锅拌饭',
    category: '韩料',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '木'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['韩式', '营养', '丰富'],
    description: '锅巴香脆，配菜多样，拌匀后美味'
  },
  {
    id: 42,
    name: '韩式炸鸡',
    category: '韩料',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['火', '金'],
    temperature: 'hot',
    calories: 'high',
    tags: ['韩式', '香脆', '人气'],
    description: '外皮酥脆，鸡肉多汁'
  },
  // 轻食系列
  {
    id: 43,
    name: '鸡胸肉沙拉',
    category: '轻食',
    seasons: ['春', '夏', '秋'],
    elements: ['木', '金'],
    temperature: 'cold',
    calories: 'low',
    tags: ['健康', '低卡', '高蛋白'],
    description: '新鲜蔬菜配高蛋白鸡胸肉'
  },
  {
    id: 44,
    name: '三文鱼沙拉',
    category: '轻食',
    seasons: ['春', '夏', '秋'],
    elements: ['水', '木'],
    temperature: 'cold',
    calories: 'medium',
    tags: ['健康', '营养', 'Omega-3'],
    description: '新鲜三文鱼配时令蔬菜'
  },
  {
    id: 45,
    name: '全麦三明治',
    category: '轻食',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['木', '金'],
    temperature: 'cold',
    calories: 'medium',
    tags: ['健康', '快捷', '营养'],
    description: '全麦面包夹新鲜食材'
  },
  // 砂锅煲仔系列
  {
    id: 46,
    name: '腊味煲仔饭',
    category: '煲仔饭',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'high',
    tags: ['香浓', '锅巴', '经典'],
    description: '腊肠腊肉香气四溢，锅巴香脆'
  },
  {
    id: 47,
    name: '排骨煲仔饭',
    category: '煲仔饭',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '土'],
    temperature: 'hot',
    calories: 'high',
    tags: ['鲜香', '滋补', '饱腹'],
    description: '排骨软烂入味，米饭吸收精华'
  },
  {
    id: 48,
    name: '黄鳝煲仔饭',
    category: '煲仔饭',
    seasons: ['夏', '秋'],
    elements: ['火', '水'],
    temperature: 'hot',
    calories: 'high',
    tags: ['滋补', '鲜美', '营养'],
    description: '黄鳝鲜嫩，营养丰富'
  },
  // 汤面馆系列
  {
    id: 49,
    name: '砂锅米线',
    category: '米粉',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '水'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['暖身', '丰富', '香辣'],
    description: '汤底浓郁，配料丰富'
  },
  {
    id: 50,
    name: '桂林米粉',
    category: '米粉',
    seasons: ['春', '夏', '秋', '冬'],
    elements: ['水', '火'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['清爽', '快捷', '经典'],
    description: '米粉滑嫩，卤水香浓'
  },
  {
    id: 51,
    name: '过桥米线',
    category: '米粉',
    seasons: ['秋', '冬', '春'],
    elements: ['火', '水'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['滋补', '鲜美', '云南'],
    description: '汤底浓郁，食材新鲜'
  },
  // 特色小吃
  {
    id: 52,
    name: '锅贴',
    category: '小吃',
    seasons: ['秋', '冬', '春'],
    elements: ['金', '火'],
    temperature: 'hot',
    calories: 'medium',
    tags: ['香脆', '鲜美', '经典'],
    description: '底部金黄酥脆，馅料多汁'
  },
  {
    id: 53,
    name: '鲜肉月饼',
    category: '小吃',
    seasons: ['秋'],
    elements: ['金', '土'],
    temperature: 'hot',
    calories: 'high',
    tags: ['时令', '酥脆', '上海特色'],
    description: '秋季限定，酥皮层层，肉馅鲜美'
  },
  {
    id: 54,
    name: '糯米鸡',
    category: '小吃',
    seasons: ['秋', '冬', '春'],
    elements: ['土', '木'],
    temperature: 'hot',
    calories: 'high',
    tags: ['糯香', '饱腹', '传统'],
    description: '糯米软糯，鸡肉鲜嫩，荷叶清香'
  },
  {
    id: 55,
    name: '蟹壳黄',
    category: '小吃',
    seasons: ['春', '秋', '冬'],
    elements: ['金', '火'],
    temperature: 'warm',
    calories: 'medium',
    tags: ['酥脆', '葱香', '上海特色'],
    description: '外皮酥脆如蟹壳，葱香浓郁'
  }
]

/**
 * 根据条件筛选食物
 * @param {Object} filters - 筛选条件
 * @returns {Array} 符合条件的食物列表
 */
export function filterFoods(filters = {}) {
  return foods.filter(food => {
    // 季节匹配
    if (filters.season && !food.seasons.includes(filters.season)) {
      return false
    }
    
    // 五行匹配
    if (filters.element && !food.elements.includes(filters.element)) {
      return false
    }
    
    // 温度属性匹配
    if (filters.temperature && food.temperature !== filters.temperature) {
      return false
    }
    
    // 分类匹配
    if (filters.category && food.category !== filters.category) {
      return false
    }
    
    return true
  })
}

/**
 * 获取当前季节
 * @returns {String} 季节名称
 */
export function getCurrentSeason() {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return '春'
  if (month >= 6 && month <= 8) return '夏'
  if (month >= 9 && month <= 11) return '秋'
  return '冬'
}

