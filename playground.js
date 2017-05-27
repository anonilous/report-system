/*var App = {
    getDistribution: function(jsonData) {
        var distribution = _.chain(jsonData)
            .groupBy("dept")
            .map(function(valueByDept, keyByDept) {
                return _.chain(valueByDept)
                    .groupBy("applicant")
                    .map(function(valueByApplicant, keyByApplicant) {
                        return {
                            dept: keyByDept,
                            applicant: keyByApplicant,
                            item: _.map(valueByApplicant, function(object) {
                                return _.pick(object, [
                                    "name",
                                    "spec",
                                    "quantity"
                                ]);
                            })
                        };
                    })
                    .value();
            })
            .value();
        return distribution;
    }
};*/
var test = [{
        dept: "IT",
        applicant: "Frey Xu",
        name: "三菱走珠笔",
        spec: "UB-150黑色",
        quantity: 3
    },
    {
        dept: "IT",
        applicant: "Frey Xu",
        name: "文正圆珠笔",
        spec: "WZ-2001黑色",
        quantity: 1
    }, {
        dept: "IT",
        applicant: "Sol Xia",
        name: "白金铅芯",
        spec: "ML-15 0.5mm",
        quantity: 1
    },
    {
        dept: "IT",
        applicant: "Charles Wang",
        name: "白金单头荧光笔",
        spec: "SP25黄色",
        quantity: 1
    },
    {
        dept: "IT",
        applicant: "Charles Wang",
        name: "长城 橡皮",
        spec: "E1131",
        quantity: 1
    },
    {
        dept: "IT",
        applicant: "Tom Ping",
        name: "得力固体胶",
        spec: "7102 21G",
        quantity: 1
    }
];
var distribution = Order.getDistribution(test);
console.log(distribution);


var distribution = [
    [{
            dept: "IT",
            applicant: "Frey Xu",
            item: [{
                    name: "三菱走珠笔",
                    spec: "UB-150黑色",
                    quantity: 3
                },
                {
                    name: "文正圆珠笔",
                    spec: "WZ-2001黑色",
                    quantity: 1
                }
            ]
        },
        {
            dept: "IT",
            applicant: "Sol Xia",
            item: [{
                name: "白金铅芯",
                spec: "ML-15 0.5mm",
                quantity: 1
            }]
        },
        {
            dept: "IT",
            applicant: "Charles Wang",
            item: [{
                    name: "白金单头荧光笔",
                    spec: "SP25黄色",
                    quantity: 1
                },
                {
                    name: "长城 橡皮",
                    spec: "E1131",
                    quantity: 1
                }
            ]
        },
        {
            dept: "IT",
            applicant: "Tom Ping",
            item: [{
                name: "得力固体胶",
                spec: "7102 21G",
                quantity: 1
            }]
        }
    ]
];
//notifyCoordinator("frey.xu@rogerscorporation.com", distribution);
var applicantStr = "";
var itemListStr = "";
var dept = distribution[0][0].dept;
for (var i = 0; i < distribution[0].length; i++) {
    var applicant = distribution[0][i].applicant;
    applicantStr = "<br /><strong>申请人：</strong>" + applicant + "<br />";
    var itemObj = distribution[0][i].item;
    var itemList = _.join(_.map(itemObj, function(value) {
        return (
            "<strong>名称：</strong>" + value.name + "，<strong>规格型号：</strong>" + value.spec + "，<strong>数量：</strong>" + value.quantity + "<br />"
        );
    }), "");
    itemListStr += applicantStr + "<strong>文具清单：</strong><br />" + itemList;
};
//console.log(itemListStr);
var bodyStr = "<h3>文具分发清单: </h3><h4>部门：</h4>" + dept + "<br />" + itemListStr;

console.log(bodyStr);






var test2 = [{
        dept: "IT",
        applicant: "Frey Xu",
        name: "三菱走珠笔",
        spec: "UB-150黑色",
        quantity: 3
    },
    {
        dept: "IT",
        applicant: "Sol Xia",
        name: "文正圆珠笔",
        spec: "WZ-2001黑色",
        quantity: 1
    },
    {
        dept: "Admin",
        applicant: "April Zhang",
        name: "白金铅芯",
        spec: "ML-15 0.5mm",
        quantity: 1
    },
    {
        dept: "Admin",
        applicant: "Serena Li",
        name: "白金单头荧光笔",
        spec: "SP25黄色",
        quantity: 1
    },
    {
        dept: "Floats",
        applicant: "Frey Xu",
        name: "长城 橡皮",
        spec: "E1131",
        quantity: 1
    },
    {
        dept: "Floats",
        applicant: "Frey Xu",
        name: "得力固体胶",
        spec: "7102 21G",
        quantity: 1
    }
];


var value = "frey.xu@rogerscorporation.com"
var pattern = "@rogerscorporation.com";
var replacement = "";
var separator = ".";
var space = " ";
var nameArray = _.split(_.replace(value, pattern, replacement), separator);
var firstName = _.head(nameArray);
var lastName = _.last(nameArray);
var fullName = _.capitalize(firstName) + space + _.capitalize(lastName);