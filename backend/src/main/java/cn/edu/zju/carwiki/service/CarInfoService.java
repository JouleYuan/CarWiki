package cn.edu.zju.carwiki.service;

import cn.edu.zju.carwiki.entity.PriceStatistic;
import cn.edu.zju.carwiki.entity.ScoreStatistic;

import java.util.List;
import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/10 22:55
 */
public interface CarInfoService {
    Map<String, Object> selectObjects(Map<String, String> queryMap, int pageSize);
    List<PriceStatistic> selectPriceStatistics(Map<String, String> queryMap, String fq);
    List<ScoreStatistic> selectScoreStatistics(Map<String, String> queryMap, String fq);
}
