package cn.edu.zju.carwiki.service;

import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/10 22:55
 */
public interface CarInfoService {
    Map<String, Object> selectObjects(Map<String, String> queryMap, int pageSize);
    Map<String, Object> selectStatistics(Map<String, String> queryMap);
}
