<?php
   /* $hostname = 'stocksframe.db.12275777.hostedresource.com';
    $username = 'stocksframe';
    $password = 'Stock@123';
    $dtabasename = 'stocksframe';*/
    require_once('db_connection.php');
    // $hostname = 'localhost';
    // $username = 'root';
    // $password = '';
    // $dtabasename = 'investorignite';
    
    $conn = mysql_dbConnection();
    $get_date = $_REQUEST['selectedDate'];
    $sql_for_scanning = "SELECT * FROM `stockscaning` where `scanDate` = '".$get_date."'";
    $scanningQuery = mysqli_query($conn,$sql_for_scanning);
    $scanningresults = mysqli_fetch_array($scanningQuery);
    $tradetableresults = $scanningresults['tradetableresults'];
        // $scanningRow
        $search = 'class="upgreen"';
        $replace = "class='upgreen'";
        
        $tradetableresults = str_replace ($search , $replace , $tradetableresults );
        
        $search = 'class="downred"';
        $replace = "class='downred'";
        
        $tradetableresults = str_replace ($search , $replace , $tradetableresults);
    $trade_Performance_Data = $tradetableresults;
    // Variable Declaration
    //     $trade_Performance_Data = array();
    //     $symbolcounter = 0;

    // //Date time calculation for 1 month previous
    //     // echo $_REQUEST['selectedTable'];

    //     $get_date = $_REQUEST['selectedDate'];
    //     $get_date = new DateTime($get_date);
    
    //     $get_date = date_format($get_date, 'Y-m-d');
    
    //     $get_timestamp = strtotime($get_date);

    //     $previousday = mktime(0, 0, 0, date("m", $get_timestamp), date("d", $get_timestamp)-1,   date("Y", $get_timestamp));
    //     $lastmonth = mktime(0, 0, 0, date("m", $get_timestamp)-1, date("d", $get_timestamp),   date("Y", $get_timestamp));
    
    //     $previous_month_date = date('Y-m-d', $lastmonth);
    //     $previous_date = date('Y-m-d', $previousday);

    //     $CurrentTimeStamp = $get_timestamp;  // Current Date Time Stamp
    //     $PrevMonthTimeStamp = $lastmonth;  // Previous Date Time Stamp

    // // Scanning Section for Trade Table
    //     $sql_for_scanning = "SELECT * FROM stockrecord WHERE id IN ( SELECT symbolid FROM stockgroupmap WHERE subgroupid ='".$_REQUEST['selectedTable']."' )";
    //     $scanningresults = mysqli_query($conn,$sql_for_scanning);
    //     while($scanningRow = mysqli_fetch_array($scanningresults)) {

    //         $count = 1; 
    //         $dataHigh = 0;
    //         $showScanning = false;  

    //         $monthlyrecord = json_decode($scanningRow['monthlyrecord']);  // get stockrecord from database
    //         $items_decode = $monthlyrecord->value->items; // get stockrecord item list from database

    //         if(count($items_decode)>0){
    //             foreach ($items_decode as $key => $value) {
    //                 $LoopCurrTimeStamp = strtotime($value->Date);

    //                 if($LoopCurrTimeStamp >= $PrevMonthTimeStamp && $LoopCurrTimeStamp <= $CurrentTimeStamp){
    //                     $dataHigh = floatval( floatval($dataHigh) + floatval($value->High));
    //                     $dataHigh = round($dataHigh, 2);

    //                     $dataHighAvg = floatval($dataHigh/$count);
    //                     if($scanningRow['lasttradeamount'] >= $dataHighAvg){
    //                         $showScanning = true;                            
    //                     }
    //                     $count++;
    //                 }
    //             }
    //             if($showScanning){
    //                 $trade_Performance_Data['scanning'][$symbolcounter]['symbol'] = $scanningRow['symbol'];
    //                 $trade_Performance_Data['scanning'][$symbolcounter]['name'] = $scanningRow['name'];
    //                 $trade_Performance_Data['scanning'][$symbolcounter]['countrytype'] = $scanningRow['countrytype'];
    //                 $trade_Performance_Data['scanning'][$symbolcounter]['open'] = $scanningRow['open'];
    //                 $trade_Performance_Data['scanning'][$symbolcounter]['daillyhigh'] = $scanningRow['daillyhigh'];
    //                 $trade_Performance_Data['scanning'][$symbolcounter]['dailylow'] = $scanningRow['dailylow'];
    //                 $trade_Performance_Data['scanning'][$symbolcounter]['lasttradeamount'] = $scanningRow['lasttradeamount'];
    //                 $symbolcounter++;
    //             }
    //         }
    //     }



    // // Performance Section for Trade Table
    //     $sql_for_performance = "SELECT * FROM stockrecord WHERE id IN ( SELECT symbolid FROM stockgroupmap WHERE subgroupid IN (SELECT id FROM stockgroup where goupname='Australia'))";
    //     $performanceResults = mysqli_query($conn,$sql_for_performance);
        
    //     $symbolcounter = 0;

    //     while($performanceRow = mysqli_fetch_array($performanceResults)) {
    	
    //       	$monthlyrecord = json_decode($performanceRow['monthlyrecord']);  // get stockrecord from database
    //         $items_decode = $monthlyrecord->value->items; // get stockrecord item list from database
        
    //         $trade_Performance_Data['performance'][$symbolcounter]['symbol'] = $performanceRow['symbol'];
    //         $trade_Performance_Data['performance'][$symbolcounter]['name'] = $performanceRow['name'];
    //         $trade_Performance_Data['performance'][$symbolcounter]['countrytype'] = $performanceRow['countrytype'];
    //         $trade_Performance_Data['performance'][$symbolcounter]['open'] = $performanceRow['open'];
    //         $trade_Performance_Data['performance'][$symbolcounter]['daillyhigh'] = $performanceRow['daillyhigh'];
    //         $trade_Performance_Data['performance'][$symbolcounter]['dailylow'] = $performanceRow['dailylow'];
    //         $trade_Performance_Data['performance'][$symbolcounter]['lasttradeamount'] = $performanceRow['lasttradeamount'];

    //         if(count($items_decode)>0){
    // 			foreach ($items_decode as $key => $value) {
    //                 $LoopCurrTimeStamp = strtotime($value->Date);
    //                 if($CurrentTimeStamp == $LoopCurrTimeStamp) {
    //                 	$selected_trade_close = $value->Close;
    //                    	$perfget_percent = floatval( ( floatval($performanceRow['lasttradeamount'] - $selected_trade_close) / $selected_trade_close) * 100);
    //                    	$perfget_percent = round($perfget_percent, 2);
    //                     if($perfget_percent >= 0)
    //         			     $perfget_percent = '<label class="upgreen">'.$perfget_percent.'</label>';
    //                     else
    //                         $perfget_percent = '<label class="downred">'.$perfget_percent.'</label>';

    //         			$trade_Performance_Data['performance'][$symbolcounter]['perfget_percent'] = $perfget_percent;
    //         			$trade_Performance_Data['performance'][$symbolcounter]['selected_trade_close'] = $selected_trade_close;
    //                     break;
    //                 }
    //             }
    //         }else{
    //         	$trade_Performance_Data['performance'][$symbolcounter]['perfget_percent'] = '<label class="upgreen">0.00</label>';
    //         	$trade_Performance_Data['performance'][$symbolcounter]['selected_trade_close'] = 0.00;
    //         }
    //         $symbolcounter++;
    //     }
    

    /*$datalists['trade'] = $tradeData;
    $datalists['performance'] = $trade_Performance_Data;*/
    
    // echo '<pre>';
    // print_r($trade_Performance_Data);
    echo json_encode($trade_Performance_Data);

?>
