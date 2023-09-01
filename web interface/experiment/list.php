<?php
header("Content-Type: application/json");
echo json_encode(array_filter(glob('*'), 'is_dir'));
?>