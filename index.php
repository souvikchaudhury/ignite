<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=10; IE=9;">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300' rel='stylesheet' type='text/css'>
    <link href="assets/css/style.css" rel="stylesheet" />
    <!-- <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"> -->
    <link href="igniteui/css/structure/infragistics.css" rel="stylesheet" />
    <link href="igniteui/css/themes/infragistics/infragistics.theme.css" rel="stylesheet" /> 
    <!-- <link href="assets/css/media-queries.css" rel="stylesheet" />  -->
</head>
<body>
    <?php include_once('functions.php'); ?>
    
    <header>
        <!-- <span id="js-chart-switch" class="icon-chart-switch ui-sprite"></span> -->
        <div class="left-header-part">
            <div class="financeSrch">
                <form method="post" action="" id="YhFinanceSrch">
                    <input id="txtTicker" name="txtTicker"/>
                    <input type="submit" name="search" id="financeSrchSubmt" value="" />
                </form>
            </div>
         
            <div class="rangeLists">
                <ul class="chartlist1 rangetype">
                    <li value="day" msgDisp="Daily" class="selectedPrlist tooltips" >
                        D
                        <span>Daily</span>
                    </li>
                    <li value="weekly" msgDisp="" class="tooltips" >
                        W
                        <span>Weekly</span>
                    </li>
                    <li value="monthly" msgDisp="" class="tooltips" style="/*position: relative;*/">
                        M
                        <span>Monthly</span>
                    </li>
                    <!-- <li value="2year" msgDisp="">2Y</li>
                    <li value="5year" msgDisp="">5Y</li>
                    <li value="max" msgDisp="">Max</li>
                    <li value="day" msgDisp="Daily">D</li> -->
                                        
                    <!-- <li value="quaterly" msgDisp="">Q</li> -->
                </ul>
            </div>
            <div id="seriesSwitch">
                <ul id="selectable"> 
                    <!-- Using attribute selectors for these - should the data attributes be changed, make changes in css accordingly. -->
                    <li data-type="area" class="tooltips">
                        <span>Area</span>
                    </li>
                    <!--<li data-type="financial" data-displaytype="candlestick" data-poscolor="rgba(0,154,154,1)" data-negcolor="rgba(0,154,154,0.2)" style="width:62px;"><span>Candlestick</span></li>-->
                    <li data-type="financial" data-displaytype="candlestick" data-poscolor="rgba(0,204,0,0.8)" data-negcolor="rgba(255,0,0,0.8)" class="tooltips"><span>Candlestick</span></li>
                    <li class="ui-selected tooltips" data-type="financial" data-displaytype="ohlc" data-poscolor="rgba(0,204,0,1)" data-negcolor="rgba(255,0,0,1)"><span>OHLC</span></li>
                    <li data-type="line" class="tooltips"><span>Line</span></li>
                </ul>
            </div>
            <div class="zoomControl">
                <div class="zoomPlus tooltips"><span style="width: 45px;">Zoom In</span></div>
                <div class="zoomMinus tooltips"><span style="width: 55px;">Zoom Out</span></div>
            </div>
            
            <div class="volume-control">
                <!-- <input type="radio" name="volume" class="vol-off" value="val1">
                <input type="radio" name="volume" class="vol-on" value="val2">
                <div class="on-button"></div>
                <div class="off-button"></div> -->
                
                <div class="vol-graph tooltips" data-status="on"><span style="width: 40px;">Volume</span></div>
                <!--<span class="vol-text">VOL</span>-->
            </div>

            <div class="list-new">
                <div class="listing-graph">&nbsp;</div>
                <ul class="lists">
                    <li><span class="average">30 days Average</span></li>
                </ul>
            </div>

            <div class="chart-section">
                <div class="chartlist">
                   <a class="chartlistIcon tooltips" id="chartlistopendialog">
                       <span style="width: 75px; left: 6px; top:34px;">Trade Table</span>
                   </a>
                   <div class="chartoverlay" style="display:none"></div>
                   <div class="chartlistpanel black_option" id="chartlistdialog" style="display:none">
                       <div class="chartlistmenu">
                           Choose Date : <input type="text" name="" id="chartDateSelect" />
                           Choose Trade Table : 
                           <select id="stocktablechoose">
                                <?php tradetable_stock_options();  ?>
                               <!-- <option value="australian_50">ASX Top 50</option>
                               <option value="australian_200">ASX Top 200</option> -->
                           </select>
                           
                           <input type="button" class="" value="Calculate" id="stockcalculate"/>
                           <!-- <input type="button" class="performanceBtn" value="Performance Table" id="performanceTable"/> -->
                       </div>
                       <!--<div class="chartlistpanelClose"></div>-->
                       <div class="closingdatetrade">Closing Date :- </div>
                       <div class="clearboth"></div>
                       <div class="">
                           <ul class="tabletabslist">
                               <li data-id="scantradetable" class="tradetabact">Scanning</li>
                               <li data-id="perfrmnctadetable">Performance</li>
                           </ul>
                           <div id="scantradetable" class="tabletbscont">
                                <div class="clearboth"></div>
                                <div id="tradesymbolsGrid">
                                    <div class="trdeloader">
                                        <img src="assets/images/trade_perf_loader.gif" alt="">
                                    </div>
                                </div>
                           </div>
                           <div id="perfrmnctadetable" class="tabletbscont">
                                <div class="clearboth"></div>
                                <div id="perfrmSymbolGrid">
                                    <div class="trdeloader">
                                        <img src="assets/images/trade_perf_loader.gif" alt="">
                                    </div>
                                </div>
                           </div>
                       </div>
                   </div>
                 </div>
                 <div class="pre-next">
                     <div class="left-part tooltips"><span style="width: 47px;">Previous</span></div>
                    <div class="right-part tooltips"><span style="width: 25px;">Next</span></div>
                 </div>
                 <!--<div class="stocklistheading">Trade Table Lists</div>-->
            </div>
            
            <div class="watchlistdiv">
                <div class="tooltips" id="watchlistbutton">
                    <img src="assets/images/watchList.png" alt="" class="watchlstbtn" >
                    <span style="width: 60px;top:36px;">Watch Lists</span>
                </div>
                <div class="chartoverlay" style="display:none"></div>
                <div id="watchlistdialog" style="display: none;">
                    <!--  <div class="watchlistcont" style="display:none">-->
                    <div class="watchlistmenu">                      
                        Choose Watch List Table :-  
                        <select id="watchlistselect">
                            <?php  watchtable_stock_options();  ?>
                        </select>
                    </div>
                        <!--<div class="watchlistcontClose"></div>-->
                    <div class="closingdatewatch">Closing Date :- </div>
                    <div class="clearboth"></div>
                    <div id="grid"></div>
                    <!--</div>-->
                </div>
            </div>
            <div class="myperformance" style="float:left;">
                <div class="tooltips" id="portfoliobutton">
                    <img src="assets/images/myportfolio.png" alt="" class="myperformbtn">
                    <span style="width:65px;margin-top: 14px; margin-left: 7px;">My Portfolio</span>
                </div>
                <!-- <div class="chartoverlay" style="display:none"></div> -->
                <div style="display:none" id="portfoliodialog" class="black_option">
                    <!-- Portfolio Body -->
                    <div class="protfolioBody">
                        <div>
                            <a href="#" class="portfolio_buy">Buy</a>
                            <a href="#" class="portfolio_sell">Sell</a>
                        </div>
                        <div class="equuity_position">
                            <h3>Equity Positions OPEN</h3>
                            <div class="equity_open"></div>
                        </div>

                        <div class="sold_position">
                            <h3>Sold Option Positions OPEN</h3>
                            <div class="sold_open"></div>
                        </div>

                        <div class="equuity_positionC">
                            <h3>Equity positions CLOSED</h3>
                            <div class="equity_closed"></div>
                        </div>

                        <div class="option_positions">
                            <h3>Option positions CLOSED</h3>
                            <div class="option_positionsC"></div>
                        </div>

                        <div class="dividends_received">
                            <h3>Dividends Received</h3>
                            <div class="dividends_received_inner"></div>
                        </div>
                    </div>
                </div>
                <div style="display:none" id="portfolioFormdialog" class="black_option">
                    <!-- Portfolio Body -->
                    <div class="portfolio_form">
                        <form>
                            <p><input type="checkbox"> <b> Make IOS ready</b></p>
                            <p><label>Account Name:</label><select class="select-box"><option></option></select></p>
                            <p><label>Category:</label><span><input type="radio"> Equity</span><span><input type="radio"> Option</span></p>
                            <p><label>Action:</label><select class="select-box"><option></option></select></p>
                            <p><label>Instrument Coad:</label><select class="select-box"><option></option></select></p>
                            <p><label>Date:</label><input type="text" class="input-text"></p>
                            <p><label>Quantity:</label><input type="text" class="input-text" class="input-text"></p>
                            <p><label>Price:</label><input type="text" class="input-text"></p>
                            <p><label>Note:</label><textarea class="textarea"></textarea></p>
                            <p><span><input type="checkbox"> Included tred in reports</span><span><input type="checkbox"> Send email</span></p>
                            <fieldset>
                                <legend>Brokerage</legend>
                                <p><input type="checkbox"> Included in reports</p>
                                <p><label>Minimum Amount:</label><input type="text" class="input-text" class="input-text" class="input-text" class="input-text"></p>
                                <p><label>Precentage:</label><input type="text" class="input-text" class="input-text" class="input-text"></p>
                                <p><label>Minimum Bracket:</label><input type="text class="input-text" class="input-text"" class="input-text" class="input-text"></p>
                                <p><input type="radio"> Use calculated value:</p>
                                <p><label><input type="radio"> Use inputted value:</label><input type="text" class="input-text"></p>
                            </fieldset>
                            <p><input type="button" value="Add to Distribution Without Execution"><input type="button" value="Cancel"></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="right-header-part">
            <div class="watchList">
                <div class="wtchLeft">
                    <label>Watch Lists</label>
                    <span class="watchopen">more less</span>
                </div>
                <div class="watDisplay">ASX FPO (ASX.AX)</div>
                <div class="wtchSld">
                    <a href="#" class="prev">Prev</a>
                    <a href="#" class="next">Next</a>
                </div>
                <div class="wcsp"></div>
                <div class="accord" style="display: none;">
                    <ul class="watchListDropdown">
                        <?php watchlists_all_table(); ?>
                    </ul>
                </div>
            </div>
        </div>
        
    </header>
    <div style="display: none" id="seriesSwitch"> </div>
    <div style="display: none" id="info-screen"> </div>
    <div class="progress"> <img src="assets/images/progress.gif"></div>
    <div id="tabs">
        <ul style="display:none;">
            <li><a id="tab1Name" href="#tabs-1"></a></li>
            <!-- <li><a id="tab2Name" href="#tabs-2">Hello</a></li> -->
        </ul>
        <div id="tabs-1">
            <!-- BEGIN MAIN LAYOUT -->
            <div id="stockDetails" class="values-container"></div>
            <span class="stock-time" id="stockdattime"></span>
            <!-- <span class="price-stock stock-time">Daily</span> -->
            <div id="chartContainer">
                <div id="priceChart" style="margin-left: 25px;"> </div>
            </div>

            <div class="indicator-period" style="display:none;">
                <a href="#" id="js-indicator-period">
                    <span class="ui-sprite icon-gear"></span>
                    <span id="indicator-period-text"></span>
                    <span id="indicator-type" class="avt-value"></span><span class="avt-value">14</span>
                </a>
            </div>

            <div id="indicatorChart"  style="display:none;"></div>

            <div id="indicatorDialog" style="vertical-align: bottom; display: none;">
                <label id="js-select-indicator"></label>
                <div id="indicatorCombo"></div>
                <p>
                    <label id="js-period-slider"></label>
                    <label id="period">14</label>
                </p>
                <div id="periodSlider"></div>
            </div>

            <div id="volumeChart" style="margin-left: 25px; padding-bottom:0; padding-top:10px;">
                <!-- <a href="" id="volumeChartClose"></a> -->
            </div>
            <div id="zoom" style="display:none;"></div>
            <!-- <div id="zoom"></div> 
            <div id="dialog" style="vertical-align: bottom; display: none;">
                <label id="js-valid-ticker"></label>
                <input type="text" id="ticker" />
                <button type="submit">GO</button>
                <label id="js-invalid-ticker" class="decrease-value" style="display: none">Invalid Ticker Please Enter A Valid One</label>
            </div>-->
            <div id="noData"></div>
        </div>
        <!-- <div id="tabs-2"></div> -->
    </div>
    
    <!-- END MAIN LAYOUT -->
    <!-- Start tooltips -->
    <script id="volumeChartTooltipTemplate" type="text/x-jquery-tmpl">
        <div id="tooltip">
            <span> $${item.Volume} </span><br/>
            <div id="cut"> ${item.Date}</div>
        </div>
    </script>

    <script id="tooltipTemplate" type="text/x-jquery-tmpl">
        <ul class="tooltip-titles"><li>Date:</li><li>Open: </li><li>High: </li><li>Low: </li><li>Close: </li></ul><ul class="tooltip-values"><li>${item.Date}</li><li>${item.Open}</li><li>${item.High}</li><li>${item.Low}</li><li>${item.Close}</li></ul>        
    </script>

    <script id="tab1Template" type="text/x-jquery-tmpl">
        ${Symbol} <span class="tab-value">${LastTradeAmount}</span>
    </script>
    <!-- Big template for the topmost info, keep scrolling :) -->
    <script id="stockDetailsTemplate" type="text/x-jquery-tmpl">
        <div class="company">${Name} (${Symbol})</div>
        <div class="stock-value">
            <span class="current-value">${LastTradeAmount}</span>
            <div class="value-change-container">
                {{if ${isPositive} == "true"}} 
                <span class="icon-inscrease-value ui-sprite"></span><span class="increase-value">${Change} (${PercentChange})</span>
                {{elseif ${isPositive} == "false"}} 
                <span class="icon-decrease-value ui-sprite"></span><span class="decrease-value">${Change} (${PercentChange})</span>
                {{else}} 
                <div class="market-closed">${marketCurrentlyClosed}</div>
                <span class="inactive-value">${Change} (${PercentChange})</span>
                {{/if}}
            </div>
        </div>

        <div class="details">

            <ul class="details-title">
                <li>${RangeText}</li>
                <li>${WeeksText}</li>
                <li>${OpenText}</li>
                <li>${VolumeText}</li>
            </ul>

            <ul class="details-value">
                <li>${DailyRange}</li>
                <li>${Range52Week}</li>
                <li>${Open}</li>
                <li>${Volume}</li>
            </ul>

            <ul class="details-title">
                <li>${EbitaText}</li>
                <li>${EpsText}</li>
                <li>${MktText}</li>
                <li>${PeText}</li>
            </ul>

            <ul class="details-value">
                <li>${EBITDA}</li>
                <li>${EarningsPerShare}</li>
                <li>${MarketCapitalization}</li>
                <li>${PERatio}</li>
            </ul>

            <ul class="details-title">
                <li>${AskText}</li>
                <li>${BidText}</li>
                <li>${DailyHighText}</li>
                <li>${DailyLowText}</li>
            </ul>

            <ul class="details-value">
                <li>${Ask}</li>
                <li>${Bid}</li>
                <li>${DailyHigh}</li>
                <li>${DailyLow}</li>
            </ul>

        </div>

    </script>
    <script id="stockDateTemplate" type="text/x-jquery-tmpl">
        <span id="date">${LastTradeDate}</span>
        <span id="clock">${LastTradeTime}</span>
    </script>
    <script src="assets/js/fastclick.js"></script>
    
    <script src="Scripts/jquery-1.9.1.min.js"></script>
    <!-- <link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css"> -->
    <script src="Scripts/jquery-ui-1.10.3.min.js"></script>
    <script src="js/yahoo-min.js"></script> 
    <script src="assets/js/jquery.animate-enhanced.js"></script>
    <script src="igniteui/js/infragistics.core.js"></script>
    <script src="igniteui/js/infragistics.lob.js"></script>
    <script src="igniteui/js/infragistics.dv.js"></script>
    <script src="assets/js/config.js"></script>
    <!--<script src="http://igniteui.com/js-data/northwind"></script>-->
    <script src="assets/js/custom.js"></script>
    <script src="assets/js/app.js"></script>
   
</body>
</html>
