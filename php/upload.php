<?php
  // File name
  $file_name = $_FILES['file']['name'];
  // Tmp of file
  $tmp_name = $_FILES['file']['tmp_name'];
  // Making file name dynamic by adding before file name
  $file_up_name = time().$file_name;
  // Moving file to the specified folder with dynamic name
  move_uploaded_file($tmp_name, 'files/'.$file_up_name);
?>