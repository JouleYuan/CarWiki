package cn.edu.zju.carwiki.entity.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author jouleyuan
 * @date 2021/7/11 0:10
 */
@Data
@AllArgsConstructor
public class PriceStatistic{
    /** The lower bound of the price interval */
    private Double floor;

    /** The higher bound of the price interval */
    private Double ceiling;

    /** The number of cars whose prices are in the price interval */
    private Long num;
}
