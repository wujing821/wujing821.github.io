/*TMODJS:{"version":7,"md5":"d56bf1b9dec879768915d8df1ec95e45"}*/
template('resume','<!doctype html> <html> <head> <meta charset="utf-8"> <title>无标题文档</title> <link rel="stylesheet" type="text/css" href="css/style.css" /> <link rel="stylesheet" type="text/css" href="css/different.css" /> </head> <body id="black"> <section id="resume_content"></section> <script src="./build/template.js"></script>  <script src="./data/userInfo.js"></script>  <script src="./data/timeAxis.js"></script>  <script src="./data/project.js"></script> <script src="./src/halo.js"></script> <script> //通过某个连接符把数组转化为字符串 template.helper("arrayJoin",function (data,format){ return data.join(format); }); //通过这个方法决定是否要添加class template.helper("isAddClass",function (data,bl){ return bl ? data : ""; }); var datas = { userInfo:userInfo, timeAxis:timeAxisArr, projects:projects } var html = template(\'init\', datas); document.getElementById(\'resume_content\').innerHTML = html; var skills_canval_circle = document.getElementsByClassName("skills_canval_circle")[0]; var data = { W:590, data:[ [\'PhotoShop\',0.722], [\'Canvas\',0.65], [\'CSS3\',0.44], [\'React\',0.86], [\'Node.js\',0.55], [\'backbone\',0.4], [\'ES6\',0.47], [\'JavaScript\',0.80], [\'other\',1] ] }; var halo = H5_Component_Halo(data); setTimeout(function (){ //skills_canval_circle.appendChild(halo); },500) </script> </body> </html>');