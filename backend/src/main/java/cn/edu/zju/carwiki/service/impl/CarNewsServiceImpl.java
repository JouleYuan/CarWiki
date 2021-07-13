package cn.edu.zju.carwiki.service.impl;

import cn.edu.zju.carwiki.entity.object.CarNews;
import cn.edu.zju.carwiki.entity.statistic.WatchCountStatistic;
import cn.edu.zju.carwiki.service.CarNewsService;
import cn.edu.zju.carwiki.solr.SolrJClient;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author jouleyuan
 * @date 2021/7/11 11:02
 */
@Service(value = "CarNewsService")
public class CarNewsServiceImpl implements CarNewsService {
    static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    static final int[] watchCountBounds = new int[] {0, 100, 1000, 10000, 100000, 1000000};

    @Autowired
    private SolrJClient solrJClient;

    @Override
    public Map<String, Object> selectObjects(Map<String, String> queryMap, int pageSize) {
        SolrDocumentList solrDocumentList = solrJClient.query(queryMap, "carnews");

        if (solrDocumentList == null) {
            return null;
        }

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("allResultNum", solrDocumentList.getNumFound());
        resultMap.put("pageNum", (solrDocumentList.getNumFound() - 1) / pageSize + 1);

        List<CarNews> result = new ArrayList<>();
        for (SolrDocument i: solrDocumentList) {
            String title = (String) i.getFieldValue("title");
            String picture = (String) i.getFieldValue("picture");
            String author = (String) i.getFieldValue("author");
            String authorPicture = (String) i.getFieldValue("author_picture");
            String url = (String) i.getFieldValue("url");
            String time = sdf.format((Date) i.getFieldValue("time"));
            Long watchCount = (Long) i.getFieldValue("watch_count");
            String source = (String) i.getFieldValue("source");
            String category = (String) i.getFieldValue("category");
            CarNews carNews = new CarNews(title, picture, author, authorPicture, url, time, watchCount, source, category);
            result.add(carNews);
        }
        resultMap.put("result", result);

        return resultMap;
    }

    @Override
    public List<WatchCountStatistic> selectWatchCountStatistics(Map<String, String> queryMap, String preFq) {
        List<WatchCountStatistic> watchCountStatistics = new ArrayList<>();

        for(int i = 1; i <= watchCountBounds.length; i++) {
            StringBuilder fq = new StringBuilder(preFq);
            if(fq.length() != 0) fq.append(" AND ");

            fq.append("watch_count").append(":[").append(watchCountBounds[i - 1]).append(" TO ");
            if(i == watchCountBounds.length) fq.append("*}");
            else fq.append(watchCountBounds[i]).append("}");
            queryMap.put("fq", fq.toString());

            SolrDocumentList solrDocumentList = solrJClient.query(queryMap, "carnews");
            if(solrDocumentList == null) return null;
            if(i == watchCountBounds.length) watchCountStatistics.add(new WatchCountStatistic(watchCountBounds[i - 1], null, solrDocumentList.getNumFound()));
            else watchCountStatistics.add(new WatchCountStatistic(watchCountBounds[i - 1], watchCountBounds[i], solrDocumentList.getNumFound()));
        }

        return watchCountStatistics;
    }
}
