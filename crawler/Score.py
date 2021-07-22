import csv
import random
original=[]
dong=[]
with open("CarInfoMerged.csv", "r", encoding='utf-8') as f:
    original = f.readlines()
    for i in range(len(original)):
        original[i]=original[i].strip('\n')
        original[i]=original[i].split(',')
for i in range(6):
    original[0].append("score"+str(i))
with open("CarInfoFaked.csv", "a", encoding='utf-8',newline="") as f:
    cw = csv.writer(f)
    cw.writerow(original[0])
print(original[0])
for i in range(1,len(original)):
    t=original[i]
    x=original[i][7]
    y=original[i][8]
    if(x==""):
        x=0
    if(y==""):
        y=0
    x=float(x)
    y=float(y)
    if(x==0):
        t[7]="" 
        x=3.8
    if(y==0):
        t[8]=""
        y=4.1
        
    
    for i in range(6):
        seed = random.random()
        s= x*seed+(1-seed)*y
        #score.append(s)
        t.append("{:.2f}".format(s))
    with open("CarInfoFaked.csv", "a", encoding='utf-8',newline="") as f:
        cw = csv.writer(f)
        #print(original[i])
        print(t[7],t[8])
        cw.writerow(t)
