/**
 * Created by Administrator on 2017/5/24 0024.
 */
(function () {
    'use strict';

    angular.module('app.data.service', [])
        .factory('GlobalData', [GlobalData])
    ;

    function GlobalData() {
        return {
            groups: [
                {
                    name: '',
                    pid: null,
                    users: [],
                }
            ],
            users:[
                {name:'李跃旗',group:'',level:'',tel:'',pos:'区委书记'},
                {name:'倪来娣',group:'',level:'',tel:'',pos:'五角场镇党委书记'},
                {name:'徐庆俊',group:'',level:'',tel:'',pos:'五角场镇镇长'},
                {name:'李正明',group:'',level:'',tel:'',pos:'五角场街道党工委书记'},
                {name:'秦刚',group:'',level:'',tel:'',pos:'五角场街道办事处主任'},
                {name:'陈捷',group:'',level:'',tel:'',pos:'长白新村党委工委书记'},
                {name:'潘炜',group:'',level:'',tel:'',pos:'长白新村街道办事处主任'},
                {name: "谢坚钢", pos: "区委副书记、区长"},
                {name: "何劲松", pos: "延吉新村党工委书记"},
                {name: "肖枫", pos: "延吉新村街道办事处主任"},
                {name: "陆志平",pos:"控江路党工委书记"},
                {name: "刘鹏", pos: "控江路街道办事处主任"},
                {name: "程国光",pos:"四平路党工委书记"},
                {name: "杜鹃",pos:"四平路街道办事处主任"},
                {name:"倪瑾",pos:"新江湾城街道党工委书记"},
                {name:"李铭",pos:"新江湾城街道办事处主任"},
                {name: "王莲青", pos: "定海路街道党工委书记"},
                {name: "吴岩", pos: "定海路街道办事处主任"},
                {name: "唐蛟", pos: "大桥街道党工委书记"},
                {name: "刘涛", pos: "大桥街道办事处主任"},
                {name: "叶靖", pos: "平凉路街道党工委书记"},
                {name: "潘俏敏", pos: "平凉路街道办事处主任"},
                {name: "孙革军", pos: "江浦路党工委书记"},
                {name: "章爱敏",pos:"江浦路街道办事处主任"},
                {name: "王祯", pos: "区委常委、副区长"}
            ],
            jobs: [
                {
                    "id":1,
                    "name": "平凉路渡口轻微污染",
                    "content": "平凉路渡口轻微污染,水上有漂浮物",
                    "status": "已上报",
                    "jobBack": "漂浮物已清理",
                    "origin":"市民",
                    "users": ["处理员1","处理员2"],
                    "river":'河道1',
                    "executes": [
                        {
                            "user": "处理员1",
                            "content": "问题已解决"
                        },
                        {
                            "user": "处理员2",
                            "content": "检查无问题"
                        }
                    ]
                },
                {
                    "id":2,
                    "name": "杨浦滨江段水有漂浮物",
                    "content": "杨浦滨江段水有漂浮物,水上有漂浮物",
                    "status": "正在处理",
                    "jobBack": "漂浮物已清理",
                    "users": ["处理员1","处理员2"],
                    "origin":"河长",
                    "river":'河道2',
                    "executes": [
                        {
                            "user": "处理员1",
                            "content": "问题已解决"
                        },
                        {
                            "user": "处理员2",
                            "content": "检查无问题"
                        }
                    ]
                },
                {
                    "id":3,
                    "name": "翔殷路段水里有漂浮物",
                    "content": "翔殷路段水里有漂浮物",
                    "status": "处理完成",
                    "jobBack": "漂浮物已清理",
                    "river":'河道3',
                    "origin":"市民",
                    "users": ["处理员1","处理员2"],
                    "executes": [
                        {
                            "user": "处理员1",
                            "content": "问题已解决"
                        },
                        {
                            "user": "处理员2",
                            "content": "检查无问题"
                        }
                    ]
                }
            ],
            rivers: [
                {
                    "riverName": "虬江",
                    "managementLevel": "市",
                    "length": "5.6",
                    "waterLevel": "2.5",
                    "maxWaterLevel": "4.44",
                    "minRiverWidth": "6",
                    "maxRiverWidth": "37",
                    "riverAcreage": "168274",
                    "startAddress": "国定路桥",
                    "endAddress": "界泓浜水闸",
                    "department": "部门",
                    "manager": "管理员",
                    "content": " 虬江亦称旧江，以其为松江故道，故名旧江。《同治上海县志》云：旧江即虬江，以其屈曲如虬故名。原来的吴淞江自西向东出海，与今日的黄浦江成十字形交叉，现今虬江在虹口、闸北均已填没，现市区仅剩本区一段。虬江曾是上海、宝山两县的分界线，故曾名界浜、界泓浜。",
                    "l1":{name:"李跃旗",pos:"区委书记"},
                    "l2":[
                        {name:"倪来娣",pos:"五角场镇党委书记"},
                        {name:"徐庆俊",pos:"五角场镇镇长"},
                        {name:"李正明",pos:"五角场街道党工委书记"},
                        {name:"秦刚",pos:"五角场街道办事处主任"},
                        {name:"陈捷",pos:"长白新村党委工委书记"},
                        {name:"潘炜",pos:"长白新村街道办事处主任"}
                    ]
                },
                {
                    "riverName": "东走马塘",
                    "managementLevel": "区",
                    "length": "4.75",
                    "waterLevel": "2.5",
                    "maxWaterLevel": "4.33",
                    "minRiverWidth": "21",
                    "maxRiverWidth": "39",
                    "riverAcreage": "119966",
                    "startAddress": "政修路",
                    "endAddress": "延吉东路",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "走马塘源自嘉定县封浜，蜿蜒东流，过沪宁铁路后折向东北，在江湾镇分南北两支，北支通往钱家浜入黄浦江，南支与虬江相连汇入黄浦江。相传南宋名将韩世忠屯兵江湾、大场一带，于塘岸走马往来，故称走马塘。在上世纪80年代初，走马塘已逐步被隔断，位于我区的这段河道就称之为东走马塘。",
                    "l1": {name: "谢坚钢", pos: "区委副书记、区长"},
                    "l2": [
                        {name:"倪来娣",pos:"五角场镇党委书记"},
                        {name:"徐庆俊",pos:"五角场镇镇长"},
                        {name: "何劲松", pos: "延吉新村党工委书记"},
                        {name: "肖枫", pos: "延吉新村街道办事处主任"},
                        {name:"李正明",pos:"五角场街道党工委书记"},
                        {name:"秦刚",pos:"五角场街道办事处主任"},
                        {name: "陆志平",pos:"控江路党工委书记"},
                        {name: "刘鹏", pos: "控江路街道办事处主任"},
                        {name: "程国光",pos:"四平路党工委书记"},
                        {name: "杜鹃",pos:"四平路街道办事处主任"},
                        {name:"陈捷",pos:"长白新村党委工委书记"},
                        {name:"潘炜",pos:"长白新村街道办事处主任"}
                        ]
                },
                {
                    "riverName": "随塘河",
                    "managementLevel": "区",
                    "length": "2.81",
                    "waterLevel": "3",
                    "maxWaterLevel": "4.4",
                    "minRiverWidth": "21",
                    "maxRiverWidth": "37",
                    "riverAcreage": "33003",
                    "startAddress": "嫩江路",
                    "endAddress": "随塘河泵站",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "随塘河位于杨浦区东北部。清雍正十年，筑衣周塘堤岸，挖土筑堤，沿堤形成河道，因傍衣周塘故名随塘河。今随塘河南连嫩江河，北以随塘河泵闸通钱家浜，全长3000米。"
                },
                {
                    "riverName": "复兴岛运河",
                    "managementLevel": "区",
                    "length": "3.54",
                    "waterLevel": "3.5",
                    "maxWaterLevel": "6",
                    "minRiverWidth": "49",
                    "maxRiverWidth": "209",
                    "riverAcreage": "223218",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "",
                    "l1": {name: "王祯", pos: "区委常委、副区长"},
                    "l2": [
                        {name: "王莲青", pos: "定海路街道党工委书记"},
                        {name: "吴岩", pos: "定海路街道办事处主任"},
                        {name:"陈捷",pos:"长白新村党委工委书记"},
                        {name:"潘炜",pos:"长白新村街道办事处主任"}
                        ]
                },
                {
                    "riverName": "吉浦河",
                    "managementLevel": "区",
                    "length": "3.02",
                    "waterLevel": "3",
                    "maxWaterLevel": "4.44",
                    "minRiverWidth": "13",
                    "maxRiverWidth": "21",
                    "riverAcreage": "36343",
                    "startAddress": "三门路",
                    "endAddress": "逸仙路",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "吉浦河",
                    "l1": {name: "王祯", pos: "区委常委、副区长"},
                    "l2": [
                        {name:"李正明",pos:"五角场街道党工委书记"},
                        {name:"秦刚",pos:"五角场街道办事处主任"},
                        {name:"倪瑾",pos:"新江湾城街道党工委书记"},
                        {name:"李铭",pos:"新江湾城街道办事处主任"},
                    ]
                },
                {
                    "riverName": "钱家浜",
                    "managementLevel": "区",
                    "length": "0.85",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "6",
                    "minRiverWidth": "25",
                    "maxRiverWidth": "45",
                    "riverAcreage": "24645",
                    "startAddress": "闸殷路",
                    "endAddress": "军工路",
                    "department": "部门",
                    "manager": "管理员",
                    "content": ""
                },
                {
                    "riverName": "杨树浦港",
                    "managementLevel": "市",
                    "length": "4.59",
                    "waterLevel": "2.5",
                    "maxWaterLevel": "4.44",
                    "minRiverWidth": "9",
                    "maxRiverWidth": "30",
                    "riverAcreage": "89973",
                    "startAddress": "杨树浦路桥",
                    "endAddress": "中山北二路桥",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "",
                    "l1": {name: "谢坚钢", pos: "区委副书记、区长"},
                    "l2": [
                        {name: "唐蛟", pos: "大桥街道党工委书记"},
                        {name: "刘涛", pos: "大桥街道办事处主任"},
                        {name: "叶靖", pos: "平凉路街道党工委书记"},
                        {name: "潘俏敏", pos: "平凉路街道办事处主任"},
                        {name: "孙革军", pos: "江浦路党工委书记"},
                        {name: "章爱敏",pos:"江浦路街道办事处主任"},
                        {name: "陆志平",pos:"控江路党工委书记"},
                        {name: "刘鹏",pos:"控江路街道办事处主任"},
                        {name: "程国光",pos:"四平路党工委书记"},
                        {name: "杜鹃",pos:"四平路街道办事处主任"}
                     ]
                },
                {
                    "riverName": "经一河*",
                    "managementLevel": "村",
                    "length": "2.02",
                    "waterLevel": "2.5",
                    "maxWaterLevel": "3.5",
                    "minRiverWidth": "41",
                    "maxRiverWidth": "54",
                    "riverAcreage": "66038",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "新江湾城原是江湾机场。新江湾城内河道的开发建设，正是意识到人们对环境和景观的需要，从而在设计理念中就把人们对环境和景观的要求纳入进来，以打造生态、文化、运动的新江湾城。内部河流的建设，完全按照生态、景观的理念打造，将来实施完成后，9条河道互为联通，形成网状河道结构，局部河道放宽，形成湖泊景观，以给人们以休闲、娱乐场地。",
                    "l1": {name: "王祯", pos: "区委常委、副区长"},
                    "l2": [
                        {name:"倪瑾",pos:"新江湾城街道党工委书记"},
                        {name:"李铭",pos:"新江湾城街道办事处主任"},
                    ]
                },
                {
                    "riverName": "嫩江河",
                    "managementLevel": "区",
                    "length": "0.58",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "4.25",
                    "minRiverWidth": "10",
                    "maxRiverWidth": "10",
                    "riverAcreage": "5344",
                    "startAddress": "军工路",
                    "endAddress": "黄浦江",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "",
                    "l1": {name: "王祯", pos: "区委常委、副区长"},
                    "l2": [
                        {name:"倪来娣",pos:"五角场镇党委书记"},
                        {name:"徐庆俊",pos:"五角场镇镇长"},
                    ]
                },

                {
                    "riverName": "中原河",
                    "managementLevel": "区",
                    "length": "0.69",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "4.4",
                    "minRiverWidth": "17",
                    "maxRiverWidth": "21",
                    "riverAcreage": "7577",
                    "startAddress": "国伟路泵站",
                    "endAddress": "中原河水闸",
                    "department": "部门",
                    "manager": "管理员",
                    "content": "",
                    "l1": {name: "王祯", pos: "区委常委、副区长"},
                    "l2": [
                        {name: "邱红", pos: "殷行街道党工委书记"},
                        {name: "张晖", pos: "殷行街道办事处主任"}
                    ]
                },



                {
                    "riverName": "经二河*",
                    "managementLevel": "村",
                    "length": "1.13",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "3.3",
                    "minRiverWidth": "18",
                    "maxRiverWidth": "70",
                    "riverAcreage": "32992",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": ""
                },
                {
                    "riverName": "经三河*",
                    "managementLevel": "村",
                    "length": "3.45",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "3.3",
                    "minRiverWidth": "27",
                    "maxRiverWidth": "50",
                    "riverAcreage": "92917",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": ""
                },
                {
                    "riverName": "纬三河*",
                    "managementLevel": "村",
                    "length": "1.65",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "3.3",
                    "minRiverWidth": "21",
                    "maxRiverWidth": "30",
                    "riverAcreage": "39317",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": ""
                },
                {
                    "riverName": "纬四河*",
                    "managementLevel": "村",
                    "length": "0.67",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "3.3",
                    "minRiverWidth": "31",
                    "maxRiverWidth": "135",
                    "riverAcreage": "33137",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": ""
                },
                {
                    "riverName": "纬五河*",
                    "managementLevel": "村",
                    "length": "2.22",
                    "waterLevel": "2.8",
                    "maxWaterLevel": "3.3",
                    "minRiverWidth": "44",
                    "maxRiverWidth": "60",
                    "riverAcreage": "102917",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": ""
                },
                {
                    "riverName": "纬六河*",
                    "managementLevel": "村",
                    "length": "1.87",
                    "waterLevel": "2.5",
                    "maxWaterLevel": "3.5",
                    "minRiverWidth": "42",
                    "maxRiverWidth": "65",
                    "riverAcreage": "73432",
                    "startAddress": "",
                    "endAddress": "",
                    "department": "部门",
                    "manager": "管理员",
                    "content": ""
                },
            ],
        }
        // return {
        //     users:{},
        //     rivers:{},
        //     newsType:{},
        //     news:{},
        //     groups:{},
        //     jobs:{},
        //     readilyJobs:{},
        //     feedBacks:{},
        // }
    }
})();
