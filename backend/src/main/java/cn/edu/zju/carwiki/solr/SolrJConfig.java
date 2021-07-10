package cn.edu.zju.carwiki.solr;

import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author jouleyuan
 * @date 2021/7/10 16:00
 */
@Configuration
public class SolrJConfig {
    @Value("${solrj.url}")
    private String solrUrl;

    @Bean(name = "solrj.pool")
    public HttpSolrClient solrJPool() {
        return new HttpSolrClient.Builder(solrUrl)
                .withConnectionTimeout(10000)
                .withSocketTimeout(60000)
                .build();
    }
}
