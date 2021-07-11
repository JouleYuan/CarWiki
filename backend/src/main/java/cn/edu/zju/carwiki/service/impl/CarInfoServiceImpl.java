package cn.edu.zju.carwiki.service.impl;

import cn.edu.zju.carwiki.entity.CarInfo;
import cn.edu.zju.carwiki.entity.PriceStatistic;
import cn.edu.zju.carwiki.entity.ScoreStatistic;
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
    static final double[] priceBounds = new double[] {0, 10, 25, 50, 100};
    static final double[] scoreBounds = new double[] {0, 1, 2, 3, 4, 5};

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
    public List<PriceStatistic> selectPriceStatistics(Map<String, String> queryMap, String preFq) {
        List<PriceStatistic> priceStatistics = new ArrayList<>();

        for(int i = 1; i <= priceBounds.length; i++) {
            StringBuilder fq = new StringBuilder(preFq);
            if(fq.length() != 0) fq.append(" AND ");

            if(i == priceBounds.length) fq.append("max_price:[").append(priceBounds[i - 1]).append(" TO *}");
            else fq.append("min_price:{* TO ").append(priceBounds[i]).append("}")
                        .append(" AND max_price:[").append(priceBounds[i - 1]).append(" TO *}");
            queryMap.put("fq", fq.toString());

            SolrDocumentList solrDocumentList = solrJClient.query(queryMap, "carinfo");
            if(solrDocumentList == null) return null;

            if(i == priceBounds.length) priceStatistics.add(new PriceStatistic(priceBounds[i - 1], null, solrDocumentList.getNumFound()));
            else priceStatistics.add(new PriceStatistic(priceBounds[i - 1], priceBounds[i], solrDocumentList.getNumFound()));
        }

        return priceStatistics;
    }

    @Override
    public List<ScoreStatistic> selectScoreStatistics(Map<String, String> queryMap, String preFq) {
        List<ScoreStatistic> scoreStatistics = new ArrayList<>();

        for(int i = 1; i < scoreBounds.length; i++) {
            Long dong_score = selectScoreStatistic(queryMap, preFq, "dong_score", i);
            Long jia_score = selectScoreStatistic(queryMap, preFq, "jia_score", i);
            if(dong_score == null || jia_score == null) return null;
            scoreStatistics.add(new ScoreStatistic(scoreBounds[i - 1], scoreBounds[i], dong_score, jia_score));
        }

        return scoreStatistics;
    }

    private Long selectScoreStatistic(Map<String, String> queryMap, String preFq, String field, int i) {
        StringBuilder fq = new StringBuilder(preFq);
        if(fq.length() != 0) fq.append(" AND ");

        fq.append(field).append(":[").append(scoreBounds[i - 1]).append(" TO ").append(scoreBounds[i]);
        if(i == scoreBounds.length - 1) fq.append("]");
        else fq.append("}");
        queryMap.put("fq", fq.toString());

        SolrDocumentList solrDocumentList = solrJClient.query(queryMap, "carinfo");
        if(solrDocumentList == null) return null;

        return solrDocumentList.getNumFound();
    }
}
