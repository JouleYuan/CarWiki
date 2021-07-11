package cn.edu.zju.carwiki.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author jouleyuan
 * @date 2021/7/10 17:45
 */
@Data
@AllArgsConstructor
public class CarInfo {
    /** The name of the car */
    private String name;

    /** The brand of the car */
    private String brand;

    /** The picture url of the car */
    private String picture;

    /** The lowest price given by the automaker */
    private Double min_price;

    /** The highest price given by the automaker */
    private Double max_price;

    /** The url link of this car on DongCheDi */
    private String dong_url;

    /** The url link of this car on QiCheZhiJia */
    private String jia_url;

    /** The score of this car on DongCheDi */
    private Double dong_score;

    /** The score of this car on QiCheZhiJia */
    private Double jia_score;

    /** The size type of the car */
    private String size;

    /** The category of the car */
    private String type;

    /** The engine of the car */
    private String engine;

    /** The gearbox of the car */
    private String gearbox;
}
