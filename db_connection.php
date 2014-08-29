<?php

function mysql_dbConnection() {
    switch (gethostname()) {
        #################### FOR Linux Server #######################
        case 'p3plcpnl0593.prod.phx3.secureserver.net':
            $hostname = 'localhost';
            $username = 'stocksframe';
            $password = 'Stock@123';
            $dtabasename = 'stocksframe';
            #########################################################
            break;

        case 'cn22':
            $hostname = 'localhost';
            $username = 'root';
            $password = '';
            $dtabasename = 'stocksframe';
            #########################################################
            break;

        case 'SouvikChaudhury':
            $hostname = 'localhost';
            $username = 'root';
            $password = '';
            $dtabasename = 'stocksframe';
            #########################################################
            break;

        case 'SG2NW8SHG146':
            $hostname = 'stocksframe.db.12275777.hostedresource.com';
            $username = 'stocksframe';
            $password = 'Stock@123';
            $dtabasename = 'stocksframe';
            #########################################################
            break;
    }
    

    $con=mysqli_connect($hostname,$username,$password,$dtabasename);
    return $con;
}