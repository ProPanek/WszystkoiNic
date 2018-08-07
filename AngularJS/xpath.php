<?php 
$xml = simplexml_load_file('czasopisma.xml');
$akcja = $_GET['akcja'];
if (isset($akcja) && $akcja == "start") {
	$result = $xml -> xpath("/czasopisma/zmienne/*");

}
if (isset($akcja) && $akcja == "daty") {
	$id = $_GET['id'];
	$result = $xml -> xpath("/czasopisma/lata/".$id);

}
if (isset($akcja) && $akcja == "wszystko") {
	$id = $_GET['id'];
	$result = $xml -> xpath("/czasopisma/".$id);

}
if (isset($akcja) && $akcja == "rok") {
	$id = $_GET['id'];
	$rok = $_GET['rok'];
	$result = $xml->xpath("/czasopisma/".$id."/*[@rok='".$rok."']");
}
echo json_encode($result);
?>