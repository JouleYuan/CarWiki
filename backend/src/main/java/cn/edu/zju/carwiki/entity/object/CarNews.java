package cn.edu.zju.carwiki.entity.object;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

/**
 * @author jouleyuan
 * @date 2021/7/11 11:04
 */
@Data
@AllArgsConstructor
public class CarNews {
    /** The title of the news */
    String title;

    /** The picture url of the news */
    String picture;

    /** the author of the news */
    String author;

    /** the url link of the news */
    String url;

    /** The publishing time of the news */
    String time;

    /** The number of watches of the news */
    Long watch_count;

    /** The source platform of the news */
    String source;

    /** The category of the news */
    String category;
}
