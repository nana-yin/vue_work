// 引入接口请求
import _$http from '@/request/index'

// 定义接口地址的类型
interface urlType {
  storeGetStoreLogo: string;
  storeCheckLoginCode: string;
  storeGetStoreDraw: string;
  storeLogout: string;
  storeSendLoginCode: string;
  photovoltaicPowerManage: string;
  otherEnergyPowerManage: string;
  digitalElectricChart: string;
  digitalGetStoreInfo: string;
  electricPowerManage: string;
  carbonEmissionManage: string;
  carbonReductionManage: string;
  energyGetDeviceNxInfo: string;
  energyGetDeviceNxList: string;
  storageGetStorageInfo: string;
  digitalGetEnergyConsumptionInfo: string;
}

const EnergyConsumption = '/energyconsumption'

// 定义接口地址
const API: urlType = {
  storeGetStoreLogo: EnergyConsumption + '/store/getStoreLogo', // 获取企业的Logo
  storeCheckLoginCode: EnergyConsumption + '/store/checkLoginCode', // 验证登录情况
  storeGetStoreDraw: EnergyConsumption + '/store/getStoreDraw', // 获取企业的图片
  storeLogout: EnergyConsumption + '/store/logout', // 登出
  storeSendLoginCode: EnergyConsumption + '/store/sendLoginCode', // 发送大屏验证码
  photovoltaicPowerManage: EnergyConsumption + '/photovoltaic/powerManage', // 光伏侧供能数据查询
  otherEnergyPowerManage: EnergyConsumption + '/otherEnergy/powerManage', // 其他能源数据查询
  storageGetStorageInfo: EnergyConsumption + '/storage/getStorageInfo', // 储能数据查询
  digitalElectricChart: EnergyConsumption + '/digital/electricChart', // 用电情况图表
  digitalGetEnergyConsumptionInfo:
    EnergyConsumption + '/digital/getEnergyConsumptionInfo', // 获取能源消耗情况
  digitalGetStoreInfo: EnergyConsumption + '/digital/getStoreInfo', // 获取企业相关信息
  electricPowerManage: EnergyConsumption + '/electric/powerManage', // 电网侧供能数据查询
  carbonEmissionManage: EnergyConsumption + '/carbon/carbonEmissionManage', // 碳排放量数据查询
  carbonReductionManage: EnergyConsumption + '/carbon/carbonReductionManage', // 碳减排量数据查询
  energyGetDeviceNxInfo: EnergyConsumption + '/energy/getDeviceNxInfo', // 设备能效统计
  energyGetDeviceNxList: EnergyConsumption + '/energy/getDeviceNxList' // 设备用能排行榜
}

export default {
  getStoreGetStoreLogo (params: {
    // 获取企业的Logo
    storeId: string;
  }) {
    return _$http.get(API.storeGetStoreLogo, params)
  },
  getStoreCheckLoginCode (params: {
    // 验证登录情况
    code: string;
    storeId: string;
  }) {
    return _$http.get(API.storeCheckLoginCode, params)
  },
  getStoreGetStoreDraw (params: {
    // 获取企业的图片
    storeId: string | number;
    drawType: string | number; // 1-厂区3D图 2-能源拓扑图
  }) {
    return _$http.get(API.storeGetStoreDraw, params)
  },
  getStoreLogout (params: {
    // 登出
    code: string;
    storeId: string;
  }) {
    return _$http.get(API.storeLogout, params)
  },
  getStoreSendLoginCode () {
    return _$http.get(API.storeSendLoginCode, {})
  },
  getPhotovoltaicPowerManage (params: {
    // 光伏侧供能数据查询
    type: string;
    storeId: string | number;
  }) {
    return _$http.get(API.photovoltaicPowerManage, params)
  },
  getStorageGetStorageInfo (params: {
    // 储能数据查询
    type: string;
    storeId: string | number;
  }) {
    return _$http.get(API.storageGetStorageInfo, params)
  },
  getOtherEnergyPowerManage (params: {
    // 其他能源数据查询
    type: string;
    storeId: string | number;
  }) {
    return _$http.get(API.otherEnergyPowerManage, params)
  },
  getDigitalElectricChart (params: {
    // 用电情况图表
    type: string;
    storeId: string | number;
  }) {
    return _$http.get(API.digitalElectricChart, params)
  },
  getDigitalGetEnergyConsumptionInfo (params: {
    // 获取能源消耗情况
    type: string;
    storeId: string | number;
  }) {
    return _$http.get(API.digitalGetEnergyConsumptionInfo, params)
  },
  getDigitalGetStoreInfo (params: {
    // 获取企业相关信息
    storeId: string | number;
  }) {
    return _$http.get(API.digitalGetStoreInfo, params)
  },
  getElectricPowerManage (params: {
    // 电网侧供能数据查询
    storeId: string | number;
    type: string;
  }) {
    return _$http.get(API.electricPowerManage, params)
  },
  getCarbonEmissionManage (params: {
    // 碳排放量数据查询
    storeId: string | number;
    type: string;
  }) {
    return _$http.get(API.carbonEmissionManage, params)
  },
  getCarbonReductionManage (params: {
    // 碳减排量数据查询
    storeId: string | number;
    type: string;
  }) {
    return _$http.get(API.carbonReductionManage, params)
  },
  getEnergyGetDeviceNxInfo (params: {
    // 设备能效统计
    storeId: string | number;
    deviceType: number; // 1-机电设备 2-非机电设备
  }) {
    return _$http.get(API.energyGetDeviceNxInfo, params)
  },
  getEnergyGetDeviceNxList (params: {
    // 设备用能排行榜
    storeId: string | number;
    type: string;
  }) {
    return _$http.get(API.energyGetDeviceNxList, params)
  }
}
