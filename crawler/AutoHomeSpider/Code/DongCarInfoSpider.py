import requests
from bs4 import BeautifulSoup
import json
import time

headers = {
    'authority': 'www.dongchedi.com',
    'cache-control': 'max-age=0',
    'sec-ch-ua': '^\\^',
    'sec-ch-ua-mobile': '?0',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'referer': 'https://www.dongchedi.com/auto/library/x-2-x-x-x-x-x-x-x-x-x?key=brand&param=1&text=^%^E5^%^A4^%^A7^%^E4^%^BC^%^97&more=hot',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cookie': 'tt_web_version=new; is_dev=false; is_boe=false; ttwid=1^%^7CH7izT7C83MmBz02ylp64t_JfVE3P5iunUe3ezOc1KJg^%^7C1625881078^%^7Cf35f5dc89c7ab1f15f81898cf471bf056de6bb98f5898fc59e6e2a926790d4b4; UM_distinctid=17a8e10796194e-0b39de5dbfcbfe-6373264-144000-17a8e107962a5c; MONITOR_WEB_ID=5859250e-fb7a-4ab5-9199-14f83a9e82e9; _ga=GA1.2.852160009.1625881082; city_name=^%^E6^%^9D^%^AD^%^E5^%^B7^%^9E; tt_webid=6984217332085343781; Hm_lvt_3e79ab9e4da287b5752d8048743b95e6=1625881080,1626139820; _gid=GA1.2.1915709647.1626139821; CNZZDATA1278124308=1943857016-1625881029-https^%^253A^%^252F^%^252Fwww.baidu.com^%^252F^%^7C1626141173; _gat_gtag_UA_138671306_1=1; Hm_lpvt_3e79ab9e4da287b5752d8048743b95e6=1626142753',
}
count = 1
for i in range(1, 5001):
    response = requests.get('https://www.dongchedi.com/auto/series/{}'.format(i), headers=headers)
    soup = BeautifulSoup(response.content.decode(), 'html5lib')
    oneCar = {}
    try:
        # print(soup)
        try:
            t = soup.find(attrs='jsx-4088074752 agent-price').text
        except:
            print('第{}条信息无效，已跳转下一条'.format(i))
            continue
        try:
            score = soup.find(attrs='jsx-2295654074 score').text
        except:
            score = 0
        oneCar['name'] = soup.find(attrs='jsx-4088074752 name-wrap').img['alt']
        oneCar['picture'] = \
        json.loads(soup.find('script', {'id': '__NEXT_DATA__'}).get_text()).get("props").get('pageProps').get(
            'seriesColorList')[0]['pic_list'][0]['pics'][0]
        oneCar['dong_score'] = score
        oneCar['dong_url'] = 'https://www.dongchedi.com/auto/series/{}'.format(i)
        count += 1
    except:
        print('第{}条信息无效，已跳转下一条'.format(i))
    else:
        with open('car_info.txt', 'at') as FD:
            FD.write('{}\n'.format(oneCar))
        print(count,'/',i,oneCar)
        time.sleep(1)

