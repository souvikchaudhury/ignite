<?php
	require_once('db_connection.php');
	$conn = mysql_dbConnection();
	$symbolname = $_GET['symbolname'];
	
	$scanSql = "SELECT scanDate FROM stockscaning WHERE symbolname like '%$symbolname%'";

	
	$scanSqlQuery = mysqli_query($conn, $scanSql);
	$scanResult = mysqli_fetch_array($scanSqlQuery);
	if ($scanResult) {
		$returnData['success'] = true;
		$returnData['message'] = $scanResult;
	} else {
		$returnData['success'] = false;
		$returnData['message'] = "";
	}
	echo json_encode($returnData);
	
?>