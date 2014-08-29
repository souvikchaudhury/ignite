<?php

require_once('db_connection.php');
/* $hostname = 'localhost';
$username = 'stocksframe';
$password = 'Stock@123';
$dtabasename = 'stocksframe';*/

// $conn = mysqli_connect($hostname,$username,$password,$dtabasename);
$conn = mysql_dbConnection();
$cron_symbol = '';

//$sql_query = "SELECT * FROM stockrecord";
$sql_query = "SELECT * FROM stockrecord WHERE id IN ( SELECT symbolid FROM stockgroupmap WHERE subgroupid IN  (SELECT id from stockgroup where `goupname` = 'Australia') )";
$results = mysqli_query($conn,$sql_query);
$curl = curl_init();

while($row = mysqli_fetch_array($results)) {

	curl_setopt_array($curl, array(
               CURLOPT_RETURNTRANSFER => 1,
               CURLOPT_URL => 'http://pipes.yahooapis.com/pipes/pipe.run?_id=3e1b7fc9a1a63ea0772d20ce4573d792&_render=json&symbol='.$row['symbol'],
               CURLOPT_USERAGENT => 'Codular Sample cURL Request'
        ));
    $content2 = curl_exec($curl);
    $fetch_curr_items = json_decode($content2);
    $fetch_curr_items_decode = $fetch_curr_items->value->items;

    $today_date = date('j');
    $today_month = date('n');
    $today_month = $today_month-1;
    $today_year = date('Y');

    // get data from yaho using curl
    curl_setopt_array($curl, array(
                           CURLOPT_RETURNTRANSFER => 1,
                           CURLOPT_URL => 'http://pipes.yahooapis.com/pipes/pipe.run?_id=66fdfbbf40eea28d28bac13047b811b1&_render=json&s='.$row['symbol'].'&a=0&b=1&c=1998&d='.$today_month.'&e='.$today_date.'&f='.$today_year.'&g=d',
                           CURLOPT_USERAGENT => 'Codular Sample cURL Request'
    ));
    $content1 = curl_exec($curl);
    $fetch_items = json_decode($content1);
    $fetch_items_decode = $fetch_items->value->items;
    
    if(count($fetch_items_decode)>0){
    	$monthlyrecord = $content1;
    	if(count($fetch_curr_items_decode)>0){

            $chk_sql = "UPDATE stockrecord SET monthlyrecord='".$monthlyrecord."', open='".$fetch_curr_items_decode[0]->Open."', daillyhigh='".$fetch_curr_items_decode[0]->DailyHigh."',dailylow='".$fetch_curr_items_decode[0]->DailyLow."',lasttradeamount='".$fetch_curr_items_decode[0]->LastTradeAmount."',lasttradedate='".$fetch_curr_items_decode[0]->LastTradeDate."',lasttradetime='".$fetch_curr_items_decode[0]->LastTradeTime."',previousclose='".$fetch_curr_items_decode[0]->PreviousClose."' WHERE id='".$row['id']."'"; 

      	}else{
        	$chk_sql = "UPDATE stockrecord SET monthlyrecord='".$monthlyrecord."' WHERE id='".$row['id']."'";
      	}
    } else{

        $chk_sql = "UPDATE stockrecord SET open='".$fetch_curr_items_decode[0]->Open."', daillyhigh='".$fetch_curr_items_decode[0]->DailyHigh."',dailylow='".$fetch_curr_items_decode[0]->DailyLow."',lasttradeamount='".$fetch_curr_items_decode[0]->LastTradeAmount."',lasttradedate='".$fetch_curr_items_decode[0]->LastTradeDate."',lasttradetime='".$fetch_curr_items_decode[0]->LastTradeTime."',previousclose='".$fetch_curr_items_decode[0]->PreviousClose."' WHERE id='".$row['id']."'"; 
    }
    $count++;

    if($chk_sql){
        $qw = mysqli_query($conn,$chk_sql);      
        if($qw){
            echo "Update Symbol ".$row['symbol'].'<br>';

        }else{
            echo "Not Update Symbol ".$row['symbol'].'<br>';
        }
    }

}
$subject = 'Cron Updated for All symbol'.date("F j, Y, g:i a");
$message = 'Cron Run Timed'.date("F j, Y, g:i a");
mail('aritrik.cn@gmail.com', $subject, $message);

curl_close($curl);

?>