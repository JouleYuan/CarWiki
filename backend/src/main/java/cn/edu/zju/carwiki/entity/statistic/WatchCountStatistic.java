package cn.edu.zju.carwiki.entity.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author jouleyuan
 * @date 2021/7/11 13:49
 */
@Data
@AllArgsConstructor
public class WatchCountStatistic {
    /** The lower bound of the watch count interval */
    private Integer floor;

    /** The higher bound of the watch count interval */
    private Integer ceiling;

    /** The number of news whose watch counts are in the watch count interval */
    private Long num;
}
