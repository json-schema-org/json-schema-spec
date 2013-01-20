<?php

header("Content-Type: text/plain");

$menu = array(
	"about" => ".",
	"docs" => "documentation.html",
	"examples" => "examples.html",
	"software" => "implementations.html"
);

$pages = array(
	"index.html" => array(
		"content" => "content/index.html",
		"menu" => "about",
		"pageTitle" => "JSON Schema and Hyper-Schema"
	),
	"implementations.html" => array(
		"content" => "content/implementations.html",
		"menu" => "software",
		"pageTitle" => "JSON Schema Software"
	),
	"examples.html" => array(
		"content" => "content/examples.html",
		"menu" => "examples",
		"pageTitle" => "JSON Schema Software"
	)
);

foreach ($pages as $outputFile => $pageSpec) {
	echo "Rendering: $outputFile:\n";
	ob_start();
?>

<html>
	<head>
		<title><?php echo $pageSpec['pageTitle']; ?></title>
		<link href="style/css/green-theme.css" rel="stylesheet">
		<link rel="stylesheet" href="style/css/json-highlight.css"></link>
		<script type="text/javascript">
			var _gaq = _gaq || [];
			var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
			_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
			_gaq.push(['_setAccount', 'UA-37169005-1']);
			_gaq.push(['_trackPageview']);
			
			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	</head>
	<body>
		<script src="style/js/jquery.js"></script>
		<div class="page-container" align=center>
			<div class="page-header">
				<h1>json-schema.org</h1>
				<div class="tagline">The home of JSON Schema</div>
			</div>
			
			<div class="page-content">
				<div class="page-menu">
				<?php
					foreach ($menu as $text => $target) {
						if ($text == $pageSpec['menu']) {
							echo "<a class=\"selected\" href=\"$target\">$text</a> ";
						} else {
							echo "<a href=\"$target\">$text</a> ";
						}
					}
				?>
				</div>

				<?php
					readfile($pageSpec['content']);
				?>
			</div>
		</div>
		<script src="style/js/json-highlight.js"></script>
		<script src="style/js/show-hide.js"></script>
	</body>
</html>
<?php
	$fullPage = ob_get_clean();
	if (!file_put_contents($outputFile, $fullPage)) {
		echo "\terror setting file contents\n";
 	} else {
		echo "\tsuccess\n";
 	}
}
echo "done.\n";
?>