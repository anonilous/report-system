"use strict";

var order = {
    selector: {
        showTextarea: "#showTextarea",
        textareaBox: "#boxTextarea",
        jsonTextarea: "#jsonTextarea",
        btnSaveData: "#save",

        adminBox: "#boxAdminOrderContent",
        adminTable: "#tableAdminOrder",

        reportBox: "#boxReportContent",
        reportTable: "#tableReport",
    },
    init: function() {
        order.bindUIActions();
    },
    bindUIActions: function() {
        var s = order.selector;
        var os = order.orderStatus;
        $(s.showTextarea).on("click", function() {
            $(s.textareaBox).show();
            $(s.textareaBox).siblings().hide();
        });
        $(s.btnSaveData).on("click", function() {
            var jsonData = $(s.jsonTextarea).val();
            localStorage.setItem('jsonData', jsonData);
        });
    },

    changeAdminOrderView: function() {
        var s = order.selector;
        // Retrieve the object from storage
        var jsonData = JSON.parse(localStorage.getItem('jsonData'));
        order.viewAdminOrderTable(jsonData, s);
    },
    changeAdminReportView: function() {
        var strFilter;
        var s = order.selector;
        var jsonData = JSON.parse(localStorage.getItem('jsonData'));
        order.viewAdminReportTable(jsonData, s);
    },

    // order table for admin
    viewAdminOrderTable: function(jsonData, s) {
        $(s.adminBox).show();
        $(s.adminBox).siblings().hide();
        order.initAdminOrderTable(jsonData, s);
    },
    initAdminOrderTable: function(data, s) {
        $(s.adminTable).bootstrapTable("load", data);
        $(s.adminTable).bootstrapTable({
            // Style and data
            data: data,
            classes: "table table-hover table-no-bordered",
            height: 500,
            idField: "id",
            uniqueId: "id",
            columns: [{
                    field: "id",
                    title: "序号",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true,
                    order: "asc"
                },
                {
                    field: "pid",
                    title: "料号",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "cname",
                    title: "中文品名",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },

                {
                    field: "qty",
                    title: "数量",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "unit",
                    title: "单位",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "origin",
                    title: "原产地",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "price",
                    title: "单价",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "total",
                    title: "总价",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                }
                // ,
                // {
                //     field: "operate",
                //     title: "Item Operate",
                //     align: "center",
                //     valign: "middle",
                //     events: order.operateAdminEvents,
                //     formatter: util.operateAdminFormatter
                // }
            ],

            // Pagination
            pagination: true,
            sidePagination: "client",
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            cache: true,

            // Sort and Search
            sortable: true,
            search: true,

            //Toolbar
            showToggle: false,
            cardView: false,
            detailView: false,
            showColumns: false,
            showRefresh: false,
            minimumCountColumns: 2,
            clickToSelect: true,
            maintainSelected: true,

            // Export
            showExport: true,
            exportDataType: "all",
            exportTypes: ["excel", "txt", "csv"]
        });
    },

    // report table for admin
    viewAdminReportTable: function(jsonData, s) {
        $(s.reportBox).show();
        $(s.reportBox).siblings().hide();

        var allItemListPicked = _.map(jsonData, function(object) {
            return _.pick(object, ["cname", "origin", "unit", "qty", "price", "total"]);
        });
        var jsonDataReported = order.getReportByCname(allItemListPicked);

        var jsonDataFlatted = _.flattenDeep(jsonDataReported);
        order.initAdminReportTable(jsonDataFlatted, s);


    },
    initAdminReportTable: function(data, s) {
        $(s.reportTable).bootstrapTable("load", data);
        $(s.reportTable).bootstrapTable({
            // Style and data
            data: data,
            classes: "table table-hover table-no-bordered",
            height: 500,
            columns: [{
                    field: "cname",
                    title: "中文品名",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "origin",
                    title: "原产国",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "unit",
                    title: "单位",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "qty",
                    title: "数量",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                },
                {
                    field: "total",
                    title: "总价",
                    align: "center",
                    halign: "center",
                    falign: "center",
                    valigh: "middle",
                    sortable: true
                }
            ],
            // Pagination
            pagination: true,
            sidePagination: "client",
            pageNumber: 1,
            pageSize: 10,
            pageList: [10, 25, 50, 100],
            cache: true,

            // Sort and Search
            sortable: true,
            search: true,

            // Toolbar
            // toolbar: "#toolbarAdminReport",
            showToggle: false,
            cardView: false,
            detailView: false,
            showColumns: true,
            showRefresh: false,
            minimumCountColumns: 2,
            clickToSelect: true,
            maintainSelected: true,

            // Export
            showExport: true,
            exportDataType: "all",
            exportTypes: ["excel", "txt", "csv"]
        });
    },

    count: function(numbers) {
        return _.reduce(numbers, function(result, current) {
            return parseFloat((result + Number(current)).toFixed(10));
        }, 0);
    },
    sum: function(collection) {
        return _.reduce(collection, function(result, item) {
            result = parseFloat(Number(item.price) * Number(item.qty)).toFixed(10);
            return result;
        }, 0);
    },

    getReportByCname: function(jsonData) {
        var result = _.chain(jsonData).groupBy("cname").map(function(valueByCname, keyByCname) {
            return _.chain(valueByCname).groupBy("origin").map(function(valueByOrigin, keyByOrigin) {
                return _.chain(valueByOrigin).groupBy("unit").map(function(valueByUnit, keyByUnit) {
                    return {
                        cname: keyByCname,
                        origin: keyByOrigin,
                        unit: keyByUnit,
                        qty: order.count(_.map(valueByUnit, "qty")),
                        total: order.count(_.map(valueByUnit, "total"))
                    };
                }).value();
            }).value();
        }).value();
        return result;
    },
    getReportByDept: function(jsonData) {
        var result = _.chain(jsonData).groupBy("dept").map(function(valueByDept, keyByDept) {
            return _.chain(valueByDept).groupBy("applicant").map(function(valueByApplicant, keyByApplicant) {
                return _.chain(valueByApplicant).groupBy("type").map(function(valueByType, keyByType) {
                    return _.chain(valueByType).groupBy("name").map(function(valueByName, keyByName) {
                        return _.chain(valueByName).groupBy("selectedSpec").map(function(valueBySpec, keyBySpec) {
                            return {
                                dept: keyByDept,
                                applicant: keyByApplicant,
                                type: keyByType,
                                name: keyByName,
                                spec: keyBySpec,
                                price: Number(_.head(_.map(valueBySpec, "price"))),
                                quantity: order.count(_.map(valueBySpec, "qty"))
                            };
                        }).value();
                    }).value();
                }).value();
            }).value();
        }).value();
        return result;
    },
    getReportByType: function(jsonData) {
        var result = _.chain(jsonData).groupBy("type").map(function(valueByType, keyByType) {
            return _.chain(valueByType).groupBy("name").map(function(valueByName, keyByName) {
                return _.chain(valueByName).groupBy("selectedSpec").map(function(valueBySpec, keyBySpec) {
                    return {
                        type: keyByType,
                        name: keyByName,
                        spec: keyBySpec,
                        price: Number(_.head(_.map(valueBySpec, "price"))),
                        quantity: order.count(_.map(valueBySpec, "qty"))
                    };
                }).value();
            }).value();
        }).value();
        return result;
    },

    btnProcessAction: function() {
        var s = order.selector;
        var os = order.orderStatus;
        var getAllSelections = $(s.adminTable).bootstrapTable("getAllSelections");
        if (getAllSelections.length === 0) {
            var msg = "<h4>Please select an order at least</h4>";
            warningAlert(msg);
        } else {
            var getAllId = _.map(getAllSelections, function(object) {
                return _.pick(object, "Id");
            });
            var allIdArray = _.map(getAllId, "Id");
            _.forEach(allIdArray, function(value) {
                order.process(value, os.Processing);
            });
        }
    },
    btnCompleteAction: function() {
        var s = order.selector;
        var os = order.orderStatus;
        var getAllSelections = $(s.adminTable).bootstrapTable("getAllSelections");
        if (getAllSelections.length === 0) {
            var msg = "<h4>Please select an order at least</h4>";
            warningAlert(msg);
        } else {
            var getAllId = _.map(getAllSelections, function(object) {
                return _.pick(object, "Id");
            });
            var allIdArray = _.map(getAllId, "Id");
            _.forEach(allIdArray, function(value) {
                order.complete(value, os.Completed);
            });
        }
    },
    btnNotifyAction: function() {
        var s = order.selector;
        var os = order.orderStatus;
        var getAllSelections = $(s.reportTable).bootstrapTable("getAllSelections");
        var lengthOfSelected = getAllSelections.length;
        if (lengthOfSelected === 0) {
            var msg = "<h4>Please select an item at least</h4>";
            warningAlert(msg);
        } else {
            var getAllInfo = _.map(getAllSelections, function(object) {
                return _.pick(object, ["dept", "applicant", "name", "spec", "quantity"]);
            });
            var distribution = order.getDistribution(getAllInfo);

            var deptText = distribution[0][0].dept;
            var deptValue = Util.valueOfText(JSON.parse($("#costCenterListHidden").val()), deptText);
            var coordinatorName = Util.textOfValue(JSON.parse($("#coordinatorListHidden").val()), deptValue);
            var coordinatorEmail = Util.textOfValue(JSON.parse($("#coordinatorEmailListHidden").val()), deptValue);
            var adminEmail = _.join(JSON.parse($("#adminEmailHidden").val()), ";");

            swal({
                    title: "<h3>Send to <strong>" + coordinatorName + " </strong>of<strong> " + deptText + " </strong>department </h3>",
                    text: "<h4>You will send <strong>" + lengthOfSelected + " </strong>items!</h4>",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, send now",
                    cancelButtonText: "No, send later",
                    closeOnConfirm: false,
                    closeOnCancel: false,
                    html: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        notifyCoordinator(coordinatorEmail, adminEmail, distribution);
                    } else {
                        swal({
                            title: "<h3>Cancelled</h3>",
                            text: "<h4>Your email didn't send out</h4>",
                            type: "error",
                            timer: 1500,
                            showConfirmButton: true,
                            html: true
                        });
                    }
                });
        }
    },

    getDistribution: function(jsonData) {
        var distribution = _.chain(jsonData).groupBy("dept").map(function(valueByDept, keyByDept) {
            return _.chain(valueByDept).groupBy("applicant").map(function(valueByApplicant, keyByApplicant) {
                return {
                    dept: keyByDept,
                    applicant: keyByApplicant,
                    item: _.map(valueByApplicant, function(object) {
                        return _.pick(object, ["name", "spec", "quantity"]);
                    })
                };
            }).value();
        }).value();
        return distribution;
    },

};

$(function() {
    order.init();
});