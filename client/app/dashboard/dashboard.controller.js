(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardCtrl', ['$scope','RestangularService', DashboardCtrl])

    function DashboardCtrl($scope,RestangularService) {
        $scope.data={};
        $scope.filterNewsDateCount=filterNewsDateCount;//每日新闻发布数量
        $scope.filterGroupTypeCount=filterGroupTypeCount;//任务类型数量
        $scope.filterGroupStatusCount=filterGroupStatusCount;//任务状态数量
        // success: #8BC34A 139,195,74
        // info: #00BCD4 0,188,212
        // gray: #EDF0F1 237,240,241

        // Traffic chart
        $scope.combo = {};
        $scope.combo.options = {
            legend: {
                show: true,
                x: 'right',
                y: 'top',
                data: ['WOM', 'Viral', 'Paid']
            },
            grid: {
                x: 40,
                y: 60,
                x2: 40,
                y2: 30,
                borderWidth: 0
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            },
            xAxis: [
                {
                    type : 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#607685'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    },
                    data : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
                }
            ],
            yAxis: [
                {
                    type : 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#607685'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    }
                }
            ],
            series: [
                {
                    name:'WOM',
                    type:'bar',
                    clickable: false,
                    itemStyle: {
                        normal: {
                            color: $scope.color.gray
                        },
                        emphasis: {
                            color: 'rgba(237,240,241,.7)'
                        }
                    },
                    barCategoryGap: '50%',
                    data:[75,62,45,60,73,50,31,56,70,63,49,72,76,67,46,51,69,59,85,67,56],
                    legendHoverLink: false,
                    z: 2
                },
                {
                    name:'Viral',
                    type:'line',
                    smooth:true,
                    itemStyle: {
                        normal: {
                            color: $scope.color.success,
                            areaStyle: {
                                color: 'rgba(139,195,74,.7)',
                                type: 'default'
                            }
                        }
                    },
                    data:[0,0,0,5,20,15,30,28,25,40,60,40,43,32,36,23,12,15,2,0,0],
                    symbol: 'none',
                    legendHoverLink: false,
                    z: 3
                },
                {
                    name:'Paid',
                    type:'line',
                    smooth:true,
                    itemStyle: {
                        normal: {
                            color: $scope.color.info,
                            areaStyle: {
                                color: 'rgba(0,188,212,.7)',
                                type: 'default'
                            }
                        }
                    },
                    data:[0,0,0,0,1,6,15,8,16,9,25,12,50,20,25,12,2,1,0,0,0],
                    symbol: 'none',
                    legendHoverLink: false,
                    z: 4
                }
            ]
        };


        //
        $scope.smline1 = {};
        $scope.smline2 = {};
        $scope.smline3 = {};
        $scope.smline4 = {};
        $scope.smline1.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            },
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 11, 15, 13, 12, 13, 10],
                    itemStyle: {
                        normal: {
                            color: $scope.color.info
                        }
                    }
                }
            ]
        };
        $scope.smline2.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            },
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 10, 14, 12, 13, 11, 12],
                    itemStyle: {
                        normal: {
                            color: $scope.color.success
                        }
                    }
                }
            ]
        };
        $scope.smline3.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            },
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 10, 15, 13, 12, 13, 10],
                    itemStyle: {
                        normal: {
                            color: $scope.color.danger
                        }
                    }
                }
            ]
        };
        $scope.smline4.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            },
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 12, 8, 10, 15, 12, 10],
                    itemStyle: {
                        normal: {
                            color: $scope.color.warning
                        }
                    }
                }
            ]
        };

        init();

        function init(){
            groupTypeCount();
            groupStatusCount ();
            newsDateCount();
        }

        function initEchart(){
            $scope.barEchart = {
                title : {
                    text: '处理数据',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'半径模式',
                        type:'pie',
                        radius : [20, 110],
                        center : ['50%', '50%'],
                        roseType : 'radius',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        lableLine: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:[
                            {value:10, name:'rose1'},
                            {value:5, name:'rose2'},
                            {value:15, name:'rose3'},
                            {value:25, name:'rose4'},
                            {value:20, name:'rose5'},
                            {value:35, name:'rose6'},
                            {value:30, name:'rose7'},
                            {value:40, name:'rose8'}
                        ]
                    }
                ]
            };

        }

        function groupTypeCount(){
            // [ [ "投诉", 1 ], [ "随手拍", 3 ] ]
            RestangularService.all('api/readily-jobs/groupTypeCount').customGET().then(function(res){
                if(res.status==200){
                    $scope.data.groupTypeCount=res.data;
                }
            })
        }

        function groupStatusCount(){
            // [ [ null, 1 ], [ "已下发", 2 ], [ "已评价", 1 ] ]
            RestangularService.all('api/readily-jobs/groupStatusCount ').customGET().then(function(res){
                if(res.status==200){
                    initEchart();

                    $scope.data.groupStatusCount=res.data;
                    $scope.barEchart.legend.data=filterGroupStatusCount($scope.data.groupStatusCount);
                    var xAxisData=[];
                    $scope.data.groupStatusCount.forEach(function(val){
                        if(val[0]==null){
                            xAxisData.push({name:'未处理',value:val[1]});
                        }else{
                            xAxisData.push({name:val[0],value:val[1]});
                        }
                    })
                    $scope.barEchart.series[0].data=xAxisData;
                    console.log($scope.barEchart.series[0].data);
                }
            })
        }

        function newsDateCount(){
          // [
          //     [ "2017-06-01", 4 ],
          //     [ "2017-06-10", 18 ],
          //     [ "2017-07-24", 3 ],
          //     [ "2017-08-16", 3 ],
          //     [ "2017-08-23", 2 ],
          //     [ "2017-08-28", 1 ]
          // ]
            RestangularService.all('api/news-date-count').customGET().then(function(res){
                if(res.status==200){
                    $scope.data.newsDateCount=res.data;
                }
            })
        }

        function filterGroupTypeCount(data){

        }

        function filterGroupStatusCount(data){
            var newArr=[];
            data.forEach(function(val){
                if(val[0]==null){
                    newArr.push('未处理');
                }else{
                    newArr.push(val[0]);
                }
            })
            return newArr;
        }

        function filterNewsDateCount(data){
            if(data){
                return data.reduce(function(initNum,val){
                    return initNum+val[1];
                },0);
            }

        }



        // Engagment pie charts
        var labelTop = {
            normal : {
                color: $scope.color.primary,
                label : {
                    show : true,
                    position : 'center',
                    formatter : '{b}',
                    textStyle: {
                        color: '#999',
                        baseline : 'top',
                        fontSize: 12
                    }
                },
                labelLine : {
                    show : false
                }
            }
        };
        var labelFromatter = {
            normal : {
                label : {
                    formatter : function (params){
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        color: $scope.color.text,
                        baseline : 'bottom',
                        fontSize: 20
                    }
                }
            },
        }
        var labelBottom = {
            normal : {
                color: '#f1f1f1',
                label : {
                    show : true,
                    position : 'center'
                },
                labelLine : {
                    show : false
                }
            }
        };
        var radius = [55, 60];
        $scope.pie = {};
        $scope.pie.options = {
            series : [
                {
                    type : 'pie',
                    center : ['12.5%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'Bounce', value:36, itemStyle : labelTop},
                        {name:'other', value:64, itemStyle : labelBottom}
                    ]
                },{
                    type : 'pie',
                    center : ['37.5%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'Activation', value:45, itemStyle : labelTop},
                        {name:'other', value:55, itemStyle : labelBottom}
                    ]
                },{
                    type : 'pie',
                    center : ['62.5%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'Retention', value:25, itemStyle : labelTop},
                        {name:'other', value:75, itemStyle : labelBottom}
                    ]
                },{
                    type : 'pie',
                    center : ['87.5%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'Referral', value:75, itemStyle : labelTop},
                        {name:'other', value:25, itemStyle : labelBottom}
                    ]
                }
            ]
        };
    }


})();
