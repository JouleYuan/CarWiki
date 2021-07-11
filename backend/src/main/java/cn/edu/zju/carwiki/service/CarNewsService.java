package cn.edu.zju.carwiki.service;

import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/11 11:01
 */
public interface CarNewsService {
    Map<String, Object> selectObjects(Map<String, String> queryMap, int pageSize);
}
