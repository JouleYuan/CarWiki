package cn.edu.zju.carwiki.service.impl;

import cn.edu.zju.carwiki.entity.CarInfo;
import cn.edu.zju.carwiki.entity.ResponseData;
import cn.edu.zju.carwiki.service.CarInfoService;
import cn.edu.zju.carwiki.solr.SolrJClient;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/10 22:58
 */
@Service(value = "CarInfoService")
public class CarInfoServiceImpl implements CarInfoService {
    @Autowired
    private SolrJClient solrJClient;

    @Override
    public Map<String, Object> selectObjects(Map<String, String> queryMap, int pageSize) {
        SolrDocumentList solrDocumentList = solrJClient.query(queryMap, "carinfo");

        if (solrDocumentList == null) {
            return null;
        }

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("allResultNum", solrDocumentList.getNumFound());
        resultMap.put("pageNum", (solrDocumentList.getNumFound() - 1) / pageSize + 1);

        List<CarInfo> result = new ArrayList<>();
        for (SolrDocument i: solrDocumentList) {
            String name = (String) i.getFieldValue("name");
            String brand = (String) i.getFieldValue("brand");
            String picture = (String) i.getFieldValue("picture");
            Double minDealPrice = (Double) i.getFieldValue("min_price");
            Double maxDealPrice = (Double) i.getFieldValue("max_price");
            String dongUrl = (String) i.getFieldValue("dong_url");
            String jiaUrl = (String) i.getFieldValue("jia_url");
            Double dongScore = (Double) i.getFieldValue("dong_score");
            Double jiaScore = (Double) i.getFieldValue("jia_score");
            String size = (String)  i.getFieldValue("size");
            String type = (String) i.getFieldValue("category");
            String engine = (String) i.getFieldValue("engine");
            String gearbox = (String) i.getFieldValue("gearbox");
            CarInfo info = new CarInfo(name, brand, picture, minDealPrice, maxDealPrice, dongUrl, jiaUrl,
                    dongScore, jiaScore, size, type, engine, gearbox);
            result.add(info);
        }
        resultMap.put("result", result);

        return resultMap;
    }

    @Override
    public Map<String, Object> selectStatistics(Map<String, String> queryMap) {
        return null;
    }
}
