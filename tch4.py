#!/usr/bin/env python3

filepath = 'input.txt'
with open(filepath) as fp:
    line = fp.readline()
    cnt = 0
    while line:
        if cnt == 0:
            line = fp.readline()
        else:
            number = int(line.strip())
            if (number == 59):
                print('Case #{}: IMPOSSIBLE'.format(cnt))
            elif (number >= 30 and number < 40):
                print('Case #{}: IMPOSSIBLE'.format(cnt))
            elif (number < 20):
                print('Case #{}: IMPOSSIBLE'.format(cnt))
            else:
                print('Case #{}: {}'.format(cnt, number // 20))
            line = fp.readline()
        cnt += 1
