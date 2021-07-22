# 这是一个简单的将汽车之家CarInfo.csv和懂车帝车辆信息car_info.txt整合的脚本
import csv
original=[]
dong=[]
with open("CarInfo.csv", "r", encoding='utf-8') as f:
    original = f.readlines()
    for i in range(len(original)):
        original[i]=original[i].split(',')
with open("car_info.txt","r", encoding='gbk') as f:
    dong=f.readlines()
    for i in range(len(dong)):
        dong[i]=eval(dong[i])
with open("CarInfoMerged.csv", "w+", encoding='utf-8',newline="") as f:
    cw = csv.writer(f)
    print(original[0])
    cw.writerow(original[0])
for i in range(1,len(original)):
    name=original[i][0]
    #print(name)
    for item in dong:
        if(item['name']==name):
            original[i][2]=item['picture']
            original[i][5]=item['dong_url']
            original[i][7]=item['dong_score']
        original[i][-1]=original[i][-1].strip("\n")
    with open("CarInfoMerged.csv", "a", encoding='utf-8',newline="") as f:
        cw = csv.writer(f)
        print(original[i])
        cw.writerow(original[i])

    
        
#print(original[1],original[10])
