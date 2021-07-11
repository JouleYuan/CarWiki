package cn.edu.zju.carwiki.service;

import cn.edu.zju.carwiki.entity.statistic.WatchCountStatistic;

import java.util.List;
import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/11 11:01
 */
public interface CarNewsService {
    Map<String, Object> selectObjects(Map<String, String> queryMap, int pageSize);
    List<WatchCountStatistic> selectWatchCountStatistics(Map<String, String> queryMap, String fq);
}
