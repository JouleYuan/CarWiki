package cn.edu.zju.carwiki.controller;

import cn.edu.zju.carwiki.entity.ResponseData;
import cn.edu.zju.carwiki.entity.statistic.WatchCountStatistic;
import cn.edu.zju.carwiki.service.CarNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author jouleyuan
 * @date 2021/7/11 11:26
 */
@RestController
@RequestMapping("/news")
public class CarNewsController {
    @Autowired
    private CarNewsService carNewsService;

    @GetMapping("/object")
    public ResponseData getObjects(@RequestParam("key") String key,
                                   @RequestParam("page_no") int pageNo,
                                   @RequestParam("page_size") int pageSize,
                                   @RequestParam(value = "sort", defaultValue = "primary") String sort,
                                   @RequestParam(value = "author", required = false) String author,
                                   @RequestParam(value = "category", required = false) String category,
                                   @RequestParam(value = "source", required = false) String source) {
        Map<String, String> queryMap = new HashMap<>();

        queryMap.put("q.op", "OR");
        queryMap.put("q", "title:\"" + key + "\"~4");
        queryMap.put("start", String.valueOf((pageNo - 1) * pageSize));
        queryMap.put("rows", String.valueOf(pageSize));

        if(sort.equals("watch_count_asc")) queryMap.put("sort", "watch_count asc");
        else if(sort.equals("watch_count_desc")) queryMap.put("sort", "watch_count desc");
        else if(!sort.equals("primary")) return ResponseData.badRequest("The param \"mode\" is invalid.");

        StringBuilder fq = new StringBuilder();
        if(author != null) fq.append("author:").append(author);
        if(category != null) {
            if(fq.length() != 0) fq.append(" AND ");
            fq.append("category:").append(category);
        }
        if(source != null) {
            if(fq.length() != 0) fq.append(" AND ");
            fq.append("source:").append(source);
        }
        queryMap.put("fq", fq.toString());

        Map<String, Object> resultMap = carNewsService.selectObjects(queryMap, pageSize);
        if(resultMap == null) return ResponseData.serverInternalError();
        else return ResponseData.ok(resultMap);
    }

    @GetMapping("/statistics")
    public ResponseData getStatistics(@RequestParam("key") String key,
                                      @RequestParam(value = "author", required = false) String author,
                                      @RequestParam(value = "category", required = false) String category,
                                      @RequestParam(value = "source", required = false) String source) {
        Map<String, String> queryMap = new HashMap<>();
        queryMap.put("q.op", "OR");
        queryMap.put("q", "title:\"" + key + "\"~4");
        queryMap.put("rows", "0");

        StringBuilder fq = new StringBuilder();
        if(author != null) fq.append("author:").append(author);
        if(category != null) {
            if(fq.length() != 0) fq.append(" AND ");
            fq.append("category:").append(category);
        }
        if(source != null) {
            if(fq.length() != 0) fq.append(" AND ");
            fq.append("source:").append(source);
        }

        List<WatchCountStatistic> watchCountStatistics = carNewsService.selectWatchCountStatistics(queryMap, fq.toString());
        if(watchCountStatistics == null) return null;

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("watch_count", watchCountStatistics);
        return ResponseData.ok(resultMap);
    }
}
