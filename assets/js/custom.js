performancedatearr = [];
performancetimearr = [];

$("#ticker").change(function () {
    window.trendLineType = 'none';
    window.trendLinePeriod = '';
    igFinance.changeTicker($(this).val());
});

/*$("#js-indicator-period").click(function () {
    igFinance.openDialog('indicatorDialog');
});

$(document).on("click", "#js-change-ticker-button", function () {
    igFinance.openDialog('dialog');
});*/

/**/
var wdispflag = false;
$("#txtTicker").autocomplete({
        source: function (request, response) {
                            var query=request.term;  
                            $.ajax({
                                      type: "GET",
                                      url: "http://d.yimg.com/autoc.finance.yahoo.com/autoc",
                                      data: {query: query},
                                      dataType: "jsonp",
                                      jsonp : "callback",
                                      jsonpCallback: "YAHOO.Finance.SymbolSuggest.ssCallback"
                                  });
                                  // call back function
                        YAHOO.Finance.SymbolSuggest.ssCallback = function (data) {           
                                var suggestions = [];
                                $.each(data.ResultSet.Result, function(i, val) {
                                        suggestions.push({ label: val.name+"("+val.symbol+")", value: val.symbol });
                                    // suggestions.push({ label: val.symbol, value: val.symbol });
                                });
                                response(suggestions);
                        };
        },
        minLength: 1,
        select: function (event, ui) {
                    $("#txtTicker").val(ui.item.value.split("#")[0]);
                    // igFinance.changeTicker(ui.item.value.split("#")[0], day, month, year);
                    //window.seriesTypes = 'first';
                    wdispflag = false;
                    
                    $('.watchchartsymb').each(function(){
                        symbol = $(this).attr('data-symbol');
                        name = $(this).attr('data-name');
                        if(ui.item.value.split("#")[0] === symbol){
                            console.log(name+' ( '+symbol+' )');
                            $('.watchchartsymb').removeClass('watchSelected');
                            $(this).addClass('watchSelected');
                            $('.watDisplay').html(name+' ( '+symbol+' ) ');
                            wdispflag = true;
                        }else{
                            if(!wdispflag){
                                $('.watchchartsymb').removeClass('watchSelected');
                                $('.watDisplay').html('');
                            }
                        }
                    });
                    window.trendLineType = 'none';
                    window.trendLinePeriod = '';
                    igFinance.changeTicker(ui.item.value.split("#")[0]);
        }
});

$('#YhFinanceSrch').submit(function(e){
    e.preventDefault();
    window.trendLineType = 'none';
    window.trendLinePeriod = '';
    window.seriesTypes = 'first';
    igFinance.changeTicker($("#txtTicker").val());
    wdispflag = false;
    
    $('.watchchartsymb').each(function(){
        symbol = $(this).attr('data-symbol');
        name = $(this).attr('data-name');
        
        if($("#txtTicker").val() === symbol){
            console.log(name+' ( '+symbol+' )');
            $('.watchchartsymb').removeClass('watchSelected');
            $(this).addClass('watchSelected');
            $('.watDisplay').html(name+' ( '+symbol+' )');
            wdispflag = true;
        }else{
            if(!wdispflag){
                $('.watchchartsymb').removeClass('watchSelected');
                $('.watDisplay').html('');
            }
        }
    });
});

$('.zoomMinus').click(function(e){
    e.preventDefault();
    newWidth = $("#priceChart").igDataChart("option", "windowRect").width;
    newLeft = $("#priceChart").igDataChart("option", "windowRect").left;
    // $("#zoom").igZoombar("zoom", (newLeft * 100), (newWidth * 100)+10);
//    console.log('newWidth->',newWidth,'newLeft->',newLeft);
    $("#zoom").igZoombar("zoom", 100, (newWidth * 100)+10);
});
$('.zoomPlus').click(function(e){
    e.preventDefault();
    newWidth = $("#priceChart").igDataChart("option", "windowRect").width;
    newLeft = $("#priceChart").igDataChart("option", "windowRect").left;
//    console.log('newWidth->',newWidth,'newLeft->',newLeft);
    $("#zoom").igZoombar("zoom", 100, (newWidth * 100)-10);
});

function onClick(button) {

    var newWidth,
        activeCss = "ui-state-active",
        viewport = $("#priceChart").igDataChart("option", "gridAreaRect"),
        leftMostValue = $("#priceChart").igDataChart("unscaleValue", "xAxis", viewport.left),
        zoomParams = {
                        left: $("#priceChart").igDataChart("option", "windowRect") ? $("#priceChart").igDataChart("option", "windowRect").left : 35,
                        width: $("#priceChart").igDataChart("option", "windowRect") ? $("#priceChart").igDataChart("option", "windowRect").width : 30
                    };

    if (button === "day"  || button === "weekly" || button === "monthly" || button === "quaterly") {
        newWidth = 100;
        newLeft  = 100;
    }
    
    
//    if (button === "day" ){
//        newWidth = 31;
//        newLeft = 70;
//    }
    
    
    igFinance.changeTicker(window.selectedSymbol);
    $("#zoom").igZoombar("zoom", newLeft, newWidth);
}

$('.rangetype li').click(function(e){
    $('.rangetype li').removeClass('selectedPrlist');
    $(this).addClass('selectedPrlist');
    str = $(this).attr('value');
    $('.price-stock').html($(this).attr('msgDisp'));
    window.seriesTypes = str;
    onClick(str);
    e.stopPropagation();
});

$(".off-button").show();

$(".vol-off").click(function(){
    window.volumeOpen ='yes';
    $(".off-button").show();
    $(".on-button").hide(); 
    $('#volumeChart').slideDown('slow');
    window.trendLineType = 'none';
    window.trendLinePeriod = '';
    igFinance.changeTicker(window.selectedSymbol);
});

$(".vol-on").click(function(){
    window.volumeOpen ='no';
    $(".on-button").show();
    $(".off-button").hide();
    $('#volumeChart').slideUp('slow');
    window.trendLineType = 'none';
    window.trendLinePeriod = '';
    igFinance.changeTicker(window.selectedSymbol);
});

$(".listing-graph, .lists li").click(function(){
    $(".lists").slideToggle("slow");
});

$('.vol-graph').click(function(){
	var status = $(this).attr('data-status');
	newStatus = (status === 'on') ? 'off' : 'on';
	if(status === 'on'){
		$(this).attr('data-status','off');
                $(this).css('background-position','0 100%');
		window.volumeOpen ='no';
		$('#volumeChart').slideUp('slow');
                window.trendLineType = 'none';
                window.trendLinePeriod = '';
		igFinance.changeTicker(window.selectedSymbol);
	}
	else{
		$(this).attr('data-status','on');
                $(this).css('background-position','0 0');
		window.volumeOpen ='yes';
                window.trendLineType = 'none';
                window.trendLinePeriod = '';
                $('#volumeChart').slideDown('slow');
                igFinance.changeTicker(window.selectedSymbol);
	}
	
});

/**************************************
    *  Trade List Icon Popup  *
 *************************************/
window.tradesymbcount = 0;


$('.pre-next .left-part').click(function(){
  totallngth = parseInt($('.tradetable ul').length - 1);
  window.tradesymbcount--;
  window.tradesymbcount = window.tradesymbcount<=0 ? totallngth : window.tradesymbcount>totallngth ? 1 : window.tradesymbcount;
  slctsymb = $('.tradetable ul').eq(window.tradesymbcount).find('.tradetablesymb').text();
  window.selectedSymbol = slctsymb !== '' ? slctsymb : slctsymb !== null ? slctsymb : window.selectedSymbol;
  window.seriesTypes = 'first';
  window.trendLineType = 'none';
  window.trendLinePeriod = '';
  if(window.selectedSymbol !== '' || window.selectedSymbol!==null)
    igFinance.changeTicker(window.selectedSymbol);
});

$('.pre-next .right-part').click(function(){
   totallngth = parseInt($('.tradetable ul').length - 1);
   window.tradesymbcount++;
   window.tradesymbcount = window.tradesymbcount<=0 ? totallngth : window.tradesymbcount>totallngth ? 1 : window.tradesymbcount; 
   slctsymb = $('.tradetable ul').eq(window.tradesymbcount).find('.tradetablesymb').text();
   window.selectedSymbol = slctsymb !== '' ? slctsymb : slctsymb !== null ? slctsymb : window.selectedSymbol;
   window.seriesTypes = 'first';
   window.trendLineType = 'none';
   window.trendLinePeriod = '';
   if(window.selectedSymbol !== '' || window.selectedSymbol!==null)
    igFinance.changeTicker(window.selectedSymbol);
});


$('#stockcalculate').click(function(){

   var stocktablechoose = $('#stocktablechoose').val();
   var chartDateSelect = $('#chartDateSelect').val();
   
   $('.closingdatetrade').html('Closing Date :-'+chartDateSelect+' 4:00 PM');
   $('.trdeloader').fadeIn();
  // $(this).attr('disabled',true);
   // $("#tradesymbolsGrid, #perfrmSymbolGrid").html('');
   
    $.get('stockListTrade.php', { selectedDate: chartDateSelect, selectedTable: stocktablechoose }).done(function (data) {
        console.log(data);
        var datagth = JSON.parse(data);
        var datagthp = JSON.parse(datagth);
        /*console.log(datagthp);
        console.log(datagthp.performance);*/
        $('.trdeloader').hide();
        //$('#stockcalculate').attr('enabled',true);

        $("#tradesymbolsGrid").igGrid({
            autoGenerateColumns: false,
            width: "100%",
            columns: [
                { headerText: "Code", key: "symbol", dataType: "string", width: "20%" },
                { headerText: "Name", key: "name", dataType: "string", width: "30%" },
                { headerText: "Open", key: "open", dataType: "string", width: "20%" },
                { headerText: "High", key: "daillyhigh", dataType: "string", width: "20%" },
                { headerText: "Low", key: "dailylow", dataType: "string", width: "20%" },
                { headerText: "Last", key: "lasttradeamount", dataType: "string", width: "20%" },
            ],
            dataSource: datagthp.scanning,
            responseDataKey: "results",
            features: [
                {
                    name: "Sorting",
                    type: "local"
                }
            ]
        });
        
        $("#perfrmSymbolGrid").igGrid({
            autoGenerateColumns: false,
            width: "100%",
            columns: [
                { headerText: "Code", key: "symbol", dataType: "string", width: "20%" },
                { headerText: "Name", key: "name", dataType: "string", width: "30%" },
                { headerText: "Open", key: "open", dataType: "string", width: "20%" },
                { headerText: "High", key: "daillyhigh", dataType: "string", width: "20%" },
                { headerText: "Low", key: "dailylow", dataType: "string", width: "20%" },
                { headerText: "Last", key: "lasttradeamount", dataType: "string", width: "20%" },
                { headerText: "Triggered Date Share Price", key: "selected_trade_close", dataType: "string", width: "30%" },
                { headerText: "%(respect of triggered date)", key: "perfget_percent", dataType: "string", width: "30%" },
            ],
            dataSource: datagthp.performance,
            responseDataKey: "results",
            features: [
                {
                    name: "Sorting",
                    type: "local"
                }
            ]
        });
    });
   
});

$('.watchlistsubgroup').each(function(){
    $(this).find("li:last").addClass("lastChild");
});

/************************************************************************************************************
        getresults    performanceresults
/***********************************************************************************************************/

/**  Tab View of trade list**/

    $('.tabletabslist li').click(function(){
        $('.tabletabslist li').removeClass('tradetabact');
        $(this).addClass('tradetabact');
        $('.tabletbscont').hide();
        idopen = $(this).attr('data-id');
        $('#'+idopen).show();
    });

/**  Tab View of trade list end here**/


/************************************************
    *  Trade List Icon End Here    *
 ********************************************/

/*********************************************
 *    30 Days Average Button Features   *
 **********************************************/
$('.average').click(function(){
    $(this).toggleClass('avgActive');
    if($(this).hasClass('avgActive')){
        window.trendLineType = 'simpleAverage';
        window.trendLinePeriod = 6;
        //console.log('Active',window.trendLineType);
    }
    else{
        window.trendLineType = 'none';
        window.trendLinePeriod = '';
        //console.log('Deactive',window.trendLineType);
    }
    igFinance.changeTicker(window.selectedSymbol);
});
/*********************************************
 *    30 Days Average Button Features End  *
 **********************************************/

/*********************************************
       *   Watch List Button Feature    *
 **********************************************/
//$('.watchlstbtn').click(function(){
//   $('.chartoverlay, .watchlistcont').show();
//});
//$('.watchlistcontClose').click(function(){
//   $('.chartoverlay, .watchlistcont').hide();
//});
function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) === -1) result.push(e);
  });
  return result;
}
$('#watchlistselect').change(function(){
    watchtable = $(this).val();
    if(watchtable != '' || watchtable!=null){
       watchtableval = $('#'+watchtable).val();
       watchpipeurl = 'http://pipes.yahoo.com/pipes/pipe.run?_id=d1a8c7c7885da588a6fc6e497578ff72&_render=json&s='+watchtableval;
       closingdatearr = [];
       closingtimearr = [];
       
       $.ajax({
           url     :    watchpipeurl,
           context :    document.body
        }).done(function(watchdata) {
            //console.log(watchdata.value.items);
            var watchitems = watchdata.value.items;
            for(var i in watchitems){
                currclose = watchitems[i].last;
                prevclose = watchitems[i].prevclose;
                watchget_percent = parseFloat((parseFloat(currclose - prevclose) / prevclose) * 100).toFixed(2);                               
                watchget_value = parseFloat(currclose - prevclose).toFixed(2);
                watchget_value = watchget_value >= 0 ? '<label class="upgreen">'+watchget_value+'</label>' : '<label class="downred">'+watchget_value+'</label>';
                watchget_percent = watchget_percent >= 0 ? '<label class="upgreen">'+watchget_percent+'</label>' : '<label class="downred">'+watchget_percent+'</label>';
                
                watchitems[i].checkvalue = watchget_value;
                watchitems[i].checkpercentage = watchget_percent;
                
                closingdatearr.push(watchitems[i].date);
                closingtimearr.push(watchitems[i].time);
            }
            //console.log(closingtimearr);
            
            closingdatearr = unique(closingdatearr);
            closingdatearr.sort();
            closingdatearrlnth = closingdatearr.length;
            
            closingtimearr = unique(closingtimearr);
            closingtimearr.sort();
            closingtimearrlnth = closingtimearr.length;
            
            $('.closingdatewatch').html('Closing Date :-'+closingdatearr[closingdatearrlnth-1]+' 4:00 PM');
            
            console.log(watchitems);

            $("#grid").igGrid({
                autoGenerateColumns: false,
                width: "100%",
                columns: [
                    { headerText: "Symbol", key: "symbol", dataType: "string", width: "20%" },
                    { headerText: "Name", key: "name", dataType: "string", width: "20%" },
                    { headerText: "%", key: "checkpercentage", dataType: "string", width: "10%" },
                    { headerText: "+ / -", key: "checkvalue", dataType: "string", width: "10%" },
                    { headerText: "Open", key: "open", dataType: "number", width: "10%" },
                    { headerText: "High", key: "high", dataType: "number", width: "10%" },
                    { headerText: "Low", key: "low", dataType: "number", width: "10%" },
                    { headerText: "Last", key: "last", dataType: "number", width: "10%" },

                ],
                dataSource: watchitems,
                responseDataKey: "results",
                features: [
                    {
                        name: "Sorting",
                        type: "local"
                    }
                ]
            });
        });
    }
});

/************************************************************************************************************
        watchlistspopfunc
/***********************************************************************************************************/
         
 /**My performance button*/
 
/*$('.myperformbtn').click(function(){
   $('.chartoverlay, .myperformcont').show();
});
$('.myperformcontClose').click(function(){
   $('.chartoverlay, .myperformcont').hide();
});*/

/*****************************************************************
 * 
 *****************************************************************/
var watchflg = 1;
$('.watchopen').click(function(){
    if(watchflg === 1){
        $(this).css('background-position','0 -7px');
        watchflg = 0;
    } else{
        $(this).css('background-position','0 0');
        watchflg = 1;
    }
   $('.accord').slideToggle();
   
});

$('.watchspn').click(function(){
    $(this).toggleClass('watchspnact');
    $(this).parent().next('.watchlistchart').slideToggle();
});


$('.watchchartsymb').click(function(e){
    e.preventDefault();
    
    symbol = $(this).attr('data-symbol');
    name = $(this).attr('data-name');
    window.trendLineType = 'none';
    window.trendLinePeriod = '';
    $("#txtTicker").val('');
    $('.watDisplay').html(name+' ( '+symbol+' ) ');
    $('.watchchartsymb').removeClass('watchSelected');
    //window.seriesTypes = 'first';
    //console.log(symbol);
    $(this).addClass('watchSelected');
    window.selectedSymbol = symbol;
    igFinance.changeTicker(symbol);
});



$('.wtchSld .next').click(function(e){
    e.preventDefault();
    
    wnextflag = 1;
    window.react = false;
    window.trendLineType = 'none';
    window.trendLinePeriod = '';
    $("#txtTicker").val('');
    $('.watchchartsymb').each(function(){
        if($(this).hasClass('watchSelected')){
            if(wnextflag === 1){
                $('.watchchartsymb').removeClass('watchSelected');
                cursel = $('.watchchartsymb').index(this);
                if(cursel === ($('.watchchartsymb').length - 1)) {

                    $('.watchchartsymb :eq(0)').addClass('watchSelected');
                    symbol = $('.watchSelected').attr('data-symbol');
                    name = $('.watchSelected').attr('data-name');
                    $('.watDisplay').html(name+' ( '+symbol+' ) ');
                    window.selectedSymbol = symbol;
                    igFinance.changeTicker(symbol);
                    wnextflag = 2;
                   // return false;
                }
                else {
                    nextsel = cursel + 1;
                    $('.watchchartsymb :eq('+nextsel+')').addClass('watchSelected');
                    symbol = $('.watchSelected').attr('data-symbol');
                    name = $('.watchSelected').attr('data-name');
                    $('.watDisplay').html(name+' ( '+symbol+' ) ');
                    window.selectedSymbol = symbol;
                    igFinance.changeTicker(symbol);
                    wnextflag = 2;
                   // return false;
                }
            }
        }
    });
});
$('.wtchSld .prev').click(function(e){
    e.preventDefault();
    wprevflag = 1;
    window.react = false;
    window.trendLineType = 'none';
    window.trendLinePeriod = '';
    $("#txtTicker").val('');
    $('.watchchartsymb').each(function(){
         if($(this).hasClass('watchSelected')){
            if(wprevflag === 1){
                 $('.watchchartsymb').removeClass('watchSelected');
                 cursel = $('.watchchartsymb').index(this);
                 if(cursel === 0) {
                     nextsel = $('.watchchartsymb').length - 1;
                     $('.watchchartsymb :eq('+nextsel+')').addClass('watchSelected');
                     symbol = $('.watchSelected').attr('data-symbol');
                     name = $('.watchSelected').attr('data-name');
                     $('.watDisplay').html(name+' ( '+symbol+' ) ');
                     window.selectedSymbol = symbol;
                     igFinance.changeTicker(symbol);
                     wprevflag = 2;
                     // return false;
                 }
                 else {
                     nextsel = cursel - 1;
                     $('.watchchartsymb :eq('+nextsel+')').addClass('watchSelected');
                     symbol = $('.watchSelected').attr('data-symbol');
                     name = $('.watchSelected').attr('data-name');
                     $('.watDisplay').html(name+' ( '+symbol+' ) ');
                     window.selectedSymbol = symbol;
                     igFinance.changeTicker(symbol);
                     // return false;
                     wprevflag = 2;
                 }
             }
         }
     });
});

$( document ).ready(function() {
    $(".equity_open").igGrid({
        autoGenerateColumns: false,
        width: "100%",
        columns: [
            { headerText: "Date", key: "symbol", dataType: "string", width: "20%" },
            { headerText: "Code", key: "name", dataType: "string", width: "30%" },
            { headerText: "Company", key: "open", dataType: "string", width: "20%" },
            { headerText: "QTY Stock", key: "daillyhigh", dataType: "string", width: "20%" },
            { headerText: "Avg. Price", key: "dailylow", dataType: "string", width: "20%" },
            { headerText: "Last Price", key: "lasttradeamount", dataType: "string", width: "20%" },
            { headerText: "Investment", key: "selected_trade_close", dataType: "string", width: "30%" },
            { headerText: "Total Value", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Brokerage", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Sector", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Weighting in Sector", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Weighting Cash + Portfoliio Net", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Weighting Portfolio Net", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Total", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "% Gain", key: "perfget_percent", dataType: "string", width: "30%" }
        ],
        //dataSource: datagthp.performance,
        responseDataKey: "results",
        features: [
            {
                name: "Sorting",
                type: "local"
            }
        ]
    });

    $(".sold_open").igGrid({
        autoGenerateColumns: false,
        width: "100%",
        columns: [
            { headerText: "Date", key: "symbol", dataType: "string", width: "20%" },
            { headerText: "Code", key: "name", dataType: "string", width: "30%" },
            { headerText: "Company", key: "open", dataType: "string", width: "20%" },
            { headerText: "QTY Stock", key: "daillyhigh", dataType: "string", width: "20%" },
            { headerText: "Avg. Price", key: "dailylow", dataType: "string", width: "20%" },
            { headerText: "Contracts", key: "lasttradeamount", dataType: "string", width: "20%" },
            { headerText: "Investment", key: "selected_trade_close", dataType: "string", width: "30%" },
            { headerText: "Brokerage", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "ACH Fees", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Strike", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Call Strike Cap Nett", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Original Investme nt +/- Inc costs", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Gain + / - if Exercised", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "% + / - if Exercised", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "% Gain", key: "perfget_percent", dataType: "string", width: "30%" }
        ],
        //dataSource: datagthp.performance,
        responseDataKey: "results",
        features: [
            {
                name: "Sorting",
                type: "local"
            }
        ]
    });

    $(".equity_closed").igGrid({
        autoGenerateColumns: false,
        width: "100%",
        columns: [
            { headerText: "Date Buy", key: "symbol", dataType: "string", width: "20%" },
            { headerText: "Date Sell", key: "name", dataType: "string", width: "30%" },
            { headerText: "Company", key: "open", dataType: "string", width: "20%" },
            { headerText: "QTY Stock", key: "daillyhigh", dataType: "string", width: "20%" },
            { headerText: "Avg. Purchase Price", key: "dailylow", dataType: "string", width: "20%" },
            { headerText: "Sale Price", key: "lasttradeamount", dataType: "string", width: "20%" },
            { headerText: "Investment", key: "selected_trade_close", dataType: "string", width: "30%" },
            { headerText: "Investme nt Value at sale", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Brokerage Buy", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Brokerage Sell", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "", key: "", dataType: "string", width: "30%" },
            { headerText: "", key: "", dataType: "string", width: "30%" },
            { headerText: "", key: "", dataType: "string", width: "30%" },
            { headerText: "Total", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "% Gain", key: "perfget_percent", dataType: "string", width: "30%" }
        ],
        //dataSource: datagthp.performance,
        responseDataKey: "results",
        features: [
            {
                name: "Sorting",
                type: "local"
            }
        ]
    });
    
    /*
    * Option positions CLOSED
    */
    $(".option_positionsC").igGrid({
        autoGenerateColumns: false,
        width: "100%",
        columns: [
            { headerText: "Date", key: "symbol", dataType: "string", width: "20%" },
            { headerText: "Buy / Expiry Date", key: "name", dataType: "string", width: "30%" },
            { headerText: "Company", key: "open", dataType: "string", width: "20%" },
            { headerText: "QTY", key: "daillyhigh", dataType: "string", width: "20%" },
            { headerText: "Sell Price", key: "dailylow", dataType: "string", width: "20%" },
            { headerText: "Contracts", key: "lasttradeamount", dataType: "string", width: "20%" },
            { headerText: "Buy Price", key: "selected_trade_close", dataType: "string", width: "30%" },
            { headerText: "Option Income", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Expired Value", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Brokerage SELL", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Brokerage BUY", key: "Brokerage_BUY", dataType: "string", width: "30%" },
            { headerText: "ACH Fees Sell", key: "ACH_Fees_Sell", dataType: "string", width: "30%" },
            { headerText: "ACH Fees Buy", key: "ACH_Fees_Buy", dataType: "string", width: "30%" },
            { headerText: "Total", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "% Gain", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "$ Gain", key: "perfget_percent", dataType: "string", width: "30%" }
        ],
        //dataSource: datagthp.performance,
        responseDataKey: "results",
        features: [
            {
                name: "Sorting",
                type: "local"
            }
        ]
    });
    /*
    * Dividends Received
    */
    $(".dividends_received_inner").igGrid({
        autoGenerateColumns: false,
        width: "100%",
        columns: [
            { headerText: "Ex Div", key: "symbol", dataType: "string", width: "20%" },
            { headerText: "Code", key: "name", dataType: "string", width: "30%" },
            { headerText: "Company", key: "open", dataType: "string", width: "20%" },
            { headerText: "QTY Stock", key: "daillyhigh", dataType: "string", width: "20%" },
            { headerText: "Dividend", key: "dailylow", dataType: "string", width: "20%" },
            { headerText: "Total", key: "lasttradeamount", dataType: "string", width: "20%" },
            { headerText: "Franking Percent", key: "selected_trade_close", dataType: "string", width: "30%" },
            { headerText: "Pay Date", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Comments", key: "perfget_percent", dataType: "string", width: "30%" },
            { headerText: "Total", key: "perfget_percent", dataType: "string", width: "30%" }
        ],
        //dataSource: datagthp.performance,
        responseDataKey: "results",
        features: [
            {
                name: "Sorting",
                type: "local"
            }
        ]
    });

    
});

