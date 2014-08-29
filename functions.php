<?php
require_once('db_connection.php');

function watchlists_all_table() {
    
    $conn = mysql_dbConnection();
    
    $sql_distinct_name = "SELECT DISTINCT goupname FROM stockgroup";
    $result_sql_distinct_name = mysqli_query($conn,$sql_distinct_name);
    while($row_distinct_name = mysqli_fetch_array($result_sql_distinct_name)) {
        echo '<li>';
            echo '<label class="watchlabel"> '.$row_distinct_name['goupname'].'<span class="watchspn"> + </span> </label>';
            echo '<ul class="watchlistchart watchlistsubgroup" >';
                $sql_watchlists = "SELECT * FROM stockgroup WHERE goupname='".$row_distinct_name['goupname']."'";
                $result_sql_watchlists = mysqli_query($conn,$sql_watchlists);
                while($row_sql_watchlists = mysqli_fetch_array($result_sql_watchlists)) {
                    $allsymb = '';
                    $subgroupid = $row_sql_watchlists['id'];
                    echo '<li>';
                      echo '<label class="watchlabel"> '.$row_sql_watchlists['subgroupname'].'<span class="watchspn"> + </span> </label>';
                      echo '<ul class="watchlistchart">';
                        $sql_watchlists1 = "SELECT * FROM stockgroupmap WHERE subgroupid='".$subgroupid."'";
                        $result_sql_watchlists1 = mysqli_query($conn,$sql_watchlists1);
                        while($row_sql_watchlists1 = mysqli_fetch_array($result_sql_watchlists1)) {

                            $sql_watchlists2 = "SELECT * FROM stockrecord WHERE id='".$row_sql_watchlists1['symbolid']."'";
                            $result_sql_watchlists2 = mysqli_query($conn,$sql_watchlists2);

                            while($row_sql_watchlists2 = mysqli_fetch_array($result_sql_watchlists2)) {
                                $allsymb.= $row_sql_watchlists2['symbol'].'+';
                                echo '<li class="watchchartsymb" data-name="'.$row_sql_watchlists2['name'].'" data-symbol="'.$row_sql_watchlists2['symbol'].'">'.$row_sql_watchlists2['name'].'( '.$row_sql_watchlists2['symbol'].' )'.'</li>';
                            }
                        }
                      echo '</ul>';
                    echo '</li>';
                    echo '<textarea id="'.$row_sql_watchlists['subgroup'].'" style="display:none;">'.rtrim($allsymb,'+').'</textarea>';
                }
            echo '</ul>';
        echo '</li>';
    }
    
}

function tradetable_stock_options(){
    $conn = mysql_dbConnection();
    $sql_watchlists = "SELECT * FROM stockgroup WHERE goupname='Australia'";
    $result_sql_watchlists = mysqli_query($conn,$sql_watchlists);
    while($row_sql_watchlists = mysqli_fetch_array($result_sql_watchlists)) {
        echo '<option value="'.$row_sql_watchlists['id'].'">'.$row_sql_watchlists['subgroupname'].'</option>';
    }
}
function watchtable_stock_options(){
    echo '<option value="">Select</option>';
    $conn = mysql_dbConnection();
    $wlist_sql = "SELECT DISTINCT goupname FROM stockgroup";
    $wlist_result = mysqli_query($conn,$wlist_sql);
    while($wlist_row = mysqli_fetch_array($wlist_result)) {
        echo '<optgroup label="'.$wlist_row['goupname'].'" >';
        $sql_watchlists = "SELECT * FROM stockgroup WHERE goupname='".$wlist_row['goupname']."'";
        $result_sql_watchlists = mysqli_query($conn,$sql_watchlists);
        while($row_sql_watchlists = mysqli_fetch_array($result_sql_watchlists)) {
            echo '<option value="'.$row_sql_watchlists['subgroup'].'">'.$row_sql_watchlists['subgroupname'].'</option>';
        }
        echo '</optgroup>';
    }
}

?>