Thoughtworks defines a team’s responsibilities for CI as:
* Check in frequently
* Don’t check in broken code
* Don’t check in untested code
* Don’t check in when the build is broken

﻿⁠⁠⁠**Rule # 1 - Check in frequently﻿⁠⁠⁠**  
For a given work day 8-6, teams will be awarded points for the number of successful builds.     
No builds = 0 pts  
1-3 builds = 1 pt  
3-7 builds = 2 pts  
7+ builds = 3pts

**﻿⁠⁠⁠Rule # 2 – Don’t check in broken code﻿⁠⁠⁠**  
Broken build results in -2 points.  
A check will be made at the end of the work day 8-6, if the build was green for:  
10 hours = 3 pts  
8 hours = 2 pts  
6 hours = 1 pt  
< 6 hours = 0 points

﻿⁠⁠⁠**Rule # 3 – Don’t check in untested code﻿⁠⁠⁠**  
Get code coverage stats for your build. If code coverage has dropped (method to be determined by Alasdair) results in -2 points .

﻿⁠⁠⁠**Rule # 4 – Don’t check in broken code﻿⁠⁠⁠**  
-2 points for each concurrently broken build. For example, if there are two broken builds in a row -2, if there are three in a row -4, four in a row -6.
