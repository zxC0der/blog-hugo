---
permalink: atcoder-abc-194
tags: 
  - 暴力
  - 预处理
  - 前缀和
  - 思维
  - 概率dp
  - 期望dp
  - TODO
math: true
category: 题解
title: AtCoder-ABC-194(A-F)
date: 2021-03-17 11:17:20 +0800
---

## A

略

## B

N个员工，每个员工做A，B两种工作的时间都不同，如果让一个员工做A和B，花费时间就是两者之和，如果让两个员工做，花费时间就是两者最大值，问所花费最小时间。

N为1000，直接暴力枚举。

## C

求$\displaystyle \sum_{i = 2}^{N} \sum_{j = 1}^{i - 1} (A_i - A_j)^2$。

展开一下，预处理前缀和和平方前缀和即可。

## D

有N个点，一开始在点1，每次等概率随机选择一个点(包括所在的点)，将这两点连边并走到该点，问使得图连通的操作次数。

有个很重要的思路，走的顺序是不重要的，**重要的只有一点，就是走过了(连通)了多少个点**。就比如从1走到2，再从2走到1，和在2一直原地踏步是一样的，所以将图抽象为一条线段，比如3个点`1---2---3`，先算从1走到2的期望，这里的2并不仅仅指图上的点2，只是代表第二个走过的点，所以这里有三种可能性，原地踏步1种，另外2种可能性都可以走到第二个点，所以从1走到2的期望是3/2，同理再算从2走到3的期望是3/1，因此可以总结得到规律，答案为$\sum_{i-1}^{n-1}\frac{n}{i}$。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=1e5+50;
int n;
int main(){
    scanf("%d",&n);
    double ans=0.0;
    for(int i=1;i<n;i++){
        ans+=n*1.0/i;
    }
    printf("%.8lf\n",ans);
    return 0;
}
```

TODO 概率/期望dp的做法

## E

给定长度为N的数组，对于每个长度为M的子数组，求出Mex，然后再求出所有Mex的最小值。

最简单的做法就是滑窗维护mex，但有个重要的问题，**只需要考虑删除数字之后mex的变化，而不用考虑添加数字之后mex的变化**，因为要求的是最小mex，而添加数字只会让mex变大。

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N=2e6+50;
int n,m;
int a[N],b[N];
int mex;
void add(int i){
    b[a[i]]++;
}
void del(int i){
    b[a[i]]--;
    if(b[a[i]]==0 && a[i]<mex){
        mex=a[i];
    }
}
int main(){
    scanf("%d%d",&n,&m);
    for(int i=1;i<=n;i++){
        scanf("%d",&a[i]);
    }
    for(int i=1;i<=m;i++){
        add(i);
    }
    for(int i=0;i<=n;i++){
        if(b[i]==0){
            mex=i;
            break;
        }
    }
    for(int i=m+1;i<=n;i++){
        add(i);
        del(i-m);
    }
    printf("%d\n",mex);
    return 0;
}
```

## F

求出1到N(不含前导零的16进制数)中多少个数字正好含有K的不同的数字(包括A-F)。

看起来像数位dp


TODO
