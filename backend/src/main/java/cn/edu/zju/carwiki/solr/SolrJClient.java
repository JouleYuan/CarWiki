package cn.edu.zju.carwiki.solr;

import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.params.MapSolrParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/10 16:00
 */
@Component
public class SolrJClient {
    @Value("${solrj.url}")
    private String SOLR_URL;

    private final HttpSolrClient solrJPool;

    @Autowired
    public SolrJClient(HttpSolrClient solrJPool) {
        this.solrJPool = solrJPool;
    }

    public SolrDocumentList query(Map<String, String> queryParamMap, String coreName) {
        MapSolrParams queryParams = new MapSolrParams(queryParamMap);
        try {
            final QueryResponse response = solrJPool.query(coreName, queryParams);
            return response.getResults();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
