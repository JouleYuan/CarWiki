import csv
original=[]
with open("car_news.csv", "r", encoding='utf-8') as f:
    original = f.readlines()
    for i in range(len(original)):
        original[i]=original[i].split(',')
for i in range(1,len(original)):
    if(original[i][0]=="article"):
        original[i][0]="文字"
    else:
        original[i][0]="视频"
    original[i][-1]=original[i][-1].strip("\n")
    with open("DongNews.csv", "a", encoding='utf-8',newline="") as f:
        cw = csv.writer(f)
        #print(original[i])
        cw.writerow(original[i])