"use strict";

var util = {
    titleFormatter: function(value, row, index) {
        var pattern = "@rogerscorporation.com";
        var replacement = "";
        var separator = ".";
        var space = " ";
        var nameArray = _.split(_.replace(value, pattern, replacement), separator);
        var firstName = _.head(nameArray);
        var lastName = _.last(nameArray);
        var fullName = _.capitalize(firstName) + space + _.capitalize(lastName);
        return fullName;
    },

    statusFormatter: function(value, row, index) {
        var os = Order.orderStatus;
        var statusLabel = {
            'Pending': function() {
                return '<h4><span class="label label-info">' + os.Pending + '</span></h4>';
            },
            'Modified': function() {
                return '<h4><span class="label label-warning">' + os.Modified + '</span></h4>';
            },
            'Processing': function() {
                return '<h4><span class="label label-primary">' + os.Processing + '</span></h4>';
            },
            'Completed': function() {
                return '<h4><span class="label label-success">' + os.Completed + '</span></h4>';
            },
            'Canceled': function() {
                return '<h4><span class="label label-danger">' + os.Canceled + '</span></h4>';
            }
        };
        if (typeof statusLabel[value] !== 'function') {
            throw new Error('Invalid status label.');
        }
        return statusLabel[value]();
    },

    typeFormatter: function(value, row, index) {
        var c = Product.category;
        var type = {
            'pen': function() {
                return c.pen;
            },
            'desk': function() {
                return c.desk;
            },
            'archive': function() {
                return c.archive;
            },
            'others': function() {
                return c.others;
            },
            'special': function() {
                //return c.special;
                return '<span style="background-color: yellow">' + c.special + '</span>';
            }
        };
        if (typeof type[value] !== 'function') {
            throw new Error('Invalid type.');
        }
        return type[value]();
    },

    priceFormatter: function(value, row, index) {
        return Number(value).toFixed(2);
    },

    dateTimeFormatter: function(value, row, index) {
        return new Date(value).yearMonthDayHourMinuteSecond();
    },

    urlFormatter: function(value, row, index) {
        return [
            //Need to deal with http://
            '<a target="_blank" href="' + row.Url + '">' + row.Title + '</a>'
        ].join('');
    },

    operateFormatter: function(value, row, index) {
        return [
            '<a class="edit" href="javascript:void(0)" title="Edit">',
            '<i class="glyphicon glyphicon-edit"></i>',
            '</a>',
            '<span class="separator"> | </span>',
            '<a class="remove" href="javascript:void(0)" title="Remove">',
            '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    },

    operateUserFormatter: function(value, row, index) {
        return [
            '<a class="edit" href="javascript:void(0)" title="Edit">',
            '<i class="glyphicon glyphicon-edit"></i>',
            '</a>'
        ].join('');
    },

    operateAdminFormatter: function(value, row, index) {
        var separatorHTML = '<span class="separator"> | </span>';
        var adminEditHTML = '<a class="admin-edit" href="javascript:void(0)" title="Edit"><span class="glyphicon glyphicon-edit"></span></a>';
        return [
            adminEditHTML
        ].join('');
    },

    qtyFormatter: function(value, row, index) {
        if (value > 50) {
            return '<span style="background-color: yellow">' + Number(value) + '</span>';
        } else {
            return Number(value);
        }
    },

    totalFormatter: function(value, row, index) {
        var total = Number(row.price) * Number(row.quantity);
        if (total > 80) {
            return '<span style="background-color: yellow">' + Number(total).toFixed(2) + '</span>';
        } else {
            return Number(total).toFixed(2);
        }
    },

    costCenterFormatter: function(value, row, index) {
        var total = Number(row.price) * Number(row.quantity);
        return Util.calcCostCenter(row.type, row.quantity, total, row.dept)
    },

    calcCostCenter: function(type, qty, total, dept) {
        //calc the costCenter, admin is default costCenter
        if (type === "special") {
            return '<span style="background-color: yellow">' + dept + '</span>';
        } else {
            if (qty > 50) {
                return '<span style="background-color: yellow">' + dept + '</span>';
            } else if (total > 80) {
                return '<span style="background-color: yellow">' + dept + '</span>';
            } else {
                return "Admin";
            }
        }
    },

    initQtyInput: function(scope) {
        Util.bindQtyEvent(scope);
    },

    bindQtyEvent: function(scope) {
        $(scope).on('click', 'a.increment', function() {
            var anode = $(this);
            var pnode = anode.parent();
            var inputEl = $('input', pnode);
            var cur = inputEl.val();
            cur++;
            inputEl.css('color', '#fff');

            var uphtml = '<span class="upspan"><span style="position:relative;">' + (cur - 1) + '</span></span>';
            var downhtml = '<span style="top:28px;" class="downspan"><span style="position:relative;">' + cur + '</span></span>';
            pnode.prepend(uphtml);
            pnode.append(downhtml);

            $(".upspan span").animate({ top: -28 }, "10");
            $(".downspan span").animate({ top: -28 }, "10", function() {
                $('.downspan,.upspan').remove();
                inputEl.css('color', '#333');
                inputEl.val(cur);
                if (scope === ".side-cart-item") {
                    Cart.updateSideTotal("#sideCartList");
                } else if (scope === ".cart-item") {
                    var productScope = $("#cartModalLabel").attr("data-scope");
                    Cart.quickUpdateTotal("#cartList", productScope);
                }
            });
        });

        $(scope).on('click', 'a.decrement', function() {
            var anode = $(this);
            var pnode = anode.parent();
            var inputEl = $('input', pnode);
            var cur = inputEl.val();
            cur--;
            if (cur === 0) {
                return;
            }
            inputEl.css('color', '#fff');

            var uphtml = '<span class="upspan"><span style="position:relative;">' + (cur + 1) + '</span></span>';
            var downhtml = '<span style="top:-28px;" class="downspan"><span style="position:relative;">' + cur + '</span></span>';
            pnode.prepend(uphtml);
            pnode.append(downhtml);

            $(".upspan span").animate({ top: 28 }, "10");
            $(".downspan span").animate({ top: 28 }, "10", function() {
                $('.downspan,.upspan').remove();
                inputEl.css('color', '#333');
                inputEl.val(cur);
                if (scope === ".side-cart-item") {
                    Cart.updateSideTotal("#sideCartList");
                } else if (scope === ".cart-item") {
                    var productScope = $("#cartModalLabel").attr("data-scope");
                    Cart.quickUpdateTotal("#cartList", productScope);
                }
            });
        });

        // store previous qty on focus
        $(scope).on('focus', '.qty', function(event) {
            var val = parseInt($(this).val());
            if (isNaN(val)) {
                return;
            }
            if (val) {
                $("#changeBeforeValue").val(val);
            }
        });

        Util.validateQty(scope);
    },

    validateQty: function(scope) {
        $(scope).on("mouseleave", ".qty", function() {
            var self = this;
            var currValue = Number($(this).val()); // see "1a" as NaN
            var prevValue = $("#changeBeforeValue").val();
            var resetDefault = function() {
                var msg = "<h4>商品数量必须大于0</h4>";
                warningAlert(msg);
                if (prevValue) {
                    $(self).text(prevValue);
                    $(self).val(prevValue);
                } else {
                    $(self).text("1");
                    $(self).val("1");
                }
            }
            if (isNaN(currValue)) {
                resetDefault();
            } else if (currValue < 0) {
                resetDefault();
            } else if (currValue === 0) {
                resetDefault();
            } else if ($(self).val() === "") {
                resetDefault();
            }
        });
    },

    valueOfText: function(jsonArray, text) {
        var length = jsonArray.length;
        for (var i = 0; i < length; i++) {
            if (jsonArray[i].text === text) {
                return jsonArray[i].value;
            }
        }
    },

    textOfValue: function(jsonArray, value) {
        var length = jsonArray.length;
        for (var i = 0; i < length; i++) {
            if (jsonArray[i].value.toString() === value.toString()) {
                return jsonArray[i].text;
            }
        }
    }
};