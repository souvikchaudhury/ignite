<?php
/*
 Template Name: Member Page
 */

 get_header();
 ?>
 
 
<div id="content">
    <h2 style="font-size:28px; color:red; text-transform:uppercase;">Member Blogs</h2>
    <p>
        <strong>Subscribe to this Feed</strong> <img class="alignnone size-full wp-image-4848" style="padding-right: 5px;" src="http://madproductions.co.za/okfd/wp-content/uploads/2014/05/rss.png" alt="OK Franchise Division RSS feed" width="18" height="18" />
    </p>      
	
	<?php  
        $user_id = get_current_user_id();	
	    $user = get_userdata($user_id);
		$roles = $user->roles;
		$m_role = $roles[0];
		if(($m_role == 'administrator') || ($m_role == 'member'))
		{
		    //print_r($roles);
           $supp_arr = get_posts('numberposts=-1&offset=0&showposts=-1&cat=4');	
		 
        $c = 0;
        $flag = 1;
        foreach ( $supp_arr as $post ) : setup_postdata( $post ); 
        
           $c++;
//           $new_cls = $firstimgcls = '';
//           $firstblogcls = 'one_third';
//
//           if(($c%2) == 0)
//             $new_cls = 'last';
//           
           $new_cls = $firstimgcls = '';
           $firstblogcls = 'one_third';
           if($c == 1) { 
               $firstimgcls = 'class="firstimg" width="335px" height="154px"'; 
               $firstblogcls = 'blog_first';
           }
           if($c == 2){
               $firstblogcls = 'blog_second';
           }
           if($c == 3) {
               $firstblogcls = 'blog_third';
           }
           
           if(($c%3) == 0) { $new_cls = 'last'; }
           
           $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
        ?>        
<!--        <div class="one_half <?php echo $new_cls; ?>">
            <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium'); ?></a>
            <p></p>           
           
            <h2><?php the_title(); ?></h2>
            
            <?php the_excerpt(); ?>
            <p>
                <strong>Download PDF version</strong> <a style="color: #ff0000; text-decoration: underline;"  href="<?php the_permalink(); ?>" class="moreBtbn"><i>here</i></a>
            </p>
           	 			   
					  
        </div>-->
        <div class=" <?php echo $firstblogcls.' '.$new_cls; ?>">
            
            
            <a href="<?php the_permalink(); ?>">
                <img src="<?php echo $url; ?>" <?php echo $firstimgcls; ?>/>
            </a>
            <p></p>           
           
            <h2><?php the_title(); ?></h2>
            <div class="blog-date"><?php the_category().' '.the_time('F jS, Y'); ?></div>
            
            <?php the_excerpt(); ?>
            
            <a style="color: #ff0000; text-decoration: underline;"  href="<?php the_permalink(); ?>" class="moreBtbn"><i>Read More</i></a>
            
            
        </div>
        <?php 
            if($c == 3) { echo '<p class="linebreak"></p>'; }
        ?>
        <?php         
        endforeach;
		}
		else
		       {
		?>	   
		You are not Authorised to view this page	         
		<?php	   
			   }
	
	?>
	
	<div class="clearboth"></div>
</div>
 <div id="sidebar" style="<?php echo $sidebar_css; ?>"><?php generated_dynamic_sidebar(); ?></div>
 
 <?php
     
 
     get_footer();  
 ?>
