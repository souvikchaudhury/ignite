window.selectedSymbol           = 'ASX.AX';
window.seriesTypes              = 'first';
window.volumeOpen               = 'yes';
window.g                        = 'd';
window.stopscan                 ='no';
window.stockcaldate             = '';
window.trendLineType            = '';
window.trendLinePeriod          = '';
window.chartTypes               = [];
window.chartTypes['Type']       = 'financial';
window.chartTypes['displayType']= 'ohlc';
window.chartTypes['posColor']   = 'rgba(0,204,0,1)';
window.chartTypes['negColor']   = 'rgba(255,0,0,1)';
window.sourceDetails = '';
window.gridvar = false;
window.react = true;
window.scanResultDates = [];
//console.log('pre init',window.gridvar);
var setcounter;

var YAHOO = {
    Finance: {
        SymbolSuggest: {}
    }
};

var igFinance = (function () {
    var helpers = (function () {

        function _checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function _changeSeriesTypeToSplineArea() {
            _removeOldSeries();

            $("#priceChart").igDataChart("option", "series", helpers.getSplineAreaSeries("#00AADE"));
           // $("#zoom").igZoombar("clone").igDataChart("option", "series", helpers.getSplineAreaSeries("#00AADE"));
        }

        function _changeSeriesTypeToLine() {
            _removeOldSeries();

            $("#priceChart").igDataChart("option", "series", _getLineSeries("#00AADE"));
           // $("#zoom").igZoombar("clone").igDataChart("option", "series", _getLineSeries("#00AADE"));
        }

        function _changeSeriesTypeToFinancial(displayType, posColor, negColor) {
            _removeOldSeries();
            $("#priceChart").igDataChart("option", "series", _getFinancialSeriesWithCustom(displayType, negColor));
            //$("#zoom").igZoombar("clone").igDataChart("option", "series", _getFinancialSeriesWithCustom(displayType, negColor));
        }

        function _removeOldSeries() {
            $("#priceChart").igDataChart("option", "series", [{
                name: "stockSeries",
                remove: true
            }]);

            /*$("#zoom").igZoombar("clone").igDataChart("option", "series", [{
                name: "stockSeries",
                remove: true
            }]);*/
        }

        function _getFinancialSeriesWithCustom(displayType, negColor) {
            var abc = new Array();
            //console.log('window.trendLineType',window.trendLineType);
            abc.push({
                type: "financial",
                displayType: displayType,
                isHighlightingEnabled: true,
                isTransitionInEnabled: true,
                closeMemberPath: "Close",
                highMemberPath: "High",
                lowMemberPath: "Low",
                openMemberPath: "Open",
                showTooltip: true,
                thickness: 1,
                //tooltipTemplate: '<ul class="tooltip-titles"><li> Date:</li><li>' + resources.TooltipOpen + '</li><li>' + resources.TooltipHigh + '</li><li>' + resources.TooltipLow + '</li><li>' + resources.TooltipClose + '</li></ul><ul class="tooltip-values"><li>${item.Date}</li><li>${item.Open}</li><li>${item.High}</li><li>${item.Low}</li><li>${item.Close}</li></ul>',
                //tooltipTemplate: '<ul class="tooltip-titles"><li>Date:${item.Date}</li><li>Open:${item.Open}</li><li>High:${item.High}</li><li>Low:${item.Low}</li><li>Close:${item.Close}</li></ul>',
                tooltipTemplate: '<ul class="tooltip-titles"><li>Date:${item.Date}</li><li>Open:${item.Open}</li><li>High:${item.High}</li><li>Low:${item.Low}</li><li>Close:${item.Close}</li></ul>',
                //tooltipTemplate: "tooltipTemplate",
                tooltipPosition: "auto",
                negativeBrush: negColor,
                xAxis: "xAxis",
                yAxis: "yAxis",
                name: "stockSeries",
                title: "Price Data",
                //trendLineType : '',
                //trendLinePeriod: '',
                trendLineType: window.trendLineType,
                trendLinePeriod: window.trendLinePeriod,
                transitionInDuration: 1500,
                transitionInMode: "accordionFromValueAxisMaximum",
                resolution: 1,
                highlightingTransitionDuration: 500
            });
            /*abc.push({
                name: "crosshairLayer",
                title: "crosshair",
                type: "crosshairLayer",
                useInterpolation: true,
                transitionDuration: 100,
                targetSeries: "stockSeries",
                // horizontalLineVisibility: "visible",
                // verticalLineVisibility: "visible"
                useLegend: "true",
                brush : "white",
                opacity:0.5,
                thickness:2
            });
            abc.push({
                name: "itemToolTipLayer",
                title: "itemToolTip",
                type: "itemToolTipLayer",
                useInterpolation: false,
                transitionDuration: 100
            })*/
            // console.log(abc);
            return abc;
        }

        function _getLineSeries(customOutline) {
            return [{
                name: "stockSeries",
                type: "line",
                isHighlightingEnabled: true,
                isTransitionInEnabled: true,
                xAxis: "xAxis",
                yAxis: "yAxis",
                valueMemberPath: "High",
                showTooltip: true,
                brush: "rgba(0,170,222,0.3)",
                outline: customOutline,
                tooltipTemplate: '<ul class="tooltip-titles"><li>Date:${item.Date}</li><li>Open:${item.Open}</li><li>High:${item.High}</li><li>Low:${item.Low}</li><li>Close:${item.Close}</li></ul>',
                // tooltipTemplate: '<ul class="tooltip-titles"><li>' + resources.TooltipOpen + '</li><li>' + resources.TooltipHigh + '</li><li>' + resources.TooltipLow + '</li><li>' + resources.TooltipClose + '</li></ul><ul class="tooltip-values"><li>${item.Open}</li><li>${item.High}</li><li>${item.Low}</li><li>${item.Close}</li></ul>',
                thickness: 3
            }];
        }
        function _itemscan (item) {
            var scanResultDates = null;
            var x = '';
            //console.log(window.scanResultDates.indexOf(item.Date));
            if ( window.scanResultDates.indexOf(item.Date) > -1 ) {
                x = "X";
            }
            return x;
        }
        //Format label depending on zoom level. We need to use current zoom 
        //level because we don't know the date of the next visible dot in axes
        function _formatLabel(item) {
            // console.log(item);
            var chartWidth = $("#priceChart").igDataChart("option", "windowRect").width;

            var minimalWidth = 0.398;
            var intervalWidth = 0.598;
            var ret = '';
            if (chartWidth < minimalWidth || window.seriesTypes === "week" || window.seriesTypes === "month") {
                ret += $.datepicker.formatDate('d/mm/yy', new Date(item.Date));
            } 
            else {
                mnTh = $.datepicker.formatDate('M', new Date(item.Date));
                yR = $.datepicker.formatDate('yy', new Date(item.Date));
                ret += mnTh+' '+yR;
                // ret += helpers._convertNumberToMonthName(item.Date.getMonth())+' '+item.Date.getFullYear();
            }
            return ret;
        }

        return {
            takeTimeSnapShot: function () {
                var today = new Date();
                var h = today.getHours();
                var m = today.getMinutes();
                var s = today.getSeconds();
                var day = today.getDate();
                var month = today.getMonth();
                var year = today.getFullYear();
                // add a zero in front of numbers<10
                m = _checkTime(m);
                s = _checkTime(s);
               // document.getElementById('clock').innerHTML = resources.getTimeFormatted(year, month, day) + " " + h + ":" + m + ":" + s;
            },

            localize: function () {
                $("title").text(resources.Title);
                $("#indicator-period-text").text(resources.IndicatorPeriod);
                $("#indicator-type").text(resources.IndicatorType.MoneyFlow);
                $("#js-select-indicator").text(resources.SelectIndicator);
                $("#js-period-slider").text(resources.PeriodSlider);
                $("#js-valid-ticker").text(resources.ValidTicker);
                $("#info-screen").html(resources.InfoScreen);
            },

            updateDetailsDataView: function (details) {
                if (details.PercentChange === "0.00%") {
                    details.isPositive = "inactive";
                    details.marketCurrentlyClosed = resources.MarketCurrentlyClosed;
                } else if (details.PercentChange.contains("+")) {
                    details.isPositive = "true";
                    details.PercentChange = details.PercentChange.substring(1);
                    details.Change = details.Change.substring(1);
                } else {
                    details.isPositive = "false";
                    details.PercentChange = details.PercentChange.substring(1);
                    details.Change = details.Change.substring(1);
                }

                details.RangeText = resources.RangeText;
                details.WeeksText = resources.WeeksText;
                details.OpenText = resources.OpenText;
                details.VolumeText = resources.VolumeText;
                details.EbitaText = resources.EbitaText;
                details.EpsText = resources.EpsText;
                details.MktText = resources.MktText;
                details.PeText = resources.PeText;
                details.AskText = resources.AskText;
                details.BidText = resources.BidText;
                details.DailyHighText = resources.DailyHighText;
                details.DailyLowText = resources.DailyLowText;
            },

            changeChartsSeriesType: function (newType, displayType, posColor, negColor) {
                if (newType === "area") {
                    _changeSeriesTypeToSplineArea();
                } else if (newType === "line") {
                    _changeSeriesTypeToLine();
                } else {
                    _changeSeriesTypeToFinancial(displayType, posColor, negColor);
                }
            },

            getSplineAreaSeries: function (customOutline) {
                // console.log(customOutline);
                return [{
                    type: "splineArea",
                    displayType: "splineArea",
                    isHighlightingEnabled: true,
                    isTransitionInEnabled: true,
                    valueMemberPath: "High",
                    brush: "rgba(0,170,222,0.3)",
                    showTooltip: true,
                    tooltipTemplate: '<ul class="tooltip-titles"><li>Date:${item.Date}</li><li>Open:${item.Open}</li><li>High:${item.High}</li><li>Low:${item.Low}</li><li>Close:${item.Close}</li></ul>',
                    // tooltipTemplate: '<ul class="tooltip-titles"><li>' + resources.TooltipOpen + '</li><li>' + resources.TooltipHigh + '</li><li>' + resources.TooltipLow + '</li><li>' + resources.TooltipClose + '</li></ul><ul class="tooltip-values"><li>${item.Open}</li><li>${item.High}</li><li>${item.Low}</li><li>${item.Close}</li></ul>',
                    outline: customOutline,
                    xAxis: "xAxis",
                    yAxis: "yAxis",
                    name: "stockSeries",
                    title: "Price Data"
                }];
            },

            getDataSchema: function () {
                return new $.ig.DataSchema("json", {
                    fields: [{
                        name: "Close",
                        type: "number"
                    }, {
                        name: "High",
                        type: "number"
                    }, {
                        name: "Low",
                        type: "number"
                    }, {
                        name: "Open",
                        type: "number"
                    }, {
                        name: "Volume",
                        type: "number"
                    }/*, {
                        name: "Date",
                        type: "date"
                    }*/, {
                        name: "Date",
                        type: "string"
                    }],
                    searchField: "value.items"
                });
            },

            _getPeriodSliderOptions: function () {
                return {
                    slide: function (event, ui) {
                        $("#indicatorChart").igDataChart("option", "series", [{
                            name: "indicatorSeries",
                            period: ui.value
                        }]);
                        $("#period").text(ui.value);
                        document.getElementsByClassName("avt-value")[1].innerHTML = ui.value;
                    },
                    min: 1,
                    max: 25,
                    value: 14
                };
            },

            //price chart related functions
            _getPriceChartOptions: function () {
                // var desiredHeight = 0.22 * $(window).height();
                var windowHeight = $(window).height();
                var windowHeight = windowHeight - 215;
                var desiredHeight = 0.65 * windowHeight;
                return {
                   // theme: "metro",
                    width: "96%",
                    height: window.volumeOpen === 'yes' ? desiredHeight : windowHeight,
                    windowResponse: "immediate",
                    horizontalZoomable: true,
                    //verticalZoomable: true,
                    //windowScaleVertical: 1,
                    //allowCustomCategoryStyle: true,
                    windowRectChanged: function (evt, ui) {
                       // console.log('window.react',window.react);
                        if(window.react){
                            chartHeight =  ui.newHeight;
                            maxWidth = 1;
                        	chartLeft = ui.newLeft;
                            chartWidth = ui.newWidth;
                            sourcelength = window.sourceDetails.length;
                            sourcelist = window.sourceDetails;
                            closeHigharr = [];
                            closeMinarr  = [];
                            closearr   = [];
                            
                            // chart data calculation 
                            newchartright = parseFloat(chartLeft + chartWidth);
                            
                            //minVisible JSON Data Point
                            minVisible = parseFloat(chartLeft/maxWidth*sourcelength);
                            maxVisible = parseFloat(newchartright/maxWidth*sourcelength);
                            
                            for(var i in sourcelist){
                                if(i>=minVisible && i<=maxVisible){
                                    closeHigharr.push(sourcelist[i].Close);
                                    closeMinarr.push(sourcelist[i].Close);
                                }
                            }
                            closeHigharr = unique(closeHigharr);
                            closeMinarr  = unique(closeMinarr);
                            
                            closeHigharr = closeHigharr.sort(function(a, b){return b-a});          
                            closeMinarr = closeMinarr.sort(function(a, b){return a-b});
                            
                            closeHigh = ((closeHigharr[0] === '' || closeHigharr[0] === null) ? closeHigharr[1] : closeHigharr[0]);
                            closeMin = ((closeMinarr[0] === '' || closeMinarr[0] === null) ? closeMinarr[1] : closeMinarr[0]);

                            $("#priceChart").igDataChart("option", "axes", [{ name: "yAxis", type: "numericY", maximumValue: closeHigh, minimumValue: closeMin }] );
                        }
                    },
                    gridAreaRectChanged: function (evt, ui) {
//                        console.log('grid changed outer', window.gridvar);
                        if(window.gridvar){
                            chartHeight =  ui.newHeight;
                            maxWidth = 1;
                            chartLeft = ui.newLeft;
                            chartWidth = ui.newWidth;
    //                        sourceDetails = ui.chart;
                            sourcelength = window.sourceDetails.length;
                            sourcelist = window.sourceDetails;
                            closeHigharr = [];
                            closeMinarr  = [];
                            closearr   = [];

                            // chart data calculation 
                            newchartright = parseFloat(chartLeft + chartWidth);
                            //minVisible JSON Data Point
                            minVisible = parseFloat(chartLeft/maxWidth*sourcelength);
                            maxVisible = parseFloat(newchartright/maxWidth*sourcelength);

                            for(var i in sourcelist){
                                if(i>=minVisible && i<=maxVisible){
                                    closeHigharr.push(sourcelist[i].Close);
                                    closeMinarr.push(sourcelist[i].Close);
                                }
                            }
                            closeHigharr = unique(closeHigharr);
                            closeMinarr  = unique(closeMinarr);

                            closeHigharr = closeHigharr.sort(function(a, b){return b-a;});                      
                            closeMinarr = closeMinarr.sort(function(a, b){return a-b;});

                            closeHigh = ((closeHigharr[0] === '' || closeHigharr[0] === null) ? closeHigharr[1] : closeHigharr[0]);
                            closeMin = ((closeMinarr[0] === '' || closeMinarr[0] === null) ? closeMinarr[1] : closeMinarr[0]);

                            window.gridvar = false;
                            window.react = true;
                            $("#priceChart").igDataChart("option", "axes", [{ name: "yAxis", type: "numericY", maximumValue: closeHigh, minimumValue: closeMin }] ); 
                        }
                    },
                    refreshCompleted: function (evt, ui) {
                        if(!window.gridvar){
                            window.react = true;
                        }
                    },
//                  windowScaleHorizontal:0.5,
//                  windowScaleVertical: 0.5,
//                  windowPositionHorizontal: 0.25,
                    dataSource: igFinance.getDataView(),
                    leftMargin: 0,
                    rightMargin: 30,
                    windowRectMinWidth: 0.05,
                    // brushes :["#40d904","#40d904","#40d904"],
                    axes: helpers._getPriceChartAxes(),
                    series: window.chartTypes['Type'] === "area" ? helpers.getSplineAreaSeries("#00AADE") : window.chartTypes['Type'] === "line" ? _getLineSeries("#00AADE") :  _getFinancialSeriesWithCustom(window.chartTypes['displayType'], window.chartTypes['negColor']),
                    gridMode: "beforeSeries",
                    syncChannel: "channel2",
                    //synchronizeVertically: true,
                    syncrhonizeHorizontally: true
                    //crosshairVisibility: "visible"
                    	
                };
            },

            _getPriceChartAxes: function () {
                return [{
                    type: "categoryX",
                    // label: "Date",
                    name: "xAxis2",
                    // labelTopMargin: 20,
                    labelLocation: "outsideBottom",
                    labelTextStyle: "6px Helvetica, Arial, sans-serif",
                    labelTextColor: "green",
                    // majorStroke: "rgba(153,153,153,0.3)",
                    formatLabel: function (item) {
                        return _itemscan(item);
                    },
                    interval: 1
                },{
                    type: "categoryX",
                    label: "Date",
                    name: "xAxis",
                    labelTopMargin: 20,
                    labelLocation: "outsideBottom",
                    majorStroke: "rgba(153,153,153,0.3)",
                    //title: "Date",
                    //labelVisibility: "collapsed"
                    formatLabel: function (item) {
                        return _formatLabel(item);
                    }
                    //interval: 0,
                    //tickStrokeThickness:1
                },{
                    type: "numericY",
                    labelLocation: "outsideRight",
                    name: "yAxis",
                    majorStroke: "rgba(153,153,153,0.3)",
                    labelLeftMargin: 15
                    // labelExtent: 20,
                    // interval: 1

                }];
            },

            //indicator chart related functions
            _getIndicatorChartOptions: function () {
                var desiredHeight = 0.18 * ($(window).height()-100);
                return {
                    width: "100%",
                    height: desiredHeight,
                    windowResponse: "deferred",
                    horizontalZoomable: true,
                    dataSource: igFinance.getDataView(),
                    leftMargin: 0,
                    rightMargin: 30,
                    windowRectMinWidth: 0.05,
                    axes: helpers._getIndicatorChartAxes(),
                    series: helpers._getIndicatorChartSeries("moneyFlowIndexIndicator"),
                    syncChannel: "channel2",
                    synchronizeVertically: false,
                    syncrhonizeHorizontally: false
                };
            },

            _getIndicatorChartAxes: function () {
                return [{
                    type: "categoryX",
                    label: "Date",
                    name: "xAxis",
                    maximumValue: 1,
                    minimumValue: 0,
                    formatLabel: function (item) {
                        return _formatLabel(item);
                    }

                }, {
                    type: "numericY",
                    labelLocation: "outsideRight",
                    name: "yAxis",
                    majorStroke: "rgba(153,153,153,0.1)",
                    formatLabel: function (item) {
                        return helpers._numberFormatter(item);
                    },
                    labelExtent: 40
                }];
            },

            _getIndicatorChartSeries: function (newType) {
                return [{
                    type: newType,
                    name: "indicatorSeries",
                    title: "Financial Indicator Data",
                    isHighlightingEnabled: true,
                    isTransitionInEnabled: true,
                    xAxis: "xAxis",
                    yAxis: "yAxis",
                    closeMemberPath: "Close",
                    highMemberPath: "High",
                    lowMemberPath: "Low",
                    volumeMemberPath: "Volume",
                    resolution: 10
                }];

            },

            _getIndicatorComboOptions: function () {
                return {
                    width: "300px",
                    enableClearButton: false,
                    dataSource: helpers._getIndicatorComboDataSource(),
                    textKey: "text",
                    valueKey: "type",
                    autoComplete: true,
                    filteringType: "local",
                    noMatchFoundText: "No match found please try again",
                    selectedItems: [{
                        index: 5
                    }],
                    selectionChanged: function (evt, ui) {
                        if (ui.items && ui.items[0]) {
                            document.getElementsByClassName("avt-value")[0].innerHTML = ui.items[0].text;
                            helpers._changeIndicator(ui.items[0].value);
                        }
                    },
                    dropDownClosed: function (evt, ui) {
                        var text = $("#indicatorCombo").igCombo("text");
                        $("#indicatorCombo").igCombo("filter", null, "");
                        $("#indicatorCombo").igCombo("text", text);
                    }
                };
            },

            _getIndicatorComboDataSource: function () {
                return [
                        { type: "averageTrueRangeIndicator", text: resources.IndicatorType.AvgTrueRange },
                        { type: "averageDirectionalIndexIndicator", text: resources.IndicatorType.AvgIndex },
                        { type: "commodityChannelIndexIndicator", text: resources.IndicatorType.CommodityIndex },
                        { type: "fastStochasticOscillatorIndicator", text: resources.IndicatorType.FastOscillator },
                        { type: "forceIndexIndicator", text: resources.IndicatorType.ForceIndex },
                        { type: "moneyFlowIndexIndicator", text: resources.IndicatorType.MoneyFlow },
                        { type: "priceChannelOverlay", text: resources.IndicatorType.PriceOverlay },
                        { type: "rateOfChangeAndMomentumIndicator", text: resources.IndicatorType.RateMomentum },
                        { type: "relativeStrengthIndexIndicator", text: resources.IndicatorType.RelativeIndex },
                        { type: "slowStochasticOscillatorIndicator", text: resources.IndicatorType.SlowOscillator },
                        { type: "stochRSIIndicator", text: resources.IndicatorType.StockRsi },
                        { type: "trixIndicator", text: resources.IndicatorType.Trix },
                        { type: "williamsPercentRIndicator", text: resources.IndicatorType.WilliamsR }
                ];
            },

            _changeIndicator: function (newIndicator) {
                $("#indicatorChart").igDataChart("option", "series", [{
                    name: "indicatorSeries",
                    remove: true
                }]);

                $("#indicatorChart").igDataChart("option", "series", helpers._getIndicatorChartSeries(newIndicator));

            },

            //volume chart related functions
            _getVolumeChartOptions: function () {
                var desiredHeight = 0.3 * ($(window).height() - 190);
                return {
                    gridMode: 'behindSeries',
                    width: "96.3%",
                    windowResponse: "immediate",
                    height: desiredHeight,
                    dataSource: igFinance.getDataView(),
                    leftMargin: 0,
                    rightMargin: 30,
                    windowRectMinWidth: 0.5,
                    axes: helpers._getVolumeChartAxes(),
                    series: helpers._getVolumeChartSeries(),
                    syncChannel: "channel2",
                    synchronizeVertically: false,
                    syncrhonizeHorizontally: false
                    //horizontalZoomable: true,
                    //verticalZoomable: true
                };
            },

            _getVolumeChartAxes: function () {
                return [{
                    type: "categoryX",
                    label: "Date",
                    name: "xAxis",
                    // labelVisibility: "collapsed",
                    labelTopMargin: 20,
                    labelLocation: "outsideBottom",
                    majorStroke: "rgba(153,153,153,0.3)",
                    formatLabel: function (item) {
                        return _formatLabel(item);
                    }
                }, {
                    type: "numericY",
                    name: "yAxis",
                    majorStroke: "rgba(153,153,153,0.1)",
                    isLogarithmic: true,
                    labelLocation: "outsideRight",
                    formatLabel: function (item) {
                        return helpers._numberFormatter(item);
                    },
                    labelExtent: 40,
                    labelLeftMargin: 5
                }];
            },

            _getVolumeChartSeries: function () {
                return [{
                    type: "column",
                    outline: "rgba(0,0,0,0)",
                    isHighlightingEnabled: true,
                    isTransitionInEnabled: true,
                    brush: "#777",
                    valueMemberPath: "Volume",
                    xAxis: "xAxis",
                    yAxis: "yAxis",
                    name: "indicatorSeries",
                    title: "Financial Indicator Data",
                    showTooltip: true,
                    tooltipTemplate: 'volumeChartTooltipTemplate'
                }];
            },

            _convertNumberToMonthName: function (monthNumber) {
                var monthNames = resources.MonthNames;
                return monthNames[monthNumber];
            },

            _numberFormatter: function (number) {
                var base = Math.floor(Math.log(Math.abs(number)) / Math.log(1000));
                if (base > 0 && base < 4) {
                    var number = Math.round(number / Math.pow(1000, base));
                    number += " KMB"[base];
                }
                return number;
            },

            getSelectableOptions: function () {
                return {
                    selected: function (e, ui) {

                        window.chartTypes['Type']        = $(ui.selected).data("type");
                        window.chartTypes['displayType'] = $(ui.selected).data("displaytype");
                        window.chartTypes['posColor']    = $(ui.selected).data("poscolor");
                        window.chartTypes['negColor']    = $(ui.selected).data("negcolor");
                        _removeOldSeries();
                        igFinance.changeTicker(window.selectedSymbol);
                        //helpers.changeChartsSeriesType(newType, displayType, posColor, negColor);
                        $("#priceChart").igDataChart("option", "brushes", [window.chartTypes['posColor']]);
                        $("#zoom").igZoombar("clone").igDataChart("option", "brushes", [ posColor]);
                    }
                };
            }
        };
    })();

    var ticker = "ASX.AX",
        ds = null,
        detailsDs = null;

    var currentDate;

    return {
        init: function () {
            setcounter=1;
            $('.progress').fadeIn();
            currentDate = new Date();
            var previousMonth, previousDay, previousYear, currentMonth, currentDay, currentYear;

            currentMonth = currentDate.getMonth();
            // currentDay = currentDate.getDate() - 1;
            currentDay = currentDate.getDate();
            currentYear = currentDate.getFullYear();

            previousMonth = currentDate.getMonth();
            previousDay = currentDate.getDate();

            if (window.seriesTypes === "first") {
                previousYear = currentDate.getFullYear() - 15;
                window.g = 'd';
            } else if (window.seriesTypes === "day") {
                previousYear = currentDate.getFullYear() - 15;
                window.g = 'd';
            } else if (window.seriesTypes === "weekly") {
                previousYear = currentDate.getFullYear() - 15;
                window.g = 'w';
            } else if (window.seriesTypes === "monthly") {
                previousYear = currentDate.getFullYear() - 15;
                window.g = 'm';
            } else if (window.seriesTypes === "quaterly") {
                previousYear = currentDate.getFullYear() - 1;
                window.g = 'd';
            } else if (window.seriesTypes === "2year") {
                previousYear = currentDate.getFullYear()-2;
            } else if (window.seriesTypes === "5year") {
                previousYear = currentDate.getFullYear()-5;
            } else if (window.seriesTypes === "max") {
                previousYear = currentDate.getFullYear()-15;
            }
            //console.log("http://pipes.yahooapis.com/pipes/pipe.run?_id=6fdd1b34b254706d8a4ca24c0701fec2&_render=json&s=" + window.selectedSymbol + "&a=" + previousMonth + "&b=" + previousDay + "&c=" + previousYear + "&d=" + currentMonth + "&e=" + currentDay + "&f=" + currentYear + "&g=" + window.g + "");
            //console.log("http://pipes.yahooapis.com/pipes/pipe.run?_id=98aa7fee9ad07efbdbde5699c53f1bcb&_render=json&s=" + window.selectedSymbol + "&a=" + previousMonth + "&b=" + previousDay + "&c=" + previousYear + "&d=" + currentMonth + "&e=" + currentDay + "&f=" + currentYear + "&g=d");
                
            //console.log("http://pipes.yahooapis.com/pipes/pipe.run?_id=66fdfbbf40eea28d28bac13047b811b1&_render=json&s=" + window.selectedSymbol + "&a=" + previousMonth + "&b=" + previousDay + "&c=" + previousYear + "&d=" + currentMonth + "&e=" + currentDay + "&f=" + currentYear + "&g=" + window.g + "");
            
            jQuery.support.cors = true; //IE9
            //console.log(window.selectedSymbol);
            $.get('stockScan.php', {symbolname : window.selectedSymbol}).done(function (data) {
                var returnData = JSON.parse(data);
                /*console.info(returnData);
                console.log(returnData.scanDate);*/
                window.scanResultDates = returnData.scanDate;

                ds = new $.ig.JSONPDataSource({
                    jsonp: "_callback",
                    dataSource: "http://pipes.yahooapis.com/pipes/pipe.run?_id=66fdfbbf40eea28d28bac13047b811b1&_render=json&s=" + window.selectedSymbol + "&a=" + previousMonth + "&b=" + previousDay + "&c=" + previousYear + "&d=" + currentMonth + "&e=" + currentDay + "&f=" + currentYear + "&g=" + window.g + "",
                    callback: igFinance.render,
                    schema: helpers.getDataSchema(),
                    sorting: {
                        type: "local"
                    }
                });
                ds.dataBind();
            });
        },
        
        getDataView: function () {
            
            window.sourceDetails = ds.dataView();
            
            var datanewview = ds.dataView();
            
            if(setcounter === 1) {
        	 if (window.seriesTypes === "first" || window.seriesTypes === "day" ) {
             	var today = new Date();
             	cmonth = today.getMonth()+1;
                cmonth = cmonth >=10 ? cmonth : '0'+cmonth;
                 cyear = today.getFullYear();
                 
                 day1 = today.getDate() + 1;
                 day1 = day1 >=10 ? day1 : '0'+day1;
                 day1 = cyear+'-'+cmonth+'-'+day1;
                // console.log('new date1->'+ day1);
                 newstrngdata = {"Date":day1,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 
                 day2 = today.getDate() + 2;
                 day2 = day2 >=10 ? day2 : '0'+day2;
                 day2 = cyear+'-'+cmonth+'-'+day2;
                 //console.log('new date2->'+ day2);
                 newstrngdata1 = {"Date":day2,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 
                 day3 = today.getDate() + 3;
                 day3 = day3 >=10 ? day3 : '0'+day3;
                 day3 = cyear+'-'+cmonth+'-'+day3;
                // console.log('new date3->'+ day3);
                 newstrngdata2 = {"Date":day3,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 
                 day4 = today.getDate() + 4;
                 day4 = day4 >=10 ? day4 : '0'+day4;
                 day4 = cyear+'-'+cmonth+'-'+day4;
                 //console.log('new date4->'+ day4);
                 newstrngdata3 = {"Date":day4,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                
                datanewview.push(newstrngdata);
                datanewview.push(newstrngdata1);
                datanewview.push(newstrngdata2);
                datanewview.push(newstrngdata3);
                setcounter = 2;

             }else if (window.seriesTypes === "weekly") {
             	
             	var today = new Date();
             	cmonth = today.getMonth()+1;
                cmonth = cmonth >=10 ? cmonth : '0'+cmonth;
                cyear = today.getFullYear();
                 
                 day1 = today.getDate() + 7;
                 day1 = day1 >=10 ? day1 : '0'+day1;
                 day1 = cyear+'-'+cmonth+'-'+day1;
                 newstrngdata = {"Date":day1,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 
                 day2 = today.getDate() + 14;
                 day2 = day2 >=10 ? day2 : '0'+day2;
                 day2 = cyear+'-'+cmonth+'-'+day2;
                 newstrngdata1 = {"Date":day2,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 
                 day3 = today.getDate() + 21;
                 day3 = day3 >=10 ? day3 : '0'+day3;
                 day3 = cyear+'-'+cmonth+'-'+day3;
                 newstrngdata2 = {"Date":day3,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 

                datanewview.push(newstrngdata);
                datanewview.push(newstrngdata1);
                datanewview.push(newstrngdata2);
                 
             } if (window.seriesTypes === "monthly") {
             	
             	var today = new Date();
             	cday = today.getDate();
                cday = cday >=10 ? cday : '0'+cday;
                cyear = today.getFullYear();
                 
                 month1 = today.getMonth() + 2;
                 month1 = month1 >=10 ? month1 : '0'+month1;
                 month1 = cyear+'-'+month1+'-'+cday;
                 newstrngdata = {"Date":month1,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 
                 month2 = today.getMonth() + 3;
                 month2 = month2 >=10 ? month2 : '0'+month2;
                 month2 = cyear+'-'+month2+'-'+cday;
                 newstrngdata1 = {"Date":month2,"Open":null,"High":null,"Low":null,"Close":null,"Volume":null};
                 
                datanewview.push(newstrngdata);
                datanewview.push(newstrngdata1);
                setcounter = 2;

             } /*else if (window.seriesTypes === "quaterly") {
                 previousYear = currentDate.getFullYear() - 1;
                 window.g = 'd';
             }*/
         }
            //console.log(window.seriesTypes,datanewview);
            
            return datanewview;
        },

        getDetailsDataView: function () {
            return detailsDs.dataView()[0];
        },

        getTicker: function () {
            return ticker;
        },

        sortDataSource: function () {
            ds.sort([{ fieldName: "Date" }], "asc", false);
        },

        formatDataSourceVolume: function () {
            var newDataView = igFinance.getDataView();
                   
            for (var i = 0; i < newDataView.length; i++) {
                newDataView[i].Volume = helpers._numberFormatter(newDataView[i].Volume);
            }
           
            
            //console.log('fdf',newDataView);
        },

        initDetailsDataSource: function () {
            //Add the additional details Info on top of the Dashboard
            detailsDs = new $.ig.JSONPDataSource({
                jsonp: "_callback",
                responseDataKey: "value.items",
                dataSource: "http://pipes.yahooapis.com/pipes/pipe.run?_id=3e1b7fc9a1a63ea0772d20ce4573d792&_render=json&symbol=" + igFinance.getTicker(),
                callback: function () {
                    if (igFinance.getDetailsDataView() === undefined) {
                        $('.progress').fadeIn();
                    } else {
                        $('.progress').fadeOut();
                        helpers.updateDetailsDataView(igFinance.getDetailsDataView());
                        $("#stockDetails").html($.ig.tmpl($("#stockDetailsTemplate").html(), igFinance.getDetailsDataView()));
                        $("#stockdattime").html($.ig.tmpl($("#stockDateTemplate").html(), igFinance.getDetailsDataView())+'AEST');
                        $("#tab1Name").html($.ig.tmpl($("#tab1Template").html(), igFinance.getDetailsDataView()));
                    }
                    $("#priceChart").igDataChart("option", "brushes", [ $('.ui-selected').attr("data-poscolor")]);
                }
            });
            detailsDs.dataBind();
        },

        changeTicker: function (symbol) {
            
            var isTickerValid = symbol!=='' ?  true : false;
            if (isTickerValid) {
                ticker = symbol;
                window.gridvar = true;
                
                console.log('change ticker',window.gridvar);

                window.selectedSymbol = symbol;
                $("#zoom").igZoombar("zoom", 100, 100);
                igFinance.init();
                
            }
            else{
                $("#js-invalid-ticker").css("display", "block");
            }
        },

        render: function () {
            //console.log(igFinance.getDataView());
            var isDataAvailable = igFinance.getDataView().length > 0;
            //var isDialogOpen = $("#dialog").hasClass("ui-igdialog-content") ? ($("#dialog").igDialog("option", "state") === "opened") : false;
            
            if (!isDataAvailable && isDialogOpen) {
                    $("#js-invalid-ticker").css("display", "block");
            } else if (!isDataAvailable) {
                $('.progress').fadeIn();
            } else {
//                if (isDialogOpen) {
//                    //$("#dialog").igDialog("close");
//                    $("#js-invalid-ticker").css("display", "none");
//                }
                $('.progress').fadeOut();
                igFinance.initDetailsDataSource();
                helpers.takeTimeSnapShot();
                helpers.localize();

                igFinance.sortDataSource();
                igFinance.initializeCharts();
                igFinance.formatDataSourceVolume();
            }
        },

        initializeCharts: function () {
            var priceChartOptions = helpers._getPriceChartOptions();
            $("#priceChart").igDataChart(priceChartOptions);
            
            var indicatorCharOptions = helpers._getIndicatorChartOptions();
            $("#indicatorChart").igDataChart(indicatorCharOptions);

            var volumeChartOptions = helpers._getVolumeChartOptions();
            $("#volumeChart").igDataChart(volumeChartOptions);

            var indicatorComboOptions = helpers._getIndicatorComboOptions();
            $("#indicatorCombo").igCombo(indicatorComboOptions);

            var periodSliderOptions = helpers._getPeriodSliderOptions();
            $("#periodSlider").slider(periodSliderOptions);

            var selectableOptions = helpers.getSelectableOptions();
            $("#selectable").selectable(selectableOptions);

            $("#indicatorCombo").data("igCombo").fieldElem.on("click", function (e) {
                $(this).select();
            });
            
            
            var seriesvl = $("#volumeChart").igDataChart("option", "series");
            
            //console.log(seriesvl);
            
            var desiredZoombarHeight = 0.10 * $(window).height();
            if ($("#zoom_zoombar_container").length > 0) {
                $("#zoom").igZoombar("clone").igDataChart({
                    dataSource: igFinance.getDataView(),
                    defaultZoomWindow: {
//                        left: 69,
//                        width: 29
                        left: 100,
                        width: 100
                    }
                    //axes: helpers._getPriceChartAxes(),
                    //series: helpers.getSplineAreaSeries("#00AADE"),
                });
            } else {
                $("#zoom").igZoombar({
                    target: $("#priceChart"),
                    //target: $("#volumeChart"),
                    height: desiredZoombarHeight,
                    defaultZoomWindow: {
//                        left: 69,
//                        width: 29
                        left: 100,
                        width: 100
                    }
                    
                   // zoomWindowMoveDistance: 10
                });
            }
            //console.log($('#stockDetails').outerHeight());

        },
        openDialog: function (id) {
            $("#" + id).igDialog({
                state: "opened",
                draggable: false,
                resizable: false
            });

        },
         
        resizeCharts: function () {
            //console.log($(window).height());
            var windowHeight = $(window).height() - 200;
            var desiredHeight = 0.65 * windowHeight;
            if ($("#priceChart").children().length !== 0) {
                window.volumeOpen === 'yes' ? $("#priceChart").igDataChart("option", "height", desiredHeight) : $("#priceChart").igDataChart("option", "height", windowHeight);
                $("#indicatorChart").igDataChart("option", "height", 0.2 * windowHeight);
                $("#volumeChart").igDataChart("option", "height", 0.3 * windowHeight);
                if ($("#zoom_zoombar_container").length === 0) {
                    $("#zoom").igZoombar("option", "height", 0.10 * windowHeight);
                }
            }
        },

      /*  showInfoDialog: function () {
            var element = "about-dialog";
            var ShowcaseInfo = resources.ShowCaseInfo;
            $("body").append("<div id='" + element + "' style='display:none;'>" + ShowcaseInfo +"</div>");

            $("#" + element).igDialog({
                state: "opened",
                modal: true,
                draggable: false,
                resizable: false,
                zIndex: 10000000,
                height: "507px",
                width: "700px",
                dialogClass: "about-dialog",
                stateChanging: function (evt, ui) {
                    // Check the igDialog state  
                    if (ui.action === "close") {
                        $("#" + element).igDialog("destroy");
                        $("#" + element).remove();
                    }
                }
            });

            $("#barcode").igQRCodeBarcode({
                height: "66px",
                width: "66px",
                errorCorrectionLevel: "low",
                barsFillMode: "ensureEqualSize",
                stretch: "none",
                data: document.URL
            });
        },*/

        loadResources: function () {
            // private variables
            var instance;

            // private methods
            var init = function () {
                var pathToResources = [
                    config.resources.folder,
                    config.language,
                    config.resources.file
                ].join("/");

                return $.getScript(pathToResources);
            };

            if (!instance) {
                instance = init();
            }

            return instance;
        }

    };
})();

//First time init
$(window).load(function () {
    igFinance.loadResources().done(function () {
        igFinance.init();
    });
});

//Document listeners
$(function () {
    $("#tabs").tabs();  


    settoday = new Date();
    $( "#chartDateSelect" ).datepicker({
      maxDate: "m w y d",
      minDate: new Date(1999, 1 - 1, 1),
      beforeShowDay: $.datepicker.noWeekends
    });
    $('#chartDateSelect').datepicker('setDate', settoday);
    
    //$("#openDialog").igButton({ labelText: "Open Dialog" });
    dwidth = $(window).width();
    dwidth = parseInt(dwidth/2);
    
    dheight = $(window).height();
    dheight = parseInt(dheight/2);
    
    $("#chartlistdialog").igDialog({
        imageClass: "ui-icon ui-icon-flag",
        closeButtonTitle: "Close Dialog Window",
        minimizeButtonTitle: "Minimize Dialog Window",
        maximizeButtonTitle: "Maximize Dialog Window",
        //pinButtonTitle: "Pin Dialog Window",
        unpinButtonTitle: "Unpin Dialog Window",
        restoreButtonTitle: "Restore Dialog Window",
        showMinimizeButton: true,
        showMaximizeButton: true,
        closeOnEscape : true,
        resizable : true,
        headerText : "Trade Table",
//        showPinButton: true,
        height: dheight+100,
        width: dwidth+100
    });
    $("#chartlistdialog").igDialog("close");
    $('#chartlistopendialog').on({
        click: function () {
            // Open the igDialog
            $("#chartlistdialog").igDialog("open");
        }
    });  

    $("#watchlistdialog").igDialog({
        imageClass: "ui-icon ui-icon-flag",
        closeButtonTitle: "Close Dialog Window",
        minimizeButtonTitle: "Minimize Dialog Window",
        maximizeButtonTitle: "Maximize Dialog Window",
        //pinButtonTitle: "Pin Dialog Window",
        unpinButtonTitle: "Unpin Dialog Window",
        restoreButtonTitle: "Restore Dialog Window",
        showMinimizeButton: true,
        showMaximizeButton: true,
        closeOnEscape : true,
        resizable : true,
        headerText : "Watch List",
//        showPinButton: true,
        height: dheight,
        width: dwidth
    });
    $("#watchlistdialog").igDialog("close");
    $('#watchlistbutton').on({
        click: function () {
            // Open the igDialog
            $("#watchlistdialog").igDialog("open");
        }
    });  
    
    $("#portfoliodialog").igDialog({
        imageClass: "ui-icon ui-icon-flag",
        closeButtonTitle: "Close Dialog Window",
        minimizeButtonTitle: "Minimize Dialog Window",
        maximizeButtonTitle: "Maximize Dialog Window",
        //pinButtonTitle: "Pin Dialog Window",
        unpinButtonTitle: "Unpin Dialog Window",
        restoreButtonTitle: "Restore Dialog Window",
        showMinimizeButton: true,
        showMaximizeButton: true,
        closeOnEscape : true,
        resizable : true,
        headerText : "My PortFolio",
//        showPinButton: true,
        height: dheight,
        width: dwidth
    });
    $("#portfoliodialog").igDialog("close");
    $('#portfoliobutton').on({
        click: function () {
            // Open the igDialog
            $("#portfoliodialog").igDialog("open");
        }
    });  
    
    
});

$(window).resize(function () {
    igFinance.resizeCharts();
});

/*$("#js-chart-switch").click(function () {
    $("#seriesSwitch").toggle("fast");
});*/

$("#js-info").click(function () {
    $("#info-screen").toggle("fast");
});

//$("#js-about").click(function () {
//    igFinance.showInfoDialog();
//});

// $(document).click(function (e) {
   /* var isSeriesSwitcherOpen = e.target.id != 'seriesSwitch' && !e.target.className.contains('icon-chart-switch') && $("#seriesSwitch")[0].style.display != "none";
    var isInfoWindowOpen = e.target.id != 'info-screen' && !e.target.className.contains('icon-info') && $("#info-screen").css('display') != "none";

    if (isSeriesSwitcherOpen) {
        $("#seriesSwitch").toggle("fast");
    }
    if (isInfoWindowOpen) {
        $("#info-screen").toggle("fast");
    }
});
*/