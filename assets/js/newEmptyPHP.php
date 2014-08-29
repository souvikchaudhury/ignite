<?php
/*
Template Name: Store Locator
*/
get_header();
?>
<link href="<?php echo trailingslashit(get_template_directory_uri()); ?>css/jquery.mCustomScrollbar.css" rel="stylesheet" type="text/css">
<link href="<?php echo trailingslashit(get_template_directory_uri()); ?>css/responsive.css" rel="stylesheet" type="text/css">
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"></script>

	<style>
	html, body, #map-canvas {
   height: 500px;
   margin: 0;
   padding: 0;
}
 
    </style>
<div id="sliders-container">
										</div>
		
																	<div id="main" class="clearfix " style="">
		<div class="avada-row" style="">
						
                        
            <div class="locationContainer">
                
                
                
                <!--start STORE LOCATOR-->
                
                    <!--start LEFTPAN-->
                    <div class="leftpan">
                      <div class="title"><h2>Store Locator &amp; Map</h2></div>
               		  <p>Navigate your way through the map below or use our store locator to your right.</p>
                        
                        <!--start SCROLLBAR-->
                        <div id="content_1" class="content">
                        	<a class="hd find_stores"><span ><img src="<?php echo trailingslashit(get_template_directory_uri()); ?>images/searchAdminIcon.png"></span> Search Again</a>
                        	<p>Click below for info on each store</p>
                            
                            <ul class="infoArea" id='info'>
                            	
                            </ul>
                        </div>
                        <!--end SCROLLBAR-->
                        
                        <div class="mapDiv"><div id="map-canvas"></div></div>
                        <div class="clear"></div>
                    </div>
                    <!--end LEFTPAN-->
                    
                    <!--start RIGHTPAN-->
                    <div class="rightpan">
                        <h2>Find Your Local Store</h2>
                        <p>To view our stores by Province, select the relevant Store Brand(s) and click on a Province below. Alternatively, search for a store, city or suburb by typing in your search below.</p>
                        <ul class="checkboxDiv">
						<?php
						   $taxonomies = array( 
																'store-type'										
															);

															$args = array(
																'orderby'       => 'name', 
																'order'         => 'ASC',
																'hide_empty'    => false, 
																'exclude'       => array(), 
																'exclude_tree'  => array(), 
																'include'       => array(),
																'number'        => '', 
																'fields'        => 'all', 
																'slug'          => '', 
																'parent'         => '',
																'hierarchical'  => true, 
																'child_of'      => 0, 
																'get'           => '', 
																'name__like'    => '',
																'pad_counts'    => false, 
																'offset'        => '', 
																'search'        => '', 
																'cache_domain'  => 'core'
															); 
															
														$terms = get_terms( $taxonomies );	
														//print_r($terms);
														
														$c = 0;$l=0;
														foreach ( $terms as $term ) 
														{
                                                                                         $t_id = $term->term_id;
                                                                                if(($t_id == 35) || ($t_id == 38) || ($t_id == 39) || ($t_id == 30) || ($t_id == 33) || ($t_id == 36) || ($t_id == 37) || ($t_id == 32) || ($t_id == 31) || ($t_id == 41)) {		
                                                            $c++;	$l++;													
						?>
                            <li>
                                <input id="demo_box_<?php echo $c; ?>" class="css-checkbox" type="checkbox" value='<?php echo $term->term_id; ?>' name='checks[]'/>
                                <label for="demo_box_<?php echo $c; ?>" name="demo_lbl_<?php echo $c; ?>" class="css-label"><?php echo $term->name; ?></label>
                            </li>
                            
							<?php
                                                                    }
							   }
							?>
                        </ul>
                        <div class="clear"></div>
                        
                        <div class="select-style">
                         

						<?php
						   $args = array(
												'posts_per_page'   => -1,
												'offset'           => 0,
												'category'         => '',
												'orderby'          => 'post_date',
												'order'            => 'DESC',
												'include'          => '',
												'exclude'          => '',
												'meta_key'         => '',
												'meta_value'       => '',
												'post_type'        => 'store',
												'post_mime_type'   => '',
												'post_parent'      => '',
												'post_status'      => 'publish',
												'suppress_filters' => true );
						
						   $post_arr = get_posts($args);
						   print_r($post_arr);
						   foreach ( $post_arr as $post ) : setup_postdata( $post );
						   $id_arr[] = $post->ID;						   
						   endforeach;
						   //print_r($id_arr);
						   foreach($id_arr as $id)
								{
								     $con[] = get_post_meta($id,'country',true);	
                                }	
                         $con = array_unique($con);								
						?>
                          <select name='sel' id='sel_con'>
                            <option value="">Select a country...</option>
							<?php
							    foreach($con as $c)
								{								     							 
							?>
                            <option value="<? echo  $c; ?>"><? echo  $c; ?></option>                           
							<?php
							   }
							?>
                          </select>
                        </div>
                        
                        <div class="select-style">
                          <select name='province' id='province'>
                            <option value="volvo">Select a province...</option>
                            
                          </select>
                        </div>
                        <p>Store name, suburb or city</p>
                        <input name="search" type="text" class="goInput" id='srchtext'><input name="go" type="image" src="<?php echo trailingslashit(get_template_directory_uri()); ?>images/goBtn.png" width="27" height="27" border="0" class="goimg find_stores" id='find_stores'>
                    </div>
                    <!--end RIGHTPAN-->
                    <div class="clear"></div>
                    
                <!--end STORE LOCATOR-->
            </div>
	
		</div>
	</div>
    <script type='text/javascript'>
	jQuery(document).ready(function(){
           initialize();

	   jQuery('#sel_con').change(function(){
	        var sel = jQuery('#sel_con').val();
			console.log(sel);
                        if(sel == 'Botswana')
                        {
                           jQuery('#province').attr('disabled',true);	
                        }
                        if(sel == 'Namibia')
                        {
                           //jQuery('#province').attr('disabled',true);	
                        }
                        if(sel == 'South Africa')
                        {
                           jQuery('#province').attr('disabled',false);	
                        }
	         jQuery.ajax({
							 type:"post",
							//dataType: 'JSON',
							url:"<?php echo admin_url();?>/admin-ajax.php",
							data : {"action":"con_find","sel":sel},
							success:function(result)
							{
								   jQuery('#province').html(result);						
							},
							error: function(errorThrown){
							alert('error');
							console.log(errorThrown);
				           }
				});
		  
		  
	   });
	   
	   jQuery('.find_stores').click(function(){
	   var sels='';
	   <?php
	      for($i =1;$i<=$l;$i++)
		  {
	   ?>
	      if (jQuery('#demo_box_<?php echo $i; ?>').prop( "checked" ))
		  {
		      sels += jQuery('#demo_box_<?php echo $i; ?>').val();
			  sels += ',';
		  }	  
       <?php
          }
      ?>	
	    //console.log('<?php echo $c; ?>');	
       console.log(sels);	
       var country = jQuery('#sel_con').val();
	   var province = jQuery('#province').val();
	   var srchtext = jQuery('#srchtext').val();
	   jQuery('#info').html('<img src="<?php echo trailingslashit(get_template_directory_uri())?>images/small_loader.gif" />');
           if((country != '') && (province == '') && (srchtext == ''))
           {

              jQuery.ajax({
							 type:"post",
							//dataType: 'JSON',
							url:"<?php echo admin_url();?>/admin-ajax.php",
							data : {"action":"show_total_new","sels":sels,"country":country,"province":province,"srchtext":srchtext},
							success:function(result)
							{
								   //alert(result);
								
								result=[result];
								var obj=JSON.parse(result);
								//alert(obj);
								var nnstr = obj.main_text;
								var dstr = 'kk';
								if(nnstr == '')
								{
								   nnstr = '<li>Sorry No Results Found!</li>';
								   dstr = '';
								}
								jQuery('#info').html(nnstr);
								if(dstr != '')
								{
                                                                 console.log('spoked');
								jQuery("#content_1").mCustomScrollbar();
								var rs1 = JSON.parse(result[0]);
										//console.log(rs1.total_arr[0].lat);
										
										var LocationData = [];
										for(var index in rs1.total_arr){
										 if(rs1.total_arr[index].lat == null)
											break;
										       LocationData.push([rs1.total_arr[index].lat,rs1.total_arr[index].lon,rs1.total_arr[index].temp,rs1.total_arr[index].marker]);
										 }
									console.log(LocationData);
																		 
										 var map = 
												new google.maps.Map(document.getElementById('map-canvas'));
										 
										function initialize()
										{
											
											 var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
											 var mapOptions = {
											zoom: 4,
											center: myLatlng
										  };
											
											console.clear();
											console.log(LocationData);
											var map = 
												new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
											var bounds = new google.maps.LatLngBounds();
											var infowindow = new google.maps.InfoWindow();
											 
											for (var i in LocationData)
											{
												var p = LocationData[i];
												var latlng = new google.maps.LatLng(p[0], p[1]);
												bounds.extend(latlng);
												console.log(p[3]);
												var image = {
														    url: p[3],
															// This marker is 20 pixels wide by 32 pixels tall.
															size: new google.maps.Size(40,40),
															// The origin for this image is 0,0.															
														}; 
												var marker = new google.maps.Marker({
													position: latlng,
													map: map,
													title: p[2],
													icon:image
												});
											 
												google.maps.event.addListener(marker, 'click', function() {
													infowindow.setContent(this.title);
													infowindow.open(map, this);
												});
											}
											 
											map.fitBounds(bounds);
										}
										 
										initialize();
										jQuery('#map_canvas').css('width','100% !important;');
										jQuery('#map_canvas').css('height','560px !important;');
										jQuery('#map_canvas').css('position','relative !important;');
										jQuery('#map_canvas').css('z-index','0 !important;');	
                                 }										
								       
							},
							error: function(errorThrown){
							alert('error');
							console.log(errorThrown);
				           }
				      });
  




           }
           else if((country != '') && (province == '') && (srchtext != ''))
           {

                jQuery.ajax({
							 type:"post",
							//dataType: 'JSON',
							url:"<?php echo admin_url();?>/admin-ajax.php",
							data : {"action":"show_total_context","sels":sels,"country":country,"province":province,"srchtext":srchtext},
							success:function(result)
							{
								   //alert(result);
								
								result=[result];
								var obj=JSON.parse(result);
								//alert(obj);
								var nnstr = obj.main_text;
								var dstr = 'kk';
								if(nnstr == '')
								{
								   nnstr = '<li>Sorry No Results Found!</li>';
								   dstr = '';
								}
								jQuery('#info').html(nnstr);
								if(dstr != '')
								{
                                                                 console.log('spoked');
								jQuery("#content_1").mCustomScrollbar();
								var rs1 = JSON.parse(result[0]);
										//console.log(rs1.total_arr[0].lat);
										
										var LocationData = [];
										for(var index in rs1.total_arr){
										 if(rs1.total_arr[index].lat == null)
											break;
										       LocationData.push([rs1.total_arr[index].lat,rs1.total_arr[index].lon,rs1.total_arr[index].temp,rs1.total_arr[index].marker]);
										 }
									console.log(LocationData);
																		 
										 var map = 
												new google.maps.Map(document.getElementById('map-canvas'));
										 
										function initialize()
										{
											
											 var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
											 var mapOptions = {
											zoom: 4,
											center: myLatlng
										  };
											
											console.clear();
											console.log(LocationData);
											var map = 
												new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
											var bounds = new google.maps.LatLngBounds();
											var infowindow = new google.maps.InfoWindow();
											 
											for (var i in LocationData)
											{
												var p = LocationData[i];
												var latlng = new google.maps.LatLng(p[0], p[1]);
												bounds.extend(latlng);
												console.log(p[3]);
												var image = {
														    url: p[3],
															// This marker is 20 pixels wide by 32 pixels tall.
															size: new google.maps.Size(40,40),
															// The origin for this image is 0,0.															
														}; 
												var marker = new google.maps.Marker({
													position: latlng,
													map: map,
													title: p[2],
													icon:image
												});
											 
												google.maps.event.addListener(marker, 'click', function() {
													infowindow.setContent(this.title);
													infowindow.open(map, this);
												});
											}
											 
											map.fitBounds(bounds);
										}
										 
										initialize();
										jQuery('#map_canvas').css('width','100% !important;');
										jQuery('#map_canvas').css('height','560px !important;');
										jQuery('#map_canvas').css('position','relative !important;');
										jQuery('#map_canvas').css('z-index','0 !important;');	
                                 }										
								       
							},
							error: function(errorThrown){
							alert('error');
							console.log(errorThrown);
				           }
				      });
  




          
           }
           else if((country != '') && (province != '') && (srchtext != ''))
           {
                 jQuery.ajax({
							 type:"post",
							//dataType: 'JSON',
							url:"<?php echo admin_url();?>/admin-ajax.php",
							data : {"action":"show_total_name","sels":sels,"country":country,"province":province,"srchtext":srchtext},
							success:function(result)
							{
								   //alert(result);
								
								result=[result];
								var obj=JSON.parse(result);
								//alert(obj);
								var nnstr = obj.main_text;
								var dstr = 'kk';
								if(nnstr == '')
								{
								   nnstr = '<li>Sorry No Results Found!</li>';
								   dstr = '';
								}
								jQuery('#info').html(nnstr);
								if(dstr != '')
								{
                                                                 console.log('spoked');
								jQuery("#content_1").mCustomScrollbar();
								var rs1 = JSON.parse(result[0]);
										//console.log(rs1.total_arr[0].lat);
										
										var LocationData = [];
										for(var index in rs1.total_arr){
										 if(rs1.total_arr[index].lat == null)
											break;
										       LocationData.push([rs1.total_arr[index].lat,rs1.total_arr[index].lon,rs1.total_arr[index].temp,rs1.total_arr[index].marker]);
										 }
									console.log(LocationData);
																		 
										 var map = 
												new google.maps.Map(document.getElementById('map-canvas'));
										 
										function initialize()
										{
											
											 var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
											 var mapOptions = {
											zoom: 4,
											center: myLatlng
										  };
											
											console.clear();
											console.log(LocationData);
											var map = 
												new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
											var bounds = new google.maps.LatLngBounds();
											var infowindow = new google.maps.InfoWindow();
											 
											for (var i in LocationData)
											{
												var p = LocationData[i];
												var latlng = new google.maps.LatLng(p[0], p[1]);
												bounds.extend(latlng);
												console.log(p[3]);
												var image = {
														    url: p[3],
															// This marker is 20 pixels wide by 32 pixels tall.
															size: new google.maps.Size(40,40),
															// The origin for this image is 0,0.															
														}; 
												var marker = new google.maps.Marker({
													position: latlng,
													map: map,
													title: p[2],
													icon:image
												});
											 
												google.maps.event.addListener(marker, 'click', function() {
													infowindow.setContent(this.title);
													infowindow.open(map, this);
												});
											}
											 
											map.fitBounds(bounds);
										}
										 
										initialize();
										jQuery('#map_canvas').css('width','100% !important;');
										jQuery('#map_canvas').css('height','560px !important;');
										jQuery('#map_canvas').css('position','relative !important;');
										jQuery('#map_canvas').css('z-index','0 !important;');	
                                 }										
								       
							},
							error: function(errorThrown){
							alert('error');
							console.log(errorThrown);
				           }
				      });
  

 

           }
           else
               {
	   jQuery.ajax({
							 type:"post",
							//dataType: 'JSON',
							url:"<?php echo admin_url();?>/admin-ajax.php",
							data : {"action":"show_total","sels":sels,"country":country,"province":province,"srchtext":srchtext},
							success:function(result)
							{
								   //alert(result);
								
								result=[result];
								var obj=JSON.parse(result);
								//alert(obj);
								var nnstr = obj.main_text;
								var dstr = 'kk';
								if(nnstr == '')
								{
								   nnstr = '<li>Sorry No Results Found!</li>';
								   dstr = '';
								}
								jQuery('#info').html(nnstr);
								if(dstr != '')
								{
								jQuery("#content_1").mCustomScrollbar();
								var rs1 = JSON.parse(result[0]);
										//console.log(rs1.total_arr[0].lat);
										
										var LocationData = [];
										for(var index in rs1.total_arr){
										 if(rs1.total_arr[index].lat == null)
											break;
										       LocationData.push([rs1.total_arr[index].lat,rs1.total_arr[index].lon,rs1.total_arr[index].temp,rs1.total_arr[index].marker]);
										 }
									console.log(LocationData);
																		 
										 var map = 
												new google.maps.Map(document.getElementById('map-canvas'));
										 
										function initialize()
										{
											
											 var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
											 var mapOptions = {
											zoom: 4,
											center: myLatlng
										  };
											
											console.clear();
											console.log(LocationData);
											var map = 
												new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
											var bounds = new google.maps.LatLngBounds();
											var infowindow = new google.maps.InfoWindow();
											 
											for (var i in LocationData)
											{
												var p = LocationData[i];
												var latlng = new google.maps.LatLng(p[0], p[1]);
												bounds.extend(latlng);
												console.log(p[3]);
												var image = {
														    url: p[3],
															// This marker is 20 pixels wide by 32 pixels tall.
															size: new google.maps.Size(40,40),
															// The origin for this image is 0,0.															
														}; 
												var marker = new google.maps.Marker({
													position: latlng,
													map: map,
													title: p[2],
													icon:image
												});
											 
												google.maps.event.addListener(marker, 'click', function() {
													infowindow.setContent(this.title);
													infowindow.open(map, this);
												});
											}
											 
											map.fitBounds(bounds);
										}
										 
										initialize();
										jQuery('#map_canvas').css('width','100% !important;');
										jQuery('#map_canvas').css('height','560px !important;');
										jQuery('#map_canvas').css('position','relative !important;');
										jQuery('#map_canvas').css('z-index','0 !important;');									
								 }       
							},
							error: function(errorThrown){
							alert('error');
							console.log(errorThrown);
				           }
				      });   
					  
					} 
	   
	   })
	})

    function gen_map(lat,lon,store_name,addr,prov,con,phone,fax,imgger)
     {
        
	   var myLatlng = new google.maps.LatLng(lat,lon);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var imgg = '<img src="'+imgger+'" />';
  var contentString = '<div id="content"><div id="siteNotice"></div><p><img src="'+imgger+'" height="40" width="40"> '+prov+'<br><br><u><strong>Store Details</strong></u><br>'+store_name+'<br>'+addr+'<br>'+prov+'<br>'+con+'<br>Latitude:'+lat+'<br> Longitude: '+lon+'<br></p><p><strong>Tel:</strong> '+phone+'<br><strong>FAX:</strong>'+fax+' </p>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
  });
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!',
      icon:imgger
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
  infowindow.open(map,marker);
	

     }
	</script>
        <script type="text/javascript">
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(-33.9248685,18.4240553),
          zoom: 8
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
      }
      
    </script>
<?php
 get_footer();
?>