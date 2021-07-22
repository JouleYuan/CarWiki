import requests
import csv
import time
import datetime

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
    'Referer': 'https://www.dongchedi.com/news',
    'Connection': 'keep-alive',
    'TE': 'Trailers',
}
# 写表格头
title = ['type', 'title', 'author_name', 'author_pic', 'news_pic', 'news_url', 'read_count', 'publish_time', 'source']
with open('car_news.csv', 'a+', encoding='utf-8', newline='') as file:
    csv_w = csv.writer(file)
    csv_w.writerow(title)
# 爬100页
for t in range(2, 200):
    params = {'count': '48', 'channel': 'news', 'page': str(t)}
    try:
        response = requests.get('https://www.dongchedi.com/motor/pc/content/get_static', headers=headers, params=params)
    except:
        print("爬取第{}页出现错误，已跳过该页".format(t))
        continue
    data = response.json()
    allNews = []
    # 存储结果的字典
    for i in range(48):
        oneNew = {}
        try:
            oneNew['type'] = 'article' if data['data']['news'][i]['has_video'] == False else 'video'  # 新闻类型，文章或视频
            oneNew['description'] = data['data']['news'][i]['title']  # 文章简介
            oneNew['author_name'] = data['data']['news'][i]['user_info']['name']  # 作者名称
            oneNew['author_pic'] = data['data']['news'][i]['user_info']['avatar_url']  # 作者头像图片
            if oneNew['type'] == 'article':
                if not data['data']['news'][i]['image_list']:
                    oneNew['news_pic'] = 'null'  # 暂无图片，之后选择照片填充
                else:
                    oneNew['news_pic'] = data['data']['news'][i]['image_list'][0]['image_url']  # 文章图片
                oneNew['news_url'] = 'https://www.dongchedi.com/article/{}?zt=news'.format(
                    data['data']['news'][i]['unique_id_str'])  # 文章链接
                oneNew['read_count'] = data['data']['news'][i]['watch_or_read_count']
            else:
                oneNew['news_pic'] = data['data']['news'][i]['video_info']['cover_url']  # 视频图片
                oneNew['news_url'] = 'https://www.dongchedi.com/video/{}?zt=news'.format(
                    data['data']['news'][i]['unique_id_str'])  # 视频链接
                oneNew['read_count'] = data['data']['news'][i]['video_info']['video_watch_count']
            timeStamp = int(data['data']['news'][i]['publish_time'])
            dateArray = datetime.datetime.utcfromtimestamp(timeStamp)
            otherStyleTime = dateArray.strftime("%Y-%m-%dT%H:%M:%SZ")
            oneNew['publish_time'] = otherStyleTime
            oneNew['source'] = '懂车帝'
            allNews.append(oneNew)
        except:
            print('读取第{}页第{}条新闻出错，已跳过该条新闻'.format(t, i))
    for item in allNews:
        s = [v for v in item.values()]
        with open('car_news.csv', 'a+', encoding='utf-8', newline='') as file:
            csv_w = csv.writer(file)
            csv_w.writerow(s)
        print('成功写入第{}页一条数据'.format(t))
    print('第{}页数据已写完'.format(t))
    # 休眠10秒
    print('休眠2秒')
    time.sleep(2)
