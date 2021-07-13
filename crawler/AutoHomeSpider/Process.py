import csv
original=[]
with open("car_news.csv", "r", encoding='utf-8') as f:
    original = f.readlines()
for i in range(len(original)):
    newstr=""
    if(original[i][:original[i].find(",")]=="article"):
        newstr=original[i].replace("article","文字",1)
    else:
        newstr=original[i].replace("video","视频",1)
    with open('DongNews1.csv', 'a',encoding='utf-8') as FD:
        FD.write('{}'.format(newstr))