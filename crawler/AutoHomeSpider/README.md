# Autohome-spider
汽车之家爬虫
主要实现了爬取汽车之家车辆信息https://car.autohome.com.cn
以及汽车之家资讯https://www.autohome.com.cn/all/

### CarInfo.csv & news.csv
项目输出部分,按照约定的前后端交互内容输出
> 注意: 爬虫代码本身会将结果输出在代码同目录下，根目录中放的csv是作为备份数据用

### CarUrlSpider.py
从https://car.autohome.com.cn/AsLeftMenu/As_LeftListNew.ashx?typeId=1%20&brandId=36%20&fctId=152%20&seriesId=0
这个界面得到要爬取的所有厂商url和名字分别存到car_url和car_url_name中

### CarInfoSpider.py
主爬虫，从上面得到的厂商里面把所有状态的车型信息全部爬取下来

### NewsSpider.py
主爬虫，爬取汽车资讯简介以及资讯详情界面中的概况信息。


