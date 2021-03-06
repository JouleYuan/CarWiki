package cn.edu.zju.carwiki.controller;

import cn.edu.zju.carwiki.entity.statistic.PriceStatistic;
import cn.edu.zju.carwiki.entity.ResponseData;
import cn.edu.zju.carwiki.entity.statistic.ScoreStatistic;
import cn.edu.zju.carwiki.service.CarInfoService;
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
 * @date 2021/7/10 16:04
 */
@RestController
@RequestMapping("/info")
public class CarInfoController {
    @Autowired
    private CarInfoService carInfoService;

    @GetMapping("/object")
    public ResponseData getObjects(@RequestParam(value = "key", required = false) String key,
                                   @RequestParam("page_no") int pageNo,
                                   @RequestParam("page_size") int pageSize,
                                   @RequestParam(value = "sort", defaultValue = "primary") String sort,
                                   @RequestParam(value = "category", required = false) String category,
                                   @RequestParam(value = "size", required = false) String size) {
        Map<String, String> queryMap = new HashMap<>();

        queryMap.put("q.op", "OR");
        if(key == null) queryMap.put("q", "*");
        else queryMap.put("q", "brand:\"" + key + "\"~4" + " name:\"" + key + "\"~4");
        queryMap.put("start", String.valueOf((pageNo - 1) * pageSize));
        queryMap.put("rows", String.valueOf(pageSize));

        if(sort.equals("price_asc")) queryMap.put("sort", "min_price asc");
        else if(sort.equals("price_desc")) queryMap.put("sort", "min_price desc");
        else if(sort.equals("score_asc")) queryMap.put("sort", "sum(dong_score, jia_score) asc");
        else if(sort.equals("score_desc")) queryMap.put("sort", "sum(dong_score, jia_score) desc");
        else if(!sort.equals("primary")) return ResponseData.badRequest("The param \"mode\" is invalid.");

        StringBuilder fq = new StringBuilder();
        if(category != null) fq.append("category:").append(category);
        if(size != null) {
            if(fq.length() != 0) fq.append(" AND ");
            fq.append("size:").append(size);
        }
        queryMap.put("fq", fq.toString());

        Map<String, Object> resultMap = carInfoService.selectObjects(queryMap, pageSize);
        if(resultMap == null) return ResponseData.serverInternalError();
        else return ResponseData.ok(resultMap);
    }

    @RequestMapping("/statistics")
    public ResponseData getStatistics(@RequestParam(value = "key", required = false) String key,
                                      @RequestParam(value = "category", required = false) String category,
                                      @RequestParam(value = "size", required = false) String size) {
        Map<String, String> queryMap = new HashMap<>();
        queryMap.put("q.op", "OR");
        if(key == null) queryMap.put("q", "*");
        else queryMap.put("q", "brand:\"" + key + "\"~4" + " name:\"" + key + "\"~4");
        queryMap.put("rows", "0");

        StringBuilder fq = new StringBuilder();
        if(category != null) fq.append("category:").append(category);
        if(size != null) {
            if(fq.length() != 0) fq.append(" AND ");
            fq.append("size:").append(size);
        }

        List<PriceStatistic> priceStatistics = carInfoService.selectPriceStatistics(queryMap, fq.toString());
        List<ScoreStatistic> scoreStatistics = carInfoService.selectScoreStatistics(queryMap, fq.toString());

        if(priceStatistics == null || scoreStatistics == null) return ResponseData.serverInternalError();

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("price", priceStatistics);
        resultMap.put("score", scoreStatistics);
        return ResponseData.ok(resultMap);
    }
}
