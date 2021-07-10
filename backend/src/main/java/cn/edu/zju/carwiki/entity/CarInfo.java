package cn.edu.zju.carwiki.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author jouleyuan
 * @date 2021/7/10 17:45
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarInfo {
    /** The name of the car */
    private String name;

    /** The brand of the car */
    private String brand;

    /** The picture of the car */
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

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;

        if (obj == null) return false;

        if (getClass() != obj.getClass()) return false;

        CarInfo other = (CarInfo) obj;
        return name.equals(other.getName());
    }
}
