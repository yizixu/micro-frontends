/**
 * @description 基于特殊http状态码定义异常提示语
 */
import i18n from '@/lang'
// 500异常，多个错误提示语随机warning提示
const error500 = [i18n.t('common.error500_1'), i18n.t('common.error500_2'), i18n.t('common.error500_3')]
const errorMessageMap = {
  500: error500[Math.round(Math.random() * error500.length)]
}

export default errorMessageMap
