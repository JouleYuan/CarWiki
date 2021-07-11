package cn.edu.zju.carwiki.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author jouleyuan
 * @date 2021/7/11 0:11
 */
@Data
@AllArgsConstructor
public class ScoreStatistic {
    /** The lower bound of the score interval */
    private Double floor;

    /** The higher bound of the score interval */
    private Double ceiling;

    /** The number of cars whose scores on DongCheDi are in the score interval */
    private Long dong_num;

    /** The number of cars whose scores on QiCheZhiJia are in the score interval */
    private Long jia_num;
}
