 <?php
    require_once('db_connection.php');
    $conn = mysql_dbConnection();

function scanningfunc($get_date,$conn){
    // Variable Declaration
        $trade_Performance_Data = array();
        $symbolcounter = 0;
        $symbolperfcounter = 0;
        $arrp = array();


    // $get_date = '2014-08-12'; //2007-04-19
    $get_timestamp = strtotime($get_date);


    $previousday = mktime(0, 0, 0, date("m", $get_timestamp), date("d", $get_timestamp)-1,   date("Y", $get_timestamp));
    $lastmonth = mktime(0, 0, 0, date("m", $get_timestamp)-1, date("d", $get_timestamp),   date("Y", $get_timestamp));

    $previous_month_date = date('Y-m-d', $lastmonth);
    $previous_date = date('Y-m-d', $previousday);

    $CurrentTimeStamp = $get_timestamp;  // Current Date Time Stamp
    $PrevMonthTimeStamp = $lastmonth;  // Previous Date Time Stamp


    // $sql_for_scanning = "SELECT * FROM stockrecord WHERE id IN ( SELECT symbolid FROM stockgroupmap WHERE subgroupid IN (SELECT id FROM stockgroup where goupname='Australia'))";
    $sql_for_scanning = "SELECT * FROM stockrecord WHERE id IN ( SELECT symbolid FROM stockgroupmap WHERE subgroupid ='4' )";
    $scanningresults = mysqli_query($conn,$sql_for_scanning);

    while($scanningRow = mysqli_fetch_array($scanningresults)) {
        $scan_result = false;
        
        if($scanningRow['monthlyrecord'] != null || $scanningRow['monthlyrecord'] != ''){

            $count = 1;  $dataHigh = 0;  $showScanning = false; 

            $monthlyrecord = json_decode($scanningRow['monthlyrecord']);  // get stockrecord from database
            $items_decode = $monthlyrecord->value->items; // get stockrecord item list from database
            if(count($items_decode)>0){
                foreach ($items_decode as $key => $value) {

                    $LoopCurrTimeStamp = strtotime($value->Date);

                    if($LoopCurrTimeStamp >= $PrevMonthTimeStamp && $LoopCurrTimeStamp <= $CurrentTimeStamp){
                        $dataHigh = floatval( floatval($dataHigh) + floatval($value->High));
                        $count++;
                        $scan_result = true;
                    }

                    if($CurrentTimeStamp == $LoopCurrTimeStamp) {
                        $selected_trade_close = $value->Close;
                        $perfget_percent = floatval( ( floatval($scanningRow['lasttradeamount'] - $selected_trade_close) / $selected_trade_close) * 100);
                        $perfget_percent = round($perfget_percent, 2);

                        if($perfget_percent >= 0){
                            $perfget_percent = '<label class="upgreen">'.$perfget_percent.'</label>';
                        } else{
                            $perfget_percent = '<label class="downred">'.$perfget_percent.'</label>';
                        }

                        $arrp['performance'][$symbolperfcounter]['symbol'] = $scanningRow['symbol'];
                        $arrp['performance'][$symbolperfcounter]['name'] = $scanningRow['name'];
                        $arrp['performance'][$symbolperfcounter]['countrytype'] = $scanningRow['countrytype'];
                        $arrp['performance'][$symbolperfcounter]['open'] = $scanningRow['open'];
                        $arrp['performance'][$symbolperfcounter]['daillyhigh'] = $scanningRow['daillyhigh'];
                        $arrp['performance'][$symbolperfcounter]['dailylow'] = $scanningRow['dailylow'];
                        $arrp['performance'][$symbolperfcounter]['lasttradeamount'] = $scanningRow['lasttradeamount'];
                        $arrp['performance'][$symbolperfcounter]['perfget_percent'] = $perfget_percent;
                        $arrp['performance'][$symbolperfcounter]['selected_trade_close'] = $selected_trade_close;
                        $symbolperfcounter++;
                    } 
                }
                if($scan_result){
                    $dataHigh = round($dataHigh, 2);
                    $dataHighAvg = floatval($dataHigh/$count);
                    if($scanningRow['lasttradeamount'] >= $dataHighAvg){

                        // $trade_Performance_Data['date'] = $get_date;
                        $sql_get_id = "SELECT id FROM stockrecord WHERE symbol = '".$scanningRow['symbol']."'";
                        $symbol_id_result = mysqli_query($conn,$sql_get_id);
                        $getidrow = mysqli_fetch_row($symbol_id_result);
                        
                        $trade_Performance_Data['symbolid'][$symbolcounter]= $getidrow[0];
                        $trade_Performance_Data['symbolname'][$symbolcounter] = $scanningRow['symbol'];

                        $arrp['scanning'][$symbolcounter]['symbol'] = $scanningRow['symbol'];
                        $arrp['scanning'][$symbolcounter]['name'] = $scanningRow['name'];
                        $arrp['scanning'][$symbolcounter]['countrytype'] = $scanningRow['countrytype'];
                        $arrp['scanning'][$symbolcounter]['open'] = $scanningRow['open'];
                        $arrp['scanning'][$symbolcounter]['daillyhigh'] = $scanningRow['daillyhigh'];
                        $arrp['scanning'][$symbolcounter]['dailylow'] = $scanningRow['dailylow'];
                        $arrp['scanning'][$symbolcounter]['lasttradeamount'] = $scanningRow['lasttradeamount'];

                        $symbolcounter++;              

                    }
                }
            }
        }

    }
    $trade_Performance_Data['tradetableresults']= json_encode($arrp);
    return $trade_Performance_Data;
    
}
    
    // echo '<pre>';
    // print_r(scanningfunc('2014-08-12',$conn));


    // Date for Perform Scan
    $scanning_Date = '2014-08-22';
    // $scanning_Date = date('Y-m-d');

    $sql_date_count = "SELECT count(*) FROM stockscaning WHERE scanDate = '".$scanning_Date."'";
    $date_count_result = mysqli_query($conn,$sql_date_count);
    $scanningRowdd = mysqli_fetch_row($date_count_result);

    $fullvalue = scanningfunc($scanning_Date,$conn);
    $symbolid = json_encode($fullvalue['symbolid']);
    $symbolname = json_encode($fullvalue['symbolname']);
    $tradetableresults = $fullvalue['tradetableresults'];

    if($scanningRowdd[0]>=1){
        $sql_data_update = "UPDATE stockscaning SET symbolid='".$symbolid."', symbolname= '".$symbolname."', tradetableresults= '".$tradetableresults."' WHERE scanDate='".$scanning_Date."'";
        $date_update_result = mysqli_query($conn,$sql_data_update);
        var_dump($date_update_result);
    }else{
        $sql_data_insert = "INSERT INTO stockscaning (scanDate,symbolid,symbolname,tradetableresults) VALUES('".$scanning_Date."','".$symbolid."','".$symbolname."','".$tradetableresults."')";
        $date_insert_result = mysqli_query($conn,$sql_data_insert);
        var_dump($date_insert_result);
    }

    $subject = 'Cron Updated for Scanning'.date("F j, Y, g:i a");
    $message = 'Cron Run Timed'.date("F j, Y, g:i a");
    mail('souvikchcn@gmail.com', $subject, $message);

?>