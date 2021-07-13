#coding==utf-8
import requests
from bs4 import BeautifulSoup
import os
import re
import json
import random
import time
import csv

def datetime_to_timestamp_in_milliseconds(d):
    def current_milli_time(): return int(round(time.time() * 1000))
    return current_milli_time()

def LoadUserAgents(uafile):#从user_agents.txt文件里面随机选择一个user_agent,防封
    uas = []
    with open(uafile, 'rb') as uaf:
        for ua in uaf.readlines():
            if ua:
                uas.append(ua.strip()[1:-1 - 1])
    random.shuffle(uas)
    return uas
uas = LoadUserAgents("user_agents.txt")
time1 = time.time()

def htmlparser(url):#解析网页的函数
    ua = random.choice(uas)
    user_agent = ua
    headers = {'User-agent': user_agent,
               'Referer': 'https://car.autohome.com.cn.html',}#加上header伪装成浏览器防止被封
    r = requests.get(url, headers=headers)#get请求
    r.raise_for_status()
    r.encoding = r.apparent_encoding
    content = r.text
    return content

def spider_detail(url):
    content = htmlparser(url)
    soup = BeautifulSoup(content, "html.parser")
    try:
        article_info = soup.find("div",class_="article-info")
        #print(article_info)
        author_name = article_info.find("a",class_="name").get_text()
        #print('作者:',author_name)
        author_pic = "http:"+article_info.find("a",class_="pic").find('img').attrs.get('src')
        #print('作者图片:',author_pic)
        
        publish_time = article_info.find("span",class_="time").get_text().strip()
        #时间格式2021-07-11T01:06:26Z
        publish_time=publish_time.replace("年","-")
        publish_time=publish_time.replace("月","-")
        publish_time=publish_time.replace("日","T")
        publish_time=publish_time.replace(" ","")
        publish_time=publish_time+":00Z"
        #print(publish_time)
    except Exception as e:
        print(e)
        author_name="刘浩存"
        author_pic="http://www3.autoimg.cn/newsdfs/g3/M00/A8/1F/autohomecar__ChcCRVsPdT-ASeRmAAAwvu0c7to811.jpg"
        publish_time="2021-07-11T01:06:26Z"


    #print('时间:',publish_time)  
    return author_pic,author_name,publish_time


urls =[]
def spider(url):
    content = htmlparser(url)
    print("[Info]Parsing Page: "+url)
    soup = BeautifulSoup(content, "html.parser")
    article_section = soup.find("div", id="auto-channel-lazyload-article")
    li_list=article_section.find_all('li')
    for item in li_list:
        a=item.find('a')#find_all 是列表
        try:#nonetype 没有 attrs,则需要加一个异常处理机制
            type_="文字"
            source = "汽车之家"
            news_url="http:"+a.attrs.get('href')
            title=a.find('h3').text
            news_pic="http:"+a.find('img').attrs.get('src')
            read_count = a.find_all("em")[0].get_text()
#cw.writerow(["type","title","author_name","author_pic","news_pic","news_url","read_count","publish_time", "source"])
            if("万" in read_count):
                read_count=read_count[:read_count.find("万")]
                read_count=str(int(float(read_count)*10000))
            print('链接:',news_url)
            print('标题:',title)
            print('图片地址:',news_pic)          
            print("人数:",read_count)
            author_pic,author_name,publish_time = spider_detail(news_url)
            print('作者:',author_name)
            print('作者图片:',author_pic)
            print('时间:',publish_time)            
            print('=========================================================')
            with open("News.csv", 'a',encoding="utf-8",newline="") as f2:
                cw = csv.writer(f2)
                cw.writerow([type_,title,author_name,author_pic,news_pic,news_url,read_count,publish_time, source])
        except Exception as e:
            print(e)
def run():
    global urls
    with open("News.csv", 'w+',encoding="utf-8",newline="") as f2:
        cw = csv.writer(f2)
        cw.writerow(["type","title","author_name","author_pic","news_pic","news_url","read_count","publish_time", "source"])
    n = 1000
    for i in range(1,n):
        url = "https://www.autohome.com.cn/all/"+str(i)+"/#liststart"
        spider(url)
run()