<?php
    echo "hi";
    require_once('db_connection.php');
	$conn = mysql_dbConnection();

    $cron_symbol = '';

    $sql_query = "SELECT * FROM stockscaning WHERE id > 674";
    echo $sql_query;
    $results = mysqli_query($conn,$sql_query);
    while($row = mysqli_fetch_array($results)) {
        $cron_symbol .= $row['scanDate'].'<*>';
    }
    $cron_symbol = substr($cron_symbol, 0, -3);
    // die();
    ?>
    <textarea id="cron_symbol_id"><?php echo $cron_symbol; ?></textarea>
    
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>   

    <script type="text/javascript">
      $(document).ready(function(){
         
        var all_symbol_list = $('#cron_symbol_id').val();
        all_symbol_list = all_symbol_list.split("<*>");
        var t;
        var count_all_symbol_list = all_symbol_list.length;
        var currindx = 0;

        dft(count_all_symbol_list, all_symbol_list, currindx);

        function dft(count_all_symbol_list, all_symbol_list, currindx){ 
            if(currindx == count_all_symbol_list) {
                
            }else{
                $.ajax({
                    url: 'stockScandbchange.php',
                    context: document.body,
                    type: 'post',
                    data: { symbol:all_symbol_list[currindx] },
                }).done(function(data) {
                    console.log(data);
                    currindx++;
                    dft(count_all_symbol_list, all_symbol_list, currindx);
                }).fail(function() {
                    alert( "error" );
                });
            }
        }
      });
    </script>